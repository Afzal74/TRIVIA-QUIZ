"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { NavLink } from "@/components/nav-link"
import ThemeColorSelector from "@/components/theme-color-selector"

export default function Header() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-xl" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <Link href="/" className="text-xl font-bold gradient-text">
              QuizVerse
            </Link>
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
              Knowledge
            </p>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/notes">Notes</NavLink>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Theme Controls and Profile */}
          <div className="flex items-center space-x-4">
            <ThemeColorSelector />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                href="/profile"
                className={`flex items-center justify-center rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 hover:border-gray-600/50 transition-all duration-300 ${
                  isScrolled ? "w-9 h-9" : "w-10 h-10"
                }`}
              >
                <User className={`text-gray-100 transition-all duration-300 ${
                  isScrolled ? "w-4 h-4" : "w-5 h-5"
                }`} />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ mixBlendMode: "overlay" }}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

