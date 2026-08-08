import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
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
  const { t } = useI18n()

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
          setNote(t('test.payment.noCredits'))
          return
        }
        setNote(t('test.payment.creditNote', { note: entry.note, remaining: entry.balanceAfter }))
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
      <p className="eyebrow">{t('test.payment.eyebrow')}</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{t('test.payment.title')}</h1>
      <p style={{ marginTop: '0.8rem' }}>{t('test.payment.lead')}</p>

      <div className="split" style={{ marginTop: '2rem' }}>
        <div className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            {t('test.payment.order')}
          </div>
          <p style={{ marginTop: '0.6rem' }}>
            {t('test.payment.testId')} <strong>{testId}</strong>
          </p>
          <div className="price">$19</div>
          <ul className="checklist">
            <li>{t('test.payment.bullet1')}</li>
            <li>
              {t('test.payment.bullet2', {
                answered: session.result.answered,
                total: session.result.questionTotal,
              })}
            </li>
            <li>{t('test.payment.bullet3')}</li>
            <li>{t('test.payment.bullet4')}</li>
            <li>{t('test.payment.bullet5')}</li>
          </ul>
          <button
            className="btn btn-primary"
            style={{ marginTop: '1.4rem', width: '100%' }}
            disabled={busy}
            onClick={() => unlock('demo')}
          >
            {busy ? t('test.payment.processing') : t('test.payment.demo')}
          </button>
          <button
            className="btn btn-secondary"
            style={{ marginTop: '0.75rem', width: '100%' }}
            disabled={busy || credits < 1}
            onClick={() => unlock('credit')}
          >
            {t('test.payment.credit', { credits })}
          </button>
          {note && (
            <p className="notice" style={{ marginTop: '0.8rem' }}>
              {note}
            </p>
          )}
          <p className="muted" style={{ marginTop: '0.8rem', fontSize: '0.9rem' }}>
            {t('test.payment.stripeNote')}
          </p>
        </div>
        <div className="prose">
          <h2>{t('test.payment.nextTitle')}</h2>
          <p>{t('test.payment.nextLead', { code: session.securityCode })}</p>
          <div className="notice">{t('test.payment.securityCode', { code: session.securityCode })}</div>
        </div>
      </div>
    </div>
  )
}
