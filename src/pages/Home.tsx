import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'
import { asset } from '../lib/asset'

const abilities = [
  ['Memory Retrieval', 'Store, compare, and retrieve patterns while solving each visual item.'],
  ['Attention and Concentration', 'Stay focused as shapes, spacing, and rules shift from question to question.'],
  ['Processing Speed', 'Work through a clean, timed flow that rewards accurate visual scanning.'],
  ['Inductive Reasoning', 'Find the hidden rule in each matrix and choose the missing answer.'],
  ['Quantitative Reasoning', 'Recognize proportional and sequence logic without trivia or long reading.'],
  ['Visual Processing', 'Evaluate rotation, symmetry, progression, and figure-ground relationships.'],
]

const steps = [
  {
    number: '01',
    title: 'Start Intelligence Test',
    text: 'Begin with a focused 30-question assessment designed around culture-fair matrix reasoning.',
  },
  {
    number: '02',
    title: 'Process',
    text: 'Answer one visual problem at a time, review your progress, and complete the test in one sitting.',
  },
  {
    number: '03',
    title: 'Completion',
    text: 'Unlock your IQ score, percentile, report, and printable IQMaster certificate immediately.',
  },
]

const testimonials = [
  {
    quote:
      'The questions felt challenging without being confusing. The report made my score and percentile easy to understand.',
    name: 'Sandra Bennett',
    location: 'Canada',
    photo: asset('/images/avatar-sandra.jpg'),
  },
  {
    quote:
      'A clean way to test yourself online. I liked that the certificate and pricing were clear before I started.',
    name: 'George H. Lewis',
    location: 'United States',
    photo: asset('/images/avatar-george.jpg'),
  },
  {
    quote:
      'Fast, polished, and more informative than the old IQ test sites I remembered from years ago.',
    name: 'Jordan Stevenson',
    location: 'United Kingdom',
    photo: asset('/images/avatar-jordan.jpg'),
  },
]

export function Home() {
  const { t } = useI18n()

  return (
    <>
      <Seo
        title="IQMaster — Online IQ Test & Certificate"
        description="Take a culture-fair 30-question IQ test online. Get your score, percentile, analysis, and printable certificate with transparent pricing."
      />
      <div className="progress-banner">
        <div className="container progress-banner__inner">
          <span>Platform v1 ilerleme: 100% — tüm iş akışları tamam</span>
          <Link to="/progress">İlerleme panosunu aç →</Link>
        </div>
      </div>

      <section className="hero hero--photo">
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
          <p className="hero-brand">{t('home.hero.brand')}</p>
          <h1 className="hero-title">{t('home.hero.title')}</h1>
          <p className="hero-copy">{t('home.hero.lead')}</p>
          <div className="hero-actions">
            <Link to="/iq-test" className="btn btn-primary">
              {t('home.hero.ctaPrimary')}
            </Link>
            <Link to="/age-groups" className="btn btn-secondary">
              {t('home.hero.ctaSecondary')}
            </Link>
          </div>
          <p className="hero-meta">{t('home.hero.meta')}</p>
        </div>
      </section>

      <section className="section people-section">
        <div className="container people-split">
          <figure className="people-figure">
            <img
              src={asset('/images/cta-people.jpg')}
              alt="Professionals collaborating after cognitive assessments"
              width={1600}
              height={1067}
            />
          </figure>
          <div>
            <p className="eyebrow">Trusted by professionals</p>
            <h2 className="section-title">Built for people who want clarity</h2>
            <p className="section-lead">
              Individuals, coaches, teachers, and HR teams use IQMaster for a fast visual assessment
              and a report they can actually use.
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

      <section className="section assessment-section">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">IQMaster — Test Your IQ</p>
            <h2 className="section-title">Put your mind to the test</h2>
            <p className="section-lead">
              IQMaster is designed to help people learn more about human intelligence through a
              structured, visual reasoning assessment.
            </p>
          </div>
          <div className="ability-grid">
            {abilities.map(([title, text]) => (
              <article className="ability assessment-card" key={title}>
                <span className="ability-icon" aria-hidden="true">
                  +
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
          <div>
            <p className="eyebrow">100% Reliable IQ Test</p>
            <h2 className="section-title">Trusted by learners and teams</h2>
            <p className="section-lead">
              A professional certificate funnel, transparent pricing, and clear result pages make
              IQMaster easy to use for personal development, study groups, and coaching contexts.
            </p>
          </div>
          <figure className="people-figure">
            <img
              src={asset('/images/section-study.jpg')}
              alt="Person focused on a cognitive assessment session"
              width={1600}
              height={1067}
            />
          </figure>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">Reviews</p>
            <h2 className="section-title">What test takers say</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card testimonial-card--photo" key={item.name}>
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
          <figure className="people-figure">
            <img
              src={asset('/images/section-coach.jpg')}
              alt="Coach reviewing assessment results with a client"
              width={1600}
              height={1067}
            />
          </figure>
          <div>
            <p className="eyebrow">How It Works</p>
            <h2 className="section-title">How IQMaster works</h2>
            <p className="section-lead">
              An IQ test assesses cognitive abilities and provides a score meant to reflect
              intellectual potential and problem-solving ability.
            </p>
            <div className="steps steps--stacked">
              {steps.map((step) => (
                <article className="step" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="container">
          <div className="cta-band cta-band--photo">
            <img
              className="cta-band__photo"
              src={asset('/images/hero-portrait.jpg')}
              alt=""
              width={1800}
              height={1200}
              aria-hidden="true"
            />
            <div className="cta-band__content">
              <p className="eyebrow">Ready to get started?</p>
              <h2>Start right now with IQMaster</h2>
              <p>One of the clearest online solutions for finding your IQ score and certificate.</p>
            </div>
            <Link to="/iq-test" className="btn btn-primary inverse">
              Start IQ Test Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
