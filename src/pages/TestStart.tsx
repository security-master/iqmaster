import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSession } from '../lib/session'

export function TestStart() {
  const navigate = useNavigate()
  const [accepted, setAccepted] = useState(false)

  function start() {
    const session = createSession()
    navigate(`/iq-test/${session.testId}/1`)
  }

  return (
    <div className="container test-shell">
      <p className="eyebrow">IQMaster assessment</p>
      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: '16ch' }}>
        Ready to start the IQ test?
      </h1>
      <p style={{ marginTop: '1rem', maxWidth: '58ch' }}>
        Find a quiet place, close extra tabs, and silence notifications. The test has 30 questions
        with rising difficulty. Maximum time: 60 minutes. You can move back and forth before finishing.
      </p>

      <div className="price-box" style={{ marginTop: '1.75rem' }}>
        <h3>Before you begin</h3>
        <ul className="checklist">
          <li>No reference materials or second devices</li>
          <li>One best answer per matrix</li>
          <li>Taking the test is free — full report unlock is $19</li>
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

      <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} disabled={!accepted} onClick={start}>
        Yes, I&apos;m ready — start my IQ test
      </button>
    </div>
  )
}
