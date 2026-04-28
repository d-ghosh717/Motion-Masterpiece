// src/App.jsx
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useStore } from './store/useStore'
import Layout from './components/Layout'
import Home from './pages/Home'
import SnippetsHub from './pages/SnippetsHub'
import SnippetDetail from './pages/SnippetDetail'
import Playground from './pages/Playground'

function App() {
  const { performanceMode } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="snippets" element={<SnippetsHub />} />
        <Route path="snippets/:id" element={<SnippetDetail />} />
        <Route path="playground" element={<Playground />} />
      </Route>
    </Routes>
  )
}

export default App