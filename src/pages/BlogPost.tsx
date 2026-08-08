import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { getPost } from '../data/blog'

export function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <div className="container page-hero">
        <Seo title="Post not found — IQMaster" description="This blog post could not be found." />
        <h1>Post not found</h1>
        <Link to="/blog">Back to blog</Link>
      </div>
    )
  }

  return (
    <div className="container page-hero">
      <Seo title={`${post.title} — IQMaster`} description={post.excerpt} />
      <p className="eyebrow">{post.date}</p>
      <h1>{post.title}</h1>
      <div className="prose" style={{ marginTop: '1.5rem' }}>
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p style={{ marginTop: '2rem' }}>
          <Link to="/iq-test" className="btn btn-primary">
            Take the IQ test
          </Link>
        </p>
      </div>
    </div>
  )
}
