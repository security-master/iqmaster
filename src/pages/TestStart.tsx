import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getQuestionsForTrack, parseTrack } from '../lib/banks'
import { createSession } from '../lib/session'

export function TestStart() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const track = parseTrack(params.get('track'))
  const questions = getQuestionsForTrack(track)
  const [accepted, setAccepted] = useState(false)

  const title =
    track === 'kids' ? 'Kids visual test' : track === 'teens' ? 'Teens visual test' : 'Adult IQ test'

  function start() {
    const session = createSession(track)
    navigate(`/iq-test/${session.testId}/1`)
  }

  return (
    <div className="container test-shell">
      <p className="eyebrow">IQMaster assessment · {track}</p>
      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: '16ch' }}>
        Ready to start the {title}?
      </h1>
      <p style={{ marginTop: '1rem', maxWidth: '58ch' }}>
        Find a quiet place, close extra tabs, and silence notifications. This track has{' '}
        {questions.length} visual pattern questions. Maximum time: 60 minutes. You can move back and
        forth, or finish early for a confidence-adjusted score.
      </p>

      <div className="price-box" style={{ marginTop: '1.75rem' }}>
        <h3>Before you begin</h3>
        <ul className="checklist">
          <li>Visual-only items — no number puzzles</li>
          <li>One best answer per matrix</li>
          <li>Taking the test is free — full report unlock is $19 (or 1 org credit)</li>
          <li>You will receive a Test ID and security code</li>
        </ul>
      </div>

      <label
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          marginTop: '1.5rem',
          fontWeight: 600,
          maxWidth: '54ch',
        }}
      >
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          style={{ marginTop: '0.3rem' }}
        />
        I understand this is an entertainment/education assessment, not a clinical evaluation, and I
        accept the testing guidelines.
      </label>

      <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
        <button className="btn btn-primary" disabled={!accepted} onClick={start}>
          Yes, I&apos;m ready — start
        </button>
        <Link to="/age-groups" className="btn btn-secondary">
          Change age group
        </Link>
      </div>
    </div>
  )
}
