import { cleanBandLabel } from '../iq'

export type SharePlatform =
  | 'whatsapp'
  | 'x'
  | 'linkedin'
  | 'facebook'
  | 'messenger'
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
  countryName?: string
  delta?: number
  lang?: 'en' | 'tr'
}

export interface ShareLink {
  platform: SharePlatform
  label: string
  ariaLabel: string
  url: string
  action?: 'copy' | 'whatsapp'
}

export type NativeShareStatus = 'shared' | 'dismissed' | 'unavailable' | 'copied' | 'whatsapp'

const SHARE_TITLE = 'My IQMaster result'

function encode(value: string): string {
  return encodeURIComponent(value)
}

export function getPublicSiteUrl(): string {
  if (typeof window === 'undefined') return 'https://security-master.github.io/iqmaster/'
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return `${window.location.origin}${base || ''}/`
}

/** Prefer a public landing URL — private results links are not viewable by others. */
export function getShareUrl(): string {
  return getPublicSiteUrl()
}

export function buildShareText(details: ShareDetails): string {
  const band = cleanBandLabel(details.band)
  const countryBit =
    details.countryName != null && details.delta != null
      ? details.lang === 'tr'
        ? ` · ${details.countryName}: ${details.delta >= 0 ? '+' : ''}${details.delta}`
        : ` · ${details.countryName}: ${details.delta >= 0 ? '+' : ''}${details.delta}`
      : ''

  if (details.lang === 'tr') {
    return `IQMaster sonucum: IQ ${details.iq} (${band}, ${details.percentile}. yüzdelik)${countryBit}`
  }
  return `I scored IQ ${details.iq} on IQMaster (${band}, ${details.percentile}th percentile)${countryBit}`
}

export function buildWhatsAppShareText(details: ShareDetails): string {
  const site = getShareUrl()
  const body = buildShareText(details)
  if (details.lang === 'tr') {
    return `${body}\n\nSen de ölç: ${site}`
  }
  return `${body}\n\nTake yours: ${site}`
}

export function getWhatsAppShareUrl(details: ShareDetails): string {
  const text = buildWhatsAppShareText(details)
  // api.whatsapp.com works reliably on desktop + mobile browsers
  return `https://api.whatsapp.com/send?text=${encode(text)}`
}

export function openWhatsAppShare(details: ShareDetails): boolean {
  if (typeof window === 'undefined') return false
  const url = getWhatsAppShareUrl(details)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  if (!win) {
    window.location.href = url
  }
  return true
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

export function getShareLinks(details: ShareDetails): ShareLink[] {
  const text = buildShareText(details)
  const shareUrl = getShareUrl()
  const whatsappText = buildWhatsAppShareText(details)
  const encodedText = encode(text)
  const encodedUrl = encode(shareUrl)
  const encodedCombined = encode(`${text} ${shareUrl}`)
  const encodedTitle = encode(SHARE_TITLE)

  return [
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      ariaLabel: 'Share directly on WhatsApp',
      url: getWhatsAppShareUrl(details),
      action: 'whatsapp',
    },
    {
      platform: 'x',
      label: 'X',
      ariaLabel: 'Share on X',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
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
      url: `https://www.threads.net/intent/post?text=${encode(whatsappText)}`,
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
      label: 'Copy text',
      ariaLabel: 'Copy result text',
      url: shareUrl,
      action: 'copy',
    },
  ]
}

export async function copyShareLink(details: ShareDetails): Promise<boolean> {
  const text = buildWhatsAppShareText(details)
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

export async function shareResult(
  details: ShareDetails,
  file?: Blob | null,
): Promise<NativeShareStatus> {
  if (!canUseNativeShare()) return 'unavailable'

  try {
    const data: ShareData = {
      title: SHARE_TITLE,
      text: buildWhatsAppShareText(details),
      url: getShareUrl(),
    }
    if (file && typeof navigator.canShare === 'function') {
      const shareFile = new File([file], 'iqmaster-certificate.png', { type: 'image/png' })
      const withFile = { ...data, files: [shareFile] }
      if (navigator.canShare(withFile)) {
        await navigator.share(withFile)
        return 'shared'
      }
    }
    await navigator.share(data)
    return 'shared'
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return 'dismissed'
    return 'unavailable'
  }
}
