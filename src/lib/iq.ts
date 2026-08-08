import { getCountryByCode } from '../data/country-iq'
import { getQuestionsForTrack, type TrackId } from './banks'

export type Gender = 'female' | 'male' | 'other' | 'prefer_not'
export type CompletionMode = 'full' | 'early'

export interface ScoreIntegrity {
  flags: string[]
  speedPenalty: number
  patternPenalty: number
  note: string
}

export interface ItemAnalysisRow {
  index: number
  difficulty: 1 | 2 | 3
  status: 'correct' | 'incorrect' | 'skipped'
  chosen: number | null
  answer: number
}

export interface DifficultyBreakdown {
  level: 1 | 2 | 3
  label: string
  correct: number
  answered: number
  accuracy: number
}

export interface CountryComparison {
  countryCode: string
  countryName: string
  nationalAverage: number
  userIq: number
  delta: number
  label: string
}

export interface PersonalizedInsight {
  title: string
  text: string
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
  itemAnalysis?: ItemAnalysisRow[]
  difficultyBreakdown?: DifficultyBreakdown[]
  countryComparison?: CountryComparison
  personalizedInsights?: PersonalizedInsight[]
}

export interface ScoreOptions {
  elapsedSeconds?: number
  answers?: Array<number | null>
  track?: TrackId
  countryCode?: string
  lang?: 'en' | 'tr'
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

const DIFFICULTY_LABELS: Record<'en' | 'tr', Record<1 | 2 | 3, string>> = {
  en: { 1: 'Foundational', 2: 'Intermediate', 3: 'Advanced' },
  tr: { 1: 'Temel', 2: 'Orta', 3: 'İleri' },
}

const BANDS_TR: Record<string, string> = {
  'Very Superior': 'Çok üstün',
  Superior: 'Üstün',
  'High Average': 'Yüksek ortalama',
  Average: 'Ortalama',
  'Low Average': 'Düşük ortalama',
  'Below Average': 'Ortalama altı',
  Incomplete: 'Eksik',
}

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

/** Clean band for certificates/share — strip provisional wrappers. */
export function cleanBandLabel(band: string): string {
  const nested = band.match(/\(([^)]+)\)\s*$/)
  if (nested?.[1]) return nested[1].trim()
  return band
    .replace(/^Provisional\s*\/\s*Low confidence\s*/i, '')
    .replace(/^Provisional\s*/i, '')
    .trim() || band
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

export function buildItemAnalysis(
  answers: Array<number | null> | undefined,
  track: TrackId = 'adult',
): ItemAnalysisRow[] {
  const bank = getQuestionsForTrack(track)
  return bank.map((q, index) => {
    const chosen = answers?.[index] ?? null
    const status: ItemAnalysisRow['status'] =
      chosen === null ? 'skipped' : chosen === q.answer ? 'correct' : 'incorrect'
    return {
      index,
      difficulty: q.difficulty,
      status,
      chosen,
      answer: q.answer,
    }
  })
}

export function buildDifficultyBreakdown(
  items: ItemAnalysisRow[],
  lang: 'en' | 'tr' = 'en',
): DifficultyBreakdown[] {
  const labels = DIFFICULTY_LABELS[lang]
  return ([1, 2, 3] as const).map((level) => {
    const subset = items.filter((i) => i.difficulty === level)
    const answered = subset.filter((i) => i.status !== 'skipped')
    const correct = answered.filter((i) => i.status === 'correct').length
    return {
      level,
      label: labels[level],
      correct,
      answered: answered.length,
      accuracy: answered.length ? Math.round((correct / answered.length) * 100) : 0,
    }
  })
}

function buildAbilityProfile(
  accuracy: number,
  answered: number,
  questionTotal: number,
  breakdown: DifficultyBreakdown[],
  lang: 'en' | 'tr' = 'en',
) {
  const labels =
    lang === 'tr'
      ? ([
          ['Örüntü tanıma', 'Değişen görsel özellikler arasında matris kuralı tespiti.'],
          ['Çalışma dikkati', 'Madde ilerlemesi boyunca sürdürülen odak.'],
          ['İşlem tutarlılığı', 'Zamanlı görsel yük altında yanıt kararlılığı.'],
          ['Soyut muhakeme', 'Dil bağımlılığı olmadan ileri maddelerde çok-kurallı çıkarım.'],
          ['Görsel ayırt etme', 'Şekil, boşluk ve şekil–zemin ilişkilerinin ince ayırımı.'],
          ['Uyarlanabilir problem çözme', 'Madde karmaşıklığı artarken stratejiyi ayarlama becerisi.'],
        ] as const)
      : ([
          ['Pattern recognition', 'Matrix rule detection across changing visual features.'],
          ['Working attention', 'Sustained focus across item progression.'],
          ['Processing consistency', 'Stability of responding under timed visual load.'],
          ['Abstract reasoning', 'Multi-rule inference on advanced items without language dependence.'],
          [
            'Visual discrimination',
            'Fine discrimination of shape, spacing, and figure–ground relationships.',
          ],
          ['Adaptive problem solving', 'Ability to adjust strategy as item complexity increases.'],
        ] as const)

  if (answered === 0) {
    return labels.map(([label]) => ({
      label,
      score: 0,
      note:
        lang === 'tr'
          ? 'Bu yeteneği tahmin etmek için yeterli cevaplanan madde yok.'
          : 'Insufficient answered items to estimate this ability.',
    }))
  }

  const base = Math.round(clamp(accuracy * 100, 20, 99))
  const coverageBoost = Math.round(clamp((answered / Math.max(questionTotal, 1)) * 8, 0, 8))
  const easy = breakdown.find((b) => b.level === 1)
  const mid = breakdown.find((b) => b.level === 2)
  const hard = breakdown.find((b) => b.level === 3)

  const scores = [
    clamp(Math.round((mid?.accuracy || base) * 0.55 + base * 0.45), 20, 99),
    clamp(base - 1 + coverageBoost, 20, 99),
    clamp(
      Math.round(((easy?.accuracy ?? base) + (mid?.accuracy ?? base)) / 2) -
        (answered < questionTotal ? 6 : 0),
      20,
      99,
    ),
    clamp(Math.round((hard?.accuracy || base * 0.85) * 0.7 + base * 0.3), 20, 99),
    clamp(Math.round((easy?.accuracy ?? base) * 0.4 + base * 0.6), 20, 99),
    clamp(Math.round(base + ((hard?.accuracy ?? 0) > (mid?.accuracy ?? 0) ? 5 : -3)), 20, 99),
  ]

  return labels.map(([label, note], i) => ({ label, score: scores[i]!, note }))
}

function buildCountryComparison(
  iq: number,
  countryCode?: string,
  lang: 'en' | 'tr' = 'en',
): CountryComparison | undefined {
  const country = getCountryByCode(countryCode)
  if (!country) return undefined
  const delta = iq - country.average
  const name = lang === 'tr' ? country.nameTr : country.name
  const label =
    lang === 'tr'
      ? delta >= 15
        ? `${name} ulusal ortalamasının oldukça üzerinde`
        : delta >= 5
          ? `${name} ulusal ortalamasının üzerinde`
          : delta >= -4
            ? `${name} ulusal ortalamasına yakın`
            : delta >= -14
              ? `${name} ulusal ortalamasının altında`
              : `${name} ulusal ortalamasının oldukça altında`
      : delta >= 15
        ? `Well above the ${name} national average`
        : delta >= 5
          ? `Above the ${name} national average`
          : delta >= -4
            ? `Near the ${name} national average`
            : delta >= -14
              ? `Below the ${name} national average`
              : `Well below the ${name} national average`

  return {
    countryCode: country.code,
    countryName: name,
    nationalAverage: country.average,
    userIq: iq,
    delta,
    label,
  }
}

function buildPersonalizedInsights(
  iq: number,
  band: string,
  breakdown: DifficultyBreakdown[],
  items: ItemAnalysisRow[],
  integrity: ScoreIntegrity,
  country?: CountryComparison,
  lang: 'en' | 'tr' = 'en',
): PersonalizedInsight[] {
  const insights: PersonalizedInsight[] = []
  const correct = items.filter((i) => i.status === 'correct').length
  const incorrect = items.filter((i) => i.status === 'incorrect').length
  const skipped = items.filter((i) => i.status === 'skipped').length
  const hard = breakdown.find((b) => b.level === 3)
  const easy = breakdown.find((b) => b.level === 1)
  const tr = lang === 'tr'

  insights.push({
    title: tr ? 'Cevap imzanız' : 'Your response signature',
    text: tr
      ? `${correct} maddeyi doğru, ${incorrect} maddeyi yanlış cevapladınız; ${skipped} maddeyi boş bıraktınız. Tahmini IQ’nuz ${iq} ile bu kültürler arası oturumda ${band} bandındasınız.`
      : `You answered ${correct} items correctly, missed ${incorrect}, and left ${skipped} unanswered. Your estimated IQ of ${iq} places you in the ${band} band for this culture-fair session.`,
  })

  if (easy && easy.answered > 0) {
    insights.push({
      title: tr ? 'Temel maddeler' : 'Foundational items',
      text:
        easy.accuracy >= 85
          ? tr
            ? `Temel matrislerde güçlü tutuş (%${easy.accuracy} doğru)—temel görsel kural tespitiniz güvenilir.`
            : `Strong grip on foundational matrices (${easy.accuracy}% correct)—your basic visual rule detection is reliable.`
          : tr
            ? `Temel doğruluk %${easy.accuracy}. Erken maddelere odaklanmayı sıkılaştırmak genelde tüm tahmini dengeler.`
            : `Foundational accuracy was ${easy.accuracy}%. Tightening early-item focus usually stabilizes the whole estimate.`,
    })
  }

  if (hard && hard.answered > 0) {
    insights.push({
      title: tr ? 'İleri matrisler' : 'Advanced matrices',
      text:
        hard.accuracy >= 60
          ? tr
            ? `İleri çok-kurallı maddelerde yerinizi korudunuz (%${hard.accuracy} doğru)—daha güçlü soyut muhakemenin işareti.`
            : `You held ground on advanced multi-rule items (${hard.accuracy}% correct)—a hallmark of stronger abstract reasoning.`
          : tr
            ? `İleri maddeler ana zorluk oldu (%${hard.accuracy} doğru). Geç aşama örüntülerine ekstra süre bu dilimi en çok yükseltir.`
            : `Advanced items were the main challenge (${hard.accuracy}% correct). Extra time on late-stage patterns often lifts this slice most.`,
    })
  }

  if (country) {
    insights.push({
      title: tr ? 'Ulusal bağlam' : 'National context',
      text: tr
        ? `${country.countryName} bildirilen ortalaması ${country.nationalAverage} ile karşılaştırıldığında skorunuz ${
            country.delta >= 0 ? `+${country.delta}` : `${country.delta}`
          } puan (${country.label.toLowerCase()}).`
        : `Compared with ${country.countryName}'s reported average of ${country.nationalAverage}, your score is ${
            country.delta >= 0 ? `+${country.delta}` : `${country.delta}`
          } points (${country.label.toLowerCase()}).`,
    })
  }

  if (integrity.flags.length) {
    insights.push({
      title: tr ? 'Bütünlük notları' : 'Integrity notes',
      text: integrity.note,
    })
  } else {
    insights.push({
      title: tr ? 'Oturum kalitesi' : 'Session quality',
      text: tr
        ? 'Cevap zamanlaması ve seçim örüntüleri eğlence değerlendirmesi için tutarlı görünüyor—bütünlük cezası uygulanmadı.'
        : 'Response timing and choice patterns look consistent for an entertainment assessment—no integrity penalties were applied.',
    })
  }

  return insights
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
  const lang = options.lang ?? 'en'
  const integrity = evaluateIntegrity(answered, questionTotal, options.elapsedSeconds, options.answers)
  const itemAnalysis = buildItemAnalysis(options.answers, options.track ?? 'adult')
  const difficultyBreakdown = buildDifficultyBreakdown(itemAnalysis, lang)
  const reliability =
    answered === 0
      ? 0
      : confidence === 'low'
        ? clamp(0.3 + answered * 0.03, 0.3, 0.51)
        : confidence === 'medium'
          ? clamp(0.6 + coverage * 0.35, 0.65, 0.95)
          : 1
  const integrityFactor = clamp(1 - integrity.speedPenalty - integrity.patternPenalty, 0.45, 1)
  const ageFactor = age < 16 ? -4 : age <= 30 ? 2 : age <= 45 ? 0 : age <= 60 ? -2 : -5
  const z = (accuracy - 0.55) / 0.18
  // Never invent a "100 average" score for unanswered sessions.
  const iq = Math.round(
    clamp(
      answered === 0
        ? 70
        : 100 + z * 15 * reliability * integrityFactor + ageFactor * reliability * integrityFactor,
      70,
      155,
    ),
  )
  const percentile = answered === 0 ? 1 : Math.round(clamp(normalCdf((iq - 100) / 15) * 100, 1, 99))
  const band = BANDS.find((b) => iq >= b.min) ?? BANDS[BANDS.length - 1]
  const uncertainty =
    answered === 0
      ? 'No scored estimate: zero items were answered. Retake and answer at least 8 items.'
      : confidence === 'low'
        ? 'Estimated uncertainty: +/- 15 IQ points because fewer than 8 items were answered.'
        : confidence === 'medium'
          ? `Estimated uncertainty: +/- ${Math.round(clamp(10 - coverage * 4, 6, 9))} IQ points because the test was finished early.`
          : integrity.flags.length
            ? 'Estimated uncertainty: +/- 8 IQ points after integrity adjustments.'
            : 'Estimated uncertainty: +/- 4 IQ points for this entertainment assessment.'
  const confidenceNote =
    answered === 0
      ? `No confidence: 0 of ${questionTotal} items were answered. This session cannot support a published IQ estimate.`
      : confidence === 'low'
        ? `Low confidence: only ${answered} of ${questionTotal} items were answered, so this is a provisional snapshot rather than a stable estimate.`
        : confidence === 'medium'
          ? `Moderate confidence: the estimate is based on ${answered} answered items and is scaled toward the average to reflect the unfinished portion.`
          : `Standard confidence: all ${questionTotal} visual items were answered.`
  const worldRankLabel =
    answered === 0
      ? 'Not ranked — incomplete session'
      : confidence === 'low'
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

  const countryComparison =
    answered === 0 ? undefined : buildCountryComparison(iq, options.countryCode, lang)
  const abilityProfile = buildAbilityProfile(accuracy, answered, questionTotal, difficultyBreakdown, lang)
  const bandLabel = lang === 'tr' ? (BANDS_TR[band.label] ?? band.label) : band.label
  const personalizedInsights = buildPersonalizedInsights(
    iq,
    bandLabel,
    difficultyBreakdown,
    itemAnalysis,
    integrity,
    countryComparison,
    lang,
  )

  return {
    iq,
    percentile,
    band:
      answered === 0
        ? lang === 'tr'
          ? 'Eksik'
          : 'Incomplete'
        : confidence === 'low'
          ? lang === 'tr'
            ? `Geçici / Düşük güven (${bandLabel})`
            : `Provisional / Low confidence (${bandLabel})`
          : bandLabel,
    summary:
      answered === 0
        ? 'This session has no answered items, so IQMaster cannot issue a reliable score or certificate claim.'
        : confidence === 'standard'
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
    abilityProfile,
    itemAnalysis,
    difficultyBreakdown,
    countryComparison,
    personalizedInsights,
  }
}

/** Normalize older stored results; optionally rebuild analysis from live answers. */
export function normalizeScoreResult(
  result: ScoreResult,
  options?: {
    answers?: Array<number | null>
    track?: TrackId
    countryCode?: string
    lang?: 'en' | 'tr'
  },
): ScoreResult {
  const lang = options?.lang ?? 'en'
  const itemAnalysis =
    result.itemAnalysis ??
    (options?.answers ? buildItemAnalysis(options.answers, options.track ?? 'adult') : undefined)
  // Rebuild language-sensitive slices when answers are available or lang is TR.
  const difficultyBreakdown = itemAnalysis
    ? buildDifficultyBreakdown(itemAnalysis, lang)
    : result.difficultyBreakdown
  const countryComparison = buildCountryComparison(result.iq, options?.countryCode, lang) ??
    (result.countryComparison
      ? {
          ...result.countryComparison,
          countryName:
            lang === 'tr'
              ? (getCountryByCode(result.countryComparison.countryCode)?.nameTr ??
                result.countryComparison.countryName)
              : (getCountryByCode(result.countryComparison.countryCode)?.name ??
                result.countryComparison.countryName),
        }
      : undefined)
  const integrity = result.integrity ?? {
    flags: [],
    speedPenalty: 0,
    patternPenalty: 0,
    note:
      lang === 'tr'
        ? 'Bu kayıtlı sonuç için bütünlük uyarısı yok.'
        : 'No integrity warnings recorded for this stored result.',
  }
  const abilityProfile = itemAnalysis
    ? buildAbilityProfile(
        (result.accuracy ?? 0) / 100,
        result.answered ?? 0,
        result.questionTotal ?? result.answered ?? 0,
        difficultyBreakdown ?? [],
        lang,
      )
    : result.abilityProfile
  const personalizedInsights =
    itemAnalysis && difficultyBreakdown
      ? buildPersonalizedInsights(
          result.iq,
          cleanBandLabel(result.band),
          difficultyBreakdown,
          itemAnalysis,
          integrity,
          countryComparison,
          lang,
        )
      : result.personalizedInsights

  return {
    ...result,
    integrity,
    abilityProfile,
    itemAnalysis,
    difficultyBreakdown,
    countryComparison,
    personalizedInsights,
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
