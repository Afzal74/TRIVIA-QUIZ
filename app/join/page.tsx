"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JoinPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    roomCode: "",
    username: "",
    subject: "all"
  })

  const subjects = [
    { id: "all", label: "All Subjects" },
    { id: "english", label: "English" },
    { id: "science", label: "Science" },
    { id: "social", label: "Social Studies" },
    { id: "cs", label: "Computer Science" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate room code (6 characters, alphanumeric)
    if (!/^[A-Z0-9]{6}$/.test(formData.roomCode)) {
      toast({
        title: "Invalid room code",
        description: "Room code must be 6 alphanumeric characters",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    // Validate username (3-20 characters, alphanumeric and spaces)
    if (!/^[A-Za-z0-9\s]{3,20}$/.test(formData.username)) {
      toast({
        title: "Invalid username",
        description: "Username must be 3-20 characters (letters, numbers, spaces)",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    // Store username in localStorage
    localStorage.setItem("quizverse-username", formData.username)

    // Navigate to lobby
    router.push(
      `/lobby?code=${formData.roomCode}&username=${encodeURIComponent(formData.username)}&subject=${formData.subject}`
    )
  }

  return (
    <main className="container mx-auto px-4 pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Join Quiz</CardTitle>
            <CardDescription>Enter the room code to join an existing quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roomCode">Room Code</Label>
                <Input
                  id="roomCode"
                  placeholder="Enter 6-digit room code"
                  value={formData.roomCode}
                  onChange={(e) => setFormData({ ...formData, roomCode: e.target.value.toUpperCase() })}
                  maxLength={6}
                  pattern="[A-Z0-9]{6}"
                  required
                  className="font-mono uppercase"
                />
                <p className="text-xs text-muted-foreground">6 characters, letters and numbers only</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  minLength={3}
                  maxLength={20}
                  pattern="[A-Za-z0-9\s]{3,20}"
                  required
                />
                <p className="text-xs text-muted-foreground">3-20 characters, letters, numbers, and spaces</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join Quiz"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
} 