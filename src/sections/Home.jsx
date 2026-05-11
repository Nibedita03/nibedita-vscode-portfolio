import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Terminal from '../components/Terminal';

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col justify-center relative w-full pt-16 pb-32"
    >
      <motion.div style={{ y: textY }} className="space-y-6 relative z-0 w-full max-w-3xl">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-vscode-accent font-mono text-lg"
        >
          const greeting = "Welcome to my world!";
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight font-sans flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4"
        >
          <span>Hi, I'm</span>
          <span className="text-vscode-accent font-normal" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.2em", lineHeight: "1" }}>Nibedita Behera</span>.
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-vscode-textDark"
        >
          UX/UI Designer
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg text-vscode-text max-w-2xl mt-6 leading-relaxed border-l-2 border-l-vscode-accent pl-6 py-2 bg-[#252526] shadow-md"
        >
          I'm a passionate UI/UX designer and front-end developer focused on clean, usable interfaces. As a user-centric designer, I focus on building well-structured, functional digital experiences where design decisions are driven by real user needs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex space-x-4 mb-16 pt-4"
        >
          <a href="#projects" className="px-8 py-3 bg-vscode-accent text-white rounded hover:bg-blue-600 transition-colors duration-300 font-mono">
            View Work()
          </a>
          <a href="https://drive.google.com/file/d/1kFg3vWveiIqvV6MMDfxyWoi_22V-NpgQ/view?usp=sharing" target="_blank" rel="noreferrer" className="px-8 py-3 bg-[#252526] border border-vscode-border text-white rounded hover:bg-vscode-hover transition-colors duration-300 font-mono">
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="w-full relative z-10"
        >
          <Terminal />
        </motion.div>
      </motion.div>

      {/* Decorative Parallax Code Background */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
        className="absolute right-[-10%] md:-right-24 top-20 md:top-10 text-[180px] md:text-[250px] font-mono text-white opacity-[0.015] select-none pointer-events-none leading-none"
      >
        {'{}'}
      </motion.div>
    </motion.div>
  );
};

export default Home;
