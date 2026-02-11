// Core Types
export interface User {
  id: string;
  email: string;
  username: string | null;
  level: number;
  totalXP: number;
  currentXP: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  createdAt: string;
}

export interface CognitiveNode {
  id: string;
  nodeType: 'reasoning' | 'memory' | 'creativity' | 'decision' | 'flexibility' | 'philosophy';
  masteryLevel: number; // 0-100
}

export interface Module {
  id: string;
  title: string;
  description: string;
  domain: string;
  difficulty: number; // 1-10
  estimatedTime: number; // seconds
  contentType: 'philosophy' | 'cognitive' | 'nexus' | 'meditation' | 'breath' | 'forbidden';
  cards: ModuleCard[];
  quiz: Quiz | null;
  xpReward: number;
}

export interface ModuleCard {
  id: string;
  type: 'animation' | 'text' | 'quiz' | 'interactive';
  text?: string;
  lottieUrl?: string;
  imageUrl?: string;
  interactionType?: 'tap-reveal' | 'drag-match' | 'fill-blank' | 'multiple-choice';
  options?: string[];
  correctAnswer?: number | string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface BatchProgress {
  id: string;
  date: string;
  totalModules: number;
  completedCount: number;
  modules: BatchModule[];
}

export interface BatchModule {
  id: string;
  moduleId: string;
  module: Module;
  position: number;
  completed: boolean;
  score: number | null;
  timeSpent: number | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'cognitive' | 'streak' | 'technique' | 'social' | 'special';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
}

export interface MeditationSession {
  id: string;
  technique: string;
  duration: number;
  distractions?: number;
  noteCount?: number;
  reflection?: string;
  xpEarned: number;
  createdAt: string;
}

export interface BreathSession {
  id: string;
  pattern: string;
  duration: number;
  cyclesCompleted: number;
  resonanceScore: number;
  xpEarned: number;
  createdAt: string;
}

export interface PhilosophyTrack {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalUnits: number;
  unitsCompleted: number;
  units: PhilosophyUnit[];
}

export interface PhilosophyUnit {
  id: string;
  name: string;
  description: string;
  position: number;
  cards: ModuleCard[];
  completed: boolean;
}
