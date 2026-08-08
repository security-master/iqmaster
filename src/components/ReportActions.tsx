import { downloadReportHtml, printReportPdf, type ReportDetails } from '../lib/report/pdf'
import { ShareButtons } from './ShareButtons'

export type ReportActionsProps = ReportDetails

export function ReportActions(props: ReportActionsProps) {
  const report: ReportDetails = props

  function onPrintReport() {
    if (!printReportPdf(report)) {
      downloadReportHtml(report)
    }
  }

  function onDownloadHtml() {
    downloadReportHtml(report)
  }

  return (
    <section className="report-actions no-print" aria-labelledby="report-actions-title">
      <div>
        <p className="eyebrow">Paid unlock deliverables</p>
        <h2 id="report-actions-title">Download your PDF dossier</h2>
        <p>
          Get a comprehensive, personalized report: national comparison, difficulty breakdown,
          item-level correct/incorrect map, ability profile, integrity notes, and a print-ready
          certificate page.
        </p>
      </div>

      <div className="report-actions__buttons">
        <button
          className="btn btn-primary"
          type="button"
          aria-label="Open a print-ready IQMaster report to save as PDF"
          onClick={onPrintReport}
        >
          Download PDF report
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          aria-label="Download the IQMaster report as an HTML file"
          onClick={onDownloadHtml}
        >
          Download HTML report
        </button>
      </div>

      <ShareButtons
        name={props.name}
        iq={props.iq}
        band={props.band}
        percentile={props.percentile}
        testId={props.testId}
      />
    </section>
  )
}
