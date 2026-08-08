import { Link } from 'react-router-dom'
import { PROGRESS } from '../data/progress'

function barFill(percent: number) {
  return {
    width: `${Math.max(0, Math.min(100, percent))}%`,
  }
}

export function ProgressBoard() {
  const { totalPercent, phase, updatedAt, branch, workstreams, criteria } = PROGRESS

  return (
    <div className="container page-hero">
      <p className="eyebrow">Orkestra panosu</p>
      <h1>Platform v1 ilerleme</h1>
      <p>
        Canlı durum panosu — branch <code>{branch}</code> · güncelleme {updatedAt}
      </p>

      <div className="price-box" style={{ marginTop: '2rem', maxWidth: 720 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            alignItems: 'baseline',
            flexWrap: 'wrap',
          }}
        >
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem' }}>
            {totalPercent}%
          </strong>
          <span className="muted" style={{ fontWeight: 700 }}>
            {phase}
          </span>
        </div>
        <div
          aria-label={`Toplam ilerleme ${totalPercent} yüzde`}
          style={{
            marginTop: '1rem',
            height: 18,
            borderRadius: 999,
            background: 'rgba(91, 33, 182, 0.12)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              ...barFill(totalPercent),
              height: '100%',
              borderRadius: 999,
              background: 'linear-gradient(90deg, #7c3aed, #5b21b6)',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'grid', gap: '0.85rem' }}>
        {workstreams.map((item) => (
          <article
            key={item.id}
            className="price-box"
            style={{ padding: '1.1rem 1.25rem', boxShadow: 'none' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <h2 style={{ fontSize: '1.15rem', margin: 0 }}>
                {item.id}. {item.title}
              </h2>
              <span
                style={{
                  fontWeight: 800,
                  color: item.status === 'done' ? 'var(--teal, #0f766e)' : '#7c3aed',
                }}
              >
                {item.percent}% · {item.status}
              </span>
            </div>
            <p style={{ marginTop: '0.45rem' }}>{item.summary}</p>
            <div
              style={{
                marginTop: '0.75rem',
                height: 10,
                borderRadius: 999,
                background: 'rgba(16, 20, 28, 0.08)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  ...barFill(item.percent),
                  height: '100%',
                  borderRadius: 999,
                  background: item.status === 'done' ? '#0f766e' : '#7c3aed',
                }}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="price-box" style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.35rem' }}>v1 kabul kriterleri</h2>
        <ul className="checklist" style={{ marginTop: '0.8rem' }}>
          {criteria.map((c) => (
            <li key={c.label} style={{ opacity: c.done ? 1 : 0.55 }}>
              {c.done ? '✓' : '○'} {c.label}
            </li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: '1.75rem' }}>
        <Link to="/age-groups" className="btn btn-primary">
          Teste başla
        </Link>{' '}
        <Link to="/packages" className="btn btn-secondary" style={{ marginLeft: '0.5rem' }}>
          Paketleri gör
        </Link>
      </p>
      <p className="muted" style={{ marginTop: '1rem', fontSize: '0.92rem' }}>
        Aynı özet dosyada da var: <code>docs/PROGRESS.md</code>
      </p>
    </div>
  )
}
