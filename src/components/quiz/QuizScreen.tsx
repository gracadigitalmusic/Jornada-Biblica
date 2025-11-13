import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Lightbulb, Zap } from "lucide-react";
import { Question, Player } from "@/types/quiz";
import { GAME_CONSTANTS } from "@/data/questions";
import { useGameSounds } from "@/hooks/useGameSounds";

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  players: Player[];
  currentPlayerIndex: number;
  lives: number;
  hints: number;
  combo: number;
  timeRemaining: number;
  onAnswer: (index: number) => void;
  onUseHint: () => number[] | null;
  onQuit: () => void;
  gameMode: 'solo' | 'multiplayer';
}

export function QuizScreen({
  question,
  questionIndex,
  totalQuestions,
  players,
  currentPlayerIndex,
  lives,
  hints,
  combo,
  timeRemaining,
  onAnswer,
  onUseHint,
  onQuit,
  gameMode,
}: QuizScreenProps) {
  const { playCorrect, playWrong, playTimerWarning } = useGameSounds();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [disabledIndices, setDisabledIndices] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);

  const currentPlayer = players[currentPlayerIndex];
  const timePercent = (timeRemaining / GAME_CONSTANTS.TIME_PER_QUESTION) * 100;

  useEffect(() => {
    // Reset state when question changes
    setSelectedIndex(null);
    setDisabledIndices([]);
    setShowFeedback(false);
    setFeedbackType(null);
  }, [questionIndex]);

  useEffect(() => {
    // Play warning sound when time is running out
    if (timeRemaining <= 5 && timeRemaining > 4.9 && !showFeedback) {
      playTimerWarning();
    }
    // Auto-trigger timeout
    if (timeRemaining <= 0 && selectedIndex === null) {
      handleTimeout();
    }
  }, [timeRemaining, showFeedback, playTimerWarning]);

  const handleHint = () => {
    const indicesToDisable = onUseHint();
    if (indicesToDisable) {
      setDisabledIndices(indicesToDisable);
    }
  };

  const handleTimeout = () => {
    playWrong();
    setFeedbackType('wrong');
    setShowFeedback(true);
    setTimeout(() => {
      onAnswer(-1); // -1 indicates timeout
    }, 1500);
  };

  const handleSelectOption = (index: number) => {
    if (selectedIndex !== null || disabledIndices.includes(index)) return;
    
    setSelectedIndex(index);
    const correct = index === question.answer;
    setFeedbackType(correct ? 'correct' : 'wrong');
    setShowFeedback(true);

    if (correct) {
      playCorrect();
    } else {
      playWrong();
    }

    setTimeout(() => {
      onAnswer(index);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Timer Bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary to-primary"
          initial={{ width: "100%" }}
          animate={{ width: `${timePercent}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          {/* Lives/Hint/Progress */}
          <div className="flex items-center gap-4">
            {gameMode === 'solo' && (
              <div className="flex items-center gap-1">
                {Array.from({ length: GAME_CONSTANTS.LIVES_PER_SESSION }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 ${i < lives ? 'text-destructive fill-destructive' : 'text-muted'}`}
                  />
                ))}
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHint}
              disabled={hints <= 0 || selectedIndex !== null}
              className="gap-2"
            >
              <Lightbulb className={`w-5 h-5 ${hints > 0 ? 'text-secondary' : 'text-muted'}`} />
              <span className="text-xs">Dica</span>
            </Button>

            <span className="text-sm text-muted-foreground">
              Pergunta {questionIndex + 1}/{totalQuestions}
            </span>
          </div>

          {/* Current Player Turn */}
          {gameMode === 'multiplayer' && (
            <div className="flex items-center gap-2 text-secondary font-semibold">
              <span className="text-2xl">{currentPlayer.avatar}</span>
              <span>Turno de: {currentPlayer.name}</span>
            </div>
          )}

          {/* Combo */}
          {gameMode === 'solo' && combo > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-secondary font-bold animate-streak"
            >
              <Zap className="w-5 h-5" />
              <span>COMBO x{combo}!</span>
            </motion.div>
          )}
        </div>

        {/* Score Display */}
        <div className="text-right">
          {gameMode === 'solo' ? (
            <div className="flex items-center gap-2 justify-end">
              <span className="text-2xl">{currentPlayer.avatar}</span>
              <div>
                <div className="text-lg font-bold">{currentPlayer.name}</div>
                <div className="text-2xl font-black text-primary">{currentPlayer.score} pts</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-end">
              {players.map((player, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                    idx === currentPlayerIndex
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <span>{player.avatar}</span>
                  <span>{player.name}: {player.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={questionIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          bg-quiz-card rounded-2xl p-6 border-2 transition-all duration-300
          ${showFeedback 
            ? feedbackType === 'correct' 
              ? 'border-success glow-success' 
              : 'border-destructive animate-[shake_0.5s_ease]'
            : 'border-border'
          }
        `}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
          {question.question}
        </h2>

        {/* Options */}
        <div className="grid gap-3 md:grid-cols-2">
          <AnimatePresence>
            {question.options.map((option, index) => {
              const isDisabled = disabledIndices.includes(index);
              const isSelected = selectedIndex === index;
              const isCorrect = index === question.answer;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isDisabled ? 0.3 : 1, 
                    y: 0,
                    scale: showCorrect ? 1.05 : showWrong ? 0.95 : 1,
                  }}
                  whileHover={!isDisabled && !selectedIndex ? { scale: 1.02 } : {}}
                  onClick={() => handleSelectOption(index)}
                  disabled={selectedIndex !== null || isDisabled}
                  className={`
                    p-4 rounded-xl text-left font-medium transition-all duration-300
                    disabled:cursor-not-allowed
                    ${showCorrect 
                      ? 'bg-success text-success-foreground border-2 border-success' 
                      : showWrong
                      ? 'bg-destructive/20 text-destructive border-2 border-destructive'
                      : isDisabled
                      ? 'bg-muted/20 text-muted-foreground line-through'
                      : 'bg-quiz-card hover:bg-quiz-card-hover border-2 border-border hover:border-primary'
                    }
                  `}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Reference */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-muted/10 rounded-lg text-sm text-muted-foreground"
          >
            <p className="font-semibold">{question.reference}</p>
            {question.explanation && <p className="mt-1">{question.explanation}</p>}
          </motion.div>
        )}
      </motion.div>

      {/* Quit Button */}
      <div className="text-center">
        <Button variant="outline" onClick={onQuit}>
          Voltar ao Menu Principal
        </Button>
      </div>
    </div>
  );
}
