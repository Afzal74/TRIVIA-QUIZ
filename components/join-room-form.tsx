"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { useAudio } from "@/components/audio-provider"
import { BookOpen, FlaskRoundIcon as Flask, Globe, Code, Trophy, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface CategoryOption {
  id: string
  label: string
  icon: React.ReactNode
  className: string
}

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

export default function JoinRoomForm() {
  const [username, setUsername] = useState("")
  const [roomCode, setRoomCode] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [error, setError] = useState("")
  const { playSound } = useAudio()
  const router = useRouter()

  const handleJoinRoom = () => {
    if (!username.trim()) {
      setError("Please enter your name")
      playSound("error")
      return
    }

    if (!roomCode.trim()) {
      setError("Please enter a room code")
      playSound("error")
      return
    }

    if (roomCode.length !== 6) {
      setError("Room code must be 6 characters")
      playSound("error")
      return
    }

    // Save to localStorage
    localStorage.setItem("quizverse-username", username)
    localStorage.setItem("quizverse-subject", selectedCategory)

    playSound("click")
    
    // Navigate to the lobby
    router.push(
      `/lobby?code=${roomCode}&username=${encodeURIComponent(username)}&subject=${selectedCategory}`
    )
  }

  return (
    <div className="w-full max-w-lg space-y-6 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Join Quiz Room</h2>
        <p className="text-gray-400">Enter room details to join your friends!</p>
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
          className="bg-gray-800/50 border-gray-700 focus:ring-purple-500"
        />
      </div>

      {/* Room Code Input */}
      <div>
        <label htmlFor="roomCode" className="block text-sm font-medium text-gray-300 mb-2">
          Room Code
        </label>
        <Input
          id="roomCode"
          value={roomCode}
          onChange={(e) => {
            setRoomCode(e.target.value.toUpperCase())
            setError("")
          }}
          placeholder="Enter 6-digit code"
          className="bg-gray-800/50 border-gray-700 focus:ring-purple-500 font-mono tracking-wider uppercase"
          maxLength={6}
        />
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
              className={`p-4 rounded-lg border flex flex-col items-center text-center transition-colors
                ${className} ${selectedCategory === id ? "selected" : ""}`}
            >
              {icon}
              <span className="mt-1 font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {/* Join Button */}
      <motion.button
        onClick={handleJoinRoom}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
          text-white font-medium py-4 px-8 rounded-lg flex items-center justify-center space-x-3"
      >
        <ArrowRight className="h-5 w-5" />
        <span>Join Room</span>
      </motion.button>
    </div>
  )
} 