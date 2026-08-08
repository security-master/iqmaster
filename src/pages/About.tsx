import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'

export function About() {
  const { t } = useI18n()
  return (
    <div className="page-shell">
      <Seo title={t('about.seoTitle')} description={t('about.seoDescription')} />
      <section className="container page-hero page-hero-card">
        <p className="eyebrow">{t('about.eyebrow')}</p>
        <h1>{t('about.title')}</h1>
        <p>{t('about.lead')}</p>
      </section>

      <section className="container section about-grid">
        <article className="content-card">
          <h2>{t('about.whoTitle')}</h2>
          <p>{t('about.whoText')}</p>
        </article>
        <article className="content-card">
          <h2>{t('about.notTitle')}</h2>
          <p>{t('about.notText')}</p>
        </article>
        <article className="content-card accent-card">
          <h2>{t('about.goalsTitle')}</h2>
          <ul className="checklist">
            <li>{t('about.goal1')}</li>
            <li>{t('about.goal2')}</li>
            <li>{t('about.goal3')}</li>
            <li>{t('about.goal4')}</li>
          </ul>
          <Link to="/iq-test" className="btn btn-primary">
            {t('about.cta')}
          </Link>
        </article>
      </section>
    </div>
  )
}
