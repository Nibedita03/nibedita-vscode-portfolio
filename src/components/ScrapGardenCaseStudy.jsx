import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Lightbulb, Wrench, Cpu, Layers, Sparkles, Code, Terminal as TermIcon, Play, RefreshCw, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Reusable Section Component
const Section = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
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

const ScrapGardenCaseStudy = ({ onClose }) => {
  // Navigation & Interactive States
  const [activeTab, setActiveTab] = useState("vision"); // vision, materials, schematic, fab
  const [simulatorMode, setSimulatorMode] = useState("simulator"); // 'simulator' or 'video'

  // Slideshow States
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Virtual Simulator States
  const [joystick, setJoystick] = useState({ x: 512, y: 512 });
  const [activeFlower, setActiveFlower] = useState(null); // 'up', 'down', 'left', 'right', or null
  const [serialLogs, setSerialLogs] = useState([
    "--- Noogin Serial Monitor initialized at 9600 baud ---",
    "Ready for user input..."
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isCompiled, setIsCompiled] = useState(false);

  // Triggering Joystick Movement
  const handleJoystickMove = (dir) => {
    let newX = 512;
    let newY = 512;
    let logMsg = "";

    if (dir === 'up') {
      newX = 512; newY = 1023;
      setActiveFlower('up');
      logMsg = "[SERIAL] Joystick Up | Pin 9 HIGH -> LED Cluster 1 (Street Lamp Bud) Glowing!";
    } else if (dir === 'down') {
      newX = 512; newY = 0;
      setActiveFlower('down');
      logMsg = "[SERIAL] Joystick Down | Pin 10 HIGH -> LED Cluster 2 (Garment Bloom) Glowing!";
    } else if (dir === 'left') {
      newX = 0; newY = 512;
      setActiveFlower('left');
      logMsg = "[SERIAL] Joystick Left | Pin 11 HIGH -> LED Cluster 3 (Rebar Spiral) Glowing!";
    } else if (dir === 'right') {
      newX = 1023; newY = 512;
      setActiveFlower('right');
      logMsg = "[SERIAL] Joystick Right | Pin 12 HIGH -> LED Cluster 4 (Coiled Weave) Glowing!";
    } else {
      setActiveFlower(null);
      logMsg = "[SERIAL] Joystick Centered | Pin 9-12 LOW -> All clusters dormant.";
    }

    setJoystick({ x: newX, y: newY });
    setSerialLogs(prev => [logMsg, ...prev.slice(0, 10)]);
  };

  // Compile Code Simulation
  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setIsCompiled(true);
      setSerialLogs(prev => [
        "[SYSTEM] Sketch uploaded successfully. Memory usage: 9% of flash space.",
        ...prev
      ]);
    }, 1500);
  };

  // Lock body scroll when modal is open
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
        <div className="text-zinc-500 text-sm font-semibold tracking-wider uppercase hidden md:block">Scrap Garden / Case Study</div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">

        {/* Hero Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <span className="font-mono text-vscode-accent text-sm mb-4 block">03. Featured Case Study</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-sans tracking-tight mb-8">
            Scrap Garden
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 p-8 bg-[#252526]/50 border border-vscode-border rounded-xl font-sans text-sm shadow-xl relative overflow-hidden">

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-vscode-textDark uppercase tracking-wider block font-bold">Role</span>
              <span className="text-white font-semibold leading-relaxed block">Concept, Interaction Design, Arduino Programming</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-vscode-textDark uppercase tracking-wider block font-bold">Team</span>
              <span className="text-white font-semibold leading-relaxed block">Nibedita Behera, Vrisha, Sahana, Tanya</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-vscode-textDark uppercase tracking-wider block font-bold">Timeline</span>
              <span className="text-white font-semibold leading-relaxed block">2 weeks</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-vscode-textDark uppercase tracking-wider block font-bold">Context</span>
              <span className="text-white font-semibold leading-relaxed block">Art for the 99%, Srishti Manipal</span>
            </div>

            <div className="col-span-2 md:col-span-4 pt-4 border-t border-vscode-border/30 flex items-center gap-2">
              <span className="text-[10px] font-mono text-vscode-textDark uppercase tracking-wider font-bold">Status:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#28C840]/10 border border-[#28C840]/30 text-[#28C840] font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-pulse"></span>
                Installed
              </span>
            </div>
          </div>

          {/* 5-Screen Stacked Hero for Scrap Garden */}
          <div className="relative h-[550px] md:h-[720px] flex items-center justify-center mb-8 overflow-hidden">
            {/* Background glow */}
            <div className="absolute w-[600px] h-[500px] bg-vscode-accent/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Screen 1 - Far left, deepest behind: Junkyard Search */}
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ rotate: -8, x: -30, scale: 1.02 }}
              className="absolute w-[160px] md:w-[230px] rounded-[24px] overflow-hidden border-[5px] border-[#3C3C3C] shadow-[0_25px_50px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 z-[5]"
              style={{ left: 'calc(50% - 370px)', top: '12%', rotate: -14 }}
            >
              <img src="/process-2.jpg" alt="Junkyard Archaeology" className="w-full h-auto object-cover aspect-[9/16]" />
            </motion.div>

            {/* Screen 2 - Left, behind center: Streetlight Dome */}
            <motion.div 
              initial={{ opacity: 0, x: -40, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: -7 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ rotate: -3, x: -15, scale: 1.02 }}
              className="absolute w-[180px] md:w-[260px] rounded-[26px] overflow-hidden border-[6px] border-[#3C3C3C] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 z-10"
              style={{ left: 'calc(50% - 260px)', top: '6%' }}
            >
              <img src="/process-3.jpg" alt="Streetlight Dome" className="w-full h-auto object-cover aspect-[9/16]" />
            </motion.div>

            {/* Screen 3 - Center, front and biggest: Courtyard Cover */}
            <motion.div 
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="relative w-[220px] md:w-[300px] rounded-[32px] overflow-hidden border-[7px] border-[#3C3C3C] shadow-[0_40px_80px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-500 z-30"
            >
              <img src="/scrapgarden-cover.jpg" alt="Finished Installation" className="w-full h-auto object-cover aspect-[9/16]" />
            </motion.div>

            {/* Screen 4 - Right, behind center: Circuit Wiring */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 7 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              whileHover={{ rotate: 3, x: 15, scale: 1.02 }}
              className="absolute w-[180px] md:w-[260px] rounded-[26px] overflow-hidden border-[6px] border-[#3C3C3C] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 z-10"
              style={{ right: 'calc(50% - 260px)', top: '6%' }}
            >
              <img src="/process-1.jpg" alt="Arduino Circuit Wiring" className="w-full h-auto object-cover aspect-[9/16]" />
            </motion.div>

            {/* Screen 5 - Far right, deepest behind: Textile Fabrication */}
            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ rotate: 8, x: 30, scale: 1.02 }}
              className="absolute w-[160px] md:w-[230px] rounded-[24px] overflow-hidden border-[5px] border-[#3C3C3C] shadow-[0_25px_50px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 z-[5]"
              style={{ right: 'calc(50% - 370px)', top: '12%', rotate: 14 }}
            >
              <img src="/process-5.jpg" alt="Textile Fabrication" className="w-full h-auto object-cover aspect-[9/16]" />
            </motion.div>
          </div>

          <p className="text-xl md:text-2xl text-vscode-text font-sans font-light leading-relaxed max-w-4xl">
            How do you construct a responsive public art sculpture using exclusively junk materials? Scrap Garden is an interactive physical art installation built from salvaged street lamps, textile scraps, and welded rebar rods, controlled by a tangible analog joystick.
          </p>

          {/* The Brief Section */}
          <div className="mt-16 mb-16 relative">
            <div className="absolute -left-8 md:-left-12 top-0 h-full w-px bg-gradient-to-b from-vscode-accent/50 to-transparent hidden md:block"></div>
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-white mb-6">The Brief</h2>
            <div className="p-6 md:p-8 rounded-2xl bg-vscode-accent/5 border border-vscode-accent/15 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-vscode-accent" />
              <p className="text-lg md:text-xl font-sans text-vscode-text font-normal leading-relaxed">
                <strong>Art for the 99%</strong>, a course at Srishti Manipal asking us to create public art from entirely discarded and found materials. The only condition: make something anyone could walk up to and experience without being told how.
              </p>
            </div>
          </div>

          {/* Big Featured Physical Working Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full relative rounded-3xl overflow-hidden border border-vscode-border bg-[#252526] p-4 shadow-2xl mt-12 mb-24 group"
          >
            <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
              <span className="px-3.5 py-1 bg-black/60 backdrop-blur-md border border-vscode-border/50 text-white font-mono text-xs rounded-full uppercase tracking-wider font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
                Physical Exhibition Working Footage
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[580px] bg-[#1E1E1E]">
              <video
                src="/scrapgarden-loop.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 px-2 flex justify-between items-center text-xs font-mono text-vscode-textDark">
              <span>📽️ physical_installation_working.mp4</span>
              <span className="hidden sm:inline">Tactile light diffusion via copper weaving & scrap garment fabric</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Physical Fabrication & Materials Journey */}
        <Section title="Physical Fabrication & Materials Journey" icon={Layers}>
          <div className="space-y-16 w-full">

            {/* 1. College Junkyard Search */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#252526] border border-vscode-border rounded-3xl p-6 md:p-8 shadow-2xl items-center relative overflow-hidden">


              <div className="lg:col-span-5 space-y-6">
                <span className="px-3.5 py-1 bg-purple-500/15 border border-purple-500/20 text-purple-400 font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Step 01: Junk Archaeology</span>
                <h3 className="text-white text-3xl font-bold font-sans tracking-tight leading-none">College Junkyard Search</h3>
                <p className="text-vscode-text text-base leading-relaxed font-sans">
                  We started by just walking around campus looking for anything useful. The scrapyard behind the design block had everything. Broken lamp posts, bent pipes, coils of wire, rusted frames. Nothing was bought. Everything came from there.
                </p>
                <div className="p-4 rounded-xl bg-[#1E1E1E] border border-vscode-border/50 font-mono text-xs text-purple-400 leading-relaxed">
                  The brief said: only discarded and found materials. So we took that literally.
                </div>
              </div>

              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-vscode-border bg-[#1E1E1E] shadow-xl group h-[420px] flex items-center justify-center">
                <img
                  src="/process-2.jpg"
                  alt="Junkyard Sourcing"
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-vscode-border/50 text-xs font-mono text-purple-400 rounded-lg">
                  🗑️ 1. The Campus Scrap Junkyard
                </div>
              </div>
            </div>

            {/* 2. The Streetlight Base */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#252526] border border-vscode-border rounded-3xl p-6 md:p-8 shadow-2xl items-center relative overflow-hidden">


              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-vscode-border bg-[#1E1E1E] shadow-xl group h-[420px] flex items-center justify-center">
                <img
                  src="/process-3.jpg"
                  alt="Streetlight Base"
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-vscode-border/50 text-xs font-mono text-vscode-accent rounded-lg">
                  💡 2. Original Streetlight Used as Base
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <span className="px-3.5 py-1 bg-vscode-accent/15 border border-vscode-accent/20 text-vscode-accent font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Step 02: Structural Core</span>
                <h3 className="text-white text-3xl font-bold font-sans tracking-tight leading-none">The Streetlight Base</h3>
                <p className="text-vscode-text text-base leading-relaxed font-sans">
                  We found an old campus streetlight in the junkyard and realised its dome shape was perfect for what we had in mind. We pulled it apart, cleaned it up, and used it as the base of the flower. The light sits inside the dome and shines through the petals we added later.
                </p>
                <div className="space-y-2 font-mono text-xs text-vscode-accent">
                  <span className="block">✓ Salvaged streetlight dome</span>
                  <span className="block">✓ LED strips placed inside for warm glow</span>
                </div>
              </div>
            </div>

            {/* 3. Model Circuitry & Wiring */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#252526] border border-vscode-border rounded-3xl p-6 md:p-8 shadow-2xl items-center relative overflow-hidden">


              <div className="lg:col-span-5 space-y-6">
                <span className="px-3.5 py-1 bg-[#4ADE80]/15 border border-[#4ADE80]/20 text-[#4ADE80] font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Step 03: Interactive System</span>
                <h3 className="text-white text-3xl font-bold font-sans tracking-tight leading-none">Model Circuitry & Wiring</h3>
                <p className="text-vscode-text text-base leading-relaxed font-sans">
                  This is where we figured out how the joystick would actually control the lights. We used an Arduino and mapped the joystick direction to different LED clusters. Tilt one way and one flower lights up, tilt another and a different one does. It took a lot of testing to get it right.
                </p>
                <div className="p-4 rounded-xl bg-[#1E1E1E] border border-vscode-border/50 font-mono text-xs text-vscode-textDark leading-relaxed">
                  Analog joystick → Arduino Uno → relay switch → LED strip. Simple in theory, messy in practice.
                </div>
              </div>

              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-vscode-border bg-[#1E1E1E] shadow-xl group h-[420px] flex items-center justify-center">
                <img
                  src="/process-1.jpg"
                  alt="Model Wiring"
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-vscode-border/50 text-xs font-mono text-[#4ADE80] rounded-lg">
                  🔌 3. Interactive Circuitry & Wiring Bench
                </div>
              </div>
            </div>

            {/* 4. Installing Lamps on Site (Before Petals) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#252526] border border-vscode-border rounded-3xl p-6 md:p-8 shadow-2xl items-center relative overflow-hidden">


              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-vscode-border bg-[#1E1E1E] shadow-xl group h-[420px] flex items-center justify-center">
                <img
                  src="/process-4.jpg"
                  alt="Installing Lamps Spot"
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-vscode-border/50 text-xs font-mono text-[#4ADE80] rounded-lg">
                  📸 4. Installing Lamps in Courtyard (Before Petals)
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <span className="px-3.5 py-1 bg-vscode-accent/15 border border-vscode-accent/20 text-vscode-accent font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Step 04: Site Installation</span>
                <h3 className="text-white text-3xl font-bold font-sans tracking-tight leading-none">Putting It Up</h3>
                <p className="text-vscode-text text-base leading-relaxed font-sans">
                  We brought everything to the courtyard and started putting it together on site. The lamps went up first, before any of the fabric was added, so we could check if the structure was stable and the wiring made sense in the actual space.
                </p>
                <div className="space-y-3 font-sans text-sm border-t border-vscode-border/30 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="text-vscode-accent text-lg">⚒️</span>
                    <span className="text-vscode-text">Anchoring the steel stems and checking alignment.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-vscode-accent text-lg">⚙️</span>
                    <span className="text-vscode-text">Running the wiring through before petals went on.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Manual Fabric Fabrication */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#252526] border border-vscode-border rounded-3xl p-6 md:p-8 shadow-2xl items-center relative overflow-hidden">


              <div className="lg:col-span-5 space-y-6">
                <span className="px-3.5 py-1 bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Step 05: Collaborative Build</span>
                <h3 className="text-white text-3xl font-bold font-sans tracking-tight leading-none">Making the Petals</h3>
                <p className="text-vscode-text text-base leading-relaxed font-sans">
                  The petals were made from scrap fabric, mostly bits from the textile rooms. We cut them into petal shapes, stretched them over bent wire frames, and stitched them together. When the lights come on inside, the fabric glows and diffuses the light really nicely.
                </p>
                <p className="text-vscode-textDark text-sm font-sans leading-relaxed">
                  This part was hands-on and a bit chaotic. A lot of pinning, cutting, redoing. But that's kind of what made it fun.
                </p>
              </div>

              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-vscode-border bg-[#1E1E1E] shadow-xl group h-[420px] flex items-center justify-center">
                <img
                  src="/process-5.jpg"
                  alt="Fabrication Craft"
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-vscode-border/50 text-xs font-mono text-yellow-400 rounded-lg">
                  🧵 5. Manual Textile Fabrication Process
                </div>
              </div>
            </div>

          </div>
        </Section>


        {/* BTS & Process Video */}
        <Section title="Watch It Come Together" icon={Play}>
          <div className="w-full bg-[#252526] border border-vscode-border rounded-3xl overflow-hidden shadow-2xl relative">

            <div className="p-6 md:p-8 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="px-3.5 py-1 bg-vscode-accent/15 border border-vscode-accent/20 text-vscode-accent font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Full BTS + Process</span>
                <p className="text-vscode-textDark text-sm font-sans leading-relaxed max-w-lg">
                  The whole thing from start to finish: finding the materials, building the structure, wiring it up, and finally seeing it light up in the courtyard.
                </p>
              </div>
              <span className="text-vscode-textDark font-mono text-[10px] whitespace-nowrap">process-video.mp4</span>
            </div>

            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <video
                src="/process-video.mp4"
                preload="metadata"
                controls
                className="w-full rounded-2xl border border-vscode-border/50 bg-[#1E1E1E]"
                style={{ maxHeight: '620px' }}
              />
            </div>
          </div>
        </Section>

        {/* People Using It */}
        <Section title="Then People Touched It" icon={Sparkles}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full items-center">
            {/* Text Left */}
            <div className="lg:col-span-5 space-y-5">
              <p className="text-vscode-text text-lg leading-relaxed font-sans">
                Once it was installed, people just walked up to it. There's a joystick in the middle. No label, no sign, nothing telling you what it does.
              </p>
              <p className="text-vscode-text text-lg leading-relaxed font-sans">
                You pick it up and push it. One direction, a flower glows. Push another way, a different one responds. That's the whole thing.
              </p>
              <p className="text-vscode-text text-lg leading-relaxed font-sans">
                What I noticed was, nobody asked how it worked. They just tried it. Some people were slow and deliberate, testing each direction. Some went straight to moving it in circles. A few handed it to someone else mid-interaction.
              </p>
              <p className="text-vscode-textDark text-base leading-relaxed font-sans">
                That was the intention. The joystick isn't labelled. The flowers aren't numbered. There's no screen, no instructions. The only way in is to touch it, and the installation does the rest.
              </p>
            </div>

            {/* Image Right - Auto Cycling */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-vscode-border bg-[#1E1E1E] shadow-xl h-[500px] flex items-center justify-center">
              {['/sg-user-1.jpg', '/sg-user-2.jpg', '/sg-user-3.jpg'].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`People interacting with the installation ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${i === activeImg ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImg ? 'bg-vscode-accent w-6' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Reflections */}
        <Section title="Reflection" icon={Sparkles}>
          <div className="w-full p-6 bg-[#252526]/20 border border-vscode-border/40 rounded-xl relative overflow-hidden shadow-lg flex gap-6 items-stretch">
            {/* Left Accent Bar with Gradient */}
            <div className="w-1 bg-gradient-to-b from-vscode-accent via-vscode-accent/50 to-transparent rounded-full hidden md:block shrink-0"></div>
            
            {/* Reflection Content */}
            <div className="flex-1 space-y-4 font-sans">
              <div className="flex items-center space-x-3">
                <div className="px-2 py-0.5 rounded bg-vscode-accent/10 border border-vscode-accent/20 text-[9px] font-mono text-vscode-accent uppercase tracking-wider font-bold">
                  Takeaway
                </div>
                <span className="text-[11px] font-mono text-vscode-textDark">scrap_garden_reflection.md</span>
              </div>
              
              <div className="space-y-4 text-vscode-text text-sm md:text-[15px] leading-relaxed">
                <p className="text-white/95">
                  The scrap garden changed the way I looked at waste. Junk pieces slowly started feeling like <span className="text-white font-medium border-b border-vscode-accent/30 pb-0.5">materials with another life hidden inside them</span>. Through this project, I wanted to show that <span className="text-vscode-accent font-semibold">art is not only for galleries or rich people</span>. Art can be made from everyday discarded objects and still create curiosity, interaction, and emotion.
                </p>
                
                <p className="text-vscode-text/90">
                  The hardest part was realizing that simple was enough. I kept wanting to add more, but eventually understood that <span className="text-vscode-accent font-semibold">restraint itself became part of the design</span>. Watching someone move the joystick for the first time and seeing a flower light up made the project feel complete. It reminded me that interactive art <span className="text-white font-medium">does not need expensive materials; it just needs connection</span>.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}

        <div className="mt-32 pt-8 border-t border-vscode-border flex justify-between items-center text-vscode-textDark font-mono text-sm">
          <span>End of Case Study</span>
          <button onClick={onClose} className="text-vscode-accent hover:text-white transition-colors">Return to Portfolio</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrapGardenCaseStudy;
