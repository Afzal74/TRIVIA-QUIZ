"use client"

import { useState, useEffect, useCallback } from "react"
import { Settings, Clock, Brain, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface RoomSettingsProps {
  isHost: boolean
  roomCode: string
  onSettingsChange: (settings: any) => void
}

interface GameSettings {
  difficulty: string
  subject: string
  questionTime: number
  questionsCount: number
}

export default function RoomSettings({ isHost, roomCode, onSettingsChange }: RoomSettingsProps) {
  const [settings, setSettings] = useState<GameSettings>(() => {
    const storedGameData = localStorage.getItem(`quizverse-game-${roomCode}`)
    if (storedGameData) {
      const gameData = JSON.parse(storedGameData)
      return {
        difficulty: gameData.difficulty || "average",
        subject: gameData.subject || "all",
        questionTime: gameData.questionTime || 15,
        questionsCount: gameData.questionsCount || 15,
      }
    }
    return {
      difficulty: "average",
      subject: "all",
      questionTime: 15,
      questionsCount: 15,
    }
  })

  const handleSettingChange = useCallback((key: keyof GameSettings, value: string | number) => {
    if (!isHost) return

    const newSettings = {
      ...settings,
      [key]: value,
    }
    setSettings(newSettings)

    // Update localStorage
    const storedGameData = localStorage.getItem(`quizverse-game-${roomCode}`)
    if (storedGameData) {
      const gameData = JSON.parse(storedGameData)
      localStorage.setItem(
        `quizverse-game-${roomCode}`,
        JSON.stringify({
          ...gameData,
          ...newSettings,
        })
      )
    }

    // Notify parent component
    onSettingsChange(newSettings)
  }, [isHost, roomCode, settings, onSettingsChange])

  if (!isHost) {
    return (
      <div className="gradient-border p-6">
        <div className="flex items-center mb-6">
          <Settings className="w-5 h-5 mr-2 text-purple-400" />
          <h2 className="text-xl font-semibold">Room Settings</h2>
          <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
            Only host can change settings
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
              <Brain className="h-4 w-4 mr-1 text-purple-400" />
              Difficulty
            </div>
            <div className="text-lg font-medium capitalize">{settings.difficulty}</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
              <Book className="h-4 w-4 mr-1 text-cyan-400" />
              Subject
            </div>
            <div className="text-lg font-medium capitalize">
              {settings.subject === "all" ? "All Subjects" : settings.subject}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
              <Clock className="h-4 w-4 mr-1 text-pink-400" />
              Time/Question
            </div>
            <div className="text-lg font-medium">{settings.questionTime}s</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
              <Settings className="h-4 w-4 mr-1 text-yellow-400" />
              Questions
            </div>
            <div className="text-lg font-medium">{settings.questionsCount}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gradient-border p-6">
      <div className="flex items-center mb-6">
        <Settings className="w-5 h-5 mr-2 text-purple-400" />
        <h2 className="text-xl font-semibold">Room Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Difficulty</label>
            <Select
              value={settings.difficulty}
              onValueChange={(value) => handleSettingChange("difficulty", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Subject</label>
            <Select
              value={settings.subject}
              onValueChange={(value) => handleSettingChange("subject", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="social">Social Studies</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="general">General Knowledge</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Time per Question (seconds)</label>
            <Select
              value={settings.questionTime.toString()}
              onValueChange={(value) => handleSettingChange("questionTime", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 seconds</SelectItem>
                <SelectItem value="15">15 seconds</SelectItem>
                <SelectItem value="20">20 seconds</SelectItem>
                <SelectItem value="30">30 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Number of Questions</label>
            <Select
              value={settings.questionsCount.toString()}
              onValueChange={(value) => handleSettingChange("questionsCount", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 questions</SelectItem>
                <SelectItem value="15">15 questions</SelectItem>
                <SelectItem value="20">20 questions</SelectItem>
                <SelectItem value="25">25 questions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Brain className="h-4 w-4 mr-1 text-purple-400" />
            Difficulty
          </div>
          <div className="text-lg font-medium capitalize">{settings.difficulty}</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Book className="h-4 w-4 mr-1 text-cyan-400" />
            Subject
          </div>
          <div className="text-lg font-medium capitalize">
            {settings.subject === "all" ? "All Subjects" : settings.subject}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Clock className="h-4 w-4 mr-1 text-pink-400" />
            Time/Question
          </div>
          <div className="text-lg font-medium">{settings.questionTime}s</div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            <Settings className="h-4 w-4 mr-1 text-yellow-400" />
            Questions
          </div>
          <div className="text-lg font-medium">{settings.questionsCount}</div>
        </div>
      </div>
    </div>
  )
} 