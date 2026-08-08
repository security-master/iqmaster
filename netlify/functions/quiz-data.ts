export interface QuizItem {
  id: number;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

// Central question bank shared by the questions and score functions so the
// answer key never ships to the client.
export const QUIZ: QuizItem[] = [
  {
    id: 1,
    prompt: "Which number continues the sequence? 2, 4, 8, 16, ?",
    choices: ["18", "24", "32", "64"],
    correctIndex: 2,
    explanation: "Each term doubles the previous one, so 16 × 2 = 32.",
  },
  {
    id: 2,
    prompt: "Cat is to Kitten as Dog is to ?",
    choices: ["Cub", "Puppy", "Foal", "Calf"],
    correctIndex: 1,
    explanation: "A young dog is called a puppy.",
  },
  {
    id: 3,
    prompt: "Find the odd one out.",
    choices: ["Triangle", "Square", "Circle", "Pentagon"],
    correctIndex: 2,
    explanation: "A circle has no straight sides or vertices; the others are polygons.",
  },
  {
    id: 4,
    prompt: "If ALL Bloops are Razzies and ALL Razzies are Lazzies, then all Bloops are definitely?",
    choices: ["Lazzies", "Not Lazzies", "Sometimes Lazzies", "Cannot tell"],
    correctIndex: 0,
    explanation: "By transitivity, Bloops ⊂ Razzies ⊂ Lazzies, so all Bloops are Lazzies.",
  },
  {
    id: 5,
    prompt: "Which number completes the analogy? 3 : 9 :: 5 : ?",
    choices: ["10", "15", "20", "25"],
    correctIndex: 3,
    explanation: "The relationship is squaring: 3² = 9 and 5² = 25.",
  },
];
