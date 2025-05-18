"use client"

import { useState, useEffect } from "react"
import { Check, CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"

interface CheckboxQuestionProps {
  question: {
    options: string[]
    correctAnswers: string[]
  }
  selectedOptions: string[]
  onSelect: (options: string[]) => void
  isAnswered: boolean
}

export default function CheckboxQuestion({ question, selectedOptions, onSelect, isAnswered }: CheckboxQuestionProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedOptions || [])

  useEffect(() => {
    // Update local state when prop changes
    setLocalSelected(selectedOptions || [])
  }, [selectedOptions])

  const toggleOption = (option: string) => {
    if (isAnswered) return

    let newSelected
    if (localSelected.includes(option)) {
      newSelected = localSelected.filter((item) => item !== option)
    } else {
      newSelected = [...localSelected, option]
    }

    setLocalSelected(newSelected)
    onSelect(newSelected)
  }

  const isOptionCorrect = (option: string) => {
    return question.correctAnswers.includes(option)
  }

  const isOptionIncorrect = (option: string) => {
    return localSelected.includes(option) && !question.correctAnswers.includes(option)
  }

  return (
    <div className="space-y-3 flex-1">
      <p className="text-gray-400 mb-2 text-sm">
        Select {question.correctAnswers.length} correct answer{question.correctAnswers.length > 1 ? "s" : ""}
      </p>

      {question.options.map((option, index) => {
        const isSelected = localSelected.includes(option)
        const isCorrect = isOptionCorrect(option)
        const isIncorrect = isAnswered && isOptionIncorrect(option)

        return (
          <motion.button
            key={index}
            onClick={() => toggleOption(option)}
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
                  className={`w-5 h-5 rounded border flex-shrink-0 mr-3 flex items-center justify-center ${
                    isSelected
                      ? isIncorrect
                        ? "border-red-500 bg-red-900/50"
                        : isAnswered && isCorrect
                          ? "border-green-500 bg-green-900/50"
                          : "border-purple-500 bg-purple-900/50"
                      : "border-gray-600"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 text-white" />}
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
