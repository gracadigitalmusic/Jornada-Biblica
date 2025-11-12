import { useState, useEffect } from "react";
import { MenuScreen } from "@/components/quiz/MenuScreen";
import { PlayerSetup } from "@/components/quiz/PlayerSetup";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { RankingModal } from "@/components/quiz/RankingModal";
import { AchievementsModal } from "@/components/quiz/AchievementsModal";
import { useQuizGame } from "@/hooks/useQuizGame";
import { useAchievements } from "@/hooks/useAchievements";
import { useRanking } from "@/hooks/useRanking";
import { Player, GameMode } from "@/types/quiz";

const Index = () => {
  const [gameMode, setGameMode] = useState<GameMode>("menu");
  const [setupMode, setSetupMode] = useState<'solo' | 'multiplayer'>('solo');
  const [showPlayerSetup, setShowPlayerSetup] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isGameOverState, setIsGameOverState] = useState(false);

  const quiz = useQuizGame();
  const achievements = useAchievements();
  const ranking = useRanking();

  // Check for timeout
  useEffect(() => {
    if (gameMode === "quiz" && quiz.timeRemaining <= 0 && !showResults) {
      handleTimeout();
    }
  }, [quiz.timeRemaining, gameMode, showResults]);

  const handleStartSolo = () => {
    setSetupMode('solo');
    setShowPlayerSetup(true);
  };

  const handleStartMultiplayer = () => {
    setSetupMode('multiplayer');
    setShowPlayerSetup(true);
  };

  const handlePlayersReady = (players: Player[]) => {
    setShowPlayerSetup(false);
    const numQuestions = setupMode === 'solo' ? 10 : 20 + (players.length - 2) * 5;
    quiz.initializeGame(players, numQuestions);
    setGameMode("quiz");
    achievements.unlock('start');
    setShowResults(false);
    setIsGameOverState(false);
  };

  const handleAnswer = (selectedIndex: number) => {
    const result = selectedIndex === -1 
      ? quiz.handleTimeout() 
      : quiz.answerQuestion(selectedIndex);
    
    achievements.logAnswer(
      result.correct,
      result.timeRemaining,
      quiz.combo,
      quiz.hintUsedOnQuestion
    );

    // Check if game should end
    setTimeout(() => {
      if (quiz.isGameOver()) {
        handleGameEnd();
      } else {
        quiz.nextQuestion();
        setShowResults(false);
      }
    }, 2000);

    setShowResults(true);
  };

  const handleTimeout = () => {
    handleAnswer(-1);
  };

  const handleGameEnd = () => {
    const isGameOver = setupMode === 'solo' && quiz.lives <= 0;
    setIsGameOverState(isGameOver);
    
    // Log session for achievements
    if (!isGameOver) {
      achievements.logSession(
        quiz.sessionWrongAnswers,
        quiz.sessionHintUsed,
        quiz.lives,
        3
      );

      // Save to ranking if solo
      if (setupMode === 'solo' && quiz.currentPlayer && quiz.currentPlayer.score > 0) {
        ranking.addScore(quiz.currentPlayer);
      }
    }

    setGameMode("results");
  };

  const handleContinue = () => {
    setShowPlayerSetup(true);
    setGameMode("menu");
  };

  const handleEndGame = () => {
    setGameMode("menu");
    setShowResults(false);
    setIsGameOverState(false);
  };

  const handleQuitQuiz = () => {
    if (confirm("Tem certeza que deseja sair? Seu progresso será perdido.")) {
      handleEndGame();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {gameMode === "menu" && (
          <MenuScreen
            onStartSolo={handleStartSolo}
            onStartMultiplayer={handleStartMultiplayer}
            onShowRanking={() => {
              ranking.loadRanking();
              setShowRanking(true);
            }}
            onShowAchievements={() => setShowAchievements(true)}
          />
        )}

        {gameMode === "quiz" && quiz.currentQuestion && !showResults && (
          <QuizScreen
            question={quiz.currentQuestion}
            questionIndex={quiz.currentQuestionIndex}
            totalQuestions={quiz.totalQuestions}
            players={quiz.players}
            currentPlayerIndex={quiz.currentPlayerIndex}
            lives={quiz.lives}
            hints={quiz.hints}
            combo={quiz.combo}
            timeRemaining={quiz.timeRemaining}
            onAnswer={handleAnswer}
            onUseHint={quiz.useHint}
            onQuit={handleQuitQuiz}
            gameMode={setupMode}
          />
        )}

        {gameMode === "results" && (
          <ResultsScreen
            players={quiz.players}
            gameMode={setupMode}
            isGameOver={isGameOverState}
            onContinue={handleContinue}
            onEndGame={handleEndGame}
          />
        )}
      </div>

      {/* Modals */}
      <PlayerSetup
        open={showPlayerSetup}
        onClose={() => setShowPlayerSetup(false)}
        onStart={handlePlayersReady}
        mode={setupMode}
      />

      <RankingModal
        open={showRanking}
        onClose={() => setShowRanking(false)}
        ranking={ranking.ranking}
      />

      <AchievementsModal
        open={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievements={achievements.getAchievements()}
      />
    </div>
  );
};

export default Index;
