"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import RecentWinnersLeaderboard from "@/components/home/recent-winners-leaderboard"
import DashboardAnalytics from "@/components/home/dashboard-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeaderboardPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold gradient-text mb-2">Leaderboard & Analytics</h1>
            <p className="text-gray-400">Track your progress and compete with other players</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="leaderboard" className="w-full">
              <TabsList className="grid grid-cols-2 bg-gray-800">
                <TabsTrigger value="leaderboard" className="tab-trigger">Leaderboard</TabsTrigger>
                <TabsTrigger value="analytics" className="tab-trigger">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="leaderboard" className="mt-4 tab-content">
                <RecentWinnersLeaderboard />
              </TabsContent>
              <TabsContent value="analytics" className="mt-4 tab-content">
                <DashboardAnalytics />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 