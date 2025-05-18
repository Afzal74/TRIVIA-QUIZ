"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <Link
        href={href}
        className={`text-gray-300 hover:text-white transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm ${
          isActive ? "text-white bg-gray-800/50" : ""
        }`}
      >
        {children}
        <motion.div
          className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  )
} 