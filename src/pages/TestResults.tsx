import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ReportActions } from '../components/ReportActions'
import { normalizeScoreResult, ordinal } from '../lib/iq'
import { encodePortableResult } from '../lib/portable'
import { formatElapsed, getSession } from '../lib/session'
import { syncSessionRemote } from '../lib/sync'
import { useI18n } from '../i18n/I18nContext'

export function TestResults() {
  const { testId = '' } = useParams()
  const session = getSession(testId)
  const { t } = useI18n()
  const [portableCode, setPortableCode] = useState('')
  const [syncNote, setSyncNote] = useState('')

  useEffect(() => {
    if (!session?.paid || !session.profile || !session.result) return
    const code = encodePortableResult(session) ?? ''
    setPortableCode(code)
    void syncSessionRemote(session).then(({ synced }) => {
      setSyncNote(synced ? 'Synced to cloud store.' : 'Saved locally (cloud sync optional).')
    })
  }, [session])

  if (!session) return <Navigate to="/iq-test" replace />
  if (!session.paid) return <Navigate to={`/iq-test/${testId}/payment`} replace />
  if (!session.profile || !session.result) {
    return <Navigate to={`/iq-test/${testId}/complete`} replace />
  }

  const { profile } = session
  const result = normalizeScoreResult(session.result)
  const completionMode = session.completionMode ?? (result.answered >= result.questionTotal ? 'full' : 'early')
  const completionLabel = completionMode === 'full' ? 'Full completion' : 'Early finish'

  return (
    <div className="container test-shell">
      <p className="eyebrow">{t('results.title')}</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Assessment complete</h1>
      <p style={{ marginTop: '0.75rem' }}>
        Test ID <strong>{testId}</strong> · Security code <strong>{session.securityCode}</strong> ·
        Time {formatElapsed(session.elapsedSeconds)} · Answered {result.answered}/{result.questionTotal}
      </p>
      {syncNote && <p className="muted">{syncNote}</p>}

      <div className="results-hero" style={{ marginTop: '2rem' }}>
        <div className="score-ring">
          <div className="muted" style={{ fontWeight: 700 }}>
            Estimated IQ
          </div>
          <div className="score-value">{result.iq}</div>
          <p>
            <strong>{result.band}</strong>
          </p>
          <p>
            {ordinal(result.percentile)} percentile · {result.worldRankLabel}
          </p>
        </div>
        <div className="price-box">
          <h3>Score analysis</h3>
          <p style={{ marginTop: '0.7rem' }}>{result.summary}</p>
          <ul className="checklist">
            <li>
              Accuracy: {result.accuracy}% ({result.correct}/{result.total})
            </li>
            <li>
              Completion: {completionLabel} ({result.answered}/{result.questionTotal} answered)
            </li>
            <li>Confidence: {result.confidenceNote}</li>
            <li>{result.uncertainty}</li>
            <li>{result.integrity.note}</li>
            <li>
              Profile: {profile.name}, age {profile.age}
            </li>
          </ul>
          <button className="btn btn-secondary no-print" style={{ marginTop: '1.2rem' }} onClick={() => window.print()}>
            Print certificate
          </button>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <p className="eyebrow">Ability profile</p>
        <div className="ability-grid">
          {result.abilityProfile.map((item) => (
            <article className="ability assessment-card" key={item.label}>
              <h3>
                {item.label} · {item.score}
              </h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      {portableCode && (
        <div className="notice no-print" style={{ marginTop: '1rem' }}>
          <strong>Recovery code</strong>
          <p style={{ marginTop: '0.45rem', wordBreak: 'break-all', fontSize: '0.9rem' }}>{portableCode}</p>
          <p className="muted" style={{ marginTop: '0.4rem' }}>
            Paste this on Display Results to reopen on another device without Stripe/cloud.
          </p>
        </div>
      )}

      <div className="no-print">
        <ReportActions
          name={profile.name}
          iq={result.iq}
          band={result.band}
          percentile={result.percentile}
          testId={testId}
          accuracy={result.accuracy}
          answered={result.answered}
          questionTotal={result.questionTotal}
          confidenceNote={result.confidenceNote}
          uncertainty={result.uncertainty}
          integrityNote={result.integrity.note}
          abilityProfile={result.abilityProfile}
          track={session.track}
          completionMode={completionMode}
          portableCode={portableCode}
        />
      </div>

      <div className="certificate" style={{ marginTop: '2rem' }} id="certificate">
        <p className="eyebrow">IQMaster Certificate</p>
        <h2>Certificate of Cognitive Assessment</h2>
        <p>This certifies that</p>
        <h3 style={{ fontSize: '2rem', margin: '0.55rem 0 0.8rem' }}>{profile.name}</h3>
        <p>
          completed the IQMaster culture-fair matrix assessment and achieved an estimated IQ score of
        </p>
        <div className="score-value" style={{ fontSize: '4.2rem', margin: '0.7rem 0' }}>
          {result.iq}
        </div>
        <p>
          Band: <strong>{result.band}</strong> · Percentile: <strong>{result.percentile}</strong>
        </p>
        <p className="muted" style={{ marginTop: '0.6rem' }}>
          {completionLabel} · {result.answered}/{result.questionTotal} items answered · {result.confidence}{' '}
          confidence
        </p>
        <p className="muted" style={{ marginTop: '1rem' }}>
          Test ID {testId} · Issued {new Date(session.finishedAt ?? session.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
