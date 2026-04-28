// src/components/CustomCursor.jsx
import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // src/components/CustomCursor.jsx - UPDATED
  // Change colors to #2779a7
  const cursorRing = "border-2 border-[#2779a7]"
  const cursorDot = "bg-[#2779a7]"

  // Update all purple/pink references to the new colors

  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  useEffect(() => {
    const handles = []
    const interactiveElements = document.querySelectorAll('button, a, [data-magnetic]')

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.classList.add('scale-150', 'mix-blend-difference')
      if (cursorDotRef.current) cursorDotRef.current.classList.add('scale-150', 'opacity-0')
    }

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('scale-150', 'mix-blend-difference')
      if (cursorDotRef.current) cursorDotRef.current.classList.remove('scale-150', 'opacity-0')
    }

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
      handles.push({ el, onMouseEnter, onMouseLeave })
    })

    return () => {
      handles.forEach(({ el, onMouseEnter, onMouseLeave }) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  )

}