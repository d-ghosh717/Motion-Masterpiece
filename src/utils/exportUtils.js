// src/utils/exportUtils.js
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export const exportSnippetAsZip = async (snippet, customCode = null) => {
  const zip = new JSZip()

  // Add files
  zip.file('index.html', snippet.html)
  zip.file('styles.css', snippet.css)
  zip.file('script.js', customCode || snippet.js)
  zip.file('Component.jsx', snippet.react)

  // Add README
  const readme = `# ${snippet.title}\n\n${snippet.description}\n\n## Installation\n\n${snippet.dependencies.map(d => `npm install ${d}`).join('\n')}\n\n## Usage\n\nCopy the code and paste into your project.`
  zip.file('README.md', readme)

  // Generate and download
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, `${snippet.id}-snippet.zip`)
}

export const formatCode = (code, minified = false) => {
  if (!minified) return code

  // Simple minification (remove extra whitespace)
  return code
    .replace(/\s+/g, ' ')
    .replace(/\/\*.*?\*\//g, '')
    .replace(/\/\/.*?\n/g, '')
    .trim()
}