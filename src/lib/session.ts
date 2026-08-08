import { createSecurityCode, createTestId } from './id'
import { scoreAnswers, type CompletionMode, type Gender, type ScoreResult } from './iq'
import { countCorrectForTrack, getQuestionsForTrack, type TrackId } from './banks'

export interface TestSession {
  testId: string
  securityCode: string
  createdAt: string
  track: TrackId
  answers: Array<number | null>
  answeredCount: number
  startedAt: string
  finishedAt?: string
  elapsedSeconds: number
  profile?: {
    name: string
    age: number
    gender: Gender
    countryCode?: string
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

export function createSession(track: TrackId = 'adult'): TestSession {
  const bank = getQuestionsForTrack(track)
  const session: TestSession = {
    testId: createTestId(),
    securityCode: createSecurityCode(),
    createdAt: new Date().toISOString(),
    track,
    answers: Array.from({ length: bank.length }, () => null),
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
  const session = readAll()[testId] ?? null
  if (!session) return null
  if (!session.track) session.track = 'adult'
  return session
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

function completionModeFor(answeredCount: number, total: number): CompletionMode {
  return answeredCount >= total ? 'full' : 'early'
}

export function finishSession(testId: string) {
  const session = getSession(testId)
  if (!session) return null
  const total = getQuestionsForTrack(session.track).length
  const answeredCount = countAnswered(session.answers)
  session.answeredCount = answeredCount
  session.completionMode = completionModeFor(answeredCount, total)
  session.finishedAt = session.finishedAt ?? new Date().toISOString()
  saveSession(session)
  return session
}

export function completeProfile(
  testId: string,
  profile: { name: string; age: number; gender: Gender; countryCode?: string },
  lang: 'en' | 'tr' = 'en',
) {
  const session = getSession(testId)
  if (!session) return null
  const total = getQuestionsForTrack(session.track).length
  const answeredCount = countAnswered(session.answers)
  session.profile = profile
  session.answeredCount = answeredCount
  session.completionMode = completionModeFor(answeredCount, total)
  session.finishedAt = session.finishedAt ?? new Date().toISOString()
  const correct = countCorrectForTrack(session.answers, session.track)
  session.result = scoreAnswers(correct, answeredCount, profile.age, total, {
    elapsedSeconds: session.elapsedSeconds,
    answers: session.answers,
    track: session.track,
    countryCode: profile.countryCode,
    lang,
  })
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
