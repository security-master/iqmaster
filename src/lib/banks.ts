import { QUESTIONS, type Question } from '../data/questions'
import { KIDS_TEST_BANK } from '../data/test-banks/kids'
import { TEENS_TEST_BANK } from '../data/test-banks/teens'
import type { AgeBandId, VisualTestItem } from './test-catalog'

export type TrackId = AgeBandId

/** Normalize kids/teens VisualTestItem into the Question shape used by the runner. */
function toQuestions(items: VisualTestItem[]): Question[] {
  return items.map((item, index) => ({
    id: index + 1,
    prompt: item.prompt,
    matrix: item.matrix,
    options: item.options,
    answer: item.answer,
    difficulty: item.difficulty,
  }))
}

export function getQuestionsForTrack(track: TrackId = 'adult'): Question[] {
  if (track === 'kids') return toQuestions(KIDS_TEST_BANK)
  if (track === 'teens') return toQuestions(TEENS_TEST_BANK)
  return QUESTIONS
}

export function parseTrack(value: string | null | undefined): TrackId {
  if (value === 'kids' || value === 'teens' || value === 'adult') return value
  return 'adult'
}

export function countCorrectForTrack(
  answers: Array<number | null>,
  track: TrackId = 'adult',
): number {
  const bank = getQuestionsForTrack(track)
  return bank.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0)
}
