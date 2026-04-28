// src/pages/Home.jsx - UPDATED
import React from 'react'
import Hero from '../sections/Hero'
import GlassGallery from '../sections/GlassGallery'
import HoverLab from '../sections/HoverLab'
import ScrollStory from '../sections/ScrollStory'
import GridMorph from '../sections/GridMorph'
import DepthZone from '../sections/DepthZone'
import Forms from '../sections/Forms'
import ThemeLab from '../sections/ThemeLab'
import PerformancePanel from '../sections/PerformancePanel'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <GlassGallery />
      <HoverLab />
      <ScrollStory />      {/* NEW - Added */}
      <GridMorph />
      <DepthZone />        {/* NEW - Added */}
      <Forms />
      <ThemeLab />
      <PerformancePanel />
      <Footer />
    </>
  )
}