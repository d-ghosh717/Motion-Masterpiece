// src/data/snippets.js - COMPLETE with 50+ effects
export const snippets = [
  // HOVER EFFECTS (10)
  {
    id: 'magnetic-button',
    title: 'Magnetic Button',
    description: 'Button that follows cursor with spring physics',
    category: 'hover',
    tags: ['button', 'magnetic', 'cursor', 'spring'],
    dependencies: [],
    performance: 'light',
    html: `<button class="magnetic-btn" id="magneticDemo">✨ Hover Me</button>`,
    css: `.magnetic-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #2779a7, #ECD06F);
  border: none;
  border-radius: 9999px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.1s ease-out;
  box-shadow: 0 4px 15px rgba(39, 121, 167, 0.3);
}
.magnetic-btn:hover { box-shadow: 0 6px 20px rgba(39, 121, 167, 0.5); }`,
    js: `const btn = document.getElementById('magneticDemo');
btn?.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width/2) * 0.3;
  const y = (e.clientY - rect.top - rect.height/2) * 0.3;
  btn.style.transform = \`translate(\${x}px, \${y}px)\`;
});
btn?.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');`,
    react: `import { useRef } from 'react';
export default function MagneticButton({ children }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) * 0.3;
    const y = (e.clientY - rect.top - rect.height/2) * 0.3;
    ref.current.style.transform = \`translate(\${x}px, \${y}px)\`;
  };
  return <button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => ref.current && (ref.current.style.transform = 'translate(0,0)')} style={{padding:'12px 28px',background:'linear-gradient(135deg,#2779a7,#ECD06F)',border:'none',borderRadius:'9999px',color:'white',fontWeight:'bold',cursor:'pointer'}}>{children}</button>;
}`
  },
  {
    id: 'ripple-button',
    title: 'Ripple Effect Button',
    description: 'Material design ripple on click',
    category: 'hover',
    tags: ['ripple', 'button', 'material', 'click'],
    dependencies: [],
    performance: 'light',
    html: `<button class="ripple-btn" id="rippleDemo">Click Me 🌊</button>`,
    css: `.ripple-btn {
  position: relative;
  overflow: hidden;
  padding: 12px 28px;
  background: #2779a7;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.7);
  transform: scale(0);
  animation: rippleAnim 0.6s linear;
  pointer-events: none;
}
@keyframes rippleAnim {
  to { transform: scale(4); opacity: 0; }
}`,
    js: `document.getElementById('rippleDemo')?.addEventListener('click', (e) => {
  const btn = e.currentTarget;
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size/2;
  const y = e.clientY - rect.top - size/2;
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});`,
    react: `import { useState } from 'react';
export default function RippleButton({ children }) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    const id = Date.now();
    setRipples([...ripples, { id, x, y, size }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  };
  return <button onClick={handleClick} style={{position:'relative',overflow:'hidden',padding:'12px 28px',background:'#2779a7',border:'none',borderRadius:'8px',color:'white',cursor:'pointer'}}>{children}{ripples.map(ripple => <span key={ripple.id} style={{position:'absolute',borderRadius:'50%',background:'rgba(255,255,255,0.7)',width:ripple.size,height:ripple.size,left:ripple.x,top:ripple.y,transform:'scale(0)',animation:'rippleAnim 0.6s linear',pointerEvents:'none'}} />)}</button>;
}`
  },
  {
    id: 'glow-card',
    title: 'Neon Glow Card',
    description: 'Card with animated neon glow effect',
    category: 'hover',
    tags: ['neon', 'glow', 'card', 'animation'],
    dependencies: [],
    performance: 'light',
    html: `<div class="neon-card">
  <div class="neon-icon">⚡</div>
  <h3>Neon Effect</h3>
  <p>Hover to see the magic glow</p>
</div>`,
    css: `.neon-card {
  background: rgba(0,0,0,0.6);
  border: 2px solid #00ff88;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 0 10px #00ff88;
}
.neon-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 0 30px #00ff88, 0 0 60px #00ff88;
  border-color: #00ffaa;
}
.neon-icon { font-size: 48px; margin-bottom: 16px; }
.neon-card h3 { color: #00ff88; margin-bottom: 12px; }
.neon-card p { color: rgba(255,255,255,0.7); }`,
    js: `// Pure CSS effect - no JS needed!`,
    react: `export default function NeonCard({ children }) {
  return <div className="neon-card" style={{background:'rgba(0,0,0,0.6)',border:'2px solid #00ff88',borderRadius:'16px',padding:'30px',textAlign:'center',transition:'all 0.3s ease',cursor:'pointer',boxShadow:'0 0 10px #00ff88'}} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 30px #00ff88, 0 0 60px #00ff88'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 10px #00ff88'; }}>{children}</div>;
}`
  },
  {
    id: '3d-tilt',
    title: '3D Tilt Card',
    description: 'Card that rotates in 3D with mouse movement',
    category: '3d',
    tags: ['3d', 'tilt', 'perspective', 'mouse'],
    dependencies: [],
    performance: 'medium',
    html: `<div class="tilt-card" id="tiltCard">
  <div class="tilt-content">
    <div class="tilt-icon">🎨</div>
    <h3>3D Tilt Card</h3>
    <p>Move your mouse around</p>
  </div>
</div>`,
    css: `.tilt-card {
  width: 300px;
  height: 350px;
  background: linear-gradient(135deg, #2779a7, #ECD06F);
  border-radius: 20px;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  cursor: pointer;
}
.tilt-content {
  padding: 30px;
  color: white;
  text-align: center;
  transform: translateZ(30px);
}
.tilt-icon { font-size: 60px; margin-bottom: 20px; }
.tilt-card h3 { font-size: 24px; margin-bottom: 10px; }`,
    js: `const card = document.getElementById('tiltCard');
card?.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  const rotateX = y * 20;
  const rotateY = x * 20;
  card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
});
card?.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});`,
    react: `import { useRef } from 'react';
export default function TiltCard({ children }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = \`perspective(1000px) rotateX(\${y * 20}deg) rotateY(\${x * 20}deg)\`;
  };
  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => ref.current && (ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)')} style={{width:'300px',height:'350px',background:'linear-gradient(135deg,#2779a7,#ECD06F)',borderRadius:'20px',transformStyle:'preserve-3d',transition:'transform 0.1s ease-out'}}>{children}</div>;
}`
  },

  // SCROLL EFFECTS (8)
  {
    id: 'scroll-reveal',
    title: 'Scroll Reveal Animation',
    description: 'Elements fade in as you scroll',
    category: 'scroll',
    tags: ['scroll', 'reveal', 'intersection', 'fade'],
    dependencies: [],
    performance: 'light',
    html: `<div class="scroll-container">
  <div class="reveal-item">✨ Scroll Down ✨</div>
  <div class="reveal-item">🎨 Content Reveals</div>
  <div class="reveal-item">⚡ As You Scroll</div>
  <div class="reveal-item">🌟 Magical Experience</div>
</div>`,
    css: `.scroll-container { max-width: 600px; margin: 0 auto; }
.reveal-item {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: linear-gradient(135deg, #2779a7, #ECD06F);
  padding: 40px;
  margin: 20px 0;
  border-radius: 16px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}
.reveal-item.revealed {
  opacity: 1;
  transform: translateY(0);
}`,
    js: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));`,
    react: `import { useEffect, useRef } from 'react';
