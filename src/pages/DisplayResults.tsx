import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { findByCredentials } from '../lib/session'

export function DisplayResults() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const testId = String(data.get('testId') ?? '')
    const securityCode = String(data.get('securityCode') ?? '')
    const session = findByCredentials(testId, securityCode)
    if (!session) {
      setError('No matching session. Check your Test ID and security code.')
      return
    }
    if (!session.paid) {
      navigate(`/iq-test/${session.testId}/payment`)
      return
    }
    navigate(`/iq-test/${session.testId}/results`)
  }

  return (
    <div className="container page-hero">
      <p className="eyebrow">Welcome back</p>
      <h1>Display your results</h1>
      <p>Enter the Test ID and security code from your completion screen.</p>

      <form className="form-grid" style={{ marginTop: '2rem' }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="testId">Test ID</label>
          <input id="testId" name="testId" placeholder="e.g. AB12CD34EF" required />
        </div>
        <div className="field">
          <label htmlFor="securityCode">Security code</label>
          <input id="securityCode" name="securityCode" placeholder="6-digit code" required />
        </div>
        <button className="btn btn-primary" type="submit">
          Sign in to results
        </button>
        {error && <p className="notice">{error}</p>}
      </form>
    </div>
  )
}
