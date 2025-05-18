"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"

interface ResultScreenProps {
  score: number
  totalQuestions: number
  answers: Array<{
    question: string
    userAnswer: string
    correctAnswer: string
    isCorrect: boolean
  }>
  onRestart: () => void
}

export default function ResultScreen({ score, totalQuestions, answers, onRestart }: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  let message = "Excellent work!"
  let messageClass = "text-green-600 dark:text-green-400"

  if (percentage < 40) {
    message = "Keep practicing"
    messageClass = "text-red-600 dark:text-red-400"
  } else if (percentage < 70) {
    message = "Good effort"
    messageClass = "text-amber-600 dark:text-amber-400"
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-slate-800 dark:text-slate-100">Quiz Complete</h2>
      <p className={`text-center text-lg font-medium mb-6 ${messageClass}`}>{message}</p>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-slate-200 dark:text-slate-700 stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-blue-600 dark:text-blue-500 stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              transform="rotate(-90 50 50)"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{percentage}%</span>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
          You scored {score} out of {totalQuestions}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Question Summary</h3>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Incorrect</span>
            </div>
          </div>
        </div>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`p-4 rounded-md border ${
                answer.isCorrect
                  ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`mt-0.5 mr-3 p-1 rounded-full ${
                    answer.isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {answer.isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                    {index + 1}. {answer.question}
                  </p>
                  <div className="text-sm">
                    <span
                      className={
                        answer.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }
                    >
                      {answer.userAnswer}
                    </span>
                    {!answer.isCorrect && (
                      <span className="text-slate-500 dark:text-slate-400"> (Correct: {answer.correctAnswer})</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </div>
    </div>
  )
}
