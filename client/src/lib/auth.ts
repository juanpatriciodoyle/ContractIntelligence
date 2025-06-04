import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'vendor';
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  switchToAdmin: () => void;
  switchToVendor: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 1,
        username: 'sarah',
        role: 'admin',
        firstName: 'Sarah',
        lastName: 'Mitchell',
        email: 'sarah@contractflow.com',
      },
      isAuthenticated: true,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      switchToAdmin: () => set({
        user: {
          id: 1,
          username: 'sarah',
          role: 'admin',
          firstName: 'Sarah',
          lastName: 'Mitchell',
          email: 'sarah@contractflow.com',
        }
      }),
      switchToVendor: () => set({
        user: {
          id: 2,
          username: 'alex',
          role: 'vendor',
          firstName: 'Alex',
          lastName: 'Rodriguez',
          email: 'alex@techcorp.com',
        }
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);