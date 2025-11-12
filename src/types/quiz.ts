export interface Question {
  id: string;
  type: string;
  isKids: boolean;
  difficulty: 'junior' | 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  answer: number;
  reference: string;
  explanation: string;
  category: string;
}

export interface Player {
  name: string;
  location: string;
  score: number;
  avatar: string;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  unlocked: boolean;
}

export interface AchievementData {
  totalAnswers: number;
  totalCorrect: number;
  totalWrong: number;
  totalTimeouts: number;
  totalCombos: number;
  maxCombo: number;
  unlocked: Set<string>;
  totalSessions: number;
}

export interface RankingEntry {
  name: string;
  location: string;
  score: number;
  avatar: string;
}

export type GameMode = 'menu' | 'solo' | 'multiplayer' | 'quiz' | 'results';
