// src/sections/ScrollStory.jsx (NEW - Enhanced)
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollStory() {
  const progressRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    // Progress bar animation
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }
      }
    })

    // Sticky section animations
    sectionRefs.current.forEach((section, i) => {
      const title = section.querySelector('.story-title')
      const content = section.querySelector('.story-content')

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          gsap.to(content, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' })
        },
        onLeave: () => {
          gsap.to(title, { opacity: 0, y: -50, duration: 0.5 })
          gsap.to(content, { opacity: 0, y: 50, duration: 0.5 })
        },
        onLeaveBack: () => {
          gsap.to(title, { opacity: 0, y: -50, duration: 0.5 })
          gsap.to(content, { opacity: 0, y: 50, duration: 0.5 })
        }
      })
    })

    // Parallax images
    gsap.utils.toArray('.parallax-layer').forEach((layer, i) => {
      ScrollTrigger.create({
        trigger: '.story-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(layer, {
            y: self.progress * (i + 1) * 100,
            duration: 0.1,
            ease: 'none'
          })
        }
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const stories = [
    {
      title: 'The Vision',
      content: 'Every great journey begins with a single spark of inspiration. We believe in creating experiences that transcend the ordinary, where every interaction tells a story.',
      number: '01',
      bgColor: '#2779a7'
    },
    {
      title: 'The Craft',
      content: 'Meticulous attention to detail, seamless animations, and intuitive interactions define our approach. We craft digital experiences that feel alive and responsive.',
      number: '02',
      bgColor: '#ECD06F'
    },
    {
      title: 'The Future',
      content: 'Embracing cutting-edge technologies and innovative design patterns, we build for tomorrow while delivering exceptional experiences today.',
      number: '03',
      bgColor: '#2779a7'
    }
  ]

  return (
    <section className="story-container relative" style={{ backgroundColor: '#0a1a2f' }}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div ref={progressRef} className="h-full transition-all duration-300" style={{ width: '0%', background: 'linear-gradient(90deg, #2779a7, #ECD06F)' }} />
      </div>

      {/* Parallax Background Layers */}
      <div className="parallax-layer absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 20% 50%, #2779a7, transparent)' }} />
      <div className="parallax-layer absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at 80% 80%, #ECD06F, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-center mb-32"
          style={{ color: '#ECD06F' }}
        >
          Scroll Story
        </motion.h2>

        {stories.map((story, idx) => (
          <div
            key={idx}
            ref={el => sectionRefs.current[idx] = el}
            className="h-screen flex items-center justify-center sticky top-0"
            style={{ zIndex: 10 - idx }}
          >
            <div className="max-w-4xl mx-auto text-center px-6">
              <div className="mb-8">
                <span className="text-8xl font-bold opacity-20" style={{ color: story.bgColor }}>
                  {story.number}
                </span>
              </div>
              <h2 className="story-title text-5xl md:text-6xl font-bold mb-6 opacity-0 translate-y-10" style={{ color: story.bgColor }}>
                {story.title}
              </h2>
              <p className="story-content text-xl text-gray-300 leading-relaxed opacity-0 translate-y-10">
                {story.content}
              </p>
              <div className="story-content mt-8 flex justify-center gap-4 opacity-0 translate-y-10">
                <div className="w-12 h-0.5" style={{ background: story.bgColor }} />
                <div className="w-6 h-0.5" style={{ background: story.bgColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}