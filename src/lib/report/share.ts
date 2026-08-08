export type SharePlatform =
  | 'x'
  | 'linkedin'
  | 'facebook'
  | 'messenger'
  | 'whatsapp'
  | 'telegram'
  | 'reddit'
  | 'threads'
  | 'pinterest'
  | 'tumblr'
  | 'line'
  | 'vk'
  | 'email'
  | 'copy'

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
  action?: 'copy'
}

export type NativeShareStatus = 'shared' | 'dismissed' | 'unavailable' | 'copied'

const SHARE_TITLE = 'My IQMaster result'

function encode(value: string): string {
  return encodeURIComponent(value)
}

export function buildShareText(details: Pick<ShareDetails, 'iq' | 'band' | 'percentile'>): string {
  return `I scored IQ ${details.iq} on IQMaster (${details.band}, ${details.percentile}th percentile).`
}

export function getShareUrl(): string {
  if (typeof window === 'undefined') return ''

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const origin = window.location.origin
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
  const encodedTitle = encode(SHARE_TITLE)

  return [
    {
      platform: 'x',
      label: 'X',
      ariaLabel: 'Share on X',
      url: `https://twitter.com/intent/tweet?text=${encodedText}${shareUrl ? `&url=${encodedUrl}` : ''}`,
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      ariaLabel: 'Share on Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      platform: 'messenger',
      label: 'Messenger',
      ariaLabel: 'Share on Messenger',
      url: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=966242223397117&redirect_uri=${encodedUrl}`,
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      ariaLabel: 'Share on LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      ariaLabel: 'Share on WhatsApp',
      url: `https://wa.me/?text=${encodedCombined}`,
    },
    {
      platform: 'telegram',
      label: 'Telegram',
      ariaLabel: 'Share on Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      platform: 'reddit',
      label: 'Reddit',
      ariaLabel: 'Share on Reddit',
      url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      platform: 'threads',
      label: 'Threads',
      ariaLabel: 'Share on Threads',
      url: `https://www.threads.net/intent/post?text=${encodedCombined}`,
    },
    {
      platform: 'pinterest',
      label: 'Pinterest',
      ariaLabel: 'Share on Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
    },
    {
      platform: 'tumblr',
      label: 'Tumblr',
      ariaLabel: 'Share on Tumblr',
      url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${encodedTitle}&caption=${encodedText}`,
    },
    {
      platform: 'line',
      label: 'LINE',
      ariaLabel: 'Share on LINE',
      url: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    },
    {
      platform: 'vk',
      label: 'VK',
      ariaLabel: 'Share on VK',
      url: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}&comment=${encodedText}`,
    },
    {
      platform: 'email',
      label: 'Email',
      ariaLabel: 'Share by email',
      url: `mailto:?subject=${encodedTitle}&body=${encodedCombined}`,
    },
    {
      platform: 'copy',
      label: 'Copy link',
      ariaLabel: 'Copy result link',
      url: shareUrl,
      action: 'copy',
    },
  ]
}

export async function copyShareLink(details: ShareDetails): Promise<boolean> {
  const url = getShareUrl()
  const text = `${buildShareText(details)}${url ? ` ${url}` : ''}`
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through */
  }
  return false
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
