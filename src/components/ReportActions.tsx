import {
  downloadCertificateHtml,
  downloadCertificatePng,
  printCertificatePdf,
  type CertificateDetails,
} from '../lib/report/certificate'
import { downloadReportHtml, printReportPdf, type ReportDetails } from '../lib/report/pdf'
import { useI18n } from '../i18n/I18nContext'
import { ShareButtons } from './ShareButtons'

export type ReportActionsProps = ReportDetails & {
  lang?: 'en' | 'tr'
}

export function ReportActions(props: ReportActionsProps) {
  const { t } = useI18n()
  const report: ReportDetails = props
  const certificate: CertificateDetails = {
    name: props.name,
    iq: props.iq,
    band: props.band,
    percentile: props.percentile,
    testId: props.testId,
    countryComparison: props.countryComparison,
    answered: props.answered,
    questionTotal: props.questionTotal,
    completionMode: props.completionMode,
  }
  const canIssueCertificate = (props.answered ?? 0) > 0

  function onPrintReport() {
    if (!printReportPdf(report)) downloadReportHtml(report)
  }

  function onDownloadHtml() {
    downloadReportHtml(report)
  }

  function onPrintCertificate() {
    if (!canIssueCertificate) return
    if (!printCertificatePdf(certificate)) downloadCertificateHtml(certificate)
  }

  async function onDownloadCertificatePng() {
    if (!canIssueCertificate) return
    await downloadCertificatePng(certificate)
  }

  return (
    <section className="report-actions no-print" aria-labelledby="report-actions-title">
      <div>
        <p className="eyebrow">{t('reportUi.eyebrow')}</p>
        <h2 id="report-actions-title">{t('reportUi.title')}</h2>
        <p>{t('reportUi.lead')}</p>
      </div>

      <div className="report-actions__group">
        <h3 className="report-actions__label">{t('reportUi.analysis')}</h3>
        <div className="report-actions__buttons">
          <button className="btn btn-secondary" type="button" onClick={onPrintReport}>
            {t('reportUi.pdfReport')}
          </button>
          <button className="btn btn-secondary" type="button" onClick={onDownloadHtml}>
            {t('reportUi.htmlReport')}
          </button>
        </div>
      </div>

      <div className="report-actions__group">
        <h3 className="report-actions__label">{t('reportUi.certGroup')}</h3>
        <div className="report-actions__buttons">
          <button
            className="btn btn-primary"
            type="button"
            disabled={!canIssueCertificate}
            onClick={onPrintCertificate}
          >
            {t('reportUi.pdfCert')}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            disabled={!canIssueCertificate}
            onClick={() => void onDownloadCertificatePng()}
          >
            {t('reportUi.pngCert')}
          </button>
        </div>
        {!canIssueCertificate && (
          <p className="muted" style={{ marginTop: '0.6rem' }}>
            {t('reportUi.needAnswer')}
          </p>
        )}
      </div>

      <ShareButtons
        name={props.name}
        iq={props.iq}
        band={props.band}
        percentile={props.percentile}
        testId={props.testId}
        countryName={props.countryComparison?.countryName}
        delta={props.countryComparison?.delta}
        lang={props.lang}
        certificate={certificate}
      />
    </section>
  )
}
