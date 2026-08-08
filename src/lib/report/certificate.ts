import { cleanBandLabel, ordinal, type ScoreResult } from '../iq'

export interface CertificateDetails {
  name: string
  iq: number
  band: string
  percentile: number
  testId: string
  generatedAt?: Date
  countryComparison?: ScoreResult['countryComparison']
  answered?: number
  questionTotal?: number
  completionMode?: string
}

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
  return cleaned || 'iqmaster'
}

export function getCertificateFilename(
  cert: Pick<CertificateDetails, 'name' | 'testId'>,
  extension = 'html',
): string {
  return `${sanitizeFilenamePart(cert.name)}-${sanitizeFilenamePart(cert.testId)}-iqmaster-certificate.${extension.replace(/^\.+/, '') || 'html'}`
}

/** Print-ready aesthetic certificate — independent of the analysis report. */
export function buildCertificateHtml(cert: CertificateDetails): string {
  const generatedAt = cert.generatedAt ?? new Date()
  const band = cleanBandLabel(cert.band)
  const country = cert.countryComparison
  const safeName = escapeHtml(cert.name)
  const safeBand = escapeHtml(band)
  const safeTestId = escapeHtml(cert.testId)
  const safeDate = escapeHtml(formatDate(generatedAt))
  const delta =
    country != null ? `${country.delta >= 0 ? '+' : ''}${country.delta} vs ${country.countryName}` : ''
  const coverage =
    cert.answered != null && cert.questionTotal != null
      ? `${cert.answered}/${cert.questionTotal} items`
      : ''

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>IQMaster Certificate — ${safeName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Figtree:wght@400;600;700&display=swap');
    :root {
      --ink: #142033;
      --navy: #1a3f6d;
      --gold: #c4a46a;
      --gold-deep: #8d6b35;
      --paper: #f7f1e6;
      --paper-2: #fffdf8;
      --muted: #5c6575;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: #1a1f29;
      color: var(--ink);
      font-family: Figtree, system-ui, sans-serif;
    }
    .sheet {
      width: min(100%, 920px);
      aspect-ratio: 1.414 / 1;
      min-height: 640px;
      position: relative;
      padding: clamp(28px, 4vw, 48px);
      background:
        radial-gradient(circle at 12% 18%, rgba(196,164,106,.18), transparent 34%),
        radial-gradient(circle at 88% 82%, rgba(26,63,109,.10), transparent 36%),
        linear-gradient(145deg, var(--paper-2), var(--paper));
      box-shadow: 0 40px 90px rgba(0,0,0,.45);
      overflow: hidden;
    }
    .sheet::before {
      content: "";
      position: absolute;
      inset: 14px;
      border: 1.5px solid rgba(196,164,106,.65);
      pointer-events: none;
    }
    .sheet::after {
      content: "";
      position: absolute;
      inset: 22px;
      border: 1px solid rgba(26,63,109,.18);
      pointer-events: none;
    }
    .corner {
      position: absolute;
      width: 54px;
      height: 54px;
      border: 2px solid var(--gold);
      opacity: .85;
      z-index: 2;
    }
    .corner--tl { top: 28px; left: 28px; border-right: 0; border-bottom: 0; }
    .corner--tr { top: 28px; right: 28px; border-left: 0; border-bottom: 0; }
    .corner--bl { bottom: 28px; left: 28px; border-right: 0; border-top: 0; }
    .corner--br { bottom: 28px; right: 28px; border-left: 0; border-top: 0; }
    .content {
      position: relative;
      z-index: 3;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 12px 8px;
    }
    .brand {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(1.6rem, 3vw, 2.1rem);
      letter-spacing: .28em;
      text-transform: uppercase;
      color: var(--gold-deep);
      margin: 0;
    }
    .rule {
      width: min(220px, 40%);
      height: 1px;
      margin: 14px 0 18px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
    }
    h1 {
      margin: 0;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-weight: 600;
      font-size: clamp(2rem, 4.6vw, 3.35rem);
      letter-spacing: -.02em;
      line-height: 1.1;
      color: var(--navy);
    }
    .lede {
      margin: 14px 0 0;
      color: var(--muted);
      font-size: 1rem;
      letter-spacing: .04em;
    }
    .name {
      margin: 18px 0 8px;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(2.2rem, 5vw, 3.4rem);
      font-weight: 700;
      color: var(--ink);
      line-height: 1.05;
    }
    .body {
      max-width: 46ch;
      margin: 0;
      color: var(--muted);
      line-height: 1.55;
      font-size: 1.02rem;
    }
    .score-wrap {
      margin: 22px 0 10px;
      width: clamp(140px, 22vw, 176px);
      height: clamp(140px, 22vw, 176px);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at center, #fffdf8 58%, transparent 59%),
        conic-gradient(from 210deg, var(--gold) 0 72%, rgba(26,63,109,.18) 72% 100%);
      box-shadow: 0 16px 40px rgba(20,24,31,.12);
    }
    .score-wrap strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(3.4rem, 7vw, 4.6rem);
      line-height: .9;
      color: var(--navy);
      letter-spacing: -.04em;
    }
    .score-wrap span {
      display: block;
      margin-top: 4px;
      font-size: .68rem;
      font-weight: 700;
      letter-spacing: .18em;
      color: var(--gold-deep);
      text-transform: uppercase;
    }
    .meta {
      margin-top: 8px;
      font-size: .98rem;
      color: var(--ink);
      font-weight: 600;
    }
    .meta strong { color: var(--navy); }
    .seal {
      margin-top: 22px;
      width: 86px;
      height: 86px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      display: grid;
      place-items: center;
      background: rgba(196,164,106,.1);
      color: var(--navy);
      font-weight: 800;
      letter-spacing: .12em;
      font-size: .78rem;
      line-height: 1.15;
    }
    .seal small {
      display: block;
      font-size: .58rem;
      letter-spacing: .2em;
      color: var(--gold-deep);
    }
    .foot {
      margin-top: 16px;
      color: var(--muted);
      font-size: .82rem;
      letter-spacing: .02em;
    }
    .watermark {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(5rem, 14vw, 9rem);
      font-weight: 700;
      letter-spacing: .12em;
      color: rgba(26,63,109,.035);
      transform: rotate(-12deg);
      pointer-events: none;
      z-index: 1;
      user-select: none;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .sheet {
        width: 100%;
        min-height: 100vh;
        aspect-ratio: auto;
        box-shadow: none;
        page-break-after: avoid;
      }
    }
    @media (max-width: 720px) {
      .sheet { aspect-ratio: auto; min-height: 720px; }
    }
  </style>
</head>
<body>
  <article class="sheet" aria-label="IQMaster Certificate">
    <div class="corner corner--tl"></div>
    <div class="corner corner--tr"></div>
    <div class="corner corner--bl"></div>
    <div class="corner corner--br"></div>
    <div class="watermark" aria-hidden="true">IQMASTER</div>
    <div class="content">
      <p class="brand">IQMaster</p>
      <div class="rule"></div>
      <h1>Certificate of Cognitive Assessment</h1>
      <p class="lede">This certifies that</p>
      <h2 class="name">${safeName}</h2>
      <p class="body">completed the IQMaster culture-fair matrix assessment and achieved an estimated IQ score of</p>
      <div class="score-wrap">
        <div>
          <strong>${cert.iq}</strong>
          <span>IQ score</span>
        </div>
      </div>
      <p class="meta">
        Band <strong>${safeBand}</strong>
        · ${ordinal(cert.percentile)} percentile
        ${delta ? `· ${escapeHtml(delta)}` : ''}
      </p>
      <div class="seal">IQ<small>MASTER</small></div>
      <p class="foot">
        ${coverage ? `${escapeHtml(coverage)} · ` : ''}Test ID ${safeTestId} · Issued ${safeDate}
      </p>
    </div>
  </article>
</body>
</html>`
}

function printHtml(html: string): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false

  const reportWindow = window.open('', '_blank', 'width=980,height=720')
  if (!reportWindow) {
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0'
    iframe.setAttribute('aria-hidden', 'true')
    iframe.onload = () => {
      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()
      window.setTimeout(() => iframe.remove(), 1000)
    }
    document.body.append(iframe)
    iframe.srcdoc = html
    return true
  }

  reportWindow.opener = null
  reportWindow.document.open()
  reportWindow.document.write(html)
  reportWindow.document.close()
  reportWindow.focus()
  reportWindow.setTimeout(() => reportWindow.print(), 300)
  return true
}

export function printCertificatePdf(cert: CertificateDetails): boolean {
  return printHtml(buildCertificateHtml(cert))
}

export function downloadCertificateHtml(cert: CertificateDetails): boolean {
  if (typeof document === 'undefined') return false
  const html = buildCertificateHtml(cert)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = getCertificateFilename(cert)
  link.rel = 'noopener'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
  return true
}

/** Draw a shareable certificate PNG (no external deps). */
export async function renderCertificatePng(cert: CertificateDetails): Promise<Blob | null> {
  if (typeof document === 'undefined') return null

  const width = 1200
  const height = 850
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const band = cleanBandLabel(cert.band)
  const country = cert.countryComparison
  const date = formatDate(cert.generatedAt ?? new Date())

  // Paper background
  const grad = ctx.createLinearGradient(0, 0, width, height)
  grad.addColorStop(0, '#fffdf8')
  grad.addColorStop(1, '#f0e6d4')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // Outer gold frame
  ctx.strokeStyle = '#c4a46a'
  ctx.lineWidth = 4
  ctx.strokeRect(28, 28, width - 56, height - 56)
  ctx.strokeStyle = 'rgba(26,63,109,0.25)'
  ctx.lineWidth = 1.5
  ctx.strokeRect(44, 44, width - 88, height - 88)

  // Corner accents
  ctx.strokeStyle = '#c4a46a'
  ctx.lineWidth = 3
  const c = 70
  const drawCorner = (x: number, y: number, dx: number, dy: number) => {
    ctx.beginPath()
    ctx.moveTo(x, y + dy * 42)
    ctx.lineTo(x, y)
    ctx.lineTo(x + dx * 42, y)
    ctx.stroke()
  }
  drawCorner(c, c, 1, 1)
  drawCorner(width - c, c, -1, 1)
  drawCorner(c, height - c, 1, -1)
  drawCorner(width - c, height - c, -1, -1)

  ctx.fillStyle = '#8d6b35'
  ctx.font = '600 28px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('IQMASTER', width / 2, 120)

  ctx.strokeStyle = '#c4a46a'
  ctx.beginPath()
  ctx.moveTo(width / 2 - 90, 140)
  ctx.lineTo(width / 2 + 90, 140)
  ctx.stroke()

  ctx.fillStyle = '#1a3f6d'
  ctx.font = '600 48px Georgia, serif'
  ctx.fillText('Certificate of Cognitive Assessment', width / 2, 210)

  ctx.fillStyle = '#5c6575'
  ctx.font = '400 22px sans-serif'
  ctx.fillText('This certifies that', width / 2, 265)

  ctx.fillStyle = '#142033'
  ctx.font = '700 56px Georgia, serif'
  ctx.fillText(cert.name, width / 2, 335)

  ctx.fillStyle = '#5c6575'
  ctx.font = '400 20px sans-serif'
  ctx.fillText('completed the IQMaster culture-fair assessment with an estimated IQ of', width / 2, 385)

  // Score circle
  const cx = width / 2
  const cy = 520
  ctx.beginPath()
  ctx.arc(cx, cy, 88, 0, Math.PI * 2)
  ctx.fillStyle = '#fffdf8'
  ctx.fill()
  ctx.lineWidth = 8
  ctx.strokeStyle = '#c4a46a'
  ctx.stroke()

  ctx.fillStyle = '#1a3f6d'
  ctx.font = '700 72px Georgia, serif'
  ctx.fillText(String(cert.iq), cx, cy + 22)

  ctx.fillStyle = '#8d6b35'
  ctx.font = '700 14px sans-serif'
  ctx.fillText('IQ SCORE', cx, cy + 48)

  const metaParts = [`Band ${band}`, `${ordinal(cert.percentile)} percentile`]
  if (country) {
    metaParts.push(`${country.delta >= 0 ? '+' : ''}${country.delta} vs ${country.countryName}`)
  }
  ctx.fillStyle = '#142033'
  ctx.font = '600 20px sans-serif'
  ctx.fillText(metaParts.join('  ·  '), width / 2, 650)

  ctx.fillStyle = '#5c6575'
  ctx.font = '400 16px sans-serif'
  ctx.fillText(`Test ID ${cert.testId}  ·  Issued ${date}`, width / 2, 720)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png')
  })
}

export async function downloadCertificatePng(cert: CertificateDetails): Promise<boolean> {
  const blob = await renderCertificatePng(cert)
  if (!blob) return false
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = getCertificateFilename(cert, 'png')
  link.rel = 'noopener'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
  return true
}
