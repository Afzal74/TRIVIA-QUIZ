"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

type ThemeContextType = {
  themeColor: string
  setThemeColor: (color: string) => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  themeColor: "purple",
  setThemeColor: () => null,
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [themeColor, setThemeColor] = React.useState<string>("purple")

  React.useEffect(() => {
    // Load saved theme color from localStorage
    const savedColor = localStorage.getItem("quizverse-theme-color")
    if (savedColor) {
      setThemeColor(savedColor)
    }

    // Apply the theme color to CSS variables
    applyThemeColor(savedColor || "purple")
  }, [])

  const handleSetThemeColor = React.useCallback((color: string) => {
    setThemeColor(color)
    localStorage.setItem("quizverse-theme-color", color)
    applyThemeColor(color)
  }, [])

  // Function to apply theme color to CSS variables
  const applyThemeColor = (color: string) => {
    const root = document.documentElement

    // Define color palettes for different themes
    const colorPalettes: Record<string, { primary: string; secondary: string; accent: string }> = {
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

    // Get the selected color palette or default to purple
    const palette = colorPalettes[color] || colorPalettes.purple

    // Apply the color palette to CSS variables
    root.style.setProperty("--primary", palette.primary)
    root.style.setProperty("--secondary", palette.secondary)
    root.style.setProperty("--accent", palette.accent)
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: handleSetThemeColor }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  const nextTheme = useNextTheme()

  return {
    ...context,
    ...nextTheme,
  }
}

// Import from next-themes but don't export directly to avoid naming conflicts
import { useTheme as useNextTheme } from "next-themes"
