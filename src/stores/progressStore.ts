import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressState {
  level: number;
  totalXP: number;
  currentXP: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  
  // Actions
  addXP: (amount: number) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

const calculateLevel = (totalXP: number) => {
  let level = 1;
  let xpRequired = 100;
  let accumulated = 0;
  
  while (accumulated + xpRequired <= totalXP) {
    accumulated += xpRequired;
    level += 1;
    xpRequired = Math.floor(xpRequired * 1.15);
  }
  
  return {
    level,
    currentXP: totalXP - accumulated,
    xpToNextLevel: xpRequired,
  };
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      level: 1,
      totalXP: 0,
      currentXP: 0,
      xpToNextLevel: 100,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,

      addXP: (amount) => {
        const state = get();
        const newTotalXP = state.totalXP + amount;
        const levelData = calculateLevel(newTotalXP);
        
        set({
          totalXP: newTotalXP,
          level: levelData.level,
          currentXP: levelData.currentXP,
          xpToNextLevel: levelData.xpToNextLevel,
        });
        
        // Update streak
        get().updateStreak();
      },

      updateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        
        if (state.lastActivityDate === today) {
          return; // Already updated today
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (state.lastActivityDate === yesterdayStr) {
          // Continue streak
          const newStreak = state.currentStreak + 1;
          set({
            currentStreak: newStreak,
            longestStreak: Math.max(state.longestStreak, newStreak),
            lastActivityDate: today,
          });
        } else if (state.lastActivityDate === null) {
          // First activity
          set({
            currentStreak: 1,
            longestStreak: 1,
            lastActivityDate: today,
          });
        } else {
          // Streak broken
          set({
            currentStreak: 1,
            lastActivityDate: today,
          });
        }
      },

      resetProgress: () => {
        set({
          level: 1,
          totalXP: 0,
          currentXP: 0,
          xpToNextLevel: 100,
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
        });
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
