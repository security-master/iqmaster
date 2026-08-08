import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

function FlagGB() {
  return (
    <svg className="lang-flag" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

function FlagTR() {
  return (
    <svg className="lang-flag" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
      <rect width="60" height="40" fill="#E30A17" />
      <circle cx="26" cy="20" r="10" fill="#fff" />
      <circle cx="30.5" cy="20" r="8" fill="#E30A17" />
      <path
        fill="#fff"
        d="M39.2 20l3.3 1.05-2.05-2.85 2.05-2.85-3.3 1.05-2.05-2.85v3.7l-3.3 1.05 3.3 1.05v3.7z"
      />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useI18n()

  function close() {
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">IQ</span>
          <span className="brand-text">
            <strong>IQMaster</strong>
            <small>{t('nav.tagline')}</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label={t('nav.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t('nav.close') : t('nav.menu')}
        </button>

        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          <div className="nav-links">
            <NavLink to="/age-groups" onClick={close}>
              {t('nav.ageGroups')}
            </NavLink>
            <NavLink to="/packages" onClick={close}>
              {t('nav.packages')}
            </NavLink>
            <NavLink to="/for-organizations" onClick={close}>
              {t('nav.organizations')}
            </NavLink>
            <NavLink to="/sample-certificate" onClick={close}>
              {t('nav.certificate')}
            </NavLink>
            <NavLink to="/blog" onClick={close}>
              {t('nav.blog')}
            </NavLink>
            <NavLink to="/faq" onClick={close}>
              {t('nav.faq')}
            </NavLink>
          </div>

          <div className="nav-tools">
            <div className="lang-toggle" role="group" aria-label={t('common.language')}>
              <button
                type="button"
                className={lang === 'en' ? 'active' : undefined}
                aria-pressed={lang === 'en'}
                aria-label="English"
                title="English"
                onClick={() => setLang('en')}
              >
                <FlagGB />
                <span>EN</span>
              </button>
              <button
                type="button"
                className={lang === 'tr' ? 'active' : undefined}
                aria-pressed={lang === 'tr'}
                aria-label="Türkçe"
                title="Türkçe"
                onClick={() => setLang('tr')}
              >
                <FlagTR />
                <span>TR</span>
              </button>
            </div>

            <Link to="/iq-test" className="btn btn-primary nav-cta" onClick={close}>
              {t('nav.startTest')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
