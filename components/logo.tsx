"use client"

import type { FC } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

interface LogoProps {
  className?: string
  animate?: boolean
  useFixedColors?: boolean
}

const Logo: FC<LogoProps> = ({ className = "h-10 w-auto", animate = true, useFixedColors = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()
  const { colors } = useTheme()
  
  // Define fixed colors for theme-independent mode
  const fixedColors = {
    primary: "147, 51, 234",    // Purple
    secondary: "236, 72, 153",  // Pink
    accent: "14, 165, 233"      // Sky blue
  }

  // Use either fixed colors or theme colors
  const activeColors = useFixedColors ? fixedColors : colors

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
    initial: { scale: 0.8, opacity: 0.3 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.3,
      opacity: 0.6,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const secondaryGlowVariants = {
    initial: { scale: 1, opacity: 0.2 },
    animate: {
      scale: [1, 1.4, 1],
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }
    },
    hover: {
      scale: 1.5,
      opacity: 0.5,
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
        className="absolute inset-0 blur-2xl"
        style={{
          background: `linear-gradient(to right, rgba(${activeColors.primary}, 0.4), rgba(${activeColors.secondary}, 0.4), rgba(${activeColors.accent}, 0.4))`,
          boxShadow: `0 0 30px rgba(${activeColors.primary}, 0.2)`
        }}
      />
      <motion.div
        variants={animate ? secondaryGlowVariants : undefined}
        className="absolute inset-0 blur-3xl mix-blend-screen"
        style={{
          background: `linear-gradient(to right, rgba(${activeColors.accent}, 0.3), rgba(${activeColors.primary}, 0.3), rgba(${activeColors.secondary}, 0.3))`,
          boxShadow: `0 0 40px rgba(${activeColors.accent}, 0.2)`
        }}
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
                className="text-2xl font-black tracking-tight bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(to bottom right, rgba(${activeColors.primary}, 1), rgba(${activeColors.primary}, 0.8))`,
                  textShadow: `0 0 20px rgba(${activeColors.primary}, 0.2)`,
                  WebkitBackgroundClip: "text",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
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
                className="text-2xl font-black tracking-tight bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(to bottom right, rgba(${activeColors.secondary}, 1), rgba(${activeColors.secondary}, 0.8))`,
                  textShadow: `0 0 20px rgba(${activeColors.secondary}, 0.2)`,
                  WebkitBackgroundClip: "text",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
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
              <span 
                className="text-sm font-medium bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(to right, rgba(${activeColors.primary}, 1), rgba(${activeColors.secondary}, 1), rgba(${activeColors.accent}, 1))`,
                  WebkitBackgroundClip: "text",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))"
                }}
              >
                {subtitles[currentSubtitleIndex]}
              </span>
            )}
          </motion.div>
        </div>

        {/* Enhanced decorative elements with more prominent glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full"
          style={{
            background: `rgba(${activeColors.accent}, 1)`,
            boxShadow: `0 0 15px rgba(${activeColors.accent}, 0.4)`
          }}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9
          }}
          className="absolute -left-1 -bottom-1 w-2.5 h-2.5 rounded-full"
          style={{
            background: `rgba(${activeColors.primary}, 1)`,
            boxShadow: `0 0 15px rgba(${activeColors.primary}, 0.4)`
          }}
        />

        {/* Additional sparkle effects on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{
            background: [
              `radial-gradient(circle at 30% 20%, rgba(${activeColors.primary}, 0.2) 0%, transparent 50%)`,
              `radial-gradient(circle at 70% 60%, rgba(${activeColors.secondary}, 0.2) 0%, transparent 50%)`,
              `radial-gradient(circle at 30% 20%, rgba(${activeColors.primary}, 0.2) 0%, transparent 50%)`
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