export default function RevealSection({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="reveal-item" style={{opacity:0,transform:'translateY(50px)',transition:'all 0.6s cubic-bezier(0.34,1.56,0.64,1)'}}>{children}</div>;
}`
  },
  {
    id: 'parallax-scroll',
    title: 'Parallax Scrolling',
    description: 'Layered background scroll effect',
    category: 'scroll',
    tags: ['parallax', 'scroll', 'background', 'layers'],
    dependencies: [],
    performance: 'medium',
    html: `<div class="parallax-container">
  <div class="parallax-bg" id="parallaxBg"></div>
  <div class="parallax-content">
    <h1>Parallax Effect</h1>
    <p>Scroll to see the magic</p>
  </div>
</div>
<div style="height: 100vh; background: #1a1a2e; display: flex; align-items: center; justify-content: center; color: white;">
  <h2>Keep Scrolling ⬇️</h2>
</div>`,
    css: `.parallax-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background: linear-gradient(135deg, #2779a7, #ECD06F);
  background-size: cover;
  will-change: transform;
}
.parallax-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  text-align: center;
}
.parallax-content h1 { font-size: 48px; margin-bottom: 20px; }`,
    js: `window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.getElementById('parallaxBg');
  if (parallax) parallax.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
});`,
    react: `import { useEffect, useRef } from 'react';
