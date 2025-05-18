"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { User } from "lucide-react"
import { useEffect, useState } from "react"
import ThemeColorSelector from "./theme-color-selector"

export default function Header() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  // Header background opacity based on scroll
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  
  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-6"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        style={{ opacity: headerBgOpacity }}
      />
      
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
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/practice">Practice</NavLink>
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
                className={`flex items-center justify-center rounded-full bg-gray-900/60 backdrop-blur-sm border border-gray-800 hover:bg-gray-800/80 transition-all duration-300 ${
                  isScrolled ? "w-9 h-9" : "w-10 h-10"
                }`}
              >
                <User className={`text-white transition-all duration-300 ${
                  isScrolled ? "w-4 h-4" : "w-5 h-5"
                }`} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100"
        initial={false}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}

