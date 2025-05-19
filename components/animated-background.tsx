"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface Shape {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speedX: number
  speedY: number
  opacity: number
  type: 'triangle' | 'square' | 'circle' | 'star'
  colorIndex: number
  scale: number
  scaleSpeed: number
}

interface AnimatedBackgroundProps {
  className?: string
  density?: "low" | "medium" | "high"
  speed?: "slow" | "normal" | "fast"
  blur?: number
  opacity?: number
  pauseOnQuiz?: boolean
}

export default function AnimatedBackground({
  className,
  density = "medium",
  speed = "normal",
  blur = 1,
  opacity = 0.97,
  pauseOnQuiz = true
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { colors } = useTheme()
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const pathname = usePathname()
  const isQuizPage = pathname?.includes('/quiz') || pathname?.includes('/practice')

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

    // Create shapes with density settings
    const shapes: Shape[] = []
    const densityMap = {
      low: 20,
      medium: 30,
      high: 40
    }
    const speedMap = {
      slow: 0.2,
      normal: 0.3,
      fast: 0.4
    }
    const numberOfShapes = densityMap[density]

    for (let i = 0; i < numberOfShapes; i++) {
      const shapeTypes: Shape['type'][] = ['triangle', 'square', 'circle', 'star']
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        speedX: (Math.random() - 0.5) * speedMap[speed],
        speedY: (Math.random() - 0.5) * speedMap[speed],
        opacity: Math.random() * 0.15 + 0.05,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        colorIndex: Math.floor(Math.random() * 3),
        scale: 1,
        scaleSpeed: (Math.random() - 0.5) * 0.01
      })
    }

    // Draw shapes with improved rendering
    function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)
      ctx.scale(shape.scale, shape.scale)

      const color = shape.colorIndex === 0 
        ? `rgba(${colors.primary}, ${shape.opacity * 0.7})`
        : shape.colorIndex === 1
        ? `rgba(${colors.secondary}, ${shape.opacity * 0.7})`
        : `rgba(${colors.accent}, ${shape.opacity * 0.7})`
      
      ctx.fillStyle = color
      ctx.beginPath()

      switch (shape.type) {
        case 'triangle':
          const height = shape.size * Math.sqrt(3) / 2
          ctx.moveTo(0, -height / 2)
          ctx.lineTo(-shape.size / 2, height / 2)
          ctx.lineTo(shape.size / 2, height / 2)
          break
        case 'square':
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break
        case 'circle':
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
          break
        case 'star':
          const spikes = 5
          const outerRadius = shape.size / 2
          const innerRadius = outerRadius / 2
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius
            const angle = (Math.PI * i) / spikes
            if (i === 0) {
              ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
            } else {
              ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
            }
          }
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

    function animate(currentTime: number) {
      if (!canvas || !ctx) return

      // Skip animation if on quiz page and pauseOnQuiz is true
      if (isQuizPage && pauseOnQuiz) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime - (deltaTime % frameInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      shapes.forEach(shape => {
        if (!isReducedMotion) {
          shape.x += shape.speedX
          shape.y += shape.speedY
          shape.rotation += shape.rotationSpeed
          shape.scale += shape.scaleSpeed

          // Wrap around edges
          if (shape.x < -shape.size) shape.x = canvas.width + shape.size
          if (shape.x > canvas.width + shape.size) shape.x = -shape.size
          if (shape.y < -shape.size) shape.y = canvas.height + shape.size
          if (shape.y > canvas.height + shape.size) shape.y = -shape.size

          // Scale bounds
          if (shape.scale > 1.2) shape.scaleSpeed = -Math.abs(shape.scaleSpeed)
          if (shape.scale < 0.8) shape.scaleSpeed = Math.abs(shape.scaleSpeed)
        }

        drawShape(ctx, shape)
      })

      // Add subtle glow effect
      ctx.fillStyle = `rgba(${colors.primary}, 0.01)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [colors, density, speed, isReducedMotion, isQuizPage, pauseOnQuiz])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 w-full h-full -z-10",
        className
      )}
      style={{
        filter: `blur(${blur}px)`,
        opacity: opacity
      }}
    />
  )
}
