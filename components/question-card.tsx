"use client"

import { useState, useEffect } from "react"
import Timer from "./timer"
import type { Question } from "@/data/questions"
import { CheckCircle, XCircle } from "lucide-react"

interface QuestionCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (selectedOption: string) => void
  onTimeUp: () => void
  timeUp: boolean
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onTimeUp,
  timeUp,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timerKey, setTimerKey] = useState(questionNumber)

  useEffect(() => {
    setSelectedOption(null)
    setShowFeedback(false)
    setTimerKey(questionNumber)
  }, [question, questionNumber])

  const handleOptionClick = (option: string) => {
    if (selectedOption || timeUp) return

    setSelectedOption(option)
    setShowFeedback(true)

    setTimeout(() => {
      onAnswer(option)
    }, 1500)
  }

  const isCorrect = selectedOption === question.answer

  // Determine category styling
  const getCategoryClass = () => {
    switch (question.category) {
      case "Science":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
      case "History":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
      case "Geography":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
      case "Art":
        return "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300"
      case "Entertainment":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
      case "Technology":
        return "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300"
      case "Food":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
      default:
        return "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Question {questionNumber} of {totalQuestions}
        </div>
        <Timer key={timerKey} duration={15} onTimeUp={onTimeUp} isPaused={showFeedback || timeUp} />
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-6">
        <div className="progress-bar-fill" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
      </div>

      <div className="mb-2">
        <span className={`question-category ${getCategoryClass()}`}>{question.category}</span>
      </div>

      <h2 className="question-title mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback || timeUp}
            className={`question-option w-full text-left ${
              selectedOption === option
                ? isCorrect
                  ? "correct"
                  : "incorrect"
                : selectedOption
                  ? ""
                  : "hover:shadow-md"
            } ${showFeedback && option === question.answer && selectedOption !== option ? "correct" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                    selectedOption === option
                      ? isCorrect
                        ? "bg-green-100 border-green-500 text-green-600 dark:bg-green-900/30 dark:border-green-500 dark:text-green-400"
                        : "bg-red-100 border-red-500 text-red-600 dark:bg-red-900/30 dark:border-red-500 dark:text-red-400"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-slate-700 dark:text-slate-200">{option}</span>
              </div>
              {showFeedback && (
                <>
                  {option === question.answer && <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />}
                  {selectedOption === option && option !== question.answer && (
                    <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                  )}
                </>
              )}
            </div>
          </button>
        ))}
      </div>

      {timeUp && !showFeedback && (
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md text-center">
          <p className="text-amber-700 dark:text-amber-400 font-medium">Time's up! The correct answer was:</p>
          <p className="text-amber-800 dark:text-amber-300 font-bold mt-1">{question.answer}</p>
        </div>
      )}
    </div>
  )
}
