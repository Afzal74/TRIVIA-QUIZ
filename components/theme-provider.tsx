"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export type ThemeColors = {
  primary: string
  secondary: string
  accent: string
}

type ThemeContextType = {
  themeColor: string
  setThemeColor: (color: string) => void
  colors: ThemeColors
}

const ThemeContext = React.createContext<ThemeContextType>({
  themeColor: "purple",
  setThemeColor: () => null,
  colors: {
    primary: "138, 43, 226",
    secondary: "255, 0, 128",
    accent: "0, 255, 255"
  }
})

// Define color palettes for different themes
const colorPalettes: Record<string, ThemeColors> = {
  purple: {
    primary: "138, 43, 226",
    secondary: "255, 0, 128",
    accent: "0, 255, 255",
  },
  blue: {
    primary: "0, 122, 255",
    secondary: "88, 86, 214",
    accent: "64, 224, 208",
  },
  green: {
    primary: "52, 199, 89",
    secondary: "0, 179, 131",
    accent: "255, 204, 0",
  },
  red: {
    primary: "255, 59, 48",
    secondary: "255, 149, 0",
    accent: "175, 82, 222",
  },
  pink: {
    primary: "255, 45, 85",
    secondary: "175, 82, 222",
    accent: "0, 199, 190",
  },
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [themeColor, setThemeColor] = React.useState<string>("purple")
  const [colors, setColors] = React.useState<ThemeColors>(colorPalettes.purple)

  React.useEffect(() => {
    // Load saved theme color from localStorage
    const savedColor = localStorage.getItem("quizverse-theme-color")
    if (savedColor && colorPalettes[savedColor]) {
      setThemeColor(savedColor)
      setColors(colorPalettes[savedColor])
      applyThemeColor(colorPalettes[savedColor])
    }
  }, [])

  const handleSetThemeColor = React.useCallback((color: string) => {
    if (colorPalettes[color]) {
      setThemeColor(color)
      setColors(colorPalettes[color])
      localStorage.setItem("quizverse-theme-color", color)
      applyThemeColor(colorPalettes[color])
    }
  }, [])

  // Function to apply theme color to CSS variables
  const applyThemeColor = (colors: ThemeColors) => {
    const root = document.documentElement
    root.style.setProperty("--primary", colors.primary)
    root.style.setProperty("--secondary", colors.secondary)
    root.style.setProperty("--accent", colors.accent)
    
    // Update ring color to match primary
    root.style.setProperty("--ring", colors.primary)
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: handleSetThemeColor, colors }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Import from next-themes but don't export directly to avoid naming conflicts
import { useTheme as useNextTheme } from "next-themes"
