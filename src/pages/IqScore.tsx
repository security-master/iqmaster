import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

export function IqScore() {
  const { t } = useI18n()
  const bands = [
    { range: '130+', label: t('iqGuide.b1') },
    { range: '115–129', label: t('iqGuide.b2') },
    { range: '100–114', label: t('iqGuide.b3') },
    { range: '85–99', label: t('iqGuide.b4') },
    { range: '70–84', label: t('iqGuide.b5') },
  ]

  return (
    <div className="container page-hero">
      <p className="eyebrow">{t('iqGuide.eyebrow')}</p>
      <h1>{t('iqGuide.title')}</h1>
      <p>{t('iqGuide.lead')}</p>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <div className="prose">
          <h2>{t('iqGuide.readTitle')}</h2>
          <p>{t('iqGuide.readText')}</p>
          <h2>{t('iqGuide.pctTitle')}</h2>
          <p>{t('iqGuide.pctText')}</p>
          <Link to="/iq-test" className="btn btn-primary">
            {t('iqGuide.cta')}
          </Link>
        </div>
        <div className="price-box">
          <h3 style={{ marginBottom: '1rem' }}>{t('iqGuide.bands')}</h3>
          {bands.map((b) => (
            <div
              key={b.range}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--line)',
                fontWeight: 600,
              }}
            >
              <span>{b.range}</span>
              <span className="muted">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
