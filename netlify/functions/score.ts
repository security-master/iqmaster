import type { Config } from "@netlify/functions";
import { QUIZ } from "./quiz-data.ts";

interface ScoreBody {
  answers?: Record<string, number>;
}

// Grades submitted answers server-side and derives a light-hearted "IQ" score.
export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: ScoreBody;
  try {
    body = (await req.json()) as ScoreBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const answers = body.answers ?? {};

  const details = QUIZ.map((item) => {
    const chosenRaw = answers[String(item.id)];
    const chosen = typeof chosenRaw === "number" ? chosenRaw : null;
    const isCorrect = chosen === item.correctIndex;
    return {
      id: item.id,
      prompt: item.prompt,
      chosen,
      correctIndex: item.correctIndex,
      isCorrect,
      explanation: item.explanation,
    };
  });

  const correct = details.filter((d) => d.isCorrect).length;
  const total = QUIZ.length;

  // Map the fraction correct onto a familiar 70–145 range.
  const iq = Math.round(70 + (correct / total) * 75);

  return Response.json({ correct, total, iq, details });
};

export const config: Config = {
  path: "/api/score",
};
