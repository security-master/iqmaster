import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'

export function Pricing() {
  const { t } = useI18n()
  return (
    <div className="container page-hero">
      <Seo title={t('pricing.seoTitle')} description={t('pricing.seoDescription')} />
      <p className="eyebrow">{t('pricing.eyebrow')}</p>
      <h1>{t('pricing.title')}</h1>
      <p>{t('pricing.lead')}</p>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <div className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            {t('pricing.package')}
          </div>
          <div className="price">$19</div>
          <p>{t('pricing.flat')}</p>
          <ul className="checklist">
            <li>{t('pricing.f1')}</li>
            <li>{t('pricing.f2')}</li>
            <li>{t('pricing.f3')}</li>
            <li>{t('pricing.f4')}</li>
            <li>{t('pricing.f5')}</li>
          </ul>
          <Link to="/iq-test" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            {t('pricing.cta')}
          </Link>
        </div>
        <div className="prose">
          <h2>{t('pricing.whyTitle')}</h2>
          <p>{t('pricing.whyText')}</p>
          <h2>{t('pricing.demoTitle')}</h2>
          <p>{t('pricing.demoText')}</p>
        </div>
      </div>
    </div>
  )
}
