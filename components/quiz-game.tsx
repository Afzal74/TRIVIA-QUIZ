"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { mockQuestions } from "@/data/mock-questions"
import QuizLeaderboard from "./quiz-leaderboard"

interface Player {
  id: string
  name: string
  score: number
  lastAnswerCorrect?: boolean
  lastAnswerTime?: number
}

interface QuizGameProps {
  players: Player[]
  category: string
  difficulty: string
  onGameEnd?: () => void
}

export default function QuizGame({ players: initialPlayers, category, difficulty, onGameEnd }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [players, setPlayers] = useState(initialPlayers)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)

  const questions = category === "all" 
    ? Object.values(mockQuestions).flat()
    : mockQuestions[category] || []

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isFinalRound = currentQuestionIndex === questions.length - 1

  useEffect(() => {
    if (answerSubmitted) {
      const timer = setTimeout(() => {
        setShowLeaderboard(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [answerSubmitted])

  const handleAnswerSelect = (answer: string) => {
    if (answerSubmitted) return
    
    setSelectedAnswer(answer)
    setAnswerSubmitted(true)

    // Simulate other players answering
    const updatedPlayers = players.map(player => {
      if (player.id === "user") {
        return {
          ...player,
          score: player.score + (answer === currentQuestion.correctAnswer ? 
            (isFinalRound ? 200 : 100) : 0),
          lastAnswerCorrect: answer === currentQuestion.correctAnswer,
          lastAnswerTime: Date.now()
        }
      }
      // Simulate other players' answers
      const correct = Math.random() > 0.5
      const answerTime = Date.now() + Math.random() * 2000
      return {
        ...player,
        score: player.score + (correct ? (isFinalRound ? 200 : 100) : 0),
        lastAnswerCorrect: correct,
        lastAnswerTime: answerTime
      }
    })

    setPlayers(updatedPlayers)
  }

  const handleContinue = () => {
    if (isLastQuestion) {
      setGameEnded(true)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setShowLeaderboard(false)
      setSelectedAnswer(null)
      setAnswerSubmitted(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {showLeaderboard ? (
          <QuizLeaderboard
            key="leaderboard"
            players={players}
            isFinalLeaderboard={gameEnded}
            onContinue={gameEnded ? onGameEnd : handleContinue}
          />
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel-darker p-6 rounded-xl"
          >
            {/* Question Counter */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              {isFinalRound && (
                <span className="text-sm text-purple-400 font-medium">
                  Final Round - Double Points!
                </span>
              )}
            </div>

            {/* Question */}
            <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={answerSubmitted}
                  className={`glass-panel-hover p-4 text-left rounded-lg transition-colors
                    ${answerSubmitted && option === currentQuestion.correctAnswer
                      ? "border-green-500/50 bg-green-500/10"
                      : answerSubmitted && option === selectedAnswer
                      ? "border-red-500/50 bg-red-500/10"
                      : ""
                    }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-medium">{option}</span>
                </motion.button>
              ))}
            </div>

            {/* Timer Bar */}
            {!answerSubmitted && (
              <motion.div
                className="mt-6 h-1 bg-gray-700 rounded-full overflow-hidden"
                initial={{ width: "100%" }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{
                    duration: currentQuestion.timeLimit,
                    ease: "linear"
                  }}
                  onAnimationComplete={() => {
                    if (!answerSubmitted) {
                      handleAnswerSelect("")
                    }
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
