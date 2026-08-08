import { CertificateView } from '../components/CertificateView'

export function SampleCertificate() {
  return (
    <div className="container page-hero">
      <p className="eyebrow">Sample</p>
      <h1>IQ certificate preview</h1>
      <p>
        This is the premium layout you receive after unlocking results — downloadable on its own as
        PDF or image, separate from the analysis report.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <CertificateView
          name="Alex Rivera"
          iq={128}
          band="Superior"
          percentile={97}
          testId="SAMPLEDEMO"
          issuedLabel="for demonstration"
          answered={30}
          questionTotal={30}
          countryComparison={{
            countryCode: 'TR',
            countryName: 'Türkiye',
            nationalAverage: 89,
            userIq: 128,
            delta: 39,
            label: 'Well above the Türkiye national average',
          }}
        />
      </div>
    </div>
  )
}
