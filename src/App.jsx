import { useState, useEffect, useRef } from 'react';
import Loader from './components/Loader';
import Home from './sections/Home';
import About from './sections/About';
import WhatIDo from './sections/WhatIDo';
import TechStack from './sections/TechStack';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './components/Logo';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Ref tracking if programmatic scrolling is active to temporarily disable scroll spy
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  
  // Custom cursor elements refs for performance optimization (eliminating frame re-render lag)
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  // Default Theme Variables Setup
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', '#c5a880');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(197, 168, 128, 0.06)');
  }, []);

  useEffect(() => {
    if (loading) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Smooth drag lag for the cursor ring using hardware-accelerated RAF
    let followActive = true;
    const followMouse = () => {
      if (!followActive) return;

      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.15;
      ringY += dy * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(followMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(followMouse);

    // Track hover states globally to resize cursor ring without triggering app-wide state re-renders
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';
      
      if (cursorRingRef.current) {
        if (isInteractive) {
          cursorRingRef.current.classList.add('cursor-hover');
        } else {
          cursorRingRef.current.classList.remove('cursor-hover');
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Scroll spy for menu indicator
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const sections = ['home', 'projects', 'about', 'whatido', 'techstack', 'contact'];
      let current = '';

      // Check if we are at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      
      if (isAtBottom) {
        current = 'contact';
      } else {
        for (let section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // A section is active if its top is in the upper part of the viewport
            if (rect.top <= 160 && rect.bottom >= 160) {
              current = section;
              break;
            }
          }
        }
      }

      if (current) {
        setActiveSection(prev => {
          if (prev !== current) return current;
          return prev;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      followActive = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleMouseOver);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [loading]);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'whatido' },
    { label: 'Skills', id: 'techstack' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      setActiveSection(id);

      const offset = 90; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  return (
    <>
      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      
      {/* Custom Interactive Desktop Cursor (Performant hardware-accelerated refs) */}
      {!loading && (
        <div className="hidden lg:block">
          <div 
            ref={cursorDotRef}
            className="custom-cursor" 
          />
          <div 
            ref={cursorRingRef}
            className="custom-cursor-ring" 
          />
        </div>
      )}

      {/* Main Container */}
      <div className={`min-h-screen bg-transparent text-[#E4E4E7] font-sans transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Animated Aurora Background Blobs */}
        {!loading && (
          <div className="aurora-bg" />
        )}

        {/* Floating Glassmorphic Header */}
        <header className="fixed top-0 left-0 right-0 h-24 z-50 bg-[#0e0e0d]/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-12">
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Logo className="text-2xl md:text-3xl font-black" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8 text-sm font-semibold select-none">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors duration-300 relative py-1 uppercase tracking-wider text-[11px] ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-24 left-0 right-0 z-40 bg-[#0e0e0d]/95 backdrop-blur-lg border-b border-white/5 py-6 px-6 flex flex-col space-y-4 md:hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm font-semibold py-2 uppercase tracking-wider border-b border-white/5 ${
                    activeSection === item.id ? 'text-accent' : 'text-zinc-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central Layout Column */}
        <main className="max-w-6xl mx-auto px-6 md:px-12 pt-24">
          <div id="home"><Home /></div>
          <div id="projects" className="pt-24"><Projects /></div>
          <div id="about" className="pt-24"><About /></div>
          <div id="whatido" className="pt-24"><WhatIDo /></div>
          <div id="techstack" className="pt-24"><TechStack /></div>
          <div id="contact" className="pt-24 pb-20"><Contact /></div>
        </main>

      </div>
    </>
  );
};

export default App;
