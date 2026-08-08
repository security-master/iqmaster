import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { BILLING_PACKAGES } from '../../data/packages'
import {
  consumeAssessmentCredit,
  getCreditSummary,
  purchaseCreditPackage,
} from '../../lib/billing/credits'
import { applyBranding, getBranding, setBranding } from '../../lib/branding'
import {
  createInvite,
  inviteJoinPath,
  listInvites,
  listParticipants,
} from '../../lib/org/invites'
import { getWebhookUrl, setWebhookUrl } from '../../lib/sync'

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
  const [status, setStatus] = useState('Create invites, manage credits, and configure white-label colors.')
  const [invites, setInvites] = useState(() => listInvites())
  const [participants, setParticipants] = useState(() => listParticipants())
  const [branding, setBrandingState] = useState(() => getBranding())
  const [webhook, setWebhook] = useState(() => getWebhookUrl())
  const [lastInviteUrl, setLastInviteUrl] = useState('')
  const activeAudience = audienceTabs.find((tab) => tab.id === selectedAudience) ?? audienceTabs[0]
  const starterPlan = BILLING_PACKAGES.find((plan) => plan.id === 'teacher')
  const joinPreview = useMemo(() => lastInviteUrl, [lastInviteUrl])

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

  async function onCreateInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const invite = await createInvite({
      organizationName: String(data.get('orgName') || branding.organizationName),
      audience: activeAudience.label,
      createdBy: String(data.get('createdBy') || 'Org admin'),
      maxUses: Number(data.get('maxUses') || 50),
    })
    const path = inviteJoinPath(invite.token)
    const absolute = `${window.location.origin}${path}`
    setLastInviteUrl(absolute)
    setInvites(listInvites())
    setStatus(`Invite created: ${invite.token}`)
  }

  function onSaveBranding(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next = setBranding({
      organizationName: String(data.get('organizationName') || 'IQMaster'),
      logoText: String(data.get('logoText') || 'IQMaster'),
      primaryColor: String(data.get('primaryColor') || '#5b21b6'),
      accentColor: String(data.get('accentColor') || '#7c3aed'),
    })
    setBrandingState(next)
    applyBranding(next)
    setStatus('White-label branding saved for this browser.')
  }

  function onSaveWebhook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setWebhookUrl(webhook)
    setStatus(webhook ? 'Webhook URL saved. Fired on assessment unlock.' : 'Webhook cleared.')
  }

  return (
    <div className="container page-hero">
      <p className="eyebrow">Org dashboard</p>
      <h1>{summary.organizationName}</h1>
      <p>Credits, invite links, participant list, white-label colors, and unlock webhooks — without Stripe.</p>

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
          <strong>{participants.length}</strong>
          <span>participants joined</span>
        </div>
      </div>

      <div className="notice" style={{ marginTop: '2rem' }}>
        {status}
      </div>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <section className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            Invite members
          </div>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.35rem' }}>Create invite link</h2>
          <form className="form-grid" style={{ marginTop: '1.2rem' }} onSubmit={onCreateInvite}>
            <div className="field">
              <label htmlFor="orgName">Organization name</label>
              <input id="orgName" name="orgName" defaultValue={branding.organizationName} />
            </div>
            <div className="field">
              <label htmlFor="createdBy">Created by</label>
              <input id="createdBy" name="createdBy" defaultValue="Org admin" />
            </div>
            <div className="field">
              <label htmlFor="maxUses">Max uses</label>
              <input id="maxUses" name="maxUses" type="number" min={1} defaultValue={50} />
            </div>
            <button className="btn btn-primary" type="submit">
              Generate invite link
            </button>
          </form>
          {joinPreview && (
            <p className="notice" style={{ marginTop: '1rem', wordBreak: 'break-all' }}>
              {joinPreview}
            </p>
          )}
          <button className="btn btn-secondary" onClick={unlockDemoReport} style={{ marginTop: '1rem' }} type="button">
            Simulate completed report unlock
          </button>
        </section>

        <section className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            Admin actions
          </div>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.35rem' }}>Credits &amp; API hooks</h2>
          <ul className="checklist">
            <li>Roles available: {summary.roles.join(', ')}</li>
            <li>Spend 1 credit on payment page via “Unlock with org credit”</li>
            <li>Webhook fires on unlock (best-effort POST)</li>
          </ul>
          <button className="btn btn-primary" onClick={addStarterCredits} style={{ marginTop: '1.4rem' }} type="button">
            Add Teacher demo pack
          </button>
          <form className="form-grid" style={{ marginTop: '1rem' }} onSubmit={onSaveWebhook}>
            <div className="field">
              <label htmlFor="webhook">Unlock webhook URL</label>
              <input
                id="webhook"
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                placeholder="https://example.com/hooks/iqmaster"
              />
            </div>
            <button className="btn btn-secondary" type="submit">
              Save webhook
            </button>
          </form>
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

      <div className="split" style={{ marginTop: '2rem' }}>
        <section className="price-box">
          <h2 style={{ fontSize: '1.6rem' }}>White-label branding</h2>
          <form className="form-grid" style={{ marginTop: '1rem' }} onSubmit={onSaveBranding}>
            <div className="field">
              <label htmlFor="organizationName">Org display name</label>
              <input id="organizationName" name="organizationName" defaultValue={branding.organizationName} />
            </div>
            <div className="field">
              <label htmlFor="logoText">Logo text</label>
              <input id="logoText" name="logoText" defaultValue={branding.logoText} />
            </div>
            <div className="field">
              <label htmlFor="primaryColor">Primary color</label>
              <input id="primaryColor" name="primaryColor" type="color" defaultValue={branding.primaryColor} />
            </div>
            <div className="field">
              <label htmlFor="accentColor">Accent color</label>
              <input id="accentColor" name="accentColor" type="color" defaultValue={branding.accentColor} />
            </div>
            <button className="btn btn-primary" type="submit">
              Apply branding
            </button>
          </form>
        </section>

        <section className="price-box">
          <h2 style={{ fontSize: '1.6rem' }}>Participants</h2>
          <ul className="checklist" style={{ marginTop: '1rem' }}>
            {participants.length === 0 && <li>No participants yet — share an invite link.</li>}
            {participants.slice(0, 8).map((p) => (
              <li key={p.id}>
                {p.memberName} · {p.organizationName} · {p.status}
              </li>
            ))}
          </ul>
          <h3 style={{ marginTop: '1.4rem' }}>Recent invites</h3>
          <ul className="checklist" style={{ marginTop: '0.7rem' }}>
            {invites.length === 0 && <li>No invites yet.</li>}
            {invites.slice(0, 6).map((invite) => (
              <li key={invite.token}>
                {invite.token} · {invite.useCount}/{invite.maxUses} · {invite.audience}
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary" style={{ marginTop: '1rem' }} type="button" onClick={() => setParticipants(listParticipants())}>
            Refresh lists
          </button>
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
        </div>
      </section>
    </div>
  )
}
