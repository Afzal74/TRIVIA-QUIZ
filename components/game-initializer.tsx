import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockQuestions } from "@/data/mock-questions";
import QuizGame from "./quiz-game";
import { useToast } from "@/components/ui/use-toast";
import { generateBotName } from "@/lib/utils";

interface GameInitializerProps {
  category: string;
  difficulty: string;
  roomCode: string;
  username: string;
}

interface GameData {
  roomCode: string;
  players: string[];
  host: string;
  difficulty: string;
  subject: string;
  includeBots?: boolean;
  questionTime?: number;
  maxRounds?: number;
  currentRound?: number;
  totalPlayers?: number;
}

export default function GameInitializer({
  category,
  difficulty,
  roomCode,
  username,
}: GameInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Get existing lobby players and game settings from localStorage
      const gameData = JSON.parse(localStorage.getItem(`quizverse-game-${roomCode}`) || '{}') as GameData;
      const lobbyPlayers = gameData.players || [username];
      const includeBots = gameData.includeBots ?? true;
      
      // Initialize players array with lobby players
      const players = lobbyPlayers.map((name: string) => ({
        id: name === username ? "user" : `player-${name}`,
        name: name,
        score: 0
      }));

      // If bots are enabled and we have less than 15 players, add bots
      if (includeBots && players.length < 15) {
        const botsNeeded = 15 - players.length;
        const bots = Array(botsNeeded).fill(0).map((_, index) => {
          const botName = generateBotName();
          return {
            id: `bot${index + 1}`,
            name: botName,
            score: 0
          };
        });
        players.push(...bots);
      }

      // Get time limit based on difficulty
      const getTimeLimit = (diff: string) => {
        switch (diff.toLowerCase()) {
          case 'easy': return 30;
          case 'average': return 20;
          case 'hard': return 15;
          default: return 20;
        }
      };

      // Store updated game data in localStorage
      const updatedGameData = {
        ...gameData,
        roomCode,
        players: players.map(p => p.name),
        host: username,
        difficulty,
        subject: category,
        questionTime: getTimeLimit(difficulty),
        maxRounds: 10,
        currentRound: 0,
        totalPlayers: players.length
      };

      console.log("Storing game data:", updatedGameData);

      localStorage.setItem(`quizverse-game-${roomCode}`, JSON.stringify(updatedGameData));
      localStorage.setItem("quizverse-username", username);
      
      setIsInitialized(true);

      // Store the initialized players for the QuizGame component
      localStorage.setItem(`quizverse-players-${roomCode}`, JSON.stringify(players));
    } catch (error) {
      console.error("Game initialization error:", error);
      toast({
        title: "Error initializing game",
        description: "Failed to set up the game. Please try again.",
        variant: "destructive",
      });
      router.push("/");
    }
  }, [category, difficulty, roomCode, username, router, toast]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-panel-darker p-6 rounded-xl text-center">
          <h2 className="text-xl font-medium mb-4">Initializing Game...</h2>
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Get all players from localStorage
  const allPlayers = JSON.parse(localStorage.getItem(`quizverse-players-${roomCode}`) || '[]');

  return (
    <QuizGame
      players={allPlayers}
      category={category}
      difficulty={difficulty}
      roomCode={roomCode}
      onGameEnd={() => router.push("/")}
    />
  );
} 