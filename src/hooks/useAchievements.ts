import { useState, useEffect, useCallback } from 'react';
import { Achievement, AchievementData } from '@/types/quiz';
import { toast } from '@/hooks/use-toast';

const ACHIEVEMENT_DEFINITIONS: Record<string, { title: string; desc: string }> = {
  'start': { title: "Iniciante", desc: "Começou o seu primeiro jogo." },
  'first_wrong': { title: "Humildade", desc: "Errou uma pergunta. \"O saber ensoberbece...\"" },
  'correct_10': { title: "Estudioso", desc: "Acertou 10 perguntas no total." },
  'correct_50': { title: "Escriba", desc: "Acertou 50 perguntas no total." },
  'correct_100': { title: "Sábio", desc: "Acertou 100 perguntas no total." },
  'correct_250': { title: "Teólogo", desc: "Acertou 250 perguntas no total." },
  'correct_500': { title: "Mestre da Palavra", desc: "Acertou 500 perguntas no total." },
  'combo_3': { title: "Fogo do Espírito", desc: "Alcançou um combo de 3 acertos." },
  'combo_5': { title: "Em Chamas!", desc: "Alcançou um combo de 5 acertos seguidos." },
  'combo_10': { title: "Imparável!", desc: "Alcançou um combo de 10 acertos seguidos." },
  'clutch': { title: "No Limite", desc: "Acertou com menos de 2s restantes." },
  'first_timeout': { title: "O Tempo Ruge", desc: "Perdeu a primeira pergunta por tempo." },
  'no_hint': { title: "Fé Inabalável", desc: "Completou uma sessão sem usar dicas." },
  'all_lives': { title: "Escudo da Fé", desc: "Completou uma sessão com todas as 3 vidas." },
  'perfect_session': { title: "Imbatível", desc: "Completou uma sessão sem erros." },
  'session_10': { title: "Perseverante", desc: "Jogou 10 sessões no total." },
};

export function useAchievements() {
  const [data, setData] = useState<AchievementData>({
    totalAnswers: 0,
    totalCorrect: 0,
    totalWrong: 0,
    totalTimeouts: 0,
    totalCombos: 0,
    maxCombo: 0,
    unlocked: new Set<string>(),
    totalSessions: 0,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jb_achievements');
      if (stored) {
        const parsed = JSON.parse(stored);
        setData({
          ...parsed,
          unlocked: new Set(parsed.unlocked || []),
        });
      }
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  }, []);

  const save = useCallback((newData: AchievementData) => {
    try {
      localStorage.setItem('jb_achievements', JSON.stringify({
        ...newData,
        unlocked: Array.from(newData.unlocked),
      }));
      setData(newData);
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  }, []);

  const unlock = useCallback((id: string) => {
    if (!ACHIEVEMENT_DEFINITIONS[id] || data.unlocked.has(id)) return;
    
    const newData = {
      ...data,
      unlocked: new Set([...data.unlocked, id]),
    };
    save(newData);

    toast({
      title: "🏆 Conquista Desbloqueada!",
      description: ACHIEVEMENT_DEFINITIONS[id].title,
      duration: 4000,
    });
  }, [data, save]);

  const logAnswer = useCallback((
    correct: boolean,
    timeRemaining: number,
    combo: number,
    hintUsed: boolean = false
  ) => {
    const newData = { ...data };
    newData.totalAnswers++;

    if (correct) {
      newData.totalCorrect++;
      if (combo > 1) newData.totalCombos++;
      if (combo > newData.maxCombo) newData.maxCombo = combo;

      // Check achievements
      if (newData.totalCorrect === 10) unlock('correct_10');
      if (newData.totalCorrect === 50) unlock('correct_50');
      if (newData.totalCorrect === 100) unlock('correct_100');
      if (newData.totalCorrect === 250) unlock('correct_250');
      if (newData.totalCorrect === 500) unlock('correct_500');
      if (combo === 3) unlock('combo_3');
      if (combo === 5) unlock('combo_5');
      if (combo === 10) unlock('combo_10');
      if (timeRemaining <= 2.0 && !hintUsed) unlock('clutch');
    } else {
      if (timeRemaining <= 0) {
        if (newData.totalTimeouts === 0) unlock('first_timeout');
        newData.totalTimeouts++;
      } else {
        if (newData.totalWrong === 0) unlock('first_wrong');
        newData.totalWrong++;
      }
    }

    save(newData);
  }, [data, save, unlock]);

  const logSession = useCallback((
    sessionWrongAnswers: number,
    hintUsedThisSession: boolean,
    livesLeft: number,
    maxLives: number
  ) => {
    const newData = { ...data };
    newData.totalSessions++;

    if (sessionWrongAnswers === 0) unlock('perfect_session');
    if (!hintUsedThisSession) unlock('no_hint');
    if (livesLeft === maxLives) unlock('all_lives');
    if (newData.totalSessions === 10) unlock('session_10');

    save(newData);
  }, [data, save, unlock]);

  const getAchievements = useCallback((): Achievement[] => {
    return Object.entries(ACHIEVEMENT_DEFINITIONS).map(([id, def]) => ({
      id,
      ...def,
      unlocked: data.unlocked.has(id),
    }));
  }, [data.unlocked]);

  return {
    data,
    unlock,
    logAnswer,
    logSession,
    getAchievements,
  };
}
