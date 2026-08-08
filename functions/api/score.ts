import { QUESTIONS } from '../../src/data/questions'
import { scoreAnswers } from '../../src/lib/iq'

interface ScoreBody {
  answers?: Array<number | null>
  age?: number
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  let body: ScoreBody
  try {
    body = (await context.request.json()) as ScoreBody
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
