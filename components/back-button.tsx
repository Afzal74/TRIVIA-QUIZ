"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BackButtonProps {
  className?: string
  tooltipText?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
}

export default function BackButton({
  className,
  tooltipText = "Go back",
  variant = "default",
  size = "default",
}: BackButtonProps) {
  const router = useRouter()
  const [startedFromHome, setStartedFromHome] = useState(false)

  useEffect(() => {
    // Check if we started from home page
    const referrer = document.referrer
    const isFromHome = referrer.endsWith('/') || referrer === '' || referrer.endsWith('/trivia-quiz')
    setStartedFromHome(isFromHome)
  }, [])

  const handleBack = () => {
    if (startedFromHome) {
      router.push('/')
    } else {
      window.history.go(-1)
    }
  }

  const sizeClasses = {
    default: "h-10 w-10",
    sm: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const variantClasses = {
    default: "bg-background/80 backdrop-blur-sm border border-border hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "fixed top-6 left-6 z-50 flex items-center justify-center rounded-lg transition-all duration-300",
              sizeClasses[size],
              variantClasses[variant],
              className
            )}
            aria-label="Go back"
          >
            <ArrowLeft className={cn(
              "text-foreground",
              size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
            )} />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 