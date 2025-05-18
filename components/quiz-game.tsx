"use client"

import { useState } from "react"
import StartScreen from "./start-screen"
import QuestionCard from "./question-card"
import ResultScreen from "./result-screen"
import questions from "@/data/questions"

export default function QuizGame() {
  const [gameState, setGameState] = useState<"start" | "playing" | "result">("start")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<
    Array<{ question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }>
  >([])
  const [timeUp, setTimeUp] = useState(false)

  const startQuiz = () => {
    setGameState("playing")
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnswers([])
  }

  const handleAnswer = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.answer

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        userAnswer: selectedOption,
        correctAnswer: currentQuestion.answer,
        isCorrect,
      },
    ])

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeUp(false)
    } else {
      setGameState("result")
    }
  }

  const handleTimeUp = () => {
    setTimeUp(true)
    const currentQuestion = questions[currentQuestionIndex]

    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        userAnswer: "Time's up!",
        correctAnswer: currentQuestion.answer,
        isCorrect: false,
      },
    ])

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setTimeUp(false)
      } else {
        setGameState("result")
      }
    }, 1500)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
      {gameState === "start" && <StartScreen onStart={startQuiz} />}

      {gameState === "playing" && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onTimeUp={handleTimeUp}
          timeUp={timeUp}
        />
      )}

      {gameState === "result" && (
        <ResultScreen score={score} totalQuestions={questions.length} answers={answers} onRestart={startQuiz} />
      )}
    </div>
  )
}
