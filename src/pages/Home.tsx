import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'
import { celebrities } from '../data/celebrities'
import { asset } from '../lib/asset'

const abilities = [
  ['Memory Retrieval', 'Hold, compare, and recall patterns across each visual item.'],
  ['Attention', 'Stay precise as spacing, shape, and rules shift from item to item.'],
  ['Processing Speed', 'A timed, uncluttered flow that rewards accurate scanning.'],
  ['Inductive Reasoning', 'Detect the hidden rule in each matrix and complete it.'],
  ['Quantitative Logic', 'Proportion and sequence without trivia or long reading.'],
  ['Visual Processing', 'Rotation, symmetry, progression, and figure–ground judgment.'],
]

const steps = [
  {
    number: '01',
    title: 'Begin the assessment',
    text: 'Thirty culture-fair matrix items. One focused sitting, no distractions.',
  },
  {
    number: '02',
    title: 'Complete with care',
    text: 'Work through each problem at your pace within the session window.',
  },
  {
    number: '03',
    title: 'Unlock your dossier',
    text: 'Score, percentile, ability profile, PDF report, and printable certificate.',
  },
]

const testimonials = [
  {
    quote:
      'Challenging without being gimmicky. The report explained my score with the clarity I expected from a paid assessment.',
    name: 'Sandra Bennett',
    location: 'Toronto',
    photo: asset('/images/avatar-sandra.jpg'),
  },
  {
    quote:
      'Transparent pricing and a certificate worth keeping. Feels closer to a private evaluation than a viral quiz.',
    name: 'George H. Lewis',
    location: 'New York',
    photo: asset('/images/avatar-george.jpg'),
  },
  {
    quote:
      'Quiet, polished, and decisive. I finished knowing exactly what my score meant—and how to share it.',
    name: 'Jordan Stevenson',
    location: 'London',
    photo: asset('/images/avatar-jordan.jpg'),
  },
]

export function Home() {
  const { t } = useI18n()

  return (
    <>
      <Seo
        title="IQMaster — Private Online IQ Assessment & Certificate"
        description="A refined, culture-fair IQ assessment for discerning adults. Clear score, percentile, PDF report, and printable certificate."
      />

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
              alt="Professionals collaborating in a bright workspace"
              width={1600}
              height={1067}
            />
          </figure>
          <div className="section-copy">
            <p className="eyebrow">Private assessment</p>
            <h2 className="section-title">Crafted for people who pay for clarity</h2>
            <p className="section-lead">
              IQMaster is built for adults and organizations who want a serious visual score—not a
              novelty quiz. Quiet design. Transparent unlock. A certificate you can stand behind.
            </p>
            <div className="hero-actions">
              <Link to="/packages" className="btn btn-primary">
                View packages
              </Link>
              <Link to="/for-organizations" className="btn btn-secondary">
                For organizations
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
            <p className="eyebrow">Measured dimensions</p>
            <h2 className="section-title">Six abilities. One precise score.</h2>
            <p className="section-lead">
              Each item probes culture-fair matrix reasoning—so results reflect thinking, not trivia.
            </p>
          </div>
          <div className="ability-grid ability-grid--atelier">
            {abilities.map(([title, text], index) => (
              <article className="ability assessment-card assessment-card--atelier" key={title}>
                <span className="ability-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container people-split people-split--reverse">
          <div className="section-copy">
            <p className="eyebrow">Results you can use</p>
            <h2 className="section-title">A report and certificate with presence</h2>
            <p className="section-lead">
              Unlock a clear IQ score, percentile context, ability profile, and a printable
              IQMaster certificate—designed to look deliberate on paper and on screen.
            </p>
            <div className="hero-actions">
              <Link to="/sample-report" className="btn btn-secondary">
                View sample report
              </Link>
              <Link to="/sample-certificate" className="btn btn-secondary">
                View sample certificate
              </Link>
            </div>
          </div>
          <figure className="people-figure people-figure--atelier">
            <img
              className="img-faces"
              src={asset('/images/section-study.jpg')}
              alt="Advisor reviewing assessment results with a client"
              width={1600}
              height={1067}
            />
          </figure>
        </div>
      </section>

      <section className="section testimonial-section testimonial-section--atelier">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">From recent assessments</p>
            <h2 className="section-title">What discerning test takers notice</h2>
          </div>
          <div className="testimonial-grid testimonial-grid--atelier">
            {testimonials.map((item) => (
              <article className="testimonial-card testimonial-card--atelier" key={item.name}>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <div className="testimonial-person">
                  <img src={item.photo} alt="" width={56} height={56} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.location}</span>
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
              alt="Focused preparation for a visual reasoning assessment"
              width={1600}
              height={1067}
            />
          </figure>
          <div className="section-copy">
            <p className="eyebrow">The path</p>
            <h2 className="section-title">Three steps. No theatre.</h2>
            <p className="section-lead">
              A composed experience from first question to unlocked dossier—built for people who
              value finish quality as much as the score itself.
            </p>
            <div className="steps steps--stacked steps--atelier">
              {steps.map((step) => (
                <article className="step step--atelier" key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
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
              <p className="eyebrow">Begin when ready</p>
              <h2>Reserve your score with IQMaster</h2>
              <p>A private, culture-fair assessment with a certificate worth the unlock.</p>
            </div>
            <Link to="/iq-test" className="btn btn-primary inverse">
              Start the assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
