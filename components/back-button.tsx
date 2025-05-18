"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function BackButton() {
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.back()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 flex items-center justify-center p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/60 hover:border-gray-600/50 transition-all duration-300"
    >
      <ArrowLeft className="h-5 w-5 text-gray-300" />
    </motion.button>
  )
} 