import { Link } from 'react-router-dom'
import { POSTS } from '../data/blog'

const abilities = [
  {
    title: 'Inductive logic',
    text: 'Spot the rule that binds a matrix — then project it one step further.',
  },
  {
    title: 'Visual processing',
    text: 'Track rotation, nesting, and figure-ground shifts without language cues.',
  },
  {
    title: 'Working attention',
    text: 'Hold multiple constraints while distractors compete for focus.',
  },
  {
    title: 'Quantitative patterns',
    text: 'Number cells reward clean arithmetic relations under time pressure.',
  },
  {
    title: 'Spatial sequencing',
    text: 'Follow tiles, orbits, and arrows as they travel across the grid.',
  },
  {
    title: 'Processing tempo',
    text: 'A gentle timer keeps pace honest without turning the session into a sprint.',
  },
]

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow">Online IQ assessment</p>
          <h1 className="hero-brand">IQMaster</h1>
          <p className="hero-copy">
            Thirty culture-fair matrices. One clear score, percentile, and printable certificate —
            with pricing shown before you begin.
          </p>
          <div className="hero-actions">
            <Link to="/iq-test" className="btn btn-primary">
              Find Your IQ Score
            </Link>
            <Link to="/pricing" className="btn btn-secondary">
              See pricing — $19
            </Link>
          </div>
          <p className="hero-meta">30 questions · unlock report for $19 · no surprise checkout tricks</p>
        </div>
      </section>

      <div className="container">
        <div className="feature-strip">
          <article className="feature-item">
            <h3>Built like a matrix exam</h3>
            <p>Progressive difficulty, six options per item, and full review before you finish.</p>
          </article>
          <article className="feature-item">
            <h3>Transparent unlock</h3>
            <p>Take the test free. Unlock score, rankings, and certificate for a flat $19.</p>
          </article>
          <article className="feature-item">
            <h3>Keep your access</h3>
            <p>Every session gets a Test ID and security code for later result lookup.</p>
          </article>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <p className="eyebrow">What we measure</p>
          <h2 className="section-title">Cognitive signals, not trivia</h2>
          <p className="section-lead">
            IQMaster focuses on fluid reasoning — the ability to find structure in novel visual
            information.
          </p>
          <div className="ability-grid" style={{ marginTop: '2.5rem' }}>
            {abilities.map((item) => (
              <article className="ability" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-title">Three steps to your certificate</h2>
              <p className="section-lead">
                Same familiar journey as classic online IQ sites — redesigned for clarity and calmer UX.
              </p>
            </div>
            <div className="steps">
              <article className="step">
                <h3>Start the test</h3>
                <p>Confirm the guidelines, get a Test ID, and enter a focused 30-item session.</p>
              </article>
              <article className="step">
                <h3>Complete & profile</h3>
                <p>Answer at your pace, then share name, age, and gender for normed reporting.</p>
              </article>
              <article className="step">
                <h3>Unlock results</h3>
                <p>Pay $19 once to reveal IQ, percentile, ranking context, and a printable certificate.</p>
              </article>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat">
              <strong>30</strong>
              <span>matrix questions</span>
            </div>
            <div className="stat">
              <strong>6</strong>
              <span>options each</span>
            </div>
            <div className="stat">
              <strong>$19</strong>
              <span>full unlock</span>
            </div>
            <div className="stat">
              <strong>60</strong>
              <span>minute limit</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="eyebrow">From the journal</p>
          <h2 className="section-title">Short reads before you begin</h2>
          <div className="blog-grid" style={{ marginTop: '2rem' }}>
            {POSTS.map((post) => (
              <Link className="blog-card" key={post.slug} to={`/blog/${post.slug}`}>
                <div className="date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="cta-band">
            <div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Ready when you are.</h2>
              <p>Quiet room. Full attention. One sitting. Your Test ID is waiting.</p>
            </div>
            <Link to="/iq-test" className="btn btn-ghost">
              Start IQ Test
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
