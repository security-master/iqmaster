export function SampleCertificate() {
  return (
    <div className="container page-hero">
      <p className="eyebrow">Sample</p>
      <h1>IQ certificate preview</h1>
      <p>This is the premium layout you receive after unlocking results — with your name and score.</p>
      <div className="certificate certificate--elite" style={{ marginTop: '2rem', maxWidth: 760 }}>
        <div className="certificate__ornament" aria-hidden="true" />
        <p className="eyebrow">IQMaster Certificate</p>
        <h2>Certificate of Cognitive Assessment</h2>
        <p>This certifies that</p>
        <h3 className="certificate__name">Alex Rivera</h3>
        <p>
          completed the IQMaster culture-fair matrix assessment and achieved an estimated IQ score of
        </p>
        <div className="score-value certificate__score">128</div>
        <p>
          Band: <strong>Superior</strong> · Percentile: <strong>97</strong> · Türkiye:{' '}
          <strong>+39</strong>
        </p>
        <div className="certificate__seal" aria-hidden="true">
          IQ
          <span>MASTER</span>
        </div>
        <p className="muted certificate__meta">Full completion · 30/30 items · standard confidence</p>
        <p className="muted certificate__meta">Test ID SAMPLEDEMO · Issued for demonstration</p>
      </div>
    </div>
  )
}
