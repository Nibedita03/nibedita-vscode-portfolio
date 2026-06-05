import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Home, Briefcase, User, Layers, Code, 
  Mail, Palette, FileText, Terminal, Sparkles
} from 'lucide-react';

const CommandPalette = ({ 
  isOpen, 
  onClose, 
  onThemeChange, 
  onNavClick
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      // Timeout to ensure input is rendered before focus
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const items = [
    { id: 'nav-home', title: 'Go to Home Section', category: 'Navigation', icon: <Home size={16} />, action: () => onNavClick('home') },
    { id: 'nav-projects', title: 'Go to Work / Case Studies', category: 'Navigation', icon: <Briefcase size={16} />, action: () => onNavClick('projects') },
    { id: 'nav-about', title: 'Go to About Me', category: 'Navigation', icon: <User size={16} />, action: () => onNavClick('about') },
    { id: 'nav-services', title: 'Go to Services', category: 'Navigation', icon: <Layers size={16} />, action: () => onNavClick('whatido') },
    { id: 'nav-skills', title: 'Go to Skills & Tools', category: 'Navigation', icon: <Code size={16} />, action: () => onNavClick('techstack') },
    { id: 'nav-contact', title: 'Go to Contact Form', category: 'Navigation', icon: <Mail size={16} />, action: () => onNavClick('contact') },
    
    { id: 'theme-violet', title: 'Switch to Neon Violet Theme', category: 'Theme Customization', icon: <Palette size={16} className="text-violet-400" />, action: () => onThemeChange('violet') },
    { id: 'theme-rose', title: 'Switch to Cosmic Rose Theme', category: 'Theme Customization', icon: <Palette size={16} className="text-pink-400" />, action: () => onThemeChange('rose') },
    { id: 'theme-cyan', title: 'Switch to Electric Cyan Theme', category: 'Theme Customization', icon: <Palette size={16} className="text-cyan-400" />, action: () => onThemeChange('cyan') },
    { id: 'theme-gold', title: 'Switch to Solar Gold Theme', category: 'Theme Customization', icon: <Palette size={16} className="text-yellow-400" />, action: () => onThemeChange('gold') },
    
    { id: 'action-resume', title: 'Open Professional Resume (PDF)', category: 'Utilities', icon: <FileText size={16} />, action: () => window.open('https://drive.google.com/file/d/1lPibMcc2eOshFhVoiXdD0hAcrevxYobx/view?usp=sharing', '_blank') }
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // Reset selected index when search changes
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.children[selectedIndex];
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center pt-24 px-4 md:px-0">
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-[#0d0e16]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10"
          >
            {/* Input Wrapper */}
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="text-zinc-500 mr-3" size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search actions, sections, or themes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full py-4 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm font-sans"
              />
              <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-zinc-400 font-mono select-none">ESC</span>
            </div>

            {/* List Content */}
            <div 
              ref={listRef}
              className="max-h-[320px] overflow-y-auto py-2 premium-scrollbar"
            >
              {filteredItems.length === 0 ? (
                <div className="px-6 py-12 text-center text-zinc-500 text-xs flex flex-col items-center gap-2">
                  <Terminal size={24} className="text-zinc-600 mb-1" />
                  <span>No results matching "{search}"</span>
                  <span className="text-zinc-700">Try searching "theme", "resume", or sections.</span>
                </div>
              ) : (
                Object.entries(
                  filteredItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                  }, {})
                ).map(([category, catItems]) => (
                  <div key={category}>
                    {/* Category Header */}
                    <div className="px-4 py-1.5 text-[9px] font-black tracking-widest text-accent uppercase select-none font-sans opacity-90">
                      {category}
                    </div>
                    {/* Category Items */}
                    {catItems.map((item) => {
                      const absoluteIndex = filteredItems.findIndex(fi => fi.id === item.id);
                      const isSelected = absoluteIndex === selectedIndex;
                      
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                          className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-white/5 text-white' 
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`p-1.5 rounded-lg ${
                              isSelected ? 'bg-accent/20 text-white' : 'bg-white/5 text-zinc-500'
                            } transition-colors`}>
                              {item.icon}
                            </span>
                            <span className="text-xs font-sans font-medium">{item.title}</span>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1 select-none">
                              <span>Enter</span>
                              <span className="text-accent">↵</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Sticky Command Palette Info Bar */}
            <div className="bg-[#07080d] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-sans select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="font-mono">↑↓</span> Navigate</span>
                <span className="flex items-center gap-1"><span className="font-mono">↵</span> Select</span>
              </div>
              <div className="flex items-center gap-1 text-accent">
                <Sparkles size={10} />
                <span>Creative Studio Palette</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
