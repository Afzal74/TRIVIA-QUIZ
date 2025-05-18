"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Timer, CheckCircle2, XCircle, AlertCircle, Award } from "lucide-react"
import { useAudio } from "@/components/audio-provider"
import { getRandomQuestions } from "@/lib/questions"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string | string[]
  explanation?: string
  type: "single" | "multiple" | "order"
  subject: string
  difficulty: "easy" | "average" | "hard"
}

export default function PracticePage() {
  const searchParams = useSearchParams()
  const subject = searchParams.get("subject") || "all"
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const { playSound } = useAudio()
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success")
  
  // Load questions based on subject
  useEffect(() => {
    const loadQuestions = async () => {
      const questionSet = await getRandomQuestions(subject, 10)
      setQuestions(questionSet)
    }
    loadQuestions()
  }, [subject])

  // Timer countdown
  useEffect(() => {
    if (!isAnswered && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleTimeout()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isAnswered, currentQuestionIndex, questions])

  const handleTimeout = () => {
    playSound("error")
    setIsAnswered(true)
  }

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return

    const currentQuestion = questions[currentQuestionIndex]
    
    if (currentQuestion.type === "single") {
      setSelectedAnswers([answer])
    } else if (currentQuestion.type === "multiple") {
      setSelectedAnswers((prev) => {
        if (prev.includes(answer)) {
          return prev.filter((a) => a !== answer)
        }
        return [...prev, answer]
      })
    }
  }

  const handleSubmit = () => {
    if (isAnswered || selectedAnswers.length === 0) return

    const currentQuestion = questions[currentQuestionIndex]
    let isCorrect = false

    if (currentQuestion.type === "single") {
      isCorrect = selectedAnswers[0] === currentQuestion.correctAnswer
    } else if (currentQuestion.type === "multiple") {
      const correctAnswers = currentQuestion.correctAnswer as string[]
      isCorrect = 
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((answer) => correctAnswers.includes(answer))
    }

    if (isCorrect) {
      playSound("success")
      setScore((prev) => prev + 1)
    } else {
      playSound("error")
    }

    setIsAnswered(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswers([])
      setIsAnswered(false)
      setTimeLeft(30)
      playSound("click")
    }
  }

  // Calculate progress percentage
  const progressPercentage = (currentQuestionIndex / questions.length) * 100

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar and Score */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center text-yellow-500">
                <Award className="w-5 h-5 mr-1" />
                <motion.span
                  key={score}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {score}
                </motion.span>
              </div>
              <div className="flex items-center text-purple-500">
                <Timer className="w-5 h-5 mr-1" />
                <motion.span
                  key={timeLeft}
                  initial={{ scale: timeLeft <= 5 ? 1.2 : 1 }}
                  animate={{ scale: 1 }}
                  className={timeLeft <= 5 ? "text-red-500" : ""}
                >
                  {timeLeft}s
                </motion.span>
              </div>
            </motion.div>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 relative overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500" />
            <div className="absolute inset-0 bg-grid-pattern" />
          </div>

          <motion.h2 
            className="text-xl font-medium mb-6 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={currentQuestion.id}
          >
            {currentQuestion.question}
          </motion.h2>

          {/* Options with Enhanced Animations */}
          <div className="space-y-3 relative">
            <AnimatePresence mode="wait">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, translateX: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedAnswers.includes(option)
                      ? "bg-purple-500/20 border-purple-500"
                      : "bg-gray-800/50 border-gray-700 hover:bg-gray-800"
                  } border ${
                    isAnswered
                      ? option === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-500/20"
                        : selectedAnswers.includes(option)
                        ? "border-red-500 bg-red-500/20"
                        : ""
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-3 text-gray-400">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {isAnswered && (
                      option === currentQuestion.correctAnswer ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                        </motion.div>
                      ) : selectedAnswers.includes(option) ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                        </motion.div>
                      ) : null
                    )}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Explanation with Enhanced Animation */}
          <AnimatePresence>
            {isAnswered && currentQuestion.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                  <p className="text-gray-300">{currentQuestion.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons with Enhanced Animations */}
          <div className="flex justify-end mt-6 space-x-4">
            <AnimatePresence mode="wait">
              {!isAnswered ? (
                <motion.button
                  key="submit"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 relative overflow-hidden"
                >
                  <span className="relative z-10">Submit</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ) : (
                <motion.button
                  key="next"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 relative overflow-hidden"
                >
                  <span className="relative z-10">Next Question</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 