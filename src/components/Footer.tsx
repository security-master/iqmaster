import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">IQMaster</div>
          <p>
            A polished online IQ test with a clear score report, percentile context, and printable
            certificate. Built for personal insight and education.
          </p>
        </div>
        <div className="footer-col">
          <h4>Test</h4>
          <Link to="/iq-test">Start IQ Test</Link>
          <Link to="/display-results">Display Results</Link>
          <Link to="/sample-certificate">Sample Certificate</Link>
          <Link to="/sample-report">Sample Report</Link>
        </div>
        <div className="footer-col">
          <h4>Learn</h4>
          <Link to="/iq-score">IQ Score Guide</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="footer-col">
          <h4>Trust</h4>
          <Link to="/pricing">Transparent Pricing</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">Help Center</Link>
          <p style={{ marginTop: '0.8rem' }}>Report unlock: $19</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} IQMaster. Entertainment and education use.</span>
        <span>30 questions - 20-40 minutes - printable certificate</span>
      </div>
    </footer>
  )
}
