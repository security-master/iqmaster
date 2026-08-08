import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getSession, unlockSession } from '../lib/session'

export function TestPayment() {
  const { testId = '' } = useParams()
  const navigate = useNavigate()
  const session = getSession(testId)
  const [busy, setBusy] = useState(false)

  if (!session) return <Navigate to="/iq-test" replace />
  if (!session.profile || !session.result) {
    return <Navigate to={`/iq-test/${testId}/complete`} replace />
  }
  if (session.paid) return <Navigate to={`/iq-test/${testId}/results`} replace />

  async function unlock() {
    setBusy(true)
    // Demo checkout — replace with Stripe Checkout in production
    await new Promise((r) => setTimeout(r, 700))
    unlockSession(testId)
    navigate(`/iq-test/${testId}/results`)
  }

  return (
    <div className="container test-shell">
      <p className="eyebrow">Checkout</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Your IQ test is submitted</h1>
      <p style={{ marginTop: '0.8rem' }}>
        Unlock the full package for a flat <strong>$19</strong>. No subscription.
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
            <li>IQ score evaluation</li>
            <li>
              Answered items scored: {session.result.answered}/{session.result.questionTotal}
            </li>
            <li>Score analysis & percentile</li>
            <li>World ranking context</li>
            <li>Personalized printable certificate</li>
            <li>Online results access with security code</li>
          </ul>
          <button className="btn btn-primary" style={{ marginTop: '1.4rem', width: '100%' }} disabled={busy} onClick={unlock}>
            {busy ? 'Processing…' : 'Place order — demo unlock'}
          </button>
          <p className="muted" style={{ marginTop: '0.8rem', fontSize: '0.9rem' }}>
            Demo mode simulates payment so you can preview results. Connect Stripe for production charges.
          </p>
        </div>
        <div className="prose">
          <h2>What happens next</h2>
          <p>
            After unlock you will see your IQ, band, percentile, and certificate. Save your security
            code <strong>{session.securityCode}</strong> to reopen results anytime.
          </p>
          <div className="notice">Security code: {session.securityCode}</div>
        </div>
      </div>
    </div>
  )
}
