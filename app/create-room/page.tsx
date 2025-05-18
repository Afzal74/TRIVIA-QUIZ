"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap, Trophy, Book, Globe, Code, Trophy as TrophyIcon, BookOpen, Beaker } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

// Mock data for players (bots)
const mockBots = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Bot${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${i}`,
}))

type Difficulty = 'easy' | 'average' | 'hard'
type Category = 'all' | 'english' | 'science' | 'social' | 'cs'

interface DifficultyConfig {
  time: number
  icon: React.ReactNode
  label: string
  class: string
}

interface CategoryConfig {
  icon: React.ReactNode
  label: string
  value: Category
  class: string
}

export default function CreateRoomPage() {
  const [playerName, setPlayerName] = useState('')
  const [numBots, setNumBots] = useState(15)
  const [numRounds] = useState(10) // Fixed at 10 questions per game
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy')
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  const difficulties: Record<Difficulty, DifficultyConfig> = {
    easy: {
      time: 30,
      icon: <Clock className="w-6 h-6" />,
      label: 'Easy',
      class: 'border-emerald-500/30 hover:border-emerald-500/50 text-emerald-500'
    },
    average: {
      time: 20,
      icon: <Zap className="w-6 h-6" />,
      label: 'Average',
      class: 'border-blue-500/30 hover:border-blue-500/50 text-blue-500'
    },
    hard: {
      time: 15,
      icon: <Trophy className="w-6 h-6" />,
      label: 'Hard',
      class: 'border-red-500/30 hover:border-red-500/50 text-red-500'
    }
  }

  const categories: CategoryConfig[] = [
    {
      icon: <TrophyIcon className="w-6 h-6" />,
      label: 'All',
      value: 'all',
      class: 'border-purple-500/30 hover:border-purple-500/50 text-purple-500'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: 'English',
      value: 'english',
      class: 'border-blue-500/30 hover:border-blue-500/50 text-blue-500'
    },
    {
      icon: <Beaker className="w-6 h-6" />,
      label: 'Science',
      value: 'science',
      class: 'border-green-500/30 hover:border-green-500/50 text-green-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: 'Social',
      value: 'social',
      class: 'border-yellow-500/30 hover:border-yellow-500/50 text-yellow-500'
    },
    {
      icon: <Code className="w-6 h-6" />,
      label: 'CS',
      value: 'cs',
      class: 'border-pink-500/30 hover:border-pink-500/50 text-pink-500'
    }
  ]

  const handleCreateRoom = () => {
    // Validate inputs
    if (!playerName.trim()) {
      alert('Please enter your name')
      return
    }

    // Create room configuration
    const roomConfig = {
      playerName,
      numBots,
      numRounds,
      difficulty: selectedDifficulty,
      timePerQuestion: difficulties[selectedDifficulty].time,
      category: selectedCategory,
      bots: mockBots.slice(0, numBots), // Only take the number of bots selected
    }

    console.log('Room Configuration:', roomConfig)
    // Here you would typically make an API call to create the room
    // For now, we'll just log the configuration
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8 text-center gradient-text">
              Create a New Quiz Room
            </h1>

            <div className="space-y-8">
              {/* Player Name */}
              <div>
                <label className="block text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              {/* Number of Bots */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Add Bots (0-15)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={numBots}
                    onChange={(e) => setNumBots(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-white">{numBots} bots will join</span>
                </div>
              </div>

              {/* Number of Rounds - Fixed at 10 */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Number of Rounds
                </label>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white">
                  10 questions per game
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Select Difficulty
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(difficulties).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDifficulty(key as Difficulty)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                        config.class
                      } ${
                        selectedDifficulty === key
                          ? 'bg-gray-800/50 border-opacity-100'
                          : 'bg-gray-800/20 border-opacity-30'
                      }`}
                    >
                      {config.icon}
                      <span className="mt-2">{config.label}</span>
                      <span className="text-sm opacity-75">
                        {config.time}s per question
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Select Category
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                        category.class
                      } ${
                        selectedCategory === category.value
                          ? 'bg-gray-800/50 border-opacity-100'
                          : 'bg-gray-800/20 border-opacity-30'
                      }`}
                    >
                      {category.icon}
                      <span className="mt-2">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Create Room Button */}
              <motion.button
                onClick={handleCreateRoom}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg font-medium text-lg transition-all duration-300"
              >
                Create Room
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
} 