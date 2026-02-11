import { create } from 'zustand';
import { User } from '../types';
import { authService } from '../services/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  signIn: async (email, password) => {
    try {
      set({ isLoading: true });
      const data = await authService.signIn(email, password);
      await get().loadUser();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email, password, username) => {
    try {
      set({ isLoading: true });
      await authService.signUp(email, password, username);
      await get().loadUser();
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      await authService.signOut();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  loadUser: async () => {
    try {
      set({ isLoading: true });
      const session = await authService.getSession();
      if (session) {
        // In production, fetch full user profile from your API
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          username: session.user.user_metadata?.username || null,
          level: 1,
          totalXP: 0,
          currentXP: 0,
          xpToNextLevel: 100,
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
          createdAt: session.user.created_at,
        };
        set({ user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Load user error:', error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
