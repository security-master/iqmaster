export interface Question {
  id: number;
  prompt: string;
  choices: string[];
}

export interface QuestionsResponse {
  questions: Question[];
}

export interface ScoreRequest {
  answers: Record<number, number>;
}

export interface ScoreResponse {
  correct: number;
  total: number;
  iq: number;
  details: {
    id: number;
    prompt: string;
    chosen: number | null;
    correctIndex: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}
