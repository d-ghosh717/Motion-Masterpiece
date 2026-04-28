// src/pages/Playground.jsx - FIXED dropdown visibility
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Prism from 'prismjs'
import { snippets } from '../data/snippets'
import Toast from '../components/Toast'

export default function Playground() {
  const [selectedSnippet, setSelectedSnippet] = useState(snippets[0])
  const [html, setHtml] = useState(snippets[0].html)
  const [css, setCss] = useState(snippets[0].css)
  const [js, setJs] = useState(snippets[0].js)
  const [activeEditor, setActiveEditor] = useState('html')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [previewKey, setPreviewKey] = useState(0)

  useEffect(() => {
    Prism.highlightAll()
  }, [html, css, js, activeEditor])

  const handleSnippetChange = (snippetId) => {
    const snippet = snippets.find(s => s.id === snippetId)
    if (snippet) {
      setSelectedSnippet(snippet)
      setHtml(snippet.html)
      setCss(snippet.css)
      setJs(snippet.js)
      setPreviewKey(prev => prev + 1)
    }
  }

  const generatePreviewHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
          window.onerror = function(msg, url, line, col, error) {
            console.error('Preview Error:', msg);
            return false;
          };
        </script>
      </body>
      </html>
    `
  }

  const handleExport = () => {
    const exportCode = `<!-- HTML -->\n${html}\n\n<!-- CSS -->\n${css}\n\n<!-- JavaScript -->\n${js}`
    navigator.clipboard.writeText(exportCode)
    setToastMessage('Code exported to clipboard!')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleReset = () => {
    setHtml(selectedSnippet.html)
    setCss(selectedSnippet.css)
    setJs(selectedSnippet.js)
    setPreviewKey(prev => prev + 1)
    setToastMessage('Reset to original code')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const getCurrentCode = () => {
    switch (activeEditor) {
      case 'html': return html
      case 'css': return css
      case 'js': return js
      default: return html
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gradient mb-4">Code Playground</h1>
          <p className="text-xl text-gray-400">Edit, customize, and see changes instantly</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Editor */}
          <div className="space-y-4">
            <div className="glass p-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Select Template</label>
              <select
                onChange={(e) => handleSnippetChange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#2779a7] cursor-pointer"
                value={selectedSnippet.id}
                style={{ backgroundColor: '#1f2937', color: 'white' }}
              >
                {snippets.map(snippet => (
                  <option key={snippet.id} value={snippet.id} style={{ backgroundColor: '#1f2937', color: 'white' }}>
                    {snippet.title} - {snippet.description.substring(0, 50)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="glass overflow-hidden">
              <div className="flex border-b border-white/10">
                {['html', 'css', 'js'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveEditor(tab)}
                    className={`px-4 py-2 font-mono text-sm transition-all ${activeEditor === tab
                        ? 'text-[#ECD06F] border-b-2 border-[#ECD06F]'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    {tab.toUpperCase()}
                    {activeEditor === tab && (
                      <span className="ml-2 text-xs text-green-400">● Live</span>
                    )}
                  </button>
                ))}
              </div>

              <textarea
                value={getCurrentCode()}
                onChange={(e) => {
                  if (activeEditor === 'html') setHtml(e.target.value)
                  else if (activeEditor === 'css') setCss(e.target.value)
                  else setJs(e.target.value)
                  setPreviewKey(prev => prev + 1)
                }}
                className="w-full h-[500px] p-4 bg-gray-900 font-mono text-sm text-white resize-none focus:outline-none"
                spellCheck={false}
                placeholder={`Write your ${activeEditor.toUpperCase()} code here...`}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleExport}
                className="flex-1 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-white"
                style={{ background: 'linear-gradient(135deg, #2779a7, #ECD06F)' }}
              >
                📋 Export Code
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 glass rounded-lg hover:bg-white/10 transition-all text-white"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="glass overflow-hidden">
            <div className="border-b border-white/10 px-4 py-3 flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-[#ECD06F]">Live Preview</span>
                <span className="ml-2 text-xs text-green-400">● Interactive</span>
              </div>
              <button
                onClick={() => setPreviewKey(prev => prev + 1)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                🔄 Refresh
              </button>
            </div>

            <iframe
              key={previewKey}
              title="playground-preview"
              srcDoc={generatePreviewHTML()}
              className="w-full h-[600px] bg-white rounded-b-lg"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            />

            <div className="border-t border-white/10 px-4 py-3 bg-black/30">
              <div className="flex gap-4 text-xs text-gray-400">
                <span>✅ Hover effects work</span>
                <span>✅ Click interactions live</span>
                <span>✅ Real-time updates</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 glass"
        >
          <h3 className="text-lg font-bold mb-3 text-[#ECD06F]">💡 Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div><span className="text-[#2779a7]">→</span> Edit HTML/CSS/JS in real-time</div>
            <div><span className="text-[#2779a7]">→</span> See your changes instantly in the preview</div>
            <div><span className="text-[#2779a7]">→</span> Export final code when you're done</div>
          </div>
        </motion.div>
      </div>

      <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}