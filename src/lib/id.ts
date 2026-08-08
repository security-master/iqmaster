const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function createTestId(length = 10): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('')
}

export function createSecurityCode(): string {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 1000000
  return String(n).padStart(6, '0')
}
