// src/sections/Hero.jsx - UPDATED
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton'
import ParticleBackground from '../components/ParticleBackground'

export default function Hero() {
  const containerRef = useRef(null)

  const revealText = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } }
  }

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-secondary/5 via-transparent to-transparent" style={{ transform: 'translate(50%, 50%)' }} />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={revealText} className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium" style={{ background: '#2779a720', color: '#ECD06F' }}>
              ✨ Next Generation Interactions
            </span>
          </motion.div>

          <motion.h1 variants={revealText} className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Motion</span>
            <br />
            <span className="text-white">Masterpiece</span>
          </motion.h1>

          <motion.p variants={revealText} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Where interactions become art — every scroll, every hover, every click tells a story
          </motion.p>

          <motion.div variants={revealText}>
            <MagneticButton className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-2xl transition-all" style={{ background: 'linear-gradient(135deg, #2779a7, #ECD06F)' }}>
              Begin Experience
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}