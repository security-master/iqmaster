import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">IQMaster</div>
          <p>{t('footer.blurb')}</p>
        </div>
        <div className="footer-col">
          <h4>{t('footer.test')}</h4>
          <Link to="/age-groups">{t('footer.ageGroups')}</Link>
          <Link to="/kids-intro">{t('footer.kidsTest')}</Link>
          <Link to="/iq-test">{t('footer.adultTest')}</Link>
          <Link to="/display-results">{t('footer.displayResults')}</Link>
          <Link to="/sample-certificate">{t('footer.sampleCertificate')}</Link>
          <Link to="/sample-report">{t('footer.sampleReport')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footer.organizations')}</h4>
          <Link to="/packages">{t('footer.packages')}</Link>
          <Link to="/for-organizations">{t('footer.forOrganizations')}</Link>
          <Link to="/dashboard/org">{t('footer.orgDashboard')}</Link>
          <Link to="/dashboard/credits">{t('footer.creditHistory')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footer.company')}</h4>
          <Link to="/about">{t('footer.about')}</Link>
          <Link to="/pricing">{t('footer.pricing')}</Link>
          <Link to="/iq-score">{t('footer.iqScoreGuide')}</Link>
          <Link to="/blog">{t('footer.blog')}</Link>
          <Link to="/faq">{t('footer.faq')}</Link>
          <Link to="/contact">{t('footer.contact')}</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </span>
        <span>{t('footer.meta')}</span>
      </div>
    </footer>
  )
}
