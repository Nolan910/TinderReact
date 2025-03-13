import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: { email: string } | null;
  isAuthenticated: boolean;
  setUser: (user: { email: string }) => void;
  setIsAuthenticated: (setIsAuthenticated: boolean) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => {
        AsyncStorage.removeItem('user-storage'); 
        set({ user: null, isAuthenticated: false });
      },
      // logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;