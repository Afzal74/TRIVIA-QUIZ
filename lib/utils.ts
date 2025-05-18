import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a random room code (6 characters)
export function generateRoomCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // Removed similar looking characters
  let result = ""
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Generate a random bot name
export function generateBotName(): string {
  const prefixes = ["Quiz", "Trivia", "Brain", "Smart", "Clever", "Quick", "Genius", "Whiz", "Mind", "Think"]
  const suffixes = ["Bot", "Master", "Guru", "Wizard", "Champ", "Pro", "Star", "King", "Queen", "Expert"]

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  const number = Math.floor(Math.random() * 100)

  return `${prefix}${suffix}${number}`
}
