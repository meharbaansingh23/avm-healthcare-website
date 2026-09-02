/**
 * One-off backfill: pulls past form-submission emails out of Resend's send
 * history and creates matching documents in Sanity.
 *
 * Not part of the app or any build step. Run manually:
 *   RESEND_API_KEY=<key> SANITY_API_TOKEN=<token> npx tsx scripts/backfill-resend-submissions.ts
 *
 * Safe to re-run: every document is written with a deterministic _id derived
 * from the Resend email id, via createIfNotExists, so a second run skips
 * what's already there instead of duplicating or overwriting Studio edits.
 *
 * Scope, per investigation done before writing this script:
 *  - Resend's List Emails endpoint has no recipient filter — we fetch
 *    everything the account has ever sent and filter client-side by subject.
 *  - Only 3 of the 4 form types have ever actually been sent through this
 *    account: 2 contact, 3 careers, 4 catalogue. Zero innovation proposals
 *    exist, so none are created here.
 *  - Retrieve Email's "text" field is a flattened rendering of the same
 *    label/value pairs the site's routes build (see src/emails/FormSubmissionEmail.ts),
 *    with no delimiter between a value and the next label. Fields are
 *    recovered by locating each expected label in order and taking the text
 *    between it and the next expected label — this works because the label
 *    set is fixed and known, not because it's a general-purpose parser.
 */
import {createClient} from '@sanity/client'

const resendApiKey = process.env.RESEND_API_KEY
const sanityToken = process.env.SANITY_API_TOKEN
const projectId = process.env.SANITY_PROJECT_ID ?? '4wgytumt'
const dataset = process.env.SANITY_DATASET ?? 'production'

if (!resendApiKey) {
  console.error(
    'Missing RESEND_API_KEY.\n' +
      'Run with: RESEND_API_KEY=<key> SANITY_API_TOKEN=<token> npx tsx scripts/backfill-resend-submissions.ts',
  )
  process.exit(1)
}
if (!sanityToken) {
  console.error(
    'Missing SANITY_API_TOKEN.\n' +
      'Run with: RESEND_API_KEY=<key> SANITY_API_TOKEN=<token> npx tsx scripts/backfill-resend-submissions.ts',
  )
  process.exit(1)
}

const sanity = createClient({
  projectId,
  dataset,
  token: sanityToken,
  apiVersion: '2024-10-01',
  useCdn: false,
})

type ResendEmailListItem = {
  id: string
  to: string[]
  from: string
  created_at: string
  subject: string
}

type ResendEmailDetail = ResendEmailListItem & {
  html: string
  text: string
}

