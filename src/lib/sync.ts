import { encodePortableResult } from './portable'
import type { TestSession } from './session'
import { getSupabase, isSupabaseConfigured } from './supabase'

const WEBHOOK_KEY = 'iqmaster.webhookUrl'

export function getWebhookUrl(): string {
  try {
    return localStorage.getItem(WEBHOOK_KEY) ?? ''
  } catch {
    return ''
  }
}

export function setWebhookUrl(url: string) {
  localStorage.setItem(WEBHOOK_KEY, url.trim())
}

export async function syncSessionRemote(session: TestSession): Promise<{ portableCode: string | null; synced: boolean }> {
  const portableCode = encodePortableResult(session)
  let synced = false
  const sb = getSupabase()
  if (sb && session.profile && session.result) {
    const { error } = await sb.from('assessment_results').upsert(
      {
        test_id: session.testId,
        security_code: session.securityCode,
        track: session.track,
        profile: session.profile,
        result: session.result,
        completion_mode: session.completionMode ?? null,
        elapsed_seconds: session.elapsedSeconds,
        paid: session.paid,
        portable_code: portableCode,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'test_id' },
    )
    synced = !error
  }

  const webhook = getWebhookUrl()
  if (webhook && session.paid && session.result) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'assessment.unlocked',
          testId: session.testId,
          track: session.track,
          iq: session.result.iq,
          band: session.result.band,
          percentile: session.result.percentile,
          name: session.profile?.name,
          at: new Date().toISOString(),
        }),
        mode: 'cors',
        keepalive: true,
      })
    } catch {
      // webhook is best-effort
    }
  }

  return { portableCode, synced }
}

export async function fetchRemoteSession(testId: string, securityCode: string): Promise<TestSession | null> {
  if (!isSupabaseConfigured()) return null
  const sb = getSupabase()
  if (!sb) return null
  const { data, error } = await sb
    .from('assessment_results')
    .select('*')
    .eq('test_id', testId.trim().toUpperCase())
    .eq('security_code', securityCode.trim())
    .maybeSingle()
  if (error || !data) return null
  return {
    testId: data.test_id,
    securityCode: data.security_code,
    createdAt: data.created_at,
    track: data.track ?? 'adult',
    answers: [],
    answeredCount: data.result?.answered ?? 0,
    startedAt: data.created_at,
    finishedAt: data.updated_at,
    elapsedSeconds: data.elapsed_seconds ?? 0,
    profile: data.profile,
    completionMode: data.completion_mode ?? undefined,
    paid: Boolean(data.paid),
    result: data.result,
  }
}

export async function submitContactMessage(input: {
  name: string
  email: string
  message: string
}): Promise<boolean> {
  const sb = getSupabase()
  if (sb) {
    const { error } = await sb.from('contact_messages').insert(input)
    if (!error) return true
  }

  const contactEmail = (import.meta.env.VITE_CONTACT_TO_EMAIL as string | undefined)?.trim()
  if (contactEmail) {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        message: input.message,
        _subject: 'IQMaster contact form',
      }),
    })
    return res.ok
  }

  // Local fallback inbox for demos without backend
  try {
    const key = 'iqmaster.contactInbox.v1'
    const prev = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[]
    prev.unshift({ ...input, at: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(prev.slice(0, 50)))
    return true
  } catch {
    return false
  }
}
