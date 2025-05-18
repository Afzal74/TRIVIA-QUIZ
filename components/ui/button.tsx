"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background focus-visible:ring-offset-0",
        variant == "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        variant == "destructive" && "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        variant == "outline" && "bg-background border border-input hover:bg-accent hover:text-accent-foreground",
        variant == "secondary" && "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80",
        variant == "ghost" && "hover:bg-accent hover:text-accent-foreground",
        variant == "link" && "underline-offset-4 hover:underline",
        size == "default" && "px-4 py-2",
        size == "sm" && "px-3 py-1.5 rounded-md",
        size == "lg" && "px-8 py-3 rounded-md",
        size == "icon" && "h-8 w-8",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
