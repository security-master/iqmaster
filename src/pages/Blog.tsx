import { Link } from 'react-router-dom'
import { POSTS } from '../data/blog'

export function Blog() {
  return (
    <div className="container page-hero">
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
