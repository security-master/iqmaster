import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
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

export function ShareButtons(props: ShareButtonsProps) {
  const { t } = useI18n()
  const [status, setStatus] = useState<NativeShareStatus | 'idle'>('idle')
  const { certificate, ...shareDetails } = props
  const links = getShareLinks(shareDetails)
  const hasNativeShare = canUseNativeShare()

  function statusMessage(s: NativeShareStatus | 'idle'): string {
    switch (s) {
      case 'shared':
        return t('shareUi.shared')
      case 'whatsapp':
        return t('shareUi.whatsappOpen')
      case 'dismissed':
        return t('shareUi.dismissed')
      case 'unavailable':
        return t('shareUi.unavailable')
      case 'copied':
        return t('shareUi.copied')
      default:
        return ''
    }
  }

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
    <div className="share-panel" aria-label={t('shareUi.title')}>
      <div className="share-panel__head">
        <p className="eyebrow">{t('shareUi.eyebrow')}</p>
        <h3>{t('shareUi.title')}</h3>
        <p>{t('shareUi.lead')}</p>
      </div>

      <div className="share-featured">
        <button
          className="btn share-whatsapp-btn"
          type="button"
          onClick={onWhatsApp}
          aria-label={t('shareUi.whatsapp')}
        >
          <SocialIcon platform="whatsapp" className="share-icon" />
          {t('shareUi.whatsapp')}
        </button>
        {hasNativeShare && (
          <button className="btn btn-secondary" type="button" onClick={() => void onNativeShare()}>
            {t('shareUi.device')}
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
        {statusMessage(status)}
      </p>
    </div>
  )
}
