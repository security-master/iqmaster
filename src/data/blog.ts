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
  {
    slug: 'what-online-iq-tests-measure',
    title: 'What online IQ tests actually measure',
    date: '2026-07-02',
    excerpt:
      'Fluid reasoning, working memory, and processing speed — not trivia, vocabulary, or school grades.',
    body: [
      'When people search for an online IQ test, they often expect trivia or vocabulary drills. Modern matrix-style instruments instead target fluid reasoning: the ability to detect rules in unfamiliar visual patterns and apply them under time pressure.',
      'Short web assessments also lean on working memory and selective attention. You must hold partial rules in mind while scanning six answer options, discarding distractors that look plausible but break the pattern.',
      'What they do not measure is crystallized knowledge — facts you learned in school, job training, or daily reading. That separation is intentional. Culture-fair designs try to compare reasoning skill rather than educational exposure.',
      'IQMaster focuses on inductive matrix items so scores reflect visual-analytic performance in one sitting. Treat the result as a structured snapshot, not a complete picture of every cognitive strength you have.',
      'For hiring, diagnosis, or gifted placement, supervised batteries with multiple subtests remain the standard. Online tools are best for personal insight, practice, and conversation starters with qualified professionals.',
    ],
  },
  {
    slug: 'culture-fair-assessment-explained',
    title: 'Culture-fair cognitive assessment: what it means in practice',
    date: '2026-07-18',
    excerpt:
      'Non-verbal matrices reduce language bias, but fairness also depends on norms, access, and how scores are used.',
    body: [
      'Culture-fair assessment is not a single test brand — it is a design goal. Items should minimize dependence on a specific language, curriculum, or cultural reference so more people can attempt the same reasoning task on equal footing.',
      'Matrix reasoning fits that goal because progressions rely on shape, rotation, symmetry, and sequence logic instead of reading comprehension. IQMaster uses this format so test takers from different countries and schooling backgrounds see comparable stimuli.',
      'Fairness does not stop at item type. Reference norms matter: an IQ of 110 only has meaning relative to the population used to calibrate the scale. Transparent reporting should show both the standard score and the percentile band.',
      'Accessibility is part of fairness too. Small screens, glare, interruptions, or unfamiliarity with timed tests can depress scores unrelated to underlying ability. A quiet environment and a device you are comfortable with improve consistency.',
      'No short online battery is perfectly culture-free or bias-free. Use culture-fair scores as one input — especially for self-development — and avoid high-stakes decisions based on a single unsupervised session.',
    ],
  },
  {
    slug: 'cognitive-testing-for-kids',
    title: 'Cognitive testing for kids: a parent-friendly guide',
    date: '2026-08-01',
    excerpt:
      'When matrix tests help, what age-appropriate expectations look like, and why professional follow-up still matters.',
    body: [
      'Parents often wonder whether an online IQ test is appropriate for children. Non-verbal matrix formats can be easier to introduce than word-heavy exams because they do not require advanced reading skills, but age still shapes stamina, motor control, and test anxiety.',
      'IQMaster offers age-group tracks so item difficulty and framing match developmental expectations. Younger children may need shorter sessions, breaks, and an adult nearby to explain instructions — not to help with answers, but to keep them oriented.',
      'A single score never defines a child. Cognitive profiles include memory, processing speed, creativity, and social reasoning that one timed matrix session cannot fully capture. Schools and clinicians use broader batteries when placement or support plans are on the line.',
      'If a child scores unusually high or low compared with classroom performance, treat the result as a prompt for conversation — with teachers, pediatricians, or licensed psychologists — rather than a label.',
      'Used thoughtfully, culture-fair online tests can spark curiosity about how the brain finds patterns. Pair results with encouragement, not pressure, and prioritize sleep and calm conditions on test day.',
    ],
  },
  {
    slug: 'workplace-cognitive-screening',
    title: 'Workplace cognitive screening: benefits, limits, and fair use',
    date: '2026-08-08',
    excerpt:
      'Reasoning benchmarks can support talent development — when they supplement interviews, not replace them.',
    body: [
      'HR teams and coaches sometimes use cognitive screening to benchmark inductive reasoning, attention under load, or training readiness. Matrix-style tools can standardize one slice of that picture across candidates who share little educational background.',
      'The benefit is consistency: everyone sees the same visual rules instead of trick questions tied to a single industry jargon. Paired with structured interviews and work samples, reasoning scores can highlight development areas or flag need for accommodations.',
      'The risk is over-reliance. A 30-minute unsupervised web test is a weak sole gatekeeper for hiring. Scores fluctuate with sleep, stress, device quality, and familiarity with timed tests — factors unrelated to job performance.',
      'Fair use means informed consent, transparent purpose, and human review. Candidates should know whether results affect employment, how data is stored, and that they may request retest conditions or alternative assessments where regulations require it.',
      'IQMaster organization credits are built for cohorts that need prepaid report unlocks — classrooms, coaching groups, and pilot HR workflows — not automated rejection pipelines. Use cognitive data to support people, not to shortcut judgment.',
    ],
  },
  {
    slug: 'understanding-iq-percentiles',
    title: 'Understanding IQ percentiles: from average to exceptional',
    date: '2026-08-15',
    excerpt:
      'Why percentile beats raw IQ for context, how the bell curve maps scores, and common misreadings to avoid.',
    body: [
      'IQ scores are standard scores: most scales set the mean at 100 and the standard deviation at 15. Percentile tells you what percentage of the reference group scored at or below your result — often more intuitive than the raw number.',
      'A score of 100 is near the 50th percentile — statistically average, not a pass/fail mark. Moving from 100 to 115 jumps you to roughly the 84th percentile, meaning you outperformed about five out of six people in the norm sample.',
      'High scores compress at the top. The gap between IQ 130 and 145 spans fewer percentile points than the gap between 85 and 100 because the bell curve has less area in the tails. That is why labels like "gifted" always depend on local definitions.',
      'Always check which norm group a platform uses. Age, country, and test version shift percentiles. IQMaster reports score, percentile, and a plain-language band together so you see relative standing, not an isolated integer.',
      'Avoid comparing percentiles from different tests or years as if they were identical rulers. Use them to understand your result in context, then focus on skills, habits, and goals — scores describe a snapshot, not a ceiling.',
    ],
  },
]

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug)
}
