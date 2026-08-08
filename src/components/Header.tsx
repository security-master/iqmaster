import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

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
          <span>
            IQMaster
            <small>Certificate IQ Test</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
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
            Certificate
          </NavLink>
          <NavLink to="/blog" onClick={close}>
            {t('nav.blog')}
          </NavLink>
          <NavLink to="/faq" onClick={close}>
            {t('nav.faq')}
          </NavLink>
          <div className="lang-toggle" role="group" aria-label={t('common.language')}>
            <button
              type="button"
              className={lang === 'en' ? 'active' : undefined}
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <span aria-hidden="true">|</span>
            <button
              type="button"
              className={lang === 'tr' ? 'active' : undefined}
              aria-pressed={lang === 'tr'}
              onClick={() => setLang('tr')}
            >
              TR
            </button>
          </div>
          <Link to="/iq-test" className="btn btn-primary nav-cta" onClick={close}>
            {t('nav.startTest')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
