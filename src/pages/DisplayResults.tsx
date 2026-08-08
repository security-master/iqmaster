import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { decodePortableResult } from '../lib/portable'
import { normalizeScoreResult } from '../lib/iq'
import { findByCredentials, saveSession, type TestSession } from '../lib/session'
import { fetchRemoteSession } from '../lib/sync'

export function DisplayResults() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const data = new FormData(e.currentTarget)
    const testId = String(data.get('testId') ?? '')
    const securityCode = String(data.get('securityCode') ?? '')
    const portable = String(data.get('portable') ?? '').trim()

    try {
      if (portable) {
        const decoded = decodePortableResult(portable)
        if (!decoded) {
          setError('Recovery code is invalid or corrupted.')
          return
        }
        const session: TestSession = {
          testId: decoded.testId,
          securityCode: decoded.securityCode,
          createdAt: decoded.finishedAt ?? new Date().toISOString(),
          track: (decoded.track as TestSession['track']) || 'adult',
          answers: [],
          answeredCount: decoded.result.answered,
          startedAt: decoded.finishedAt ?? new Date().toISOString(),
          finishedAt: decoded.finishedAt,
          elapsedSeconds: decoded.elapsedSeconds,
          profile: decoded.profile,
          completionMode: decoded.completionMode as TestSession['completionMode'],
          paid: decoded.paid,
          result: normalizeScoreResult(decoded.result),
        }
        saveSession(session)
        navigate(session.paid ? `/iq-test/${session.testId}/results` : `/iq-test/${session.testId}/payment`)
        return
      }

      let session = findByCredentials(testId, securityCode)
      if (!session) {
        session = await fetchRemoteSession(testId, securityCode)
        if (session) saveSession(session)
      }
      if (!session) {
        setError('No matching result found in this browser or remote store.')
        return
      }
      navigate(session.paid ? `/iq-test/${session.testId}/results` : `/iq-test/${session.testId}/payment`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="container page-hero">
      <Seo
        title="Display results — IQMaster"
        description="Reopen your IQMaster results with Test ID + security code, or paste a recovery code."
      />
      <p className="eyebrow">Display results</p>
      <h1>Reopen your assessment</h1>
      <p>Use Test ID + security code, or paste a portable recovery code from another device.</p>

      <form className="form-grid" style={{ marginTop: '2rem', maxWidth: 560 }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="testId">Test ID</label>
          <input id="testId" name="testId" placeholder="IQM-...." />
        </div>
        <div className="field">
          <label htmlFor="securityCode">Security code</label>
          <input id="securityCode" name="securityCode" placeholder="6-digit code" />
        </div>
        <div className="field">
          <label htmlFor="portable">Or recovery code (IQM1.…)</label>
          <textarea id="portable" name="portable" placeholder="IQM1...." rows={3} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Looking up…' : 'Open results'}
        </button>
        {error && <p className="notice">{error}</p>}
      </form>
    </div>
  )
}
