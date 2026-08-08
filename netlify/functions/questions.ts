import type { Config } from "@netlify/functions";
import { QUIZ } from "./quiz-data.ts";

// Returns the quiz without the answer key so clients cannot cheat.
export default async (): Promise<Response> => {
  const questions = QUIZ.map(({ id, prompt, choices }) => ({
    id,
    prompt,
    choices,
  }));

  return Response.json(
    { questions },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
};

export const config: Config = {
  path: "/api/questions",
};
