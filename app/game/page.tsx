"use client"

import { useSearchParams } from "next/navigation"
import GameInitializer from "@/components/game-initializer"
import { useEffect } from "react"

export default function GamePage() {
  const searchParams = useSearchParams()
  
  const roomCode = searchParams.get("code") || ""
  const username = searchParams.get("username") || ""
  const difficulty = searchParams.get("difficulty") || "average"
  const category = searchParams.get("subject") || "all"

  useEffect(() => {
    console.log("Game Page Parameters:", {
      roomCode,
      username,
      difficulty,
      category
    })
  }, [roomCode, username, difficulty, category])

  // Validate username format
  const isValidUsername = (username: string): boolean => {
    return /^[A-Za-z0-9\s]{3,20}$/.test(username.trim())
  }

  if (!roomCode || !username || !isValidUsername(username)) {
    console.log("Missing or invalid parameters:", { roomCode, username })
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-panel-darker p-6 rounded-xl text-center">
          <h2 className="text-xl font-medium text-red-500">Invalid Game Parameters</h2>
          <p className="mt-2 text-gray-300">Missing required game parameters.</p>
          <div className="mt-4 text-sm text-gray-400">
            <p>Room Code: {roomCode ? "✓" : "✗"}</p>
            <p>Username: {username ? (isValidUsername(username) ? "✓" : "✗ (must be 3-20 characters, letters, numbers, spaces)") : "✗"}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <GameInitializer
      category={category}
      difficulty={difficulty}
      roomCode={roomCode}
      username={username}
    />
  )
} 