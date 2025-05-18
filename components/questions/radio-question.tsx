"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"

interface RadioQuestionProps {
  question: {
    options: string[]
    correctAnswer: string
  }
  selectedOption: string | null
  onSelect: (option: string) => void
  isAnswered: boolean
}

export default function RadioQuestion({ question, selectedOption, onSelect, isAnswered }: RadioQuestionProps) {
  return (
    <div className="space-y-3 flex-1">
      {question.options.map((option, index) => {
        const isSelected = selectedOption === option
        const isCorrect = option === question.correctAnswer
        const isIncorrect = isAnswered && isSelected && !isCorrect

        return (
          <motion.button
            key={index}
            onClick={() => !isAnswered && onSelect(option)}
            disabled={isAnswered}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              isAnswered && isCorrect
                ? "border-green-500 bg-green-900/30 shadow-glow-success"
                : isIncorrect
                  ? "border-red-500 bg-red-900/30 shadow-glow-error"
                  : isSelected
                    ? "border-purple-500 bg-purple-900/30 shadow-glow-primary"
                    : "border-gray-700 hover:border-gray-600 bg-gray-800/50 hover:bg-gray-700/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 flex items-center justify-center ${
                    isSelected
                      ? isIncorrect
                        ? "border-red-500 bg-red-900/50"
                        : isCorrect
                          ? "border-green-500 bg-green-900/50"
                          : "border-purple-500 bg-purple-900/50"
                      : "border-gray-600"
                  }`}
                >
                  {isSelected && (
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isIncorrect ? "bg-red-500" : isCorrect ? "bg-green-500" : "bg-purple-500"
                      }`}
                    />
                  )}
                </div>
                <span className="text-gray-200">{option}</span>
              </div>

              {isAnswered && (
                <>
                  {isCorrect && <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />}
                  {isIncorrect && <XCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />}
                </>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
