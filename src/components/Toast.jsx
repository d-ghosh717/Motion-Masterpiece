// src/components/Toast.jsx
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ show, message, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white shadow-xl">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}