import { create } from 'zustand';
import { BatchProgress, Module } from '../types';
import { useProgressStore } from './progressStore';

interface BatchState {
  currentBatch: BatchProgress | null;
  isLoading: boolean;
  
  // Actions
  generateDailyBatch: () => Promise<void>;
  completeModule: (moduleId: string, score: number, timeSpent: number) => void;
  resetBatch: () => void;
}

export const useBatchStore = create<BatchState>((set, get) => ({
  currentBatch: null,
  isLoading: false,

  generateDailyBatch: async () => {
    try {
      set({ isLoading: true });
      
      const today = new Date().toDateString();
      const state = get();
      
      // Check if batch already exists for today
      if (state.currentBatch && state.currentBatch.date === today) {
        return;
      }
      
      // Generate new batch (in production, call API)
      // For now, use mock data
      const modules = await generateMockModules(25);
      
      const batch: BatchProgress = {
        id: `batch_${Date.now()}`,
        date: today,
        totalModules: modules.length,
        completedCount: 0,
        modules: modules.map((module, index) => ({
          id: `bm_${index}`,
          moduleId: module.id,
          module,
          position: index,
          completed: false,
          score: null,
          timeSpent: null,
        })),
      };
      
      set({ currentBatch: batch });
    } catch (error) {
      console.error('Generate batch error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  completeModule: (moduleId, score, timeSpent) => {
    const state = get();
    if (!state.currentBatch) return;
    
    const updatedModules = state.currentBatch.modules.map(bm => {
      if (bm.moduleId === moduleId && !bm.completed) {
        return { ...bm, completed: true, score, timeSpent };
      }
      return bm;
    });
    
    const completedCount = updatedModules.filter(m => m.completed).length;
    
    set({
      currentBatch: {
        ...state.currentBatch,
        modules: updatedModules,
        completedCount,
      }
    });
    
    // Award XP
    const module = state.currentBatch.modules.find(m => m.moduleId === moduleId)?.module;
    if (module) {
      useProgressStore.getState().addXP(module.xpReward);
    }
  },

  resetBatch: () => {
    set({ currentBatch: null });
  },
}));

// Mock module generator (will be replaced with API/Gemini in production)
async function generateMockModules(count: number): Promise<Module[]> {
  const domains = ['reasoning', 'memory', 'creativity', 'decision', 'flexibility', 'philosophy'];
  const modules: Module[] = [];
  
  for (let i = 0; i < count; i++) {
    modules.push({
      id: `mod_${i}`,
      title: `Module ${i + 1}: Cognitive Skill`,
      description: 'Learn essential cognitive techniques',
      domain: domains[i % domains.length],
      difficulty: Math.floor(Math.random() * 10) + 1,
      estimatedTime: 120,
      contentType: 'cognitive',
      cards: [
        {
          id: 'card-1',
          type: 'text',
          text: 'This is a sample cognitive module card.',
        },
        {
          id: 'card-2',
          type: 'text',
          text: 'More content would appear here in production.',
        },
      ],
      quiz: null,
      xpReward: 10,
    });
  }
  
  return modules;
}
