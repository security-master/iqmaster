import { useEffect } from 'react'

const DEFAULT_DESCRIPTION =
  'IQMaster — a clear, culture-fair online IQ test with a printable certificate. 30 questions. Transparent pricing.'

interface SeoProps {
  title: string
  description: string
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title
    const meta =
      document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
      (() => {
        const el = document.createElement('meta')
        el.setAttribute('name', 'description')
        document.head.appendChild(el)
        return el
      })()
    const prevDescription = meta.getAttribute('content') ?? DEFAULT_DESCRIPTION

    document.title = title
    meta.setAttribute('content', description)

    return () => {
      document.title = prevTitle
      meta.setAttribute('content', prevDescription)
    }
  }, [title, description])

  return null
}
