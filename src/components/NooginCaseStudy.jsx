import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Lightbulb, Target, Users, Search, Layout, Compass, ShieldAlert, Sparkles, MonitorSmartphone, ChevronDown, ChevronRight, Folder, File, FileText, Music, MessageCircle } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Reusable Section Component
const Section = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className="mb-24 relative"
  >
    <div className="absolute -left-8 md:-left-12 top-0 h-full w-px bg-gradient-to-b from-vscode-accent/50 to-transparent hidden md:block"></div>
    <div className="flex items-center space-x-4 mb-8">
      {Icon && <div className="p-3 rounded-full bg-vscode-accent/10 text-vscode-accent border border-vscode-accent/20"><Icon size={24} /></div>}
      <h3 className="text-2xl md:text-3xl font-bold font-sans text-white">{title}</h3>
    </div>
    <div className="prose prose-invert max-w-none font-sans text-vscode-text leading-relaxed">
      {children}
    </div>
  </motion.div>
);

// Abstract Placeholder Component
const Placeholder = ({ text = "Image Placeholder", icon = "🖼️", className = "" }) => (
  <div className={`w-full h-full bg-[#1E1E1E]/80 flex flex-col items-center justify-center border-2 border-dashed border-[#3C3C3C] text-vscode-textDark font-mono backdrop-blur-sm transition-colors hover:border-vscode-accent/50 hover:bg-vscode-accent/5 ${className}`}>
    <div className="text-4xl mb-3 opacity-50">{icon}</div>
    <div className="text-sm tracking-wider uppercase">{text}</div>
  </div>
);

// 3D Card wrapper for Hero
const CaseStudyCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-xl border border-vscode-border bg-[#252526] p-1 shadow-2xl overflow-hidden"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 w-full h-full">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-vscode-accent/20 via-transparent to-transparent opacity-50 blur-xl pointer-events-none"></div>
    </motion.div>
  );
};

