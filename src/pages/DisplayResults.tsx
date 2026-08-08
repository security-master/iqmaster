import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'
import { decodePortableResult } from '../lib/portable'
import { normalizeScoreResult } from '../lib/iq'
import { findByCredentials, saveSession, type TestSession } from '../lib/session'
import { fetchRemoteSession } from '../lib/sync'

export function DisplayResults() {
  const navigate = useNavigate()
  const { t } = useI18n()
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
          setError(t('display.badCode'))
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
        setError(t('display.notFound'))
        return
      }
      navigate(session.paid ? `/iq-test/${session.testId}/results` : `/iq-test/${session.testId}/payment`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="container page-hero">
      <Seo title={t('display.seoTitle')} description={t('display.seoDescription')} />
      <p className="eyebrow">{t('display.eyebrow')}</p>
      <h1>{t('display.title')}</h1>
      <p>{t('display.lead')}</p>

      <form className="form-grid" style={{ marginTop: '2rem', maxWidth: 560 }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="testId">{t('display.testId')}</label>
          <input id="testId" name="testId" placeholder="IQM-...." />
        </div>
        <div className="field">
          <label htmlFor="securityCode">{t('display.securityCode')}</label>
          <input id="securityCode" name="securityCode" placeholder="••••••" />
        </div>
        <div className="field">
          <label htmlFor="portable">{t('display.portable')}</label>
          <textarea id="portable" name="portable" placeholder="IQM1...." rows={3} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? t('display.looking') : t('display.open')}
        </button>
        {error && <p className="notice">{error}</p>}
      </form>
    </div>
  )
}
