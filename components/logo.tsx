"use client"

import type { FC } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { useState } from "react"

interface LogoProps {
  className?: string
  animate?: boolean
}

const Logo: FC<LogoProps> = ({ className = "h-10 w-auto", animate = true }) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()
  const subtitles = [
    "Test Your Knowledge",
    "Challenge Your Mind",
    "Learn & Grow",
    "Play & Learn Together"
  ]
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)

  const typewriterVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "auto",
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0
      }
    }
  }

  const handleHoverStart = async () => {
    setIsHovered(true)
    await controls.start("visible")
    // Change subtitle after current one is fully typed
    const timer = setTimeout(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length)
    }, 4000)
    return () => clearTimeout(timer)
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    controls.start("hidden")
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }),
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  const primaryGlowVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: {
      scale: [0.8, 1.3, 0.8],
      opacity: [0.5, 0.9, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.4,
      opacity: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const secondaryGlowVariants = {
    initial: { scale: 1, opacity: 0.3 },
    animate: {
      scale: [1, 1.6, 1],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }
    },
    hover: {
      scale: 1.7,
      opacity: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className={`relative ${className} select-none cursor-pointer group`}
      whileHover="hover"
      initial="initial"
      animate="animate"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* Enhanced multi-layered animated glow effect */}
      <motion.div
        variants={animate ? primaryGlowVariants : undefined}
        className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/90 via-pink-500/90 to-cyan-500/90 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)]"
      />
      <motion.div
        variants={animate ? secondaryGlowVariants : undefined}
        className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500/70 via-purple-500/70 to-pink-500/70 rounded-full mix-blend-screen shadow-[0_0_40px_rgba(34,211,238,0.4)]"
      />
      
      {/* Main logo container with enhanced shadow */}
      <div className="relative flex flex-col items-center justify-center h-full">
        <div className="flex items-baseline space-x-1">
          {/* Quiz text with enhanced effects */}
          <div className="flex">
            {["Q", "u", "i", "z"].map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={animate ? letterVariants : undefined}
                className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-purple-300 to-purple-600 drop-shadow-[0_2px_4px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_4px_8px_rgba(168,85,247,0.6)]"
                style={{
                  textShadow: "0 0 20px rgba(168,85,247,0.3)"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Verse text with enhanced effects */}
          <div className="flex">
            {["V", "e", "r", "s", "e"].map((letter, i) => (
              <motion.span
                key={i}
                custom={i + 4}
                variants={animate ? letterVariants : undefined}
                className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-pink-300 to-pink-600 drop-shadow-[0_2px_4px_rgba(236,72,153,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_4px_8px_rgba(236,72,153,0.6)]"
                style={{
                  textShadow: "0 0 20px rgba(236,72,153,0.3)"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Typewriter effect subtitle */}
        <div className="h-6 relative">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={typewriterVariants}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden"
          >
            {isHovered && (
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                {subtitles[currentSubtitleIndex]}
              </span>
            )}
          </motion.div>
        </div>

        {/* Enhanced decorative elements with more prominent glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9
          }}
          className="absolute -left-1 -bottom-1 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.7)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.9)]"
        />

        {/* Additional sparkle effects on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(236,72,153,0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.4) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}

export default Logo
