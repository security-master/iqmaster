import { useState } from 'react'
import { renderCertificatePng, type CertificateDetails } from '../lib/report/certificate'
import {
  canUseNativeShare,
  copyShareLink,
  getShareLinks,
  openWhatsAppShare,
  shareResult,
  type NativeShareStatus,
  type ShareDetails,
} from '../lib/report/share'
import { SocialIcon } from './SocialIcons'

export type ShareButtonsProps = ShareDetails & {
  certificate?: CertificateDetails
}

function getStatusMessage(status: NativeShareStatus | 'idle'): string {
  switch (status) {
    case 'shared':
      return 'Share sheet opened.'
    case 'whatsapp':
      return 'Opening WhatsApp…'
    case 'dismissed':
      return 'Share cancelled.'
    case 'unavailable':
      return 'Choose WhatsApp or another network below.'
    case 'copied':
      return 'Result text copied — paste anywhere.'
    default:
      return ''
  }
}

export function ShareButtons(props: ShareButtonsProps) {
  const [status, setStatus] = useState<NativeShareStatus | 'idle'>('idle')
  const { certificate, ...shareDetails } = props
  const links = getShareLinks(shareDetails)
  const hasNativeShare = canUseNativeShare()

  function onWhatsApp() {
    setStatus('whatsapp')
    openWhatsAppShare(shareDetails)
  }

  async function onNativeShare() {
    let file: Blob | null = null
    if (certificate && (certificate.answered ?? 1) > 0) {
      file = await renderCertificatePng(certificate)
    }
    setStatus(await shareResult(shareDetails, file))
  }

  async function onCopy() {
    const ok = await copyShareLink(shareDetails)
    setStatus(ok ? 'copied' : 'unavailable')
  }

  return (
    <div className="share-panel" aria-label="Share your IQMaster result">
      <div className="share-panel__head">
        <p className="eyebrow">One-tap social share</p>
        <h3>Share your result</h3>
        <p>Send your score directly — WhatsApp opens with a ready-to-send message.</p>
      </div>

      <div className="share-featured">
        <button
          className="btn share-whatsapp-btn"
          type="button"
          onClick={onWhatsApp}
          aria-label="Share directly on WhatsApp"
        >
          <SocialIcon platform="whatsapp" className="share-icon" />
          Share on WhatsApp
        </button>
        {hasNativeShare && (
          <button className="btn btn-secondary" type="button" onClick={() => void onNativeShare()}>
            Share via device
          </button>
        )}
      </div>

      <div className="share-grid">
        {links.map((link) => {
          if (link.action === 'whatsapp') {
            return (
              <button
                key={link.platform}
                type="button"
                className={`share-icon-btn share-icon-btn--${link.platform}`}
                aria-label={link.ariaLabel}
                title={link.label}
                onClick={onWhatsApp}
              >
                <SocialIcon platform={link.platform} className="share-icon" />
                <span>{link.label}</span>
              </button>
            )
          }
          if (link.action === 'copy') {
            return (
              <button
                key={link.platform}
                type="button"
                className={`share-icon-btn share-icon-btn--${link.platform}`}
                aria-label={link.ariaLabel}
                title={link.label}
                onClick={() => void onCopy()}
              >
                <SocialIcon platform={link.platform} className="share-icon" />
                <span>{link.label}</span>
              </button>
            )
          }
          return (
            <a
              key={link.platform}
              className={`share-icon-btn share-icon-btn--${link.platform}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.ariaLabel}
              title={link.label}
            >
              <SocialIcon platform={link.platform} className="share-icon" />
              <span>{link.label}</span>
            </a>
          )
        })}
      </div>

      <p className="share-status" aria-live="polite">
        {getStatusMessage(status)}
      </p>
    </div>
  )
}
