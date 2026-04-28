// src/sections/PerformancePanel.jsx
import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'

export default function PerformancePanel() {
  const { performanceMode, reducedMotion, togglePerformanceMode, toggleReducedMotion } = useStore()
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = () => {
      frameCount++
      const now = performance.now()
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
      requestAnimationFrame(measureFPS)
    }

    const rafId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gradient">Performance Panel</h2>

        <div className="glass p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{fps}</div>
              <div className="text-gray-400 mt-2">Current FPS</div>
            </div>

            <div className="space-y-4">
              <button
                onClick={togglePerformanceMode}
                className={`w-full py-3 px-4 rounded-lg transition-all ${performanceMode ? 'bg-red-500' : 'bg-green-500'
                  } text-white font-semibold`}
              >
                {performanceMode ? 'Performance Mode: ON' : 'Performance Mode: OFF'}
              </button>

              <button
                onClick={toggleReducedMotion}
                className={`w-full py-3 px-4 rounded-lg transition-all ${reducedMotion ? 'bg-blue-500' : 'bg-gray-600'
                  } text-white font-semibold`}
              >
                {reducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-gray-400">
              Performance mode disables custom cursor and reduces particle effects.
              Reduced motion complies with accessibility preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}