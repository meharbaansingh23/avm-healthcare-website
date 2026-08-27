/**
 * One-off migration: pushes the site's hardcoded content into Sanity.
 *
 * Not part of the app or any build step. Run manually:
 *   SANITY_API_TOKEN=<token> npx tsx scripts/migrate-to-sanity.ts
 *
 * Safe to re-run: every document is written with a deterministic _id via
 * createIfNotExists, so a second run skips what already exists rather than
 * overwriting edits made in the Studio.
 */
import {randomUUID} from 'node:crypto'

import {createClient} from '@sanity/client'

import {blogPosts} from '../src/lib/blog'

const projectId = process.env.SANITY_PROJECT_ID ?? '4wgytumt'
const dataset = process.env.SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error(
    'Missing SANITY_API_TOKEN.\n' +
      'Run with: SANITY_API_TOKEN=<token> npx tsx scripts/migrate-to-sanity.ts',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
})

/** Follow-up items printed in the closing summary. */
const manualFollowUps: string[] = []

/**
 * Converts plain text / light markdown into portable text. The source bodies in
 * src/lib/blog.ts are plain prose with blank-line paragraph breaks, so each
 * paragraph becomes one normal block.
 */
function toPortableText(source: string) {
  return source
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((text) => ({
      _type: 'block',
      _key: randomUUID(),
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: randomUUID(), text, marks: []}],
    }))
}

/**
 * The source posts carry a human-readable `date` ("April 2026") rather than a
 * timestamp. Parse it to an ISO datetime, falling back to undefined so a bad
 * parse leaves the field empty for an editor to set instead of inventing a date.
 */
function toPublishedAt(post: (typeof blogPosts)[number]): string | undefined {
  const raw = post.datePublished ?? post.date
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    manualFollowUps.push(
      `blogPost "${post.slug}": could not parse date "${raw}" — publishedAt left empty.`,
    )
    return undefined
  }
  return parsed.toISOString()
}

type CreateResult = {created: number; skipped: number}

async function createIfAbsent(doc: {_id: string; _type: string; [key: string]: unknown}) {
  const existing = await client.getDocument(doc._id)
  if (existing) {
    console.log(`  · skipped (already exists): ${doc._id}`)
    return false
  }
  await client.createIfNotExists(doc)
  console.log(`  ✓ created: ${doc._id}`)
  return true
}

async function migrateBlogPosts(): Promise<CreateResult> {
  console.log(`\nBlog posts (${blogPosts.length} found in src/lib/blog.ts)`)
  let created = 0
  let skipped = 0

  for (const post of blogPosts) {
    const wasCreated = await createIfAbsent({
      _id: `blogPost-${post.slug}`,
      _type: 'blogPost',
      title: post.title,
      slug: {_type: 'slug', current: post.slug},
      excerpt: post.excerpt,
      body: toPortableText(post.content),
      publishedAt: toPublishedAt(post),
      seoTitle: post.metaTitle,
      seoDescription: post.metaDescription,
      // coverImage is intentionally omitted — see follow-up note below.
    })
    if (wasCreated) created++
    else skipped++

    if (post.coverImage) {
      manualFollowUps.push(
        `blogPost "${post.slug}": cover image "${post.coverImage}" needs manual upload via the asset API / Studio.`,
      )
    }
  }

  return {created, skipped}
}

async function migrateSiteSettings(): Promise<CreateResult> {
  console.log('\nSite settings (singleton)')

  // Values below mirror src/components/schema/OrganizationSchema.tsx and
  // src/components/Footer.tsx. certificationWording is deliberately left unset:
  // the current on-site wording is known to be inaccurate and is pending
  // Anil's correction.
  const wasCreated = await createIfAbsent({
    _id: 'siteSettings',
    _type: 'siteSettings',
    address: '17-19 A Block, Chatarpur Extension, Rajpur Road, New Delhi — 110074, India',
    phone: '+91 98103 45155',
    email: 'sales@avmhealthcare.com',
    socialLinks: [
      {
        _key: randomUUID(),
        _type: 'socialLink',
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/avm-health-care-5571711b7/',
      },
    ],
  })

  return wasCreated ? {created: 1, skipped: 0} : {created: 0, skipped: 1}
}

