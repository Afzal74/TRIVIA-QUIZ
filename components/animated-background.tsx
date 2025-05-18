"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import type { JSX } from "react/jsx-runtime"

export default function AnimatedBackground() {
  const { themeColor } = useTheme()
  const [particles, setParticles] = useState<JSX.Element[]>([])

  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const newParticles = []
      const count = Math.min(window.innerWidth / 20, 30) // Responsive particle count

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 10 + 5
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 10

        newParticles.push(
          <div
            key={i}
            className="particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}px`,
              bottom: `-${size}px`,
              animation: `float ${duration}s linear ${delay}s infinite, pulse 3s ease-in-out infinite`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />,
        )
      }

      setParticles(newParticles)
    }

    createParticles()

    // Recreate particles on window resize
    const handleResize = () => {
      createParticles()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [themeColor])

  return <div className="animated-bg">{particles}</div>
}
