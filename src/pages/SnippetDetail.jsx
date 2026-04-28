// src/pages/SnippetDetail.jsx (FULLY FIXED with real-time sync)
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import { snippets } from '../data/snippets'
import { useSnippetStore } from '../store/useSnippetStore'
import Toast from '../components/Toast'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default function SnippetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('preview')
  const [codeTab, setCodeTab] = useState('html')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [previewKey, setPreviewKey] = useState(0)
  const { codeTheme } = useSnippetStore()

  // Customization state
  const [customOptions, setCustomOptions] = useState({
    primaryColor: '#2779a7',
    secondaryColor: '#ECD06F',
    backgroundColor: '#1a1a2e',
    speed: 1,
    size: 'medium',
    borderRadius: '12',
    glowIntensity: 'medium',
    animationType: 'slide'
  })

  const snippet = snippets.find(s => s.id === id)

  // Generate customized code in real-time
  const getCustomizedHtml = useCallback(() => {
    if (!snippet) return ''

    let customized = snippet.html || ''
    let customizedCss = snippet.css || ''

    // Replace colors in HTML
    customized = customized.replace(/#8b5cf6/gi, customOptions.primaryColor)
    customized = customized.replace(/#ec4899/gi, customOptions.secondaryColor)
    customized = customized.replace(/#3b82f6/gi, customOptions.primaryColor)
    customized = customized.replace(/#667eea/gi, customOptions.primaryColor)
    customized = customized.replace(/#764ba2/gi, customOptions.secondaryColor)

    // Replace colors in CSS
    customizedCss = customizedCss.replace(/#8b5cf6/gi, customOptions.primaryColor)
    customizedCss = customizedCss.replace(/#ec4899/gi, customOptions.secondaryColor)
    customizedCss = customizedCss.replace(/#3b82f6/gi, customOptions.primaryColor)
    customizedCss = customizedCss.replace(/#667eea/gi, customOptions.primaryColor)
    customizedCss = customizedCss.replace(/#764ba2/gi, customOptions.secondaryColor)

    // Add background color
    customizedCss += `
      body {
        background: ${customOptions.backgroundColor} !important;
      }
    `

    // Adjust sizes
    if (customOptions.size === 'large') {
      customizedCss = customizedCss.replace(/padding:\s*\d+px/g, 'padding: 28px')
      customizedCss = customizedCss.replace(/font-size:\s*\d+px/g, (match) => {
        const size = parseInt(match.match(/\d+/)[0])
        return `font-size: ${Math.round(size * 1.3)}px`
      })
      customizedCss = customizedCss.replace(/width:\s*\d+px/g, (match) => {
        const width = parseInt(match.match(/\d+/)[0])
        return `width: ${Math.round(width * 1.2)}px`
      })
    } else if (customOptions.size === 'small') {
      customizedCss = customizedCss.replace(/padding:\s*\d+px/g, 'padding: 12px')
      customizedCss = customizedCss.replace(/font-size:\s*\d+px/g, (match) => {
        const size = parseInt(match.match(/\d+/)[0])
        return `font-size: ${Math.round(size * 0.8)}px`
      })
    }

    // Add border radius
    customizedCss = customizedCss.replace(/border-radius:\s*\d+px/g, `border-radius: ${customOptions.borderRadius}px`)
    customizedCss = customizedCss.replace(/border-radius:\s*\d+rem/g, `border-radius: ${customOptions.borderRadius / 16}rem`)

    // Add glow intensity
    if (customOptions.glowIntensity === 'high') {
      customizedCss += `
        *:hover {
          box-shadow: 0 0 30px ${customOptions.primaryColor} !important;
        }
      `
    } else if (customOptions.glowIntensity === 'low') {
      customizedCss += `
        *:hover {
          box-shadow: 0 0 10px ${customOptions.primaryColor} !important;
        }
      `
    }

    // Add animation speed
    customizedCss = customizedCss.replace(/transition:\s*[^;]+;/g, `transition: all ${customOptions.speed}s cubic-bezier(0.34, 1.56, 0.64, 1);`)
    customizedCss += `
      * {
        transition-duration: ${customOptions.speed}s !important;
      }
    `

    return { html: customized, css: customizedCss }
  }, [snippet, customOptions])

  const [customizedCode, setCustomizedCode] = useState({ html: '', css: '' })

  useEffect(() => {
    if (snippet) {
      const newCode = getCustomizedHtml()
      setCustomizedCode(newCode)
      setPreviewKey(prev => prev + 1)
    }
  }, [snippet, customOptions, getCustomizedHtml])

  const getCode = () => {
    switch (codeTab) {
      case 'html': return customizedCode.html || snippet?.html || ''
      case 'css': return customizedCode.css || snippet?.css || ''
      case 'js': return snippet?.js || ''
      case 'react': return snippet?.react || ''
      default: return snippet?.html || ''
    }
  }

  const handleCopy = () => {
    const code = getCode()
    navigator.clipboard.writeText(code)
    setToastMessage(`${codeTab.toUpperCase()} code copied!`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleCopyAll = () => {
    const allCode = `/* HTML */\n${customizedCode.html}\n\n/* CSS */\n${customizedCode.css}\n\n/* JavaScript */\n${snippet?.js}\n\n/* React */\n${snippet?.react}`
    navigator.clipboard.writeText(allCode)
    setToastMessage('All code formats copied!')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleDownloadZip = async () => {
    const zip = new JSZip()
    zip.file(`${snippet?.id}.html`, customizedCode.html)
    zip.file(`${snippet?.id}.css`, customizedCode.css)
    zip.file(`${snippet?.id}.js`, snippet?.js || '')
    zip.file(`${snippet?.id}.jsx`, snippet?.react || '')
    zip.file('README.md', `# ${snippet?.title}\n\n${snippet?.description}\n\n## Customized with\n- Color: ${customOptions.primaryColor}\n- Speed: ${customOptions.speed}x\n- Size: ${customOptions.size}`)

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `${snippet?.id}-customized.zip`)
    setToastMessage('Zip download started!')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleReset = () => {
    setCustomOptions({
      primaryColor: '#2779a7',
      secondaryColor: '#ECD06F',
      backgroundColor: '#1a1a2e',
      speed: 1,
      size: 'medium',
      borderRadius: '12',
      glowIntensity: 'medium',
      animationType: 'slide'
    })
    setToastMessage('Reset to default settings')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  if (!snippet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Snippet not found</h2>
          <button onClick={() => navigate('/snippets')} className="px-6 py-2 glass">Back to Snippets</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button onClick={() => navigate('/snippets')} className="mb-4 text-gray-400 hover:text-white transition-colors">
            ← Back to Gallery
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">{snippet.title}</h1>
          <p className="text-xl text-gray-400">{snippet.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {snippet.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 glass text-sm">#{tag}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button onClick={handleCopyAll} className="px-6 py-2 glass hover:bg-white/10 transition-all">Copy All Formats</button>
            <button onClick={handleDownloadZip} className="px-6 py-2 glass hover:bg-white/10 transition-all">Download ZIP</button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="glass overflow-hidden mb-8">
          <div className="flex border-b border-white/10">
            {['preview', 'customize', 'code'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-medium transition-all ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
                }`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'preview' && (
              <div>
                <h3 className="text-xl font-bold mb-4">🎨 Live Interactive Preview</h3>
                <div className="bg-white/5 rounded-lg p-8 min-h-[400px]">
                  <iframe
                    key={previewKey}
                    title="live-preview"
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <meta charset="UTF-8">
                        <style>
                          * { margin: 0; padding: 0; box-sizing: border-box; }
                          body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            background: ${customOptions.backgroundColor};
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            min-height: 100vh;
                            padding: 20px;
                          }
                          ${customizedCode.css}
                        </style>
                      </head>
                      <body>
                        ${customizedCode.html}
                        <script>${snippet.js || ''}</script>
                      </body>
                      </html>
                    `}
                    className="w-full min-h-[500px] rounded-lg bg-white/5"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                  />
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  ⚡ Changes from the Customize tab update instantly here!
                </div>
              </div>
            )}

            {activeTab === 'customize' && (
              <div>
                <h3 className="text-xl font-bold mb-4">🎮 Real-time Customization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Primary Color</label>
                    <input
                      type="color"
                      value={customOptions.primaryColor}
                      onChange={(e) => setCustomOptions({ ...customOptions, primaryColor: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">Main brand color</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Secondary Color</label>
                    <input
                      type="color"
                      value={customOptions.secondaryColor}
                      onChange={(e) => setCustomOptions({ ...customOptions, secondaryColor: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">Accent/gradient color</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Background</label>
                    <input
                      type="color"
                      value={customOptions.backgroundColor}
                      onChange={(e) => setCustomOptions({ ...customOptions, backgroundColor: e.target.value })}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">Page background</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Animation Speed: {customOptions.speed}x
                    </label>
                    <input
                      type="range"
                      min="0.3"
                      max="2"
                      step="0.1"
                      value={customOptions.speed}
                      onChange={(e) => setCustomOptions({ ...customOptions, speed: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Component Size</label>
                    <select
                      value={customOptions.size}
                      onChange={(e) => setCustomOptions({ ...customOptions, size: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/10"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Border Radius</label>
                    <input
                      type="range"
                      min="0"
                      max="32"
                      step="2"
                      value={customOptions.borderRadius}
                      onChange={(e) => setCustomOptions({ ...customOptions, borderRadius: e.target.value })}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">{customOptions.borderRadius}px corners</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Glow Effect</label>
                    <select
                      value={customOptions.glowIntensity}
                      onChange={(e) => setCustomOptions({ ...customOptions, glowIntensity: e.target.value })}
                      className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/10"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    ✅ Live! Your changes are automatically applied to the preview. Try changing colors or speed!
                  </p>
                </div>

                <button onClick={handleReset} className="mt-4 px-6 py-2 glass hover:bg-white/10 transition-all">
                  Reset All Settings
                </button>
              </div>
            )}

            {activeTab === 'code' && (
              <div>
                <div className="flex border-b border-white/10 mb-4">
                  {['html', 'css', 'js', 'react'].map(tab => (
                    <button key={tab} onClick={() => setCodeTab(tab)} className={`px-4 py-2 font-mono text-sm transition-all ${codeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'
                      }`}>
                      {tab.toUpperCase()}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button onClick={handleCopy} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">📋 Copy</button>
                </div>

                <div className={`${codeTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-x-auto p-4 max-h-[500px] overflow-y-auto`}>
                  <pre className="overflow-x-auto">
                    <code className={`language-${codeTab === 'react' ? 'jsx' : codeTab}`}>
                      {getCode()}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}