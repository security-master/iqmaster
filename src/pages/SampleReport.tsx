import { useI18n } from '../i18n/I18nContext'

export function SampleReport() {
  const { t } = useI18n()
  return (
    <div className="container page-hero">
      <p className="eyebrow">{t('sample.reportEyebrow')}</p>
      <h1>{t('sample.reportTitle')}</h1>
      <p>{t('sample.reportLead')}</p>

      <div className="results-hero" style={{ marginTop: '2rem' }}>
        <div className="score-ring">
          <div className="muted" style={{ fontWeight: 700 }}>
            {t('sample.sampleIq')}
          </div>
          <div className="score-value">124</div>
          <p>
            <strong>{t('sample.highAverage')}</strong>
          </p>
          <p>{t('sample.percentile')}</p>
        </div>
        <div className="price-box">
          <h3>{t('sample.snapshot')}</h3>
          <ul className="checklist">
            <li>{t('sample.r1')}</li>
            <li>{t('sample.r2')}</li>
            <li>{t('sample.r3')}</li>
            <li>{t('sample.r4')}</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>{t('sample.reportNote')}</p>
        </div>
      </div>
    </div>
  )
}
