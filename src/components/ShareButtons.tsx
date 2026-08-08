import { useState, type CSSProperties } from 'react'
import {
  canUseNativeShare,
  getShareLinks,
  shareResult,
  type NativeShareStatus,
  type ShareDetails,
} from '../lib/report/share'

export type ShareButtonsProps = ShareDetails

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
} satisfies CSSProperties

const compactButtonStyle = {
  padding: '0.78rem 1.05rem',
} satisfies CSSProperties

const statusStyle = {
  minHeight: '1.35rem',
  color: 'var(--muted)',
  fontSize: '0.9rem',
} satisfies CSSProperties

function getStatusMessage(status: NativeShareStatus | 'idle'): string {
  switch (status) {
    case 'shared':
      return 'Share sheet opened.'
    case 'dismissed':
      return 'Share cancelled.'
    case 'unavailable':
      return 'Use one of the social buttons to share.'
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

  return (
    <div aria-label="Share your IQMaster result">
      <div style={rowStyle}>
        {hasNativeShare && (
          <button
            className="btn btn-primary"
            type="button"
            style={compactButtonStyle}
            aria-label="Share your IQMaster result using your device share menu"
            onClick={onNativeShare}
          >
            Share result
          </button>
        )}

        {links.map((link) => (
          <a
            className="btn btn-secondary"
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={compactButtonStyle}
            aria-label={link.ariaLabel}
          >
            {link.label}
          </a>
        ))}
      </div>

      <p aria-live="polite" style={statusStyle}>
        {getStatusMessage(status)}
      </p>
    </div>
  )
}
