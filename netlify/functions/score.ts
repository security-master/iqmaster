import type { Config, Context } from '@netlify/functions'
import { QUESTIONS } from '../../src/data/questions'
import { scoreAnswers } from '../../src/lib/iq'

interface ScoreBody {
  answers?: Array<number | null>
  age?: number
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: ScoreBody
  try {
    body = (await req.json()) as ScoreBody
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const answers = body.answers
  const age = Number(body.age)
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length || !age) {
    return Response.json({ error: 'answers[30] and age are required' }, { status: 400 })
  }

  const correct = QUESTIONS.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0)
  const result = scoreAnswers(correct, QUESTIONS.length, age)
  return Response.json({ result })
}

export const config: Config = {
  path: '/api/score',
  method: 'POST',
}
