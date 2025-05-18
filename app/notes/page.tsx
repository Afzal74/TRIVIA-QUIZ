"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import NotesSection from "@/components/home/notes-section"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function NotesPage() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8 gradient-text text-center">Study Notes & Resources</h1>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Explore our curated collection of study materials, practice resources, and interactive learning tools across different subjects.
            </p>
            
            <NotesSection />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
} 