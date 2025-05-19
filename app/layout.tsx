import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/components/audio-provider"
import AnimatedBackground from "@/components/animated-background"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

/**
 * Metadata configuration for the application
 * Defines the title and description that appear in browser tabs and search results
 */
export const metadata: Metadata = {
  title: "QuizVerse - Multiplayer Quiz Game",
  description: "Challenge your friends in real-time multiplayer quizzes"
}

/**
 * RootLayout Component
 * 
 * The root layout component that wraps all pages in the application.
 * Provides essential providers and layout structure:
 * - Theme provider for dark/light mode
 * - Audio provider for sound effects
 * - Animated background
 * - Header navigation
 * - Toast notifications
 * 
 * @param children - React nodes to be rendered within the layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        {/* Theme provider for dark/light mode support */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Audio provider for sound effects and background music */}
          <AudioProvider>
            {/* Animated background component */}
            <AnimatedBackground />
            {/* Global header navigation */}
            <Header />
            {/* Main content area with top padding for header */}
            <main className="pt-24 md:pt-20">
              {children}
            </main>
            {/* Toast notifications container */}
            <Toaster />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
