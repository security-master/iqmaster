import { ordinal } from '../iq'

export interface ReportDetails {
  name: string
  iq: number
  band: string
  percentile: number
  testId: string
  generatedAt?: Date
}

export interface ReportFileOptions {
  filename?: string
}

const REPORT_TITLE = 'IQMaster Evaluation Report'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function sanitizeFilenamePart(value: string): string {
  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return cleaned || 'iqmaster-report'
}

export function getReportFilename(report: Pick<ReportDetails, 'name' | 'testId'>, extension = 'html'): string {
  const owner = sanitizeFilenamePart(report.name)
  const testId = sanitizeFilenamePart(report.testId)
  const safeExtension = extension.replace(/^\.+/, '') || 'html'

  return `${owner}-${testId}-iqmaster-report.${safeExtension}`
}

export function buildReportHtml(report: ReportDetails): string {
  const generatedAt = report.generatedAt ?? new Date()
  const safeName = escapeHtml(report.name)
  const safeBand = escapeHtml(report.band)
  const safeTestId = escapeHtml(report.testId)
  const safeDate = escapeHtml(formatDate(generatedAt))
  const safeTitle = escapeHtml(`${REPORT_TITLE} - ${report.name}`)

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <style>
    :root {
      color: #10141c;
      background: #f4f7fa;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 40px 24px;
      background:
        radial-gradient(circle at top left, rgba(15, 118, 110, 0.14), transparent 34rem),
        linear-gradient(180deg, #eef3f7, #f8fafc);
    }

    .report {
      width: min(100%, 820px);
      margin: 0 auto;
      padding: 44px;
      border: 1px solid rgba(16, 20, 28, 0.12);
      border-radius: 28px;
      background: #ffffff;
      box-shadow: 0 24px 70px rgba(16, 20, 28, 0.12);
    }

    .brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 42px;
    }

    .brand-name {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.05em;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 96px;
      padding: 10px 16px;
      border-radius: 999px;
      color: #115e59;
      background: #ccfbf1;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: #10141c;
      font-size: clamp(34px, 8vw, 58px);
      line-height: 0.98;
      letter-spacing: -0.06em;
    }

    p {
      margin: 0;
      color: #334155;
      line-height: 1.65;
    }

    .lede {
      max-width: 620px;
      margin-top: 18px;
      font-size: 18px;
    }

    .score-panel {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      gap: 24px;
      margin: 38px 0;
    }

    .score-card,
    .detail-card {
      border: 1px solid rgba(16, 20, 28, 0.1);
      border-radius: 22px;
      padding: 26px;
      background: #f8fafc;
    }

    .score-label,
    .detail-label {
      color: #64748b;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .score {
      margin: 10px 0;
      color: #0f766e;
      font-size: 92px;
      font-weight: 900;
      line-height: 0.9;
      letter-spacing: -0.08em;
    }

    .band {
      color: #10141c;
      font-size: 28px;
      font-weight: 850;
      letter-spacing: -0.04em;
    }

    .detail-list {
      display: grid;
      gap: 18px;
      margin-top: 20px;
    }

    .detail-value {
      margin-top: 2px;
      color: #10141c;
      font-size: 20px;
      font-weight: 800;
    }

    .note {
      margin-top: 30px;
      padding: 18px 20px;
      border-left: 4px solid #d97706;
      border-radius: 14px;
      background: #fef3c7;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-top: 38px;
      padding-top: 22px;
      border-top: 1px solid rgba(16, 20, 28, 0.1);
      color: #64748b;
      font-size: 13px;
    }

    @media (max-width: 700px) {
      body {
        padding: 16px;
      }

      .report {
        padding: 28px;
      }

      .brand,
      .footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .score-panel {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      body {
        padding: 0;
        background: #ffffff;
      }

      .report {
        width: 100%;
        min-height: 100vh;
        border: 0;
        border-radius: 0;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <article class="report" aria-label="${escapeHtml(REPORT_TITLE)}">
    <header class="brand">
      <div class="brand-name">IQMaster</div>
      <div class="badge">Evaluation report</div>
    </header>

    <main>
      <h1>${safeName}'s cognitive assessment report</h1>
      <p class="lede">
        This report summarizes the IQMaster culture-fair matrix assessment result for entertainment
        and educational use. It is not a clinical diagnosis.
      </p>

      <section class="score-panel" aria-label="Score summary">
        <div class="score-card">
          <div class="score-label">Estimated IQ</div>
          <div class="score">${report.iq}</div>
          <div class="band">${safeBand}</div>
        </div>

        <div class="detail-card">
          <div class="detail-label">Result details</div>
          <div class="detail-list">
            <div>
              <p class="detail-label">Percentile</p>
              <p class="detail-value">${ordinal(report.percentile)} percentile</p>
            </div>
            <div>
              <p class="detail-label">Test ID</p>
              <p class="detail-value">${safeTestId}</p>
            </div>
            <div>
              <p class="detail-label">Issued</p>
              <p class="detail-value">${safeDate}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="note" aria-label="Interpretation note">
        <p>
          A score in the <strong>${safeBand}</strong> band indicates how this performance compares
          with IQMaster's reference scoring model. Repeating the assessment in a quiet setting can
          improve consistency for timed visual reasoning tasks.
        </p>
      </section>
    </main>

    <footer class="footer">
      <span>Generated by IQMaster</span>
      <span>Report ID: ${safeTestId}</span>
    </footer>
  </article>
</body>
</html>`
}

function printHtmlInFrame(html: string): boolean {
  if (typeof document === 'undefined') return false

  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.setAttribute('aria-hidden', 'true')

  iframe.onload = () => {
    const frameWindow = iframe.contentWindow
    if (!frameWindow) return

    frameWindow.focus()
    frameWindow.print()
    window.setTimeout(() => iframe.remove(), 1000)
  }

  document.body.append(iframe)
  iframe.srcdoc = html

  return true
}

export function printReportPdf(report: ReportDetails): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false

  const html = buildReportHtml(report)
  const reportWindow = window.open('', '_blank', 'width=900,height=1100')

  if (!reportWindow) {
    return printHtmlInFrame(html)
  }

  reportWindow.opener = null
  reportWindow.document.open()
  reportWindow.document.write(html)
  reportWindow.document.close()
  reportWindow.focus()
  reportWindow.setTimeout(() => reportWindow.print(), 250)

  return true
}

export function downloadReportHtml(report: ReportDetails, options: ReportFileOptions = {}): boolean {
  if (typeof document === 'undefined' || typeof URL === 'undefined' || typeof Blob === 'undefined') {
    return false
  }

  const html = buildReportHtml(report)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = options.filename ?? getReportFilename(report)
  link.rel = 'noopener'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)

  return true
}
