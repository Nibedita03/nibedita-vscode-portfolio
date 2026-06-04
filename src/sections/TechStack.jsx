import { motion } from 'framer-motion';

const designSkills = [
  "Figma",
  "After Effects",
  "Adobe Creative Suite",
  "Webflow",
  "Framer"
];

const devSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "p5.js"
];

const SkillItem = ({ name, index }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="flex items-center space-x-4 text-zinc-400 hover:text-white transition-colors duration-300 py-3.5 group cursor-default select-none"
    >
      {/* Elegant dot indicator that highlights with the warm bronze accent color on hover */}
      <span 
        className="w-2 h-2 rounded-full bg-zinc-850 group-hover:bg-[#c5a880] transition-all duration-300 group-hover:scale-125"
      />
      <span className="text-lg font-light tracking-wide font-sans">{name}</span>
    </motion.li>
  );
};

const TechStack = () => {
  return (
    <div className="pt-8 pb-16 relative w-full">
      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12 flex items-center space-x-4 text-white font-sans tracking-tight"
      >
        <span className="text-accent font-sans text-2xl">✦</span>
        <span>Tech Stack</span>
        <div className="h-px bg-white/5 flex-1 ml-4"></div>
      </motion.h2>

      {/* Infinite Scrolling Marquee Banner */}
      <div className="w-full overflow-hidden border-y border-white/5 py-4 mb-16 bg-white/[0.01] backdrop-blur-sm select-none rounded-2xl">
        <div className="animate-marquee flex gap-12 text-[10px] uppercase tracking-[0.25em] font-black text-zinc-400">
          <span>✦ UI/UX EXPERTISE</span>
          <span>✦ PRODUCT DESIGN</span>
          <span>✦ INTERACTION SYSTEMS</span>
          <span>✦ CREATIVE CODE</span>
          <span>✦ PHYSICAL COMPUTING</span>
          <span>✦ BRANDING & DESIGN</span>
          {/* Loop Duplicate */}
          <span>✦ UI/UX EXPERTISE</span>
          <span>✦ PRODUCT DESIGN</span>
          <span>✦ INTERACTION SYSTEMS</span>
          <span>✦ CREATIVE CODE</span>
          <span>✦ PHYSICAL COMPUTING</span>
          <span>✦ BRANDING & DESIGN</span>
        </div>
      </div>

      {/* 2-Column Clean Typographic List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 w-full px-2">
        {/* Design Column */}
        <div className="text-left">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-xs font-mono tracking-[0.25em] mb-6 border-b border-white/10 pb-3 uppercase font-bold"
          >
            Design
          </motion.h3>
          <ul className="divide-y divide-white/[0.03]">
            {designSkills.map((skill, i) => (
              <SkillItem key={skill} name={skill} index={i} />
            ))}
          </ul>
        </div>

        {/* Development Column */}
        <div className="text-left">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-xs font-mono tracking-[0.25em] mb-6 border-b border-white/10 pb-3 uppercase font-bold"
          >
            Development
          </motion.h3>
          <ul className="divide-y divide-white/[0.03]">
            {devSkills.map((skill, i) => (
              <SkillItem key={skill} name={skill} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
