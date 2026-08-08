import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { getQuestionsForTrack, parseTrack } from '../lib/banks'
import { createSession } from '../lib/session'

export function TestStart() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const track = parseTrack(params.get('track'))
  const questions = getQuestionsForTrack(track)
  const [accepted, setAccepted] = useState(false)
  const { t } = useI18n()

  const titleKey =
    track === 'kids' ? 'test.start.titleKids' : track === 'teens' ? 'test.start.titleTeens' : 'test.start.titleAdult'
  const title = t(titleKey)

  function start() {
    const session = createSession(track)
    navigate(`/iq-test/${session.testId}/1`)
  }

  return (
    <div className="container test-shell">
      <p className="eyebrow">{t('test.start.eyebrow', { track })}</p>
      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: '18ch' }}>
        {t('test.start.heading', { title })}
      </h1>
      <p style={{ marginTop: '1rem', maxWidth: '58ch' }}>
        {t('test.start.lead', { count: questions.length })}
      </p>

      <div className="price-box" style={{ marginTop: '1.75rem' }}>
        <h3>{t('test.start.before')}</h3>
        <ul className="checklist">
          <li>{t('test.start.bullet1')}</li>
          <li>{t('test.start.bullet2')}</li>
          <li>{t('test.start.bullet3')}</li>
          <li>{t('test.start.bullet4')}</li>
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
        {t('test.start.accept')}
      </label>

      <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
        <button className="btn btn-primary" disabled={!accepted} onClick={start}>
          {t('test.start.cta')}
        </button>
        <Link to="/age-groups" className="btn btn-secondary">
          {t('test.start.changeAge')}
        </Link>
      </div>
    </div>
  )
}
