import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'

export function ForOrganizations() {
  const { t } = useI18n()

  const orgUseCases = [
    { title: t('org.familyTitle'), text: t('org.familyText') },
    { title: t('org.teacherTitle'), text: t('org.teacherText') },
    { title: t('org.coachTitle'), text: t('org.coachText') },
    { title: t('org.hrTitle'), text: t('org.hrText') },
  ]

  const roles = [
    { name: 'org_admin', description: t('org.roleAdmin') },
    { name: 'coach_teacher', description: t('org.roleCoach') },
    { name: 'member', description: t('org.roleMember') },
  ]

  return (
    <div className="container page-hero">
      <Seo title={t('org.seoTitle')} description={t('org.seoDescription')} />
      <p className="eyebrow">{t('org.eyebrow')}</p>
      <h1>{t('org.title')}</h1>
      <p>{t('org.lead')}</p>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <div className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            {t('org.model')}
          </div>
          <div className="price">1:1</div>
          <p>{t('org.modelLead')}</p>
          <ul className="checklist">
            <li>{t('org.m1')}</li>
            <li>{t('org.m2')}</li>
            <li>{t('org.m3')}</li>
            <li>{t('org.m4')}</li>
          </ul>
          <Link to="/packages" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            {t('org.compare')}
          </Link>
        </div>

        <div className="prose">
          <h2>{t('org.apiTitle')}</h2>
          <p>{t('org.apiText')}</p>
          <h2>{t('org.creditTitle')}</h2>
          <p>{t('org.creditText')}</p>
          <div className="notice">{t('org.rolesNote')}</div>
        </div>
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">{t('org.audiencesEyebrow')}</p>
        <h2 className="section-title">{t('org.audiencesTitle')}</h2>
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
        <p className="eyebrow">{t('org.rolesEyebrow')}</p>
        <h2 className="section-title">{t('org.rolesTitle')}</h2>
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
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>{t('org.previewTitle')}</h2>
            <p>{t('org.previewLead')}</p>
          </div>
          <Link to="/dashboard/org" className="btn btn-ghost">
            {t('org.openDashboard')}
          </Link>
        </div>
      </section>
    </div>
  )
}