async function resendGet<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.resend.com${path}`, {
    headers: {Authorization: `Bearer ${resendApiKey}`},
  })
  if (!res.ok) {
    throw new Error(`Resend GET ${path} failed: ${res.status} ${await res.text()}`)
  }
  return res.json() as Promise<T>
}

/** Subject-pattern → schema-type routing, matching the 3 form types with real history. */
const SUBJECT_MATCHERS: Array<{
  schemaType: 'contactSubmission' | 'careerSubmission' | 'catalogueRequest'
  matches: (subject: string) => boolean
}> = [
  {schemaType: 'contactSubmission', matches: (s) => s.startsWith('New Contact Enquiry')},
  {schemaType: 'careerSubmission', matches: (s) => s.startsWith('New career application')},
  {schemaType: 'catalogueRequest', matches: (s) => s.startsWith('New catalogue request')},
]

function classify(subject: string) {
  return SUBJECT_MATCHERS.find((m) => m.matches(subject))?.schemaType ?? null
}

/**
 * Extracts label/value pairs from the plain-text body. The body always looks
 * like:
 *   "<title>\nSubmitted via avmhealthcare.com\n\n<Label1> <value1> <Label2> <value2> ...\n\nReply to this email..."
 * Labels are located in the given order; each value is everything between the
 * end of its label and the start of the next expected label.
 */
function parseFields(text: string, labels: string[]): Record<string, string> {
  const startMarker = 'Submitted via avmhealthcare.com\n\n'
  const endMarker = '\n\nReply to this email'

  const startIdx = text.indexOf(startMarker)
  const endIdx = text.indexOf(endMarker)
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not locate field block in email text body — format may have changed.')
  }
  const blob = text.slice(startIdx + startMarker.length, endIdx)

  const result: Record<string, string> = {}
  let cursor = 0
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i]
    const labelIdx = blob.indexOf(label, cursor)
    if (labelIdx === -1) {
      result[label] = ''
      continue
    }
    const valueStart = labelIdx + label.length
    const nextLabel = labels[i + 1]
    const nextIdx = nextLabel ? blob.indexOf(nextLabel, valueStart) : -1
    const valueEnd = nextIdx === -1 ? blob.length : nextIdx
    result[label] = blob.slice(valueStart, valueEnd).trim()
    cursor = valueEnd
  }
  return result
}

/** "—" is the em-dash placeholder the routes use for an empty optional field. */
const cleanValue = (v: string) => (v === '—' ? '' : v)

const manualFollowUps: string[] = []
const careerSubmissionIds: string[] = []

type CreateResult = {created: number; skipped: number}

async function createIfAbsent(doc: {_id: string; _type: string; [key: string]: unknown}) {
  const existing = await sanity.getDocument(doc._id)
  if (existing) {
    console.log(`  · skipped (already exists): ${doc._id}`)
    return false
  }
  await sanity.createIfNotExists(doc)
  console.log(`  ✓ created: ${doc._id}`)
  return true
}

async function backfillContact(email: ResendEmailDetail): Promise<boolean> {
  const fields = parseFields(email.text, ['Name', 'Email', 'Phone', 'Organisation', 'Message'])
  // Organisation isn't a field on contactSubmission — dropped, flagged below.
  if (cleanValue(fields.Organisation)) {
    manualFollowUps.push(
      `contactSubmission (Resend id ${email.id}): "Organisation" value "${fields.Organisation}" ` +
        'has no home in the contactSubmission schema and was dropped. Original is still in Resend.',
    )
  }

  return createIfAbsent({
    _id: `contactSubmission-resend-${email.id}`,
    _type: 'contactSubmission',
    name: cleanValue(fields.Name),
    email: cleanValue(fields.Email),
    phone: cleanValue(fields.Phone),
    message: cleanValue(fields.Message),
    submittedAt: new Date(email.created_at).toISOString(),
    status: 'responded',
  })
}

async function backfillCareer(email: ResendEmailDetail): Promise<boolean> {
  const fields = parseFields(email.text, [
    'Name',
    'Email',
    'Phone',
    'City',
    'Area of Interest',
    'Introduction',
    'CV',
  ])

  const docId = `careerSubmission-resend-${email.id}`
  const wasCreated = await createIfAbsent({
    _id: docId,
    _type: 'careerSubmission',
    name: cleanValue(fields.Name),
    email: cleanValue(fields.Email),
    phone: cleanValue(fields.Phone),
    roleInterest: cleanValue(fields['Area of Interest']),
    city: cleanValue(fields.City),
    coverLetter: cleanValue(fields.Introduction),
    // cv intentionally left unset — CVs are uploaded manually in the Studio
    // from the real careers@avmhealthcare.com inbox, not derived from the
    // filename/size text Resend stored (that's text, not a file asset).
    submittedAt: new Date(email.created_at).toISOString(),
    status: 'responded',
  })

  careerSubmissionIds.push(docId)
  return wasCreated
}

async function backfillCatalogue(email: ResendEmailDetail): Promise<boolean> {
  const fields = parseFields(email.text, [
    'Name',
    'Email',
    'Phone',
    'Country',
    'Address',
    'Institution',
    'Institution type',
    'Specific requirements',
  ])

  // catalogueRequest has no "country" field, so it's folded into notes rather
  // than dropped. "Address" values in this form are city names (e.g.
  // "Delhi"), so they map to the schema's `city` field.
  const country = cleanValue(fields.Country)
  const requirements = cleanValue(fields['Specific requirements'])
  const notes = [country && `Country: ${country}`, requirements].filter(Boolean).join('\n\n')

  manualFollowUps.push(
    `catalogueRequest (Resend id ${email.id}): mapped Institution→company, Institution type→department, ` +
      'Address→city, and folded Country into notes (no dedicated field). productsRequested left empty — ' +
      'the request-catalogue form never collected a discrete product list, only free-text requirements.',
  )

  return createIfAbsent({
    _id: `catalogueRequest-resend-${email.id}`,
    _type: 'catalogueRequest',
    name: cleanValue(fields.Name),
    email: cleanValue(fields.Email),
    phone: cleanValue(fields.Phone),
    company: cleanValue(fields.Institution),
    department: cleanValue(fields['Institution type']),
    city: cleanValue(fields.Address),
    notes,
    submittedAt: new Date(email.created_at).toISOString(),
    status: 'responded',
  })
}

async function main() {
  console.log('Fetching Resend send history...')
  const list = await resendGet<{object: string; has_more: boolean; data: ResendEmailListItem[]}>(
    '/emails',
  )
  if (list.has_more) {
    console.warn(
      '  ! Resend reports more emails exist beyond this page. This script does not paginate — ' +
        're-check manually if you expect more than what is processed below.',
    )
  }

  const matches = list.data
    .map((item) => ({item, schemaType: classify(item.subject)}))
    .filter((m): m is {item: ResendEmailListItem; schemaType: NonNullable<ReturnType<typeof classify>>} =>
      m.schemaType !== null,
    )

  console.log(`Found ${list.data.length} emails total, ${matches.length} matching known form subjects.\n`)

  const counts: Record<string, CreateResult> = {
    contactSubmission: {created: 0, skipped: 0},
    careerSubmission: {created: 0, skipped: 0},
    catalogueRequest: {created: 0, skipped: 0},
  }

  for (const {item, schemaType} of matches) {
    const detail = await resendGet<ResendEmailDetail>(`/emails/${item.id}`)
    console.log(`${schemaType} ← "${detail.subject}" (${detail.id})`)

    let wasCreated: boolean
    if (schemaType === 'contactSubmission') wasCreated = await backfillContact(detail)
    else if (schemaType === 'careerSubmission') wasCreated = await backfillCareer(detail)
    else wasCreated = await backfillCatalogue(detail)

    if (wasCreated) counts[schemaType].created++
    else counts[schemaType].skipped++
  }

  console.log('\n' + '─'.repeat(60))
  console.log('SUMMARY')
  console.log('─'.repeat(60))
  for (const [schemaType, result] of Object.entries(counts)) {
    console.log(`${schemaType.padEnd(20)} created: ${result.created}   skipped: ${result.skipped}`)
  }

  console.log('\nCareer submissions needing a manual CV upload in the Studio:')
  if (careerSubmissionIds.length === 0) {
    console.log('  (none)')
  } else {
    for (const id of careerSubmissionIds) {
      console.log(`  • ${id}`)
    }
  }

  console.log('\nOther notes / dropped data:')
  if (manualFollowUps.length === 0) {
    console.log('  (none)')
  } else {
    for (const note of manualFollowUps) {
      console.log(`  • ${note}`)
    }
  }
}

main().catch((error) => {
  console.error('\nBackfill failed:', error)
  process.exit(1)
})
