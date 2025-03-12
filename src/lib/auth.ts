import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

// Dummy user data
const DUMMY_USER = {
  id: '1',
  email: 'admin',
  name: 'Admin User',
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'admin' && password === 'admin') {
        set({ user: DUMMY_USER, isAuthenticated: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, always succeed
      set({
        user: { id: Math.random().toString(), email, name },
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: () => {
    set({ user: null, isAuthenticated: false });
  },
}));