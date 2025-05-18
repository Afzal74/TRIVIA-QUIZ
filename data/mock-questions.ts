export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'reorder';
  category: string;
  difficulty: 'easy' | 'average' | 'hard';
  question: string;
  options: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export const mockQuestions: Record<string, Question[]> = {
  english: [
    {
      id: "eng1",
      type: "single",
      category: "english",
      difficulty: "easy",
      question: "Which of these is a proper noun?",
      options: ["London", "city", "building", "street"],
      correctAnswer: "London",
      explanation: "London is a proper noun as it names a specific city."
    },
    {
      id: "eng2",
      type: "single",
      category: "english",
      difficulty: "average",
      question: "What is the past participle of 'write'?",
      options: ["Wrote", "Written", "Writing", "Writed"],
      correctAnswer: "Written",
      explanation: "The past participle of 'write' is 'written'. It's used in perfect tenses (e.g., 'I have written') and passive voice (e.g., 'The letter was written')."
    },
    {
      id: "eng3",
      type: "single",
      category: "english",
      difficulty: "hard",
      question: "Which word is an antonym of 'benevolent'?",
      options: ["Malevolent", "Generous", "Kind", "Charitable"],
      correctAnswer: "Malevolent",
      explanation: "'Malevolent' means having or showing a wish to do evil to others, which is the opposite of 'benevolent' (kind and generous)."
    },
    {
      id: "eng4",
      type: "single",
      category: "english",
      difficulty: "easy",
      question: "What type of word is 'quickly'?",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      correctAnswer: "Adverb",
      explanation: "'Quickly' is an adverb because it describes how an action is performed. Adverbs often end in '-ly' and modify verbs, adjectives, or other adverbs."
    },
    {
      id: "eng5",
      type: "single",
      category: "english",
      difficulty: "average",
      question: "Which sentence is in the passive voice?",
      options: [
        "John wrote the letter",
        "The letter was written by John",
        "The letter is writing",
        "John is writing the letter"
      ],
      correctAnswer: "The letter was written by John",
      explanation: "In passive voice, the subject receives the action. The sentence 'The letter was written by John' is passive because the letter (subject) receives the action of being written."
    }
  ],
  science: [
    {
      id: "sci1",
      type: "single",
      category: "science",
      difficulty: "easy",
      question: "What is the closest planet to the Sun?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      correctAnswer: "Mercury",
      explanation: "Mercury is the first planet from the Sun and the smallest planet in our solar system."
    },
    {
      id: "sci2",
      type: "single",
      category: "science",
      difficulty: "average",
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      explanation: "Mars is called the Red Planet because of its reddish appearance, caused by iron oxide (rust) on its surface."
    },
    {
      id: "sci3",
      type: "single",
      category: "science",
      difficulty: "hard",
      question: "What is the process by which plants make their own food?",
      options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"],
      correctAnswer: "Photosynthesis",
      explanation: "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create glucose (food) and oxygen."
    },
    {
      id: "sci4",
      type: "single",
      category: "science",
      difficulty: "average",
      question: "What is the speed of light in vacuum?",
      options: [
        "299,792 kilometers per second",
        "199,792 kilometers per second",
        "399,792 kilometers per second",
        "499,792 kilometers per second"
      ],
      correctAnswer: "299,792 kilometers per second",
      explanation: "The speed of light in vacuum is approximately 299,792 kilometers per second."
    }
  ],
  social: [
    {
      id: "soc1",
      type: "single",
      category: "social",
      difficulty: "easy",
      question: "Which continent is the largest by land area?",
      options: ["Asia", "Africa", "North America", "Europe"],
      correctAnswer: "Asia",
      explanation: "Asia is the largest continent by land area, covering approximately 44.5 million square kilometers."
    },
    {
      id: "soc2",
      type: "single",
      category: "social",
      difficulty: "average",
      question: "What is the capital of Japan?",
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo",
      explanation: "Tokyo is the capital city of Japan."
    },
    {
      id: "soc3",
      type: "single",
      category: "social",
      difficulty: "hard",
      question: "Who was the first President of the United States?",
      options: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
      correctAnswer: "George Washington",
      explanation: "George Washington was the first President of the United States."
    },
    {
      id: "soc4",
      type: "single",
      category: "social",
      difficulty: "average",
      question: "Which continent is the largest by land area?",
      options: ["Asia", "Africa", "North America", "Europe"],
      correctAnswer: "Asia",
      explanation: "Asia is the largest continent by land area, covering approximately 44.5 million square kilometers."
    },
    {
      id: "soc5",
      type: "single",
      category: "social",
      difficulty: "hard",
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
      explanation: "Leonardo da Vinci is the artist who painted the Mona Lisa."
    }
  ],
  cs: [
    {
      id: "cs1",
      type: "single",
      category: "cs",
      difficulty: "easy",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Logic",
        "Home Tool Markup Language"
      ],
      correctAnswer: "Hyper Text Markup Language",
      explanation: "HTML (Hyper Text Markup Language) is the standard markup language for creating web pages."
    },
    {
      id: "cs2",
      type: "single",
      category: "cs",
      difficulty: "average",
      question: "Which of these is not a programming language?",
      options: ["Python", "Java", "Chrome", "JavaScript"],
      correctAnswer: "Chrome",
      explanation: "Chrome is a web browser developed by Google, not a programming language. Python, Java, and JavaScript are all programming languages."
    },
    {
      id: "cs3",
      type: "single",
      category: "cs",
      difficulty: "hard",
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Program Utility",
        "Computer Processing Unit"
      ],
      correctAnswer: "Central Processing Unit",
      explanation: "CPU stands for Central Processing Unit. It's the primary component of a computer that processes instructions from hardware and software."
    },
    {
      id: "cs4",
      type: "single",
      category: "cs",
      difficulty: "easy",
      question: "Which data structure follows the LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: "Stack",
      explanation: "A Stack follows Last In First Out (LIFO) principle, meaning the last element added is the first one to be removed."
    },
    {
      id: "cs5",
      type: "single",
      category: "cs",
      difficulty: "average",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correctAnswer: "O(log n)",
      explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each iteration."
    },
    {
      id: "cs6",
      type: "single",
      category: "cs",
      difficulty: "hard",
      question: "Which programming paradigm does JavaScript primarily follow?",
      options: ["Procedural", "Object-Oriented", "Functional", "Multi-paradigm"],
      correctAnswer: "Multi-paradigm",
      explanation: "JavaScript is a multi-paradigm language, supporting procedural, object-oriented, and functional programming styles."
    },
    {
      id: "cs7",
      type: "single",
      category: "cs",
      difficulty: "easy",
      question: "What is the purpose of a REST API?",
      options: [
        "To style web pages",
        "To handle client-server communication",
        "To manage databases",
        "To compile code"
      ],
      correctAnswer: "To handle client-server communication",
      explanation: "REST APIs enable client-server communication through HTTP methods, allowing different systems to interact with each other."
    },
    {
      id: "cs8",
      type: "single",
      category: "cs",
      difficulty: "average",
      question: "What is Git primarily used for?",
      options: [
        "Version Control",
        "Web Hosting",
        "Database Management",
        "Code Compilation"
      ],
      correctAnswer: "Version Control",
      explanation: "Git is a distributed version control system used to track changes in source code during software development."
    },
    {
      id: "cs9",
      type: "single",
      category: "cs",
      difficulty: "hard",
      question: "Which of these is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correctAnswer: "MongoDB",
      explanation: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, unlike traditional relational databases."
    },
    {
      id: "cs10",
      type: "single",
      category: "cs",
      difficulty: "average",
      question: "What is the primary function of an API?",
      options: [
        "To create user interfaces",
        "To define how software components interact",
        "To store data",
        "To compile code"
      ],
      correctAnswer: "To define how software components interact",
      explanation: "An API (Application Programming Interface) defines the methods and data formats that software components should use to communicate with each other."
    }
  ]
};

// Ensure each category has at least 10 questions
Object.keys(mockQuestions).forEach(category => {
  if (mockQuestions[category].length < 10) {
    const baseQuestions = [...mockQuestions[category]];
    while (mockQuestions[category].length < 10) {
      const question = { ...baseQuestions[mockQuestions[category].length % baseQuestions.length] };
      question.id = `${question.id}_${mockQuestions[category].length}`;
      mockQuestions[category].push(question);
    }
  }
}); 