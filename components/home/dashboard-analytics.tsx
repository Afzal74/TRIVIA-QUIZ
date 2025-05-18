"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Award, Clock, Brain, BarChart2, TrendingUp, Calendar } from "lucide-react"

// Mock data for analytics
const mockAnalytics = {
  totalGames: 1287,
  activePlayers: 342,
  averageScore: 76,
  completionRate: 89,
  questionsAnswered: 45928,
  averageTimePerQuestion: 12.4, // in seconds
  categoryPerformance: {
    Science: 82,
    History: 68,
    Geography: 74,
    Entertainment: 79,
    Technology: 85,
    Art: 71,
  },
  weeklyGames: [42, 38, 56, 48, 62, 51, 68],
  weeklyPlayers: [124, 118, 132, 145, 156, 148, 172],
}

export default function DashboardAnalytics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold gradient-text mb-4">Game Analytics</h3>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 bg-gray-800">
          <TabsTrigger value="overview" className="tab-trigger">Overview</TabsTrigger>
          <TabsTrigger value="performance" className="tab-trigger">Performance</TabsTrigger>
          <TabsTrigger value="trends" className="tab-trigger">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4 tab-content">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gray-800/50 border-gray-700 analytics-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-gray-400">
                  <Users className="h-4 w-4 mr-2 text-purple-400" />
                  Active Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockAnalytics.activePlayers}</div>
                <p className="text-xs text-green-400 mt-1">+12% from last week</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 analytics-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-gray-400">
                  <Award className="h-4 w-4 mr-2 text-pink-400" />
                  Total Games
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockAnalytics.totalGames}</div>
                <p className="text-xs text-green-400 mt-1">+8% from last week</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 analytics-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-gray-400">
                <Brain className="h-4 w-4 mr-2 text-cyan-400" />
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">{mockAnalytics.averageScore}%</div>
                <Progress value={mockAnalytics.averageScore} className="h-2 flex-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 analytics-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-2 text-yellow-400" />
                Avg. Time per Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.averageTimePerQuestion}s</div>
              <p className="text-xs text-blue-400 mt-1">-0.8s from last week</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 mt-4 tab-content">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center text-gray-400">
                <BarChart2 className="h-4 w-4 mr-2 text-purple-400" />
                Category Performance
              </CardTitle>
              <CardDescription>Average scores by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(mockAnalytics.categoryPerformance).map(([category, score]) => (
                <div key={category} className="progress-bar-container rounded-lg p-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{category}</span>
                    <span className="text-sm font-medium">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4 mt-4 tab-content">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center text-gray-400">
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                Weekly Activity
              </CardTitle>
              <CardDescription>Games played over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[120px] flex items-end justify-between">
                {mockAnalytics.weeklyGames.map((count, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t"
                      style={{ height: `${(count / Math.max(...mockAnalytics.weeklyGames)) * 100}px` }}
                    ></div>
                    <span className="text-xs mt-1">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center text-gray-400">
                <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                Player Engagement
              </CardTitle>
              <CardDescription>Active players over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[120px] flex items-end justify-between">
                {mockAnalytics.weeklyPlayers.map((count, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-gradient-to-t from-cyan-600 to-blue-600 rounded-t"
                      style={{ height: `${(count / Math.max(...mockAnalytics.weeklyPlayers)) * 100}px` }}
                    ></div>
                    <span className="text-xs mt-1">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
