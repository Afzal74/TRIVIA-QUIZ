"use client"

import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { User, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import ThemeColorSelector from "./theme-color-selector"
import { useTheme } from "./theme-provider"

export default function Header() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { colors } = useTheme()
  const [avatarEmoji, setAvatarEmoji] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAvatarEmoji(localStorage.getItem("quizverse-avatar-emoji"));
    }
  }, []);

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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
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
              <Link href="/" className="flex flex-col hover:opacity-80 transition-opacity group">
                <div className="relative">
                  {/* Animated glow effects */}
                  <motion.div
                    className="absolute -inset-2 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: `linear-gradient(45deg, rgba(${colors.primary}, 0.2), rgba(${colors.secondary}, 0.2))`,
                    }}
                  />
                  <motion.div
                    className="absolute -inset-2 rounded-lg blur-lg"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1.1, 1.3, 1.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    style={{
                      background: `linear-gradient(-45deg, rgba(${colors.secondary}, 0.2), rgba(${colors.accent}, 0.2))`,
                    }}
                  />
                  
                  <div className="relative">
                    <motion.div 
                      className="text-2xl font-bold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Text with animated glow */}
                      <motion.span 
                        className="bg-clip-text text-transparent bg-gradient-to-r inline-block" 
                        style={{
                          backgroundImage: `linear-gradient(to right, rgb(${colors.primary}), rgb(${colors.secondary}))`,
                        }}
                        animate={{
                          textShadow: [
                            `0 0 10px rgba(${colors.primary}, 0.2)`,
                            `0 0 20px rgba(${colors.primary}, 0.4)`,
                            `0 0 10px rgba(${colors.primary}, 0.2)`
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        QuizVerse
                      </motion.span>
                    </motion.div>
                    <motion.p 
                      className="text-sm bg-clip-text text-transparent bg-gradient-to-r relative z-10"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgb(${colors.secondary}), rgb(${colors.accent}))`,
                      }}
                      animate={{
                        textShadow: [
                          `0 0 8px rgba(${colors.secondary}, 0.2)`,
                          `0 0 15px rgba(${colors.secondary}, 0.3)`,
                          `0 0 8px rgba(${colors.secondary}, 0.2)`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      Knowledge
                    </motion.p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/notes">Notes</NavLink>
              <NavLink href="/#leaderboard-section">Leaderboard</NavLink>
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
                  className={`flex items-center justify-center rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 hover:border-gray-600/50 transition-all duration-300 cursor-pointer ${
                    isScrolled ? "w-9 h-9" : "w-10 h-10"
                  }`}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <User className={`text-gray-100 transition-all duration-300 ${isScrolled ? "w-4 h-4" : "w-5 h-5"}`} />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{ mixBlendMode: "overlay" }}
                  />
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 hover:border-gray-600/50 transition-all duration-300 w-10 h-10"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-100" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-100" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute right-0 top-0 h-full w-64 bg-gray-900/95 border-l border-gray-800 shadow-xl"
            >
              <div className="flex flex-col p-6 pt-[50px] space-y-4">
                <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink href="/notes" onClick={() => setIsMobileMenuOpen(false)}>
                  Notes
                </MobileNavLink>
                <MobileNavLink href="/#leaderboard-section" onClick={() => setIsMobileMenuOpen(false)}>
                  Leaderboard
                </MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </MobileNavLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <Link
        href={href}
        className="text-gray-300 hover:text-white transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm cursor-pointer"
      >
        {children}
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm ${
        href === "/" ? "mt-[50px]" : ""
      }`}
    >
      {children}
    </Link>
  )
}

