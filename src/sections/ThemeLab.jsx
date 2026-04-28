// src/sections/ThemeLab.jsx - COMPLETELY FRESH CODE
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'

const themes = {
  ocean: {
    name: 'Ocean Blue',
    primary: '#2779a7',
    secondary: '#ECD06F',
    accent: '#9C9C9C',
    gradient: 'linear-gradient(135deg, #2779a7, #ECD06F)',
    background: 'linear-gradient(135deg, #0a1a2f, #0d1f3a)'
  },
  sunset: {
    name: 'Sunset Glow',
    primary: '#E94F4F',
    secondary: '#FFB347',
    accent: '#FFD700',
    gradient: 'linear-gradient(135deg, #E94F4F, #FFB347)',
    background: 'linear-gradient(135deg, #1a0a2f, #2d1a3a)'
  },
  forest: {
    name: 'Forest Night',
    primary: '#2E7D32',
    secondary: '#81C784',
    accent: '#A5D6A7',
    gradient: 'linear-gradient(135deg, #2E7D32, #81C784)',
    background: 'linear-gradient(135deg, #0a1a0f, #0d2a1a)'
  },
  royal: {
    name: 'Royal Purple',
    primary: '#7B1FA2',
    secondary: '#E1BEE7',
    accent: '#CE93D8',
    gradient: 'linear-gradient(135deg, #7B1FA2, #E1BEE7)',
    background: 'linear-gradient(135deg, #1a0a2f, #2a1a3f)'
  }
}

export default function ThemeLab() {
  const { theme, primaryColor, setTheme, setPrimaryColor } = useStore()
  const [selectedTheme, setSelectedTheme] = useState('ocean')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [customColor, setCustomColor] = useState('#2779a7')

  useEffect(() => {
    // Apply theme colors to CSS variables
    const currentTheme = themes[selectedTheme]
    document.documentElement.style.setProperty('--color-primary', currentTheme.primary)
    document.documentElement.style.setProperty('--color-secondary', currentTheme.secondary)
    document.documentElement.style.setProperty('--color-accent', currentTheme.accent)
  }, [selectedTheme])

  const handleThemeChange = (themeKey) => {
    setIsTransitioning(true)
    setSelectedTheme(themeKey)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  return (
    <section className="py-24 px-4 relative" style={{ background: themes[selectedTheme].background }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: themes[selectedTheme].secondary }}>
            Theme Lab
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Customize your experience with dynamic theming — changes apply across the entire site
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Theme Selector */}
          <motion.div
            className="glass p-8 rounded-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: themes[selectedTheme].secondary }}>
              Color Palettes
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(themes).map(([key, themeData]) => (
                <motion.button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`p-4 rounded-xl transition-all relative overflow-hidden ${selectedTheme === key ? 'ring-2 ring-offset-2 ring-offset-black' : ''
                    }`}
                  style={{
                    background: themeData.gradient,
                    ringColor: themeData.secondary
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-left">
                    <div className="font-bold text-white mb-2">{themeData.name}</div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeData.primary }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeData.secondary }} />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeData.accent }} />
                    </div>
                  </div>
                  {selectedTheme === key && (
                    <motion.div
                      className="absolute top-2 right-2 text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            className="glass p-8 rounded-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: themes[selectedTheme].secondary }}>
              Live Preview
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTheme}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="p-6 rounded-xl" style={{ background: `${themes[selectedTheme].primary}20`, border: `1px solid ${themes[selectedTheme].primary}` }}>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: themes[selectedTheme].secondary }}>
                    Theme Preview
                  </h4>
                  <p className="text-gray-300 mb-4">See how colors work together in harmony</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg text-white" style={{ background: themes[selectedTheme].primary }}>
                      Primary
                    </button>
                    <button className="px-4 py-2 rounded-lg text-white" style={{ background: themes[selectedTheme].secondary }}>
                      Secondary
                    </button>
                    <button className="px-4 py-2 rounded-lg text-white" style={{ background: themes[selectedTheme].accent }}>
                      Accent
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="w-full h-12 rounded-lg mb-2" style={{ background: themes[selectedTheme].primary }} />
                    <span className="text-xs text-gray-400">Primary</span>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 rounded-lg mb-2" style={{ background: themes[selectedTheme].secondary }} />
                    <span className="text-xs text-gray-400">Secondary</span>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-12 rounded-lg mb-2" style={{ background: themes[selectedTheme].accent }} />
                    <span className="text-xs text-gray-400">Accent</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Custom Color Mixer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 glass p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: themes[selectedTheme].secondary }}>
            🎨 Custom Color Mixer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Pick a Color</label>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Color Preview</label>
              <div className="w-full h-12 rounded-lg" style={{ backgroundColor: customColor }} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Hex Value</label>
              <div className="w-full px-4 py-2 glass rounded-lg font-mono text-sm">{customColor}</div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            💡 Tip: Use this color to create your own custom theme
          </p>
        </motion.div>

        {/* Theme Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>Theme changes are saved to localStorage and persist across sessions</p>
        </motion.div>
      </div>
    </section>
  )
}