interface Question {
  id: string
  subject: string
  question: string
  options: string[]
  correctAnswer: string | string[]
  type: "single" | "multiple" | "order"
  difficulty: "easy" | "average" | "hard"
  explanation?: string
}

export const mockQuestions: Question[] = [
  // English Questions
  {
    id: "eng1",
    subject: "english",
    question: "Which of these is a correct use of the semicolon?",
    options: [
      "I love reading; it takes me to new worlds",
      "I love reading, it takes me to new worlds",
      "I love reading: it takes me to new worlds",
      "I love reading... it takes me to new worlds"
    ],
    correctAnswer: "I love reading; it takes me to new worlds",
    type: "single",
    difficulty: "average",
    explanation: "A semicolon connects two independent clauses that are closely related in meaning."
  },
  {
    id: "eng2",
    subject: "english",
    question: "Select all words that are synonyms for 'happy'",
    options: [
      "joyful",
      "elated",
      "miserable",
      "cheerful",
      "gloomy",
      "delighted"
    ],
    correctAnswer: ["joyful", "elated", "cheerful", "delighted"],
    type: "multiple",
    difficulty: "easy"
  },
  {
    id: "eng3",
    subject: "english",
    question: "Arrange these events from 'Romeo and Juliet' in chronological order",
    options: [
      "Romeo meets Juliet",
      "Tybalt kills Mercutio",
      "Romeo is banished",
      "Juliet takes the sleeping potion"
    ],
    correctAnswer: ["Romeo meets Juliet", "Tybalt kills Mercutio", "Romeo is banished", "Juliet takes the sleeping potion"],
    type: "order",
    difficulty: "hard"
  },

  // Science Questions
  {
    id: "sci1",
    subject: "science",
    question: "Which of these is NOT a type of electromagnetic radiation?",
    options: [
      "X-rays",
      "Sound waves",
      "Gamma rays",
      "Ultraviolet light"
    ],
    correctAnswer: "Sound waves",
    type: "single",
    difficulty: "average",
    explanation: "Sound waves are mechanical waves that require a medium to travel through, unlike electromagnetic radiation."
  },
  {
    id: "sci2",
    subject: "science",
    question: "Select all statements that are true about photosynthesis",
    options: [
      "It produces oxygen",
      "It requires carbon dioxide",
      "It happens at night",
      "It uses chlorophyll",
      "It releases energy in the form of heat",
      "It requires sunlight"
    ],
    correctAnswer: ["It produces oxygen", "It requires carbon dioxide", "It uses chlorophyll", "It requires sunlight"],
    type: "multiple",
    difficulty: "average"
  },
  {
    id: "sci3",
    subject: "science",
    question: "Order these planets from closest to farthest from the Sun",
    options: [
      "Earth",
      "Mercury",
      "Mars",
      "Venus"
    ],
    correctAnswer: ["Mercury", "Venus", "Earth", "Mars"],
    type: "order",
    difficulty: "easy"
  },

  // Social Studies Questions
  {
    id: "soc1",
    subject: "social",
    question: "Which event directly led to the United States entering World War II?",
    options: [
      "Attack on Pearl Harbor",
      "Invasion of Poland",
      "Battle of Britain",
      "Fall of France"
    ],
    correctAnswer: "Attack on Pearl Harbor",
    type: "single",
    difficulty: "easy",
    explanation: "The Japanese attack on Pearl Harbor on December 7, 1941, led to the US declaring war on Japan the next day."
  },
  {
    id: "soc2",
    subject: "social",
    question: "Select all ancient civilizations that built pyramids",
    options: [
      "Egyptians",
      "Maya",
      "Greeks",
      "Aztecs",
      "Romans",
      "Mesopotamians"
    ],
    correctAnswer: ["Egyptians", "Maya", "Aztecs"],
    type: "multiple",
    difficulty: "average"
  },
  {
    id: "soc3",
    subject: "social",
    question: "Order these US historical events chronologically",
    options: [
      "Declaration of Independence",
      "Louisiana Purchase",
      "Civil War",
      "World War I"
    ],
    correctAnswer: ["Declaration of Independence", "Louisiana Purchase", "Civil War", "World War I"],
    type: "order",
    difficulty: "hard"
  },

  // Computer Science Questions
  {
    id: "cs1",
    subject: "cs",
    question: "Which data structure follows the LIFO (Last In, First Out) principle?",
    options: [
      "Queue",
      "Stack",
      "Linked List",
      "Array"
    ],
    correctAnswer: "Stack",
    type: "single",
    difficulty: "easy",
    explanation: "A stack follows LIFO - the last element added is the first one to be removed."
  },
  {
    id: "cs2",
    subject: "cs",
    question: "Select all that are valid HTTP methods",
    options: [
      "GET",
      "POST",
      "SEND",
      "DELETE",
      "REMOVE",
      "PUT"
    ],
    correctAnswer: ["GET", "POST", "DELETE", "PUT"],
    type: "multiple",
    difficulty: "average"
  },
  {
    id: "cs3",
    subject: "cs",
    question: "Order these steps in the software development lifecycle",
    options: [
      "Requirements Analysis",
      "Design",
      "Implementation",
      "Testing"
    ],
    correctAnswer: ["Requirements Analysis", "Design", "Implementation", "Testing"],
    type: "order",
    difficulty: "hard"
  }
]

// Function to get random questions for a specific subject and difficulty
export function getRandomQuestions(subject: string, difficulty: string, count: number): Question[] {
  let questions = mockQuestions

  // Filter by subject if not "all"
  if (subject !== "all") {
    questions = questions.filter(q => q.subject === subject)
  }

  // Filter by difficulty if specified
  if (difficulty !== "all") {
    questions = questions.filter(q => q.difficulty === difficulty)
  }

  // Shuffle and return requested number of questions
  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
} 