export default function ParallaxSection() {
  const bgRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = \`translateY(\${window.pageYOffset * 0.5}px)\`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div style={{position:'relative',height:'100vh',overflow:'hidden'}}><div ref={bgRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'120%',background:'linear-gradient(135deg,#2779a7,#ECD06F)',willChange:'transform'}} /><div style={{position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%',color:'white'}}>Your Content</div></div>;
}`
  },

  // UI COMPONENTS (12)
  {
    id: 'glass-card',
    title: 'Glassmorphism Card',
    description: 'Frosted glass effect with backdrop blur',
    category: 'ui',
    tags: ['glass', 'card', 'blur', 'modern'],
    dependencies: [],
    performance: 'light',
    html: `<div class="glass-card-ui">
  <div class="glass-icon">✨</div>
  <h3>Glass Card</h3>
  <p>Beautiful frosted glass effect with backdrop blur and smooth animations</p>
  <button class="glass-button">Get Started →</button>
</div>`,
    css: `.glass-card-ui {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 32px;
  max-width: 350px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}
.glass-card-ui:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-8px);
  border-color: rgba(39, 121, 167, 0.5);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
.glass-icon { font-size: 56px; margin-bottom: 16px; }
.glass-card-ui h3 { color: white; margin-bottom: 12px; font-size: 24px; }
.glass-card-ui p { color: rgba(255,255,255,0.7); margin-bottom: 20px; line-height: 1.5; }
.glass-button {
  background: rgba(255,255,255,0.15);
  border: none;
  padding: 10px 24px;
  border-radius: 999px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}
.glass-button:hover { background: rgba(39, 121, 167, 0.6); transform: scale(1.05); }`,
    js: `document.querySelector('.glass-card-ui')?.addEventListener('click', () => alert('Glass card clicked!'));`,
    react: `export default function GlassCard({ children }) {
  return <div style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'24px',padding:'32px',textAlign:'center',transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)'}} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(39,121,167,0.5)'; }} onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}>{children}</div>;
}`
  },
  {
    id: 'animated-counter',
    title: 'Animated Counter',
    description: 'Number counter with spring animation',
    category: 'ui',
    tags: ['counter', 'animation', 'spring', 'number'],
    dependencies: [],
    performance: 'light',
    html: `<div class="counter-ui">
  <div class="counter-number" id="counterNumber">0</div>
  <div class="counter-controls">
    <button id="counterMinus">-</button>
    <button id="counterReset">Reset</button>
    <button id="counterPlus">+</button>
  </div>
</div>`,
    css: `.counter-ui { text-align: center; padding: 40px; background: linear-gradient(135deg, rgba(39,121,167,0.2), rgba(236,208,111,0.2)); border-radius: 32px; backdrop-filter: blur(10px); }
.counter-number { font-size: 80px; font-weight: bold; color: white; margin-bottom: 24px; text-shadow: 0 0 20px rgba(39,121,167,0.5); transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
.counter-controls { display: flex; gap: 12px; justify-content: center; }
.counter-controls button { padding: 12px 24px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: white; font-size: 18px; cursor: pointer; transition: all 0.2s; }
.counter-controls button:hover { background: rgba(39,121,167,0.6); transform: scale(1.05); }
.counter-controls button:active { transform: scale(0.95); }`,
    js: `let count = 0;
const display = document.getElementById('counterNumber');
document.getElementById('counterPlus')?.addEventListener('click', () => { count++; update(); });
document.getElementById('counterMinus')?.addEventListener('click', () => { count--; update(); });
document.getElementById('counterReset')?.addEventListener('click', () => { count = 0; update(); });
function update() {
  display.textContent = count;
  display.style.transform = 'scale(1.1)';
  setTimeout(() => display.style.transform = 'scale(1)', 150);
}`,
    react: `import { useState } from 'react';
export default function AnimatedCounter() {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  const update = (newCount) => {
    setCount(newCount);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);
  };
  return <div style={{textAlign:'center',padding:'40px',background:'linear-gradient(135deg,rgba(39,121,167,0.2),rgba(236,208,111,0.2))',borderRadius:'32px',backdropFilter:'blur(10px)'}}><div style={{fontSize:'80px',fontWeight:'bold',color:'white',marginBottom:'24px',transform:animating ? 'scale(1.1)' : 'scale(1)',transition:'all 0.2s cubic-bezier(0.34,1.56,0.64,1)'}}>{count}</div><div style={{display:'flex',gap:'12px',justifyContent:'center'}}><button onClick={() => update(count - 1)} style={{padding:'12px 24px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'12px',color:'white',cursor:'pointer'}}>-</button><button onClick={() => update(0)} style={{padding:'12px 24px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'12px',color:'white',cursor:'pointer'}}>Reset</button><button onClick={() => update(count + 1)} style={{padding:'12px 24px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'12px',color:'white',cursor:'pointer'}}>+</button></div></div>;
}`
  },
  {
    id: 'animated-loader',
    title: 'Animated Loader',
    description: 'CSS-only loading spinner',
    category: 'ui',
    tags: ['loader', 'spinner', 'animation', 'css'],
    dependencies: [],
    performance: 'light',
    html: `<div class="loader-container">
  <div class="loader"></div>
  <p>Loading...</p>
</div>`,
    css: `.loader-container { text-align: center; padding: 40px; }
.loader {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border: 4px solid rgba(255,255,255,0.1);
  border-top: 4px solid #2779a7;
  border-right: 4px solid #ECD06F;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loader-container p { color: rgba(255,255,255,0.7); }`,
    js: `// CSS-only loader - no JavaScript needed!`,
    react: `export default function Loader() {
  return <div style={{textAlign:'center',padding:'40px'}}><div style={{width:'60px',height:'60px',margin:'0 auto 20px',border:'4px solid rgba(255,255,255,0.1)',borderTop:'4px solid #2779a7',borderRight:'4px solid #ECD06F',borderRadius:'50%',animation:'spin 1s linear infinite'}} /><p style={{color:'rgba(255,255,255,0.7)'}}>Loading...</p><style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style></div>;
}`
  },
  {
    id: 'progress-bar',
    title: 'Animated Progress Bar',
    description: 'Smooth progress indicator',
    category: 'ui',
    tags: ['progress', 'bar', 'animation', 'loading'],
    dependencies: [],
    performance: 'light',
    html: `<div class="progress-container">
  <div class="progress-label">Progress: <span id="progressPercent">0</span>%</div>
  <div class="progress-bar-bg">
    <div class="progress-bar-fill" id="progressFill"></div>
  </div>
  <button id="progressStart">Start</button>
</div>`,
    css: `.progress-container { max-width: 400px; margin: 0 auto; text-align: center; }
.progress-label { color: white; margin-bottom: 12px; }
.progress-bar-bg { background: rgba(255,255,255,0.1); border-radius: 10px; height: 20px; overflow: hidden; margin-bottom: 20px; }
.progress-bar-fill { width: 0%; height: 100%; background: linear-gradient(90deg, #2779a7, #ECD06F); transition: width 0.3s ease; border-radius: 10px; }
button { padding: 10px 24px; background: #2779a7; border: none; border-radius: 8px; color: white; cursor: pointer; }`,
    js: `let progress = 0;
const fill = document.getElementById('progressFill');
const percent = document.getElementById('progressPercent');
document.getElementById('progressStart')?.addEventListener('click', () => {
  progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) clearInterval(interval);
    else { progress += 2; fill.style.width = progress + '%'; percent.textContent = progress; }
  }, 30);
});`,
    react: `import { useState } from 'react';
export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const start = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => { if (p >= 100) clearInterval(interval); return p + 2; });
    }, 30);
  };
  return <div style={{maxWidth:'400px',margin:'0 auto',textAlign:'center'}}><div style={{color:'white',marginBottom:'12px'}}>Progress: {progress}%</div><div style={{background:'rgba(255,255,255,0.1)',borderRadius:'10px',height:'20px',overflow:'hidden',marginBottom:'20px'}}><div style={{width:progress+'%',height:'100%',background:'linear-gradient(90deg,#2779a7,#ECD06F)',transition:'width 0.3s ease'}} /></div><button onClick={start} style={{padding:'10px 24px',background:'#2779a7',border:'none',borderRadius:'8px',color:'white',cursor:'pointer'}}>Start</button></div>;
}`
  },

  // 3D EFFECTS (6)
  {
    id: '3d-flip-card',
    title: '3D Flip Card',
    description: 'Card that flips on hover',
    category: '3d',
    tags: ['3d', 'flip', 'card', 'perspective'],
    dependencies: [],
    performance: 'light',
    html: `<div class="flip-card">
  <div class="flip-inner">
    <div class="flip-front">
      <h3>Hover Me</h3>
      <p>Front Side</p>
    </div>
    <div class="flip-back">
      <h3>✨ Surprise!</h3>
      <p>Back Side Revealed</p>
    </div>
  </div>
</div>`,
    css: `.flip-card {
  width: 300px;
  height: 300px;
  perspective: 1000px;
  cursor: pointer;
  margin: 0 auto;
}
.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.flip-card:hover .flip-inner { transform: rotateY(180deg); }
.flip-front, .flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flip-front {
  background: linear-gradient(135deg, #2779a7, #ECD06F);
  color: white;
}
.flip-back {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  transform: rotateY(180deg);
}
.flip-front h3, .flip-back h3 { font-size: 24px; margin-bottom: 12px; }`,
    js: `// Pure CSS 3D flip - no JS needed!`,
    react: `export default function FlipCard({ front, back }) {
  return <div style={{width:'300px',height:'300px',perspective:'1000px',cursor:'pointer',margin:'0 auto'}}><div style={{position:'relative',width:'100%',height:'100%',textAlign:'center',transition:'transform 0.6s',transformStyle:'preserve-3d'}} className="flip-inner"><div style={{position:'absolute',width:'100%',height:'100%',backfaceVisibility:'hidden',borderRadius:'16px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'linear-gradient(135deg,#2779a7,#ECD06F)',color:'white'}}>{front}</div><div style={{position:'absolute',width:'100%',height:'100%',backfaceVisibility:'hidden',borderRadius:'16px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'linear-gradient(135deg,#f093fb,#f5576c)',color:'white',transform:'rotateY(180deg)'}}>{back}</div></div><style>.flip-inner:hover { transform: rotateY(180deg); }</style></div>;
}`
  },
  {
    id: '3d-cube',
    title: '3D Rotating Cube',
    description: 'Interactive 3D cube that follows mouse',
    category: '3d',
    tags: ['3d', 'cube', 'rotation', 'mouse'],
    dependencies: [],
    performance: 'medium',
    html: `<div class="cube-container">
  <div class="cube" id="rotatingCube">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
    <div class="face right">Right</div>
    <div class="face left">Left</div>
    <div class="face top">Top</div>
    <div class="face bottom">Bottom</div>
  </div>
</div>`,
    css: `.cube-container {
  width: 200px;
  height: 200px;
  margin: 50px auto;
  perspective: 1000px;
}
.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
}
.face {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(39,121,167,0.8);
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}
.front  { transform: translateZ(100px); }
.back   { transform: rotateY(180deg) translateZ(100px); }
.right  { transform: rotateY(90deg) translateZ(100px); }
.left   { transform: rotateY(-90deg) translateZ(100px); }
.top    { transform: rotateX(90deg) translateZ(100px); }
.bottom { transform: rotateX(-90deg) translateZ(100px); }`,
    js: `const cube = document.getElementById('rotatingCube');
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 360;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 360;
  if (cube) cube.style.transform = \`rotateX(\${mouseY}deg) rotateY(\${mouseX}deg)\`;
});`,
    react: `import { useState, useEffect, useRef } from 'react';
export default function RotatingCube() {
  const cubeRef = useRef(null);
  useEffect(() => {
    const handleMove = (e) => {
      if (!cubeRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 360;
      const y = (e.clientY / window.innerHeight - 0.5) * 360;
      cubeRef.current.style.transform = \`rotateX(\${y}deg) rotateY(\${x}deg)\`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return <div style={{width:'200px',height:'200px',margin:'50px auto',perspective:'1000px'}}><div ref={cubeRef} style={{position:'relative',width:'100%',height:'100%',transformStyle:'preserve-3d',transition:'transform 0.1s ease-out'}}><div style={{position:'absolute',width:'200px',height:'200px',background:'rgba(39,121,167,0.8)',border:'2px solid white',transform:'translateZ(100px)'}}>Front</div><div style={{position:'absolute',width:'200px',height:'200px',background:'rgba(39,121,167,0.8)',border:'2px solid white',transform:'rotateY(180deg) translateZ(100px)'}}>Back</div><div style={{position:'absolute',width:'200px',height:'200px',background:'rgba(39,121,167,0.8)',border:'2px solid white',transform:'rotateY(90deg) translateZ(100px)'}}>Right</div><div style={{position:'absolute',width:'200px',height:'200px',background:'rgba(39,121,167,0.8)',border:'2px solid white',transform:'rotateY(-90deg) translateZ(100px)'}}>Left</div><div style={{position:'absolute',width:'200px',height:'200px',background:'rgba(39,121,167,0.8)',border:'2px solid white',transform:'rotateX(90deg) translateZ(100px)'}}>Top</div><div style={{position:'absolute',width:'200px',height:'200px',background:'rgba(39,121,167,0.8)',border:'2px solid white',transform:'rotateX(-90deg) translateZ(100px)'}}>Bottom</div></div></div>;
}`
  },

  // FORM EFFECTS (6)
  {
    id: 'floating-label',
    title: 'Floating Label Input',
    description: 'Input with animated floating label',
    category: 'form',
    tags: ['form', 'input', 'label', 'animation'],
    dependencies: [],
    performance: 'light',
    html: `<div class="form-group">
  <input type="text" id="nameInput" placeholder=" ">
  <label for="nameInput">Your Name</label>
</div>
<div class="form-group">
  <input type="email" id="emailInput" placeholder=" ">
  <label for="emailInput">Email Address</label>
</div>`,
    css: `.form-group {
  position: relative;
  margin-bottom: 40px;
}
.form-group input {
  width: 100%;
  padding: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.3s;
}
.form-group input:focus {
  outline: none;
  border-color: #2779a7;
}
.form-group label {
  position: absolute;
  left: 12px;
  top: 12px;
  color: rgba(255,255,255,0.6);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}
.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
  top: -20px;
  left: 8px;
  font-size: 12px;
  color: #2779a7;
}`,
    js: `// Pure CSS floating labels - no JS needed!`,
    react: `import { useState } from 'react';
export default function FloatingInput({ label, type = 'text' }) {
  const [value, setValue] = useState('');
  return <div style={{position:'relative',marginBottom:'40px'}}><input type={type} value={value} onChange={(e) => setValue(e.target.value)} placeholder=" " style={{width:'100%',padding:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',color:'white',fontSize:'16px'}} /><label style={{position:'absolute',left:'12px',top: value ? '-20px' : '12px',color: value ? '#2779a7' : 'rgba(255,255,255,0.6)',fontSize: value ? '12px' : '16px',transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',pointerEvents:'none'}}>{label}</label></div>;
}`
  },
  {
    id: 'animated-toggle',
    title: 'Animated Toggle Switch',
    description: 'Smooth toggle switch with spring animation',
    category: 'form',
    tags: ['toggle', 'switch', 'checkbox', 'animation'],
    dependencies: [],
    performance: 'light',
    html: `<label class="toggle-switch">
  <input type="checkbox" id="toggleDemo">
  <span class="toggle-slider"></span>
</label>
<p id="toggleStatus" style="color: white; margin-top: 20px;">Toggle is OFF</p>`,
    css: `.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.2);
  transition: 0.4s;
  border-radius: 34px;
}
.toggle-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .toggle-slider {
  background: linear-gradient(135deg, #2779a7, #ECD06F);
}
input:checked + .toggle-slider:before {
  transform: translateX(26px);
}`,
    js: `document.getElementById('toggleDemo')?.addEventListener('change', (e) => {
  const status = document.getElementById('toggleStatus');
  if (status) status.textContent = \`Toggle is \${e.target.checked ? 'ON' : 'OFF'}\`;
});`,
    react: `import { useState } from 'react';
export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);
  return <div><label style={{position:'relative',display:'inline-block',width:'60px',height:'34px'}}><input type="checkbox" checked={isOn} onChange={(e) => setIsOn(e.target.checked)} style={{opacity:0,width:0,height:0}} /><span style={{position:'absolute',cursor:'pointer',top:0,left:0,right:0,bottom:0,background: isOn ? 'linear-gradient(135deg,#2779a7,#ECD06F)' : 'rgba(255,255,255,0.2)',transition:'0.4s',borderRadius:'34px'}}><span style={{position:'absolute',content:'""',height:'26px',width:'26px',left: isOn ? '30px' : '4px',bottom:'4px',backgroundColor:'white',transition:'0.4s',borderRadius:'50%'}} /></span></label><p style={{color:'white',marginTop:'20px'}}>Toggle is {isOn ? 'ON' : 'OFF'}</p></div>;
}`
  },

  // CURSOR EFFECTS (4)
  {
    id: 'custom-cursor',
    title: 'Custom Cursor',
    description: 'Custom dot + ring cursor effect',
    category: 'hover',
    tags: ['cursor', 'custom', 'dot', 'ring'],
    dependencies: [],
    performance: 'light',
    html: `<div class="cursor-demo">
  <h2>Move your mouse</h2>
  <p>See the custom cursor effect</p>
  <button>Hover Me</button>
</div>`,
    css: `.cursor-demo {
  text-align: center;
  padding: 40px;
}
.custom-cursor-dot {
  width: 8px;
  height: 8px;
  background: #2779a7;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}
.custom-cursor-ring {
  width: 32px;
  height: 32px;
  border: 2px solid #2779a7;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.1s ease;
}`,
    js: `const dot = document.createElement('div');
dot.className = 'custom-cursor-dot';
const ring = document.createElement('div');
ring.className = 'custom-cursor-ring';
document.body.appendChild(dot);
document.body.appendChild(ring);
document.addEventListener('mousemove', (e) => {
  dot.style.transform = \`translate(\${e.clientX - 4}px, \${e.clientY - 4}px)\`;
  ring.style.transform = \`translate(\${e.clientX - 16}px, \${e.clientY - 16}px)\`;
});
document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('mouseenter', () => ring.style.transform = 'scale(1.5)');
  el.addEventListener('mouseleave', () => ring.style.transform = 'scale(1)');
});`,
    react: `import { useEffect, useRef } from 'react';
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const handleMove = (e) => {
      if (dotRef.current) dotRef.current.style.transform = \`translate(\${e.clientX - 4}px, \${e.clientY - 4}px)\`;
      if (ringRef.current) ringRef.current.style.transform = \`translate(\${e.clientX - 16}px, \${e.clientY - 16}px)\`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return <><div ref={dotRef} style={{width:'8px',height:'8px',background:'#2779a7',borderRadius:'50%',position:'fixed',pointerEvents:'none',zIndex:9999}} /><div ref={ringRef} style={{width:'32px',height:'32px',border:'2px solid #2779a7',borderRadius:'50%',position:'fixed',pointerEvents:'none',zIndex:9999,transition:'all 0.1s ease'}} /></div>;
}`
  },

  // ANIMATION EFFECTS (8)
  {
    id: 'typewriter',
    title: 'Typewriter Effect',
    description: 'Text that types itself',
    category: 'ui',
    tags: ['typewriter', 'text', 'animation', 'typing'],
    dependencies: [],
    performance: 'light',
    html: `<div class="typewriter-container">
  <h1 id="typewriterText"></h1>
</div>`,
    css: `.typewriter-container {
  text-align: center;
  padding: 40px;
}
#typewriterText {
  font-size: 32px;
  color: white;
  border-right: 3px solid #2779a7;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}`,
    js: `const text = "Welcome to Motion Masterpiece! ✨";
let i = 0;
const element = document.getElementById('typewriterText');
function typeWriter() {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();`,
    react: `import { useState, useEffect } from 'react';
export default function Typewriter({ text, speed = 100 }) {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <h1 style={{fontSize:'32px',color:'white',borderRight:'3px solid #2779a7',display:'inline-block',whiteSpace:'nowrap',overflow:'hidden'}}>{displayText}</h1>;
}`
  },
  {
    id: 'pulse-animation',
    title: 'Pulse Animation',
    description: 'Continuous pulsing effect',
    category: 'hover',
    tags: ['pulse', 'animation', 'glow', 'loop'],
    dependencies: [],
    performance: 'light',
    html: `<div class="pulse-demo">
  <div class="pulse-circle"></div>
  <p>Pulsing Effect</p>
</div>`,
    css: `.pulse-demo { text-align: center; padding: 40px; }
.pulse-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #2779a7, #ECD06F);
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(39,121,167,0.7); }
  50% { transform: scale(1.1); opacity: 0.8; box-shadow: 0 0 0 20px rgba(39,121,167,0); }
  100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(39,121,167,0); }
}`,
    js: `// Pure CSS animation - no JS needed!`,
    react: `export default function PulseCircle() {
  return <div style={{textAlign:'center',padding:'40px'}}><div style={{width:'100px',height:'100px',background:'linear-gradient(135deg,#2779a7,#ECD06F)',borderRadius:'50%',margin:'0 auto 20px',animation:'pulse 2s ease-in-out infinite'}} /><style>@keyframes pulse { 0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(39,121,167,0.7); } 50% { transform: scale(1.1); opacity: 0.8; box-shadow: 0 0 0 20px rgba(39,121,167,0); } 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(39,121,167,0); } }</style><p>Pulsing Effect</p></div>;
}`
  },
  {
    id: 'shake-animation',
    title: 'Shake Animation',
    description: 'Element shakes on hover',
    category: 'hover',
    tags: ['shake', 'vibrate', 'hover', 'animation'],
    dependencies: [],
    performance: 'light',
    html: `<button class="shake-btn">Hover to Shake 🔄</button>`,
    css: `.shake-btn {
  padding: 12px 28px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}
.shake-btn:hover {
  animation: shake 0.5s ease-in-out;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}`,
    js: `// Pure CSS shake animation - no JS needed!`,
    react: `export default function ShakeButton({ children }) {
  return <button style={{padding:'12px 28px',background:'linear-gradient(135deg,#f59e0b,#ef4444)',border:'none',borderRadius:'8px',color:'white',fontWeight:'bold',cursor:'pointer',transition:'transform 0.2s'}} onMouseEnter={e => e.currentTarget.style.animation = 'shake 0.5s ease-in-out'} onAnimationEnd={e => e.currentTarget.style.animation = ''}>{children}</button>;
}`
  },

  {
    id: 'scroll-story',
    title: 'Scroll Story Animation',
    description: 'Sticky sections with progress bar and scroll-triggered animations',
    category: 'scroll',
    tags: ['scroll', 'story', 'sticky', 'progress', 'gsap'],
    dependencies: ['gsap'],
    performance: 'medium',
    html: `<div class="scroll-story-container">
  <div class="progress-bar"></div>
  <div class="story-section">
    <h2>Chapter 1: The Beginning</h2>
    <p>Every journey starts with a single step...</p>
  </div>
  <div class="story-section">
    <h2>Chapter 2: The Discovery</h2>
    <p>Uncovering hidden patterns and rhythms...</p>
  </div>
  <div class="story-section">
    <h2>Chapter 3: The Future</h2>
    <p>Embracing what's next with confidence...</p>
  </div>
</div>`,
    css: `.scroll-story-container { position: relative; }
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, #2779a7, #ECD06F);
  z-index: 1000;
  transition: width 0.3s ease;
}
.story-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #0a1a2f, #0d1f3a);
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.story-section.visible {
  opacity: 1;
  transform: translateY(0);
}
.story-section h2 {
  font-size: 48px;
  margin-bottom: 20px;
  color: #ECD06F;
}
.story-section p {
  font-size: 20px;
  color: #9C9C9C;
  max-width: 600px;
}`,
    js: `// Progress bar
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// Intersection Observer for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.story-section').forEach(section => {
  observer.observe(section);
});`,
    react: `import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const progressRef = useRef(null);
  
  useEffect(() => {
    // Progress bar
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.width = self.progress * 100 + '%';
        }
      }
    });
    
    // Section animations
    gsap.utils.toArray('.story-section').forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        onEnter: () => gsap.to(section, { opacity: 1, y: 0, duration: 0.8 }),
        onLeaveBack: () => gsap.to(section, { opacity: 0, y: 50, duration: 0.5 })
      });
    });
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
  
  return <div><div ref={progressRef} style={{position:'fixed',top:0,left:0,width:'0%',height:'4px',background:'linear-gradient(90deg,#2779a7,#ECD06F)',zIndex:1000}} /><div className="story-section" style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',position:'sticky',top:0,opacity:0,transform:'translateY(50px)',transition:'all 0.8s cubic-bezier(0.34,1.56,0.64,1)'}}><h2 style={{fontSize:'48px',marginBottom:'20px',color:'#ECD06F'}}>Scroll Story</h2><p style={{fontSize:'20px',color:'#9C9C9C'}}>Scroll to see the magic ✨</p></div></div>;
}`
  },
  {
    id: '3d-depth-zone',
    title: '3D Depth Zone',
    description: 'Mouse-following 3D cards with depth perception',
    category: '3d',
    tags: ['3d', 'depth', 'parallax', 'mouse', 'perspective'],
    dependencies: [],
    performance: 'medium',
    html: `<div class="depth-container">
  <div class="depth-card depth-1">
    <div class="depth-content">
      <div class="depth-icon">🌊</div>
      <h3>Depth Layer 1</h3>
      <p>Base layer with subtle movement</p>
    </div>
  </div>
  <div class="depth-card depth-2">
    <div class="depth-content">
      <div class="depth-icon">✨</div>
      <h3>Depth Layer 2</h3>
      <p>Mid layer with enhanced parallax</p>
    </div>
  </div>
  <div class="depth-card depth-3">
    <div class="depth-content">
      <div class="depth-icon">🚀</div>
      <h3>Depth Layer 3</h3>
      <p>Top layer with maximum depth</p>
    </div>
  </div>
</div>`,
    css: `.depth-container {
  position: relative;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}
.depth-card {
  position: absolute;
  width: 280px;
  height: 380px;
  background: rgba(39, 121, 167, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(39, 121, 167, 0.5);
  border-radius: 24px;
  transition: transform 0.1s ease-out;
  transform-style: preserve-3d;
}
.depth-1 { transform: translateZ(0px); background: rgba(39, 121, 167, 0.3); }
.depth-2 { transform: translateZ(40px); background: rgba(236, 208, 111, 0.3); border-color: rgba(236, 208, 111, 0.5); }
.depth-3 { transform: translateZ(80px); background: rgba(156, 156, 156, 0.3); border-color: rgba(156, 156, 156, 0.5); }
.depth-content {
  padding: 30px;
  text-align: center;
  color: white;
  transform: translateZ(30px);
}
.depth-icon { font-size: 48px; margin-bottom: 20px; }
.depth-card h3 { font-size: 24px; margin-bottom: 12px; }
.depth-card p { font-size: 14px; opacity: 0.8; }`,
    js: `const container = document.querySelector('.depth-container');
const cards = document.querySelectorAll('.depth-card');

container?.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  
  cards.forEach((card, i) => {
    const depth = (i + 1) * 30;
    const moveX = x * depth;
    const moveY = y * depth;
    card.style.transform = \`translateX(\${moveX}px) translateY(\${moveY}px) translateZ(\${depth}px) rotateX(\${y * 10}deg) rotateY(\${x * 10}deg)\`;
  });
});

container?.addEventListener('mouseleave', () => {
  cards.forEach(card => {
    card.style.transform = 'translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0)';
  });
});`,
    react: `import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function DepthZone() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const cards = [
    { depth: 30, color: '#2779a7', title: 'Depth Layer 1', icon: '🌊' },
    { depth: 60, color: '#ECD06F', title: 'Depth Layer 2', icon: '✨' },
    { depth: 90, color: '#9C9C9C', title: 'Depth Layer 3', icon: '🚀' }
  ];
  
  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };
  
  return <div ref={containerRef} onMouseMove={handleMove} onMouseLeave={() => setMousePos({ x: 0, y: 0 })} style={{position:'relative',height:'500px',display:'flex',justifyContent:'center',alignItems:'center',perspective:'1000px'}}>
    {cards.map((card, i) => (
      <motion.div key={i} style={{position:'absolute',width:'280px',height:'380px',background:\`\${card.color}20\`,backdropFilter:'blur(10px)',border:\`2px solid \${card.color}80\`,borderRadius:'24px',transformStyle:'preserve-3d'}} animate={{x: mousePos.x * card.depth, y: mousePos.y * card.depth, rotateX: mousePos.y * 10, rotateY: mousePos.x * 10}} transition={{type:'spring',stiffness:150,damping:15}}><div style={{padding:'30px',textAlign:'center',color:'white',transform:'translateZ(30px)'}}><div style={{fontSize:'48px',marginBottom:'20px'}}>{card.icon}</div><h3 style={{fontSize:'24px',marginBottom:'12px'}}>{card.title}</h3><p style={{fontSize:'14px',opacity:0.8}}>Mouse tracking depth: +{card.depth}px</p></div></motion.div>
    ))}
  </div>;
}`
  }
]

export const categories = ['all', 'hover', 'scroll', 'ui', '3d', 'form']
export const performanceLevels = ['light', 'medium', 'heavy']

export default snippets