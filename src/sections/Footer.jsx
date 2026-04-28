// src/sections/Footer.jsx
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Footer() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-primary transition-colors relative group"
              >
                {social}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            © 2024 Motion Masterpiece — Where interactions become art
          </p>

          <button
            onClick={scrollToTop}
            className="px-6 py-2 glass hover:bg-white/10 transition-all group"
          >
            <span className="group-hover:-translate-y-1 inline-block transition-transform">↑</span> Back to Top
          </button>
        </motion.div>
      </div>
    </footer>
  )
}