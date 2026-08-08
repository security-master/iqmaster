import { Link } from 'react-router-dom'
import { MatrixSvg } from '../components/PuzzleSvg'
import { KIDS_TEST_BANK } from '../data/test-banks/kids'
import { useI18n } from '../i18n/I18nContext'
import { AGE_BANDS } from '../lib/test-catalog'

const KIDS_TEST_ROUTE = '/iq-test?track=kids'

const kidsBand = AGE_BANDS.find((band) => band.id === 'kids') ?? AGE_BANDS[0]
const previewItem = KIDS_TEST_BANK[0]

export function KidsIntro() {
  const { t } = useI18n()
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
          <p className="eyebrow">{t('kids.eyebrow')}</p>
          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', maxWidth: '14ch', marginTop: '0.6rem' }}>
            {t('kids.title')}
          </h1>
          <p style={{ marginTop: '1rem', maxWidth: '58ch', fontSize: '1.06rem' }}>{t('kids.lead')}</p>

          <div className="price-box" style={{ marginTop: '1.5rem' }}>
            <h2 style={{ fontSize: '1.45rem' }}>{t('kids.before')}</h2>
            <ul className="checklist">
              <li>{t('kids.b1', { range: kidsBand.rangeLabel })}</li>
              <li>{t('kids.b2', { count: kidsBand.itemCount })}</li>
              <li>{t('kids.b3')}</li>
              <li>{t('kids.b4')}</li>
            </ul>
          </div>

          <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
            <Link className="btn btn-primary" to={KIDS_TEST_ROUTE}>
              {t('kids.cta')}
            </Link>
            <Link className="btn btn-secondary" to="/age-groups">
              {t('kids.change')}
            </Link>
          </div>
        </section>

        <aside className="test-panel" aria-label={t('kids.sample')}>
          <p className="eyebrow">{t('kids.sample')}</p>
          <h2 style={{ fontSize: '1.35rem', marginTop: '0.35rem' }}>{previewItem.prompt}</h2>
          <div className="puzzle-stage">
            <MatrixSvg matrix={previewItem.matrix} />
          </div>
          <p className="muted">{t('kids.sampleNote')}</p>
        </aside>
      </div>
    </main>
  )
}
