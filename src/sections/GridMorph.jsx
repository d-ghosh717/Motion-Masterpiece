// src/sections/GridMorph.jsx - COMPLETELY FRESH CODE
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

const initialItems = [
  { id: 1, title: 'Creative Design', color: '#2779a7', size: 'large', icon: '🎨', description: 'Pushing boundaries of visual creativity' },
  { id: 2, title: 'Motion Magic', color: '#ECD06F', size: 'normal', icon: '✨', description: 'Smooth animations that delight' },
  { id: 3, title: '3D Depth', color: '#9C9C9C', size: 'small', icon: '🎯', description: 'Immersive dimensional experiences' },
  { id: 4, title: 'Interactive', color: '#2779a7', size: 'normal', icon: '🖱️', description: 'Engaging user interactions' },
  { id: 5, title: 'Responsive', color: '#ECD06F', size: 'large', icon: '📱', description: 'Perfect on any device' },
  { id: 6, title: 'Performance', color: '#9C9C9C', size: 'normal', icon: '⚡', description: 'Lightning fast experiences' },
  { id: 7, title: 'Accessible', color: '#2779a7', size: 'small', icon: '♿', description: 'Inclusive by design' },
  { id: 8, title: 'Innovative', color: '#ECD06F', size: 'normal', icon: '💡', description: 'Cutting-edge solutions' },
  { id: 9, title: 'Scalable', color: '#9C9C9C', size: 'normal', icon: '📈', description: 'Grows with your needs' },
]

export default function GridMorph() {
  const [items, setItems] = useState(initialItems)
  const [isShuffling, setIsShuffling] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  const shuffleLayout = () => {
    setIsShuffling(true)
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    setItems(shuffled)
    setTimeout(() => setIsShuffling(false), 500)
  }

  const sortBySize = () => {
    setIsShuffling(true)
    const sorted = [...items].sort((a, b) => {
      const sizeOrder = { large: 3, normal: 2, small: 1 }
      return sizeOrder[b.size] - sizeOrder[a.size]
    })
    setItems(sorted)
    setTimeout(() => setIsShuffling(false), 500)
  }

  const resetLayout = () => {
    setIsShuffling(true)
    setItems(initialItems)
    setTimeout(() => setIsShuffling(false), 500)
  }

  const getSizeClass = (size) => {
    switch (size) {
      case 'large': return 'md:col-span-2 md:row-span-2'
      case 'small': return 'md:col-span-1'
      default: return 'md:col-span-1'
    }
  }

  const getHeightClass = (size) => {
    switch (size) {
      case 'large': return 'h-96'
      case 'small': return 'h-48'
      default: return 'h-64'
    }
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1a2f 0%, #0d1f3a 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#ECD06F' }}>
            Grid Morph
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Dynamic grid layout with FLIP animations — watch items smoothly transition between positions
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={shuffleLayout}
              disabled={isShuffling}
              className="px-6 py-3 rounded-lg font-semibold transition-all text-white disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #2779a7, #ECD06F)' }}
            >
              {isShuffling ? '✨ Morphing...' : '🔀 Shuffle Layout'}
            </button>
            <button
              onClick={sortBySize}
              disabled={isShuffling}
              className="px-6 py-3 glass rounded-lg font-semibold transition-all hover:bg-white/10 text-white"
            >
              📏 Sort by Size
            </button>
            <button
              onClick={resetLayout}
              disabled={isShuffling}
              className="px-6 py-3 glass rounded-lg font-semibold transition-all hover:bg-white/10 text-white"
            >
              🔄 Reset Grid
            </button>
          </div>
        </motion.div>

        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    duration: 0.5
                  }}
                  className={`${getSizeClass(item.size)} ${getHeightClass(item.size)} rounded-2xl cursor-pointer relative overflow-hidden group`}
                  style={{ backgroundColor: `${item.color}15`, border: `2px solid ${item.color}40` }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="w-full h-full p-6 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <motion.p
                        className="text-gray-300 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.description}
                      </motion.p>
                    </div>

                    <motion.div
                      className="flex justify-between items-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredId === item.id ? 0 : 20, opacity: hoveredId === item.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-xs text-white/50">ID: {item.id}</span>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${item.color}40`, color: item.color }}>
                        {item.size}
                      </span>
                    </motion.div>
                  </div>

                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === item.id ? 0.2 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: `linear-gradient(135deg, ${item.color}, transparent)` }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 glass px-6 py-3 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2779a7' }} />
              <span className="text-sm text-gray-400">Large Items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ECD06F' }} />
              <span className="text-sm text-gray-400">Normal Items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9C9C9C' }} />
              <span className="text-sm text-gray-400">Small Items</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}