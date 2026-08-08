import { Link } from 'react-router-dom'
import { MatrixSvg } from '../components/PuzzleSvg'
import { KIDS_TEST_BANK } from '../data/test-banks/kids'
import { AGE_BANDS } from '../lib/test-catalog'

export const KIDS_TEST_ROUTE_SUGGESTION = '/kids-test'

const kidsBand = AGE_BANDS.find((band) => band.id === 'kids') ?? AGE_BANDS[0]
const previewItem = KIDS_TEST_BANK[0]

export function KidsIntro() {
  return (
    <main className="container test-shell">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <section>
          <p className="eyebrow">Kids visual track</p>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', maxWidth: '12ch', marginTop: '0.6rem' }}>
            A calmer start for young pattern solvers
          </h1>
          <p style={{ marginTop: '1rem', maxWidth: '58ch', fontSize: '1.06rem' }}>
            The kids track uses large shapes, friendly teal and amber colors, and fewer answer
            choices. Every item is visual: no arithmetic, word trivia, or numeral cells.
          </p>

          <div className="price-box" style={{ marginTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.45rem' }}>Before starting</h2>
            <ul className="checklist">
              <li>Best fit for ages {kidsBand.rangeLabel}</li>
              <li>{kidsBand.itemCount} visual pattern items</li>
              <li>Use encouragement, but let the child choose answers independently</li>
              <li>Pause if the session stops feeling playful or focused</li>
            </ul>
          </div>

          <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
            <Link className="btn btn-primary" to={KIDS_TEST_ROUTE_SUGGESTION}>
              Start kids visual test
            </Link>
            <Link className="btn btn-secondary" to="/age-groups">
              Choose another age group
            </Link>
          </div>
        </section>

        <aside className="test-panel" aria-label="Kids test preview">
          <p className="eyebrow">Sample item</p>
          <h2 style={{ fontSize: '1.35rem', marginTop: '0.35rem' }}>{previewItem.prompt}</h2>
          <div className="puzzle-stage">
            <MatrixSvg matrix={previewItem.matrix} />
          </div>
          <p className="muted">
            The real track uses the same picture-completion format with simple visual rules.
          </p>
        </aside>
      </div>
    </main>
  )
}
