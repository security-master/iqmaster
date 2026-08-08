import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { COUNTRY_IQ } from '../data/country-iq'
import { getQuestionsForTrack } from '../lib/banks'
import type { Gender } from '../lib/iq'
import { completeProfile, countAnswered, getSession } from '../lib/session'

export function TestComplete() {
  const { testId = '' } = useParams()
  const navigate = useNavigate()
  const session = getSession(testId)
  const [error, setError] = useState('')

  if (!session) return <Navigate to="/iq-test" replace />

  const questionTotal = getQuestionsForTrack(session.track).length
  const answeredCount = session.answeredCount ?? countAnswered(session.answers)
  const completionMode = answeredCount >= questionTotal ? 'full' : 'early'

  if (answeredCount < 1) {
    return <Navigate to={`/iq-test/${testId}/1`} replace />
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const age = Number(data.get('age'))
    const gender = String(data.get('gender')) as Gender
    const countryCode = String(data.get('country') ?? '').trim()
    if (!name || !age || age < 8 || age > 100 || !gender || !countryCode) {
      setError('Please provide a valid name, age (8–100), gender, and country.')
      return
    }
    completeProfile(testId, { name, age, gender, countryCode })
    navigate(`/iq-test/${testId}/payment`)
  }

  return (
    <div className="container test-shell">
      <p className="eyebrow">Completed</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Your test has been submitted</h1>
      <p style={{ marginTop: '0.8rem', maxWidth: '52ch' }}>
        Enter your details to personalize the certificate, national IQ comparison, and age-normed
        report. Test ID: <strong>{testId}</strong>
      </p>
      <p className="notice" style={{ marginTop: '1rem' }}>
        Answered {answeredCount} of {questionTotal} items ·{' '}
        {completionMode === 'full' ? 'Full completion' : 'Early finish with confidence-adjusted scoring'}
      </p>

      <form className="form-grid" style={{ marginTop: '2rem' }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Full name *</label>
          <input id="name" name="name" required placeholder="As it should appear on the certificate" />
        </div>
        <div className="field">
          <label htmlFor="age">Age *</label>
          <input id="age" name="age" type="number" min={8} max={100} required />
        </div>
        <div className="field">
          <label htmlFor="gender">Gender *</label>
          <select id="gender" name="gender" required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="country">Country *</label>
          <select id="country" name="country" required defaultValue="TR">
            {COUNTRY_IQ.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} (avg IQ {c.average})
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Continue to unlock results
        </button>
        {error && <p className="notice">{error}</p>}
      </form>
    </div>
  )
}
