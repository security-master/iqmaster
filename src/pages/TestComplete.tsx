import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { COUNTRY_IQ } from '../data/country-iq'
import { useI18n } from '../i18n/I18nContext'
import { getQuestionsForTrack } from '../lib/banks'
import type { Gender } from '../lib/iq'
import { completeProfile, countAnswered, getSession } from '../lib/session'

export function TestComplete() {
  const { testId = '' } = useParams()
  const navigate = useNavigate()
  const session = getSession(testId)
  const [error, setError] = useState('')
  const { t, lang } = useI18n()

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
      setError(t('test.complete.error'))
      return
    }
    completeProfile(testId, { name, age, gender, countryCode })
    navigate(`/iq-test/${testId}/payment`)
  }

  return (
    <div className="container test-shell">
      <p className="eyebrow">{t('test.complete.eyebrow')}</p>
      <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{t('test.complete.title')}</h1>
      <p style={{ marginTop: '0.8rem', maxWidth: '52ch' }}>
        {t('test.complete.lead', { testId })}
      </p>
      <p className="notice" style={{ marginTop: '1rem' }}>
        {t('test.complete.answered', {
          answered: answeredCount,
          total: questionTotal,
          mode: completionMode === 'full' ? t('test.complete.fullMode') : t('test.complete.earlyMode'),
        })}
      </p>

      <form className="form-grid" style={{ marginTop: '2rem' }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">{t('test.complete.name')}</label>
          <input
            id="name"
            name="name"
            required
            placeholder={t('test.complete.namePlaceholder')}
          />
        </div>
        <div className="field">
          <label htmlFor="age">{t('test.complete.age')}</label>
          <input id="age" name="age" type="number" min={8} max={100} required />
        </div>
        <div className="field">
          <label htmlFor="gender">{t('test.complete.gender')}</label>
          <select id="gender" name="gender" required defaultValue="">
            <option value="" disabled>
              {t('test.complete.select')}
            </option>
            <option value="female">{t('test.complete.female')}</option>
            <option value="male">{t('test.complete.male')}</option>
            <option value="other">{t('test.complete.other')}</option>
            <option value="prefer_not">{t('test.complete.preferNot')}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="country">{t('test.complete.country')}</label>
          <select id="country" name="country" required defaultValue="TR">
            {COUNTRY_IQ.map((c) => (
              <option key={c.code} value={c.code}>
                {lang === 'tr' ? c.nameTr : c.name} ({t('test.complete.avgIq', { average: c.average })})
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          {t('test.complete.continue')}
        </button>
        {error && <p className="notice">{error}</p>}
      </form>
    </div>
  )
}
