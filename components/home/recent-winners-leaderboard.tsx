"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Crown, Medal, Award, Users } from "lucide-react"

// Mock data for recent winners
const mockWinners = [
  { id: 1, name: "QuizMaster42", score: 1250, games: 12, winRate: 75 },
  { id: 2, name: "BrainiacGamer", score: 1180, games: 10, winRate: 70 },
  { id: 3, name: "TriviaKing", score: 1120, games: 15, winRate: 60 },
  { id: 4, name: "KnowledgeQueen", score: 980, games: 8, winRate: 62 },
  { id: 5, name: "QuizWizard", score: 920, games: 11, winRate: 55 },
  { id: 6, name: "BrainGenius", score: 890, games: 9, winRate: 56 },
  { id: 7, name: "FactHunter", score: 850, games: 7, winRate: 57 },
  { id: 8, name: "QuizChampion", score: 820, games: 14, winRate: 50 },
  { id: 9, name: "MindMaster", score: 780, games: 6, winRate: 67 },
  { id: 10, name: "TriviaGuru", score: 750, games: 5, winRate: 60 },
]

// Mock total players data
const TOTAL_PLAYERS = 15000;
const USER_POSITION = 9300;

export default function RecentWinnersLeaderboard() {
  const [winners, setWinners] = useState(mockWinners)
  const [filter, setFilter] = useState<"score" | "games" | "winRate">("score")
  const [username, setUsername] = useState("")

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("quizverse-username")
    if (storedUsername) {
      setUsername(storedUsername)
    }

    // Sort winners based on the selected filter
    const sortedWinners = [...mockWinners].sort((a, b) => b[filter] - a[filter])
    setWinners(sortedWinners)
  }, [filter])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold gradient-text">Top Players</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => setFilter("score")}
            className={`px-2 py-1 text-xs rounded backdrop-blur-sm ${
              filter === "score" ? "bg-purple-600/90 text-white shadow-lg" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            Score
          </button>
          <button
            onClick={() => setFilter("games")}
            className={`px-2 py-1 text-xs rounded backdrop-blur-sm ${
              filter === "games" ? "bg-purple-600/90 text-white shadow-lg" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setFilter("winRate")}
            className={`px-2 py-1 text-xs rounded backdrop-blur-sm ${
              filter === "winRate" ? "bg-purple-600/90 text-white shadow-lg" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            Win %
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {winners.map((winner, index) => (
          <motion.div
            key={winner.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex items-center p-3 backdrop-blur-xl leaderboard-item ${
              index < 3 
                ? "bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/50 shadow-lg" 
                : "bg-gray-800/40"
            } rounded-lg`}
          >
            <div className="w-8 flex justify-center">
              {index === 0 ? (
                <Crown className="h-5 w-5 text-yellow-400" />
              ) : index === 1 ? (
                <Medal className="h-5 w-5 text-gray-400" />
              ) : index === 2 ? (
                <Award className="h-5 w-5 text-amber-600" />
              ) : (
                <span className="text-gray-400 font-mono">{index + 1}</span>
              )}
            </div>

            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 shadow-lg ${
                    index === 0
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      : index === 1
                        ? "bg-gradient-to-br from-gray-300 to-gray-500"
                        : index === 2
                          ? "bg-gradient-to-br from-amber-600 to-amber-800"
                          : "bg-gradient-to-br from-purple-500 to-pink-500"
                  }`}
                >
                  {winner.name.charAt(0).toUpperCase()}
                </div>
                <span className={index < 3 ? "font-medium text-white" : "text-gray-300"}>{winner.name}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-gray-400">Score</div>
                <div className={`font-mono ${index < 3 ? "font-bold text-white" : "text-gray-300"}`}>{winner.score}</div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400">Games</div>
                <div className={`font-mono ${index < 3 ? "text-white" : "text-gray-300"}`}>{winner.games}</div>
              </div>

              <div className="text-right w-12">
                <div className="text-xs text-gray-400">Win %</div>
                <div className={`font-mono ${index < 3 ? "text-white" : "text-gray-300"}`}>{winner.winRate}%</div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* User's Global Position */}
        <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Your Global Position</div>
                <div className="text-lg font-bold text-white">
                  {USER_POSITION.toLocaleString()}
                  <span className="text-sm text-gray-400 ml-1">
                    of {TOTAL_PLAYERS.toLocaleString()} players
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">Top</div>
              <div className="text-lg font-bold text-purple-400">
                {Math.round((USER_POSITION / TOTAL_PLAYERS) * 100)}%
              </div>
            </div>
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${100 - (USER_POSITION / TOTAL_PLAYERS) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
