"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimerProps {
  duration: number
  onTimeUp: () => void
  isPaused: boolean
  className?: string
  showWarning?: boolean
}

export default function Timer({ 
  duration, 
  onTimeUp, 
  isPaused, 
  className,
  showWarning = true 
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isWarning, setIsWarning] = useState(false)

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

  useEffect(() => {
    if (showWarning && timeLeft <= 5) {
      setIsWarning(true)
      const warningTimer = setTimeout(() => setIsWarning(false), 1000)
      return () => clearTimeout(warningTimer)
    }
  }, [timeLeft, showWarning])

  // Calculate percentage for the timer circle
  const percentage = (timeLeft / duration) * 100
  const circumference = 2 * Math.PI * 45 // 45 is the radius of the circle

  // Determine color based on time left
  const getTimerColor = () => {
    if (timeLeft <= 5) return "stroke-red-500 dark:stroke-red-400"
    if (timeLeft <= 10) return "stroke-amber-500 dark:stroke-amber-400"
    return "stroke-blue-500 dark:stroke-blue-400"
  }

  return (
    <div className={cn("relative w-24 h-24", className)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="stroke-muted"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          className={getTimerColor()}
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Timer number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={timeLeft}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className={cn(
              "text-2xl font-bold",
              timeLeft <= 5 ? "text-red-500 dark:text-red-400" : 
              timeLeft <= 10 ? "text-amber-500 dark:text-amber-400" : 
              "text-blue-500 dark:text-blue-400"
            )}
          >
            {timeLeft}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Warning animation */}
      <AnimatePresence>
        {isWarning && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-red-500/20 animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
