"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Home, RotateCcw } from "lucide-react"
import Logo from "@/components/logo"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { playSound } = useAudio()

  const roomCode = searchParams.get("code") || ""

  const [results, setResults] = useState<any>(null)
  const [showPodium, setShowPodium] = useState(false)

  // Load results data
  useEffect(() => {
    const storedResults = localStorage.getItem(`quizverse-results-${roomCode}`)

    if (!storedResults) {
      router.push("/")
      return
    }

    const parsedResults = JSON.parse(storedResults)
    setResults(parsedResults)

    // Play victory sound
    playSound("victory")

    // Show podium animation after a delay
    setTimeout(() => {
      setShowPodium(true)

      // Trigger confetti for winner celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 1000)
  }, [roomCode, router, playSound])

  const playAgain = () => {
    playSound("click")
    router.push("/")
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Sort players by score
  const sortedPlayers = Object.entries(results.scores)
    .sort(([, scoreA]: [string, any], [, scoreB]: [string, any]) => scoreB - scoreA)
    .map(([player, score]: [string, any], index) => ({ player, score, rank: index + 1 }))

  // Get top 3 players for podium
  const topThree = sortedPlayers.slice(0, 3)

  // Get current player's rank
  const username = localStorage.getItem("quizverse-username") || ""
  const currentPlayerRank = sortedPlayers.find((p) => p.player === username)?.rank || 0

  // Get difficulty and subject info
  const difficulty = results.difficulty || "average"
  const subject = results.subject || "all"

  const difficultyColor =
    difficulty === "easy" ? "text-green-400" : difficulty === "average" ? "text-yellow-400" : "text-red-400"

  const subjectColor =
    subject === "all"
      ? "text-purple-400"
      : subject === "english"
        ? "text-blue-400"
        : subject === "science"
          ? "text-green-400"
          : subject === "social"
            ? "text-amber-400"
            : "text-cyan-400"

  const subjectName =
    subject === "all"
      ? "All Subjects"
      : subject === "english"
        ? "English"
        : subject === "science"
          ? "Science"
          : subject === "social"
            ? "Social Studies"
            : "Computer Science"

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-20 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <Logo className="mx-auto mb-2 h-12 w-auto" />
            <h1 className="text-3xl font-bold gradient-text mb-2">Quiz Results</h1>
            <p className="text-gray-400">
              <span className={difficultyColor}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode</span> •{" "}
              <span className={subjectColor}>{subjectName}</span> • {results.totalQuestions} Questions
            </p>
          </div>

          {/* Podium for top 3 */}
          <div className="relative h-64 mb-12">
            {showPodium && (
              <div className="absolute bottom-0 w-full flex items-end justify-center">
                {/* Second place */}
                {topThree.length > 1 && (
                  <div className="podium-animation second-place mx-2 w-1/4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center mb-2 border-4 border-gray-700 text-2xl">
                        {topThree[1].player === username
                          ? localStorage.getItem("quizverse-avatar-emoji") || "😎"
                          : "🥈"}
                      </div>
                      <p className="text-center font-medium truncate w-full">{topThree[1].player}</p>
                      <p className="text-gray-400 text-sm">{topThree[1].score} pts</p>
                    </div>
                    <div className="h-24 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-lg"></div>
                  </div>
                )}

                {/* First place */}
                {topThree.length > 0 && (
                  <div className="podium-animation first-place mx-2 w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center mb-2 border-4 border-gray-700 text-3xl">
                        {topThree[0].player === username
                          ? localStorage.getItem("quizverse-avatar-emoji") || "😎"
                          : "🏆"}
                      </div>
                      <p className="text-center font-bold truncate w-full">{topThree[0].player}</p>
                      <p className="text-yellow-300 font-medium">{topThree[0].score} pts</p>
                    </div>
                    <div className="h-32 bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-t-lg"></div>
                  </div>
                )}

                {/* Third place */}
                {topThree.length > 2 && (
                  <div className="podium-animation third-place mx-2 w-1/4">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mb-2 border-4 border-gray-700 text-xl">
                        {topThree[2].player === username
                          ? localStorage.getItem("quizverse-avatar-emoji") || "😎"
                          : "🥉"}
                      </div>
                      <p className="text-center font-medium truncate w-full">{topThree[2].player}</p>
                      <p className="text-gray-400 text-sm">{topThree[2].score} pts</p>
                    </div>
                    <div className="h-16 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-lg"></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Full leaderboard */}
          <div className="gradient-border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>

            <div className="max-h-60 overflow-y-auto mb-6">
              <table className="w-full">
                <thead className="text-gray-400 text-sm">
                  <tr>
                    <th className="text-left pb-2 pl-2">Rank</th>
                    <th className="text-left pb-2">Player</th>
                    <th className="text-right pb-2 pr-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.map((entry, index) => (
                    <tr
                      key={entry.player}
                      className={`
                        ${entry.player === username ? "bg-purple-900/30 border border-purple-700" : "bg-gray-800/50"} 
                        rounded-lg mb-1
                      `}
                    >
                      <td className="py-2 pl-2 rounded-l-lg">{entry.rank}</td>
                      <td className="py-2">{entry.player}</td>
                      <td className="py-2 pr-2 text-right font-mono font-bold rounded-r-lg">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {username && (
              <div className="text-center mb-6">
                <p className="text-gray-300">
                  You placed <span className="font-bold text-white">{currentPlayerRank}</span> out of{" "}
                  {sortedPlayers.length} players
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={playAgain}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button
                onClick={() => {
                  playSound("click")
                  router.push("/")
                }}
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
