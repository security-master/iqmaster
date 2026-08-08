import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function About() {
  return (
    <div className="page-shell">
      <Seo
        title="About IQMaster — Online IQ Testing"
        description="Learn how IQMaster delivers culture-fair matrix testing, clear score reports, and printable certificates with transparent pricing."
      />
      <section className="container page-hero page-hero-card">
        <p className="eyebrow">About IQMaster</p>
        <h1>Online IQ testing with a certificate-first experience</h1>
        <p>
          IQMaster helps people learn more about their reasoning ability through a structured visual
          test, a clear score report, and a printable certificate they can keep.
        </p>
      </section>

      <section className="container section about-grid">
        <article className="content-card">
          <h2>Who we are</h2>
          <p>
            We rebuild the classic online IQ-test experience with modern UX defaults: transparent
            pricing, reviewable answers, professional reporting, and a certificate that feels ready
            to print or save.
          </p>
        </article>
        <article className="content-card">
          <h2>What this is not</h2>
          <p>
            IQMaster is not a clinical diagnosis, employment screening tool, or substitute for a
            licensed psychologist. Scores are generated from a short matrix battery for personal
            insight and education.
          </p>
        </article>
        <article className="content-card accent-card">
          <h2>Our goals</h2>
          <ul className="checklist">
            <li>Keep the assessment language-light and visually consistent</li>
            <li>Show price before commitment</li>
            <li>Give lasting access via Test ID and security code</li>
            <li>Ship a certificate worth printing</li>
          </ul>
          <Link to="/iq-test" className="btn btn-primary">
            Start the test
          </Link>
        </article>
      </section>
    </div>
  )
}
