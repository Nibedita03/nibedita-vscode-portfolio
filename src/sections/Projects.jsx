import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Loader2, ArrowUpRight, FolderOpen, X, ArrowLeft } from 'lucide-react';
import NooginCaseStudy from '../components/NooginCaseStudy';
import ScrapGardenCaseStudy from '../components/ScrapGardenCaseStudy';
import RydrCaseStudy from '../components/RydrCaseStudy';
import GeospatialCaseStudy from '../components/GeospatialCaseStudy';

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
    title: "Blender Basics", 
    description: "A series of 16 3D modeling experiments, low-poly objects, and lighting studies.", 
    tech: ["3D Modeling", "Blender", "Cycles Render"], 
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400",
    images: [
      { id: 1, title: "Low-Poly Isometric Bedroom", type: "image", src: "/blender-1.jpg", folder: "isometric_room", aspect: "aspect-video" },
      { id: 2, title: "Fluid Splash Simulation", type: "video", src: "/blender-2.mp4", folder: "isometric_room", aspect: "aspect-square" },
      { id: 3, title: "Sci-Fi Cargo Bay", type: "image", src: "/blender-3.jpg", folder: "isometric_room", aspect: "aspect-square" },
      { id: 4, title: "Satisfying Gear Assembly", type: "video", src: "/blender-4.mp4", folder: "isometric_room", aspect: "aspect-video" },
      { id: 5, title: "Cloth Physics on Sphere", type: "video", src: "/blender-5.mp4", folder: "isometric_room", aspect: "aspect-video" },
      { id: 6, title: "Glass Dispersion Shader", type: "image", src: "/blender-6.jpg", folder: "nobita_bedroom", aspect: "aspect-video" },
      { id: 7, title: "Mech Drone Model", type: "image", src: "/blender-7.jpg", folder: "nobita_bedroom", aspect: "aspect-square" },
      { id: 8, title: "Retro Console Box", type: "image", src: "/blender-8.jpg", folder: "nobita_bedroom", aspect: "aspect-video" },
      { id: 9, title: "Marble Run Simulation", type: "video", src: "/blender-9.mp4", folder: "nobita_bedroom", aspect: "aspect-video" },
      { id: 10, title: "Procedural Pine Tree", type: "image", src: "/blender-10.jpg", folder: "nobita_bedroom", aspect: "aspect-square" },
      { id: 11, title: "Chocolate Bar & Gold Foil", type: "image", src: "/blender-11.jpg", folder: "basic_object_studies", aspect: "aspect-video" },
      { id: 12, title: "Chess Queen", type: "image", src: "/blender-12.jpg", folder: "basic_object_studies", aspect: "aspect-video" },
      { id: 13, title: "Candle & Candleholder", type: "image", src: "/blender-13.jpg", folder: "basic_object_studies", aspect: "aspect-square" },
      { id: 14, title: "Wine Bottles — Wide Shot", type: "image", src: "/blender-14.jpg", folder: "basic_object_studies", aspect: "aspect-video" },
      { id: 15, title: "Chess Board", type: "image", src: "/blender-15.jpg", folder: "basic_object_studies", aspect: "aspect-square" },
      { id: 16, title: "Table & Chair Set", type: "image", src: "/blender-16.jpg", folder: "basic_object_studies", aspect: "aspect-square" },
      { id: 17, title: "Chocolate Drip", type: "image", src: "/blender-chess.jpg", folder: "basic_object_studies", aspect: "aspect-square" },
      { id: 18, title: "Dart Board", type: "image", src: "/blender-dart.jpg", folder: "basic_object_studies", aspect: "aspect-square" },
      { id: 19, title: "Ping Pong Paddle", type: "image", src: "/blender-paddle.jpg", folder: "basic_object_studies", aspect: "aspect-square" },
      { id: 20, title: "Animation Render", type: "video", src: "/blender-anim.mp4", folder: "basic_object_studies", aspect: "aspect-video" }
    ],
    size: "narrow"
  },
  { 
    id: 7, 
    title: "Geospatial Visualisation", 
    description: "Mapped cyclone risk zones, population density, and critical infrastructure across Ganjam, Odisha using QGIS — identifying the most vulnerable communities and underserved shelter locations.", 
    tech: ["QGIS", "GIS", "Data Mapping", "Humanitarian"], 
    image: "/geo-map-3.png",
    link: "geospatial",
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
              {(project.link === 'scrap-garden' || project.link === 'geospatial') ? 'View Case Study →' : 'Quick View →'}
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
  const [isGeospatialCaseStudyOpen, setIsGeospatialCaseStudyOpen] = useState(false);

  // Exploration Quick-View Detail Modal
  const [activeExploration, setActiveExploration] = useState(null);
  
  // Selected image index for Blender/gallery lightboxes
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Selected folder/category for dynamic explorers
  const [selectedFolder, setSelectedFolder] = useState("isometric_room");

  // Collapsible accordion states for rooms inside Blender modal
  const [isRoom1Expanded, setIsRoom1Expanded] = useState(false);
  const [isRoom2Expanded, setIsRoom2Expanded] = useState(false);

  // Consolidated URL Hash State Monitor to support Native Browser Back Button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Close all overlays/modals initially
      setIsNooginCaseStudyOpen(false);
      setIsScrapGardenCaseStudyOpen(false);
      setIsRydrCaseStudyOpen(false);
      setIsGeospatialCaseStudyOpen(false);
      setActiveExploration(null);
      setSelectedImageIndex(null);
      setSelectedFolder("isometric_room");
      setIsRoom1Expanded(false);
      setIsRoom2Expanded(false);

      // Handle match
      if (hash === '#noogin') {
        setIsNooginCaseStudyOpen(true);
      } else if (hash === '#rydr') {
        setIsRydrCaseStudyOpen(true);
      } else if (hash === '#scrap-garden') {
        setIsScrapGardenCaseStudyOpen(true);
      } else if (hash === '#geospatial') {
        setIsGeospatialCaseStudyOpen(true);
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

  // Lock body scroll when activeExploration (Blender Basics modal) or gallery lightbox is open
  useEffect(() => {
    const isLocked = activeExploration !== null || selectedImageIndex !== null;
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeExploration, selectedImageIndex]);

  const handleRun = (link) => {
    if (link === 'noogin' || link === 'rydr' || link === 'scrap-garden' || link === 'geospatial') {
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
    } else if (project.link === 'geospatial') {
      handleRun('geospatial');
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

      {/* Vertical Stacked Cards Deck (with isolate stacking context to prevent z-index bleed) */}
      <div className="flex flex-col mb-40 relative isolate">
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
        {isGeospatialCaseStudyOpen && (
          <GeospatialCaseStudy onClose={() => { window.location.hash = ''; }} />
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
            {activeExploration.images ? (
              /* Immersive Collapsible-Based Gallery for Blender Basics */
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-7xl w-[94vw] h-[90vh] border border-[#c5a880]/15 bg-[#141413] rounded-3xl relative shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Always-pinned Close button on top-right of the modal window */}
                <button
                  onClick={() => { window.location.hash = ''; }}
                  className="absolute top-8 right-8 md:top-10 md:right-10 p-3 rounded-full border border-white/10 hover:border-white/20 bg-[#141413]/90 text-zinc-400 hover:text-white transition-all cursor-pointer hover:scale-105 z-30 backdrop-blur-sm shadow-md"
                >
                  <X size={20} />
                </button>

                {/* Inner Scrollable Body */}
                <div className="overflow-y-auto flex-1 custom-scrollbar p-8 md:p-12 pr-12 text-left">
                  
                  {/* Modal Header */}
                  <div className="mb-12 text-left space-y-4 pr-24">
                    <h3 className="text-4xl md:text-5xl font-black font-sans text-white tracking-tight uppercase">
                      {activeExploration.title}
                    </h3>
                    <p className="text-zinc-300 font-sans text-base md:text-lg max-w-4xl leading-relaxed">
                      {activeExploration.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {activeExploration.tech.map((t, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs md:text-sm font-mono text-accent border border-accent/20 px-4 py-1.5 rounded-xl bg-accent/5 font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 1. Singular Objects Section */}
                  <div className="space-y-6 mb-12 text-left">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <span className="text-base md:text-lg font-mono uppercase text-zinc-400 font-black tracking-wider">Singular 3D Objects</span>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.03] text-zinc-500 border border-white/5 font-mono">6 renders</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-6">
                      {activeExploration.images
                        .filter(img => img.folder === 'basic_object_studies')
                        .map((obj) => {
                          const globalIndex = activeExploration.images.findIndex(img => img.id === obj.id);
                          return (
                            <div key={obj.id} className="flex flex-col space-y-4">
                              <motion.div
                                whileHover={{ scale: 1.015, y: -4 }}
                                onClick={() => setSelectedImageIndex(globalIndex)}
                                className="group relative aspect-video rounded-3xl overflow-hidden border border-[#c5a880]/15 bg-[#0e0e0d] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex items-center justify-center"
                              >
                                {obj.type === 'video' ? (
                                  <video
                                    src={obj.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/scrarap-garden-loop.mp4";
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={obj.src}
                                    alt={obj.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                      if (obj.src && e.target.src.endsWith('.jpg')) {
                                        e.target.src = obj.src.replace('.jpg', '.png');
                                      } else {
                                        e.target.onerror = null;
                                        e.target.src = `https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400`;
                                      }
                                    }}
                                  />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <span className="text-white font-mono text-xs md:text-sm tracking-wider uppercase font-semibold border border-white/20 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm">
                                    {obj.type === 'video' ? 'Play Animation ✦' : 'View Object ✦'}
                                  </span>
                                </div>
                              </motion.div>
                              <div className="px-2 pt-1 text-left">
                                <span className="text-white font-sans text-lg md:text-xl font-bold tracking-tight">{obj.title}</span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* 2. Collapsible Isometric Room */}
                  <div className="border border-[#c5a880]/30 bg-[#c5a880]/[0.01] rounded-3xl overflow-hidden mb-8 text-left">
                    <button 
                      onClick={() => setIsRoom1Expanded(!isRoom1Expanded)}
                      className="w-full flex items-center justify-between px-8 py-6 hover:bg-[#c5a880]/[0.03] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">📁</span>
                        <h4 className="text-white font-sans text-lg md:text-xl font-extrabold uppercase tracking-wide">Isometric Room</h4>
                      </div>
                      <span className="text-zinc-300 font-mono text-base font-semibold mr-2">
                        {isRoom1Expanded ? '▲' : '▼'}
                      </span>
                    </button>
                    {isRoom1Expanded && (
                      <div className="p-8 border-t border-[#c5a880]/30 bg-[#0e0e0d]/30 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {activeExploration.images
                          .filter(img => img.folder === 'isometric_room')
                          .map((obj) => {
                            const globalIndex = activeExploration.images.findIndex(img => img.id === obj.id);
                            return (
                              <div key={obj.id} className="flex flex-col space-y-4">
                                <motion.div
                                  whileHover={{ scale: 1.015, y: -4 }}
                                  onClick={() => setSelectedImageIndex(globalIndex)}
                                  className="group relative aspect-video rounded-3xl overflow-hidden border border-[#c5a880]/15 bg-[#0e0e0d] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex items-center justify-center"
                                >
                                  {obj.type === 'video' ? (
                                    <video
                                      src={obj.src}
                                      autoPlay
                                      muted
                                      loop
                                      playsInline
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/scrarap-garden-loop.mp4";
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={obj.src}
                                      alt={obj.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      onError={(e) => {
                                        if (obj.src && e.target.src.endsWith('.jpg')) {
                                          e.target.src = obj.src.replace('.jpg', '.png');
                                        } else {
                                          e.target.onerror = null;
                                          e.target.src = `https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400`;
                                        }
                                      }}
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-mono text-xs md:text-sm tracking-wider uppercase font-semibold border border-white/20 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm">
                                      {obj.type === 'video' ? 'Play Animation ✦' : 'View Object ✦'}
                                    </span>
                                  </div>
                                </motion.div>
                                <div className="px-2 pt-1 text-left">
                                  <span className="text-white font-sans text-lg md:text-xl font-bold tracking-tight">{obj.title}</span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  {/* 3. Collapsible Nobita Bedroom */}
                  <div className="border border-[#c5a880]/30 bg-[#c5a880]/[0.01] rounded-3xl overflow-hidden mb-8 text-left">
                    <button 
                      onClick={() => setIsRoom2Expanded(!isRoom2Expanded)}
                      className="w-full flex items-center justify-between px-8 py-6 hover:bg-[#c5a880]/[0.03] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">📁</span>
                        <h4 className="text-white font-sans text-lg md:text-xl font-extrabold uppercase tracking-wide">Nobita Bedroom</h4>
                      </div>
                      <span className="text-zinc-300 font-mono text-base font-semibold mr-2">
                        {isRoom2Expanded ? '▲' : '▼'}
                      </span>
                    </button>
                    {isRoom2Expanded && (
                      <div className="p-8 border-t border-[#c5a880]/30 bg-[#0e0e0d]/30 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {activeExploration.images
                          .filter(img => img.folder === 'nobita_bedroom')
                          .map((obj) => {
                            const globalIndex = activeExploration.images.findIndex(img => img.id === obj.id);
                            return (
                              <div key={obj.id} className="flex flex-col space-y-4">
                                <motion.div
                                  whileHover={{ scale: 1.015, y: -4 }}
                                  onClick={() => setSelectedImageIndex(globalIndex)}
                                  className="group relative aspect-video rounded-3xl overflow-hidden border border-[#c5a880]/15 bg-[#0e0e0d] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 flex items-center justify-center"
                                >
                                  {obj.type === 'video' ? (
                                    <video
                                      src={obj.src}
                                      autoPlay
                                      muted
                                      loop
                                      playsInline
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/scrarap-garden-loop.mp4";
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={obj.src}
                                      alt={obj.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      onError={(e) => {
                                        if (obj.src && e.target.src.endsWith('.jpg')) {
                                          e.target.src = obj.src.replace('.jpg', '.png');
                                        } else {
                                          e.target.onerror = null;
                                          e.target.src = `https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400`;
                                        }
                                      }}
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-mono text-xs md:text-sm tracking-wider uppercase font-semibold border border-white/20 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm">
                                      {obj.type === 'video' ? 'Play Animation ✦' : 'View Object ✦'}
                                    </span>
                                  </div>
                                </motion.div>
                                <div className="px-2 pt-1 text-left">
                                  <span className="text-white font-sans text-lg md:text-xl font-bold tracking-tight">{obj.title}</span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            ) : (
              /* Standard Single Media Modal */
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
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FULLSCREEN LIGHTBOX FOR IMAGES ─── */}
      <AnimatePresence>
        {selectedImageIndex !== null && activeExploration && activeExploration.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition-all cursor-pointer hover:scale-105 z-[210]"
            >
              <X size={20} />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : activeExploration.images.length - 1));
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition-all cursor-pointer z-[210] font-bold text-lg"
            >
              ←
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev < activeExploration.images.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition-all cursor-pointer z-[210] font-bold text-lg"
            >
              →
            </button>

            {/* Main Lightbox Image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center relative select-none"
            >
              {activeExploration.images[selectedImageIndex].type === 'video' ? (
                <video
                  src={activeExploration.images[selectedImageIndex].src}
                  autoPlay
                  controls
                  loop
                  className="max-w-full max-h-[70vh] rounded-xl border border-white/10 shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/scrapgarden-loop.mp4";
                  }}
                />
              ) : (
                <img
                  src={activeExploration.images[selectedImageIndex].src}
                  alt={activeExploration.images[selectedImageIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                  onError={(e) => {
                    if (e.target.src.endsWith('.jpg')) {
                      e.target.src = activeExploration.images[selectedImageIndex].src.replace('.jpg', '.png');
                    } else {
                      e.target.onerror = null;
                      e.target.src = `https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800`;
                    }
                  }}
                />
              )}
              <div className="mt-4 text-center space-y-1">
                <h4 className="text-white font-sans text-base font-semibold">
                  {activeExploration.images[selectedImageIndex].title}
                </h4>
                <span className="text-zinc-500 font-mono text-xs tracking-wider uppercase block">
                  {activeExploration.images[selectedImageIndex].type} — Object {selectedImageIndex + 1} of {activeExploration.images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
