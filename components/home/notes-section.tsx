"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Book, Code, FlaskConical, Globe, BookOpen, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const studyResources = {
  english: [
    {
      title: "Grammar and Writing",
      links: [
        { name: "Purdue OWL Writing Lab", url: "https://owl.purdue.edu/owl/purdue_owl.html" },
        { name: "Grammarly Writing Guide", url: "https://www.grammarly.com/blog/category/handbook/" },
        { name: "ThoughtCo English", url: "https://www.thoughtco.com/english-4133049" }
      ],
      notes: "Focus on: Parts of speech, sentence structure, writing styles, and common grammar rules."
    },
    {
      title: "Literature",
      links: [
        { name: "SparkNotes Literature", url: "https://www.sparknotes.com/literature/" },
        { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
        { name: "LitCharts", url: "https://www.litcharts.com/" }
      ],
      notes: "Study classic literature, poetry analysis, and literary devices."
    },
    {
      title: "Practice Exercises",
      links: [
        { name: "English Grammar Exercises", url: "https://www.perfect-english-grammar.com/grammar-exercises.html" },
        { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish/english/course/english-you-need" },
        { name: "English Club Practice", url: "https://www.englishclub.com/learn-english.htm" }
      ],
      notes: "Interactive exercises, quizzes, and practice tests for all English topics."
    }
  ],
  science: [
    {
      title: "Physics",
      links: [
        { name: "Khan Academy Physics", url: "https://www.khanacademy.org/science/physics" },
        { name: "Physics Classroom", url: "https://www.physicsclassroom.com/" },
        { name: "HyperPhysics", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/index.html" }
      ],
      notes: "Key concepts: Newton's laws, energy, waves, electricity, and magnetism."
    },
    {
      title: "Chemistry",
      links: [
        { name: "Chem LibreTexts", url: "https://chem.libretexts.org/" },
        { name: "Chemistry Stack Exchange", url: "https://chemistry.stackexchange.com/" },
        { name: "Royal Society of Chemistry", url: "https://edu.rsc.org/student" }
      ],
      notes: "Focus on: Periodic table, chemical reactions, bonding, and stoichiometry."
    },
    {
      title: "Practice Problems",
      links: [
        { name: "PhET Interactive Simulations", url: "https://phet.colorado.edu/" },
        { name: "Science Olympiad", url: "https://www.soinc.org/resources" },
        { name: "AP Science Practice", url: "https://apstudents.collegeboard.org/courses/ap-physics-1" }
      ],
      notes: "Interactive simulations, practice problems, and virtual lab experiments."
    }
  ],
  social: [
    {
      title: "History",
      links: [
        { name: "World History Encyclopedia", url: "https://www.worldhistory.org/" },
        { name: "History.com", url: "https://www.history.com/" },
        { name: "BBC History", url: "https://www.bbc.co.uk/history" }
      ],
      notes: "Study world civilizations, major events, and historical figures."
    },
    {
      title: "Geography",
      links: [
        { name: "National Geographic", url: "https://www.nationalgeographic.com/education" },
        { name: "GeoGuessr", url: "https://www.geoguessr.com/" },
        { name: "World Atlas", url: "https://www.worldatlas.com/" }
      ],
      notes: "Focus on: Countries, capitals, physical geography, and cultural geography."
    },
    {
      title: "Interactive Practice",
      links: [
        { name: "Seterra Geography Games", url: "https://www.seterra.com/" },
        { name: "iCivics", url: "https://www.icivics.org/" },
        { name: "Big History Project", url: "https://www.bighistoryproject.com/home" }
      ],
      notes: "Interactive maps, history simulations, and geography quizzes."
    }
  ],
  cs: [
    {
      title: "Programming",
      links: [
        { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
        { name: "W3Schools", url: "https://www.w3schools.com/" }
      ],
      notes: "Study programming fundamentals, algorithms, and web development."
    },
    {
      title: "Computer Science Theory",
      links: [
        { name: "CS50", url: "https://cs50.harvard.edu/x/" },
        { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
        { name: "LeetCode", url: "https://leetcode.com/" }
      ],
      notes: "Focus on: Data structures, algorithms, and computer architecture."
    },
    {
      title: "Coding Practice",
      links: [
        { name: "HackerRank", url: "https://www.hackerrank.com/" },
        { name: "CodeWars", url: "https://www.codewars.com/" },
        { name: "Project Euler", url: "https://projecteuler.net/" }
      ],
      notes: "Programming challenges, competitive coding, and algorithmic problems."
    }
  ]
}

export default function NotesSection() {
  const [selectedCategory, setSelectedCategory] = useState("english")

  return (
    <div className="p-6 glass-panel-darker rounded-xl">
      <h2 className="text-2xl font-bold mb-6 gradient-text">Study Notes & Resources</h2>

      <Tabs defaultValue="english" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-4 bg-gray-800 mb-6">
          <TabsTrigger value="english" className="tab-trigger">
            <BookOpen className="h-4 w-4 mr-2" />
            English
          </TabsTrigger>
          <TabsTrigger value="science" className="tab-trigger">
            <FlaskConical className="h-4 w-4 mr-2" />
            Science
          </TabsTrigger>
          <TabsTrigger value="social" className="tab-trigger">
            <Globe className="h-4 w-4 mr-2" />
            Social
          </TabsTrigger>
          <TabsTrigger value="cs" className="tab-trigger">
            <Code className="h-4 w-4 mr-2" />
            CS
          </TabsTrigger>
        </TabsList>

        {Object.entries(studyResources).map(([category, topics]) => (
          <TabsContent key={category} value={category} className="space-y-6 tab-content">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-panel p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Book className="h-5 w-5 mr-2 text-purple-400" />
                  {topic.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">{topic.notes}</p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-300 mb-2">Recommended Resources:</div>
                  {topic.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 