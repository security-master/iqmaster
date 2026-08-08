import { Seo } from '../components/Seo'
import { useI18n } from '../i18n/I18nContext'

const FAQ_KEYS = ['1', '2', '3', '4', '5', '6'] as const

export function FAQ() {
  const { t } = useI18n()
  return (
    <div className="page-shell">
      <Seo title={t('faq.seoTitle')} description={t('faq.seoDescription')} />
      <section className="container page-hero page-hero-card">
        <p className="eyebrow">{t('faq.eyebrow')}</p>
        <h1>{t('faq.title')}</h1>
        <p>{t('faq.lead')}</p>
      </section>
      <div className="container faq-wrap">
        <div className="faq-list">
          {FAQ_KEYS.map((n) => (
            <details className="faq-item" key={n}>
              <summary>{t(`faq.items.q${n}`)}</summary>
              <p>{t(`faq.items.a${n}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
