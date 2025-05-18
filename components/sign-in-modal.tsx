"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"
import { UserCircle2, X, Sparkles, BookOpen, FlaskRoundIcon as Flask, Globe, Code, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const subjects = [
  { id: "english", name: "English", icon: BookOpen },
  { id: "science", name: "Science", icon: Flask },
  { id: "social", name: "Social Studies", icon: Globe },
  { id: "cs", name: "Computer Science", icon: Code },
]

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [username, setUsername] = useState("")
  const [roomCode, setRoomCode] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [error, setError] = useState("")
  const { playSound } = useAudio()
  const router = useRouter()

  useEffect(() => {
    // Load saved username if it exists
    const savedUsername = localStorage.getItem("quizverse-username")
    if (savedUsername) setUsername(savedUsername)
  }, [])

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

    // Save to localStorage
    localStorage.setItem("quizverse-username", username)
    localStorage.setItem("quizverse-subject", selectedSubject)

    playSound("click")
    
    // Navigate to the lobby
    router.push(
      `/lobby?code=${roomCode}&username=${encodeURIComponent(username)}&subject=${selectedSubject}`
    )
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-gray-900 border border-gray-800">
        <div className="relative p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-purple-400 mb-2" />
            </motion.div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Join Quiz Room
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
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
                className="bg-gray-800 border-gray-700 focus:ring-purple-500"
              />
            </div>

            {/* Room Code Input */}
            <div>
              <label htmlFor="roomCode" className="block text-sm font-medium text-gray-400 mb-2">
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
                className="bg-gray-800 border-gray-700 focus:ring-purple-500"
                maxLength={6}
              />
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Subject</label>
              <div className="grid grid-cols-2 gap-3">
                {subjects.map(({ id, name, icon: Icon }) => (
                  <motion.button
                    key={id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedSubject(id)
                      playSound("click")
                      setError("")
                    }}
                    className={`p-4 rounded-lg flex items-center space-x-3 transition-colors
                      ${selectedSubject === id
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50"
                        : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                      }`}
                  >
                    <Icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium">{name}</span>
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
        </div>
      </DialogContent>
    </Dialog>
  )
} 