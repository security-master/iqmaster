import { KIDS_TEST_BANK } from '../data/test-banks/kids'
import { TEENS_TEST_BANK } from '../data/test-banks/teens'
import { QUESTIONS } from '../data/questions'
import type { MatrixCell } from '../data/questions'

export type AgeBandId = 'kids' | 'teens' | 'adult'

export type DifficultyLevel = 1 | 2 | 3

export interface VisualTestItem {
  id: string
  prompt: string
  matrix: Array<MatrixCell | null>
  options: MatrixCell[]
  answer: number
  difficulty: DifficultyLevel
}

export interface AgeBand {
  id: AgeBandId
  label: string
  rangeLabel: string
  minAge: number
  maxAge: number | null
  itemCount: number
  startPath: string
  bankStatus: 'ready' | 'adult-bank'
  difficultyLabel: string
  description: string
}

export const KIDS_AGE_MIN = 6
export const KIDS_AGE_MAX = 11
export const TEENS_AGE_MIN = 12
export const TEENS_AGE_MAX = 17
export const ADULT_AGE_MIN = 18

export const TEST_BANKS_BY_AGE = {
  kids: KIDS_TEST_BANK,
  teens: TEENS_TEST_BANK,
} as const

export const AGE_BANDS: AgeBand[] = [
  {
    id: 'kids',
    label: 'Kids',
    rangeLabel: '6-11',
    minAge: KIDS_AGE_MIN,
    maxAge: KIDS_AGE_MAX,
    itemCount: KIDS_TEST_BANK.length,
    startPath: '/kids-intro',
    bankStatus: 'ready',
    difficultyLabel: 'Gentle visual reasoning',
    description: 'Large shapes, friendly colors, and fewer answer choices for younger pattern solvers.',
  },
  {
    id: 'teens',
    label: 'Teens',
    rangeLabel: '12-17',
    minAge: TEENS_AGE_MIN,
    maxAge: TEENS_AGE_MAX,
    itemCount: TEENS_TEST_BANK.length,
    startPath: '/iq-test?track=teens',
    bankStatus: 'ready',
    difficultyLabel: 'Medium visual reasoning',
    description: 'Rotation, fill, symmetry, and composition patterns with visual-only items.',
  },
  {
    id: 'adult',
    label: 'Adult',
    rangeLabel: '18+',
    minAge: ADULT_AGE_MIN,
    maxAge: null,
    itemCount: QUESTIONS.length,
    startPath: '/iq-test',
    bankStatus: 'adult-bank',
    difficultyLabel: 'Full IQMaster assessment',
    description: 'The existing adult bank is owned separately and remains wired to the current test flow.',
  },
]

export function getAgeBandForAge(age: number): AgeBand {
  if (age <= KIDS_AGE_MAX) return AGE_BANDS[0]
  if (age <= TEENS_AGE_MAX) return AGE_BANDS[1]
  return AGE_BANDS[2]
}
