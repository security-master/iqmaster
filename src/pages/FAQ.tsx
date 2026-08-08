const FAQS = [
  {
    q: 'How many questions are on the IQMaster test?',
    a: 'Thirty matrix items with six options each. Difficulty rises across the session.',
  },
  {
    q: 'How long does it take?',
    a: 'Most people finish in 15–35 minutes. The hard limit is 60 minutes.',
  },
  {
    q: 'Is the test free?',
    a: 'Yes — you can complete every question free. Unlocking your score, analysis, rankings, and certificate costs $19.',
  },
  {
    q: 'Is this culture-fair?',
    a: 'Items are non-verbal pattern matrices designed to reduce language and schooling bias. No test is perfectly culture-free.',
  },
  {
    q: 'How do I view results later?',
    a: 'Use your Test ID and 6-digit security code on the Display Results page.',
  },
  {
    q: 'Can I trust an online IQ score?',
    a: 'Treat it as an informative estimate. Supervised clinical instruments remain the gold standard for high-stakes decisions.',
  },
]

import { Seo } from '../components/Seo'

export function FAQ() {
  return (
    <div className="page-shell">
      <Seo
        title="FAQ — IQMaster Online IQ Test"
        description="Answers about IQMaster test length, timing, culture-fair design, pricing, certificates, and how to retrieve your results later."
      />
      <section className="container page-hero page-hero-card">
        <p className="eyebrow">IQMaster FAQ</p>
        <h1>Answers before you start your IQ test</h1>
        <p>
          Clear details about the questions, timing, report unlock, certificate, and how to view
          your results later.
        </p>
      </section>
      <div className="container faq-wrap">
        <div className="faq-list">
          {FAQS.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
