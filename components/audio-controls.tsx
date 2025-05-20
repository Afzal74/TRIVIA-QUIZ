"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useAudio } from "@/lib/audio"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export function AudioControls() {
  const { isMuted, toggleMute } = useAudio()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </motion.div>
  )
} 