import { Navigate, useParams } from 'react-router-dom'
import { formatElapsed, getSession } from '../lib/session'

export function TestResults() {
  const { testId = '' } = useParams()
  const session = getSession(testId)

  if (!session) return <Navigate to="/iq-test" replace />
  if (!session.paid) return <Navigate to={`/iq-test/${testId}/payment`} replace />
  if (!session.profile || !session.result) {
    return <Navigate to={`/iq-test/${testId}/complete`} replace />
  }

  const { profile, result } = session

  return (
    <div className="container test-shell">
      <p className="eyebrow">Your results</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Assessment complete</h1>
      <p style={{ marginTop: '0.75rem' }}>
        Test ID <strong>{testId}</strong> · Security code <strong>{session.securityCode}</strong> ·
        Time {formatElapsed(session.elapsedSeconds)}
      </p>

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
            {result.percentile}th percentile · {result.worldRankLabel}
          </p>
        </div>
        <div className="price-box">
          <h3>Score analysis</h3>
          <p style={{ marginTop: '0.7rem' }}>{result.summary}</p>
          <ul className="checklist">
            <li>
              Accuracy: {result.accuracy}% ({result.correct}/{result.total})
            </li>
            <li>Profile: {profile.name}, age {profile.age}</li>
            <li>Gender selection recorded for reporting context</li>
            <li>Keep your security code to reopen this page later</li>
          </ul>
          <button className="btn btn-secondary no-print" style={{ marginTop: '1.2rem' }} onClick={() => window.print()}>
            Print certificate
          </button>
        </div>
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
        <p className="muted" style={{ marginTop: '1rem' }}>
          Test ID {testId} · Issued {new Date(session.finishedAt ?? session.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
