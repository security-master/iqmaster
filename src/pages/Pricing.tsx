import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function Pricing() {
  return (
    <div className="container page-hero">
      <Seo
        title="Pricing — IQMaster IQ Test Results"
        description="Take the full 30-question IQ test free. Unlock your score, percentile, analysis, and printable certificate for one flat price — no subscription."
      />
      <p className="eyebrow">Pricing</p>
      <h1>One price. Full unlock.</h1>
      <p>
        Take the complete 30-question test at no cost. Pay only when you want the scored report and
        certificate.
      </p>

      <div className="split" style={{ marginTop: '2.5rem' }}>
        <div className="price-box">
          <div className="muted" style={{ fontWeight: 700 }}>
            Results package
          </div>
          <div className="price">$19</div>
          <p>Flat unlock — no subscriptions.</p>
          <ul className="checklist">
            <li>Verified IQ score & band</li>
            <li>Percentile and ranking context</li>
            <li>Personal analysis summary</li>
            <li>Printable certificate with your name</li>
            <li>Online access via Test ID + security code</li>
          </ul>
          <Link to="/iq-test" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Start free test
          </Link>
        </div>
        <div className="prose">
          <h2>Why we charge after the test</h2>
          <p>
            Scoring, hosting, and certificate generation have a cost. Unlike many IQ funnels, we tell
            you the price on the homepage and pricing page before you invest half an hour.
          </p>
          <h2>Demo checkout</h2>
          <p>
            This build includes a demo unlock flow so you can preview the full results experience
            without a live payment provider. Wire Stripe or PayPal when you deploy to production.
          </p>
        </div>
      </div>
    </div>
  )
}
