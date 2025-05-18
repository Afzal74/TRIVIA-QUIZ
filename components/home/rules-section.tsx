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
import { motion } from "framer-motion"

export default function RulesSection() {
  const [open, setOpen] = useState(false)

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="link" 
          className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-105 transform"
        >
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
            {["basics", "questions", "scoring", "multiplayer"].map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab}
                className="transition-all duration-200 hover:bg-gray-700 data-[state=active]:bg-purple-900/30"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="basics" className="p-4 bg-gray-800/50 rounded-md mt-2 transition-all duration-200 hover:bg-gray-800/70">
            <motion.h3 
              className="text-lg font-semibold mb-2 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              Game Basics
            </motion.h3>
            <motion.ul 
              className="space-y-2 text-gray-300"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { title: "Create or Join", content: "Start by creating a new quiz room or joining an existing one with a room code." },
                { title: "Select Difficulty", content: "Choose between Easy, Average, or Hard difficulty levels." },
                { title: "Question Types", content: "You'll encounter three types of questions: multiple choice, checkbox (select all that apply), and sortable (arrange in order)." },
                { title: "Time Limit", content: "Each question has a time limit. Answer before time runs out!" }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start transition-all duration-200 hover:bg-purple-900/20 p-2 rounded-md cursor-default"
                  variants={listItemVariants}
                >
                <span className="text-purple-400 mr-2">•</span>
                <span>
                    <strong className="text-purple-300">{item.title}:</strong> {item.content}
                </span>
                </motion.li>
              ))}
            </motion.ul>
          </TabsContent>
          <TabsContent value="questions" className="p-4 bg-gray-800/50 rounded-md mt-2 transition-all duration-200 hover:bg-gray-800/70">
            <motion.h3 
              className="text-lg font-semibold mb-2 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Clock className="h-5 w-5 mr-2 text-pink-400" />
              Question Types
            </motion.h3>
            <motion.ul 
              className="space-y-2 text-gray-300"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { title: "Multiple Choice", content: "Select one correct answer from the options provided." },
                { title: "Checkbox Questions", content: "Select all correct answers from the options provided." },
                { title: "Sortable Questions", content: "Drag and arrange items in the correct order." },
                { title: "Time Limits", content: "Easy (30s), Average (20s), Hard (15s) per question." }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start transition-all duration-200 hover:bg-pink-900/20 p-2 rounded-md cursor-default"
                  variants={listItemVariants}
                >
                <span className="text-pink-400 mr-2">•</span>
                <span>
                    <strong className="text-pink-300">{item.title}:</strong> {item.content}
                </span>
                </motion.li>
              ))}
            </motion.ul>
          </TabsContent>
          <TabsContent value="scoring" className="p-4 bg-gray-800/50 rounded-md mt-2 transition-all duration-200 hover:bg-gray-800/70">
            <motion.h3 
              className="text-lg font-semibold mb-2 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Award className="h-5 w-5 mr-2 text-cyan-400" />
              Scoring System
            </motion.h3>
            <motion.ul 
              className="space-y-2 text-gray-300"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { title: "Base Points", content: "100 points for each correct answer." },
                { title: "Time Bonus", content: "The faster you answer, the more bonus points you earn (up to 100 additional points)." },
                { title: "Difficulty Bonus", content: "Easy (no bonus), Average (+25% points), Hard (+50% points)." },
                { title: "Streak Bonus", content: "Answer multiple questions correctly in a row for bonus points." }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start transition-all duration-200 hover:bg-cyan-900/20 p-2 rounded-md cursor-default"
                  variants={listItemVariants}
                >
                <span className="text-cyan-400 mr-2">•</span>
                <span>
                    <strong className="text-cyan-300">{item.title}:</strong> {item.content}
                </span>
                </motion.li>
              ))}
            </motion.ul>
          </TabsContent>
          <TabsContent value="multiplayer" className="p-4 bg-gray-800/50 rounded-md mt-2 transition-all duration-200 hover:bg-gray-800/70">
            <motion.h3 
              className="text-lg font-semibold mb-2 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="h-5 w-5 mr-2 text-yellow-400" />
              Multiplayer Features
            </motion.h3>
            <motion.ul 
              className="space-y-2 text-gray-300"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { title: "Room Codes", content: "Share your unique 6-character room code with friends to invite them." },
                { title: "Bot Players", content: "Add up to 15 AI opponents if you want more competition." },
                { title: "Live Leaderboard", content: "See scores update in real-time during the game." },
                { title: "Winner Podium", content: "At the end, the top 3 players are celebrated on a podium." }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start transition-all duration-200 hover:bg-yellow-900/20 p-2 rounded-md cursor-default"
                  variants={listItemVariants}
                >
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                    <strong className="text-yellow-300">{item.title}:</strong> {item.content}
                </span>
                </motion.li>
              ))}
            </motion.ul>
          </TabsContent>
        </Tabs>

        <motion.div 
          className="mt-4 p-4 bg-purple-900/20 border border-purple-800/50 rounded-md transition-all duration-200 hover:bg-purple-900/30 hover:border-purple-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h4 className="font-medium mb-1">Pro Tip</h4>
          <p className="text-sm text-gray-300">
            Use keyboard shortcuts for faster answers: 1-4 for multiple choice, Space to submit, and Tab to navigate
            between options.
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
