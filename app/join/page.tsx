"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAudio } from "@/components/audio-provider"
import { Clock, Zap, AlertTriangle } from "lucide-react"
import { joinRoom, validateRoom } from "@/lib/room-validation"

interface DifficultyOption {
  id: "easy" | "average" | "hard"
  label: string
  time: string
  icon: React.ReactNode
  className: string
}

const difficulties: DifficultyOption[] = [
  {
    id: "easy",
    label: "Easy",
    time: "30s per question",
    icon: <Clock className="h-5 w-5" />,
    className: "border-green-500/20 hover:bg-green-500/10 [&.selected]:bg-green-500/20"
  },
  {
    id: "average",
    label: "Average",
    time: "20s per question",
    icon: <Zap className="h-5 w-5" />,
    className: "border-yellow-500/20 hover:bg-yellow-500/10 [&.selected]:bg-yellow-500/20"
  },
  {
    id: "hard",
    label: "Hard",
    time: "15s per question",
    icon: <AlertTriangle className="h-5 w-5" />,
    className: "border-red-500/20 hover:bg-red-500/10 [&.selected]:bg-red-500/20"
  }
]

export default function JoinPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { playSound } = useAudio()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    roomCode: "",
    username: "",
    difficulty: "average" as "easy" | "average" | "hard"
  })
  const [error, setError] = useState("")

  // Load saved username if exists
  useEffect(() => {
    const savedUsername = localStorage.getItem("quizverse-username")
    if (savedUsername) {
      setFormData(prev => ({ ...prev, username: savedUsername }))
    }
  }, [])

  const validateForm = (): boolean => {
    // Room code validation (6 characters, alphanumeric)
    if (!/^[A-Z0-9]{6}$/.test(formData.roomCode)) {
      setError("Room code must be 6 alphanumeric characters")
      playSound("error")
      return false
    }

    // Username validation (3-20 characters, alphanumeric and spaces)
    if (!/^[A-Za-z0-9\s]{3,20}$/.test(formData.username.trim())) {
      setError("Username must be 3-20 characters (letters, numbers, spaces)")
      playSound("error")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    playSound("click")

    try {
      // First validate if the room exists and is active
      if (!validateRoom(formData.roomCode)) {
        throw new Error("Room not found or no longer active")
      }

      // Try to join the room
      const room = joinRoom(formData.roomCode, formData.username)
      
      if (!room) {
        throw new Error("Failed to join room. It might be full or you're already in it.")
      }

      // Store username in localStorage
      localStorage.setItem("quizverse-username", formData.username)

      // Show success toast
      toast({
        title: "Room joined!",
        description: `Joined room with ${room.players.length} players`,
        duration: 2000,
      })

      // Navigate to lobby
      router.push(
        `/lobby?code=${formData.roomCode}&username=${encodeURIComponent(formData.username)}&difficulty=${formData.difficulty}`
      )
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Failed to join room. Please try again.")
      }
      playSound("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-md mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-lg p-6 space-y-6"
        >
          <div>
            <h1 className="text-2xl font-bold mb-2">Join Quiz Room</h1>
            <p className="text-gray-300">Enter the room details to join a quiz session</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="roomCode">Room Code</Label>
              <Input
                id="roomCode"
                name="roomCode"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                value={formData.roomCode}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase()
                  setFormData(prev => ({ ...prev, roomCode: value }))
                  setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSubmit(e as any)
                  }
                }}
                placeholder="Enter 6-digit code"
                maxLength={6}
                autoComplete="off"
                aria-label="Room Code"
                className="w-full h-10 px-3 py-2 text-sm text-white bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                  font-mono uppercase tracking-wider disabled:opacity-50 disabled:cursor-default cursor-default
                  placeholder-gray-400"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, username: e.target.value }))
                  setError("")
                }}
                placeholder="Enter your username"
                autoComplete="off"
                aria-label="Username"
                className="w-full h-10 px-3 py-2 text-sm text-white bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                  disabled:opacity-50 disabled:cursor-default
                  placeholder-gray-400"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, difficulty: diff.id }))
                      playSound("click")
                    }}
                    className={`p-3 rounded-lg border backdrop-blur-sm flex flex-col items-center justify-center transition-all ${
                      diff.className
                    } ${formData.difficulty === diff.id ? "selected shadow-lg" : ""}`}
                  >
                    {diff.icon}
                    <span className="text-sm font-medium mt-1 text-white">{diff.label}</span>
                    <span className="text-xs text-gray-300">{diff.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center bg-red-900/20 backdrop-blur-sm py-2 px-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 backdrop-blur-sm shadow-lg"
            >
              {isLoading ? "Joining..." : "Join Quiz"}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  )
} 