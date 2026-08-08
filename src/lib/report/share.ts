export type SharePlatform = 'x' | 'linkedin' | 'facebook' | 'whatsapp'

export interface ShareDetails {
  name: string
  iq: number
  band: string
  percentile: number
  testId: string
}

export interface ShareLink {
  platform: SharePlatform
  label: string
  ariaLabel: string
  url: string
}

export type NativeShareStatus = 'shared' | 'dismissed' | 'unavailable'

const SHARE_TITLE = 'My IQMaster result'

function encode(value: string): string {
  return encodeURIComponent(value)
}

export function buildShareText(details: Pick<ShareDetails, 'iq' | 'band'>): string {
  return `I scored IQ ${details.iq} on IQMaster (${details.band}).`
}

export function getShareUrl(): string {
  if (typeof window === 'undefined') return ''

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const origin = window.location.origin
  // Prefer current page URL when already on results; otherwise site root with GH Pages base.
  if (window.location.pathname.includes('/iq-test/') && window.location.pathname.includes('/results')) {
    return window.location.href.split('?')[0]
  }
  return `${origin}${base || ''}/`
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

export function getShareLinks(details: ShareDetails): ShareLink[] {
  const text = buildShareText(details)
  const shareUrl = getShareUrl()
  const encodedText = encode(text)
  const encodedUrl = encode(shareUrl)
  const encodedCombined = encode(shareUrl ? `${text} ${shareUrl}` : text)

  return [
    {
      platform: 'x',
      label: 'X',
      ariaLabel: 'Share your IQMaster result on X',
      url: `https://twitter.com/intent/tweet?text=${encodedText}${shareUrl ? `&url=${encodedUrl}` : ''}`,
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      ariaLabel: 'Share your IQMaster result on LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      ariaLabel: 'Share your IQMaster result on Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      ariaLabel: 'Share your IQMaster result on WhatsApp',
      url: `https://wa.me/?text=${encodedCombined}`,
    },
  ]
}

export async function shareResult(details: ShareDetails): Promise<NativeShareStatus> {
  if (!canUseNativeShare()) return 'unavailable'

  try {
    await navigator.share({
      title: SHARE_TITLE,
      text: buildShareText(details),
      url: getShareUrl() || undefined,
    })
    return 'shared'
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return 'dismissed'
    return 'unavailable'
  }
}
