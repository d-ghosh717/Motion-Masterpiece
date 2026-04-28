// src/store/useSnippetStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSnippetStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      bookmarks: [],
      searchQuery: '',
      selectedCategory: 'all',
      selectedTags: [],
      codeTheme: 'dark',
      minified: false,

      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter(fav => fav !== id)
          : [...state.favorites, id]
      })),

      toggleBookmark: (id) => set((state) => ({
        bookmarks: state.bookmarks.includes(id)
          ? state.bookmarks.filter(b => b !== id)
          : [...state.bookmarks, id]
      })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedTags: (tags) => set({ selectedTags: tags }),
      toggleCodeTheme: () => set((state) => ({ codeTheme: state.codeTheme === 'dark' ? 'light' : 'dark' })),
      toggleMinified: () => set((state) => ({ minified: !state.minified })),
    }),
    {
      name: 'snippet-storage',
    }
  )
);

export default useSnippetStore