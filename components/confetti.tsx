"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

interface ConfettiProps {
  className?: string
  active?: boolean
  duration?: number
  particleCount?: number
  colors?: string[]
  size?: number
  gravity?: number
  wind?: number
  opacity?: number
  recycle?: boolean
}

interface Particle {
  x: number
  y: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  speedX: number
  speedY: number
  opacity: number
  shape: 'square' | 'circle' | 'triangle'
  wobble: number
  wobbleSpeed: number
  wobbleOffset: number
}

export default function Confetti({
  className,
  active = true,
  duration = 5000,
  particleCount = 100,
  colors,
  size = 10,
  gravity = 0.1,
  wind = 0,
  opacity = 1,
  recycle = false
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { colors: themeColors } = useTheme()
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isActive, setIsActive] = useState(active)

  // Use provided colors or theme colors
  const confettiColors = colors || [
    `rgb(${themeColors.primary})`,
    `rgb(${themeColors.secondary})`,
    `rgb(${themeColors.accent})`
  ]

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    setIsActive(active)
  }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Set canvas size with device pixel ratio for better quality
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create particles
    const createParticles = () => {
      const newParticles: Particle[] = []
      const shapes: Particle['shape'][] = ['square', 'circle', 'triangle']

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: -size,
          size: Math.random() * size + size / 2,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          speedX: (Math.random() - 0.5) * 2 + wind,
          speedY: Math.random() * 2,
          opacity: Math.random() * 0.5 + 0.5,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          wobble: Math.random() * 2,
          wobbleSpeed: Math.random() * 0.1,
          wobbleOffset: Math.random() * Math.PI * 2
        })
      }
      return newParticles
    }

    if (isActive && particles.length === 0) {
      setParticles(createParticles())
    }

    // Draw particles with improved rendering
    function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate(particle.rotation)
      ctx.globalAlpha = particle.opacity * opacity

      ctx.fillStyle = particle.color
      ctx.beginPath()

      switch (particle.shape) {
        case 'square':
          ctx.rect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
          break
        case 'circle':
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
          break
        case 'triangle':
          const height = particle.size * Math.sqrt(3) / 2
          ctx.moveTo(0, -height / 2)
          ctx.lineTo(-particle.size / 2, height / 2)
          ctx.lineTo(particle.size / 2, height / 2)
          break
      }

      ctx.fill()
      ctx.restore()
    }

    // Animation function with improved performance
    let animationFrameId: number
    let lastTime = 0
    const fps = 60
    const frameInterval = 1000 / fps
    let startTime = Date.now()

    function animate(currentTime: number) {
      if (!canvas || !ctx) return

      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime - (deltaTime % frameInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      const updatedParticles = particles.filter(particle => {
        if (!isReducedMotion) {
          particle.x += particle.speedX
          particle.y += particle.speedY
          particle.rotation += particle.rotationSpeed
          particle.speedY += gravity
          particle.x += Math.sin(Date.now() * particle.wobbleSpeed + particle.wobbleOffset) * particle.wobble
        }

        drawParticle(ctx, particle)

        // Check if particle is still in bounds
        return particle.y < canvas.height + particle.size
      })

      setParticles(updatedParticles)

      // Handle recycling or completion
      if (isActive) {
        if (recycle && updatedParticles.length < particleCount / 2) {
          setParticles([...updatedParticles, ...createParticles()])
        } else if (!recycle && Date.now() - startTime > duration) {
          setIsActive(false)
        }
      }

      if (isActive || updatedParticles.length > 0) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    if (isActive || particles.length > 0) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isActive, particles, confettiColors, duration, gravity, isReducedMotion, opacity, particleCount, recycle, size, wind])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 pointer-events-none",
        className
      )}
      aria-hidden="true"
    />
  )
} 