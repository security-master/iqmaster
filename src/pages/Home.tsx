import { Link } from 'react-router-dom'

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
  },
  {
    quote:
      'A clean way to test yourself online. I liked that the certificate and pricing were clear before I started.',
    name: 'George H. Lewis',
    location: 'United States',
  },
  {
    quote:
      'Fast, polished, and more informative than the old IQ test sites I remembered from years ago.',
    name: 'Jordan Stevenson',
    location: 'United Kingdom',
  },
]

const trustLogos = ['University Clubs', 'Career Coaches', 'Student Programs', 'HR Teams', 'Learning Labs']

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">IQMaster Online IQ Test</p>
            <h1 className="hero-brand">The Most Accurate Online IQ Test</h1>
            <p className="hero-copy">
              Join thousands who use IQMaster to test their reasoning, understand their score, and
              receive a polished certificate with a clear IQ report.
            </p>
            <div className="hero-actions">
              <Link to="/iq-test" className="btn btn-primary">
                Find Your IQ Score
              </Link>
              <Link to="/sample-certificate" className="btn btn-secondary">
                View Certificate
              </Link>
            </div>
            <p className="hero-meta">30 questions - about 20-40 minutes - report unlock $19</p>
          </div>

          <div className="hero-panel" aria-label="IQMaster certificate preview">
            <div className="certificate-card">
              <div className="certificate-ribbon">IQMaster Certificate</div>
              <div className="score-preview">
                <span>IQ</span>
                <strong>128</strong>
              </div>
              <p>Percentile ranking, ability profile, and printable certificate included.</p>
              <div className="mini-chart" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="hero-badge">
              <strong>100%</strong>
              <span>Online, private, and certificate-ready</span>
            </div>
          </div>
        </div>
      </section>

      <section className="social-proof" aria-label="IQMaster social proof">
        <div className="container proof-grid">
          <div>
            <strong>52K+</strong>
            <span>monthly visitors</span>
          </div>
          <div>
            <strong>130K+</strong>
            <span>tests started</span>
          </div>
          <div>
            <strong>30</strong>
            <span>visual questions</span>
          </div>
          <div>
            <strong>$19</strong>
            <span>complete report</span>
          </div>
        </div>
      </section>

      <section className="section assessment-section">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">IQMaster - Test Your IQ</p>
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
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">100% Reliable IQ Test</p>
              <h2 className="section-title">Trusted by learners and teams across the world</h2>
              <p className="section-lead">
                A professional certificate funnel, transparent pricing, and clear result pages make
                IQMaster easy to use for personal development, study groups, and coaching contexts.
              </p>
            </div>
            <div className="trust-logos" aria-label="Trust categories">
              {trustLogos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </div>
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
              <article className="testimonial-card" key={item.name}>
                <p>"{item.quote}"</p>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.location}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">How It Works</p>
            <h2 className="section-title">How IQMaster IQ Test works</h2>
            <p className="section-lead">
              An IQ test assesses cognitive abilities and provides a score meant to reflect
              intellectual potential and problem-solving ability.
            </p>
          </div>
          <div className="steps">
            {steps.map((step) => (
              <article className="step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta-section">
        <div className="container">
          <div className="cta-band">
            <div>
              <p className="eyebrow">Ready to get started IQ test?</p>
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
