import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CellSvg, MatrixSvg } from '../components/PuzzleSvg'
import { useI18n } from '../i18n/I18nContext'
import { getQuestionsForTrack } from '../lib/banks'
import { countAnswered, finishSession, formatElapsed, getSession, setAnswer, updateElapsed } from '../lib/session'

export function TestQuestion() {
  const { testId = '', number = '1' } = useParams()
  const navigate = useNavigate()
  const { t } = useI18n()
  const index = Number(number) - 1
  const session = getSession(testId)
  const questions = useMemo(
    () => getQuestionsForTrack(session?.track ?? 'adult'),
    [session?.track],
  )
  const question = questions[index]
  const [elapsed, setElapsed] = useState(session?.elapsedSeconds ?? 0)
  const [selected, setSelected] = useState<number | null>(session?.answers[index] ?? null)

  useEffect(() => {
    setSelected(session?.answers[index] ?? null)
  }, [index, session])

  useEffect(() => {
    if (!session) return
    const timer = window.setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1
        updateElapsed(testId, next)
        if (next >= 60 * 60) {
          finishSession(testId)
          navigate(`/iq-test/${testId}/complete`)
        }
        return next
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [testId, session, navigate])

  if (!session) return <Navigate to="/age-groups" replace />
  if (!question || Number.isNaN(index) || index < 0 || index >= questions.length) {
    return <Navigate to={`/iq-test/${testId}/1`} replace />
  }

  function choose(option: number) {
    setSelected(option)
    setAnswer(testId, index, option)
  }

  function finishNow() {
    const latestSession = getSession(testId) ?? session
    if (!latestSession) return
    const currentAnsweredCount = countAnswered(latestSession.answers)
    if (currentAnsweredCount < 1) {
      window.alert(t('test.question.needOne'))
      return
    }
    if (
      currentAnsweredCount < 8 &&
      !window.confirm(
        t('test.question.earlyConfirm', {
          answered: currentAnsweredCount,
          total: questions.length,
        }),
      )
    ) {
      return
    }
    finishSession(testId)
    navigate(`/iq-test/${testId}/complete`)
  }

  const isLast = index === questions.length - 1
  const answeredCount = countAnswered(session.answers)

  return (
    <div className="container test-shell">
      <div className="test-topbar">
        <div>
          {t('test.question.testId')} <strong>{testId}</strong> · {session.track}
        </div>
        <div>{t('test.question.questionOf', { current: index + 1, total: questions.length })}</div>
        <div aria-live="polite">{formatElapsed(elapsed)}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
        <button type="button" className="btn btn-primary" onClick={finishNow}>
          {t('test.question.finishNow')}
        </button>
      </div>

      <div className="test-panel">
        <p className="eyebrow">{t('test.question.matrixItem')}</p>
        <h2 style={{ fontSize: '1.45rem', marginTop: '0.4rem' }}>{question.prompt}</h2>

        <div className="puzzle-stage">
          <MatrixSvg matrix={question.matrix} />
        </div>

        <div className="options-grid">
          {question.options.map((option, i) => (
            <button
              key={i}
              type="button"
              className={`option-btn ${selected === i ? 'selected' : ''}`}
              onClick={() => choose(i)}
              aria-pressed={selected === i}
            >
              <span className="option-label">{String.fromCharCode(65 + i)}</span>
              <CellSvg cell={option} size={72} />
            </button>
          ))}
        </div>

        <div className="pager">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => navigate(`/iq-test/${testId}/${index}`)}
          >
            ←
          </button>
          {questions.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${i === index ? 'current' : ''} ${session.answers[i] != null ? 'answered' : ''}`}
              onClick={() => navigate(`/iq-test/${testId}/${i + 1}`)}
            >
              {i + 1}
            </button>
          ))}
          {!isLast ? (
            <button type="button" onClick={() => navigate(`/iq-test/${testId}/${index + 2}`)}>
              →
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginLeft: '0.5rem' }}
              onClick={finishNow}
            >
              {t('test.question.finish')}
            </button>
          )}
        </div>
        <p className="muted" style={{ marginTop: '0.85rem', fontSize: '0.92rem' }}>
          {t('test.question.answeredHint', { answered: answeredCount, total: questions.length })}
        </p>
      </div>
    </div>
  )
}
