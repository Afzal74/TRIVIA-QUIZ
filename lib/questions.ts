interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string | string[]
  explanation?: string
  type: "single" | "multiple" | "order"
  subject: string
  difficulty: "easy" | "average" | "hard"
}

const questions: Question[] = [
  // English Questions
  {
    id: "eng1",
    question: "Which literary device is used when comparing two unlike things using 'like' or 'as'?",
    options: ["Metaphor", "Simile", "Personification", "Alliteration"],
    correctAnswer: "Simile",
    explanation: "A simile is a figure of speech that makes a comparison between two unlike things using 'like' or 'as'.",
    type: "single",
    subject: "english",
    difficulty: "easy"
  },
  {
    id: "eng2",
    question: "Identify the correct sentence:",
    options: [
      "Their going to the store.",
      "They're going to the store.",
      "There going to the store.",
      "Theyre going to the store."
    ],
    correctAnswer: "They're going to the store.",
    explanation: "'They're' is the contraction of 'they are'.",
    type: "single",
    subject: "english",
    difficulty: "easy"
  },

  // Science Questions
  {
    id: "sci1",
    question: "Which of these are planets in our solar system?",
    options: ["Mars", "Sun", "Moon", "Pluto"],
    correctAnswer: ["Mars"],
    explanation: "Mars is a planet, while the Sun is a star, the Moon is a satellite, and Pluto is now classified as a dwarf planet.",
    type: "multiple",
    subject: "science",
    difficulty: "easy"
  },
  {
    id: "sci2",
    question: "What is the process by which plants convert light energy into chemical energy?",
    options: ["Photosynthesis", "Respiration", "Fermentation", "Decomposition"],
    correctAnswer: "Photosynthesis",
    explanation: "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.",
    type: "single",
    subject: "science",
    difficulty: "average"
  },

  // Social Studies Questions
  {
    id: "soc1",
    question: "Which of these events occurred during World War II?",
    options: [
      "The Pearl Harbor Attack",
      "The American Revolution",
      "The Fall of the Berlin Wall",
      "The Industrial Revolution"
    ],
    correctAnswer: "The Pearl Harbor Attack",
    explanation: "The Pearl Harbor Attack occurred on December 7, 1941, during World War II.",
    type: "single",
    subject: "social",
    difficulty: "average"
  },
  {
    id: "soc2",
    question: "What are the three branches of the U.S. government?",
    options: ["Executive", "Legislative", "Judicial", "Municipal"],
    correctAnswer: ["Executive", "Legislative", "Judicial"],
    explanation: "The U.S. government is divided into three branches: Executive (President), Legislative (Congress), and Judicial (Supreme Court).",
    type: "multiple",
    subject: "social",
    difficulty: "average"
  },

  // Computer Science Questions
  {
    id: "cs1",
    question: "Which of these is not a programming language?",
    options: ["Java", "Python", "Microsoft", "JavaScript"],
    correctAnswer: "Microsoft",
    explanation: "Microsoft is a technology company, not a programming language. The others are all programming languages.",
    type: "single",
    subject: "cs",
    difficulty: "easy"
  },
  {
    id: "cs2",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: "Hyper Text Markup Language",
    explanation: "HTML (Hyper Text Markup Language) is the standard markup language for creating web pages.",
    type: "single",
    subject: "cs",
    difficulty: "easy"
  }
]

export const getRandomQuestions = (subject: string, count: number): Question[] => {
  let filteredQuestions = questions
  
  if (subject !== "all") {
    filteredQuestions = questions.filter(q => q.subject === subject)
  }

  // Shuffle questions
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)
  
  // Return requested number of questions or all if count is greater than available questions
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export const getQuestionsBySubject = (subject: string): Question[] => {
  return subject === "all" ? questions : questions.filter(q => q.subject === subject)
}

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id)
} 