import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { BILLING_PACKAGES } from '../data/packages'
import { useI18n } from '../i18n/I18nContext'
import { purchaseCreditPackage } from '../lib/billing/credits'
import type { BillingPackageId } from '../lib/billing/types'

export function Packages() {
  const { t, lang } = useI18n()
  const [message, setMessage] = useState(() => t('packages.chooseDefault'))

  useEffect(() => {
    setMessage(t('packages.chooseDefault'))
  }, [lang, t])

  function purchase(packageId: BillingPackageId) {
    const entry = purchaseCreditPackage(packageId)
    setMessage(t('packages.purchased', { note: entry.note, balance: entry.balanceAfter }))
  }

  return (
    <div className="container page-hero packages-page">
      <Seo title={t('packages.seoTitle')} description={t('packages.lead')} />
      <p className="eyebrow">{t('packages.eyebrow')}</p>
      <h1>{t('packages.title')}</h1>
      <p>{t('packages.lead')}</p>

      <div className="notice" style={{ marginTop: '1.5rem' }}>
        {t('packages.rule')}
      </div>

      <div className="packages-grid">
        {BILLING_PACKAGES.map((plan) => {
          const base = `packages.plans.${plan.id}`
          return (
            <article className="price-box packages-card" key={plan.id}>
              <div className="muted" style={{ fontWeight: 700 }}>
                {t(`${base}.audience`)}
              </div>
              <h2>{t(`${base}.name`)}</h2>
              <div className="price">${plan.demoPrice}</div>
              <p>
                <strong>{t('packages.creditsLabel', { credits: plan.credits })}</strong>
                {' · '}
                {t(`${base}.cadence`)}
              </p>
              <p className="packages-card__desc">{t(`${base}.description`)}</p>
              <ul className="checklist">
                <li>{t(`${base}.f1`)}</li>
                <li>{t(`${base}.f2`)}</li>
                <li>{t(`${base}.f3`)}</li>
              </ul>
              {plan.apiAccess ? (
                <div className="notice" style={{ marginTop: '0.85rem' }}>
                  {t('packages.apiFlag')}
                </div>
              ) : null}
              {plan.recommended ? (
                <p className="eyebrow" style={{ marginTop: '0.85rem' }}>
                  {t('packages.popular')}
                </p>
              ) : null}
              <button
                className="btn btn-primary"
                onClick={() => purchase(plan.id)}
                style={{ marginTop: 'auto', width: '100%' }}
              >
                {t('packages.addCredits')}
              </button>
            </article>
          )
        })}
      </div>

      <div className="cta-band">
        <div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>{t('packages.actionTitle')}</h2>
          <p>{message}</p>
        </div>
        <Link to="/dashboard/org" className="btn btn-ghost">
          {t('packages.openDashboard')}
        </Link>
      </div>
    </div>
  )
}
