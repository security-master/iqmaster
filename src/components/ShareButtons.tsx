import { useState } from 'react'
import {
  canUseNativeShare,
  copyShareLink,
  getShareLinks,
  shareResult,
  type NativeShareStatus,
  type ShareDetails,
} from '../lib/report/share'
import { SocialIcon } from './SocialIcons'

export type ShareButtonsProps = ShareDetails

function getStatusMessage(status: NativeShareStatus | 'idle'): string {
  switch (status) {
    case 'shared':
      return 'Share sheet opened.'
    case 'dismissed':
      return 'Share cancelled.'
    case 'unavailable':
      return 'Choose a network below to share in one tap.'
    case 'copied':
      return 'Result text and link copied.'
    default:
      return ''
  }
}

export function ShareButtons(props: ShareButtonsProps) {
  const [status, setStatus] = useState<NativeShareStatus | 'idle'>('idle')
  const links = getShareLinks(props)
  const hasNativeShare = canUseNativeShare()

  async function onNativeShare() {
    setStatus(await shareResult(props))
  }

  async function onCopy() {
    const ok = await copyShareLink(props)
    setStatus(ok ? 'copied' : 'unavailable')
  }

  return (
    <div className="share-panel" aria-label="Share your IQMaster result">
      <div className="share-panel__head">
        <p className="eyebrow">One-tap social share</p>
        <h3>Share your result</h3>
        <p>Post to the network you already use—icons cover a wide set of platforms.</p>
      </div>

      {hasNativeShare && (
        <button className="btn btn-primary share-native" type="button" onClick={onNativeShare}>
          Share via device
        </button>
      )}

      <div className="share-grid">
        {links.map((link) =>
          link.action === 'copy' ? (
            <button
              key={link.platform}
              type="button"
              className={`share-icon-btn share-icon-btn--${link.platform}`}
              aria-label={link.ariaLabel}
              title={link.label}
              onClick={onCopy}
            >
              <SocialIcon platform={link.platform} className="share-icon" />
              <span>{link.label}</span>
            </button>
          ) : (
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
          ),
        )}
      </div>

      <p className="share-status" aria-live="polite">
        {getStatusMessage(status)}
      </p>
    </div>
  )
}
