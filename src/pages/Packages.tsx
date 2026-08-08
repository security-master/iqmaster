/*
Suggested routes for App.tsx:
- <Route path="packages" element={<Packages />} />
- <Route path="for-organizations" element={<ForOrganizations />} />
- <Route path="dashboard/org" element={<OrgDashboard />} />
- <Route path="dashboard/credits" element={<CreditHistory />} />
*/
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BILLING_PACKAGES } from '../data/packages'
import { purchaseCreditPackage } from '../lib/billing/credits'
import type { BillingPackageId } from '../lib/billing/types'

export function Packages() {
  const [message, setMessage] = useState('Choose a package to add demo credits to the org ledger.')

  function purchase(packageId: BillingPackageId) {
    const entry = purchaseCreditPackage(packageId)
    setMessage(`${entry.note}. New demo balance: ${entry.balanceAfter} credits.`)
  }

  return (
    <div className="container page-hero">
      <p className="eyebrow">B2B packages</p>
      <h1>Credits for families, coaches, teachers, companies, and HR teams.</h1>
      <p>
        IQMaster packages sell prepaid credits to organizations. The demo ledger stores purchases in
        localStorage now; the same actions can call billing and seat APIs later.
      </p>

      <div className="notice" style={{ marginTop: '1.5rem' }}>
        Credit rule: 1 credit = 1 completed assessment unlock (report). Starting a free attempt may
        be free; unlocking the report consumes 1 credit for org seats.
      </div>

      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          marginTop: '2rem',
        }}
      >
        {BILLING_PACKAGES.map((plan) => (
          <article className="price-box" key={plan.id}>
            <div className="muted" style={{ fontWeight: 700 }}>
              {plan.audienceLabel}
            </div>
            <h2 style={{ fontSize: '1.8rem', marginTop: '0.35rem' }}>{plan.name}</h2>
            <div className="price">${plan.demoPrice}</div>
            <p>
              <strong>{plan.credits} credits</strong> · {plan.cadence}
            </p>
            <p style={{ marginTop: '0.7rem' }}>{plan.description}</p>
            <ul className="checklist">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {plan.apiAccess ? (
              <div className="notice" style={{ marginTop: '1rem' }}>
                API access flag included for future integrations.
              </div>
            ) : null}
            {plan.recommended ? (
              <p className="eyebrow" style={{ marginTop: '1rem' }}>
                Popular starter
              </p>
            ) : null}
            <button
              className="btn btn-primary"
              onClick={() => purchase(plan.id)}
              style={{ marginTop: '1.25rem', width: '100%' }}
            >
              Add demo credits
            </button>
          </article>
        ))}
      </div>

      <div className="cta-band">
        <div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Package action</h2>
          <p>{message}</p>
        </div>
        <Link to="/dashboard/org" className="btn btn-ghost">
          Open org dashboard
        </Link>
      </div>
    </div>
  )
}