/**
 * Transcribed from src/components/AboutFaq.tsx, preserving display order.
 * That component holds its items in a non-exported const and two answers are
 * JSX (an inline mailto link), so they cannot be imported directly — those two
 * are flattened to plain text with the address inline.
 */
const faqItems: Array<{question: string; answer: string}> = [
  {
    question: 'Do You Supply To Individual Doctors Or Only Institutions?',
    answer:
      'We primarily supply to hospitals, surgical centres, government procurement agencies, and distributors. Individual practitioners may contact us to discuss their requirements directly.',
  },
  {
    question: 'How Can I Request A Product Catalogue?',
    answer:
      'You can request our full product catalogue through the Request Catalogue page on this website. Our team will send it to your inbox within one business day.',
  },
  {
    question: 'Do You Export Outside India?',
    answer:
      'Yes. We export to international markets and have an established presence through our German partner, ANI Medizintechnik GmbH, based in Hamburg.',
  },
  {
    question: 'Are Your Products CE And ISO Certified?',
    answer:
      'Yes. All AVM products are CE certified, ISO compliant, and FDA registered. Quality is monitored at every stage of manufacturing.',
  },
  {
    question: 'Can Instruments Be Customised To Specific Requirements?',
    answer:
      'Absolutely. We offer customisation based on the specific needs of individual surgeons and institutions — from dimensions to materials and finishes.',
  },
  {
    question: 'What Is Your Delivery Timeline?',
    answer:
      'Delivery timelines vary based on product and location. Please contact us directly at info@avmhealthcare.com for specific delivery information.',
  },
  {
    question: 'How Do I Get After-Sales Service And Support?',
    answer:
      'We offer 24×7 service support. Contact our team at info@avmhealthcare.com or call our New Delhi office for assistance.',
  },
  {
    question: 'Do You Work With Government Hospitals?',
    answer:
      'Yes. We supply to government institutions across India through both direct supply agreements and government procurement programs.',
  },
]

async function migrateFaqs(): Promise<CreateResult> {
  console.log(`\nFAQs (${faqItems.length} from src/components/AboutFaq.tsx)`)
  let created = 0
  let skipped = 0

  for (const [index, item] of faqItems.entries()) {
    const wasCreated = await createIfAbsent({
      _id: `faq-${index + 1}`,
      _type: 'faq',
      question: item.question,
      answer: item.answer,
      order: index + 1,
    })
    if (wasCreated) created++
    else skipped++
  }

  return {created, skipped}
}

async function main() {
  console.log(`Migrating into Sanity project ${projectId}, dataset "${dataset}"`)

  const blog = await migrateBlogPosts()
  const settings = await migrateSiteSettings()
  const faqs = await migrateFaqs()

  console.log('\n' + '─'.repeat(60))
  console.log('SUMMARY')
  console.log('─'.repeat(60))
  console.log(`blogPost      created: ${blog.created}   skipped: ${blog.skipped}`)
  console.log(`siteSettings  created: ${settings.created}   skipped: ${settings.skipped}`)
  console.log(`faq           created: ${faqs.created}   skipped: ${faqs.skipped}`)

  console.log('\nNeeds manual follow-up:')
  for (const note of manualFollowUps) {
    console.log(`  • ${note}`)
  }
  console.log(
    '  • siteSettings.certificationWording left empty on purpose — pending Anil\'s corrected wording.',
  )
  console.log(
    '  • FAQ #4 ("Are Your Products CE And ISO Certified?") repeats the same certification claim ' +
      'that certificationWording was withheld for. Review it alongside Anil\'s correction.',
  )
  console.log(
    '  • Footer links a Facebook page (facebook.com/avm.healthcare.5) that OrganizationSchema.tsx ' +
      'deliberately omits — a TODO there notes two Facebook presences exist. Left out of socialLinks ' +
      'until the canonical one is confirmed.',
  )
}

main().catch((error) => {
  console.error('\nMigration failed:', error)
  process.exit(1)
})
