import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { acceptInvite, getInvite } from '../lib/org/invites'
import { setBranding } from '../lib/branding'
import { Seo } from '../components/Seo'

export function JoinInvite() {
  const { token = '' } = useParams()
  const navigate = useNavigate()
  const invite = useMemo(() => getInvite(token), [token])
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const participant = await acceptInvite(token, name)
    if (!participant) {
      setError('Invite is invalid, full, or inactive.')
      return
    }
    setBranding({
      organizationName: participant.organizationName,
      logoText: participant.organizationName,
    })
    navigate(`/iq-test?invite=${encodeURIComponent(token)}&member=${encodeURIComponent(name)}`)
  }

  if (!invite) {
    return (
      <div className="container page-hero">
        <Seo title="Invite not found — IQMaster" description="This organization invite link is invalid." />
        <h1>Invite not found</h1>
        <p>Ask your organization admin for a fresh invite link.</p>
        <Link className="btn btn-primary" to="/age-groups" style={{ marginTop: '1.2rem' }}>
          Start a personal test
        </Link>
      </div>
    )
  }

  return (
    <div className="container page-hero">
      <Seo
        title={`Join ${invite.organizationName} — IQMaster`}
        description="Accept an organization invite and start your IQMaster assessment."
      />
      <p className="eyebrow">Organization invite</p>
      <h1>Join {invite.organizationName}</h1>
      <p>
        Audience: <strong>{invite.audience}</strong> · Uses {invite.useCount}/{invite.maxUses}
      </p>
      <form className="form-grid" style={{ marginTop: '1.5rem', maxWidth: 480 }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="member">Your name</label>
          <input id="member" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">
          Accept &amp; start test
        </button>
        {error && <p className="notice">{error}</p>}
      </form>
    </div>
  )
}
