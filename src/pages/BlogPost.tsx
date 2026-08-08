import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { getPost } from '../data/blog'
import { useI18n } from '../i18n/I18nContext'

export function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined
  const { t, lang } = useI18n()

  if (!post) {
    return (
      <div className="container page-hero">
        <Seo title={`${t('blog.notFound')} — IQMaster`} description={t('blog.notFound')} />
        <h1>{t('blog.notFound')}</h1>
        <Link to="/blog">{t('blog.back')}</Link>
      </div>
    )
  }

  const titleKey = `blog.posts.${post.slug}.title`
  const excerptKey = `blog.posts.${post.slug}.excerpt`
  const title = lang === 'tr' ? t(titleKey) : post.title
  const excerpt = lang === 'tr' ? t(excerptKey) : post.excerpt
  const resolvedTitle = title === titleKey ? post.title : title
  const resolvedExcerpt = excerpt === excerptKey ? post.excerpt : excerpt
  const body =
    lang === 'tr'
      ? post.body.map((_, i) => {
          const key = `blog.posts.${post.slug}.p${i + 1}`
          const value = t(key)
          return value === key ? null : value
        })
      : post.body
  const resolvedBody = body.every((p) => p == null) ? post.body : body.filter((p): p is string => !!p)

  return (
    <div className="container page-hero">
      <Seo title={`${resolvedTitle} — IQMaster`} description={resolvedExcerpt} />
      <p className="eyebrow">{post.date}</p>
      <h1>{resolvedTitle}</h1>
      <div className="prose" style={{ marginTop: '1.5rem' }}>
        {resolvedBody.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <p style={{ marginTop: '2rem' }}>
          <Link to="/iq-test" className="btn btn-primary">
            {t('blog.cta')}
          </Link>
        </p>
      </div>
    </div>
  )
}
