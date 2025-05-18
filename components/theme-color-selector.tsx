"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const colors = [
  { name: "purple", class: "bg-[rgb(138,43,226)]" },
  { name: "blue", class: "bg-[rgb(0,122,255)]" },
  { name: "green", class: "bg-[rgb(52,199,89)]" },
  { name: "red", class: "bg-[rgb(255,59,48)]" },
  { name: "pink", class: "bg-[rgb(255,45,85)]" }
]

export default function ThemeColorSelector() {
  const { themeColor, setThemeColor } = useTheme()

  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => setThemeColor(color.name)}
          className={cn(
            "w-6 h-6 rounded-full relative cursor-pointer transition-transform hover:scale-110",
            color.class
          )}
          aria-label={`Set ${color.name} theme`}
        >
          {themeColor === color.name && (
            <motion.div
              layoutId="activeThemeColor"
              className="absolute inset-0 rounded-full border-2 border-white"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
} 