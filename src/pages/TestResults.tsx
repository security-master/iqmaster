import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CertificateView } from '../components/CertificateView'
import { ReportActions } from '../components/ReportActions'
import { cleanBandLabel, normalizeScoreResult, ordinal } from '../lib/iq'
import { encodePortableResult } from '../lib/portable'
import { formatElapsed, getSession } from '../lib/session'
import { syncSessionRemote } from '../lib/sync'
import { useI18n } from '../i18n/I18nContext'

export function TestResults() {
  const { testId = '' } = useParams()
  const session = getSession(testId)
  const { t, lang } = useI18n()
  const [portableCode, setPortableCode] = useState('')
  const [syncNote, setSyncNote] = useState('')

  useEffect(() => {
    if (!session?.paid || !session.profile || !session.result) return
    const code = encodePortableResult(session) ?? ''
    setPortableCode(code)
    void syncSessionRemote(session).then(({ synced }) => {
      setSyncNote(synced ? t('resultsExtra.synced') : t('resultsExtra.localSave'))
    })
  }, [session, t])

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
    lang,
  })
  const completionMode = session.completionMode ?? (result.answered >= result.questionTotal ? 'full' : 'early')
  const completionLabel =
    completionMode === 'full' ? t('results.fullCompletion') : t('results.earlyFinish')
  const country = result.countryComparison
  const maxBar = Math.max(155, result.iq, country?.nationalAverage ?? 100, 100)
  const issued = new Date(session.finishedAt ?? session.createdAt).toLocaleDateString()

  return (
    <div className="container test-shell results-page">
      <p className="eyebrow">{t('results.title')}</p>
      <h1 className="results-title">{t('results.dossier')}</h1>
      <p className="results-sub">
        Test ID <strong>{testId}</strong> · {t('test.payment.securityCode', { code: session.securityCode })} ·{' '}
        {formatElapsed(session.elapsedSeconds)} · {result.answered}/{result.questionTotal}
      </p>
      {syncNote && <p className="muted">{syncNote}</p>}

      <div className="results-hero" style={{ marginTop: '2rem' }}>
        <div className="score-ring">
          <div className="muted" style={{ fontWeight: 700 }}>
            {t('results.estimatedIq')}
          </div>
          <div className="score-value">{result.iq}</div>
          <p>
            <strong>{cleanBandLabel(result.band)}</strong>
            {result.confidence !== 'standard' ? (
              <span className="muted"> · {result.confidence}</span>
            ) : null}
          </p>
          <p>
            {ordinal(result.percentile)} · {result.worldRankLabel}
          </p>
        </div>
        <div className="price-box">
          <h3>{t('results.scoreAnalysis')}</h3>
          <p style={{ marginTop: '0.7rem' }}>{result.summary}</p>
          <ul className="checklist">
            <li>
              {result.accuracy}% ({result.correct}/{result.total})
            </li>
            <li>
              {completionLabel} ({result.answered}/{result.questionTotal})
            </li>
            <li>{result.confidenceNote}</li>
            <li>{result.uncertainty}</li>
            <li>{result.integrity.note}</li>
            <li>
              {profile.name}, {profile.age}
              {country ? ` · ${country.countryName}` : ''}
            </li>
          </ul>
          <button
            className="btn btn-secondary no-print"
            style={{ marginTop: '1.2rem' }}
            onClick={() => window.print()}
          >
            {t('results.printCertificate')}
          </button>
        </div>
      </div>

      {country && (
        <section className="section results-block">
          <p className="eyebrow">{t('resultsExtra.national')}</p>
          <h2 className="section-title section-title--wide">{t('resultsExtra.vsCountry')}</h2>
          <p className="section-lead">{country.label}</p>
          <div className="stat-compare">
            <div className="stat-compare__row">
              <div className="stat-compare__meta">
                <strong>{t('resultsExtra.yourIq')}</strong>
                <span>{result.iq}</span>
              </div>
              <div className="stat-compare__bar">
                <span style={{ width: `${(result.iq / maxBar) * 100}%` }} className="is-you" />
              </div>
            </div>
            <div className="stat-compare__row">
              <div className="stat-compare__meta">
                <strong>{t('resultsExtra.average', { country: country.countryName })}</strong>
                <span>{country.nationalAverage}</span>
              </div>
              <div className="stat-compare__bar">
                <span style={{ width: `${(country.nationalAverage / maxBar) * 100}%` }} />
              </div>
            </div>
            <div className="stat-compare__row">
              <div className="stat-compare__meta">
                <strong>{t('resultsExtra.globalMean')}</strong>
                <span>100</span>
              </div>
              <div className="stat-compare__bar">
                <span style={{ width: `${(100 / maxBar) * 100}%` }} />
              </div>
            </div>
            <p className="muted stat-compare__delta">
              {t('resultsExtra.delta', { country: country.countryName })}{' '}
              <strong>
                {country.delta >= 0 ? '+' : ''}
                {country.delta}
              </strong>{' '}
              {t('resultsExtra.iqPoints')}
            </p>
          </div>
        </section>
      )}

      {result.personalizedInsights && result.personalizedInsights.length > 0 && (
        <section className="section results-block">
          <p className="eyebrow">{t('resultsExtra.personalized')}</p>
          <h2 className="section-title section-title--wide">{t('resultsExtra.fromAnswers')}</h2>
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
          <p className="eyebrow">{t('resultsExtra.difficulty')}</p>
          <h2 className="section-title">{t('resultsExtra.byLevel')}</h2>
          <div className="difficulty-grid">
            {result.difficultyBreakdown.map((d) => (
              <article className="difficulty-card" key={d.level}>
                <p className="eyebrow">{t('resultsExtra.level', { n: d.level })}</p>
                <h3>{d.label}</h3>
                <p className="difficulty-card__score">{d.accuracy}%</p>
                <p>{t('resultsExtra.correctOf', { correct: d.correct, answered: d.answered })}</p>
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
          <p className="eyebrow">{t('resultsExtra.answerReview')}</p>
          <h2 className="section-title section-title--wide">{t('resultsExtra.everyItem')}</h2>
          <p className="section-lead">{t('resultsExtra.legend')}</p>
          <div className="item-review">
            {result.itemAnalysis.map((item) => (
              <div
                key={item.index}
                className={`item-chip item-chip--${item.status}`}
                title={`${item.index + 1} · D${item.difficulty} · ${item.status}`}
              >
                <span>{item.index + 1}</span>
                <small>D{item.difficulty}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section results-block">
        <p className="eyebrow">{t('resultsExtra.ability')}</p>
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
          <strong>{t('resultsExtra.recovery')}</strong>
          <p style={{ marginTop: '0.45rem', wordBreak: 'break-all', fontSize: '0.9rem' }}>{portableCode}</p>
          <p className="muted" style={{ marginTop: '0.4rem' }}>
            {t('resultsExtra.recoveryHint')}
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
          lang={lang}
        />
      </div>

      <section className="section results-block certificate-section">
        <p className="eyebrow">{t('resultsExtra.premiumCert')}</p>
        <h2 className="section-title section-title--wide">{t('resultsExtra.printReady')}</h2>
        <p className="section-lead">{t('resultsExtra.certLead')}</p>
        <CertificateView
          name={profile.name}
          iq={result.iq}
          band={result.band}
          percentile={result.percentile}
          testId={testId}
          issuedLabel={issued}
          countryComparison={result.countryComparison}
          answered={result.answered}
          questionTotal={result.questionTotal}
        />
      </section>
    </div>
  )
}
