import { QuestionType } from "@/types/quiz"

// Expanded questions data with subject categories
const questions = [
  // English Questions
  {
    id: "eng1",
    type: QuestionType.RADIO,
    question: "Which of these is a correct use of a semicolon?",
    options: [
      "I love reading; especially fiction novels.",
      "I love reading; I especially enjoy fiction novels.",
      "I love reading, especially; fiction novels.",
      "I love; reading especially fiction novels.",
    ],
    correctAnswer: "I love reading; I especially enjoy fiction novels.",
    category: "English",
    subject: "english",
  },
  {
    id: "eng2",
    type: QuestionType.CHECKBOX,
    question: "Which of these words are adverbs?",
    options: ["Quickly", "Beautiful", "Happily", "Green"],
    correctAnswers: ["Quickly", "Happily"],
    category: "English",
    subject: "english",
  },
  {
    id: "eng3",
    type: QuestionType.SORTABLE,
    question: "Arrange these events from Shakespeare's 'Romeo and Juliet' in chronological order",
    options: ["Romeo and Juliet marry", "Romeo meets Juliet", "Juliet fakes her death", "Romeo kills himself"],
    correctOrder: ["Romeo meets Juliet", "Romeo and Juliet marry", "Juliet fakes her death", "Romeo kills himself"],
    category: "English",
    subject: "english",
  },

  // Science Questions
  {
    id: "sci1",
    type: QuestionType.RADIO,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    category: "Science",
    subject: "science",
  },
  {
    id: "sci2",
    type: QuestionType.CHECKBOX,
    question: "Which of these are noble gases?",
    options: ["Helium", "Oxygen", "Neon", "Nitrogen"],
    correctAnswers: ["Helium", "Neon"],
    category: "Science",
    subject: "science",
  },
  {
    id: "sci3",
    type: QuestionType.SORTABLE,
    question: "Sort these planets in order from closest to farthest from the Sun",
    options: ["Earth", "Mars", "Venus", "Mercury"],
    correctOrder: ["Mercury", "Venus", "Earth", "Mars"],
    category: "Science",
    subject: "science",
  },

  // Social Studies Questions
  {
    id: "soc1",
    type: QuestionType.RADIO,
    question: "Which ancient civilization built the pyramids at Giza?",
    options: ["Romans", "Greeks", "Egyptians", "Mayans"],
    correctAnswer: "Egyptians",
    category: "History",
    subject: "social",
  },
  {
    id: "soc2",
    type: QuestionType.CHECKBOX,
    question: "Which of these countries are in Europe?",
    options: ["Egypt", "Italy", "Japan", "Spain"],
    correctAnswers: ["Italy", "Spain"],
    category: "Geography",
    subject: "social",
  },
  {
    id: "soc3",
    type: QuestionType.SORTABLE,
    question: "Arrange these historical events in chronological order",
    options: ["World War II", "Moon Landing", "Fall of the Berlin Wall", "American Revolution"],
    correctOrder: ["American Revolution", "World War II", "Moon Landing", "Fall of the Berlin Wall"],
    category: "History",
    subject: "social",
  },

  // Computer Science Questions
  {
    id: "cs1",
    type: QuestionType.RADIO,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Machine Learning",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
    category: "Technology",
    subject: "cs",
  },
  {
    id: "cs2",
    type: QuestionType.CHECKBOX,
    question: "Which of these are programming languages?",
    options: ["HTML", "Python", "Photoshop", "JavaScript"],
    correctAnswers: ["Python", "JavaScript"],
    category: "Technology",
    subject: "cs",
  },
  {
    id: "cs3",
    type: QuestionType.SORTABLE,
    question: "Arrange these programming languages by year of creation (oldest to newest)",
    options: ["Python", "JavaScript", "C", "Java"],
    correctOrder: ["C", "Java", "JavaScript", "Python"],
    category: "Technology",
    subject: "cs",
  },

  // General Knowledge Questions
  {
    id: "gen1",
    type: QuestionType.RADIO,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography",
    subject: "general",
  },
  {
    id: "gen2",
    type: QuestionType.CHECKBOX,
    question: "Which of the following are primary colors?",
    options: ["Red", "Green", "Blue", "Purple"],
    correctAnswers: ["Red", "Blue"],
    category: "Art",
    subject: "general",
  },
  {
    id: "gen3",
    type: QuestionType.SORTABLE,
    question: "Sort these movies by their release date (earliest to latest)",
    options: ["The Matrix", "Star Wars: A New Hope", "Avatar", "Jurassic Park"],
    correctOrder: ["Star Wars: A New Hope", "Jurassic Park", "The Matrix", "Avatar"],
    category: "Entertainment",
    subject: "general",
  },
]

// Function to get random questions, optionally filtered by subject
export function getRandomQuestions(count: number, subject?: string) {
  // Filter questions by subject if provided
  let filteredQuestions = [...questions]
  if (subject && subject !== "all") {
    filteredQuestions = questions.filter((q) => q.subject === subject)
  }

  // If no questions match the filter or there are fewer than requested, use all questions
  if (filteredQuestions.length < count) {
    filteredQuestions = [...questions]
  }

  // Create a copy of the questions array to avoid modifying the original
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random())

  // Return the requested number of questions, or all if count is larger than available questions
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export default questions
