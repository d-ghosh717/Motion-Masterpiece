// src/sections/HoverLab.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function HoverLab() {
  const [tooltipText, setTooltipText] = useState('')

  const buttons = [
    { name: 'Ripple', class: 'ripple-btn' },
    { name: 'Magnetic', class: 'magnetic-btn' },
    { name: 'Liquid', class: 'liquid-btn' },
    { name: 'Gradient Shift', class: 'gradient-btn' },
  ]

  return (
    <section className="py-24 px-4 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gradient">Hover Lab</h2>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {buttons.map((btn, idx) => (
            <motion.button
              key={idx}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setTooltipText(btn.name)}
              onMouseLeave={() => setTooltipText('')}
            >
              <span className="relative z-10">{btn.name}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, idx) => (
            <motion.div
              key={idx}
              className="glass p-6 cursor-pointer group"
              whileHover={{ y: -10, boxShadow: '0 25px 40px -12px rgba(39, 121, 167, 0.3)' }}
            >
              <h3 className="text-2xl font-bold mb-3">Card {idx + 1}</h3>
              <p className="text-gray-400">Experience the depth and shadow as you hover over this interactive card.</p>
            </motion.div>
          ))}
        </div>

        {tooltipText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary rounded-full text-white text-sm z-50"
          >
            {tooltipText} Button
          </motion.div>
        )}
      </div>
    </section>
  )
}