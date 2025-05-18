"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { useAudio } from "@/components/audio-provider"
import { Clock, Zap, AlertTriangle, Trophy, BookOpen, FlaskRoundIcon as Flask, Globe, Code, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import { generateRoomCode } from "@/lib/utils"

interface DifficultyOption {
  id: "easy" | "average" | "hard"
  label: string
  time: string
  icon: React.ReactNode
  className: string
}

interface CategoryOption {
  id: string
  label: string
  icon: React.ReactNode
  className: string
}

const difficulties: DifficultyOption[] = [
  {
    id: "easy",
    label: "Easy",
    time: "30s / question",
    icon: <Clock className="h-5 w-5" />,
    className: "border-green-500/20 hover:bg-green-500/10 [&.selected]:bg-green-500/20"
  },
  {
    id: "average",
    label: "Average",
    time: "20s / question",
    icon: <Zap className="h-5 w-5" />,
    className: "border-yellow-500/20 hover:bg-yellow-500/10 [&.selected]:bg-yellow-500/20"
  },
  {
    id: "hard",
    label: "Hard",
    time: "15s / question",
    icon: <AlertTriangle className="h-5 w-5" />,
    className: "border-red-500/20 hover:bg-red-500/10 [&.selected]:bg-red-500/20"
  }
]

const categories: CategoryOption[] = [
  {
    id: "all",
    label: "All",
    icon: <Trophy className="h-5 w-5" />,
    className: "border-purple-500/20 hover:bg-purple-500/10 [&.selected]:bg-purple-500/20"
  },
  {
    id: "english",
    label: "English",
    icon: <BookOpen className="h-5 w-5" />,
    className: "border-blue-500/20 hover:bg-blue-500/10 [&.selected]:bg-blue-500/20"
  },
  {
    id: "science",
    label: "Science",
    icon: <Flask className="h-5 w-5" />,
    className: "border-green-500/20 hover:bg-green-500/10 [&.selected]:bg-green-500/20"
  },
  {
    id: "social",
    label: "Social",
    icon: <Globe className="h-5 w-5" />,
    className: "border-yellow-500/20 hover:bg-yellow-500/10 [&.selected]:bg-yellow-500/20"
  },
  {
    id: "cs",
    label: "CS",
    icon: <Code className="h-5 w-5" />,
    className: "border-cyan-500/20 hover:bg-cyan-500/10 [&.selected]:bg-cyan-500/20"
  }
]

export default function CreateRoomForm() {
  const [username, setUsername] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "average" | "hard">("average")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [error, setError] = useState("")
  const { playSound } = useAudio()
  const router = useRouter()

  const handleCreateRoom = () => {
    if (!username.trim()) {
      setError("Please enter your name")
      playSound("error")
      return
    }

    // Generate room code
    const roomCode = generateRoomCode()
    console.log("Generated room code:", roomCode)

    // Save to localStorage
    localStorage.setItem("quizverse-username", username)
    localStorage.setItem("quizverse-subject", selectedCategory)

    // Prepare URL parameters
    const params = new URLSearchParams({
      username: username,
      subject: selectedCategory,
      difficulty: selectedDifficulty
    })

    console.log("Navigation URL:", `/game/${roomCode}?${params.toString()}`)

    playSound("click")
    
    // Navigate directly to the game using the dynamic route
    router.push(`/game/${roomCode}?${params.toString()}`)
  }

  return (
    <div className="glass-form space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Create a New Quiz Room</h2>
        <p className="text-gray-300">Set up your room and invite friends to join!</p>
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
          Your Name
        </label>
        <Input
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError("")
          }}
          placeholder="Enter your name"
          className="glass-input text-white placeholder-gray-400"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      {/* Difficulty Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Difficulty
        </label>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map(({ id, label, time, icon, className }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedDifficulty(id)
                playSound("click")
              }}
              className={`glass-panel-hover p-4 rounded-lg flex flex-col items-center text-center
                ${className} ${selectedDifficulty === id ? "selected shadow-lg" : ""}`}
            >
              {icon}
              <span className="mt-1 font-medium text-white">{label}</span>
              <span className="text-xs text-gray-300 mt-1">{time}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Category
        </label>
        <div className="grid grid-cols-3 gap-3">
          {categories.map(({ id, label, icon, className }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory(id)
                playSound("click")
              }}
              className={`glass-panel-hover p-4 rounded-lg flex flex-col items-center text-center
                ${className} ${selectedCategory === id ? "selected" : ""}`}
            >
              {icon}
              <span className="mt-1 font-medium text-white">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Create Button */}
      <motion.button
        onClick={handleCreateRoom}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
          text-white font-medium py-4 px-8 rounded-lg flex items-center justify-center space-x-3 glass-button"
      >
        <GraduationCap className="h-5 w-5" />
        <span>Start Quiz</span>
      </motion.button>
    </div>
  )
} 