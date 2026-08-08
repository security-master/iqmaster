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
  const displayBand = cleanBandLabel(band)
  const country = countryComparison
  const coverage =
    answered != null && questionTotal != null ? `${answered}/${questionTotal} items` : null

  return (
    <article
      className={`cert-sheet ${className}`.trim()}
      id="certificate"
      aria-label="IQMaster Certificate"
    >
      <div className="cert-sheet__corner cert-sheet__corner--tl" aria-hidden="true" />
      <div className="cert-sheet__corner cert-sheet__corner--tr" aria-hidden="true" />
      <div className="cert-sheet__corner cert-sheet__corner--bl" aria-hidden="true" />
      <div className="cert-sheet__corner cert-sheet__corner--br" aria-hidden="true" />
      <div className="cert-sheet__watermark" aria-hidden="true">
        IQMASTER
      </div>

      <div className="cert-sheet__inner">
        <p className="cert-sheet__brand">IQMaster</p>
        <div className="cert-sheet__rule" aria-hidden="true" />
        <h2 className="cert-sheet__title">Certificate of Cognitive Assessment</h2>
        <p className="cert-sheet__lede">This certifies that</p>
        <h3 className="cert-sheet__name">{name}</h3>
        <p className="cert-sheet__body">
          completed the IQMaster culture-fair matrix assessment and achieved an estimated IQ score
          of
        </p>

        <div className="cert-sheet__score" aria-label={`IQ score ${iq}`}>
          <strong>{iq}</strong>
          <span>IQ score</span>
        </div>

        <p className="cert-sheet__meta">
          Band <strong>{displayBand}</strong> · {ordinal(percentile)} percentile
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
          Test ID {testId} · Issued {issuedLabel}
        </p>
      </div>
    </article>
  )
}
