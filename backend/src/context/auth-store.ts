import { create } from 'zustand';
import { User, UserRole } from '@/lib/types';
import { api } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string, role: UserRole) => {
    set({ isLoading: true });
    try {
      const response = await api.auth.login(email, password, role);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (profileData) => {
    try {
      const updatedUser = await api.users.updateProfile(profileData);
      set({ user: updatedUser });
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }
}));