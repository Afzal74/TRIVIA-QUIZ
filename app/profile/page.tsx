"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, History, Trophy, Users, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Logo from "@/components/logo"
import BackButton from "@/components/back-button"

/**
 * ProfilePage Component
 * 
 * This component renders the user's profile page with the following features:
 * - Username customization
 * - Avatar selection using emojis
 * - Statistics display
 * - Recent activity tracking
 * - Join room functionality
 */
export default function ProfilePage() {
  // State management for user profile
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("😎")
  const router = useRouter()

  // Load saved user data from localStorage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("quizverse-username") || ""
    const savedAvatar = localStorage.getItem("quizverse-avatar-emoji") || "😎"
    setUsername(savedUsername)
    setAvatar(savedAvatar)
  }, [])

  // Handler for username changes - updates state and localStorage
  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername)
    localStorage.setItem("quizverse-username", newUsername)
  }

  // Handler for avatar changes - updates state and localStorage
  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar)
    localStorage.setItem("quizverse-avatar-emoji", newAvatar)
  }

  // Available avatar options as emojis
  const avatarOptions = ["😎", "🚀", "🔥", "🌟", "🦄", "🧠", "🎮", "🎯", "🏆"]

  // Navigation handler for joining a room
  const handleJoinRoom = () => {
    router.push("/join")
  }

  return (
    <>
      <BackButton />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo Section - Displays the QuizVerse logo */}
          <div className="flex justify-center mb-8 p-6 rounded-2xl bg-gray-900/30 backdrop-blur-md border border-gray-800/50">
            <Logo className="h-16 w-auto" useFixedColors={true} />
          </div>

          {/* Profile Header Section - Contains user info and join room button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* User Profile Display */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg text-5xl">
                  {avatar}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{username || "Guest User"}</h1>
                  <p className="text-gray-300">Quiz Enthusiast</p>
                </div>
              </div>
              
              {/* Join Room Button with Animation */}
              <motion.button
                onClick={handleJoinRoom}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-700 backdrop-blur-sm"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
                <Users className="w-5 h-5 mr-2" />
                <span>Join Room</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Profile Sections Grid - Contains avatar, username, stats, and history */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar Selection Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/40 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 shadow-lg hover:border-purple-500/50 transition-colors duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-gray-300" />
                <h2 className="text-xl font-semibold text-white">Avatar</h2>
              </div>
              {/* Avatar Options Grid */}
              <div className="flex flex-wrap gap-2">
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleAvatarChange(emoji)}
                    className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-all shadow-lg ${
                      avatar === emoji
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-110"
                        : "bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Username Input Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/40 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 shadow-lg hover:border-pink-500/50 transition-colors duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-gray-300" />
                <h2 className="text-xl font-semibold text-white">Username</h2>
              </div>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-white placeholder-gray-400"
                />
              </div>
            </motion.div>

            {/* Statistics Section - Shows user's quiz performance metrics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/40 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 shadow-lg hover:border-purple-500/50 transition-colors duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Statistics</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm transition-colors">
                  <span className="text-gray-300">Quizzes Completed</span>
                  <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">0</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm transition-colors">
                  <span className="text-gray-300">Average Score</span>
                  <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">0%</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm transition-colors">
                  <span className="text-gray-300">Total Points</span>
                  <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">0</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity Section - Shows user's quiz history */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/40 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50 shadow-lg hover:border-pink-500/50 transition-colors duration-300"
            >
              <div className="flex items-center space-x-2 mb-4">
                <History className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              </div>
              <div className="text-gray-300 text-center py-8 px-4 rounded-lg bg-gray-800/30 backdrop-blur-sm">
                No recent activity
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
