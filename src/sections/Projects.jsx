import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Loader2, ArrowUpRight, FolderOpen, X, ArrowLeft } from 'lucide-react';
import NooginCaseStudy from '../components/NooginCaseStudy';
import ScrapGardenCaseStudy from '../components/ScrapGardenCaseStudy';
import RydrCaseStudy from '../components/RydrCaseStudy';

const projects = [
  {
    id: 1,
    number: "01",
    title: "Noogin nooks",
    tagline: "PERSONALIZED LEARNING SUITE",
    accent: "#fbbf24", // Yellow/Gold
    description: "Transforming one-size-fits-all education into a personalized learning experience tailored to how each student learns best.",
    tech: ["Product Design", "Personalization", "Ed Tech"],
    image: "/noogin-cover.jpg",
    link: "noogin"
  },
  {
    id: 2,
    number: "02",
    title: "Rydr",
    tagline: "CAMPUS MOBILITY PLATFORM",
    accent: "#3b82f6", // Blue
    description: "Designing a student-friendly mobility solution to simplify commuting across large college campuses.",
    tech: ["Product Design", "Campus Mobility", "Usability"],
    image: "/rydr-cover.jpg",
    link: "rydr"
  },
  {
    id: 3,
    number: "03",
    title: "Smart Vision AI System",
    tagline: "COMPUTER VISION INTERFACE",
    accent: "#10b981", // Green
    description: "Terminal based AI checking tool. Built a seamless interface for checking real-time vision processing.",
    tech: ["Computer Vision", "Python", "TensorFlow"],
    image: "/vision-cover.jpg",
    link: "https://github.com"
  }
];

const explorationProjects = [
  {
    id: 4,
    title: "Scrap Garden",
    description: "Creating a sustainable, interactive installation that transforms scrap materials into a responsive garden experience.",
    tech: ["Spatial Experience", "Arduino", "Craft"],
    image: "/scrapgarden-cover.jpg",
    video: "/scrapgarden-loop.mp4",
    link: "scrap-garden",
    size: "wide"
  },
  { 
    id: 5, 
    title: "Physical Computing", 
    description: "Hardware and software integration. Developed robust physical interfaces capable of handling complex inputs.", 
    tech: ["Arduino", "C++"], 
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400",
    size: "narrow"
  },
  { 
    id: 6, 
    title: "Blender", 
    description: "3D Modeling and rendering. Automated quality checks to enforce strict rules across 3D scenes.", 
    tech: ["3D Design", "Render"], 
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400",
    size: "narrow"
  },
  { 
    id: 7, 
    title: "Geospatial Visualisation", 
    description: "Data mapping without generic tools. Explored the limits by creating detailed, responsive spatial graphics.", 
    tech: ["GIS", "Mapping"], 
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=400",
    size: "wide"
  }
];

