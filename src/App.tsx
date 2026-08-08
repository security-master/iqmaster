import { useEffect, useState } from "react";
import type { Question, QuestionsResponse, ScoreResponse } from "./types";
import "./App.css";

type Status = "loading" | "ready" | "error";

export default function App() {
  const [status, setStatus] = useState<Status>("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = (await res.json()) as QuestionsResponse;
        if (!cancelled) {
          setQuestions(data.questions);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const select = (questionId: number, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  };

  const allAnswered =
    questions.length > 0 && questions.every((q) => q.id in answers);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = (await res.json()) as ScoreResponse;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setAnswers({});
    setResult(null);
    setError(null);
  };

  return (
    <>
      <header className="app-header">
        <h1>IQ Master</h1>
        <p>Five quick puzzles. Answers are graded by a Netlify Function.</p>
      </header>

      {status === "loading" && <p className="status">Loading questions…</p>}
      {status === "error" && (
        <p className="error">Could not load questions: {error}</p>
      )}

      {status === "ready" && !result && (
        <>
          {questions.map((q, i) => (
            <section className="card" key={q.id}>
              <p className="question-prompt">
                {i + 1}. {q.prompt}
              </p>
              <div className="choices">
                {q.choices.map((choice, idx) => {
                  const selected = answers[q.id] === idx;
                  return (
                    <label
                      key={idx}
                      className={`choice${selected ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={selected}
                        onChange={() => select(q.id, idx)}
                      />
                      {choice}
                    </label>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="actions">
            <button onClick={submit} disabled={!allAnswered || submitting}>
              {submitting ? "Scoring…" : "See my score"}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </>
      )}

      {result && (
        <>
          <section className="card result-score">
            <p>Your estimated score</p>
            <p className="iq">{result.iq}</p>
            <p>
              {result.correct} of {result.total} correct
            </p>
          </section>

          <section className="card">
            {result.details.map((d) => (
              <div
                className={`result-detail ${d.isCorrect ? "correct" : "incorrect"}`}
                key={d.id}
              >
                <strong>{d.prompt}</strong>
                <span className={`badge ${d.isCorrect ? "correct" : "incorrect"}`}>
                  {d.isCorrect ? "Correct" : "Incorrect"}
                </span>
                <p className="explanation">{d.explanation}</p>
              </div>
            ))}
          </section>

          <div className="actions">
            <button className="secondary" onClick={restart}>
              Try again
            </button>
          </div>
        </>
      )}
    </>
  );
}
