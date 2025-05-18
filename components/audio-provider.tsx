"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useRef } from "react"

type AudioType = "click" | "correct" | "wrong" | "start" | "join" | "timeout" | "victory" | "background" | "error"

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
  playSound: (type: AudioType, loop?: boolean) => void
  stopSound: (type: AudioType) => void
}

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
  playSound: () => {},
  stopSound: () => {},
})

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const audioRefs = useRef<Record<AudioType, HTMLAudioElement | null>>({
    click: null,
    correct: null,
    wrong: null,
    start: null,
    join: null,
    timeout: null,
    victory: null,
    background: null,
    error: null,
  })

  // Initialize audio elements
  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if user previously muted audio
    const storedMuteState = localStorage.getItem("quizverse-muted")
    if (storedMuteState) {
      setIsMuted(storedMuteState === "true")
    }

    // Create audio elements with actual sound URLs
    // In a real app, these would be actual sound files
    audioRefs.current = {
      click: new Audio("/placeholder.svg?height=1&width=1"), // Replace with actual sound files
      correct: new Audio("/placeholder.svg?height=1&width=1"),
      wrong: new Audio("/placeholder.svg?height=1&width=1"),
      start: new Audio("/placeholder.svg?height=1&width=1"),
      join: new Audio("/placeholder.svg?height=1&width=1"),
      timeout: new Audio("/placeholder.svg?height=1&width=1"),
      victory: new Audio("/placeholder.svg?height=1&width=1"),
      background: new Audio("/placeholder.svg?height=1&width=1"), // Background music
      error: new Audio("/placeholder.svg?height=1&width=1"),
    }

    // Set volume levels
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = 0.5
      }
    })

    // Background music should be quieter
    if (audioRefs.current.background) {
      audioRefs.current.background.volume = 0.2
      audioRefs.current.background.loop = true
    }

    setIsInitialized(true)
  }, [])

  // Update muted state for all audio elements
  useEffect(() => {
    if (!isInitialized) return

    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.muted = isMuted
      }
    })

    // Store mute preference
    localStorage.setItem("quizverse-muted", isMuted.toString())
  }, [isMuted, isInitialized])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const playSound = (type: AudioType, loop = false) => {
    if (!isInitialized) return

    const audio = audioRefs.current[type]
    if (audio) {
      audio.currentTime = 0
      audio.loop = loop
      audio.play().catch((e) => console.log("Audio play prevented:", e))
    }
  }

  const stopSound = (type: AudioType) => {
    if (!isInitialized) return

    const audio = audioRefs.current[type]
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }

  return <AudioContext.Provider value={{ isMuted, toggleMute, playSound, stopSound }}>{children}</AudioContext.Provider>
}

export const useAudio = () => useContext(AudioContext)
