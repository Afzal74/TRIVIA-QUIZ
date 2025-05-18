"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import RecentWinnersLeaderboard from "@/components/home/recent-winners-leaderboard"
import DashboardAnalytics from "@/components/home/dashboard-analytics"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "analytics">("leaderboard")

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="glass-panel-darker inline-flex rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className={`px-4 py-2 rounded-md transition-all duration-200 ${
                    activeTab === "leaderboard"
                      ? "bg-purple-600/50 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Leaderboard
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-4 py-2 rounded-md transition-all duration-200 ${
                    activeTab === "analytics"
                      ? "bg-purple-600/50 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "leaderboard" ? (
                <div className="glass-panel-darker p-6 rounded-xl">
                  <RecentWinnersLeaderboard />
                </div>
              ) : (
                <div className="glass-panel-darker p-6 rounded-xl">
                  <DashboardAnalytics />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 