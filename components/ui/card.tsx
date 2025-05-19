"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "glass"
  hover?: boolean
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, interactive = false, ...props }, ref) => {
    const variants = {
      default: "bg-card text-card-foreground shadow-sm",
      bordered: "bg-card text-card-foreground border-2",
      elevated: "bg-card text-card-foreground shadow-lg",
      glass: "bg-card/80 text-card-foreground backdrop-blur-sm border border-border/50",
    }

    const hoverVariants = {
      default: "hover:shadow-md transition-shadow",
      bordered: "hover:border-primary/50 transition-colors",
      elevated: "hover:shadow-xl hover:-translate-y-0.5 transition-all",
      glass: "hover:bg-card/90 hover:backdrop-blur-md transition-all",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg",
          variants[variant],
          hover && hoverVariants[variant],
          interactive && "cursor-pointer",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, withBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        withBorder && "border-b",
        className
      )}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div"
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  withPadding?: boolean
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, withPadding = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(withPadding && "p-6 pt-0", className)}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean
  justify?: "start" | "end" | "center" | "between" | "around"
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, withBorder = false, justify = "start", ...props }, ref) => {
    const justifyClasses = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center p-6 pt-0",
          withBorder && "border-t",
          justifyClasses[justify],
          className
        )}
        {...props}
      />
    )
  }
)
CardFooter.displayName = "CardFooter"

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "auto" | "square" | "video" | "wide"
}

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, aspectRatio = "auto", ...props }, ref) => {
    const aspectRatioClasses = {
      auto: "",
      square: "aspect-square",
      video: "aspect-video",
      wide: "aspect-[21/9]",
    }

    return (
      <img
        ref={ref}
        className={cn(
          "w-full object-cover",
          aspectRatioClasses[aspectRatio],
          className
        )}
        {...props}
      />
    )
  }
)
CardImage.displayName = "CardImage"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
}
