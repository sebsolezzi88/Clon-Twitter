import { create } from 'zustand';
import type { UserLoginData } from '../types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define la interfaz para el estado de autenticación
interface AuthState {
  user: UserLoginData | null; // El usuario puede ser nulo si no está logueado
  isAuthenticated: boolean;
  login: (userData: UserLoginData) => void;
  logout: () => void;
}

// Crea el store
/* export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
})); */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);