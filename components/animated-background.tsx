"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

interface Shape {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speedX: number
  speedY: number
  opacity: number
  type: 'triangle' | 'square' | 'circle'
  colorIndex: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { colors } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create shapes
    const shapes: Shape[] = []
    const numberOfShapes = 30 // Reduced number of shapes

    for (let i = 0; i < numberOfShapes; i++) {
      const shapeTypes: Shape['type'][] = ['triangle', 'square', 'circle']
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 10, // Smaller size between 10 and 25
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01, // Slower rotation
        speedX: (Math.random() - 0.5) * 0.3, // Slower movement
        speedY: (Math.random() - 0.5) * 0.3, // Slower movement
        opacity: Math.random() * 0.15 + 0.05, // Lower opacity between 0.05 and 0.2
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        colorIndex: Math.floor(Math.random() * 3)
      })
    }

    // Draw shapes
    function drawShape(ctx: CanvasRenderingContext2D, shape: Shape) {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)

      // Get color based on colorIndex with lighter opacity
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
      }

      ctx.fill()
      ctx.restore()
    }

    // Animation function
    function animate() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      shapes.forEach(shape => {
        // Move shape
        shape.x += shape.speedX
        shape.y += shape.speedY
        shape.rotation += shape.rotationSpeed

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size

        // Draw shape
        drawShape(ctx, shape)
      })

      // Add very subtle glow effect
      ctx.fillStyle = `rgba(${colors.primary}, 0.01)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [colors])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.97), rgba(17, 24, 39, 0.97))",
        filter: "blur(1px)" // Slightly increased blur for smoother appearance
      }}
    />
  )
}
