import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Loader2, ArrowUpRight, FolderGit2 } from 'lucide-react';
import NooginCaseStudy from '../components/NooginCaseStudy';
import ScrapGardenCaseStudy from '../components/ScrapGardenCaseStudy';

const projects = [
  {
    id: 1,
    title: "Noogin nooks",
    description: "Transforming one-size-fits-all education into a personalized learning experience tailored to how each student learns best.",
    tech: ["Product Design", "Personalization", "Ed Tech"],
    image: "/noogin-cover.jpg",
    link: "noogin"
  },
  {
    id: 2,
    title: "Rydr",
    description: "Designing a student-friendly mobility solution to simplify commuting across large college campuses.",
    tech: ["Product Design", "Campus Mobility", "Usability"],
    image: "",
    link: "#"
  },
  {
    id: 3,
    title: "Scrap Garden",
    description: "Creating a sustainable, interactive installation that transforms scrap materials into a responsive garden experience.",
    tech: ["Spatial Experience", "Arduino", "Craft"],
    image: "",
    link: "scrap-garden"
  }
];

const explorationProjects = [
  { id: 4, title: "Smart Vision AI System", description: "Terminal based AI checking tool. Built a seamless interface for checking real-time vision processing.", tech: ["Python", "TensorFlow"], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400" },
  { id: 5, title: "Physical Computing", description: "Hardware and software integration. Developed robust physical interfaces capable of handling complex inputs.", tech: ["Arduino", "C++"], image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400" },
  { id: 6, title: "Blender", description: "3D Modeling and rendering. Automated quality checks to enforce strict rules across 3D scenes.", tech: ["3D Design", "Render"], image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400" },
  { id: 7, title: "Geospatial Visualisation", description: "Data mapping without generic tools. Explored the limits by creating detailed, responsive spatial graphics.", tech: ["GIS", "Mapping"], image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=400" }
];

const ProjectCard = ({ project, index, onRun }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col md:flex-row items-center gap-8 mb-32 last:mb-0"
    >
      {/* Image Side with Parallax ONLY (no pop) */}
      <div className={`w-full md:w-3/5 relative overflow-hidden rounded-md border border-vscode-border bg-[#e8e0d4] aspect-[4/3] shadow-lg flex items-center justify-center ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
        {project.image ? (
          <motion.img 
            style={{ y: imageY }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-vscode-textDark/40">
            <span className="font-mono text-4xl mb-2">{'<Image />'}</span>
            <span className="font-sans text-sm">Project Placeholder</span>
          </div>
        )}
        <div className="absolute inset-0 border border-black/20 rounded-md pointer-events-none" />
      </div>

      {/* Content Side: Comes from back to front */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, z: -100 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        className={`w-full md:w-2/5 flex flex-col ${index % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} relative z-20`}
      >
        <span className="font-mono text-vscode-accent text-sm mb-2">Featured Project</span>
        <h3 className="text-3xl font-bold text-white mb-6 font-sans">
          {project.title}
        </h3>
        
        <div className={`minimal-card p-6 rounded-md mb-6 shadow-2xl w-full md:w-[120%] ${index % 2 !== 0 ? '' : 'md:-ml-[20%]'} backdrop-blur-md bg-[#252526]/90 border-vscode-border`}>
          <p className="text-vscode-text leading-relaxed font-sans text-base">
            {project.description}
          </p>
        </div>

        <ul className={`flex flex-wrap gap-3 font-mono text-xs text-vscode-textDark mb-6 ${index % 2 !== 0 ? 'justify-start' : 'md:justify-end'}`}>
          {project.tech.map((t, i) => (
            <li key={i} className="px-3 py-1 rounded-full border border-vscode-border bg-[#1E1E1E] text-vscode-text">{t}</li>
          ))}
        </ul>

        <div className="flex space-x-4">
          <button 
            onClick={() => onRun(project.link)}
            className="flex items-center space-x-2 px-6 py-2 bg-[#252526] border border-vscode-border text-white rounded hover:bg-vscode-hover hover:text-vscode-accent transition-colors font-mono"
          >
            <Play size={16} />
            <span>View Case Study</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [hoveredExploration, setHoveredExploration] = useState(null);
  const [isNooginCaseStudyOpen, setIsNooginCaseStudyOpen] = useState(false);
  const [isScrapGardenCaseStudyOpen, setIsScrapGardenCaseStudyOpen] = useState(false);

  const handleRun = (link) => {
    setLoading(true);
    setLoadingText("loading case study...");
    
    setTimeout(() => {
      setLoadingText("rendering...");
      setTimeout(() => {
        setLoading(false);
        if (link === 'noogin') {
          setIsNooginCaseStudyOpen(true);
        } else if (link === 'scrap-garden') {
          setIsScrapGardenCaseStudyOpen(true);
        } else {
          window.open(link, '_blank');
        }
      }, 800);
    }, 800);
  };

  return (
    <div className="pt-8 pb-16 relative h-full bg-[#1E1E1E] z-10">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1E1E1E]/90 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center p-8 bg-[#252526] rounded-md border border-vscode-border shadow-2xl">
              <Loader2 className="animate-spin text-vscode-accent mb-4" size={40} />
              <p className="font-mono text-sm text-[#4ADE80] animate-pulse">{loadingText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-20 flex items-center space-x-4 text-white font-sans"
      >
        <span className="text-vscode-accent font-mono text-xl">01.</span>
        <span>Featured Work</span>
        <div className="h-px bg-vscode-border flex-1 ml-4"></div>
      </motion.h2>

      <div className="flex flex-col mb-40">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} onRun={handleRun} />
        ))}
      </div>

      {/* Sleek List Layout for Explorations */}
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12 flex items-center space-x-4 text-white font-sans"
      >
        <span className="text-vscode-textDark font-mono text-xl">/*</span>
        <span>Explorations</span>
        <span className="text-vscode-textDark font-mono text-xl">*/</span>
        <div className="h-px bg-vscode-border flex-1 ml-4"></div>
      </motion.h2>

      <div className="flex flex-col border-t border-vscode-border">
        {explorationProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setHoveredExploration(project.id)}
            onMouseLeave={() => setHoveredExploration(null)}
            className="group border-b border-vscode-border py-8 px-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-[#252526]/50 transition-colors cursor-pointer relative overflow-hidden"
          >
            {/* Hover Background Slide */}
            <motion.div 
              className="absolute inset-0 bg-vscode-accent/5 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredExploration === project.id ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            <div className="relative z-10 flex-1 md:pr-12">
              <h4 className="text-2xl text-white font-bold mb-3 font-sans group-hover:text-vscode-accent transition-colors flex items-center">
                <FolderGit2 className="mr-3 text-vscode-accent" size={24} />
                {project.title}
                <ArrowUpRight size={20} className="ml-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </h4>
              
              <motion.div 
                initial={false}
                animate={{ height: hoveredExploration === project.id ? 'auto' : '0px', opacity: hoveredExploration === project.id ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6 mt-2 mb-6">
                  <p className="text-vscode-text text-base font-sans max-w-2xl flex-1">
                    {project.description}
                  </p>
                  {project.image && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-full md:w-80 md:h-48 h-32 rounded bg-[#1E1E1E] border border-vscode-border overflow-hidden shrink-0 mt-4 md:mt-0 shadow-2xl"
                    >
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isNooginCaseStudyOpen && (
          <NooginCaseStudy onClose={() => setIsNooginCaseStudyOpen(false)} />
        )}
        {isScrapGardenCaseStudyOpen && (
          <ScrapGardenCaseStudy onClose={() => setIsScrapGardenCaseStudyOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
