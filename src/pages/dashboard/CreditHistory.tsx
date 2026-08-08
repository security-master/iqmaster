import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  formatCreditDate,
  getCreditLedger,
  getCreditSummary,
} from '../../lib/billing/credits'

export function CreditHistory() {
  const [entries, setEntries] = useState(() => getCreditLedger())
  const [summary, setSummary] = useState(() => getCreditSummary())

  function refresh() {
    setEntries(getCreditLedger())
    setSummary(getCreditSummary())
  }

  return (
    <div className="container page-hero">
      <p className="eyebrow">Credit history</p>
      <h1>Local demo ledger</h1>
      <p>
        This page reads package purchases and report unlocks from localStorage. Replace this layer
        with API-backed billing history when organization accounts are connected.
      </p>

      <div className="stats-row">
        <div className="stat">
          <strong>{summary.remainingCredits}</strong>
          <span>remaining credits</span>
        </div>
        <div className="stat">
          <strong>{summary.totalPurchased}</strong>
          <span>credits purchased</span>
        </div>
        <div className="stat">
          <strong>{summary.totalConsumed}</strong>
          <span>reports unlocked</span>
        </div>
        <div className="stat">
          <strong>{entries.length}</strong>
          <span>ledger events</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <button className="btn btn-primary" onClick={refresh} type="button">
          Refresh history
        </button>
        <Link to="/dashboard/org" className="btn btn-secondary">
          Org dashboard
        </Link>
        <Link to="/packages" className="btn btn-secondary">
          Add package credits
        </Link>
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Events</p>
        <h2 className="section-title">Purchases and unlocks</h2>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          {entries.length === 0 ? (
            <div className="price-box">
              <h3 style={{ fontSize: '1.4rem' }}>No credit events yet</h3>
              <p style={{ marginTop: '0.6rem' }}>
                Buy a demo package or simulate a report unlock from the org dashboard to populate
                this local ledger.
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <article className="price-box" key={entry.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <p className="eyebrow">{entry.type.replace('_', ' ')}</p>
                    <h3 style={{ fontSize: '1.45rem', marginTop: '0.35rem' }}>{entry.note}</h3>
                    <p style={{ marginTop: '0.5rem' }}>
                      {formatCreditDate(entry.createdAt)} · {entry.actorName} ({entry.actorRole})
                    </p>
                    {entry.memberName ? (
                      <p className="muted" style={{ marginTop: '0.25rem' }}>
                        Member: {entry.memberName}
                      </p>
                    ) : null}
                    {entry.packageId ? (
                      <p className="muted" style={{ marginTop: '0.25rem' }}>
                        Package: {entry.packageId}
                      </p>
                    ) : null}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="price" style={{ fontSize: '2rem' }}>
                      {entry.amount > 0 ? '+' : ''}
                      {entry.amount}
                    </div>
                    <p className="muted">Balance after: {entry.balanceAfter}</p>
                    {entry.apiAccessGranted ? (
                      <div className="notice" style={{ marginTop: '0.6rem' }}>
                        API enabled
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
