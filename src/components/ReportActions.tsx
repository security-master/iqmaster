import type { CSSProperties } from 'react'
import { downloadReportHtml, printReportPdf, type ReportDetails } from '../lib/report/pdf'
import { ShareButtons } from './ShareButtons'

export type ReportActionsProps = ReportDetails

const actionsStyle = {
  display: 'grid',
  gap: '1.25rem',
  marginTop: '2rem',
  padding: '1.5rem',
  border: '1px solid var(--line)',
  borderRadius: 'var(--radius)',
  background: 'rgba(255, 255, 255, 0.78)',
} satisfies CSSProperties

const buttonRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
} satisfies CSSProperties

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
    <section className="no-print" aria-labelledby="report-actions-title" style={actionsStyle}>
      <div>
        <p className="eyebrow">Report actions</p>
        <h2 id="report-actions-title" style={{ marginTop: '0.45rem' }}>
          Download and share
        </h2>
        <p style={{ marginTop: '0.55rem' }}>
          Open a print-ready evaluation report (ability profile, confidence, integrity notes) for PDF
          save, or download the HTML fallback.
        </p>
      </div>

      <div style={buttonRowStyle}>
        <button
          className="btn btn-primary"
          type="button"
          aria-label="Open a print-ready IQMaster report to save as PDF"
          onClick={onPrintReport}
        >
          Download PDF
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
