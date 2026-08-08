import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { consumeAssessmentCredit, getCreditSummary } from '../lib/billing/credits'
import { getSession, unlockSession } from '../lib/session'
import { syncSessionRemote } from '../lib/sync'

export function TestPayment() {
  const { testId = '' } = useParams()
  const navigate = useNavigate()
  const session = getSession(testId)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')
  const credits = getCreditSummary().remainingCredits

  if (!session) return <Navigate to="/iq-test" replace />
  if (!session.profile || !session.result) {
    return <Navigate to={`/iq-test/${testId}/complete`} replace />
  }
  if (session.paid) return <Navigate to={`/iq-test/${testId}/results`} replace />

  async function unlock(mode: 'demo' | 'credit') {
    setBusy(true)
    setNote('')
    try {
      if (mode === 'credit') {
        const entry = consumeAssessmentCredit(session!.profile?.name ?? 'Member')
        if (!entry) {
          setNote('No organization credits left. Buy a package or use demo unlock.')
          return
        }
        setNote(`${entry.note}. Remaining credits: ${entry.balanceAfter}`)
      } else {
        await new Promise((r) => setTimeout(r, 500))
      }
      const unlocked = unlockSession(testId)
      if (unlocked) await syncSessionRemote(unlocked)
      navigate(`/iq-test/${testId}/results`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="container test-shell">
      <p className="eyebrow">Checkout</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Your IQ test is submitted</h1>
      <p style={{ marginTop: '0.8rem' }}>
        Unlock the full package for a flat <strong>$19</strong> (Stripe coming later). Demo unlock or
        organization credits work now.
      </p>

      <div className="split" style={{ marginTop: '2rem' }}>
        <div className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            Order summary
          </div>
          <p style={{ marginTop: '0.6rem' }}>
            Test ID: <strong>{testId}</strong>
          </p>
          <div className="price">$19</div>
          <ul className="checklist">
            <li>IQ score evaluation + ability profile</li>
            <li>
              Answered items scored: {session.result.answered}/{session.result.questionTotal}
            </li>
            <li>Integrity review + confidence notes</li>
            <li>Printable certificate + recovery code</li>
            <li>Cross-device reopen when Supabase is configured</li>
          </ul>
          <button
            className="btn btn-primary"
            style={{ marginTop: '1.4rem', width: '100%' }}
            disabled={busy}
            onClick={() => unlock('demo')}
          >
            {busy ? 'Processing…' : 'Place order — demo unlock'}
          </button>
          <button
            className="btn btn-secondary"
            style={{ marginTop: '0.75rem', width: '100%' }}
            disabled={busy || credits < 1}
            onClick={() => unlock('credit')}
          >
            Unlock with org credit ({credits} left)
          </button>
          {note && (
            <p className="notice" style={{ marginTop: '0.8rem' }}>
              {note}
            </p>
          )}
          <p className="muted" style={{ marginTop: '0.8rem', fontSize: '0.9rem' }}>
            Stripe is not connected yet. Demo unlock and organization credits are available.
          </p>
        </div>
        <div className="prose">
          <h2>What happens next</h2>
          <p>
            After unlock you will see your IQ, band, percentile, ability profile, and certificate. Save
            your security code <strong>{session.securityCode}</strong> (and recovery code on the
            results page) to reopen later.
          </p>
          <div className="notice">Security code: {session.securityCode}</div>
        </div>
      </div>
    </div>
  )
}
