// src/sections/DepthZone.jsx (NEW - Enhanced 3D)
import React, { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export default function DepthZone() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const springConfig = { damping: 20, stiffness: 150 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePos({ x, y })
      rotateX.set(y * 20)
      rotateY.set(x * 20)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseenter', () => setIsHovering(true))
      container.addEventListener('mouseleave', () => {
        setIsHovering(false)
        rotateX.set(0)
        rotateY.set(0)
      })
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [rotateX, rotateY])

  const cards = [
    {
      depth: 0,
      color: '#2779a7',
      title: 'Depth Layer 1',
      description: 'Base layer with subtle shadow',
      z: 0,
      scale: 1
    },
    {
      depth: 60,
      color: '#ECD06F',
      title: 'Depth Layer 2',
      description: 'Mid layer with enhanced depth',
      z: 40,
      scale: 0.95
    },
    {
      depth: 120,
      color: '#9C9C9C',
      title: 'Depth Layer 3',
      description: 'Top layer with maximum depth',
      z: 80,
      scale: 0.9
    }
  ]

  return (
    <section ref={containerRef} className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1a2f 0%, #0d1f3a 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#ECD06F' }}>
            3D Depth Zone
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience true 3D parallax with mouse tracking and depth perception
          </p>
        </motion.div>

        <div className="relative h-[600px] flex items-center justify-center perspective-1000">
          {cards.map((card, idx) => {
            const xOffset = mousePos.x * card.depth
            const yOffset = mousePos.y * card.depth

            return (
              <motion.div
                key={idx}
                className="absolute rounded-2xl p-8 backdrop-blur-md border border-white/20 shadow-2xl"
                style={{
                  width: '320px',
                  height: '420px',
                  background: `linear-gradient(135deg, ${card.color}40, ${card.color}20)`,
                  borderColor: `${card.color}80`,
                  transform: isHovering
                    ? `translateX(${xOffset}px) translateY(${yOffset}px) translateZ(${card.z}px) rotateX(${rotateX.get() * (idx + 1) * 0.5}deg) rotateY(${rotateY.get() * (idx + 1) * 0.5}deg) scale(${card.scale})`
                    : `translateZ(0px) scale(${card.scale})`,
                  transformStyle: 'preserve-3d',
                  transition: isHovering ? 'none' : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: `0 25px 50px -12px ${card.color}80`
                }}
              >
                <div className="flex flex-col h-full justify-between" style={{ transform: 'translateZ(30px)' }}>
                  <div>
                    <div className="text-5xl mb-4" style={{ color: card.color }}>
                      {idx === 0 && '🌊'}
                      {idx === 1 && '✨'}
                      {idx === 2 && '🚀'}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{card.title}</h3>
                    <p className="text-white/70 leading-relaxed">{card.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Depth</span>
                      <span style={{ color: card.color }}>+{card.z}px</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(card.z / 100) * 100}%`, background: card.color }} />
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                      {isHovering ? '🎯 Mouse tracking active' : '🖱️ Hover to activate 3D'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Depth indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 glass px-6 py-3 rounded-full">
            <span className="text-sm text-gray-400">Depth Perception</span>
            <div className="flex gap-1">
              {[0, 20, 40, 60, 80, 100].map(depth => (
                <div key={depth} className="w-1 h-8 rounded-full" style={{ background: depth <= 80 ? '#2779a7' : '#9C9C9C', opacity: 0.5 }} />
              ))}
            </div>
            <span className="text-sm" style={{ color: '#ECD06F' }}>100px max depth</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}