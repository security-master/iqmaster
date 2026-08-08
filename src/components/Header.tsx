import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

export function Header() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useI18n()

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
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
          Menu
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <NavLink to="/progress" onClick={() => setOpen(false)}>
            {t('nav.progress')}
          </NavLink>
          <NavLink to="/age-groups" onClick={() => setOpen(false)}>
            {t('nav.ageGroups')}
          </NavLink>
          <NavLink to="/packages" onClick={() => setOpen(false)}>
            {t('nav.packages')}
          </NavLink>
          <NavLink to="/for-organizations" onClick={() => setOpen(false)}>
            {t('nav.organizations')}
          </NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)}>
            {t('nav.blog')}
          </NavLink>
          <NavLink to="/faq" onClick={() => setOpen(false)}>
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
          <Link to="/age-groups" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            {t('nav.startTest')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
