// Question Types
export enum QuestionType {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  SORTABLE = "sortable"
}

// Basic Types
export type Difficulty = "easy" | "average" | "hard"
export type Subject = "all" | "english" | "science" | "social" | "cs"
export type AudioType = "click" | "correct" | "incorrect" | "timeout" | "background" | "join" | "start"

// Base Question Interface
export interface BaseQuestion {
  id: string
  type: QuestionType
  category: string
  difficulty: Difficulty
  question: string
  options: string[]
  timeLimit: number
  subject?: string
}

// Specific Question Types
export interface RadioQuestion extends BaseQuestion {
  type: QuestionType.RADIO
  correctAnswer: string
}

export interface CheckboxQuestion extends BaseQuestion {
  type: QuestionType.CHECKBOX
  correctAnswers: string[]
}

export interface SortableQuestion extends BaseQuestion {
  type: QuestionType.SORTABLE
  correctOrder: string[]
}

export type Question = RadioQuestion | CheckboxQuestion | SortableQuestion

// Game Related Types
export interface GameData {
  roomCode: string
  players: string[]
  host: string
  difficulty: Difficulty
  subject: Subject
  questionTime: number
  bots?: number
  maxRounds?: number
}

export interface ScoreBreakdown {
  base: number
  timeBonus: number
  streakBonus: number
  difficultyBonus: number
  total: number
}

export interface PlayerRanking {
  player: string
  rank: number
  score: number
}