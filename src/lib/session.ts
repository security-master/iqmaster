import { createSecurityCode, createTestId } from './id'
import { scoreAnswers, type CompletionMode, type Gender, type ScoreResult } from './iq'
import { QUESTIONS, countCorrect } from '../data/questions'

export interface TestSession {
  testId: string
  securityCode: string
  createdAt: string
  answers: Array<number | null>
  answeredCount: number
  startedAt: string
  finishedAt?: string
  elapsedSeconds: number
  profile?: {
    name: string
    age: number
    gender: Gender
  }
  completionMode?: CompletionMode
  paid: boolean
  result?: ScoreResult
}

const STORAGE_KEY = 'iqmaster.sessions.v1'
const ACTIVE_KEY = 'iqmaster.activeTestId'

function readAll(): Record<string, TestSession> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, TestSession>) : {}
  } catch {
    return {}
  }
}

function writeAll(data: Record<string, TestSession>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function createSession(): TestSession {
  const session: TestSession = {
    testId: createTestId(),
    securityCode: createSecurityCode(),
    createdAt: new Date().toISOString(),
    answers: Array.from({ length: QUESTIONS.length }, () => null),
    answeredCount: 0,
    startedAt: new Date().toISOString(),
    elapsedSeconds: 0,
    paid: false,
  }
  const all = readAll()
  all[session.testId] = session
  writeAll(all)
  localStorage.setItem(ACTIVE_KEY, session.testId)
  return session
}

export function getSession(testId: string): TestSession | null {
  return readAll()[testId] ?? null
}

export function saveSession(session: TestSession) {
  const all = readAll()
  all[session.testId] = session
  writeAll(all)
}

export function setAnswer(testId: string, index: number, option: number) {
  const session = getSession(testId)
  if (!session) return null
  session.answers[index] = option
  session.answeredCount = countAnswered(session.answers)
  saveSession(session)
  return session
}

export function updateElapsed(testId: string, seconds: number) {
  const session = getSession(testId)
  if (!session) return null
  session.elapsedSeconds = seconds
  saveSession(session)
  return session
}

export function countAnswered(answers: Array<number | null>): number {
  return answers.filter((answer) => answer !== null).length
}

function completionModeFor(answeredCount: number): CompletionMode {
  return answeredCount >= QUESTIONS.length ? 'full' : 'early'
}

export function finishSession(testId: string) {
  const session = getSession(testId)
  if (!session) return null
  const answeredCount = countAnswered(session.answers)
  session.answeredCount = answeredCount
  session.completionMode = completionModeFor(answeredCount)
  session.finishedAt = session.finishedAt ?? new Date().toISOString()
  saveSession(session)
  return session
}

export function completeProfile(
  testId: string,
  profile: { name: string; age: number; gender: Gender },
) {
  const session = getSession(testId)
  if (!session) return null
  const answeredCount = countAnswered(session.answers)
  session.profile = profile
  session.answeredCount = answeredCount
  session.completionMode = completionModeFor(answeredCount)
  session.finishedAt = session.finishedAt ?? new Date().toISOString()
  const correct = countCorrect(session.answers)
  session.result = scoreAnswers(correct, answeredCount, profile.age, QUESTIONS.length)
  saveSession(session)
  return session
}

export function unlockSession(testId: string, securityCode?: string) {
  const session = getSession(testId)
  if (!session) return null
  if (securityCode && securityCode !== session.securityCode) return null
  session.paid = true
  saveSession(session)
  return session
}

export function findByCredentials(testId: string, securityCode: string) {
  const session = getSession(testId.trim().toUpperCase())
  if (!session) return null
  if (session.securityCode !== securityCode.trim()) return null
  return session
}

export function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
