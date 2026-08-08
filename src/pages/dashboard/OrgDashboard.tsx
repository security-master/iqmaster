import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BILLING_PACKAGES } from '../../data/packages'
import {
  consumeAssessmentCredit,
  getCreditSummary,
  purchaseCreditPackage,
} from '../../lib/billing/credits'

const audienceTabs = [
  {
    id: 'families',
    label: 'Families',
    copy: 'Shared household credits for several people using one balance.',
  },
  {
    id: 'teachers',
    label: 'Teachers',
    copy: 'Classroom cohorts with coach/teacher assignment controls.',
  },
  {
    id: 'companies',
    label: 'Companies',
    copy: 'Team, department, and HR testing flows for larger organizations.',
  },
]

export function OrgDashboard() {
  const [summary, setSummary] = useState(() => getCreditSummary())
  const [selectedAudience, setSelectedAudience] = useState(audienceTabs[0].id)
  const [status, setStatus] = useState('Use demo actions to purchase credits or unlock a report.')
  const activeAudience = audienceTabs.find((tab) => tab.id === selectedAudience) ?? audienceTabs[0]
  const starterPlan = BILLING_PACKAGES.find((plan) => plan.id === 'teacher')

  function refreshSummary(nextStatus: string) {
    setSummary(getCreditSummary())
    setStatus(nextStatus)
  }

  function addStarterCredits() {
    if (!starterPlan) return

    const entry = purchaseCreditPackage(starterPlan.id)
    refreshSummary(`${entry.note}. Balance is now ${entry.balanceAfter} credits.`)
  }

  function unlockDemoReport() {
    const entry = consumeAssessmentCredit('Sample member')

    if (!entry) {
      refreshSummary('No credits available. Add a package before unlocking a report.')
      return
    }

    refreshSummary(`${entry.note}. Balance is now ${entry.balanceAfter} credits.`)
  }

  return (
    <div className="container page-hero">
      <p className="eyebrow">Org dashboard</p>
      <h1>{summary.organizationName}</h1>
      <p>
        A simple local dashboard for the future organization workspace: monitor credits, simulate an
        assessment unlock, and preview audience-specific controls.
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
          <strong>{summary.apiAccess ? 'On' : 'Off'}</strong>
          <span>API access flag</span>
        </div>
      </div>

      <div className="notice" style={{ marginTop: '2rem' }}>
        {status}
      </div>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <section className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            Assign test placeholder
          </div>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.35rem' }}>Invite a member</h2>
          <p style={{ marginTop: '0.6rem' }}>
            Starting an assessment can remain free. This demo spends 1 credit only when the completed
            report is unlocked.
          </p>
          <div className="form-grid" style={{ marginTop: '1.2rem' }}>
            <div className="field">
              <label htmlFor="member-name">Member name</label>
              <input id="member-name" placeholder="Sample member" />
            </div>
            <div className="field">
              <label htmlFor="member-email">Member email</label>
              <input id="member-email" placeholder="member@example.com" type="email" />
            </div>
            <button className="btn btn-secondary" type="button">
              Create assignment link soon
            </button>
            <button className="btn btn-primary" onClick={unlockDemoReport} type="button">
              Simulate completed report unlock
            </button>
          </div>
        </section>

        <section className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            Admin actions
          </div>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.35rem' }}>Manage credits</h2>
          <ul className="checklist">
            <li>Roles available: {summary.roles.join(', ')}</li>
            <li>Org admins buy packages and view balances</li>
            <li>Coach/teacher users unlock member reports</li>
            <li>Members take attempts and receive unlocked reports</li>
          </ul>
          <button className="btn btn-primary" onClick={addStarterCredits} style={{ marginTop: '1.4rem' }} type="button">
            Add Teacher demo pack
          </button>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.9rem' }}>
            <Link to="/packages" className="btn btn-secondary">
              View packages
            </Link>
            <Link to="/dashboard/credits" className="btn btn-secondary">
              Credit history
            </Link>
          </div>
        </section>
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Audience tabs</p>
        <h2 className="section-title">Workspace views</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          {audienceTabs.map((tab) => (
            <button
              className={`btn ${tab.id === selectedAudience ? 'btn-primary' : 'btn-secondary'}`}
              key={tab.id}
              onClick={() => setSelectedAudience(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="price-box" style={{ marginTop: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem' }}>{activeAudience.label}</h3>
          <p style={{ marginTop: '0.6rem' }}>{activeAudience.copy}</p>
          <p className="muted" style={{ marginTop: '0.8rem' }}>
            Detailed roster, cohorts, and API controls are placeholders for the future org API.
          </p>
        </div>
      </section>
    </div>
  )
}
