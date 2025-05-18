"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAudio } from "@/components/audio-provider"
import { generateRoomCode } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import GameRoundSelection from "@/components/home/game-round-selection"
import RecentWinnersLeaderboard from "@/components/home/recent-winners-leaderboard"
import ProfileSection from "@/components/home/profile-section"
import DashboardAnalytics from "@/components/home/dashboard-analytics"
import { ArrowRight, Users, Brain, Trophy, Zap, BookOpen, FlaskRoundIcon as Flask, Globe, Code } from "lucide-react"
import RulesSection from "@/components/home/rules-section"
import { useTheme } from "@/components/theme-provider"

// Mock room data
interface Room {
  active: boolean
  players: number
  bots: number
  difficulty: "easy" | "average" | "hard"
  category: string
  questions: Question[]
  currentRound: number
  maxRounds: number
  status: "waiting" | "playing" | "finished"
}

interface Question {
  id: string
  type: "single" | "multiple" | "reorder"
  category: string
  difficulty: "easy" | "average" | "hard"
  question: string
  options: string[]
  correctAnswer: string | string[]
  timeLimit: number
}

// Mock questions data
const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    type: "single",
    category: "cs",
    difficulty: "easy",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Logic",
      "Home Tool Markup Language"
    ],
    correctAnswer: "Hyper Text Markup Language",
    timeLimit: 30
  },
  {
    id: "q2",
    type: "multiple",
    category: "science",
    difficulty: "average",
    question: "Which of these are planets in our solar system?",
    options: ["Mars", "Jupiter", "Moon", "Sun", "Venus"],
    correctAnswer: ["Mars", "Jupiter", "Venus"],
    timeLimit: 20
  },
  {
    id: "q3",
    type: "reorder",
    category: "english",
    difficulty: "hard",
    question: "Arrange these words to form a proper sentence",
    options: ["the", "quick", "brown", "fox", "jumps"],
    correctAnswer: ["the", "quick", "brown", "fox", "jumps"],
    timeLimit: 15
  }
]

