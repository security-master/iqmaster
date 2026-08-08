import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { POSTS } from '../data/blog'
import { useI18n } from '../i18n/I18nContext'

export function Blog() {
  const { t, lang } = useI18n()
  return (
    <div className="container page-hero">
      <Seo title={t('blog.seoTitle')} description={t('blog.lead')} />
      <p className="eyebrow">{t('blog.eyebrow')}</p>
      <h1>{t('blog.title')}</h1>
      <p>{t('blog.lead')}</p>
      <div className="blog-grid" style={{ marginTop: '2rem' }}>
        {POSTS.map((post) => {
          const titleKey = `blog.posts.${post.slug}.title`
          const excerptKey = `blog.posts.${post.slug}.excerpt`
          const title = lang === 'tr' ? t(titleKey) : post.title
          const excerpt = lang === 'tr' ? t(excerptKey) : post.excerpt
          const resolvedTitle = title === titleKey ? post.title : title
          const resolvedExcerpt = excerpt === excerptKey ? post.excerpt : excerpt
          return (
            <Link className="blog-card" key={post.slug} to={`/blog/${post.slug}`}>
              <div className="date">{post.date}</div>
              <h3>{resolvedTitle}</h3>
              <p>{resolvedExcerpt}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
