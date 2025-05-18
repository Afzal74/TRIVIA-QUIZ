"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useAudio } from "@/components/audio-provider"
import { motion } from "framer-motion"
import { generateBotName } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import Logo from "@/components/logo"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function LobbyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { playSound } = useAudio()

  const roomCode = searchParams.get("code") || ""
  const username = searchParams.get("username") || ""
  const isHost = searchParams.get("host") === "true"
  const difficulty = searchParams.get("difficulty") || "average"
  const subject = searchParams.get("subject") || "all"

  const [players, setPlayers] = useState<string[]>([username])
  const [botCount, setBotCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [questionTime, setQuestionTime] = useState<5 | 10 | 15>(10)

  // Simulate players joining (for demo purposes)
  useEffect(() => {
    if (!isHost) return

    const joinInterval = setInterval(() => {
      if (players.length < 5 && Math.random() > 0.7) {
        const botName = generateBotName()
        setPlayers((prev) => [...prev, botName])
        playSound("join")

        toast({
          title: "New player joined",
          description: `${botName} has joined the room`,
          duration: 2000,
        })
      }
    }, 3000)

    return () => clearInterval(joinInterval)
  }, [isHost, players, playSound, toast])

  // Handle countdown timer
  useEffect(() => {
    if (countdown === null) return

    if (countdown <= 0) {
      // Start the game
      const gameData = {
        roomCode,
        players: [
          ...players,
          ...Array(botCount)
            .fill(null)
            .map(() => generateBotName()),
        ],
        host: isHost ? username : players[0],
        difficulty,
        subject,
        questionTime,
      }

      // Store game data in localStorage (in a real app, this would be in a database)
      localStorage.setItem(`quizverse-game-${roomCode}`, JSON.stringify(gameData))

      // Navigate to the game page
      router.push(`/game?code=${roomCode}&username=${encodeURIComponent(username)}`)
      return
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, router, roomCode, players, botCount, isHost, username, difficulty, subject, questionTime])

  const startGame = () => {
    if (players.length < 1) {
      toast({
        title: "Not enough players",
        description: "At least one player is required to start the game",
        variant: "destructive",
      })
      return
    }
    
    playSound("start")
    setCountdown(5)
  }

  const leaveLobby = () => {
    playSound("click")
    router.push("/")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_85%)]" />
          <div className="relative container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[300px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <div className="text-center mb-6">
                  <Logo className="mx-auto mb-2 h-12 w-auto" />
                  <h1 className="text-2xl font-bold gradient-text">Game Lobby</h1>
                  <div className="mt-2 bg-gray-800 rounded-lg px-4 py-2 inline-block">
                    <span className="text-gray-400 mr-2">Room Code:</span>
                    <span className="font-mono font-bold">{roomCode}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        difficulty === "easy"
                          ? "bg-green-900/30 text-green-400"
                          : difficulty === "average"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
                    </span>

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        subject === "all"
                          ? "bg-purple-900/30 text-purple-400"
                          : subject === "english"
                            ? "bg-blue-900/30 text-blue-400"
                            : subject === "science"
                              ? "bg-green-900/30 text-green-400"
                              : subject === "social"
                                ? "bg-amber-900/30 text-amber-400"
                                : "bg-cyan-900/30 text-cyan-400"
                      }`}
                    >
                      {subject === "all"
                        ? "All Subjects"
                        : subject === "english"
                          ? "English"
                          : subject === "science"
                            ? "Science"
                            : subject === "social"
                              ? "Social Studies"
                              : "Computer Science"}
                    </span>
                  </div>
                </div>

                <div className="gradient-border p-6 mb-6 bg-gray-900/50 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold mb-4">Players ({players.length})</h2>

                  <div className="max-h-60 overflow-y-auto mb-6 space-y-2">
                    {players.map((player, index) => {
                      // Get emoji from localStorage for the current user
                      const emoji =
                        player === username
                          ? localStorage.getItem("quizverse-avatar-emoji") || "😎"
                          : ["😎", "🚀", "🔥", "🌟", "🦄", "🧠", "🎮", "🎯"][index % 8]

                      return (
                        <div key={index} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 text-lg">
                            {emoji}
                          </div>
                          <span>{player}</span>
                          {(isHost && player === username) || (!isHost && index === 0) ? (
                            <span className="ml-2 text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">Host</span>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>

                  {isHost && (
                    <>
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Add Bots (0-15)</h3>
                        <div className="flex items-center gap-4">
                          <Slider
                            value={[botCount]}
                            min={0}
                            max={15}
                            step={1}
                            onValueChange={(value) => setBotCount(value[0])}
                            className="flex-1"
                          />
                          <span className="w-8 text-center">{botCount}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Question Time</h3>
                        <RadioGroup
                          value={questionTime.toString()}
                          onValueChange={(value) => setQuestionTime(Number.parseInt(value) as 5 | 10 | 15)}
                          className="flex space-x-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5" id="time-5" />
                            <Label htmlFor="time-5">5s</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="10" id="time-10" />
                            <Label htmlFor="time-10">10s</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="15" id="time-15" />
                            <Label htmlFor="time-15">15s</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  {countdown !== null ? (
                    <div className="text-center py-4">
                      <p className="text-gray-300 mb-2">Game starting in:</p>
                      <p className="text-4xl font-bold gradient-text">{countdown}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {isHost ? (
                        <Button
                          onClick={startGame}
                          disabled={isLoading || players.length < 1}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Start Game
                        </Button>
                      ) : (
                        <p className="text-center text-gray-400 mb-2">Waiting for host to start the game...</p>
                      )}

                      <Button
                        onClick={leaveLobby}
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Leave Lobby
                      </Button>
                    </div>
                  )}
                </div>

                <div className="text-center text-gray-500 text-sm">
                  <p>Share the room code with friends to play together</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
