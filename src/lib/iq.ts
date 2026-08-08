export type Gender = 'female' | 'male' | 'other' | 'prefer_not'
export type CompletionMode = 'full' | 'early'

export interface ScoreIntegrity {
  flags: string[]
  speedPenalty: number
  patternPenalty: number
  note: string
}

export interface ScoreResult {
  iq: number
  percentile: number
  band: string
  summary: string
  correct: number
  total: number
  answered: number
  questionTotal: number
  accuracy: number
  worldRankLabel: string
  confidence: 'standard' | 'medium' | 'low'
  confidenceNote: string
  uncertainty: string
  integrity: ScoreIntegrity
  abilityProfile: Array<{ label: string; score: number; note: string }>
}

export interface ScoreOptions {
  elapsedSeconds?: number
  answers?: Array<number | null>
}

const BANDS: Array<{ min: number; label: string; summary: string }> = [
  {
    min: 145,
    label: 'Very Superior',
    summary: 'Exceptional pattern recognition and abstract reasoning relative to the reference sample.',
  },
  {
    min: 130,
    label: 'Superior',
    summary: 'Strong inductive reasoning with fast visual processing across complex matrices.',
  },
  {
    min: 115,
    label: 'High Average',
    summary: 'Above-average performance with solid consistency on mid and late-stage items.',
  },
  {
    min: 100,
    label: 'Average',
    summary: 'Solid cognitive performance aligned with the population mean on culture-fair items.',
  },
  {
    min: 85,
    label: 'Low Average',
    summary: 'Working ability present; later multi-rule items were the main challenge.',
  },
  {
    min: 0,
    label: 'Below Average',
    summary: 'A retake in a quieter setting often improves consistency on timed matrix items.',
  },
]

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function ordinal(n: number): string {
  const v = n % 100
  if (v >= 11 && v <= 13) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

function evaluateIntegrity(
  answered: number,
  questionTotal: number,
  elapsedSeconds: number | undefined,
  answers: Array<number | null> | undefined,
): ScoreIntegrity {
  const flags: string[] = []
  let speedPenalty = 0
  let patternPenalty = 0

  if (typeof elapsedSeconds === 'number' && answered > 0) {
    const secondsPerItem = elapsedSeconds / answered
    if (answered >= 10 && elapsedSeconds < answered * 2.5) {
      flags.push('suspiciously_fast')
      speedPenalty = 0.22
    } else if (answered >= 8 && secondsPerItem < 4) {
      flags.push('fast_responding')
      speedPenalty = 0.1
    }
  }

  if (answers && answered >= 8) {
    const chosen = answers.filter((a): a is number => a !== null)
    const counts = new Map<number, number>()
    chosen.forEach((a) => counts.set(a, (counts.get(a) ?? 0) + 1))
    const maxSame = Math.max(...counts.values())
    if (maxSame / chosen.length >= 0.7) {
      flags.push('repetitive_response_pattern')
      patternPenalty = 0.18
    }
  }

  if (answered > 0 && answered < Math.min(5, questionTotal)) {
    flags.push('very_low_coverage')
  }

  const note =
    flags.length === 0
      ? 'No integrity warnings detected for this entertainment session.'
      : `Integrity review flags: ${flags.join(', ')}. Score reliability was reduced accordingly.`

  return { flags, speedPenalty, patternPenalty, note }
}

function buildAbilityProfile(accuracy: number, answered: number, questionTotal: number) {
  const base = Math.round(clamp(accuracy * 100, 20, 99))
  const coverageBoost = Math.round(clamp((answered / Math.max(questionTotal, 1)) * 8, 0, 8))
  return [
    {
      label: 'Pattern recognition',
      score: clamp(base + 2, 20, 99),
      note: 'Matrix rule detection across changing visual features.',
    },
    {
      label: 'Working attention',
      score: clamp(base - 1 + coverageBoost, 20, 99),
      note: 'Sustained focus across item progression.',
    },
    {
      label: 'Processing consistency',
      score: clamp(base - (answered < questionTotal ? 6 : 0), 20, 99),
      note: 'Stability of responding under timed visual load.',
    },
    {
      label: 'Abstract reasoning',
      score: clamp(base + (accuracy > 0.7 ? 4 : -2), 20, 99),
      note: 'Multi-rule inference without language dependence.',
    },
  ]
}

/** Map answered-item accuracy to an IQ-like score (mean 100, SD ~15), entertainment use. */
export function scoreAnswers(
  correctCount: number,
  answeredCount: number,
  age: number,
  questionTotal = answeredCount,
  options: ScoreOptions = {},
): ScoreResult {
  const answered = Math.round(clamp(answeredCount, 0, questionTotal))
  const correct = Math.round(clamp(correctCount, 0, answered))
  const accuracy = answered === 0 ? 0 : correct / answered
  const coverage = questionTotal === 0 ? 0 : answered / questionTotal
  const confidence =
    answered < 8 ? 'low' : answered < questionTotal ? 'medium' : 'standard'
  const integrity = evaluateIntegrity(answered, questionTotal, options.elapsedSeconds, options.answers)
  const reliability =
    answered === 0
      ? 0
      : confidence === 'low'
        ? clamp(0.3 + answered * 0.03, 0.3, 0.51)
        : confidence === 'medium'
          ? clamp(0.6 + coverage * 0.35, 0.65, 0.95)
          : 1
  const integrityFactor = clamp(1 - integrity.speedPenalty - integrity.patternPenalty, 0.45, 1)
  // Soft age adjustment: peak mid-20s for fluid reasoning entertainment curve
  const ageFactor = age < 16 ? -4 : age <= 30 ? 2 : age <= 45 ? 0 : age <= 60 ? -2 : -5
  const z = (accuracy - 0.55) / 0.18
  const iq = Math.round(
    clamp(
      answered === 0 ? 100 : 100 + z * 15 * reliability * integrityFactor + ageFactor * reliability * integrityFactor,
      70,
      155,
    ),
  )
  const percentile = Math.round(clamp(normalCdf((iq - 100) / 15) * 100, 1, 99))
  const band = BANDS.find((b) => iq >= b.min) ?? BANDS[BANDS.length - 1]
  const uncertainty =
    confidence === 'low'
      ? 'Estimated uncertainty: +/- 15 IQ points because fewer than 8 items were answered.'
      : confidence === 'medium'
        ? `Estimated uncertainty: +/- ${Math.round(clamp(10 - coverage * 4, 6, 9))} IQ points because the test was finished early.`
        : integrity.flags.length
          ? 'Estimated uncertainty: +/- 8 IQ points after integrity adjustments.'
          : 'Estimated uncertainty: +/- 4 IQ points for this entertainment assessment.'
  const confidenceNote =
    confidence === 'low'
      ? `Low confidence: only ${answered} of ${questionTotal} items were answered, so this is a provisional snapshot rather than a stable estimate.`
      : confidence === 'medium'
        ? `Moderate confidence: the estimate is based on ${answered} answered items and is scaled toward the average to reflect the unfinished portion.`
        : `Standard confidence: all ${questionTotal} visual items were answered.`
  const worldRankLabel =
    confidence === 'low'
      ? 'Provisional percentile context'
      : percentile >= 98
      ? 'Top 2% globally'
      : percentile >= 90
        ? 'Top 10% globally'
        : percentile >= 75
          ? 'Top quartile globally'
          : percentile >= 50
            ? 'Above the global midpoint'
            : 'Building toward the global midpoint'

  return {
    iq,
    percentile,
    band: confidence === 'low' ? `Provisional / Low confidence (${band.label})` : band.label,
    summary:
      confidence === 'standard'
        ? `${band.summary} ${integrity.flags.length ? integrity.note : ''}`.trim()
        : `${band.summary} ${uncertainty}`,
    correct,
    total: answered,
    answered,
    questionTotal,
    accuracy: Math.round(accuracy * 100),
    worldRankLabel,
    confidence,
    confidenceNote,
    uncertainty,
    integrity,
    abilityProfile: buildAbilityProfile(accuracy, answered, questionTotal),
  }
}

/** Normalize older stored results that predate integrity/ability fields. */
export function normalizeScoreResult(result: ScoreResult): ScoreResult {
  return {
    ...result,
    integrity: result.integrity ?? {
      flags: [],
      speedPenalty: 0,
      patternPenalty: 0,
      note: 'No integrity warnings recorded for this stored result.',
    },
    abilityProfile:
      result.abilityProfile ??
      buildAbilityProfile((result.accuracy ?? 0) / 100, result.answered ?? 0, result.questionTotal ?? result.answered ?? 0),
  }
}

function normalCdf(x: number) {
  return 0.5 * (1 + erf(x / Math.SQRT2))
}

function erf(x: number) {
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const t = 1 / (1 + p * ax)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax)
  return sign * y
}
