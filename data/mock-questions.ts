export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  timeLimit: number; // in seconds
}

export const mockQuestions: Record<string, Question[]> = {
  english: [
    {
      id: "eng1",
      category: "english",
      question: "Which of these is a figure of speech that uses 'like' or 'as' for comparison?",
      options: ["Metaphor", "Simile", "Personification", "Alliteration"],
      correctAnswer: "Simile",
      points: 100,
      timeLimit: 20
    },
    {
      id: "eng2",
      category: "english",
      question: "What is the past participle of 'write'?",
      options: ["Wrote", "Written", "Writing", "Writed"],
      correctAnswer: "Written",
      points: 100,
      timeLimit: 20
    },
    {
      id: "eng3",
      category: "english",
      question: "Which word is an antonym of 'benevolent'?",
      options: ["Malevolent", "Generous", "Kind", "Charitable"],
      correctAnswer: "Malevolent",
      points: 100,
      timeLimit: 20
    },
    {
      id: "eng4",
      category: "english",
      question: "What type of word is 'quickly'?",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      correctAnswer: "Adverb",
      points: 100,
      timeLimit: 20
    },
    {
      id: "eng5",
      category: "english",
      question: "Which sentence is in the passive voice?",
      options: [
        "John wrote the letter",
        "The letter was written by John",
        "The letter is writing",
        "John is writing the letter"
      ],
      correctAnswer: "The letter was written by John",
      points: 200, // Double points for final round
      timeLimit: 25
    }
  ],
  science: [
    {
      id: "sci1",
      category: "science",
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au",
      points: 100,
      timeLimit: 20
    },
    {
      id: "sci2",
      category: "science",
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      points: 100,
      timeLimit: 20
    },
    {
      id: "sci3",
      category: "science",
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Brain", "Skin", "Liver"],
      correctAnswer: "Skin",
      points: 100,
      timeLimit: 20
    },
    {
      id: "sci4",
      category: "science",
      question: "What is the process by which plants make their own food?",
      options: ["Photosynthesis", "Respiration", "Digestion", "Absorption"],
      correctAnswer: "Photosynthesis",
      points: 100,
      timeLimit: 20
    },
    {
      id: "sci5",
      category: "science",
      question: "What is the speed of light in vacuum?",
      options: [
        "299,792 kilometers per second",
        "199,792 kilometers per second",
        "399,792 kilometers per second",
        "499,792 kilometers per second"
      ],
      correctAnswer: "299,792 kilometers per second",
      points: 200, // Double points for final round
      timeLimit: 25
    }
  ],
  social: [
    {
      id: "soc1",
      category: "social",
      question: "Which civilization built the pyramids of Giza?",
      options: ["Roman", "Greek", "Egyptian", "Persian"],
      correctAnswer: "Egyptian",
      points: 100,
      timeLimit: 20
    },
    {
      id: "soc2",
      category: "social",
      question: "What is the capital of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo",
      points: 100,
      timeLimit: 20
    },
    {
      id: "soc3",
      category: "social",
      question: "Who was the first President of the United States?",
      options: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
      correctAnswer: "George Washington",
      points: 100,
      timeLimit: 20
    },
    {
      id: "soc4",
      category: "social",
      question: "Which continent is the largest by land area?",
      options: ["North America", "Africa", "Asia", "Europe"],
      correctAnswer: "Asia",
      points: 100,
      timeLimit: 20
    },
    {
      id: "soc5",
      category: "social",
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
      points: 200, // Double points for final round
      timeLimit: 25
    }
  ],
  cs: [
    {
      id: "cs1",
      category: "cs",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: "Hyper Text Markup Language",
      points: 100,
      timeLimit: 20
    },
    {
      id: "cs2",
      category: "cs",
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: "Stack",
      points: 100,
      timeLimit: 20
    },
    {
      id: "cs3",
      category: "cs",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correctAnswer: "O(log n)",
      points: 100,
      timeLimit: 20
    },
    {
      id: "cs4",
      category: "cs",
      question: "Which programming paradigm does JavaScript primarily follow?",
      options: ["Procedural", "Object-Oriented", "Functional", "Multi-paradigm"],
      correctAnswer: "Multi-paradigm",
      points: 100,
      timeLimit: 20
    },
    {
      id: "cs5",
      category: "cs",
      question: "What is the purpose of a REST API?",
      options: [
        "To style web pages",
        "To handle client-server communication",
        "To manage databases",
        "To compile code"
      ],
      correctAnswer: "To handle client-server communication",
      points: 200, // Double points for final round
      timeLimit: 25
    }
  ]
}; 