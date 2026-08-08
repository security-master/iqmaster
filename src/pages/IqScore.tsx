import { Link } from 'react-router-dom'

const bands = [
  { range: '130+', label: 'Superior / Very Superior' },
  { range: '115–129', label: 'High Average' },
  { range: '100–114', label: 'Average to High Average' },
  { range: '85–99', label: 'Low Average to Average' },
  { range: '70–84', label: 'Below Average band' },
]

export function IqScore() {
  return (
    <div className="container page-hero">
      <p className="eyebrow">IQ score guide</p>
      <h1>Mean 100. Context included.</h1>
      <p>
        IQMaster maps accuracy on 30 matrices to an IQ-like scale (mean 100, SD ≈ 15) and shows
        percentile so the number is readable.
      </p>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <div className="prose">
          <h2>How to read a score</h2>
          <p>
            Roughly 68% of people fall between 85 and 115. A jump of 15 points is about one standard
            deviation — meaningful, but still an estimate on a short online form.
          </p>
          <h2>Percentile vs IQ</h2>
          <p>
            Percentile answers “how many people score below this?” An IQ near 115 is around the 84th
            percentile. IQMaster always shows both.
          </p>
          <Link to="/iq-test" className="btn btn-primary">
            Measure yours
          </Link>
        </div>
        <div className="price-box">
          <h3 style={{ marginBottom: '1rem' }}>Score bands</h3>
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
