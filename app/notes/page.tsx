"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import NotesSection from "@/components/home/notes-section"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotesPage() {
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
            <div className="flex items-center mb-8">
              <Link
                href="/"
                className="flex items-center text-gray-400 hover:text-white transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </Link>
              <h1 className="text-4xl font-bold gradient-text text-center flex-1">Study Notes & Resources</h1>
            </div>
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