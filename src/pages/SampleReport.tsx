export function SampleReport() {
  return (
    <div className="container page-hero">
      <p className="eyebrow">Sample</p>
      <h1>IQ report preview</h1>
      <p>Unlocked reports combine score, accuracy, and plain-language interpretation.</p>

      <div className="results-hero" style={{ marginTop: '2rem' }}>
        <div className="score-ring">
          <div className="muted" style={{ fontWeight: 700 }}>
            Sample IQ
          </div>
          <div className="score-value">124</div>
          <p>
            <strong>High Average</strong>
          </p>
          <p>92nd percentile</p>
        </div>
        <div className="price-box">
          <h3>Analysis snapshot</h3>
          <ul className="checklist">
            <li>Accuracy: 80% (24 / 30)</li>
            <li>Stronger on mid-difficulty spatial items</li>
            <li>World ranking context: Top 10% globally</li>
            <li>Recommended: retake after rest for tighter estimate</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            Your live report adapts the summary to your exact accuracy and age profile.
          </p>
        </div>
      </div>
    </div>
  )
}
