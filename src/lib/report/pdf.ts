import { ordinal, type ScoreResult } from '../iq'

export interface ReportDetails {
  name: string
  iq: number
  band: string
  percentile: number
  testId: string
  generatedAt?: Date
  accuracy?: number
  answered?: number
  questionTotal?: number
  confidenceNote?: string
  uncertainty?: string
  integrityNote?: string
  abilityProfile?: Array<{ label: string; score: number; note: string }>
  track?: string
  completionMode?: string
  portableCode?: string
  countryComparison?: ScoreResult['countryComparison']
  difficultyBreakdown?: ScoreResult['difficultyBreakdown']
  personalizedInsights?: ScoreResult['personalizedInsights']
  itemAnalysis?: ScoreResult['itemAnalysis']
  age?: number
  countryCode?: string
}

export interface ReportFileOptions {
  filename?: string
}

const REPORT_TITLE = 'IQMaster Personalized Evaluation Report'

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
  const country = report.countryComparison
  const maxBar = Math.max(155, report.iq, country?.nationalAverage ?? 100)

  const difficultyHtml = report.difficultyBreakdown?.length
    ? `<section class="card">
        <div class="label">Difficulty performance</div>
        <div class="grid3">
          ${report.difficultyBreakdown
            .map(
              (d) => `<div class="mini">
              <strong>${escapeHtml(d.label)}</strong>
              <p>${d.correct}/${d.answered} correct · ${d.accuracy}%</p>
              <div class="meter"><span style="width:${d.accuracy}%"></span></div>
            </div>`,
            )
            .join('')}
        </div>
      </section>`
    : ''

  const insightsHtml = report.personalizedInsights?.length
    ? `<section class="card">
        <div class="label">Personalized evaluation</div>
        ${report.personalizedInsights
          .map(
            (i) => `<div class="insight">
            <h3>${escapeHtml(i.title)}</h3>
            <p>${escapeHtml(i.text)}</p>
          </div>`,
          )
          .join('')}
      </section>`
    : ''

  const itemsHtml = report.itemAnalysis?.length
    ? `<section class="card">
        <div class="label">Item-by-item review</div>
        <div class="items">
          ${report.itemAnalysis
            .map((item) => {
              const cls =
                item.status === 'correct' ? 'ok' : item.status === 'incorrect' ? 'bad' : 'skip'
              const mark = item.status === 'correct' ? '✓' : item.status === 'incorrect' ? '✗' : '–'
              return `<span class="chip ${cls}" title="Item ${item.index + 1} · D${item.difficulty}">${item.index + 1}${mark}</span>`
            })
            .join('')}
        </div>
        <p class="legend">✓ correct · ✗ incorrect · – skipped · D1–D3 difficulty</p>
      </section>`
    : ''

  const countryHtml = country
    ? `<section class="card">
        <div class="label">National IQ context · ${escapeHtml(country.countryName)}</div>
        <p class="lede-sm">${escapeHtml(country.label)} (Δ ${country.delta >= 0 ? '+' : ''}${country.delta})</p>
        <div class="compare">
          <div>
            <span>Your IQ ${report.iq}</span>
            <div class="meter gold"><span style="width:${(report.iq / maxBar) * 100}%"></span></div>
          </div>
          <div>
            <span>${escapeHtml(country.countryName)} avg ${country.nationalAverage}</span>
            <div class="meter"><span style="width:${(country.nationalAverage / maxBar) * 100}%"></span></div>
          </div>
          <div>
            <span>Global mean 100</span>
            <div class="meter"><span style="width:${(100 / maxBar) * 100}%"></span></div>
          </div>
        </div>
      </section>`
    : ''

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <style>
    :root { color:#12151c; font-family:"Figtree", ui-sans-serif, system-ui, sans-serif; }
    * { box-sizing:border-box; }
    body { margin:0; padding:32px 18px; background:linear-gradient(180deg,#f3f6fa,#eef2f6); }
    .page { width:min(100%,880px); margin:0 auto 28px; padding:40px; border:1px solid rgba(18,21,28,.1); border-radius:22px; background:#fff; box-shadow:0 22px 60px rgba(18,21,28,.1); }
    .brand { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:28px; }
    .brand-name { font-family:Georgia,"Times New Roman",serif; font-size:30px; font-weight:700; }
    .badge { padding:8px 14px; border-radius:999px; background:#f0e6d4; color:#7a5c2e; font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
    h1 { margin:0; font-family:Georgia,"Times New Roman",serif; font-size:clamp(28px,6vw,46px); letter-spacing:-.04em; line-height:1.05; }
    h2,h3 { margin:0; }
    p { margin:0; color:#3a4250; line-height:1.65; }
    .lede { margin-top:14px; max-width:640px; font-size:17px; }
    .lede-sm { margin:10px 0 16px; }
    .score-panel { display:grid; grid-template-columns:0.9fr 1.1fr; gap:18px; margin:28px 0; }
    .card, .score-card, .detail-card { border:1px solid rgba(18,21,28,.1); border-radius:18px; padding:22px; background:#f8fafc; margin-bottom:16px; }
    .score { margin:8px 0; color:#1a3f6d; font-size:84px; font-weight:900; letter-spacing:-.08em; line-height:.9; }
    .band { font-size:24px; font-weight:800; letter-spacing:-.03em; color:#12151c; }
    .label { color:#6a7280; font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; margin-bottom:12px; }
    .detail-list { display:grid; gap:14px; margin-top:12px; }
    .detail-value { margin-top:2px; color:#12151c; font-size:18px; font-weight:800; }
    .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
    .mini strong { display:block; margin-bottom:4px; }
    .meter { height:8px; border-radius:999px; background:rgba(18,21,28,.08); overflow:hidden; margin-top:8px; }
    .meter span { display:block; height:100%; background:#1a3f6d; }
    .meter.gold span { background:#c9a76a; }
    .compare { display:grid; gap:14px; }
    .insight { padding:12px 0; border-top:1px solid rgba(18,21,28,.08); }
    .insight:first-of-type { border-top:0; }
    .insight h3 { font-size:16px; margin-bottom:4px; }
    .items { display:flex; flex-wrap:wrap; gap:6px; }
    .chip { width:42px; height:32px; border-radius:8px; display:grid; place-items:center; font-size:12px; font-weight:800; }
    .chip.ok { background:#dcfce7; color:#166534; }
    .chip.bad { background:#fee2e2; color:#991b1b; }
    .chip.skip { background:#e5e7eb; color:#4b5563; }
    .legend { margin-top:10px; font-size:12px; color:#6a7280; }
    .note { margin-top:18px; padding:16px 18px; border-left:4px solid #c9a76a; border-radius:12px; background:#faf6ee; }
    .footer { display:flex; justify-content:space-between; gap:12px; margin-top:28px; padding-top:16px; border-top:1px solid rgba(18,21,28,.1); color:#6a7280; font-size:12px; }
    .certificate-page { min-height:980px; display:grid; place-items:center; background:
      radial-gradient(circle at 20% 20%, rgba(201,167,106,.18), transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(26,63,109,.12), transparent 42%),
      #fbf8f2; }
    .certificate-shell { width:min(100%,720px); padding:48px 40px; border:1px solid rgba(201,167,106,.55); background:#fffefb; box-shadow:0 28px 70px rgba(18,21,28,.12); position:relative; text-align:center; }
    .certificate-shell:before { content:""; position:absolute; inset:14px; border:1px solid rgba(26,63,109,.2); pointer-events:none; }
    .certificate-shell .eyebrow { letter-spacing:.18em; text-transform:uppercase; color:#a18455; font-size:12px; font-weight:800; }
    .certificate-shell h1 { font-family:Georgia,"Times New Roman",serif; font-size:40px; margin:12px 0 8px; }
    .certificate-shell .score { color:#1a3f6d; font-size:72px; margin:18px 0 8px; }
    .seal { width:84px; height:84px; margin:18px auto 0; border-radius:50%; border:2px solid #c9a76a; display:grid; place-items:center; color:#1a3f6d; font-weight:900; letter-spacing:.08em; font-size:12px; }
    @media (max-width:720px) {
      .score-panel, .grid3 { grid-template-columns:1fr; }
      .page { padding:24px; }
    }
    @media print {
      body { padding:0; background:#fff; }
      .page { box-shadow:none; border:0; border-radius:0; page-break-after:always; }
      .certificate-page { page-break-before:always; }
    }
  </style>
</head>
<body>
  <article class="page">
    <header class="brand">
      <div class="brand-name">IQMaster</div>
      <div class="badge">Personalized dossier</div>
    </header>
    <h1>${safeName}'s cognitive assessment</h1>
    <p class="lede">A personalized evaluation built from your exact answer pattern—not a generic template. Entertainment and education use only.</p>

    <section class="score-panel">
      <div class="score-card">
        <div class="label">Estimated IQ</div>
        <div class="score">${report.iq}</div>
        <div class="band">${safeBand}</div>
      </div>
      <div class="detail-card">
        <div class="label">Result details</div>
        <div class="detail-list">
          <div><p class="label">Percentile</p><p class="detail-value">${ordinal(report.percentile)} percentile</p></div>
          <div><p class="label">Accuracy</p><p class="detail-value">${report.accuracy ?? '—'}% (${report.answered ?? '—'}/${report.questionTotal ?? '—'})</p></div>
          <div><p class="label">Track</p><p class="detail-value">${escapeHtml(report.track ?? 'adult')} · ${escapeHtml(report.completionMode ?? 'full')}</p></div>
          <div><p class="label">Issued</p><p class="detail-value">${safeDate}</p></div>
        </div>
      </div>
    </section>

    ${countryHtml}
    ${difficultyHtml}
    ${insightsHtml}

    ${
      report.abilityProfile?.length
        ? `<section class="card"><div class="label">Ability profile</div><div class="detail-list">${report.abilityProfile
            .map(
              (item) => `<div><p class="label">${escapeHtml(item.label)} · ${item.score}</p><p>${escapeHtml(item.note)}</p></div>`,
            )
            .join('')}</div></section>`
        : ''
    }

    ${itemsHtml}

    <section class="note">
      <p><strong>${safeBand}</strong> band · ${escapeHtml(report.confidenceNote ?? '')} ${escapeHtml(report.uncertainty ?? '')}
      ${report.integrityNote ? ` ${escapeHtml(report.integrityNote)}` : ''}</p>
      ${
        report.portableCode
          ? `<p style="margin-top:12px"><strong>Recovery code:</strong> <code style="word-break:break-all">${escapeHtml(report.portableCode)}</code></p>`
          : ''
      }
    </section>

    <footer class="footer">
      <span>Generated by IQMaster</span>
      <span>Report ID: ${safeTestId}</span>
    </footer>
  </article>

  <article class="page certificate-page" aria-label="Certificate">
    <div class="certificate-shell">
      <p class="eyebrow">IQMaster Certificate</p>
      <h1>Certificate of Cognitive Assessment</h1>
      <p>This certifies that</p>
      <h2 style="font-family:Georgia,serif;font-size:34px;margin:14px 0">${safeName}</h2>
      <p>completed the IQMaster culture-fair matrix assessment and achieved an estimated IQ score of</p>
      <div class="score">${report.iq}</div>
      <p>Band <strong>${safeBand}</strong> · Percentile <strong>${report.percentile}</strong>
      ${country ? ` · ${escapeHtml(country.countryName)} context <strong>${country.delta >= 0 ? '+' : ''}${country.delta}</strong>` : ''}</p>
      <div class="seal">IQ<br/>MASTER</div>
      <p style="margin-top:18px;color:#6a7280;font-size:13px">Test ID ${safeTestId} · Issued ${safeDate}</p>
    </div>
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
