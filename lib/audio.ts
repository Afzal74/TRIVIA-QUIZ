"use client"

// Audio utility functions and context
import { create } from 'zustand'

interface AudioState {
  isMuted: boolean
  backgroundMusic: HTMLAudioElement | null
  toggleMute: () => void
  playBackgroundMusic: () => void
  stopBackgroundMusic: () => void
  playSoundEffect: (effect: 'correct' | 'wrong' | 'tick' | 'gameStart' | 'gameEnd' | 'standings' | 'congratulations') => void
}

type SoundEffects = {
  [K in 'correct' | 'wrong' | 'tick' | 'gameStart' | 'gameEnd' | 'standings' | 'congratulations']: HTMLAudioElement
}

// Create audio elements only on client side
const createAudioElements = () => {
  if (typeof window === 'undefined') {
    return { backgroundMusic: null, soundEffects: {} as SoundEffects }
  }

  const backgroundMusic = new Audio('/sounds/background-music.mp3')
  backgroundMusic.loop = true
  backgroundMusic.volume = 0.3 // Slightly increased volume for background music

  // Create new audio elements for each sound effect
  const soundEffects: SoundEffects = {
    correct: new Audio('/sounds/correct-answer.mp3'),
    wrong: new Audio('/sounds/wrong-answer.mp3'),
    tick: new Audio('/sounds/tick.mp3'),
    gameStart: new Audio('/sounds/game-start.mp3'),
    gameEnd: new Audio('/sounds/game-end.mp3'),
    standings: new Audio('/sounds/standings.mp3'),
    congratulations: new Audio('/sounds/congratulations.mp3'),
  }

  // Set volume for sound effects
  Object.values(soundEffects).forEach(audio => {
    audio.volume = 0.7 // Increased volume for sound effects
  })

  return { backgroundMusic, soundEffects }
}

const { backgroundMusic, soundEffects } = createAudioElements()

export const useAudio = create<AudioState>((set, get) => ({
  isMuted: false,
  backgroundMusic,
  
  toggleMute: () => {
    const { isMuted, backgroundMusic } = get()
    const newMutedState = !isMuted
    
    if (backgroundMusic) {
      backgroundMusic.muted = newMutedState
    }
    
    set({ isMuted: newMutedState })
  },

  playBackgroundMusic: () => {
    const { backgroundMusic, isMuted } = get()
    if (backgroundMusic && !isMuted) {
      // Reset to start and ensure it's loaded
      backgroundMusic.load()
      backgroundMusic.currentTime = 0
      
      // Play the background music
      backgroundMusic.play()
        .then(() => console.log('Background music started playing'))
        .catch(error => {
          console.error('Background music play failed:', error)
          // Try to play again after a short delay
          setTimeout(() => {
            backgroundMusic.play()
              .then(() => console.log('Background music started playing after retry'))
              .catch(err => console.error('Background music still failed:', err))
          }, 1000)
        })
    }
  },

  stopBackgroundMusic: () => {
    const { backgroundMusic } = get()
    if (backgroundMusic) {
      backgroundMusic.pause()
      backgroundMusic.currentTime = 0
    }
  },

  playSoundEffect: (effect: 'correct' | 'wrong' | 'tick' | 'gameStart' | 'gameEnd' | 'standings' | 'congratulations') => {
    const { isMuted } = get()
    console.log('Attempting to play sound effect:', effect, 'Muted:', isMuted)
    
    if (!isMuted && soundEffects[effect]) {
      // Create a new audio element for each play to avoid conflicts
      const audio = new Audio(soundEffects[effect].src)
      audio.volume = 0.7
      
      // Play the sound
      audio.play()
        .then(() => console.log('Sound effect played successfully:', effect))
        .catch(error => {
          console.error('Sound effect play failed:', effect, error)
          // Try to load and play again
          audio.load()
          audio.play()
            .then(() => console.log('Sound effect played after reload:', effect))
            .catch(err => console.error('Sound effect still failed after reload:', effect, err))
        })
    } else {
      console.log('Sound effect not played:', effect, 'Reason:', isMuted ? 'Muted' : 'Sound not found')
    }
  }
})) 