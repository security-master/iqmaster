import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { POSTS } from '../data/blog'

export function Blog() {
  return (
    <div className="container page-hero">
      <Seo
        title="IQ Test Blog — IQMaster"
        description="Guides on culture-fair IQ testing, reading scores and percentiles, cognitive screening for kids and workplaces, and tips before you start."
      />
      <p className="eyebrow">Blog</p>
      <h1>Notes on intelligence testing</h1>
      <p>Short explainers for first-time test takers.</p>
      <div className="blog-grid" style={{ marginTop: '2rem' }}>
        {POSTS.map((post) => (
          <Link className="blog-card" key={post.slug} to={`/blog/${post.slug}`}>
            <div className="date">{post.date}</div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
