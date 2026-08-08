import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'
import { celebrities } from '../data/celebrities'
import { asset } from '../lib/asset'

const abilityKeys = ['memory', 'attention', 'speed', 'inductive', 'quantitative', 'visual'] as const
const stepKeys = ['one', 'two', 'three'] as const
const testimonialKeys = [
  { key: 'sandra', name: 'Sandra Bennett', photo: asset('/images/avatar-sandra.jpg') },
  { key: 'george', name: 'George H. Lewis', photo: asset('/images/avatar-george.jpg') },
  { key: 'jordan', name: 'Jordan Stevenson', photo: asset('/images/avatar-jordan.jpg') },
] as const

export function Home() {
  const { t } = useI18n()

  return (
    <>
      <Seo title={t('home.seoTitle')} description={t('home.seoDescription')} />

      <section className="hero hero--photo hero--atelier">
        <div className="hero-media" aria-hidden="true">
          <img
            className="hero-photo"
            src={asset('/images/hero-focus.jpg')}
            alt=""
            width={2000}
            height={1333}
            fetchPriority="high"
          />
        </div>
        <div className="container hero-content hero-content--photo">
          <p className="hero-brand">
            <span>{t('home.hero.brand')}</span>
          </p>
          <h1 className="hero-title">{t('home.hero.title')}</h1>
          <p className="hero-copy">{t('home.hero.lead')}</p>
          <div className="hero-actions">
            <Link to="/iq-test" className="btn btn-primary">
              {t('home.hero.ctaPrimary')}
            </Link>
            <Link to="/sample-certificate" className="hero-text-link">
              {t('home.hero.ctaSecondary')}
            </Link>
          </div>
          <p className="hero-meta">{t('home.hero.meta')}</p>
        </div>
      </section>

      <section className="section people-section">
        <div className="container people-split">
          <figure className="people-figure people-figure--atelier">
            <img
              className="img-faces"
              src={asset('/images/cta-people.jpg')}
              alt={t('home.people.imageAlt')}
              width={1600}
              height={1067}
            />
          </figure>
          <div className="section-copy">
            <p className="eyebrow">{t('home.people.eyebrow')}</p>
            <h2 className="section-title">{t('home.people.title')}</h2>
            <p className="section-lead">{t('home.people.lead')}</p>
            <div className="hero-actions">
              <Link to="/packages" className="btn btn-primary">
                {t('home.people.ctaPackages')}
              </Link>
              <Link to="/for-organizations" className="btn btn-secondary">
                {t('home.people.ctaOrg')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section celebs-section" id="celebrity-iq">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">{t('home.celebs.eyebrow')}</p>
            <h2 className="section-title section-title--wide">{t('home.celebs.title')}</h2>
            <p className="section-lead">{t('home.celebs.lead')}</p>
          </div>
          <div className="celebs-grid">
            {celebrities.map((person) => (
              <article className="celeb-card" key={person.name}>
                <div className="celeb-card__media">
                  <img src={person.photo} alt={person.name} width={640} height={800} loading="lazy" />
                </div>
                <div className="celeb-card__body">
                  <h3>{person.name}</h3>
                  <p className="celeb-card__score">
                    <span>{person.iq}</span> IQ
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="celebs-note">{t('home.celebs.note')}</p>
          <div className="celebs-cta">
            <Link to="/iq-test" className="btn btn-primary">
              {t('home.celebs.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section assessment-section assessment-section--atelier">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">{t('home.abilities.eyebrow')}</p>
            <h2 className="section-title">{t('home.abilities.title')}</h2>
            <p className="section-lead">{t('home.abilities.lead')}</p>
          </div>
          <div className="ability-grid ability-grid--atelier">
            {abilityKeys.map((key, index) => (
              <article className="ability assessment-card assessment-card--atelier" key={key}>
                <span className="ability-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{t(`home.abilities.items.${key}.title`)}</h3>
                <p>{t(`home.abilities.items.${key}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container people-split people-split--reverse">
          <div className="section-copy">
            <p className="eyebrow">{t('home.trust.eyebrow')}</p>
            <h2 className="section-title">{t('home.trust.title')}</h2>
            <p className="section-lead">{t('home.trust.lead')}</p>
            <div className="hero-actions">
              <Link to="/sample-report" className="btn btn-secondary">
                {t('home.trust.ctaReport')}
              </Link>
              <Link to="/sample-certificate" className="btn btn-secondary">
                {t('home.trust.ctaCertificate')}
              </Link>
            </div>
          </div>
          <figure className="people-figure people-figure--atelier">
            <img
              className="img-faces"
              src={asset('/images/section-study.jpg')}
              alt={t('home.trust.imageAlt')}
              width={1600}
              height={1067}
            />
          </figure>
        </div>
      </section>

      <section className="section testimonial-section testimonial-section--atelier">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">{t('home.testimonials.eyebrow')}</p>
            <h2 className="section-title">{t('home.testimonials.title')}</h2>
          </div>
          <div className="testimonial-grid testimonial-grid--atelier">
            {testimonialKeys.map((item) => (
              <article className="testimonial-card testimonial-card--atelier" key={item.key}>
                <p>&ldquo;{t(`home.testimonials.items.${item.key}.quote`)}&rdquo;</p>
                <div className="testimonial-person">
                  <img src={item.photo} alt="" width={56} height={56} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{t(`home.testimonials.items.${item.key}.location`)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="container people-split">
          <figure className="people-figure people-figure--atelier">
            <img
              className="img-desk"
              src={asset('/images/section-coach.jpg')}
              alt={t('home.how.imageAlt')}
              width={1600}
              height={1067}
            />
          </figure>
          <div className="section-copy">
            <p className="eyebrow">{t('home.how.eyebrow')}</p>
            <h2 className="section-title">{t('home.how.title')}</h2>
            <p className="section-lead">{t('home.how.lead')}</p>
            <div className="steps steps--stacked steps--atelier">
              {stepKeys.map((key, index) => (
                <article className="step step--atelier" key={key}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{t(`home.how.steps.${key}.title`)}</h3>
                    <p>{t(`home.how.steps.${key}.text`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="container">
          <div className="cta-band cta-band--photo cta-band--atelier">
            <img
              className="cta-band__photo"
              src={asset('/images/hero-portrait.jpg')}
              alt=""
              width={1800}
              height={1200}
              aria-hidden="true"
            />
            <div className="cta-band__content">
              <p className="eyebrow">{t('home.finalCta.eyebrow')}</p>
              <h2>{t('home.finalCta.title')}</h2>
              <p>{t('home.finalCta.lead')}</p>
            </div>
            <Link to="/iq-test" className="btn btn-primary inverse">
              {t('home.finalCta.cta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
