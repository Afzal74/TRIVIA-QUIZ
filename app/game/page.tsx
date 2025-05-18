"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAudio } from "@/components/audio-provider"
import { motion, AnimatePresence } from "framer-motion"
import { getRandomQuestions } from "@/data/questions"
import { useToast } from "@/components/ui/use-toast"
import { QuestionType } from "../types/quiz"
import type {
  Question,
  GameData,
  ScoreBreakdown,
  RadioQuestion,
  CheckboxQuestion,
  SortableQuestion,
  PlayerRanking,
  BaseQuestion,
  Difficulty,
  Subject
} from "../types/quiz"
import Header from "@/components/header"
import { Volume2, VolumeX, Zap } from "lucide-react"
import confetti from "canvas-confetti"

export default function GamePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { playSound, isMuted, toggleMute } = useAudio()
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  const roomCode = searchParams.get("code") || ""

  const [gameData, setGameData] = useState<GameData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [isAnswered, setIsAnswered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [lastPointsEarned, setLastPointsEarned] = useState<Record<string, number>>({})
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null)
  const [playerRankings, setPlayerRankings] = useState<PlayerRanking[]>([])
  const [previousRankings, setPreviousRankings] = useState<PlayerRanking[]>([])
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "correct" | "incorrect" | null; text: string }>({
    type: null,
    text: "",
  })
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null)

  // Load game data and questions
  useEffect(() => {
    try {
      const storedGameData = localStorage.getItem(`quizverse-game-${roomCode}`)

      if (!storedGameData) {
        throw new Error("Game not found")
      }

      const parsedGameData: GameData = JSON.parse(storedGameData)
      
      if (!parsedGameData.players?.length || !parsedGameData.host || !parsedGameData.difficulty) {
        throw new Error("Invalid game data")
      }

      setGameData(parsedGameData)
      setTimeLeft(parsedGameData.questionTime || 10)

      const initialScores: Record<string, number> = {}
      parsedGameData.players.forEach((player: string) => {
        initialScores[player] = 0
      })
      setScores(initialScores)

      const fetchedQuestions = getRandomQuestions(parsedGameData.maxRounds || 15, parsedGameData.subject)
      
      if (!fetchedQuestions?.length) {
        throw new Error("No questions available for selected subject")
      }
      
      const typedQuestions: Question[] = fetchedQuestions.map(q => {
        const questionType = q.type as QuestionType
        const difficulty = (q.difficulty || parsedGameData.difficulty) as Difficulty

        switch (questionType) {
          case QuestionType.RADIO: {
            return {
              id: q.id || Math.random().toString(36).substr(2, 9),
              type: QuestionType.RADIO,
              category: q.category || parsedGameData.subject,
              difficulty,
              question: q.question,
              options: q.options || [],
              timeLimit: q.timeLimit || parsedGameData.questionTime || 10,
              subject: q.subject,
              correctAnswer: String(q.correctAnswer || "")
            } as RadioQuestion
          }
          case QuestionType.CHECKBOX: {
            const answers = Array.isArray(q.correctAnswer) 
              ? q.correctAnswer.map(String)
              : [String(q.correctAnswer || "")]
            return {
              id: q.id || Math.random().toString(36).substr(2, 9),
              type: QuestionType.CHECKBOX,
              category: q.category || parsedGameData.subject,
              difficulty,
              question: q.question,
              options: q.options || [],
              timeLimit: q.timeLimit || parsedGameData.questionTime || 10,
              subject: q.subject,
              correctAnswers: answers
            } as CheckboxQuestion
          }
          case QuestionType.SORTABLE: {
            const order = Array.isArray(q.correctAnswer)
              ? q.correctAnswer.map(String)
              : q.question.split(" ")
            return {
              id: q.id || Math.random().toString(36).substr(2, 9),
              type: QuestionType.SORTABLE,
              category: q.category || parsedGameData.subject,
              difficulty,
              question: q.question,
              options: q.options || [],
              timeLimit: q.timeLimit || parsedGameData.questionTime || 10,
              subject: q.subject,
              correctOrder: order
            } as SortableQuestion
          }
          default: {
            // Default to radio type if unknown
            return {
              id: q.id || Math.random().toString(36).substr(2, 9),
              type: QuestionType.RADIO,
              category: q.category || parsedGameData.subject,
              difficulty,
              question: q.question,
              options: q.options || [],
              timeLimit: q.timeLimit || parsedGameData.questionTime || 10,
              subject: q.subject,
              correctAnswer: String(q.correctAnswer || "")
            } as RadioQuestion
          }
        }
      })
      
      setQuestions(typedQuestions)
      playSound("background", true)
    } catch (error) {
      toast({
        title: "Error loading game",
        description: error instanceof Error ? error.message : "Failed to load game data",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [roomCode, router, toast, playSound])

  // Set question start time when a new question is displayed
  useEffect(() => {
    if (questions.length > 0 && !isAnswered && !isTransitioning && !showLeaderboard) {
      setQuestionStartTime(Date.now())
    }
  }, [currentQuestionIndex, questions.length, isAnswered, isTransitioning, showLeaderboard])

  // Timer countdown
  useEffect(() => {
    if (!questions.length || isAnswered || isTransitioning || showLeaderboard || !gameData) return

    if (timeLeft <= 0) {
      handleTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isAnswered, questions.length, isTransitioning, showLeaderboard, gameData])

  const handleTimeUp = () => {
    playSound("timeout", true)
    setIsAnswered(true)
    setStreak(0)
    setFeedbackMessage({ type: "incorrect", text: "Time's up!" })
    simulateBotAnswers()

    setTimeout(() => {
      setShowLeaderboard(true)
      updatePlayerRankings()
      setAutoAdvanceCountdown(5)
    }, 2000)
  }

  // Update player rankings
  const updatePlayerRankings = () => {
    // Save previous rankings
    setPreviousRankings([...playerRankings])

    // Calculate new rankings
    const newRankings = Object.entries(scores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([player], index) => ({ player, rank: index + 1, score: scores[player] }))

    setPlayerRankings(newRankings)
  }

  // Get rank change for a player
  const getRankChange = (player: string) => {
    if (previousRankings.length === 0) return 0

    const currentRank = playerRankings.find((p) => p.player === player)?.rank || 0
    const previousRank = previousRankings.find((p) => p.player === player)?.rank || 0

    return previousRank - currentRank // Positive means improved rank
  }

  const simulateBotAnswers = () => {
    if (!gameData) return

    const username = localStorage.getItem("quizverse-username") || ""

    // Update bot scores randomly
    const updatedScores = { ...scores }
    const pointsEarned: Record<string, number> = {}

    gameData.players.forEach((player: string) => {
      if (player !== username) {
        // Adjust bot accuracy based on difficulty
        let botAccuracy = 0.6 // default for average
        if (gameData.difficulty === "easy") {
          botAccuracy = 0.5 // easier for player
        } else if (gameData.difficulty === "hard") {
          botAccuracy = 0.7 // harder for player
        }

        // Bot gets answer right based on accuracy
        if (Math.random() < botAccuracy) {
          // Simulate random answer time for bots (between 1 and max time)
          const botAnswerTime = Math.random() * (gameData.questionTime - 1) + 1
          const points = calculateScore(botAnswerTime, gameData.questionTime).total
          updatedScores[player] += points
          pointsEarned[player] = points
        } else {
          pointsEarned[player] = 0
        }
      }
    })

    setScores(updatedScores)
    setLastPointsEarned(pointsEarned)
  }

  const calculateScore = (answerTime: number, maxTime: number): ScoreBreakdown => {
    const defaultScore: ScoreBreakdown = {
      base: 0,
      timeBonus: 0,
      streakBonus: 0,
      difficultyBonus: 0,
      total: 0
    }

    if (!gameData) return defaultScore

    const secondsLeft = maxTime - answerTime
    const basePoints = Math.max(100, Math.floor(secondsLeft * 100))
    const timeBonus = Math.floor(basePoints * (secondsLeft / maxTime) * 0.5)
    const streakMultiplier = 1 + Math.min(0.5, streak * 0.1)
    const streakBonus = Math.floor(basePoints * (streakMultiplier - 1))

    const difficultyMultipliers: Record<string, number> = {
      easy: 1,
      average: 1.25,
      hard: 1.5,
    }
    const difficultyMultiplier = difficultyMultipliers[gameData.difficulty] || 1
    const difficultyBonus = Math.floor(basePoints * (difficultyMultiplier - 1))

    return {
      base: basePoints,
      timeBonus,
      streakBonus,
      difficultyBonus,
      total: basePoints + timeBonus + streakBonus + difficultyBonus
    }
  }
} 