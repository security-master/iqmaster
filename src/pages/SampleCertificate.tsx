import { CertificateView } from '../components/CertificateView'
import { useI18n } from '../i18n/I18nContext'

export function SampleCertificate() {
  const { t, lang } = useI18n()
  return (
    <div className="container page-hero">
      <p className="eyebrow">{t('sample.certEyebrow')}</p>
      <h1>{t('sample.certTitle')}</h1>
      <p>{t('sample.certLead')}</p>
      <div style={{ marginTop: '2rem' }}>
        <CertificateView
          name="Alex Rivera"
          iq={128}
          band={lang === 'tr' ? 'Üstün' : 'Superior'}
          percentile={97}
          testId="SAMPLEDEMO"
          issuedLabel={t('sample.issued')}
          answered={30}
          questionTotal={30}
          countryComparison={{
            countryCode: 'TR',
            countryName: lang === 'tr' ? 'Türkiye' : 'Türkiye',
            nationalAverage: 89,
            userIq: 128,
            delta: 39,
            label: '',
          }}
        />
      </div>
    </div>
  )
}