// Interactive Hover Reveal Card
const RevealCard = ({ title, subtitle, colorClass, children }) => {
  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      className={`p-8 bg-[#252526] border border-vscode-border border-l-4 ${colorClass} rounded-md relative overflow-hidden group h-full`}
    >
      <div className="relative z-10 h-full flex flex-col">
        <h4 className="font-mono text-sm mb-3 opacity-80">{subtitle}</h4>
        <h3 className="text-2xl font-bold text-white font-sans mb-4">{title}</h3>
        
        <div className="relative flex-1">
          <p className="text-vscode-text transition-opacity duration-300 group-hover:opacity-0 absolute inset-0">
            Hover to reveal deep insights...
          </p>
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 leading-relaxed font-sans text-sm">
            {children}
          </div>
        </div>
      </div>
      {/* Decorative background glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

// Collapsible Code Comment Card — auto-expands on scroll
const CollapsibleCard = ({ color, label, title, summary, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOpen(true);
        }
      },
      { threshold: 0.6 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden border border-vscode-border bg-[#1E1E1E]"
    >
      {/* Header — always visible */}
      <div className="flex items-center gap-3 px-5 py-4">
        <ChevronDown 
          size={16} 
          className="transition-transform duration-500 flex-shrink-0" 
          style={{ color, transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} 
        />
        <span className="font-mono text-xs opacity-50 flex-shrink-0" style={{ color }}>{label}</span>
        <span className="font-mono text-lg text-white font-bold">{title}</span>
      </div>

      {/* Auto-expanding body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 ml-5">
              <div className="border-l-2 pl-4 w-fit" style={{ borderColor: color + '40' }}>
                <p className="text-vscode-text leading-relaxed font-sans text-sm">
                  {children}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Interactive Journey Map with clickable stages
const journeyData = [
  { label: "Awareness", emoji: "😰", color: "#9B7BCC", goal: "Discover a better way to study", action: "Talks to friends, sees ads", touchpoint: "Word of mouth / social media", pain: "Too many apps, unclear which is best. No clarity on where to start.", fix: "Clear value proposition upfront." },
  { label: "Research", emoji: "😡", color: "#7B68AE", goal: "Find an effective learning app", action: "Searches apps, compares platforms", touchpoint: "Play Store / App Store", pain: "Apps feel similar. Hard to trust effectiveness.", fix: "Show learning style differentiation." },
  { label: "Onboarding", emoji: "😐", color: "#5C8A8A", goal: "Set up quickly without friction", action: "Downloads app", touchpoint: "App onboarding screens", pain: "Sign-up feels long and confusing. Too many inputs early.", fix: "Simplify onboarding (fewer steps)." },
  { label: "Setup", emoji: "😊", color: "#5C8A8A", goal: "Set up quickly without friction", action: "Downloads app", touchpoint: "App onboarding screens", pain: "Sign-up feels long/confusing. Too many inputs early.", fix: "Simplify onboarding." },
  { label: "Learning", emoji: "😊", color: "#6B9F5C", goal: "Practice & improve retention", action: "Lesson player (visual/audio/etc)", touchpoint: "Progress dashboard + parent view", pain: "Format doesn't match learning style. Passive learning = low retention.", fix: "Adaptive content formats." },
  { label: "Support", emoji: "😏", color: "#C97B5C", goal: "Get help when stuck", action: "In-app help, parent dashboard", touchpoint: "In-app chat / Parent dashboard", pain: "Doesn't know how to improve. Parents unsure how to help.", fix: "Parent dashboard + AI suggestions." },
];

const JourneyMap = () => {
  const [active, setActive] = useState(0);
  const stage = journeyData[active];

  return (
    <div>
      {/* Timeline bar with emoji + stage pills */}
      <div className="relative flex items-center justify-between mb-8">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-vscode-border -translate-y-1/2 z-0" />
        
        {journeyData.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative z-10 flex flex-col items-center gap-2 group"
          >
            <span className={`text-2xl md:text-5xl transition-transform duration-300 ${active === i ? 'scale-125' : 'scale-100 opacity-60 group-hover:opacity-100'}`}>
              {s.emoji}
            </span>
            <span 
              className="px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold font-sans transition-all duration-300 whitespace-nowrap"
              style={{ 
                backgroundColor: active === i ? s.color : 'transparent',
                color: active === i ? '#fff' : '#888',
                border: active === i ? 'none' : '1px solid #444',
              }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Active stage detail card */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 absolute w-full"
          >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{stage.emoji}</span>
            <div>
              <h4 className="text-white font-bold text-xl font-sans">{stage.label}</h4>
              <p className="text-vscode-textDark text-sm font-mono">Stage {active + 1} of 6</p>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="p-4 bg-[#1E1E1E] rounded-lg">
                <div className="text-xs font-mono text-vscode-accent mb-1 uppercase">🎯 Goal</div>
                <p className="text-white font-sans text-sm">{stage.goal}</p>
              </div>
              <div className="p-4 bg-[#1E1E1E] rounded-lg">
                <div className="text-xs font-mono text-vscode-accent mb-1 uppercase">⚡ Action</div>
                <p className="text-vscode-text font-sans text-sm">{stage.action}</p>
              </div>
              <div className="p-4 bg-[#1E1E1E] rounded-lg">
                <div className="text-xs font-mono text-vscode-accent mb-1 uppercase">📍 Touchpoint</div>
                <p className="text-vscode-text font-sans text-sm">{stage.touchpoint}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border" style={{ backgroundColor: '#FF5F5610', borderColor: '#FF5F5630' }}>
                <div className="text-xs font-mono text-[#FF5F56] mb-1 uppercase">😤 Pain Point</div>
                <p className="text-vscode-text font-sans text-sm">{stage.pain}</p>
              </div>
              <div className="p-4 rounded-lg border" style={{ backgroundColor: '#28C84010', borderColor: '#28C84030' }}>
                <div className="text-xs font-mono text-[#28C840] mb-1 uppercase">✨ Improvement</div>
                <p className="text-vscode-text font-sans text-sm">{stage.fix}</p>
              </div>
            </div>
          </div>
        </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const swotData = [
  {
    letter: "S",
    title: "Strengths",
    color: "#28C840", // Green
    points: [
      "Personalised learning Inclusive",
      "Flexibility in learning methods",
      "Might keep students more engaged and motivated by providing them with content that resonates with their preferences",
      "Monitoring of progress will help with scope of improvement"
    ]
  },
  {
    letter: "W",
    title: "Weaknesses",
    color: "#FF5F56", // Red
    points: [
      "Over reliance on AI",
      "Dependence on Technology",
      "The quizzes for onboarding might be difficult for younger kids",
      "Limited subjects",
      "Limited Exposure"
    ]
  },
  {
    letter: "O",
    title: "Opportunities",
    color: "#3B82F6", // Blue
    points: [
      "Integration with School Curriculums",
      "Can help teachers know weaknesses of students",
      "Can have localized content based on different educational standards or needs (language issues)"
    ]
  },
  {
    letter: "T",
    title: "Threats",
    color: "#F59E0B", // Yellow/Orange
    points: [
      "Competitors like Duolingo, Byjus, Khan academy",
      "Data Privacy",
      "Maintaining and improving the AI algorithms"
    ]
  }
];

const SwotAnalysis = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {swotData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 overflow-hidden group transition-all duration-300"
        >
          {/* Hover dynamic border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-current opacity-20 rounded-xl transition-colors duration-300 pointer-events-none" style={{ color: item.color }} />
          
          {/* Large background letter */}
          <div 
            className="absolute -right-6 -bottom-10 text-[180px] font-bold opacity-[0.03] leading-none pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-300 font-sans"
            style={{ color: item.color }}
          >
            {item.letter}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-2"
                style={{ borderColor: item.color, color: item.color, backgroundColor: `${item.color}15` }}
              >
                {item.letter}
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white font-sans tracking-wide uppercase">{item.title}</h4>
            </div>
            
            <ul className="space-y-4">
              {item.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-vscode-text text-sm md:text-base leading-relaxed font-sans">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const GapAnalysis = () => {
  const gaps = [
    "No single platform integrates all major learning styles (visual, auditory, kinesthetic) in one place",
    "Most platforms focus on videos and quizzes, lacking interactive or hands-on learning",
    "Educational apps are either broad (not deeply personalized) or niche (limited to one learning style)",
    "Lack of structured, chapter-wise curriculum adapted to individual learning preferences"
  ];

  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-vscode-border shadow-2xl overflow-hidden font-mono mt-8">
      {/* Fake VS Code Panel Header */}
      <div className="flex bg-[#252526] border-b border-vscode-border text-xs overflow-x-auto hide-scrollbar">
        <div className="px-4 py-3 border-b-2 border-vscode-accent text-white uppercase tracking-wider whitespace-nowrap">
          Market Gaps <span className="ml-2 bg-[#FF5F56]/20 text-[#FF5F56] px-1.5 rounded-full">{gaps.length}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-1">
        {gaps.map((gap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="flex items-start gap-3 py-3 px-3 hover:bg-[#2A2D2E] rounded cursor-pointer group"
          >
            <ShieldAlert size={16} className="text-[#F59E0B] mt-0.5 shrink-0 group-hover:text-[#FF5F56] transition-colors" />
            <div className="flex-1">
              <span className="text-[#F59E0B] group-hover:text-[#FF5F56] mr-2 transition-colors">Warning:</span>
              <span className="text-vscode-text text-sm font-sans">{gap}</span>
            </div>
            <div className="text-vscode-textDark text-xs shrink-0 font-mono hidden md:block">
              Ln {i * 12 + 42}, Col 8
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const compFeatures = [
  "Target Audience", "Personalization", "AI Integration", "Onboarding Quiz", "Content Format", "Live Classes"
];

const allComps = [
  {
    name: "Our Platform",
    isOurs: true,
    data: ["High school & college students", "AI-driven, tailored to learning styles", "AI-powered recommendations via a mascot", "Yes", "Text, video, interactive activities", "Possibly as an additional feature"]
  },
  {
    name: "Byjus",
    data: ["K-12, college, and test prep", "Limited personalization via progress tracking", "Basic AI for recommendations", "No", "Video lessons, exercises", "No"]
  },
  {
    name: "Khan Academy",
    data: ["K-12, competitive exams", "Adaptive learning via AI", "AI-based adaptive learning & visualization", "No", "Animated videos, interactive quizzes", "Yes (via app)"]
  },
  {
    name: "Vedantu",
    data: ["K-12, test prep", "Personalized live tutoring", "AI-driven doubt-solving & live tutoring", "No", "Live classes, recorded sessions", "Yes (2-way interaction)"]
  },
  {
    name: "Unacademy",
    data: ["K-12, test prep, competitive exams", "AI-based adaptive learning", "AI-driven live classes & doubt solving", "No", "Live classes, recorded content", "Yes (for competitive exams)"]
  }
];

const CompetitiveAnalysis = () => {
  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-vscode-border shadow-2xl overflow-hidden relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-[#1E1E1E] z-20 p-4 border-b border-vscode-border font-mono text-xs text-vscode-textDark uppercase w-48 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
                Feature
              </th>
              {allComps.map((comp, i) => (
                <th 
                  key={i} 
                  className={`p-4 border-b border-vscode-border font-sans font-bold text-sm ${comp.isOurs ? 'text-vscode-accent bg-[#252526]' : 'text-white'}`}
                >
                  {comp.name}
                  {comp.isOurs && <div className="h-1 w-full bg-vscode-accent absolute top-0 left-0"></div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compFeatures.map((feat, fi) => (
              <tr key={fi} className="hover:bg-[#252526] transition-colors group">
                <td className="sticky left-0 bg-[#1E1E1E] z-20 p-4 border-b border-vscode-border font-sans text-sm font-medium text-white shadow-[4px_0_12px_rgba(0,0,0,0.5)] group-hover:bg-[#252526] transition-colors">
                  {feat}
                </td>
                {allComps.map((comp, ci) => (
                  <td 
                    key={ci} 
                    className={`p-4 border-b border-vscode-border font-sans text-xs md:text-sm leading-relaxed ${comp.isOurs ? 'text-white bg-[#252526]' : 'text-vscode-text'}`}
                  >
                    {comp.data[fi]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// The Clean Grid High Fidelity Section
const HighFidelityGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, show: false });
  const [lensEnabled, setLensEnabled] = useState(false);
  const containerRef = useRef(null);

  // Generate 28 screens
  const screensData = Array.from({ length: 28 }).map((_, i) => {
    const hfNames = [
      "Onboarding (Visual Theme)",
      "Onboarding (Tactile Theme)",
      "Onboarding (Auditory Theme)",
      "Welcome Back Login",
      "Create Account",
      "Style Finder Splash",
      "Style Finder Quiz 1",
      "Style Finder Quiz 2",
      "Style Finder Quiz 3",
      "Style Finder Quiz 4",
      "Style Finder Result",
      "Dashboard (Home)",
      "Dashboard (Continue)",
      "Subjects List",
      "Chapter List",
      "Learner Style Choice",
      "Curated Visual Hub",
      "Interactive Mind Map",
      "Flash Cards",
      "Color Coded Notes",
      "Curated Audio Hub",
      "Audio Playlist",
      "Audio Player",
      "Personalized Podcast Onboarding",
      "Podcast Customizer Form",
      "Curated Tactile Hub",
      "Tactile Experiment",
      "Teaching Board"
    ];
    return {
      title: hfNames[i] || `Screen ${i + 1}`,
      icon: "📱",
      image: i < 28 ? `/hf-${i + 1}.png` : null
    };
  });

  // Reusable grid content to render in both base and lens layers
  const GridContent = ({ isLensLayer = false }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {screensData.map((screen, i) => (
        <PhoneFrame 
          key={i} 
          label={screen.title} 
          disableHover={isLensLayer || lensEnabled}
        >
          {screen.image ? (
            <img 
              src={screen.image} 
              alt={screen.title} 
              className="w-full h-full object-fill" 
            />
          ) : (
            <Placeholder 
              text={screen.title} 
              icon={screen.icon} 
              className={`rounded-[18px] border-none transition-colors ${!isLensLayer && !lensEnabled ? 'hover:bg-vscode-accent/10' : ''}`} 
            />
          )}
        </PhoneFrame>
      ))}
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 my-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-vscode-accent/10 text-vscode-accent border border-vscode-accent/20">
            <MonitorSmartphone size={24} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">High Fidelity Designs</h2>
          </div>
        </div>

        {/* Small Icon UX Control Toggle */}
        <div className="flex items-center bg-[#252526] border border-vscode-border rounded-md p-1 self-start md:self-auto ml-auto">
          <button
            onClick={() => setLensEnabled(false)}
            title="Standard Grid View"
            className={`p-2 rounded-sm transition-all duration-300 ${!lensEnabled ? 'bg-vscode-accent text-white shadow-sm' : 'text-vscode-textDark hover:text-white hover:bg-[#3C3C3C]'}`}
          >
            <Layout size={18} />
          </button>
          <button
            onClick={() => setLensEnabled(true)}
            title="Lens Inspector View"
            className={`p-2 rounded-sm transition-all duration-300 ${lensEnabled ? 'bg-vscode-accent text-white shadow-sm' : 'text-vscode-textDark hover:text-white hover:bg-[#3C3C3C]'}`}
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className={`relative ${lensEnabled ? 'cursor-none' : ''}`}
        onMouseMove={(e) => {
          if (!containerRef.current || !lensEnabled) return;
          const rect = containerRef.current.getBoundingClientRect();
          setMousePos({ 
            x: e.clientX - rect.left, 
            y: e.clientY - rect.top, 
            show: true 
          });
        }}
        onMouseLeave={() => setMousePos(p => ({ ...p, show: false }))}
      >
        {/* Base Grid */}
        <GridContent />

        {/* Magnifying Lens Overlay */}
        <AnimatePresence>
          {lensEnabled && mousePos.show && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
              style={{
                clipPath: `circle(160px at ${mousePos.x}px ${mousePos.y}px)`
              }}
            >
              {/* Scaled Content matches exactly under the cursor */}
              <div 
                className="absolute inset-0 bg-[#1E1E1E]"
                style={{
                  transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
                  transform: 'scale(1.8)'
                }}
              >
                <GridContent isLensLayer={true} />
              </div>

              {/* Lens Ring & Shadow */}
              <div 
                className="absolute border-[6px] border-[#3C3C3C] rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,122,204,0.6)]"
                style={{
                  left: mousePos.x - 160,
                  top: mousePos.y - 160,
                  width: 320,
                  height: 320,
                }}
              >
                {/* Crosshair in the center of the lens */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30">
                  <Target size={24} strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};





const PhoneFrame = ({ children, label = "", disableHover = false }) => (
  <div className="flex flex-col items-center space-y-4">
    {/* Stylized iPhone Outline Frame */}
    <div className={`relative w-full aspect-[9/19.5] bg-[#09090b] rounded-[36px] p-2.5 shadow-2xl border-4 border-[#27272a] ring-1 ring-white/10 flex flex-col overflow-hidden transition-all duration-300 ${!disableHover ? 'hover:border-vscode-accent/50 hover:scale-102 cursor-pointer' : ''}`}>
      {/* Dynamic Island / Camera Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#27272a] rounded-full z-20 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 ml-auto mr-3"></div>
      </div>
      
      {/* Screen Frame content */}
      <div className="w-full h-full bg-[#1c1c1e] rounded-[28px] overflow-hidden relative flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
    {/* Screen ID Label */}
    {label && (
      <span className="text-white font-sans text-sm md:text-base font-bold text-center">
        {label}
      </span>
    )}
  </div>
);


const StyleGuide = () => {
  const [copiedColor, setCopiedColor] = useState(null);

  const colors = [
    { hex: "#8EABE1", name: "Soft Blue", role: "Primary Accent / Study theme" },
    { hex: "#E05723", name: "Warm Orange", role: "Primary Brand / Active State" },
    { hex: "#F3D1D0", name: "Soft Pink", role: "Soft Highlight / Pastel Accent" },
    { hex: "#696935", name: "Olive Green", role: "Secondary Accent / Balance theme" },
    { hex: "#FFD661", name: "Bright Yellow", role: "Gamification / Spark Points" },
    { hex: "#F4B426", name: "Warm Gold", role: "Focus / Alert alert theme" }
  ];

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="mt-16 border-t border-vscode-border pt-16">
      <h4 className="text-white font-bold mb-8 font-sans text-2xl md:text-3xl">Visual Style Guide</h4>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Colors Section */}
        <div className="bg-[#252526] border border-vscode-border rounded-xl p-8 shadow-xl">
          <h5 className="text-white font-bold mb-6 font-sans text-lg flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-vscode-accent animate-pulse"></span>
            <span>Color Palette</span>
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div 
                key={color.hex} 
                onClick={() => handleCopy(color.hex)}
                className="group cursor-pointer flex flex-col space-y-3 p-3 bg-[#1e1e1e] border border-vscode-border rounded-lg hover:border-vscode-accent/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Color Swatch */}
                <div 
                  className="w-full aspect-square rounded-md shadow-inner transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                
                {/* Hex & Name */}
                <div className="flex flex-col">
                  <span className="text-white font-mono text-sm font-bold tracking-wider">{color.hex}</span>
                  <span className="text-vscode-textDark text-xs font-sans font-medium">{color.name}</span>
                </div>
                
                {/* Copied Overlay */}
                {copiedColor === color.hex && (
                  <div className="absolute inset-0 bg-vscode-accent/90 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest font-sans">
                    Copied!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Typography Section */}
        <div className="bg-[#252526] border border-vscode-border rounded-xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h5 className="text-white font-bold mb-6 font-sans text-lg flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-vscode-accent animate-pulse"></span>
              <span>Typography System</span>
            </h5>
            
            <div className="space-y-8">
              {/* DM Serif Display */}
              <div className="border-b border-vscode-border/50 pb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <h6 className="text-white text-2xl font-bold tracking-wide" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    DM Serif Display
                  </h6>
                  <span className="text-[10px] font-mono bg-vscode-accent/10 text-vscode-accent px-2 py-0.5 rounded border border-vscode-accent/20">Serif Specimen</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-5xl font-serif text-vscode-accent/20 select-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    Aa
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-vscode-accent mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Used for primary headings and section titles.</span>
                    </p>
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-vscode-accent mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Chosen to add personality, warmth, and an editorial feel that suits an educational product.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* DM Sans */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <h6 className="text-white text-xl font-bold tracking-wide font-sans font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    DM Sans
                  </h6>
                  <span className="text-[10px] font-mono bg-vscode-accent/10 text-vscode-accent px-2 py-0.5 rounded border border-vscode-accent/20">Sans Specimen</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-5xl font-bold text-vscode-accent/20 select-none font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Aa
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-vscode-accent mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Used for subheadings, body text, labels, and UI elements.</span>
                    </p>
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-vscode-accent mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Chosen for its readability, simplicity, and clarity across long study sessions.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Type Scale Specimen */}
          <div className="mt-8 pt-6 border-t border-vscode-border/50 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Headings</span>
              <span className="text-white font-sans text-sm font-semibold">32px (DM Serif Display)</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Subheadings</span>
              <span className="text-white font-sans text-sm font-semibold">20px (DM Sans - Semibold)</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Body</span>
              <span className="text-white font-sans text-sm font-semibold">17px (DM Sans)</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Labels</span>
              <span className="text-white font-sans text-sm font-semibold">14px (DM Sans)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// ==========================================
// MASSIVE HIGH-FIDELITY INTERACTIVE APP SIMULATOR
// ==========================================
const NooginSimulatorModal = ({ show, onClose }) => {
  const [screen, setScreen] = useState("splash"); // splash, quiz, result, hub, whiteboard, audio_setup, audio_playing
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [activeSubject, setActiveSubject] = useState("History");
  const [chatMessages, setChatMessages] = useState([
    { sender: "mascot", text: "Hey there! I'm Noogin, your study partner! 🤖 Ready to explore? Draw on the blackboard above, or type any question below!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [boardColor, setBoardColor] = useState("#28C840"); // default emerald draw color
  
  // Audio Note setup states
  const [audioSubject, setAudioSubject] = useState("The Gupta Dynasty");
  const [audioVoice, setAudioVoice] = useState("Noogin (Robot 🤖)");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState("Initializing...");
  
  // Audio Note player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayTime, setAudioPlayTime] = useState(0);
  const playIntervalRef = useRef(null);

  // Whiteboard drawing references
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize Canvas background
  useEffect(() => {
    if (screen === "whiteboard" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      // Make canvas high DPI responsive
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      ctx.fillStyle = "#1E1E1E";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw standard grid background lines for kid math notes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
  }, [screen]);

  // Drawing event handlers
  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = boardColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1E1E1E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw math note grids
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  // Simulated Chat Agent
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setIsTypingResponse(true);

    // mascot smart reply timeout
    setTimeout(() => {
      let replyText = "";
      const textLower = userMsg.toLowerCase();

      if (textLower.includes("hello") || textLower.includes("hi")) {
        replyText = "Hi there! I'm Noogin, your study partner! 🤖 Ask me anything about History, Science, or Geography, or select 'Audio Note Setup' to generate a study podcast!";
      } else if (textLower.includes("gupta") || textLower.includes("history")) {
        replyText = "The Gupta Empire (320-550 CE) was the Golden Age of India! 🏰 Mass discoveries in math (Zero concept!), science, and beautiful art happened right here!";
      } else if (textLower.includes("science") || textLower.includes("photosynthesis")) {
        replyText = "Photosynthesis is how plants make food using sunlight! 🌿 They turn Carbon Dioxide and Water into Glucose food and release oxygen for us to breathe!";
      } else if (textLower.includes("geography") || textLower.includes("volcano")) {
        replyText = "A volcano is an opening in Earth's crust that allows molten magma, ash, and gases to escape! 🌋 They create amazing new visual landforms!";
      } else {
        replyText = `That is an awesome question! Let me search my knowledge core... 🤖 Why don't we turn "${userMsg}" into a beautiful personalized Audio Note? Click 'Audio Note Setup' below to compile it!`;
      }

      setChatMessages(prev => [...prev, { sender: "mascot", text: replyText }]);
      setIsTypingResponse(false);
    }, 1200);
  };

  // Audio Note Simulated Generation
  const handleGenerateAudio = () => {
    setIsGenerating(true);
    setGenerateProgress(0);
    setCurrentStepText("Initializing custom compiler...");
    
    const steps = [
      { p: 15, text: "Formatting chapter summaries..." },
      { p: 40, text: `Synthesizing sound guide with ${audioVoice} voice...` },
      { p: 70, text: "Embedding pedagogical learning markers..." },
      { p: 90, text: "Encrypting private student access stream..." },
      { p: 100, text: "Generation complete! Enjoy study guide." }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        setGenerateProgress(steps[currentStepIdx].p);
        setCurrentStepText(steps[currentStepIdx].text);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setScreen("audio_playing");
          setIsPlaying(true);
        }, 800);
      }
    }, 900);
  };

  // Audio Play Timer
  useEffect(() => {
    if (isPlaying && screen === "audio_playing") {
      playIntervalRef.current = setInterval(() => {
        setAudioPlayTime(prev => {
          if (prev >= 165) { // 2 mins 45 secs max length
            setIsPlaying(false);
            clearInterval(playIntervalRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(playIntervalRef.current);
    }
    return () => clearInterval(playIntervalRef.current);
  }, [isPlaying, screen]);

  const formatPlayTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#09090B]/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1E1E1E] border border-vscode-border rounded-[32px] w-full max-w-5xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Walkthrough Guide Info */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-vscode-border bg-gradient-to-br from-[#252526] to-[#1E1E1E]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 bg-vscode-accent/20 border border-vscode-accent/30 text-vscode-accent font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">React Prototype</span>
              <button onClick={onClose} className="p-2 text-vscode-textDark hover:text-white rounded-full bg-[#1E1E1E]/80 border border-vscode-border/50 lg:hidden"><X size={16} /></button>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-white font-extrabold text-2xl md:text-3xl font-sans tracking-tight leading-tight">Noogin Live Interactive App Simulator</h3>
              <p className="text-vscode-textDark text-sm leading-relaxed font-sans">
                Experience how student UX realignment actually functions in real-time. This is a fully functional React prototype recreating the high-fidelity user interactions.
              </p>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="space-y-3 pt-4 border-t border-vscode-border/50">
              <span className="text-[11px] font-mono uppercase tracking-widest text-vscode-accent font-bold">Simulator Quick Shortcuts</span>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { setScreen("hub"); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">🎨</span>
                  <div>
                    <span className="font-bold block mt-1">Study Hub</span>
                    <span className="text-[9px] text-vscode-textDark">Page restructuring</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setScreen("whiteboard"); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">🤖</span>
                  <div>
                    <span className="font-bold block mt-1">Whiteboard Chat</span>
                    <span className="text-[9px] text-vscode-textDark">Lowering speech anxiety</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setScreen("audio_setup"); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">📻</span>
                  <div>
                    <span className="font-bold block mt-1">Audio Setup</span>
                    <span className="text-[9px] text-vscode-textDark">Podcast rebranding</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setScreen("splash"); setQuizStep(0); setQuizAnswers([]); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">🚀</span>
                  <div>
                    <span className="font-bold block mt-1">Reset Simulator</span>
                    <span className="text-[9px] text-vscode-textDark">Take learning quiz</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-vscode-border/50 hidden lg:flex items-center justify-between">
            <span className="text-xs text-vscode-textDark font-mono">Designed & Built by Nibedit</span>
            <button 
              onClick={onClose} 
              className="px-5 py-2.5 bg-[#1E1E1E] border border-vscode-border hover:border-red-500/50 hover:bg-red-500/10 text-vscode-textDark hover:text-red-400 rounded-xl font-sans font-bold text-xs transition-all"
            >
              Exit Simulator
            </button>
          </div>
        </div>

        {/* Right Column: Device Screen Shell Container */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-[#09090B] relative">
          
          {/* Top Close Button for Desktop */}
          <button onClick={onClose} className="absolute top-6 right-6 p-2.5 text-vscode-textDark hover:text-white rounded-full bg-[#1E1E1E]/80 border border-vscode-border/50 hidden lg:block hover:scale-105 transition-transform"><X size={18} /></button>

          {/* iPhone Device Frame */}
          <div className="relative border-[8px] border-zinc-800 rounded-[48px] p-2 bg-[#000] shadow-[0_0_60px_rgba(0,102,204,0.18)] w-full max-w-[340px] aspect-[9/19.5] overflow-hidden flex flex-col justify-start relative select-none">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-zinc-900 rounded-full z-40 border border-zinc-800/80 flex items-center justify-end px-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse"></div>
            </div>
            
            {/* Phone Screen Canvas/Body */}
            <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#1E1E1E] relative flex flex-col justify-between pt-6 pb-4">
              
              {/* Screen Top Status Bar */}
              <div className="px-5 py-1 flex items-center justify-between text-zinc-400 font-mono text-[9px] font-bold z-30 absolute top-0 w-full">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span>📶</span>
                  <span>5G</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* SCREEN RENDERING LAYER */}
              <div className="flex-grow flex flex-col justify-between relative overflow-y-auto mt-2 h-full">
                
                {/* 1. Splash Screen */}
                {screen === "splash" && (
                  <div className="flex flex-col justify-between h-full p-5 text-center bg-gradient-to-b from-[#252526] via-[#1E1E1E] to-[#0A0A0A] relative">
                    <div className="mt-12 space-y-4">
                      <div className="w-20 h-20 bg-vscode-accent/10 border-2 border-vscode-accent/30 rounded-2xl flex items-center justify-center mx-auto shadow-2xl relative">
                        <span className="text-4xl">🤖</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-extrabold text-2xl tracking-tight font-sans">Noogin App</h4>
                        <span className="text-vscode-accent font-mono text-[10px] uppercase tracking-widest font-semibold block">Empathetic Learning AI</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      <p className="text-vscode-textDark text-xs leading-relaxed font-sans px-2">
                        Hey kiddo! Welcome to your digital study board. Let's find out how you study best!
                      </p>
                      <button
                        onClick={() => setScreen("quiz")}
                        className="w-full py-3.5 bg-vscode-accent hover:bg-vscode-accent/90 text-white font-sans font-bold text-xs rounded-xl shadow-lg border border-vscode-accent flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                      >
                        ⚡ Start Study Quiz
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Learner Style Quiz Screen */}
                {screen === "quiz" && (
                  <div className="flex flex-col justify-between h-full p-5 bg-[#1E1E1E] relative">
                    <div className="space-y-6">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-vscode-textDark font-mono text-[9px] font-bold">
                          <span>LEARNER PROFILE QUIZ</span>
                          <span>STEP {quizStep + 1} OF 3</span>
                        </div>
                        <div className="w-full h-1 bg-[#252526] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-vscode-accent transition-all duration-300"
                            style={{ width: `${((quizStep + 1) / 3) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Question */}
                      <div className="space-y-4">
                        <h5 className="text-white font-bold text-sm font-sans leading-tight">
                          {quizStep === 0 && "🎨 How do you prefer learning about ancient kingdoms?"}
                          {quizStep === 1 && "🔬 When studying a scientific experiment, you like to..."}
                          {quizStep === 2 && "💬 When explaining your answers, you feel most comfortable..."}
                        </h5>

                        <div className="space-y-3">
                          {quizStep === 0 && (
                            <>
                              <button 
                                onClick={() => { setQuizStep(1); setQuizAnswers(prev => [...prev, "visual"]); }}
                                className="w-full text-left p-3.5 bg-[#252526] border border-vscode-border hover:border-vscode-accent/50 hover:bg-[#1E1E1E] rounded-xl text-xs font-sans text-vscode-text font-semibold flex items-center gap-3 transition-all"
                              >
                                <span className="text-lg">🗺️</span> Timelines & Map drawings
                              </button>
                              <button 
                                onClick={() => { setQuizStep(1); setQuizAnswers(prev => [...prev, "auditory"]); }}
                                className="w-full text-left p-3.5 bg-[#252526] border border-vscode-border hover:border-vscode-accent/50 hover:bg-[#1E1E1E] rounded-xl text-xs font-sans text-vscode-text font-semibold flex items-center gap-3 transition-all"
                              >
                                <span className="text-lg">🎙️</span> Listening to audio stories
                              </button>
                            </>
                          )}
                          
                          {quizStep === 1 && (
                            <>
                              <button 
                                onClick={() => { setQuizStep(2); setQuizAnswers(prev => [...prev, "visual"]); }}
                                className="w-full text-left p-3.5 bg-[#252526] border border-vscode-border hover:border-vscode-accent/50 hover:bg-[#1E1E1E] rounded-xl text-xs font-sans text-vscode-text font-semibold flex items-center gap-3 transition-all"
                              >
                                <span className="text-lg">🧪</span> Interacting with virtual lab sliders
                              </button>
                              <button 
                                onClick={() => { setQuizStep(2); setQuizAnswers(prev => [...prev, "auditory"]); }}
                                className="w-full text-left p-3.5 bg-[#252526] border border-vscode-border hover:border-vscode-accent/50 hover:bg-[#1E1E1E] rounded-xl text-xs font-sans text-vscode-text font-semibold flex items-center gap-3 transition-all"
                              >
                                <span className="text-lg">📻</span> Listening to an audio guide
                              </button>
                            </>
                          )}

                          {quizStep === 2 && (
                            <>
                              <button 
                                onClick={() => { setScreen("result"); setQuizAnswers(prev => [...prev, "visual"]); }}
                                className="w-full text-left p-3.5 bg-[#252526] border border-vscode-border hover:border-vscode-accent/50 hover:bg-[#1E1E1E] rounded-xl text-xs font-sans text-vscode-text font-semibold flex items-center gap-3 transition-all"
                              >
                                <span className="text-lg">✍️</span> Writing and drawing on blackboard
                              </button>
                              <button 
                                onClick={() => { setScreen("result"); setQuizAnswers(prev => [...prev, "auditory"]); }}
                                className="w-full text-left p-3.5 bg-[#252526] border border-vscode-border hover:border-vscode-accent/50 hover:bg-[#1E1E1E] rounded-xl text-xs font-sans text-vscode-text font-semibold flex items-center gap-3 transition-all"
                              >
                                <span className="text-lg">🎤</span> Dictating my voice out loud
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => { setScreen("splash"); setQuizStep(0); setQuizAnswers([]); }} 
                      className="w-full py-2 bg-[#252526] text-vscode-textDark font-sans font-bold text-[10px] uppercase rounded-xl hover:text-white transition-colors"
                    >
                      ⬅ Back to Splash
                    </button>
                  </div>
                )}

                {/* 3. Quiz Result Screen */}
                {screen === "result" && (
                  <div className="flex flex-col justify-between h-full p-5 text-center bg-[#1E1E1E] relative">
                    <div className="mt-8 space-y-4">
                      <span className="text-4xl animate-bounce block">🎉</span>
                      <div className="space-y-1">
                        <span className="text-vscode-accent font-mono text-[9px] uppercase tracking-widest font-semibold block">QUIZ CALCULATION</span>
                        <h4 className="text-white font-extrabold text-lg tracking-tight font-sans">Learner Profile Completed!</h4>
                      </div>
                      
                      <div className="p-4 bg-[#252526] border border-vscode-border rounded-2xl mt-4 space-y-2">
                        <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">Realignment Profile Match</span>
                        <span className="text-white font-extrabold text-base block font-sans">🎨 Visual / Canvas Learner</span>
                        <p className="text-vscode-textDark text-[10px] leading-relaxed">
                          You learn best through visual organization, interactive whiteboard mapping, and personal study summaries!
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setScreen("hub")}
                      className="w-full py-3.5 bg-vscode-accent hover:bg-vscode-accent/90 text-white font-sans font-bold text-xs rounded-xl shadow-lg border border-vscode-accent flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                    >
                      ⚡ Enter Visual Hub
                    </button>
                  </div>
                )}

                {/* 4. Curated Visual Hub Screen (Restructured Layout!) */}
                {screen === "hub" && (
                  <div className="flex flex-col justify-start h-full p-4 bg-[#1E1E1E] space-y-4 relative">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-vscode-border/50">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎨</span>
                        <div>
                          <span className="text-white font-bold text-xs block font-sans">Visual Hub</span>
                          <span className="text-[8px] font-mono text-vscode-textDark uppercase tracking-wider">Noogin Realignment</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full font-bold">VISUAL</span>
                    </div>

                    {/* Categorized tabs switcher */}
                    <div className="grid grid-cols-3 gap-1 bg-[#1E1E1E] border border-vscode-border p-0.5 rounded-lg">
                      {["History", "Science", "Geog"].map(s => (
                        <button
                          key={s}
                          onClick={() => {
                            if (s === "Geog") setActiveSubject("Geography");
                            else setActiveSubject(s);
                          }}
                          className={`py-1 rounded text-[9px] font-bold transition-all ${
                            activeSubject.toLowerCase().startsWith(s.toLowerCase().substring(0, 3))
                              ? "bg-vscode-accent text-white shadow"
                              : "text-vscode-textDark hover:text-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Chapter Cards lists based on subject */}
                    <div className="space-y-3 flex-grow overflow-y-auto pr-0.5 max-h-[220px]">
                      <span className="text-[9px] font-mono text-vscode-textDark uppercase tracking-widest block font-semibold">Study Guides</span>
                      
                      {activeSubject === "History" && (
                        <>
                          <button 
                            onClick={() => {
                              setAudioSubject("The Golden Gupta Empire");
                              setScreen("whiteboard");
                            }}
                            className="w-full p-3 bg-[#252526] hover:bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 rounded-xl text-left transition-all flex items-start gap-2.5 group"
                          >
                            <span className="text-lg">🏰</span>
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[11px] block font-sans group-hover:text-vscode-accent transition-colors">Ch 3: The Golden Gupta Empire</span>
                              <span className="text-[8px] text-vscode-textDark block font-mono">Visual Timeline & Whiteboard chat</span>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => {
                              setAudioSubject("The Chola Dynasty");
                              setScreen("whiteboard");
                            }}
                            className="w-full p-3 bg-[#252526] hover:bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 rounded-xl text-left transition-all flex items-start gap-2.5 group"
                          >
                            <span className="text-lg">⚔️</span>
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[11px] block font-sans group-hover:text-vscode-accent transition-colors">Ch 5: The Chola Dynasty</span>
                              <span className="text-[8px] text-vscode-textDark block font-mono">Maritime maps & blackboard maps</span>
                            </div>
                          </button>
                        </>
                      )}

                      {activeSubject === "Science" && (
                        <>
                          <button 
                            onClick={() => {
                              setAudioSubject("Photosynthesis Cycle");
                              setScreen("whiteboard");
                            }}
                            className="w-full p-3 bg-[#252526] hover:bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 rounded-xl text-left transition-all flex items-start gap-2.5 group"
                          >
                            <span className="text-lg">🌿</span>
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[11px] block font-sans group-hover:text-vscode-accent transition-colors">Ch 1: Photosynthesis Cycle</span>
                              <span className="text-[8px] text-vscode-textDark block font-mono">Plant structures & visual formulas</span>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => {
                              setAudioSubject("Newton's Laws of Motion");
                              setScreen("whiteboard");
                            }}
                            className="w-full p-3 bg-[#252526] hover:bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 rounded-xl text-left transition-all flex items-start gap-2.5 group"
                          >
                            <span className="text-lg">🧪</span>
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[11px] block font-sans group-hover:text-vscode-accent transition-colors">Ch 2: Laws of Motion</span>
                              <span className="text-[8px] text-vscode-textDark block font-mono">Friction vectors & blackboard drawing</span>
                            </div>
                          </button>
                        </>
                      )}

                      {activeSubject === "Geography" && (
                        <>
                          <button 
                            onClick={() => {
                              setAudioSubject("Volcanoes & Crust");
                              setScreen("whiteboard");
                            }}
                            className="w-full p-3 bg-[#252526] hover:bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 rounded-xl text-left transition-all flex items-start gap-2.5 group"
                          >
                            <span className="text-lg">🌋</span>
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[11px] block font-sans group-hover:text-vscode-accent transition-colors">Ch 4: Volcanoes & Crust</span>
                              <span className="text-[8px] text-vscode-textDark block font-mono">Tectonic vectors & visual maps</span>
                            </div>
                          </button>
                        </>
                      )}
                    </div>

                    <div className="p-3 bg-[#252526]/40 border border-vscode-border/50 rounded-xl flex items-center justify-between text-[8px] text-vscode-textDark font-sans">
                      <span>💡 Restructured Layout: Stacking scroll fatigue removed!</span>
                    </div>
                  </div>
                )}

                {/* 5. Interactive Blackboard Chat Screen */}
                {screen === "whiteboard" && (
                  <div className="flex flex-col justify-between h-full bg-[#1E1E1E] relative">
                    {/* Blackboard header */}
                    <div className="px-4 py-2 border-b border-vscode-border/50 bg-[#252526] flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setScreen("hub")} className="text-vscode-accent hover:text-white font-sans text-[10px] font-bold">⬅ Hub</button>
                        <span className="text-white font-bold text-[10px] font-sans truncate max-w-[130px]">Noogin Blackboard</span>
                      </div>
                      <button 
                        onClick={clearCanvas}
                        className="px-2 py-0.5 bg-[#1E1E1E] hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-vscode-border rounded text-[8px] font-mono font-semibold transition-colors"
                      >
                        Clear Board
                      </button>
                    </div>

                    {/* INTERACTIVE CANVAS */}
                    <div className="w-full h-[120px] bg-[#1E1E1E] relative overflow-hidden flex-shrink-0 cursor-crosshair border-b border-vscode-border">
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full h-full block"
                      />
                      {/* Glow Overlay Note */}
                      <div className="absolute bottom-1 right-2 pointer-events-none text-[8px] font-mono text-zinc-500 uppercase">
                        Scribble/Draw on Board
                      </div>

                      {/* Pen Palette controls */}
                      <div className="absolute top-1 left-2 flex items-center gap-1">
                        {["#28C840", "#61afef", "#c678dd"].map(color => (
                          <button
                            key={color}
                            onClick={() => setBoardColor(color)}
                            className={`w-3.5 h-3.5 rounded-full border transition-all ${
                              boardColor === color 
                                ? "border-white scale-110 shadow" 
                                : "border-zinc-700 hover:scale-105"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Chat Feed */}
                    <div className="flex-grow overflow-y-auto p-3 space-y-3 max-h-[135px]">
                      {chatMessages.map((msg, i) => (
                        <div 
                          key={i} 
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`p-2.5 rounded-xl text-[10px] leading-relaxed max-w-[85%] font-sans ${
                            msg.sender === "user" 
                              ? "bg-vscode-accent text-white rounded-br-none" 
                              : "bg-[#252526] border border-vscode-border text-vscode-text rounded-bl-none shadow-sm"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isTypingResponse && (
                        <div className="flex justify-start">
                          <div className="p-2.5 bg-[#252526] border border-vscode-border rounded-xl rounded-bl-none text-[9px] text-vscode-textDark font-sans flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-vscode-textDark rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-vscode-textDark rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-vscode-textDark rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Customizer redirect tab */}
                    <div className="p-2 border-t border-vscode-border/50 bg-[#252526] flex items-center justify-between gap-1.5 flex-shrink-0">
                      <span className="text-[8px] font-sans text-vscode-textDark">Need audio summary?</span>
                      <button 
                        onClick={() => setScreen("audio_setup")} 
                        className="px-2.5 py-1 bg-vscode-accent/20 border border-vscode-accent/40 text-vscode-accent rounded-lg text-[9px] font-sans font-bold hover:bg-vscode-accent hover:text-white transition-all flex items-center gap-1"
                      >
                        🎙️ Audio Note Setup
                      </button>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="p-2 border-t border-vscode-border/50 bg-[#1E1E1E] flex items-center gap-1.5 flex-shrink-0">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                        placeholder="Type standard question..."
                        className="flex-grow px-2.5 py-1.5 bg-[#252526] border border-vscode-border rounded-lg text-[9px] font-sans text-white focus:outline-none focus:border-vscode-accent"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="p-1.5 bg-vscode-accent hover:bg-vscode-accent/90 text-white rounded-lg text-xs"
                      >
                        ⚡
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. Audio Notes Customizer Form (Rebranded Re-alignment!) */}
                {screen === "audio_setup" && (
                  <div className="flex flex-col justify-between h-full p-4 bg-[#1E1E1E] relative">
                    
                    {/* Inner loading overlays */}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-[#09090B]/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-5 text-center space-y-4">
                        <span className="text-3xl animate-spin block">🎙️</span>
                        <div className="space-y-1">
                          <span className="text-vscode-accent font-mono text-[9px] uppercase tracking-wider font-bold block">Generating Audio Note</span>
                          <h5 className="text-white font-bold text-xs font-sans">{currentStepText}</h5>
                        </div>
                        <div className="w-full max-w-[200px] h-1.5 bg-[#1E1E1E] border border-vscode-border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-vscode-accent transition-all duration-300"
                            style={{ width: `${generateProgress}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-vscode-textDark">{generateProgress}%</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-vscode-border/50">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setScreen("whiteboard")} className="text-vscode-accent font-sans text-[10px] font-bold">⬅ Canvas</button>
                          <span className="text-white font-bold text-xs font-sans">Audio Note Setup</span>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-[#28C840] font-mono text-[8px] rounded-full font-bold uppercase tracking-wider">Private</span>
                      </div>

                      {/* Info box rebranding explanation */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[8.5px] text-vscode-text leading-relaxed font-sans">
                        🔒 **Safe Space Study:** Rest assured, these audio notes are generated entirely for your own private files and are not uploaded online!
                      </div>

                      {/* Fields */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-vscode-textDark uppercase tracking-wider block font-bold">Audio Note Title</label>
                          <input 
                            type="text" 
                            value={audioSubject}
                            onChange={(e) => setAudioSubject(e.target.value)}
                            placeholder="Enter subject theme..."
                            className="w-full px-3 py-2 bg-[#252526] border border-vscode-border rounded-xl text-[10px] text-white font-sans focus:outline-none focus:border-vscode-accent"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-vscode-textDark uppercase tracking-wider block font-bold">Narrator Voice Style</label>
                          <select 
                            value={audioVoice}
                            onChange={(e) => setAudioVoice(e.target.value)}
                            className="w-full px-3 py-2 bg-[#252526] border border-vscode-border rounded-xl text-[10px] text-white font-sans focus:outline-none focus:border-vscode-accent"
                          >
                            <option>Noogin (Robot 🤖)</option>
                            <option>Arya (Sage 🧝)</option>
                            <option>Kavi (Poet 🎙️)</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-[#252526]/50 rounded-xl border border-vscode-border/50">
                          <div className="space-y-0.5">
                            <span className="text-white font-bold text-[9px] block font-sans">Encrypted Local Saving</span>
                            <span className="text-[8px] text-vscode-textDark block font-mono">Store directly on phone sandbox</span>
                          </div>
                          <input 
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            className="accent-vscode-accent" 
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateAudio}
                      className="w-full py-3.5 bg-vscode-accent hover:bg-vscode-accent/90 text-white font-sans font-bold text-xs rounded-xl shadow-lg border border-vscode-accent flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                    >
                      🎙️ Create Audio Note
                    </button>
                  </div>
                )}

                {/* 7. Rebranded Audio Notes Player Screen */}
                {screen === "audio_playing" && (
                  <div className="flex flex-col justify-between h-full p-5 text-center bg-gradient-to-b from-[#252526] via-[#1E1E1E] to-[#0A0A0A] relative">
                    
                    {/* Form back header */}
                    <div className="flex items-center justify-between pb-2 border-b border-vscode-border/40 w-full absolute top-0 left-0 px-4 pt-2">
                      <button onClick={() => { setScreen("audio_setup"); setIsPlaying(false); }} className="text-vscode-accent font-sans text-[10px] font-bold">⬅ Form</button>
                      <span className="text-white font-bold text-[10px] font-sans truncate max-w-[150px]">{audioSubject}</span>
                      <div className="w-1.5 h-1.5 bg-[#28C840] rounded-full"></div>
                    </div>

                    {/* Sound waves player animation */}
                    <div className="mt-16 space-y-6 flex-grow flex flex-col justify-center items-center">
                      <div className="relative">
                        {/* Glowing radial pulse wave */}
                        {isPlaying && (
                          <div className="absolute inset-0 bg-vscode-accent/20 rounded-full blur-xl scale-125 animate-ping duration-1000" />
                        )}
                        <div className="w-24 h-24 bg-gradient-to-br from-vscode-accent to-purple-600 rounded-full flex items-center justify-center relative border border-white/10 shadow-2xl">
                          <span className="text-4xl">📻</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 max-w-[200px]">
                        <h5 className="text-white font-extrabold text-xs truncate font-sans">{audioSubject}</h5>
                        <span className="text-vscode-textDark text-[9px] font-mono block">Voice: {audioVoice}</span>
                        <span className="px-2 py-0.5 bg-[#28C840]/10 border border-[#28C840]/20 text-[#28C840] font-mono text-[8px] rounded-full font-bold inline-block uppercase tracking-wider">🔒 Safe Study Audio note</span>
                      </div>
                    </div>

                    {/* Player controls */}
                    <div className="space-y-4 mb-2">
                      {/* Slider Progress Bar */}
                      <div className="space-y-1">
                        <div className="w-full h-1 bg-[#252526] rounded-full overflow-hidden relative">
                          <div 
                            className="h-full bg-vscode-accent"
                            style={{ width: `${(audioPlayTime / 165) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[8px] font-mono text-vscode-textDark">
                          <span>{formatPlayTime(audioPlayTime)}</span>
                          <span>2:45</span>
                        </div>
                      </div>

                      {/* Play Action */}
                      <div className="flex items-center justify-center gap-6">
                        <button onClick={() => setAudioPlayTime(Math.max(0, audioPlayTime - 10))} className="text-vscode-textDark hover:text-white text-base">⏪</button>
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-12 h-12 bg-white text-[#1E1E1E] rounded-full flex items-center justify-center text-lg font-bold hover:scale-105 transition-transform"
                        >
                          {isPlaying ? "⏸" : "▶"}
                        </button>
                        <button onClick={() => setAudioPlayTime(Math.min(165, audioPlayTime + 10))} className="text-vscode-textDark hover:text-white text-base">⏩</button>
                      </div>

                      <button
                        onClick={() => { setScreen("hub"); setIsPlaying(false); }}
                        className="w-full py-2 bg-[#252526] text-vscode-accent font-sans font-bold text-[9px] uppercase rounded-xl hover:text-white transition-colors"
                      >
                        Return to Visual Study Hub
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Simulated Home Indicator Bar */}
              <div className="w-24 h-1 bg-zinc-700/80 rounded-full mx-auto mt-2"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
const NooginCaseStudy = ({ onClose }) => {
  const [activeTestTab, setActiveTestTab] = useState(0);
  const [showSimulator, setShowSimulator] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#07080b] overflow-y-auto overflow-x-hidden shadow-2xl"
    >
      {/* Navbar */}
      <div className="sticky top-0 z-[110] bg-[#07080b]/85 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group font-sans text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>
        <div className="text-zinc-500 text-sm font-semibold tracking-wider uppercase hidden md:block">Noogin Nooks / Case Study</div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <span className="font-mono text-vscode-accent text-sm mb-4 block">01. Featured Case Study</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-sans tracking-tight mb-8">
            Noogin Nooks
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-[#252526] border border-vscode-border rounded-lg font-mono text-sm shadow-xl">
            <div>
              <span className="text-vscode-textDark block mb-1">Role</span>
              <span className="text-white font-bold">UI/UX Design</span>
            </div>
            <div>
              <span className="text-vscode-textDark block mb-1">Timeline</span>
              <span className="text-white font-bold">3 Weeks</span>
            </div>
            <div>
              <span className="text-vscode-textDark block mb-1">Context</span>
              <span className="text-white font-bold">Academic Project</span>
            </div>
            <div>
              <span className="text-vscode-textDark block mb-1">Team</span>
              <span className="text-white font-bold">Nibedita Behera, Lavanya Bhatia, Amrutha Bathala, Neha AK</span>
            </div>
          </div>

          {/* 5-Phone Stacked Hero */}
          <div className="relative h-[550px] md:h-[720px] flex items-center justify-center mb-8">
            {/* Background glow */}
            <div className="absolute w-[600px] h-[500px] bg-vscode-accent/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Phone 1 - Far left, deepest behind */}
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ rotate: -8, x: -30, scale: 1.02 }}
              className="absolute w-[160px] md:w-[230px] rounded-[24px] overflow-hidden border-[5px] border-[#3C3C3C] shadow-[0_25px_50px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 z-[5]"
              style={{ left: 'calc(50% - 370px)', top: '12%', rotate: -14 }}
            >
              <img src="/noogin-notes.png" alt="Notes" className="w-full h-auto" />
            </motion.div>

            {/* Phone 2 - Left, behind center */}
            <motion.div 
              initial={{ opacity: 0, x: -40, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: -7 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ rotate: -3, x: -15, scale: 1.02 }}
              className="absolute w-[180px] md:w-[260px] rounded-[26px] overflow-hidden border-[6px] border-[#3C3C3C] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 z-10"
              style={{ left: 'calc(50% - 260px)', top: '6%' }}
            >
              <img src="/noogin-subjects.png" alt="Subjects" className="w-full h-auto" />
            </motion.div>

            {/* Phone 3 - Center, front and biggest */}
            <motion.div 
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="relative w-[220px] md:w-[300px] rounded-[32px] overflow-hidden border-[7px] border-[#3C3C3C] shadow-[0_40px_80px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-500 z-30"
            >
              <img src="/noogin-eye.png" alt="Learn Your Way" className="w-full h-auto" />
            </motion.div>

            {/* Phone 4 - Right, behind center */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 7 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              whileHover={{ rotate: 3, x: 15, scale: 1.02 }}
              className="absolute w-[180px] md:w-[260px] rounded-[26px] overflow-hidden border-[6px] border-[#3C3C3C] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 z-10"
              style={{ right: 'calc(50% - 260px)', top: '6%' }}
            >
              <img src="/noogin-teach.png" alt="Teach It" className="w-full h-auto" />
            </motion.div>

            {/* Phone 5 - Far right, deepest behind */}
            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ rotate: 8, x: 30, scale: 1.02 }}
              className="absolute w-[160px] md:w-[230px] rounded-[24px] overflow-hidden border-[5px] border-[#3C3C3C] shadow-[0_25px_50px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 z-[5]"
              style={{ right: 'calc(50% - 370px)', top: '12%', rotate: 14 }}
            >
              <img src="/noogin-mindmaps.png" alt="Mind Maps" className="w-full h-auto" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <Section title="Project Overview" icon={Lightbulb}>
          <p className="text-xl md:text-2xl leading-relaxed">
            <span className="text-vscode-accent font-semibold">An AI first learning companion</span> that adapts lessons to each student’s style, be it auditory, visual, linguistic, or kinesthetic, delivering short, curriculum aligned micro lessons that fit into real school days.
          </p>
        </Section>

        {/* Problem & Research — Collapsible Code Comments */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <CollapsibleCard
            color="#FF5F56"
            label="01"
            title="Problem Statement"
            summary="One-size-fits-all education fails diverse learners"
          >
            The current education system relies on <span className="bg-[#FF5F56]/20 text-[#FF5F56] px-1 rounded font-medium">uniform teaching methods</span> that do not account for the different ways students learn. Students struggle to stay engaged, understand concepts deeply, and rely on memorization rather than meaningful learning. There is a need for a learning experience that <span className="bg-[#FF5F56]/20 text-[#FF5F56] px-1 rounded font-medium">adapts academic content to individual learning styles</span>.
          </CollapsibleCard>

          <CollapsibleCard
            color="#28C840"
            label="02"
            title="Research Goal"
            summary="Understand how learning styles shape engagement"
          >
            The goal was to understand how students with <span className="bg-[#28C840]/20 text-[#28C840] px-1 rounded font-medium">different learning styles</span> engage with educational content and identify challenges they face with traditional methods. The insights helped shape a more <span className="bg-[#28C840]/20 text-[#28C840] px-1 rounded font-medium">personalized and engaging learning experience</span>.
          </CollapsibleCard>
        </div>

        <Section title="How Might We" icon={Target}>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { text: "How might we break down the same content for different users?", bg: "#FFF9C4", delay: 0.1 },
              { text: "How might we cater more to students with different learning patterns?", bg: "#FFF9C4", delay: 0.15 },
              { text: "How can we empathise with their needs and create ways to help them study better?", bg: "#FFF9C4", delay: 0.2 },
              { text: "How might we make afterschool learning more engaging towards their learning styles?", bg: "#FFF9C4", delay: 0.25 },
              { text: "How might we be the best student learning companion?", bg: "#FFF9C4", delay: 0.3 },
              { text: "How might we keep students motivated when they encounter difficult concepts?", bg: "#FFF9C4", delay: 0.35 },
            ].map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: note.delay }}
                className="rounded p-4 shadow-md w-[170px] h-[170px]"
                style={{ backgroundColor: note.bg }}
              >
                <p className="text-[#2a2a2a] font-sans text-xs md:text-sm leading-snug font-medium">{note.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Research Methods" icon={Search}>
          <ul className="space-y-3 text-vscode-text text-base md:text-lg font-sans">
            <li className="flex items-center gap-3"><span className="text-vscode-accent">→</span> User Interviews</li>
            <li className="flex items-center gap-3"><span className="text-vscode-accent">→</span> Competitive Analysis</li>
            <li className="flex items-center gap-3"><span className="text-vscode-accent">→</span> SWOT Analysis</li>
            <li className="flex items-center gap-3"><span className="text-vscode-accent">→</span> User Persona</li>
            <li className="flex items-center gap-3"><span className="text-vscode-accent">→</span> User Journey Mapping</li>
            <li className="flex items-center gap-3"><span className="text-vscode-accent">→</span> Gap &amp; Opportunity Analysis</li>
          </ul>
        </Section>

        <Section title="Affinity Mapping" icon={Compass}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-vscode-border shadow-2xl"
          >
            <img src="/noogin-affinity.png" alt="Affinity Mapping — Learning Behaviour, Content Experience, Motivation, User Needs, Opportunity Areas" className="w-full h-auto" />
          </motion.div>
        </Section>

        <Section title="Insights from Interviews" icon={Sparkles}>
          <ul className="space-y-3 text-vscode-text text-base md:text-lg font-sans">
            <li className="flex items-start gap-3"><span className="text-vscode-accent mt-1">→</span> Students learn better when content matches their preferred learning style.</li>
            <li className="flex items-start gap-3"><span className="text-vscode-accent mt-1">→</span> Teaching or explaining concepts to someone else helps students reinforce learning and retain information more effectively.</li>
            <li className="flex items-start gap-3"><span className="text-vscode-accent mt-1">→</span> Most visual learners understand information better through charts, diagrams, mind maps, and color coding.</li>
            <li className="flex items-start gap-3"><span className="text-vscode-accent mt-1">→</span> Learners can have multiple learning preferences, with combinations such as visual and kinesthetic or visual and audio working together effectively.</li>
          </ul>
        </Section>

        <Section title="User Persona" icon={Users}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Arjun */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden border border-vscode-border shadow-2xl"
            >
              <img src="/persona-arjun.png" alt="User Persona — Arjun, 8th Grade, Kinesthetic Learner, ICSE" className="w-full h-auto" />
            </motion.div>

            {/* Riya */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-xl overflow-hidden border border-vscode-border shadow-2xl"
            >
              <img src="/persona-riya.png" alt="User Persona — Riya, 9th Grade, Visual Learner, CBSE" className="w-full h-auto" />
            </motion.div>
          </div>
        </Section>

        <Section title="User Journey Map" icon={Compass}>
          <JourneyMap />
        </Section>

        <Section title="Competitive Analysis" icon={Target}>
          <CompetitiveAnalysis />
        </Section>

        <Section title="SWOT Analysis" icon={Lightbulb}>
          <SwotAnalysis />
        </Section>

        <Section title="Gap & Opportunity Areas" icon={ShieldAlert}>
          <GapAnalysis />
        </Section>

        <Section title="Design & Architecture" icon={Layout}>
          <div className="space-y-12">
            <div>
              <h4 className="text-white font-bold mb-6 font-sans text-xl">Information Architecture</h4>
              <div className="w-full bg-[#252526] border border-vscode-border rounded-xl shadow-xl overflow-hidden p-2">
                <img src="/noogin-ia.png" alt="Information Architecture" className="w-full h-auto rounded-lg" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 font-sans text-2xl md:text-3xl">Wireframes & Mid-Fidelity</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {Array.from({ length: 22 }).map((_, i) => {
                  const imagePath = i < 22 ? `/wf-${i + 1}.png` : "";
                  const screenNames = [
                    "Onboarding",
                    "Sign Up",
                    "Login",
                    "Find Out Style",
                    "Onboarding Question 1",
                    "Onboarding Question 2",
                    "Learning Style Results",
                    "Dashboard (First Time User)",
                    "Dashboard (Existing User)",
                    "Select Subject",
                    "Select Chapter",
                    "Choose Learner Style",
                    "Visual Content Mode",
                    "Mind Map Layout",
                    "Interactive Flash Cards",
                    "Colour Coded Notes",
                    "Audio Content Mode",
                    "Audio Podcast Screen",
                    "Hands-on Learning Mode",
                    "Short Video Lecture",
                    "Colour Coded Reading Notes",
                    "Teach It to Someone"
                  ];
                  const labelName = screenNames[i] || `Screen ${i + 1}`;
                  return (
                    <PhoneFrame key={i} label={labelName}>
                      {imagePath ? (
                        <img 
                          src={imagePath} 
                          alt={labelName} 
                          className="w-full h-full object-contain bg-[#FAF9F5]" 
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-vscode-textDark/40 text-center p-4">
                          <span className="text-3xl mb-2 opacity-50">✏️</span>
                          <span className="text-[10px] font-mono tracking-widest uppercase">Placeholder</span>
                        </div>
                      )}
                    </PhoneFrame>
                  );
                })}
              </div>
            </div>

            <StyleGuide />
          </div>
        </Section>
      </div>

      {/* The Requested Massive Interactive Scrollytelling High Fidelity Section */}
      <HighFidelityGrid />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-40">
        <Section title="User Usability Testing" icon={Users}>
          {/* Top Row: Session Overview and Live Testing Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            {/* Left Column: Image Card */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-vscode-border bg-[#252526] p-2 shadow-2xl transition-all duration-300 hover:border-vscode-accent/50">
              <img 
                src="/user-testing.jpg" 
                alt="User testing the Noogin high-fidelity prototype in real time" 
                className="w-full h-auto rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white text-xs font-mono tracking-wider uppercase mb-1">Live Usability Run</span>
                <span className="text-vscode-textDark text-[11px] leading-relaxed">Testing layout comprehension and cognitive friction with middle-school learners.</span>
              </div>
            </div>
            
            {/* Right Column: Usability Testing Scope info */}
            <div className="lg:col-span-7 space-y-6 font-sans">
              <div className="flex flex-col space-y-1">
                <span className="font-mono text-vscode-accent text-xs uppercase tracking-wider">Empathetic Design Validation</span>
                <h4 className="text-white font-bold text-2xl md:text-3xl">Real-World Usability Run</h4>
              </div>
              <p className="text-vscode-text text-base leading-relaxed">
                Rather than relying on abstract design theories, we put our high-fidelity prototype directly in front of middle-school learners. By observing their natural gestures, emotional highs, and points of friction, we uncovered crucial insights that guided our final iteration phase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1E1E1E] border border-vscode-border rounded-xl p-4 shadow-lg">
                  <span className="text-vscode-accent font-mono text-xs block mb-1">TARGET USER</span>
                  <span className="text-white font-bold text-sm">9th Grade Learner</span>
                </div>
                <div className="bg-[#1E1E1E] border border-vscode-border rounded-xl p-4 shadow-lg">
                  <span className="text-vscode-accent font-mono text-xs block mb-1">METHODOLOGY</span>
                  <span className="text-white font-bold text-sm">Cognitive Walkthrough</span>
                </div>
                <div className="bg-[#1E1E1E] border border-vscode-border rounded-xl p-4 shadow-lg">
                  <span className="text-vscode-accent font-mono text-xs block mb-1">TEST GOAL</span>
                  <span className="text-white font-bold text-sm">Task Completion Rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Unified Segmented Dashboard Card with Inner Full-Width Toggle */}
          <div className="w-full">
            <div className="relative border border-vscode-border bg-[#252526] rounded-3xl shadow-2xl overflow-hidden w-full min-h-[520px] flex flex-col justify-start">
              
              {/* Tab Toggle - Flush at the top of the box, spanning the exact box width */}
              <div className="grid grid-cols-2 bg-[#1E1E1E] border-b border-vscode-border w-full relative z-10">
                <button
                  onClick={() => setActiveTestTab(0)}
                  className={`py-4 px-4 font-sans text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative ${
                    activeTestTab === 0
                      ? "bg-[#252526] text-white border-b-2 border-vscode-accent scale-[1.01]"
                      : "text-vscode-textDark hover:text-white"
                  }`}
                >
                  <span className="text-sm md:text-base">🎨</span>
                  <span className="truncate">1. Page Restructuring</span>
                </button>
                
                <button
                  onClick={() => setActiveTestTab(1)}
                  className={`py-4 px-4 font-sans text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative ${
                    activeTestTab === 1
                      ? "bg-[#252526] text-white border-b-2 border-vscode-accent scale-[1.01]"
                      : "text-vscode-textDark hover:text-white"
                  }`}
                >
                  <span className="text-sm md:text-base">🤖</span>
                  <span className="truncate">2. Speech vs Typing</span>
                </button>
              </div>

              {/* Main Content Body - Padded */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-vscode-accent/5 rounded-full blur-2xl pointer-events-none"></div>

                <AnimatePresence mode="wait">
                  {activeTestTab === 0 && (
                    <motion.div
                      key="pivot-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
                    >
                      {/* Left: Quotes */}
                      <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full py-2">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <span className="px-3.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs rounded-full uppercase tracking-wider font-semibold">Usability Finding 1</span>
                            <h4 className="text-white font-extrabold text-2xl md:text-3xl font-sans tracking-tight leading-tight">Restructuring Page Layout</h4>
                          </div>

                          <div className="space-y-5">
                            <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-3 relative overflow-hidden shadow-inner">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
                              <span className="text-red-400 text-xs font-mono tracking-wider uppercase font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                What the student said:
                              </span>
                              <p className="text-vscode-text text-base md:text-lg italic leading-relaxed font-sans font-medium">
                                "Before, all the content was stacked in one single scrollable screen. It felt super overwhelming and boring, and I didn't feel like scrolling."
                              </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-[#28C840]/5 border border-[#28C840]/10 space-y-3 relative overflow-hidden shadow-inner">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#28C840]/40" />
                              <span className="text-[#28C840] text-xs font-mono tracking-wider uppercase font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]"></span>
                                Our design realignment:
                              </span>
                              <p className="text-vscode-text text-base md:text-lg leading-relaxed font-sans font-medium">
                                We structured the layout into beautiful, categorized tabs so kids can learn step-by-step without scrolling fatigue.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Realignment Impact metrics to fill vertical space */}
                        <div className="pt-6 border-t border-vscode-border/30 flex items-center gap-3.5 mt-2">
                          <span className="text-3xl p-2 bg-[#1E1E1E] rounded-xl border border-vscode-border">⚡</span>
                          <div>
                            <span className="text-white font-bold text-sm md:text-base block font-sans">40% Friction Reduction</span>
                            <span className="text-vscode-textDark text-xs font-sans leading-relaxed block">Cognitive fatigue eliminated by grouping historical content into step-by-step tabs.</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Mockup phones */}
                      <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#1E1E1E]/50 rounded-2xl border border-vscode-border/50 w-full relative group">
                        <span className="font-mono text-[10px] text-vscode-textDark uppercase tracking-widest mb-4 font-semibold">Visual Layout Evolution</span>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full justify-items-center">
                          <div className="flex flex-col items-center space-y-3 w-full max-w-[210px] transition-transform duration-300 hover:scale-[1.03]">
                            <div className="relative group border-4 border-red-500/20 rounded-[38px] p-1.5 bg-[#09090B] transition-all hover:border-red-500/50 shadow-2xl w-full">
                              <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                                <img src="/visual-before.png" alt="Visual Hub Before" className="w-full h-full object-fill" />
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-zinc-900 rounded-full z-20"></div>
                              </div>
                            </div>
                            <span className="text-red-400 font-mono text-xs tracking-wider uppercase font-semibold text-center">Before: Stacked Scroll</span>
                          </div>

                          <div className="flex flex-col items-center space-y-3 w-full max-w-[210px] transition-transform duration-300 hover:scale-[1.03]">
                            <div className="relative group border-4 border-[#28C840]/20 rounded-[38px] p-1.5 bg-[#09090B] transition-all hover:border-[#28C840]/50 shadow-2xl w-full">
                              <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                                <img src="/hf-17.png" alt="Curated Visual Hub Redesigned After" className="w-full h-full object-fill" />
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-zinc-900 rounded-full z-20"></div>
                              </div>
                            </div>
                            <span className="text-[#28C840] font-mono text-xs tracking-wider uppercase font-semibold text-center">After: Categorized Hub</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTestTab === 1 && (
                    <motion.div
                      key="pivot-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
                    >
                      {/* Left: Quotes */}
                      <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full py-2">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <span className="px-3.5 py-1 bg-vscode-accent/10 border border-vscode-accent/20 text-vscode-accent font-mono text-xs rounded-full uppercase tracking-wider font-semibold">Usability Finding 2</span>
                            <h4 className="text-white font-extrabold text-2xl md:text-3xl font-sans tracking-tight leading-tight">Lowering Speech Anxiety</h4>
                          </div>

                          <div className="space-y-5">
                            <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-3 relative overflow-hidden shadow-inner">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
                              <span className="text-red-400 text-xs font-mono tracking-wider uppercase font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                What the student said:
                              </span>
                              <p className="text-vscode-text text-base md:text-lg italic leading-relaxed font-sans font-medium">
                                "Before, the screen forced me to ONLY speak to study. That made me super anxious because microphone dictation keeps spelling things wrong! I'm way more comfortable writing."
                              </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-[#28C840]/5 border border-[#28C840]/10 space-y-3 relative overflow-hidden shadow-inner">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#28C840]/40" />
                              <span className="text-[#28C840] text-xs font-mono tracking-wider uppercase font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]"></span>
                                Our design realignment:
                              </span>
                              <p className="text-vscode-text text-base md:text-lg leading-relaxed font-sans font-medium">
                                We separated the blackboard and added typing and drawing options so kids can study in whatever way makes them feel comfortable.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Realignment Impact metrics to fill vertical space */}
                        <div className="pt-6 border-t border-vscode-border/30 flex items-center gap-3.5 mt-2">
                          <span className="text-3xl p-2 bg-[#1E1E1E] rounded-xl border border-vscode-border">❤️</span>
                          <div>
                            <span className="text-white font-bold text-sm md:text-base block font-sans">92% Task Success Rate</span>
                            <span className="text-vscode-textDark text-xs font-sans leading-relaxed block">Mic anxiety relieved by introducing multimodal Canvas board typing & keyboard access tools.</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Mockup phones */}
                      <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#1E1E1E]/50 rounded-2xl border border-vscode-border/50 w-full relative group">
                        <span className="font-mono text-[10px] text-vscode-textDark uppercase tracking-widest mb-4 font-semibold">Whiteboard Interaction Pivot</span>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full justify-items-center">
                          <div className="flex flex-col items-center space-y-3 w-full max-w-[210px] transition-transform duration-300 hover:scale-[1.03]">
                            <div className="relative group border-4 border-red-500/20 rounded-[38px] p-1.5 bg-[#09090B] transition-all hover:border-red-500/50 shadow-2xl w-full">
                              <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                                <img src="/teach-before.png" alt="Teaching Board Before" className="w-full h-full object-fill" />
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-zinc-900 rounded-full z-20"></div>
                              </div>
                            </div>
                            <span className="text-red-400 font-mono text-xs tracking-wider uppercase font-semibold text-center">Before: Speech-Only Forced</span>
                          </div>

                          <div className="flex flex-col items-center space-y-3 w-full max-w-[210px] transition-transform duration-300 hover:scale-[1.03]">
                            <div className="relative group border-4 border-[#28C840]/20 rounded-[38px] p-1.5 bg-[#09090B] transition-all hover:border-[#28C840]/50 shadow-2xl w-full">
                              <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                                <img src="/hf-28.png" alt="Teaching Board Redesigned After" className="w-full h-full object-fill" />
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-zinc-900 rounded-full z-20"></div>
                              </div>
                            </div>
                            <span className="text-[#28C840] font-mono text-xs tracking-wider uppercase font-semibold text-center">After: Multimodal Canvas</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>        </Section>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-vscode-border flex justify-between items-center text-vscode-textDark font-mono text-sm">
          <span>End of Case Study</span>
          <button onClick={onClose} className="text-vscode-accent hover:text-white transition-colors">Return to Portfolio</button>
        </div>
      </div>
    </motion.div>
  );
};

export default NooginCaseStudy;
