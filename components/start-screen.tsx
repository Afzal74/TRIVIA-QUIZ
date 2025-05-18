"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Award, Users } from "lucide-react"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">Professional Quiz</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-300">
        Test your knowledge with this timed quiz. You have 15 seconds to answer each question.
      </p>
      <div className="mb-8 bg-slate-50 dark:bg-slate-700/30 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-100">How to Play:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="mt-1 mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-slate-800 dark:text-slate-100">Timed Questions</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Each question has a 15-second timer</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mt-1 mr-3 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-slate-800 dark:text-slate-100">Score Points</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Get points for each correct answer</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mt-1 mr-3 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-slate-800 dark:text-slate-100">Various Topics</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Questions from multiple categories</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mt-1 mr-3 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-slate-800 dark:text-slate-100">Track Progress</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">See your final score and review answers</p>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
      >
        Start Quiz
      </Button>
    </div>
  )
}
