"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ThemeToggleProps {
  className?: string
  size?: "default" | "sm" | "lg"
  variant?: "default" | "ghost" | "outline"
}

export default function ThemeToggle({
  className,
  size = "default",
  variant = "default",
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sizeClasses = {
    default: "h-10 w-10",
    sm: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const variantClasses = {
    default: "bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  }

  const iconSize = {
    default: "h-5 w-5",
    sm: "h-4 w-4",
    lg: "h-6 w-6",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "rounded-lg transition-colors",
              sizeClasses[size],
              variantClasses[variant],
              className
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? (
                <Sun className={cn("text-amber-500", iconSize[size])} />
              ) : (
                <Moon className={cn("text-blue-500", iconSize[size])} />
              )}
            </motion.div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme === "dark" ? "light" : "dark"} theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
