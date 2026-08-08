import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">IQMaster</div>
          <p>
            A private, culture-fair IQ assessment with a precise score, refined report, and
            printable certificate—for individuals and organizations who expect finish quality.
          </p>
        </div>
        <div className="footer-col">
          <h4>Test</h4>
          <Link to="/age-groups">Age Groups</Link>
          <Link to="/kids-intro">Kids Test</Link>
          <Link to="/iq-test">Adult IQ Test</Link>
          <Link to="/display-results">Display Results</Link>
          <Link to="/sample-certificate">Sample Certificate</Link>
          <Link to="/sample-report">Sample Report</Link>
        </div>
        <div className="footer-col">
          <h4>Organizations</h4>
          <Link to="/packages">Packages</Link>
          <Link to="/for-organizations">For Organizations</Link>
          <Link to="/dashboard/org">Org Dashboard</Link>
          <Link to="/dashboard/credits">Credit History</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/iq-score">IQ Score Guide</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} IQMaster. Entertainment and education use.</span>
        <span>30 questions · 20–40 minutes · printable certificate</span>
      </div>
    </footer>
  )
}
