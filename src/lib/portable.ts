import type { TestSession } from './session'

export interface PortablePayload {
  v: 1
  testId: string
  securityCode: string
  track: string
  profile: NonNullable<TestSession['profile']>
  result: NonNullable<TestSession['result']>
  paid: boolean
  finishedAt?: string
  elapsedSeconds: number
  completionMode?: string
}

function toBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + pad)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function checksum(input: string): string {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}

export function encodePortableResult(session: TestSession): string | null {
  if (!session.profile || !session.result) return null
  const payload: PortablePayload = {
    v: 1,
    testId: session.testId,
    securityCode: session.securityCode,
    track: session.track,
    profile: session.profile,
    result: session.result,
    paid: session.paid,
    finishedAt: session.finishedAt,
    elapsedSeconds: session.elapsedSeconds,
    completionMode: session.completionMode,
  }
  const json = JSON.stringify(payload)
  const body = toBase64Url(json)
  return `IQM1.${body}.${checksum(body)}`
}

export function decodePortableResult(code: string): PortablePayload | null {
  const trimmed = code.trim()
  const parts = trimmed.split('.')
  if (parts.length !== 3 || parts[0] !== 'IQM1') return null
  const [, body, sum] = parts
  if (checksum(body) !== sum) return null
  try {
    const parsed = JSON.parse(fromBase64Url(body)) as PortablePayload
    if (parsed.v !== 1 || !parsed.testId || !parsed.result || !parsed.profile) return null
    return parsed
  } catch {
    return null
  }
}
