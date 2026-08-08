export function SampleCertificate() {
  return (
    <div className="container page-hero">
      <p className="eyebrow">Sample</p>
      <h1>IQ certificate preview</h1>
      <p>This is the layout you receive after unlocking results — with your name and score.</p>
      <div className="certificate" style={{ marginTop: '2rem', maxWidth: 720 }}>
        <p className="eyebrow">IQMaster Certificate</p>
        <h2>Certificate of Cognitive Assessment</h2>
        <p>This certifies that</p>
        <h3 style={{ fontSize: '2rem', margin: '0.6rem 0' }}>Alex Rivera</h3>
        <p>
          completed the IQMaster culture-fair matrix assessment and achieved an estimated IQ score of
        </p>
        <div className="score-value" style={{ fontSize: '4rem', margin: '0.8rem 0' }}>
          128
        </div>
        <p>
          Band: <strong>Superior</strong> · Percentile: <strong>97</strong>
        </p>
        <p className="muted" style={{ marginTop: '1rem' }}>
          Test ID SAMPLEDEMO · Issued for demonstration
        </p>
      </div>
    </div>
  )
}
