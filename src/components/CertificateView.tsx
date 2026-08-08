import { useI18n } from '../i18n/I18nContext'
import { cleanBandLabel, ordinal } from '../lib/iq'
import type { ScoreResult } from '../lib/iq'

export type CertificateViewProps = {
  name: string
  iq: number
  band: string
  percentile: number
  testId: string
  issuedLabel: string
  countryComparison?: ScoreResult['countryComparison']
  answered?: number
  questionTotal?: number
  className?: string
}

export function CertificateView({
  name,
  iq,
  band,
  percentile,
  testId,
  issuedLabel,
  countryComparison,
  answered,
  questionTotal,
  className = '',
}: CertificateViewProps) {
  const { t } = useI18n()
  const displayBand = cleanBandLabel(band)
  const country = countryComparison
  const coverage =
    answered != null && questionTotal != null
      ? t('certUi.items', { answered, total: questionTotal })
      : null

  return (
    <article
      className={`cert-sheet ${className}`.trim()}
      id="certificate"
      aria-label={t('certUi.title')}
    >
      <div className="cert-sheet__corner cert-sheet__corner--tl" aria-hidden="true" />
      <div className="cert-sheet__corner cert-sheet__corner--tr" aria-hidden="true" />
      <div className="cert-sheet__corner cert-sheet__corner--bl" aria-hidden="true" />
      <div className="cert-sheet__corner cert-sheet__corner--br" aria-hidden="true" />
      <div className="cert-sheet__watermark" aria-hidden="true">
        IQMASTER
      </div>

      <div className="cert-sheet__inner">
        <p className="cert-sheet__brand">{t('certUi.brand')}</p>
        <div className="cert-sheet__rule" aria-hidden="true" />
        <h2 className="cert-sheet__title">{t('certUi.title')}</h2>
        <p className="cert-sheet__lede">{t('certUi.lede')}</p>
        <h3 className="cert-sheet__name">{name}</h3>
        <p className="cert-sheet__body">{t('certUi.body')}</p>

        <div className="cert-sheet__score" aria-label={`${t('certUi.iqScore')} ${iq}`}>
          <strong>{iq}</strong>
          <span>{t('certUi.iqScore')}</span>
        </div>

        <p className="cert-sheet__meta">
          {t('certUi.band')} <strong>{displayBand}</strong> · {ordinal(percentile)}{' '}
          {t('certUi.percentile')}
          {country ? (
            <>
              {' '}
              · {country.countryName}:{' '}
              <strong>
                {country.delta >= 0 ? '+' : ''}
                {country.delta}
              </strong>
            </>
          ) : null}
        </p>

        <div className="cert-sheet__seal" aria-hidden="true">
          IQ
          <small>MASTER</small>
        </div>

        <p className="cert-sheet__foot">
          {coverage ? `${coverage} · ` : ''}
          {t('certUi.testId', { id: testId, date: issuedLabel })}
        </p>
      </div>
    </article>
  )
}
