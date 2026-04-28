// src/components/LivePreview.jsx
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function LivePreview({ html, css, js, reactCode, activeTab }) {
    const iframeRef = useRef(null)
    const [previewKey, setPreviewKey] = useState(0)

    useEffect(() => {
        // Debounce preview updates
        const timer = setTimeout(() => {
            updatePreview()
        }, 500)

        return () => clearTimeout(timer)
    }, [html, css, js, reactCode, activeTab])

    const updatePreview = () => {
        const iframe = iframeRef.current
        if (!iframe) return

        let finalHtml = ''

        if (activeTab === 'react') {
            // For React, we need to show a note since actual React execution requires build
            finalHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .react-note {
              background: rgba(39, 121, 167, 0.2);
              border: 1px solid rgba(39, 121, 167, 0.5);
              border-radius: 12px;
              padding: 20px;
              text-align: center;
              max-width: 400px;
            }
            code {
              background: rgba(0,0,0,0.3);
              padding: 2px 6px;
              border-radius: 4px;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="react-note">
            <h3>⚛️ React Component Preview</h3>
            <p>To see this React component live, copy the code and paste it into your React project.</p>
            <p>Dependencies: ${reactCode.match(/import.*from ['"](.+)['"]/g)?.join(', ') || 'None'}</p>
            <hr style="margin: 15px 0; border-color: rgba(255,255,255,0.1)" />
            <div style="font-size: 14px; text-align: left;">
              <strong>Preview of the component structure:</strong>
              <pre style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; overflow-x: auto; margin-top: 10px; font-size: 12px;"><code>${escapeHtml(reactCode.substring(0, 500))}${reactCode.length > 500 ? '...' : ''}</code></pre>
            </div>
          </div>
        </body>
        </html>
      `
        } else {
            // For HTML/CSS/JS, we can actually render it
            let combinedHtml = html || '<div class="preview-container">Live Preview</div>'

            // Inject CSS
            if (css) {
                combinedHtml = `
          <style>${css}</style>
          ${combinedHtml}
        `
            }

            // Inject JS
            if (js) {
                combinedHtml = `
          ${combinedHtml}
          <script>
            ${js}
          </script>
        `
            }

            finalHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: linear-gradient(135deg, #2779a7 0%, #ECD06F 100%);
              padding: 20px;
            }
          </style>
        </head>
        <body>
          ${combinedHtml}
        </body>
        </html>
      `
        }

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        iframeDoc.open()
        iframeDoc.write(finalHtml)
        iframeDoc.close()
    }

    const escapeHtml = (str) => {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
    }

    return (
        <div className="relative">
            <iframe
                ref={iframeRef}
                title="live-preview"
                className="w-full min-h-[400px] rounded-lg bg-white/5 border border-white/10"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                key={previewKey}
            />
            <button
                onClick={() => setPreviewKey(prev => prev + 1)}
                className="absolute top-2 right-2 px-3 py-1 glass text-xs hover:bg-white/10 transition-all"
            >
                🔄 Refresh Preview
            </button>
        </div>
    )
}