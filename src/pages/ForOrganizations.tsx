import { Link } from 'react-router-dom'

const orgUseCases = [
  {
    title: 'Families',
    text: 'Buy a small shared pack and unlock reports for parents, teens, and siblings from one balance.',
  },
  {
    title: 'Teachers',
    text: 'Run a classroom or enrichment cohort with prepaid credits and simple assignment workflows.',
  },
  {
    title: 'Coaches',
    text: 'Give clients a structured reasoning benchmark and unlock only the reports you need.',
  },
  {
    title: 'Companies and HR',
    text: 'Prepare bulk employee, candidate, and talent development workflows with an API-ready credit model.',
  },
]

const roles = [
  {
    name: 'org_admin',
    description: 'Buys packages, monitors balance, and manages organization settings.',
  },
  {
    name: 'coach_teacher',
    description: 'Assigns assessments and unlocks reports for members when credits are available.',
  },
  {
    name: 'member',
    description: 'Takes free attempts and receives unlocked reports through the organization.',
  },
]

export function ForOrganizations() {
  return (
    <div className="container page-hero">
      <p className="eyebrow">For organizations</p>
      <h1>Assessment credits for groups that test more than one person.</h1>
      <p>
        IQMaster can support families, classrooms, coaching cohorts, companies, and HR teams with a
        prepaid credit balance instead of one checkout per report.
      </p>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <div className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            Credit model
          </div>
          <div className="price">1:1</div>
          <p>One credit unlocks one completed assessment report.</p>
          <ul className="checklist">
            <li>Free starts can remain free for members</li>
            <li>Org report unlocks consume credits</li>
            <li>Package purchases increase the shared balance</li>
            <li>History is stored locally in this demo build</li>
          </ul>
          <Link to="/packages" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Compare packages
          </Link>
        </div>

        <div className="prose">
          <h2>API-ready, but not API-first yet</h2>
          <p>
            HR Pro includes an API access flag in the data model so later billing, provisioning, and
            report unlock endpoints can be wired without changing the package catalog.
          </p>
          <h2>Designed around credits</h2>
          <p>
            Credits keep billing understandable for coaches and administrators: buy a pack, assign
            attempts, and spend only when a completed assessment report is unlocked.
          </p>
          <div className="notice">
            Roles are typed for now only: org_admin, coach_teacher, and member.
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Audiences</p>
        <h2 className="section-title">One ledger, several buying motions</h2>
        <div className="ability-grid" style={{ marginTop: '2rem' }}>
          {orgUseCases.map((item) => (
            <article className="ability" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: '3rem' }}>
        <p className="eyebrow">Roles</p>
        <h2 className="section-title">Access model placeholder</h2>
        <div className="steps" style={{ marginTop: '2rem' }}>
          {roles.map((role) => (
            <article className="step" key={role.name}>
              <h3>{role.name}</h3>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
        <div className="cta-band">
          <div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Preview org controls</h2>
            <p>Use the dashboard skeleton to view credits, simulate an unlock, and inspect history.</p>
          </div>
          <Link to="/dashboard/org" className="btn btn-ghost">
            Open dashboard
          </Link>
        </div>
      </section>
    </div>
  )
}
