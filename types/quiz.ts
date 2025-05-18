export enum QuestionType {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  SORTABLE = "sortable",
}

export interface BaseQuestion {
  id: string
  type: QuestionType
  question: string
  category: string
}

export interface RadioQuestion extends BaseQuestion {
  type: QuestionType.RADIO
  options: string[]
  correctAnswer: string
}

export interface CheckboxQuestion extends BaseQuestion {
  type: QuestionType.CHECKBOX
  options: string[]
  correctAnswers: string[]
}

export interface SortableQuestion extends BaseQuestion {
  type: QuestionType.SORTABLE
  options: string[]
  correctOrder: string[]
}

export type Question = RadioQuestion | CheckboxQuestion | SortableQuestion
