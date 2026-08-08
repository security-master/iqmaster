import { Link } from 'react-router-dom'

export function About() {
  return (
    <div className="container page-hero">
      <p className="eyebrow">About IQMaster</p>
      <h1>Clarity over theatrics</h1>
      <p>
        IQMaster is an entertainment and education product for people who want a structured,
        culture-fair reasoning challenge — and a clean certificate they can keep.
      </p>

      <div className="prose" style={{ marginTop: '2rem' }}>
        <h2>Who we are</h2>
        <p>
          We rebuild the classic online IQ-test experience with better UX defaults: transparent
          pricing, reviewable answers, and reports that explain percentile — not just a mysterious
          number behind a paywall.
        </p>
        <h2>What this is not</h2>
        <p>
          IQMaster is not a clinical diagnosis, employment screening tool, or substitute for a
          licensed psychologist. Scores are generated from a short matrix battery for personal insight.
        </p>
        <h2>Our goals</h2>
        <ul>
          <li>Keep the assessment language-light and visually consistent</li>
          <li>Show price before commitment</li>
          <li>Give lasting access via Test ID + security code</li>
          <li>Ship a certificate worth printing</li>
        </ul>
        <p style={{ marginTop: '1.5rem' }}>
          <Link to="/iq-test" className="btn btn-primary">
            Start the test
          </Link>
        </p>
      </div>
    </div>
  )
}
