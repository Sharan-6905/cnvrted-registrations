// Rejects obviously fake/throwaway emails without sending anything or
// calling a paid verification API — a format check, a disposable-domain
// blocklist, and a few heuristics for gibberish local-parts.

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Common disposable/throwaway email providers.
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'throwawaymail.com', 'yopmail.com', 'trashmail.com',
  'getnada.com', 'maildrop.cc', 'fakeinbox.com', 'sharklasers.com', 'mailnesia.com',
  'dispostable.com', 'mintemail.com', 'mytemp.email', 'moakt.com', 'emailondeck.com',
  'tempinbox.com', 'spamgourmet.com', 'mohmal.com', 'burnermail.io', 'discard.email',
])

// Junk local-parts that show up in test/spam submissions.
const JUNK_LOCAL_PARTS = new Set([
  'test', 'testing', 'fake', 'asdf', 'asdfasdf', 'qwerty', 'admin', 'user',
  'example', 'sample', 'none', 'null', 'na', 'nil', 'xxx', 'abc', 'temp', 'foo', 'bar',
])

function isGibberish(localPart: string): boolean {
  const lower = localPart.toLowerCase()

  if (JUNK_LOCAL_PARTS.has(lower)) return true
  if (lower.length < 2) return true

  // All the same character repeated (aaaa, 1111)
  if (/^(.)\1+$/.test(lower)) return true

  // Sequential runs (abcd, 1234, qwerty-style keyboard walks) with no vowels at all
  // and no digits mixed with letters in a normal pattern — a rough gibberish signal.
  const hasVowel = /[aeiou]/.test(lower)
  const isMostlyConsonants = lower.replace(/[^a-z]/g, '').length >= 4 && !hasVowel
  if (isMostlyConsonants) return true

  return false
}

// Fast, free, no network call — safe to run on the client for instant
// feedback. Catches obvious junk before spending deliverability-API quota.
export function validateEmailFormat(rawEmail: string): { valid: boolean; reason?: string } {
  const email = rawEmail.trim().toLowerCase()

  if (!EMAIL_FORMAT.test(email)) {
    return { valid: false, reason: 'Enter a valid email address.' }
  }

  const [localPart, domain] = email.split('@')

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, reason: 'Please use a real, non-disposable email address.' }
  }

  if (isGibberish(localPart)) {
    return { valid: false, reason: 'That doesn\'t look like a real email address — please double-check it.' }
  }

  return { valid: true }
}

interface AbstractApiResponse {
  deliverability?: 'DELIVERABLE' | 'UNDELIVERABLE' | 'UNKNOWN'
  is_valid_format?: { value: boolean }
  is_disposable_email?: { value: boolean }
  is_smtp_valid?: { value: boolean }
  is_mx_found?: { value: boolean }
}

// Real-time mailbox check — calls Abstract API's Email Validation endpoint.
// Server-only: never call this from client code, it uses a secret API key.
// Fails OPEN (treats the email as valid) on network errors, missing key, or
// rate-limit responses, so a third-party outage never blocks submissions —
// it only rejects when the API gives a confident "undeliverable" verdict.
export async function verifyEmailDeliverability(
  rawEmail: string
): Promise<{ valid: boolean; reason?: string }> {
  const apiKey = process.env.ABSTRACT_EMAIL_API_KEY
  if (!apiKey) {
    console.warn('ABSTRACT_EMAIL_API_KEY not set — skipping deliverability check.')
    return { valid: true }
  }

  const email = rawEmail.trim().toLowerCase()

  try {
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`,
      { signal: AbortSignal.timeout(5000) }
    )

    if (!res.ok) {
      console.warn(`Abstract API returned ${res.status} — failing open.`)
      return { valid: true }
    }

    const data = (await res.json()) as AbstractApiResponse

    if (data.is_disposable_email?.value) {
      return { valid: false, reason: 'Please use a real, non-disposable email address.' }
    }

    if (data.deliverability === 'UNDELIVERABLE') {
      return { valid: false, reason: 'This email address doesn\'t appear to exist — please double-check it.' }
    }

    // deliverability === 'UNKNOWN' or 'DELIVERABLE' — accept both. UNKNOWN
    // usually means the receiving mail server blocks verification probes
    // (common for gmail.com, outlook.com), not that the address is fake.
    return { valid: true }
  } catch (err) {
    console.warn('Abstract API request failed — failing open.', err)
    return { valid: true }
  }
}
