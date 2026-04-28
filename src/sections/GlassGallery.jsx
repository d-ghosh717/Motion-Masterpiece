// src/sections/GlassGallery.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// src/sections/GlassGallery.jsx - UPDATED (with new colors)
// Update all gradient references from purple/pink to #2779a7 and #ECD06F
const projects = [
  { title: 'Ocean Dreams', category: '3D Art', gradient: 'from-[#2779a7] to-[#ECD06F]' },
  { title: 'Golden Waves', category: 'Motion Design', gradient: 'from-[#ECD06F] to-[#9C9C9C]' },
  { title: 'Crystal Core', category: 'Interactive', gradient: 'from-[#2779a7] to-[#9C9C9C]' },
  { title: 'Phantom Light', category: 'Generative', gradient: 'from-[#ECD06F] to-[#2779a7]' },
]

export default function GlassGallery() {
  const [selected, setSelected] = useState(null)
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gradient">Glass Gallery</h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              className="glass group cursor-pointer perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setSelected(project)}
            >
              <div className={`p-6 h-64 flex flex-col justify-end bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-all rounded-2xl`}>
                <h3 className="text-2xl font-bold text-white relative z-10">{project.title}</h3>
                <p className="text-white/70 relative z-10">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass max-w-2xl w-full p-8 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-bold mb-4">{selected.title}</h3>
              <p className="text-gray-300 mb-6">Experience the immersive world of {selected.title} — where art meets technology in perfect harmony.</p>
              <button className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white">
                Explore
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}