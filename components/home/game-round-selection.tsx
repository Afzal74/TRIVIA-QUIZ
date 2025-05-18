"use client"

import { motion } from "framer-motion"
import { useAudio } from "@/components/audio-provider"
import { Clock, Zap, Brain } from "lucide-react"

interface GameRoundSelectionProps {
  selectedDifficulty: "easy" | "average" | "hard"
  onSelect: (difficulty: "easy" | "average" | "hard") => void
}

export default function GameRoundSelection({ selectedDifficulty, onSelect }: GameRoundSelectionProps) {
  const { playSound } = useAudio()

  const handleSelect = (difficulty: "easy" | "average" | "hard") => {
    playSound("click")
    onSelect(difficulty)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300 mb-1">Select Difficulty</label>
      <div className="grid grid-cols-3 gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect("easy")}
          className={`relative p-3 rounded-lg border ${
            selectedDifficulty === "easy"
              ? "border-green-500 bg-green-900/20"
              : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
          } transition-all flex flex-col items-center`}
        >
          <Clock className="h-5 w-5 mb-1 text-green-400" />
          <span className="font-medium">Easy</span>
          <span className="text-xs text-gray-400 mt-1">30s / question</span>
          {selectedDifficulty === "easy" && (
            <motion.div
              layoutId="difficulty-indicator"
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-green-500 rounded-t"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect("average")}
          className={`relative p-3 rounded-lg border ${
            selectedDifficulty === "average"
              ? "border-yellow-500 bg-yellow-900/20"
              : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
          } transition-all flex flex-col items-center`}
        >
          <Zap className="h-5 w-5 mb-1 text-yellow-400" />
          <span className="font-medium">Average</span>
          <span className="text-xs text-gray-400 mt-1">20s / question</span>
          {selectedDifficulty === "average" && (
            <motion.div
              layoutId="difficulty-indicator"
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-yellow-500 rounded-t"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect("hard")}
          className={`relative p-3 rounded-lg border ${
            selectedDifficulty === "hard"
              ? "border-red-500 bg-red-900/20"
              : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
          } transition-all flex flex-col items-center`}
        >
          <Brain className="h-5 w-5 mb-1 text-red-400" />
          <span className="font-medium">Hard</span>
          <span className="text-xs text-gray-400 mt-1">15s / question</span>
          {selectedDifficulty === "hard" && (
            <motion.div
              layoutId="difficulty-indicator"
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-red-500 rounded-t"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      </div>
    </div>
  )
}
