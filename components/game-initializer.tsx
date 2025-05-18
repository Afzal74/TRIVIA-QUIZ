import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockQuestions } from "@/data/mock-questions";
import QuizGame from "./quiz-game";
import { useToast } from "@/components/ui/use-toast";

interface GameInitializerProps {
  category: string;
  difficulty: string;
  roomCode: string;
  username: string;
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
      console.log("Initializing game with:", {
        category,
        difficulty,
        roomCode,
        username
      });

      // Initialize players
      const players = [
        { id: "user", name: username, score: 0 },
        { id: "bot1", name: "Bot 1", score: 0 },
        { id: "bot2", name: "Bot 2", score: 0 },
      ];

      // Store game data in localStorage
      const gameData = {
        roomCode,
        players: players.map(p => p.name),
        host: username,
        difficulty,
        subject: category,
        questionTime: difficulty === "easy" ? 30 : difficulty === "hard" ? 15 : 20,
      };

      console.log("Storing game data:", gameData);

      localStorage.setItem(`quizverse-game-${roomCode}`, JSON.stringify(gameData));
      localStorage.setItem("quizverse-username", username);
      
      setIsInitialized(true);
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

  return (
    <QuizGame
      players={[
        { id: "user", name: username, score: 0 },
        { id: "bot1", name: "Bot 1", score: 0 },
        { id: "bot2", name: "Bot 2", score: 0 },
      ]}
      category={category}
      difficulty={difficulty}
      onGameEnd={() => router.push("/")}
    />
  );
} 