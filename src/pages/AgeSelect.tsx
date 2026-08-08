import { Link } from 'react-router-dom'
import { CellSvg } from '../components/PuzzleSvg'
import { useI18n } from '../i18n/I18nContext'
import { AGE_BANDS, TEST_BANKS_BY_AGE, type AgeBand } from '../lib/test-catalog'

function bandPreviewCells(band: AgeBand) {
  if (band.id === 'kids') return TEST_BANKS_BY_AGE.kids[0]?.matrix
  if (band.id === 'teens') return TEST_BANKS_BY_AGE.teens[0]?.matrix
  return null
}

export function AgeSelect() {
  const { t } = useI18n()

  return (
    <main className="container test-shell">
      <p className="eyebrow">{t('age.eyebrow')}</p>
      <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', maxWidth: '13ch', marginTop: '0.6rem' }}>
        {t('age.title')}
      </h1>
      <p className="section-lead">{t('age.lead')}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {AGE_BANDS.map((band) => {
          const preview = bandPreviewCells(band)
          const label = t(`age.bands.${band.id}.label`)
          return (
            <article className="price-box" key={band.id} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p className="eyebrow">{band.rangeLabel}</p>
                <h2 style={{ fontSize: '1.8rem', marginTop: '0.35rem' }}>{label}</h2>
              </div>

              {preview ? (
                <div className="puzzle-stage" style={{ minHeight: 0, margin: 0, padding: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.45rem' }}>
                    {preview.slice(0, 3).map((cell, index) => (
                      <CellSvg key={index} cell={cell} missing={cell === null} size={58} />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="puzzle-stage"
                  style={{
                    minHeight: 0,
                    margin: 0,
                    padding: '1.2rem',
                    textAlign: 'center',
                    fontWeight: 700,
                    color: 'var(--teal)',
                  }}
                >
                  {t('age.fullAssessment')}
                </div>
              )}

              <div>
                <strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
                  {t(`age.bands.${band.id}.difficulty`)}
                </strong>
                <p style={{ marginTop: '0.4rem' }}>{t(`age.bands.${band.id}.description`)}</p>
              </div>

              <div className="stats-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 0 }}>
                <div className="stat">
                  <strong>{band.itemCount}</strong>
                  <span>{t('age.items')}</span>
                </div>
                <div className="stat">
                  <strong>{band.bankStatus === 'ready' ? t('age.ready') : t('age.current')}</strong>
                  <span>{t('age.bankStatus')}</span>
                </div>
              </div>

              <Link className="btn btn-primary" to={band.startPath}>
                {t('age.choose', { label })}
              </Link>
            </article>
          )
        })}
      </div>
    </main>
  )
}
