import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface Player {
  id: string;
  name: string;
  score: number;
  lastAnswerCorrect?: boolean;
  lastAnswerTime?: number;
}

interface QuizLeaderboardProps {
  players: Player[];
  isFinalLeaderboard?: boolean;
  onContinue?: () => void;
  autoCloseDuration?: number;
}

export default function QuizLeaderboard({
  players,
  isFinalLeaderboard = false,
  onContinue,
  autoCloseDuration = 5000,
}: QuizLeaderboardProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  // Sort players by score and then by answer time
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (a.lastAnswerTime || 0) - (b.lastAnswerTime || 0);
  });

  // Get winner info
  const winner = sortedPlayers[0];
  const isUserWinner = winner?.id === "user";

  useEffect(() => {
    if (isFinalLeaderboard) {
      setShowConfetti(true);
      const confettiDuration = 5000; // Longer duration
      const end = Date.now() + confettiDuration;

      const frame = () => {
        // More particles and better spread for a grander celebration
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: ["#8A2BE2", "#FF0080", "#00FFFF", "#FFD700", "#FF4500"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: ["#8A2BE2", "#FF0080", "#00FFFF", "#FFD700", "#FF4500"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isFinalLeaderboard]);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-400";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="glass-panel-darker p-6 rounded-xl max-w-2xl w-full mx-auto">
      {isFinalLeaderboard && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8 space-y-4"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Game Over!
          </h1>
          <p className="text-2xl font-medium text-gray-200">
            {isUserWinner 
              ? "🎉 Congratulations! You've won! 🏆" 
              : `🌟 Well played! ${winner?.name} wins! 🏆`}
          </p>
        </motion.div>
      )}

      <h2 className="text-2xl font-bold text-center mb-6">
        {isFinalLeaderboard ? "Final Standings" : "Current Standings"}
      </h2>

      <div className="space-y-4">
        <AnimatePresence>
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className={`glass-panel-hover relative p-4 rounded-lg ${
                player.lastAnswerCorrect ? "border-green-500/30" : ""
              } ${isFinalLeaderboard && index === 0 ? "border-2 border-yellow-500/50" : ""}`}
            >
              {/* Position indicator */}
              <div className="absolute -left-2 -top-2">
                {index < 3 && isFinalLeaderboard ? (
                  <Trophy className={`w-6 h-6 ${getMedalColor(index)}`} />
                ) : (
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-full text-sm">
                    {index + 1}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`font-medium text-lg ${isFinalLeaderboard && index === 0 ? "text-yellow-400" : ""}`}>
                    {player.name}
                  </span>
                  {player.lastAnswerCorrect && !isFinalLeaderboard && (
                    <span className="text-green-500 text-sm">
                      +{index === 0 ? "200" : "100"}
                    </span>
                  )}
                </div>
                <motion.span
                  key={player.score}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className={`font-bold text-xl ${isFinalLeaderboard && index === 0 ? "text-yellow-400" : ""}`}
                >
                  {player.score}
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    isFinalLeaderboard && index === 0
                      ? "bg-gradient-to-r from-yellow-400 via-purple-600 to-pink-600"
                      : "bg-gradient-to-r from-purple-600 to-pink-600"
                  }`}
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(player.score / Math.max(...players.map((p) => p.score))) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {onContinue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <button
            onClick={onContinue}
            className="glass-button px-6 py-2 text-white font-medium"
          >
            {isFinalLeaderboard ? "Back to Menu" : "Continue"}
          </button>
        </motion.div>
      )}
    </div>
  );
} 