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
  const result = normalizeScoreResult(session.result, {
    answers: session.answers,
    track: session.track,
    countryCode: profile.countryCode,
  })
  const completionMode = session.completionMode ?? (result.answered >= result.questionTotal ? 'full' : 'early')
  const completionLabel = completionMode === 'full' ? 'Full completion' : 'Early finish'
  const country = result.countryComparison
  const maxBar = Math.max(155, result.iq, country?.nationalAverage ?? 100, 100)
  const issued = new Date(session.finishedAt ?? session.createdAt).toLocaleDateString()

  return (
    <div className="container test-shell results-page">
      <p className="eyebrow">{t('results.title')}</p>
      <h1 className="results-title">Your personalized IQ dossier</h1>
      <p className="results-sub">
        Test ID <strong>{testId}</strong> · Security code <strong>{session.securityCode}</strong> · Time{' '}
        {formatElapsed(session.elapsedSeconds)} · Answered {result.answered}/{result.questionTotal}
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
              {country ? ` · ${country.countryName}` : ''}
            </li>
          </ul>
          <button
            className="btn btn-secondary no-print"
            style={{ marginTop: '1.2rem' }}
            onClick={() => window.print()}
          >
            Print certificate
          </button>
        </div>
      </div>

      {country && (
        <section className="section results-block">
          <p className="eyebrow">National statistics</p>
          <h2 className="section-title section-title--wide">Your score vs country averages</h2>
          <p className="section-lead">{country.label}</p>
          <div className="stat-compare">
            <div className="stat-compare__row">
              <div className="stat-compare__meta">
                <strong>Your IQ</strong>
                <span>{result.iq}</span>
              </div>
              <div className="stat-compare__bar">
                <span style={{ width: `${(result.iq / maxBar) * 100}%` }} className="is-you" />
              </div>
            </div>
            <div className="stat-compare__row">
              <div className="stat-compare__meta">
                <strong>{country.countryName} average</strong>
                <span>{country.nationalAverage}</span>
              </div>
              <div className="stat-compare__bar">
                <span style={{ width: `${(country.nationalAverage / maxBar) * 100}%` }} />
              </div>
            </div>
            <div className="stat-compare__row">
              <div className="stat-compare__meta">
                <strong>Global mean</strong>
                <span>100</span>
              </div>
              <div className="stat-compare__bar">
                <span style={{ width: `${(100 / maxBar) * 100}%` }} />
              </div>
            </div>
            <p className="muted stat-compare__delta">
              Difference vs {country.countryName}:{' '}
              <strong>
                {country.delta >= 0 ? '+' : ''}
                {country.delta}
              </strong>{' '}
              IQ points
            </p>
          </div>
        </section>
      )}

      {result.personalizedInsights && result.personalizedInsights.length > 0 && (
        <section className="section results-block">
          <p className="eyebrow">Personalized evaluation</p>
          <h2 className="section-title section-title--wide">Built from your answers</h2>
          <div className="insight-list">
            {result.personalizedInsights.map((insight) => (
              <article className="insight-card" key={insight.title}>
                <h3>{insight.title}</h3>
                <p>{insight.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {result.difficultyBreakdown && (
        <section className="section results-block">
          <p className="eyebrow">Difficulty breakdown</p>
          <h2 className="section-title">Correct vs incorrect by level</h2>
          <div className="difficulty-grid">
            {result.difficultyBreakdown.map((d) => (
              <article className="difficulty-card" key={d.level}>
                <p className="eyebrow">Level {d.level}</p>
                <h3>{d.label}</h3>
                <p className="difficulty-card__score">{d.accuracy}%</p>
                <p>
                  {d.correct}/{d.answered} correct
                </p>
                <div className="stat-compare__bar">
                  <span style={{ width: `${d.accuracy}%` }} className="is-you" />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {result.itemAnalysis && (
        <section className="section results-block">
          <p className="eyebrow">Answer review</p>
          <h2 className="section-title section-title--wide">Every item mapped</h2>
          <p className="section-lead">Green = correct · Red = incorrect · Grey = skipped</p>
          <div className="item-review">
            {result.itemAnalysis.map((item) => (
              <div
                key={item.index}
                className={`item-chip item-chip--${item.status}`}
                title={`Item ${item.index + 1} · Difficulty ${item.difficulty} · ${item.status}`}
              >
                <span>{item.index + 1}</span>
                <small>D{item.difficulty}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section results-block">
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
          countryComparison={result.countryComparison}
          difficultyBreakdown={result.difficultyBreakdown}
          personalizedInsights={result.personalizedInsights}
          itemAnalysis={result.itemAnalysis}
          age={profile.age}
          countryCode={profile.countryCode}
        />
      </div>

      <div className="certificate certificate--elite" id="certificate">
        <div className="certificate__ornament" aria-hidden="true" />
        <p className="eyebrow">IQMaster Certificate</p>
        <h2>Certificate of Cognitive Assessment</h2>
        <p>This certifies that</p>
        <h3 className="certificate__name">{profile.name}</h3>
        <p>
          completed the IQMaster culture-fair matrix assessment and achieved an estimated IQ score of
        </p>
        <div className="score-value certificate__score">{result.iq}</div>
        <p>
          Band: <strong>{result.band}</strong> · Percentile: <strong>{result.percentile}</strong>
          {country ? (
            <>
              {' '}
              · {country.countryName}:{' '}
              <strong>
                {country.delta >= 0 ? '+' : ''}
                {country.delta}
              </strong>
            </>
          ) : null}
        </p>
        <div className="certificate__seal" aria-hidden="true">
          IQ
          <span>MASTER</span>
        </div>
        <p className="muted certificate__meta">
          {completionLabel} · {result.answered}/{result.questionTotal} items · {result.confidence} confidence
        </p>
        <p className="muted certificate__meta">
          Test ID {testId} · Issued {issued}
        </p>
      </div>
    </div>
  )
}
