import { generateRoomCode } from "./utils"

interface Room {
  code: string
  active: boolean
  host: string
  players: string[]
  difficulty: "easy" | "average" | "hard"
  maxPlayers: number
  createdAt: number
}

// In-memory store for active rooms (in a real app, this would be a database)
const activeRooms = new Map<string, Room>()

export const createRoom = (host: string, difficulty: "easy" | "average" | "hard"): Room => {
  const code = generateRoomCode()
  const room: Room = {
    code,
    active: true,
    host,
    players: [host],
    difficulty,
    maxPlayers: 15,
    createdAt: Date.now()
  }
  
  activeRooms.set(code, room)
  return room
}

export const joinRoom = (code: string, username: string): Room | null => {
  const room = activeRooms.get(code)
  
  if (!room) {
    return null
  }

  if (!room.active) {
    return null
  }

  if (room.players.length >= room.maxPlayers) {
    return null
  }

  if (room.players.includes(username)) {
    return null
  }

  room.players.push(username)
  activeRooms.set(code, room)
  return room
}

export const validateRoom = (code: string): boolean => {
  const room = activeRooms.get(code)
  return !!room && room.active
}

export const getRoomDetails = (code: string): Room | null => {
  return activeRooms.get(code) || null
}

export const leaveRoom = (code: string, username: string): void => {
  const room = activeRooms.get(code)
  if (!room) return

  room.players = room.players.filter(player => player !== username)
  
  // If no players left, deactivate the room
  if (room.players.length === 0) {
    room.active = false
  }
  
  // If host leaves, assign new host
  if (username === room.host && room.players.length > 0) {
    room.host = room.players[0]
  }

  activeRooms.set(code, room)
}

// Clean up inactive rooms older than 24 hours
setInterval(() => {
  const now = Date.now()
  for (const [code, room] of activeRooms.entries()) {
    if (!room.active && now - room.createdAt > 24 * 60 * 60 * 1000) {
      activeRooms.delete(code)
    }
  }
}, 60 * 60 * 1000) // Run every hour 