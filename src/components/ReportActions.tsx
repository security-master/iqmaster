import {
  downloadCertificateHtml,
  downloadCertificatePng,
  printCertificatePdf,
  type CertificateDetails,
} from '../lib/report/certificate'
import { downloadReportHtml, printReportPdf, type ReportDetails } from '../lib/report/pdf'
import { ShareButtons } from './ShareButtons'

export type ReportActionsProps = ReportDetails & {
  lang?: 'en' | 'tr'
}

export function ReportActions(props: ReportActionsProps) {
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
        <p className="eyebrow">Paid unlock deliverables</p>
        <h2 id="report-actions-title">Your report &amp; certificate</h2>
        <p>
          Download the full personalized analysis, or take the premium certificate as its own PDF /
          image — ready for WhatsApp and social.
        </p>
      </div>

      <div className="report-actions__group">
        <h3 className="report-actions__label">Analysis report</h3>
        <div className="report-actions__buttons">
          <button
            className="btn btn-secondary"
            type="button"
            aria-label="Open print-ready analysis report to save as PDF"
            onClick={onPrintReport}
          >
            Download PDF report
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            aria-label="Download analysis report as HTML"
            onClick={onDownloadHtml}
          >
            Download HTML report
          </button>
        </div>
      </div>

      <div className="report-actions__group">
        <h3 className="report-actions__label">Certificate (separate)</h3>
        <div className="report-actions__buttons">
          <button
            className="btn btn-primary"
            type="button"
            disabled={!canIssueCertificate}
            aria-label="Open print-ready certificate to save as PDF"
            onClick={onPrintCertificate}
          >
            Download certificate PDF
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            disabled={!canIssueCertificate}
            aria-label="Download certificate as PNG image"
            onClick={() => void onDownloadCertificatePng()}
          >
            Download certificate image
          </button>
        </div>
        {!canIssueCertificate && (
          <p className="muted" style={{ marginTop: '0.6rem' }}>
            Answer at least one item before a certificate can be issued.
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