/* ─── Stacked Project Card with Top-Left Mono Numbering & Uniform Left-Text/Right-Photo Layout ─── */
const ProjectCard = ({ project, index, onRun }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div 
      ref={ref}
      className="sticky top-24 w-full mb-24 last:mb-0"
      style={{
        paddingTop: `${index * 24}px`,
        zIndex: index + 10
      }}
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderColor: isHovered ? 'rgba(197, 168, 128, 0.4)' : 'rgba(197, 168, 128, 0.18)',
          backgroundColor: '#141413',
          backgroundImage: isHovered 
            ? 'radial-gradient(600px circle at 90% 10%, rgba(197, 168, 128, 0.06), #141413 100%)' 
            : 'none'
        }}
        className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] p-6 md:p-12 pt-16 md:pt-20 rounded-[40px] transition-all duration-500 cursor-pointer overflow-hidden items-center min-h-[500px] lg:min-h-[560px] isolate"
        onClick={() => onRun(project.link)}
      >
        {/* Small top-left numbering in modern mono font */}
        <div className="absolute top-6 md:top-8 left-8 md:left-12 z-20 font-mono text-[10px] md:text-[11px] font-black tracking-[0.25em] text-zinc-500 group-hover:text-white transition-colors duration-300">
          PROJECT // {project.number}
        </div>

        {/* Image/Video Container - Always on the Right */}
        <div 
          className="lg:col-span-7 relative overflow-hidden rounded-[24px] bg-zinc-950 border border-white/5 aspect-[16/10] shadow-2xl flex items-center justify-center transition-all duration-500 z-10 lg:order-2"
        >
          <div className="absolute inset-0 bg-[#0e0e0d]/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
          
          {project.video ? (
            <motion.video 
              style={{ y: imageY }}
              src={project.video} 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : project.image ? (
            <motion.img 
              style={{ y: imageY }}
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-500">
              <span className="text-sm font-sans">No preview image available</span>
            </div>
          )}
        </div>

        {/* Text Content - Always on the Left */}
        <div 
          className="lg:col-span-5 relative z-10 flex flex-col items-start text-left lg:order-1 mt-4 lg:mt-0"
        >
          <span 
            className="font-bold text-[10px] tracking-[0.3em] uppercase mb-3 text-accent transition-colors duration-300"
          >
            {project.tagline}
          </span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white group-hover:text-white mb-6 font-sans tracking-tight transition-colors duration-300 leading-none">
            {project.title}
          </h3>
          
          {/* Opaque Background on the description card blocks background elements from showing behind words */}
          <div className="p-6 rounded-[20px] mb-6 shadow-xl w-full bg-[#0e0e0d] border border-[#c5a880]/15 group-hover:border-[#c5a880]/30 transition-all duration-500 text-left">
            <p className="text-zinc-300 leading-relaxed font-sans text-sm md:text-base">
              {project.description}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2 text-[10px] mb-8">
            {project.tech.map((t, idx) => (
              <li 
                key={idx} 
                className="px-3 py-1.5 rounded-lg border border-white/5 text-zinc-400 bg-white/[0.02] font-sans font-semibold group-hover:text-white transition-colors duration-300"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-accent transition-colors duration-300">
            <span className="relative py-1">
              {project.link.startsWith('http') ? 'Visit Live Link' : 'Explore Case Study'}
              <span 
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-accent"
              />
            </span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Bento Grid Creative Exploration Card ─── */
const ExplorationCard = ({ project, index, onRun }) => {
  const isWide = project.size === 'wide';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => onRun(project)}
      className={`group relative rounded-3xl overflow-hidden border border-[#c5a880]/15 hover:border-[#c5a880]/35 bg-[#141413] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 h-[360px] md:h-[440px] flex flex-col justify-end p-6 md:p-8 ${
        isWide ? 'lg:col-span-8' : 'lg:col-span-4'
      }`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-[#0e0e0d]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0d]/95 via-[#0e0e0d]/30 to-transparent z-10" />
      </div>

      <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
        EXP_0{project.id - 3}
      </div>

      <div className="relative z-20 text-left">
        <h4 className="text-white text-xl md:text-2xl font-black font-sans flex items-center justify-between group-hover:text-accent transition-colors duration-300">
          <span>{project.title}</span>
          <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </h4>
        
        {/* Accordion slide-reveal details */}
        <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[100px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans mt-3">
            {project.description}
          </p>
        </div>

        <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-[120px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] font-mono text-zinc-400 border border-white/5 px-2 py-0.5 rounded-md bg-white/[0.02]"
                >
                  {t}
                </span>
              ))}
            </div>
            
            <span className="text-[10px] font-black font-sans uppercase tracking-wider text-accent group-hover:text-white transition-colors duration-300 whitespace-nowrap hidden sm:block">
              {project.link === 'scrap-garden' ? 'View Case Study →' : 'Quick View →'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── main Projects Component ─── */
const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  // Overlays / Slide Case Studies
  const [isNooginCaseStudyOpen, setIsNooginCaseStudyOpen] = useState(false);
  const [isScrapGardenCaseStudyOpen, setIsScrapGardenCaseStudyOpen] = useState(false);
  const [isRydrCaseStudyOpen, setIsRydrCaseStudyOpen] = useState(false);

  // Exploration Quick-View Detail Modal
  const [activeExploration, setActiveExploration] = useState(null);

  // Consolidated URL Hash State Monitor to support Native Browser Back Button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Close all overlays/modals initially
      setIsNooginCaseStudyOpen(false);
      setIsScrapGardenCaseStudyOpen(false);
      setIsRydrCaseStudyOpen(false);
      setActiveExploration(null);

      // Handle match
      if (hash === '#noogin') {
        setIsNooginCaseStudyOpen(true);
      } else if (hash === '#rydr') {
        setIsRydrCaseStudyOpen(true);
      } else if (hash === '#scrap-garden') {
        setIsScrapGardenCaseStudyOpen(true);
      } else if (hash.startsWith('#exp-')) {
        const expId = parseInt(hash.replace('#exp-', ''), 10);
        const exp = explorationProjects.find(e => e.id === expId);
        if (exp) {
          setActiveExploration(exp);
        }
      }
    };

    // Run on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to Escape Key to dismiss any active modals/slides
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        window.location.hash = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRun = (link) => {
    if (link === 'noogin' || link === 'rydr' || link === 'scrap-garden') {
      setLoading(true);
      setLoadingText("opening case study...");
      
      setTimeout(() => {
        setLoadingText("preparing slides...");
        setTimeout(() => {
          setLoading(false);
          window.location.hash = link;
        }, 600);
      }, 600);
    } else if (link.startsWith('http')) {
      window.open(link, '_blank');
    }
  };

  const handleExplorationClick = (project) => {
    if (project.link === 'scrap-garden') {
      handleRun('scrap-garden');
    } else {
      window.location.hash = `exp-${project.id}`;
    }
  };

  return (
    <div className="pt-8 pb-16 relative h-full z-10">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0e0e0d]/90 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center p-8 rounded-2xl border border-white/5 bg-[#141413] shadow-2xl">
              <Loader2 className="animate-spin text-accent mb-4" size={32} />
              <p className="font-sans text-xs tracking-wider uppercase text-zinc-400 animate-pulse">{loadingText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEATURED WORK SECTION ─── */}
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold flex items-center space-x-4 text-white font-sans tracking-tight mb-20"
      >
        <span className="text-accent font-sans text-2xl">✦</span>
        <span>Featured Work</span>
        <div className="h-px bg-white/5 flex-1 ml-4"></div>
      </motion.h2>

      {/* Vertical Stacked Cards Deck */}
      <div className="flex flex-col mb-40 relative">
        {projects.map((project, i) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={i} 
            onRun={handleRun} 
          />
        ))}
      </div>

      {/* ─── CREATIVE EXPLORATIONS SECTION ─── */}
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12 flex items-center space-x-4 text-white font-sans tracking-tight"
      >
        <span className="text-accent font-sans text-2xl">✦</span>
        <span>Creative Explorations</span>
        <div className="h-px bg-white/5 flex-1 ml-4"></div>
      </motion.h2>

      {/* Asymmetric 12-Column Checkerboard Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        {explorationProjects.map((project, i) => (
          <ExplorationCard 
            key={project.id} 
            project={project} 
            index={i} 
            onRun={handleExplorationClick} 
          />
        ))}
      </div>

      {/* ─── FULLSCREEN CASE STUDY MODAL SLIDES ─── */}
      <AnimatePresence>
        {isNooginCaseStudyOpen && (
          <NooginCaseStudy onClose={() => { window.location.hash = ''; }} />
        )}
        {isScrapGardenCaseStudyOpen && (
          <ScrapGardenCaseStudy onClose={() => { window.location.hash = ''; }} />
        )}
        {isRydrCaseStudyOpen && (
          <RydrCaseStudy onClose={() => { window.location.hash = ''; }} />
        )}
      </AnimatePresence>

      {/* ─── EXPLORATION QUICK-VIEW MODAL ─── */}
      <AnimatePresence>
        {activeExploration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { window.location.hash = ''; }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#0e0e0d]/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full border border-white/5 bg-[#141413] rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => { window.location.hash = ''; }}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition-all cursor-pointer hover:scale-105"
              >
                <X size={16} />
              </button>

              <div className="w-full aspect-video overflow-hidden rounded-xl bg-zinc-950 border border-white/5 relative mb-6">
                {activeExploration.video ? (
                  <video
                    src={activeExploration.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : activeExploration.image ? (
                  <img
                    src={activeExploration.image}
                    alt={activeExploration.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs">
                    NO_PREVIEW
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
                  EXP_0{activeExploration.id - 3}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-sans text-white">
                  {activeExploration.title}
                </h3>
                
                <p className="text-zinc-300 leading-relaxed font-sans text-sm">
                  {activeExploration.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activeExploration.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-mono text-accent border border-accent/10 px-3 py-1 rounded-lg bg-accent/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
