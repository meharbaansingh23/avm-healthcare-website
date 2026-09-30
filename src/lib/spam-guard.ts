/**
 * Lightweight, dependency-free bot filtering for public form endpoints.
 *
 * Three signals:
 *  1. Honeypot — a hidden field humans never see. Any value = bot.
 *  2. Fill time — the client sends the time the form was first rendered.
 *     Missing (direct POSTs to the API) or implausibly fast = bot.
 *  3. Gibberish — random mixed-case strings like "hGfKjdLsPq" in short
 *     identity fields, plus links in fields that should never hold them.
 *
 * Callers should return a fake success response on a hit so bots don't
 * learn they were blocked.
 */

export const HONEYPOT_FIELD = "company_website";
export const STARTED_AT_FIELD = "form_started_at";

const MIN_FILL_MS = 3_000; // no human completes the form in under 3s
const MAX_FILL_MS = 24 * 60 * 60 * 1000; // stale / forged timestamps

const URL_PATTERN = /(https?:\/\/|www\.|\.(com|ru|xyz|top|info|biz)\b)/i;

/** Counts upper↔lower case switches inside a single word. */
function caseSwitches(word: string): number {
  let switches = 0;
  let prev: "u" | "l" | null = null;
  for (const ch of word) {
    const kind = /[A-Z]/.test(ch) ? "u" : /[a-z]/.test(ch) ? "l" : null;
    if (!kind) continue;
    if (prev && kind !== prev) switches++;
    prev = kind;
  }
  return switches;
}

/**
 * True for strings like "qWeRtYzX" or "hGfKjdLsPq". Real names — including
 * "McDonald", "DeSouza", or ALL CAPS entries — stay under the threshold.
 */
export function looksRandom(value: string): boolean {
  return value
    .split(/\s+/)
    .some((word) => word.length >= 6 && caseSwitches(word) >= 4);
}

export type SpamCheck = { isSpam: false } | { isSpam: true; reason: string };

export function checkSpam(
  formData: FormData,
  identityFields: Record<string, string>
): SpamCheck {
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "").trim();
  if (honeypot) return { isSpam: true, reason: "honeypot" };

  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return { isSpam: true, reason: "missing-timestamp" };
  }
  const elapsed = Date.now() - startedAt;
  if (elapsed < MIN_FILL_MS) return { isSpam: true, reason: "too-fast" };
  if (elapsed > MAX_FILL_MS) return { isSpam: true, reason: "stale-timestamp" };

  for (const [field, value] of Object.entries(identityFields)) {
    if (!value) continue;
    if (URL_PATTERN.test(value)) return { isSpam: true, reason: `url-in-${field}` };
    if (looksRandom(value)) return { isSpam: true, reason: `random-${field}` };
  }

  return { isSpam: false };
}
