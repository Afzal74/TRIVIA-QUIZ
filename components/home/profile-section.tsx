"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAudio } from "@/components/audio-provider"
import { motion } from "framer-motion"
import { Edit2, Save, Award, BarChart3, Clock, Brain, Star } from "lucide-react"

// Common emojis for avatar selection
const avatarEmojis = ["😎", "🚀", "🔥", "🌟", "🦄", "🧠", "🎮", "🎯", "🏆", "🧩", "🤖", "👾", "🦸", "🧙", "🦊", "🐱"]

// Mock achievements data
const mockAchievements = [
  { id: 1, name: "First Victory", description: "Win your first quiz game", unlocked: true },
  { id: 2, name: "Perfect Score", description: "Get all questions right in a game", unlocked: true },
  { id: 3, name: "Speed Demon", description: "Answer 5 questions in under 5 seconds each", unlocked: true },
  { id: 4, name: "Quiz Master", description: "Win 10 games", unlocked: false },
  { id: 5, name: "Knowledge Guru", description: "Play 50 games", unlocked: false },
  { id: 6, name: "Category Expert", description: "Get all questions right in a specific category", unlocked: false },
]

// Mock stats data
const mockStats = {
  gamesPlayed: 24,
  gamesWon: 14,
  totalPoints: 4250,
  averageScore: 177,
  questionsAnswered: 240,
  correctAnswers: 186,
  fastestAnswer: 1.2, // seconds
  longestStreak: 8,
}

interface ProfileSectionProps {
  username: string
  setUsername: (name: string) => void
}

export default function ProfileSection({ username, setUsername }: ProfileSectionProps) {
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(username)
  const [selectedEmoji, setSelectedEmoji] = useState("😎")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { playSound } = useAudio()

  useEffect(() => {
    // Update temp name when username prop changes
    setTempName(username)

    // Load saved emoji from localStorage
    const savedEmoji = localStorage.getItem("quizverse-avatar-emoji")
    if (savedEmoji) {
      setSelectedEmoji(savedEmoji)
    }
  }, [username])

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUsername(tempName)
      localStorage.setItem("quizverse-username", tempName)
      playSound("click")
    }
    setEditingName(false)
  }

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)
    localStorage.setItem("quizverse-avatar-emoji", emoji)
    setShowEmojiPicker(false)
    playSound("click")
  }

  // Avatar background colors
  const avatarColors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-red-500 to-orange-500",
    "from-yellow-500 to-amber-500",
    "from-indigo-500 to-violet-500",
  ]

  // Randomly select a color based on the emoji
  const colorIndex = selectedEmoji.charCodeAt(0) % avatarColors.length
  const avatarColor = avatarColors[colorIndex]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold gradient-text mb-4">Your Profile</h3>

      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-3xl cursor-pointer`}
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker)
              playSound("click")
            }}
          >
            {selectedEmoji}
          </div>
          <button
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker)
              playSound("click")
            }}
            className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute top-full mt-2 p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-48">
              <div className="grid grid-cols-4 gap-2">
                {avatarEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiSelect(emoji)}
                    className={`w-10 h-10 text-xl flex items-center justify-center rounded hover:bg-gray-700 ${
                      selectedEmoji === emoji ? "bg-gray-700" : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {editingName ? (
          <div className="flex items-center space-x-2 mb-2">
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="bg-gray-800 border-gray-700"
              maxLength={15}
            />
            <Button size="icon" onClick={handleSaveName}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-lg font-medium">{username}</h4>
            <button onClick={() => setEditingName(true)} className="text-gray-400 hover:text-white transition-colors">
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="text-sm text-gray-400">Member since May 2023</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Award className="h-4 w-4 mr-1 text-yellow-400" />
            Games Won
          </div>
          <div className="text-xl font-bold">{mockStats.gamesWon}</div>
          <div className="text-xs text-gray-500">out of {mockStats.gamesPlayed} played</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <BarChart3 className="h-4 w-4 mr-1 text-purple-400" />
            Total Score
          </div>
          <div className="text-xl font-bold">{mockStats.totalPoints}</div>
          <div className="text-xs text-gray-500">avg {mockStats.averageScore} per game</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Brain className="h-4 w-4 mr-1 text-cyan-400" />
            Correct Answers
          </div>
          <div className="text-xl font-bold">{mockStats.correctAnswers}</div>
          <div className="text-xs text-gray-500">
            {Math.round((mockStats.correctAnswers / mockStats.questionsAnswered) * 100)}% accuracy
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Clock className="h-4 w-4 mr-1 text-pink-400" />
            Fastest Answer
          </div>
          <div className="text-xl font-bold">{mockStats.fastestAnswer}s</div>
          <div className="text-xs text-gray-500">best streak: {mockStats.longestStreak}</div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3 flex items-center">
          <Award className="h-4 w-4 mr-2 text-yellow-400" />
          Achievements
        </h4>
        <div className="space-y-2">
          {mockAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ x: 2 }}
              className={`p-3 rounded-lg border ${
                achievement.unlocked ? "bg-gray-800/50 border-gray-700" : "bg-gray-900/50 border-gray-800 opacity-60"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      : "bg-gradient-to-br from-gray-600 to-gray-700"
                  }`}
                >
                  <Star className={`h-4 w-4 ${achievement.unlocked ? "text-yellow-900" : "text-gray-500"}`} />
                </div>
                <div>
                  <div className="font-medium">{achievement.name}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                </div>
                {achievement.unlocked && (
                  <div className="ml-auto">
                    <div className="text-xs px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded-full">Unlocked</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