const MOCK_ROOMS: Record<string, Room> = {
  "ABC123": {
    active: true,
    players: 2,
    bots: 1,
    difficulty: "average",
    category: "all",
    questions: shuffleArray(MOCK_QUESTIONS),
    currentRound: 0,
    maxRounds: 10,
    status: "waiting"
  },
  "XYZ789": {
    active: true,
    players: 1,
    bots: 3,
    difficulty: "hard",
    category: "cs",
    questions: shuffleArray(MOCK_QUESTIONS),
    currentRound: 0,
    maxRounds: 10,
    status: "waiting"
  },
  "TEST123": {
    active: false,
    players: 0,
    bots: 0,
    difficulty: "easy",
    category: "science",
    questions: [],
    currentRound: 0,
    maxRounds: 10,
    status: "finished"
  }
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function HomePage() {
  const [roomCode, setRoomCode] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "average" | "hard">("average")
  const [subject, setSubject] = useState<string>("all")
  
  // Debug state changes
  useEffect(() => {
    console.log('Current subject:', subject);
  }, [subject])
  const [isLoading, setIsLoading] = useState(false)
  const [numBots, setNumBots] = useState(0)
  const [maxRounds, setMaxRounds] = useState(10)
  const router = useRouter()
  const { playSound } = useAudio()
  const { toast } = useToast()
  const { colors } = useTheme()

  // Generate a username if none exists
  useEffect(() => {
    const storedUsername = localStorage.getItem("quizverse-username")
    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      const randomUsername = `Player${Math.floor(Math.random() * 10000)}`
      setUsername(randomUsername)
      localStorage.setItem("quizverse-username", randomUsername)
    }

    // Play background music
    playSound("background", true)
  }, [playSound])

  // Debug state changes
  useEffect(() => {
    console.log("Username changed:", username)
  }, [username])

  useEffect(() => {
    console.log("Room code changed:", roomCode)
  }, [roomCode])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log("Username input:", value)
    setUsername(value)
    setError("")
  }

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    console.log("Room code input:", value)
    setRoomCode(value)
    setError("")
  }

  const handleJoinRoom = () => {
    setError("")
    setIsLoading(true)
    playSound("click")

    if (!roomCode.trim()) {
      setError("Please enter a room code")
      playSound("error")
      setIsLoading(false)
      return
    }

    if (!username.trim()) {
      setError("Please enter a username")
      playSound("error")
      setIsLoading(false)
      return
    }

    // Mock room validation
    setTimeout(() => {
      const room = MOCK_ROOMS[roomCode]
      if (!room) {
        setError("Room not found")
        playSound("error")
        setIsLoading(false)
        return
      }

      if (!room.active) {
        setError("This room is no longer active")
        playSound("error")
        setIsLoading(false)
        return
      }

      const totalParticipants = room.players + room.bots
      if (totalParticipants >= 15) {
        setError("Room is full (max 15 participants)")
        playSound("error")
        setIsLoading(false)
      return
    }

    // Store username in localStorage
    localStorage.setItem("quizverse-username", username)

      // Show success toast
      toast({
        title: "Room found!",
        description: `Joining quiz room with ${room.players} players and ${room.bots} bots...`,
      })

      // Navigate to the lobby
    router.push(
      `/lobby?code=${roomCode}&username=${encodeURIComponent(username)}&difficulty=${difficulty}&subject=${subject}`,
    )
    }, 1000) // Simulate network delay
  }

  const handleCreateRoom = () => {
    if (!username.trim()) {
      setError("Please enter a username")
      playSound("error")
      return
    }

    setIsLoading(true)
    playSound("click")

    // Store username in localStorage
    localStorage.setItem("quizverse-username", username)

    // Generate a unique room code
    const newRoomCode = generateRoomCode()

    // Create new room with shuffled questions
    const filteredQuestions = MOCK_QUESTIONS.filter(q => 
      (subject === "all" || q.category === subject) &&
      q.difficulty === difficulty
    )

    const newRoom: Room = {
      active: true,
      players: 1,
      bots: numBots,
      difficulty,
      category: subject,
      questions: shuffleArray(filteredQuestions),
      currentRound: 0,
      maxRounds,
      status: "waiting"
    }

    // Add room to mock data
    MOCK_ROOMS[newRoomCode] = newRoom

    toast({
      title: "Room Created!",
      description: `Created room with ${numBots} bot${numBots === 1 ? '' : 's'}. Waiting for players...`,
    })

    // Navigate to the lobby
    router.push(
      `/lobby?code=${newRoomCode}&username=${encodeURIComponent(username)}&host=true&difficulty=${difficulty}&subject=${subject}&bots=${numBots}&rounds=${maxRounds}`,
    )
  }

  // Category configuration with specific Tailwind classes
  const categories = [
    { 
      id: "all", 
      label: "All", 
      icon: Trophy, 
      activeClasses: "border-purple-500 bg-purple-900/20 text-purple-300",
      activeIconClass: "text-purple-400"
    },
    { 
      id: "english", 
      label: "English", 
      icon: BookOpen, 
      activeClasses: "border-blue-500 bg-blue-900/20 text-blue-300",
      activeIconClass: "text-blue-400"
    },
    { 
      id: "science", 
      label: "Science", 
      icon: Flask, 
      activeClasses: "border-green-500 bg-green-900/20 text-green-300",
      activeIconClass: "text-green-400"
    },
    { 
      id: "social", 
      label: "Social", 
      icon: Globe, 
      activeClasses: "border-amber-500 bg-amber-900/20 text-amber-300",
      activeIconClass: "text-amber-400"
    },
    { 
      id: "cs", 
      label: "CS", 
      icon: Code, 
      activeClasses: "border-cyan-500 bg-cyan-900/20 text-cyan-300",
      activeIconClass: "text-cyan-400"
    }
  ] as const;

  // Category selection handler
  const handleCategorySelect = (categoryId: string, label: string) => {
    setSubject(categoryId);
    playSound("click");
    toast({
      title: "Category Selected",
      description: `Selected ${label} category`,
      duration: 1500,
    });
  };

  // Difficulty configuration
  const difficulties = [
    { 
      id: "easy", 
      label: "Easy", 
      icon: Brain,
      time: "30s",
      activeClasses: "border-emerald-500 bg-emerald-900/20 text-emerald-300",
      activeIconClass: "text-emerald-400"
    },
    { 
      id: "average", 
      label: "Average", 
      icon: Zap,
      time: "20s",
      activeClasses: "border-orange-500 bg-orange-900/20 text-orange-300",
      activeIconClass: "text-orange-400"
    },
    { 
      id: "hard", 
      label: "Hard", 
      icon: Trophy,
      time: "15s",
      activeClasses: "border-red-500 bg-red-900/20 text-red-300",
      activeIconClass: "text-red-400"
    }
  ] as const;

  // Difficulty selection handler
  const handleDifficultySelect = (difficultyId: "easy" | "average" | "hard", label: string) => {
    setDifficulty(difficultyId);
    playSound("click");
    toast({
      title: "Difficulty Selected",
      description: `Selected ${label} mode (${
        difficultyId === "easy" ? "30s" : difficultyId === "average" ? "20s" : "15s"
      } per question)`,
      duration: 1500,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-0 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Challenge Your <span className="bg-clip-text text-transparent" style={{
                      backgroundImage: `linear-gradient(to right, rgb(${colors.primary}), rgb(${colors.secondary}), rgb(${colors.accent}))`
                    }}>Knowledge</span> in Real-Time Quizzes
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Create a room, invite friends, and compete in exciting multiplayer quiz games across various
                    categories. Test your knowledge and climb the leaderboard!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 cta-button"
                      onClick={() => {
                        setIsCreating(true)
                        playSound("click")
                      }}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Create Room
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={() => {
                        setIsCreating(false)
                        playSound("click")
                      }}
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Join Room
                    </Button>
                  </div>

                  <div className="flex items-center mt-8 space-x-4">
                    <RulesSection />
                    <div className="text-gray-400 text-sm">
                      <span className="text-purple-400 font-medium">15,000+</span> players online now
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="gradient-border p-6"
                >
                  <h2 className="text-2xl font-bold mb-6">
                    {isCreating ? "Create a New Quiz Room" : "Join an Existing Room"}
                  </h2>

                  <div className="space-y-4">
                    {!isCreating && (
                      <div>
                        <label htmlFor="roomCode" className="block text-sm font-medium text-gray-300 mb-1">
                          Room Code
                        </label>
                        <input
                          id="roomCode"
                          name="roomCode"
                          type="text"
                          value={roomCode}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase().slice(0, 6);
                            setRoomCode(value);
                            setError("");
                          }}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.key === 'Enter') {
                              handleJoinRoom();
                            }
                          }}
                          placeholder="Enter 6-digit code"
                          className="w-full h-10 px-3 py-2 text-sm text-white bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 input-hover"
                          maxLength={6}
                          autoComplete="off"
                        />
                        <p className="text-xs text-gray-400 mt-1">Enter a 6-character room code (e.g., ABC123)</p>
                      </div>
                    )}

                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                          const value = e.target.value;
                          setUsername(value);
                          setError("");
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          if (e.key === 'Enter' && !isCreating) {
                            handleJoinRoom();
                          }
                        }}
                        placeholder="Enter your name"
                        className="w-full h-10 px-3 py-2 text-sm text-white bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        autoComplete="off"
                      />
                    </div>

                    {isCreating && (
                      <>
                        <div>
                          <label htmlFor="numBots" className="block text-sm font-medium text-gray-300 mb-1">
                            Add Bots (0-15)
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="numBots"
                              name="numBots"
                              type="number"
                              min={0}
                              max={15}
                              value={numBots}
                              onChange={(e) => {
                                const value = Math.min(15, Math.max(0, parseInt(e.target.value) || 0))
                                console.log("Bot count input:", value)
                                setNumBots(value)
                              }}
                              className="bg-gray-800/50 border-gray-700 text-white"
                              disabled={isLoading}
                            />
                            <span className="text-sm text-gray-400">
                              {numBots > 0 ? `${numBots} bot${numBots === 1 ? '' : 's'} will join` : 'No bots'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="maxRounds" className="block text-sm font-medium text-gray-300 mb-1">
                            Number of Rounds
                          </label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="maxRounds"
                              name="maxRounds"
                              type="number"
                              min={5}
                              max={20}
                              value={maxRounds}
                              onChange={(e) => {
                                const value = Math.min(20, Math.max(5, parseInt(e.target.value) || 5))
                                setMaxRounds(value)
                              }}
                              className="bg-gray-800/50 border-gray-700 text-white"
                              disabled={isLoading}
                            />
                            <span className="text-sm text-gray-400">
                              {maxRounds} question{maxRounds === 1 ? '' : 's'} per game
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Difficulty Selection */}
                      <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Select Difficulty
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {difficulties.map(({ id, label, icon: Icon, time, activeClasses, activeIconClass }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleDifficultySelect(id as "easy" | "average" | "hard", label)}
                            className={`
                              group p-3 rounded-lg border transition-all duration-200 category-button
                              flex flex-col items-center cursor-pointer
                              ${difficulty === id 
                                ? `${activeClasses} active`
                                : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                              }
                            `}
                          >
                            <Icon 
                              className={`
                                h-5 w-5 mb-1 transition-colors
                                ${difficulty === id 
                                  ? activeIconClass
                                  : "text-gray-400 group-hover:text-gray-300"
                                }
                              `}
                            />
                            <span className="font-medium">
                              {label}
                            </span>
                            <span className="text-xs opacity-60 mt-1">
                              {time} per question
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Selection (existing code) */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Select Category
                        <span className="text-sm text-gray-400 ml-2">
                          ({difficulty === "easy" ? "30s" : difficulty === "average" ? "20s" : "15s"} per question)
                        </span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {categories.map(({ id, label, icon: Icon, activeClasses, activeIconClass }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleCategorySelect(id, label)}
                            className={`
                              group p-3 rounded-lg border transition-all duration-200 category-button
                              flex flex-col items-center cursor-pointer
                              ${subject === id 
                                ? `${activeClasses} active`
                                : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                              }
                            `}
                          >
                            <Icon 
                              className={`
                                h-5 w-5 mb-1 transition-colors
                                ${subject === id 
                                  ? activeIconClass
                                  : "text-gray-400 group-hover:text-gray-300"
                                }
                              `}
                            />
                            <span className="font-medium">
                              {label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm flex items-center">
                        <span className="i-lucide-alert-circle mr-1" />
                        {error}
                      </p>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cta-button py-5 text-lg font-medium"
                      onClick={isCreating ? handleCreateRoom : handleJoinRoom}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="i-lucide-loader-2 animate-spin mr-2" />
                          {isCreating ? "Creating Room..." : "Joining Room..."}
                        </>
                      ) : (
                        <>{isCreating ? "Create Room" : "Join Room"}</>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why Play QuizVerse?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="gradient-border p-6 feature-card"
              >
                <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Diverse Question Types</h3>
                <p className="text-gray-400">
                  Challenge yourself with multiple choice, checkbox, and sortable questions across various categories
                  and difficulty levels.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="gradient-border p-6 feature-card"
              >
                <div className="w-12 h-12 rounded-full bg-pink-900/50 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Multiplayer</h3>
                <p className="text-gray-400">
                  Create private rooms, invite friends with a unique code, or play with AI opponents for an engaging
                  competitive experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="gradient-border p-6 feature-card"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dynamic Scoring</h3>
                <p className="text-gray-400">
                  Earn points based on speed, accuracy, and difficulty. Build streaks for bonus points and climb the
                  global leaderboard.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="leaderboard-section" className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Tabs defaultValue="leaderboard" className="w-full">
                  <TabsList className="grid grid-cols-2 bg-gray-800">
                    <TabsTrigger value="leaderboard" className="tab-trigger">Leaderboard</TabsTrigger>
                    <TabsTrigger value="analytics" className="tab-trigger">Analytics</TabsTrigger>
                  </TabsList>
                  <TabsContent value="leaderboard" className="mt-4 tab-content">
                    <RecentWinnersLeaderboard />
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-4 tab-content">
                    <DashboardAnalytics />
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <ProfileSection username={username} setUsername={setUsername} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="gradient-border p-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join thousands of players and challenge yourself in exciting quiz games!
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 cta-button"
                  onClick={() => {
                    setIsCreating(true)
                    playSound("click")
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Playing Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
