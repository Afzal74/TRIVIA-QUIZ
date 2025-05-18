"use client"

import { useState, useEffect } from "react"

interface TimerProps {
  duration: number
  onTimeUp: () => void
  isPaused: boolean
}

export default function Timer({ duration, onTimeUp, isPaused }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (isPaused) return

    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onTimeUp, isPaused])

  // Calculate percentage for the timer circle
  const percentage = (timeLeft / duration) * 100
  const circumference = 2 * Math.PI * 45 // 45 is the radius of the circle

  // Determine color based on time left
  let timerColor = "stroke-blue-500 dark:stroke-blue-400"
  if (timeLeft <= 5) {
    timerColor = "stroke-red-500 dark:stroke-red-400"
  } else if (timeLeft <= 10) {
    timerColor = "stroke-amber-500 dark:stroke-amber-400"
  }

  return (
    <div className="timer-container">
      <svg className="timer-svg" viewBox="0 0 100 100">
        <circle className="timer-bg" cx="50" cy="50" r="45" />
        <circle
          className={`timer-progress ${timerColor}`}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
        />
      </svg>
      <div className="timer-number">
        <span>{timeLeft}</span>
      </div>
    </div>
  )
}
