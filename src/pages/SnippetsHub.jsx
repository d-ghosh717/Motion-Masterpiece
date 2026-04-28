// src/pages/SnippetsHub.jsx
import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnippetStore } from '../store/useSnippetStore'
import { snippets, categories, performanceLevels } from '../data/snippets'
import Toast from '../components/Toast'

export default function SnippetsHub() {
  const { searchQuery, selectedCategory, favorites, toggleFavorite, bookmarks, toggleBookmark } = useSnippetStore()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => {
      const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleCopyCode = (code, language) => {
    navigator.clipboard.writeText(code)
    setToastMessage(`${language} code copied to clipboard!`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Dev Snippets Hub
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Browse, preview, and copy ready-to-use code snippets for your next project
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search snippets by title, description, or tags..."
            className="w-full px-6 py-4 glass text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-all"
            value={searchQuery}
            onChange={(e) => useSnippetStore.getState().setSearchQuery(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => useSnippetStore.getState().setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all ${selectedCategory === cat
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'glass text-gray-400 hover:text-white'
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Snippets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSnippets.map((snippet, idx) => (
              <motion.div
                key={snippet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="glass group overflow-hidden"
              >
                {/* Preview Area */}
                <div className="relative h-48 bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎨</div>
                      <p className="text-sm text-white/60">Live Preview</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${snippet.performance === 'light' ? 'bg-green-500' :
                      snippet.performance === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                      {snippet.performance}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{snippet.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFavorite(snippet.id)}
                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        {favorites.includes(snippet.id) ? '⭐' : '☆'}
                      </button>
                      <button
                        onClick={() => toggleBookmark(snippet.id)}
                        className="text-gray-400 hover:text-primary transition-colors"
                      >
                        {bookmarks.includes(snippet.id) ? '🔖' : '📑'}
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{snippet.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {snippet.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-white/10 rounded-full text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/snippets/${snippet.id}`}
                      className="flex-1 text-center px-4 py-2 glass hover:bg-white/10 transition-all"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleCopyCode(snippet.react, 'React')}
                      className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg hover:shadow-lg transition-all"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredSnippets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No snippets found matching your criteria</p>
          </div>
        )}
      </div>

      <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}