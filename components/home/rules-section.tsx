"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Clock, Award, Users, Brain } from "lucide-react"

export default function RulesSection() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gray-400 hover:text-white">
          <HelpCircle className="h-4 w-4 mr-2" />
          How to Play
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">How to Play QuizVerse</DialogTitle>
          <DialogDescription>Learn the rules and get started with our multiplayer quiz game.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basics" className="mt-4">
          <TabsList className="grid grid-cols-4 bg-gray-800">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="scoring">Scoring</TabsTrigger>
            <TabsTrigger value="multiplayer">Multiplayer</TabsTrigger>
          </TabsList>
          <TabsContent value="basics" className="p-4 bg-gray-800/50 rounded-md mt-2">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              Game Basics
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>
                  <strong>Create or Join:</strong> Start by creating a new quiz room or joining an existing one with a
                  room code.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>
                  <strong>Select Difficulty:</strong> Choose between Easy, Average, or Hard difficulty levels.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>
                  <strong>Question Types:</strong> You'll encounter three types of questions: multiple choice, checkbox
                  (select all that apply), and sortable (arrange in order).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>
                  <strong>Time Limit:</strong> Each question has a time limit. Answer before time runs out!
                </span>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="questions" className="p-4 bg-gray-800/50 rounded-md mt-2">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-pink-400" />
              Question Types
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>
                  <strong>Multiple Choice:</strong> Select one correct answer from the options provided.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>
                  <strong>Checkbox Questions:</strong> Select all correct answers from the options provided.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>
                  <strong>Sortable Questions:</strong> Drag and arrange items in the correct order.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                <span>
                  <strong>Time Limits:</strong> Easy (30s), Average (20s), Hard (15s) per question.
                </span>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="scoring" className="p-4 bg-gray-800/50 rounded-md mt-2">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Award className="h-5 w-5 mr-2 text-cyan-400" />
              Scoring System
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <strong>Base Points:</strong> 100 points for each correct answer.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <strong>Time Bonus:</strong> The faster you answer, the more bonus points you earn (up to 100
                  additional points).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <strong>Difficulty Bonus:</strong> Easy (no bonus), Average (+25% points), Hard (+50% points).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                  <strong>Streak Bonus:</strong> Answer multiple questions correctly in a row for bonus points.
                </span>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="multiplayer" className="p-4 bg-gray-800/50 rounded-md mt-2">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2 text-yellow-400" />
              Multiplayer Features
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                  <strong>Room Codes:</strong> Share your unique 6-character room code with friends to invite them.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                  <strong>Bot Players:</strong> Add up to 15 AI opponents if you want more competition.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                  <strong>Live Leaderboard:</strong> See scores update in real-time during the game.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                  <strong>Winner Podium:</strong> At the end, the top 3 players are celebrated on a podium.
                </span>
              </li>
            </ul>
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-4 bg-purple-900/20 border border-purple-800/50 rounded-md">
          <h4 className="font-medium mb-1">Pro Tip</h4>
          <p className="text-sm text-gray-300">
            Use keyboard shortcuts for faster answers: 1-4 for multiple choice, Space to submit, and Tab to navigate
            between options.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
