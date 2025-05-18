import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/components/audio-provider"
import AnimatedBackground from "@/components/animated-background"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuizVerse - Multiplayer Quiz Game",
  description: "Challenge your friends in real-time multiplayer quizzes"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AudioProvider>
            <AnimatedBackground />
            <Header />
            <main className="pt-24 md:pt-28">
              {children}
            </main>
            <Toaster />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
