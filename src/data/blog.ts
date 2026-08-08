export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string[]
}

export const POSTS: BlogPost[] = [
  {
    slug: 'what-is-a-culture-fair-iq-test',
    title: 'What is a culture-fair IQ test?',
    date: '2026-06-12',
    excerpt: 'Why non-verbal matrices reduce language bias — and what they still cannot measure.',
    body: [
      'Culture-fair tests emphasize visual patterns, spatial relations, and inductive rules instead of vocabulary or school knowledge.',
      'IQMaster uses matrix-style items so people from different language backgrounds can attempt the same reasoning challenges.',
      'Even so, no short online test replaces a supervised clinical battery. Treat your score as a structured self-insight tool.',
    ],
  },
  {
    slug: 'how-to-read-your-iq-score',
    title: 'How to read your IQ score',
    date: '2026-05-03',
    excerpt: 'Mean 100, standard deviation 15 — and why percentile often matters more than the raw number.',
    body: [
      'Most modern IQ scales center on 100. About two-thirds of people score between 85 and 115.',
      'Percentile tells you how you compare with a reference population. An IQ of 115 is roughly the 84th percentile.',
      'IQMaster reports both score and percentile, plus a plain-language band so the number has context.',
    ],
  },
  {
    slug: 'tips-before-you-start',
    title: 'Five tips before you start an online IQ test',
    date: '2026-04-18',
    excerpt: 'Quiet room, full screen, no second screens — small setup choices change consistency.',
    body: [
      'Sit somewhere you will not be interrupted for up to 40 minutes.',
      'Close other tabs and silence notifications. Attention is part of the signal.',
      'Do not rush early items; later matrices stack rules and reward careful scanning.',
      'You can revisit questions before finishing on IQMaster.',
      'Remember: sleep, stress, and haste can swing short tests by several points.',
    ],
  },
]

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug)
}
