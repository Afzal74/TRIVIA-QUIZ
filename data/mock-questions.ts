export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  timeLimit: number; // in seconds
  explanation?: string; // Optional explanation for the correct answer
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
      timeLimit: 20,
      explanation: "A simile is a figure of speech that makes a comparison between two unlike things using 'like' or 'as'. For example: 'He runs like the wind' or 'She is as graceful as a swan'."
    },
    {
      id: "eng2",
      category: "english",
      question: "What is the past participle of 'write'?",
      options: ["Wrote", "Written", "Writing", "Writed"],
      correctAnswer: "Written",
      points: 100,
      timeLimit: 20,
      explanation: "The past participle of 'write' is 'written'. It's used in perfect tenses (e.g., 'I have written') and passive voice (e.g., 'The letter was written')."
    },
    {
      id: "eng3",
      category: "english",
      question: "Which word is an antonym of 'benevolent'?",
      options: ["Malevolent", "Generous", "Kind", "Charitable"],
      correctAnswer: "Malevolent",
      points: 100,
      timeLimit: 20,
      explanation: "'Malevolent' means having or showing a wish to do evil to others, which is the opposite of 'benevolent' (kind and generous)."
    },
    {
      id: "eng4",
      category: "english",
      question: "What type of word is 'quickly'?",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      correctAnswer: "Adverb",
      points: 100,
      timeLimit: 20,
      explanation: "'Quickly' is an adverb because it describes how an action is performed. Adverbs often end in '-ly' and modify verbs, adjectives, or other adverbs."
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
      points: 200,
      timeLimit: 25,
      explanation: "In passive voice, the subject receives the action. The sentence 'The letter was written by John' is passive because the letter (subject) receives the action of being written."
    }
  ],
  science: [
    {
      id: "sci1",
      category: "science",
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: "Au",
      points: 100,
      timeLimit: 20,
      explanation: "The chemical symbol for gold is 'Au', which comes from the Latin word for gold, 'aurum'."
    },
    {
      id: "sci2",
      category: "science",
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      points: 100,
      timeLimit: 20,
      explanation: "Mars is called the Red Planet because of its reddish appearance, caused by iron oxide (rust) on its surface."
    },
    {
      id: "sci3",
      category: "science",
      question: "What is the process by which plants make their own food?",
      options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"],
      correctAnswer: "Photosynthesis",
      points: 100,
      timeLimit: 20,
      explanation: "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create glucose (food) and oxygen."
    },
    {
      id: "sci4",
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
        "Hyper Transfer Markup Logic",
        "Home Tool Markup Language"
      ],
      correctAnswer: "Hyper Text Markup Language",
      points: 100,
      timeLimit: 20,
      explanation: "HTML (Hyper Text Markup Language) is the standard markup language for creating web pages. It describes the structure of web pages using markup."
    },
    {
      id: "cs2",
      category: "cs",
      question: "Which of these is not a programming language?",
      options: ["Python", "Java", "Chrome", "JavaScript"],
      correctAnswer: "Chrome",
      points: 100,
      timeLimit: 20,
      explanation: "Chrome is a web browser developed by Google, not a programming language. Python, Java, and JavaScript are all programming languages."
    },
    {
      id: "cs3",
      category: "cs",
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Program Utility",
        "Computer Processing Unit"
      ],
      correctAnswer: "Central Processing Unit",
      points: 100,
      timeLimit: 20,
      explanation: "CPU stands for Central Processing Unit. It's the primary component of a computer that processes instructions from hardware and software."
    },
    {
      id: "cs4",
      category: "cs",
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: "Stack",
      points: 100,
      timeLimit: 20,
      explanation: "A Stack follows Last In First Out (LIFO) principle, meaning the last element added is the first one to be removed."
    },
    {
      id: "cs5",
      category: "cs",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correctAnswer: "O(log n)",
      points: 100,
      timeLimit: 20,
      explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each iteration."
    },
    {
      id: "cs6",
      category: "cs",
      question: "Which programming paradigm does JavaScript primarily follow?",
      options: ["Procedural", "Object-Oriented", "Functional", "Multi-paradigm"],
      correctAnswer: "Multi-paradigm",
      points: 100,
      timeLimit: 20,
      explanation: "JavaScript is a multi-paradigm language, supporting procedural, object-oriented, and functional programming styles."
    },
    {
      id: "cs7",
      category: "cs",
      question: "What is the purpose of a REST API?",
      options: [
        "To style web pages",
        "To handle client-server communication",
        "To manage databases",
        "To compile code"
      ],
      correctAnswer: "To handle client-server communication",
      points: 100,
      timeLimit: 20,
      explanation: "REST APIs enable client-server communication through HTTP methods, allowing different systems to interact with each other."
    },
    {
      id: "cs8",
      category: "cs",
      question: "What is Git primarily used for?",
      options: [
        "Version Control",
        "Web Hosting",
        "Database Management",
        "Code Compilation"
      ],
      correctAnswer: "Version Control",
      points: 100,
      timeLimit: 20,
      explanation: "Git is a distributed version control system used to track changes in source code during software development."
    },
    {
      id: "cs9",
      category: "cs",
      question: "Which of these is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correctAnswer: "MongoDB",
      points: 100,
      timeLimit: 20,
      explanation: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, unlike traditional relational databases."
    },
    {
      id: "cs10",
      category: "cs",
      question: "What is the primary function of an API?",
      options: [
        "To create user interfaces",
        "To define how software components interact",
        "To store data",
        "To compile code"
      ],
      correctAnswer: "To define how software components interact",
      points: 200,
      timeLimit: 25,
      explanation: "An API (Application Programming Interface) defines the methods and data formats that software components should use to communicate with each other."
    }
  ]
}; 