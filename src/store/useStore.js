// src/store/useStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      theme: 'dark',
      primaryColor: 'masterpiece',
      performanceMode: false,
      reducedMotion: false,
      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      togglePerformanceMode: () => set((state) => ({ performanceMode: !state.performanceMode })),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
    }),
    {
      name: 'theme-storage',
    }
  )
)

export default useStore