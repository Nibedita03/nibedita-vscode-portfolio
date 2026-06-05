import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, FileText } from 'lucide-react';

/* ─── Interactive Physics-Based Gravitational Grid Background ─── */
const InteractiveGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const points = [];
    const spacing = 36; // spacing between dots
    const mouse = { x: -1000, y: -1000, active: false };
    const maxDist = 130; // repulsion radius

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initGrid();
    };

    const initGrid = () => {
      points.length = 0;
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing - spacing / 2;
          const y = r * spacing - spacing / 2;
          points.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            size: 1.2
          });
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    initGrid();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Accent color to glow in (violet default)
      const accentColor = '#8b5cf6';
      const rVal = parseInt(accentColor.slice(1, 3), 16);
      const gVal = parseInt(accentColor.slice(3, 5), 16);
      const bVal = parseInt(accentColor.slice(5, 7), 16);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        let targetX = p.baseX;
        let targetY = p.baseY;
        let dotColor = 'rgba(255, 255, 255, 0.05)';
        let size = p.size;

        if (mouse.active) {
          const dx = mouse.x - p.baseX;
          const dy = mouse.y - p.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist; // 0 to 1
            const angle = Math.atan2(dy, dx);
            
            // Gravitational repulsion (push dots away from mouse)
            targetX = p.baseX - Math.cos(angle) * force * 18;
            targetY = p.baseY - Math.sin(angle) * force * 18;
            
            // Glow in active violet color
            dotColor = `rgba(${rVal}, ${gVal}, ${bVal}, ${0.08 + force * 0.45})`;
            size = p.size + force * 1.5;
          }
        }

        // Spring easing for smooth physics movements
        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-auto" 
    />
  );
};

/* ─── Big name component with violet gradient ─── */
const BigName = ({ text, wordDelay = 0, gradient = false }) => {
  return (
    <motion.span
      className="inline-block cursor-default select-none font-black"
      initial={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: wordDelay, duration: 0.7, type: 'spring', stiffness: 140, damping: 16 }}
      style={gradient ? {
        background: 'linear-gradient(110deg, #ffffff 15%, #c4b5fd 50%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      } : {
        color: '#ffffff'
      }}
    >{text}</motion.span>
  );
};

const Home = () => {
  const roles = ['Creative Technologist', 'Interaction Designer', 'Product Designer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let t;
    const cur = roles[roleIndex];
    if (isDeleting) t = setTimeout(() => setDisplayText(p => p.slice(0, -1)), 30);
    else t = setTimeout(() => setDisplayText(cur.slice(0, displayText.length + 1)), 65);
    if (!isDeleting && displayText === cur) t = setTimeout(() => setIsDeleting(true), 2200);
    else if (isDeleting && displayText === '') { setIsDeleting(false); setRoleIndex(p => (p + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-16 px-4">
      {/* Dynamic interactive canvas background grid */}
      <InteractiveGrid />

      {/* ── Main centered column ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl gap-6 md:gap-8 pointer-events-none">
        
        {/* Tag */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.3em] uppercase text-accent pointer-events-auto"
        >
          <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>✦</motion.span>
          Design · Code · Build
        </motion.div>

        {/* BIG NAME - Massive Typographical Scale */}
        <h1 className="font-black uppercase leading-[0.82] select-none text-[clamp(4.8rem,12.5vw,9.8rem)] flex flex-col items-center animate-pulse-slow"
          style={{ letterSpacing: '-0.04em' }}>
          <BigName text="NIBEDITA" gradient wordDelay={0.1} />
          <BigName text="BEHERA" wordDelay={0.4} />
        </h1>

        {/* Gradient separator */}
        <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        {/* Typing role */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex items-center gap-2 text-lg md:text-xl font-semibold">
          <span className="text-zinc-500 font-mono text-base">&gt;_</span>
          <span className="text-white">{displayText}</span>
          <span className="w-1 h-5 bg-accent animate-pulse rounded-sm" />
        </motion.div>

        {/* Bio Paragraph */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto px-4"
        >
          <p className="text-base md:text-lg lg:text-xl text-zinc-300 leading-relaxed font-sans tracking-wide font-medium">
            I don't like staying in one box. Some days I'm designing app experiences, other days I'm experimenting with creative code, AI, sound, or physical installations. My work is driven by curiosity and a love for turning complex ideas into engaging experiences that people can interact with.
            <span className="ml-1 text-accent animate-pulse">✦</span>
          </p>
        </motion.div>

        {/* CTAs - Integrated & Large */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full pointer-events-auto"
        >
          <div className="flex items-center gap-4">
            <a href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('projects');
                if (element) {
                  const offset = 90; // Navbar height
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = element.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider bg-accent hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-accent/20 text-[#0d0a1a] group"
            >
              Explore My Work <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            
            <a href="https://drive.google.com/file/d/1lPibMcc2eOshFhVoiXdD0hAcrevxYobx/view?usp=sharing"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-white shadow-xl group"
            >
              <FileText size={14} className="text-zinc-400 group-hover:text-white transition-colors" /> View CV
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 sm:ml-3 mt-2 sm:mt-0">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Available for work
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Home;
