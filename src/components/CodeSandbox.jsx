// src/components/CodeSandbox.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CodeSandbox({ initialHtml, initialCss, initialJs }) {
    const [html, setHtml] = useState(initialHtml || '<div class="demo-box">Interactive Demo</div>')
    const [css, setCss] = useState(initialCss || `.demo-box {
  padding: 40px;
  background: linear-gradient(135deg, #2779a7, #ECD06F);
  border-radius: 12px;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.demo-box:hover {
  transform: scale(1.05);
}`)
    const [js, setJs] = useState(initialJs || `// Add your JavaScript here
document.querySelector('.demo-box')?.addEventListener('click', () => {
  alert('You clicked the demo box!');
});`)

    const [activeEditor, setActiveEditor] = useState('html')
    const [isFullscreen, setIsFullscreen] = useState(false)

    const generatePreview = () => {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `
    }

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black p-4' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                {/* Editor Panel */}
                <div className="glass overflow-hidden">
                    <div className="flex border-b border-white/10">
                        {['html', 'css', 'js'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveEditor(tab)}
                                className={`px-4 py-2 font-mono text-sm transition-all ${activeEditor === tab
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                        <div className="flex-1" />
                        <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            {isFullscreen ? '⤬' : '⤢'}
                        </button>
                    </div>

                    <textarea
                        value={activeEditor === 'html' ? html : activeEditor === 'css' ? css : js}
                        onChange={(e) => {
                            if (activeEditor === 'html') setHtml(e.target.value)
                            else if (activeEditor === 'css') setCss(e.target.value)
                            else setJs(e.target.value)
                        }}
                        className="w-full h-[500px] p-4 bg-black/50 font-mono text-sm text-white resize-none focus:outline-none"
                        spellCheck={false}
                    />
                </div>

                {/* Preview Panel */}
                <div className="glass overflow-hidden">
                    <div className="border-b border-white/10 px-4 py-2">
                        <span className="text-sm text-gray-400">Live Preview</span>
                    </div>
                    <iframe
                        title="sandbox-preview"
                        srcDoc={generatePreview()}
                        className="w-full h-[500px] bg-white rounded-b-lg"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                    />
                </div>
            </div>
        </div>
    )
}