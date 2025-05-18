"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { mockQuestions } from "@/data/mock-questions"
import QuizLeaderboard from "./quiz-leaderboard"
import { CheckCircle2, XCircle } from "lucide-react"

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
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizEndedEarly, setQuizEndedEarly] = useState(false)

  // Get questions for the selected category and shuffle them
  const questions = useMemo(() => {
    // For "all" category, get all questions
    let selectedQuestions = category === "all"
      ? Object.values(mockQuestions).flat()
      : mockQuestions[category] || [];
    
    // Shuffle the questions
    selectedQuestions = [...selectedQuestions].sort(() => Math.random() - 0.5);
    
    // Limit to 15 questions maximum
    return selectedQuestions.slice(0, 15);
  }, [category]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  useEffect(() => {
    if (answerSubmitted) {
      // Show explanation first
      setShowExplanation(true);
      
      // Then show leaderboard after delay
      const timer = setTimeout(() => {
        setShowLeaderboard(true);
        setShowExplanation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [answerSubmitted]);

  const handleAnswerSelect = (answer: string) => {
    if (answerSubmitted) return;
    
    setSelectedAnswer(answer);
    setAnswerSubmitted(true);

    // Update player scores - double points for last question
    const pointsForQuestion = isLastQuestion ? 200 : 100;
    
    const updatedPlayers = players.map(player => {
      if (player.id === "user") {
        return {
          ...player,
          score: player.score + (answer === currentQuestion.correctAnswer ? pointsForQuestion : 0),
          lastAnswerCorrect: answer === currentQuestion.correctAnswer,
          lastAnswerTime: Date.now()
        }
      }
      // Simulate other players' answers
      const correct = Math.random() > 0.5;
      const answerTime = Date.now() + Math.random() * 2000;
      return {
        ...player,
        score: player.score + (correct ? pointsForQuestion : 0),
        lastAnswerCorrect: correct,
        lastAnswerTime: answerTime
      }
    });

    setPlayers(updatedPlayers);
  };

  const handleContinue = () => {
    if (isLastQuestion || quizEndedEarly) {
      setGameEnded(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowLeaderboard(false);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setShowExplanation(false);
    }
  };

  const handleEndQuiz = () => {
    setQuizEndedEarly(true);
    setGameEnded(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {showLeaderboard ? (
          <motion.div className="space-y-6">
            <QuizLeaderboard
              key="leaderboard"
              players={players}
              isFinalLeaderboard={gameEnded}
              onContinue={gameEnded ? onGameEnd : handleContinue}
            />
            {!gameEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center space-x-4"
              >
                <button
                  onClick={handleEndQuiz}
                  className="glass-button-secondary px-6 py-2 text-white font-medium"
                >
                  End Quiz
                </button>
                <button
                  onClick={handleContinue}
                  className="glass-button px-6 py-2 text-white font-medium"
                >
                  Next Question
                </button>
              </motion.div>
            )}
          </motion.div>
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
              {isLastQuestion && (
                <span className="text-sm text-purple-400 font-medium">
                  Final Round - Double Points!
                </span>
              )}
            </div>

            {/* Question */}
            <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={answerSubmitted}
                  className={`w-full glass-panel-hover p-4 text-left rounded-lg transition-all duration-200
                    ${answerSubmitted && option === currentQuestion.correctAnswer
                      ? "border-green-500/50 bg-green-500/10 hover:bg-green-500/20"
                      : answerSubmitted && option === selectedAnswer && option !== currentQuestion.correctAnswer
                      ? "border-red-500/50 bg-red-500/10 hover:bg-red-500/20"
                      : "hover:bg-gray-800/50"
                    }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {answerSubmitted && option === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {answerSubmitted && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Answer Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-lg ${
                  isCorrect ? "bg-green-900/20 border border-green-500/30" : "bg-red-900/20 border border-red-500/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-green-400">Correct!</h3>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium text-red-400">Incorrect</h3>
                    </>
                  )}
                </div>
                <p className="text-gray-300">
                  {currentQuestion.explanation || (
                    isCorrect 
                      ? `That's right! "${currentQuestion.correctAnswer}" is the correct answer.`
                      : `The correct answer is "${currentQuestion.correctAnswer}".`
                  )}
                </p>
              </motion.div>
            )}

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
