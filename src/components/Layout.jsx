// src/components/Layout.jsx
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import CustomCursor from './CustomCursor'
import Navbar from './Navbar'

export default function Layout() {
  const { performanceMode } = useStore()
  const location = useLocation()
  const isSnippetsPage = location.pathname.includes('snippets')

  return (
    <div className="relative">
      {!performanceMode && <CustomCursor />}
      <Navbar />
      <main className={isSnippetsPage ? 'pt-20' : ''}>
        <Outlet />
      </main>
    </div>
  )
}