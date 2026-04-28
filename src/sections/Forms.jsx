// src/sections/Forms.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ConfettiExplosion from 'react-confetti-explosion'

export default function Forms() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.message) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-gradient">Forms & Micro UX</h2>

        <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
          {['name', 'email', 'message'].map((field) => (
            <div key={field} className="relative">
              <input
                type={field === 'email' ? 'email' : 'text'}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                onFocus={() => setFocused({ ...focused, [field]: true })}
                onBlur={() => setFocused({ ...focused, [field]: false })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-all"
                placeholder=" "
              />
              <label className={`absolute left-4 transition-all pointer-events-none ${focused[field] || formData[field]
                  ? 'text-xs -top-2 bg-black/50 px-1 text-primary'
                  : 'text-gray-400 top-3'
                }`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <AnimatePresence>
                {errors[field] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors[field]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-lg transition-all"
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <>
            <ConfettiExplosion force={0.5} duration={2000} particleCount={100} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-8 right-8 px-6 py-3 bg-green-500 rounded-full text-white shadow-lg"
            >
              Message sent successfully! 🎉
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}