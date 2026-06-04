import { motion } from 'framer-motion';
import { Layers, Wand2, Compass } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const services = [
  {
    title: "Interaction Design",
    icon: <Layers className="text-cyan-400" size={26} />,
    glow: "hover:border-cyan-500/30 hover:shadow-cyan-500/5",
    skills: [
      "User Research & Journey Mapping",
      "Figma Prototyping & Style Libraries",
      "Interactive Interface Mockups",
      "Heuristic Product Evaluations",
      "Mobile-First Responsive Layouts"
    ]
  },
  {
    title: "Creative Technology",
    icon: <Wand2 className="text-pink-400" size={26} />,
    glow: "hover:border-pink-500/30 hover:shadow-pink-500/5",
    skills: [
      "Generative Canvas Visuals",
      "Web Audio API Sound Synth",
      "AI API Integrations & Prompts",
      "React.js & Tailwind Front-Ends",
      "Framer Motion Microinteractions"
    ]
  },
  {
    title: "Spatial & Physical",
    icon: <Compass className="text-yellow-400" size={26} />,
    glow: "hover:border-yellow-500/30 hover:shadow-yellow-500/5",
    skills: [
      "Arduino & Sensor Configurations",
      "Installation Space Prototyping",
      "Blender 3D Modeling & Rendering",
      "Geospatial Visual Mapping",
      "Tangible Device Interaction"
    ]
  }
];

const WhatIDo = () => {
  return (
    <div className="pt-8 pb-16 relative">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-16 flex items-center space-x-4 text-white font-sans tracking-tight"
      >
        <span className="text-accent font-sans text-2xl">✦</span>
        <span>What I Do</span>
        <div className="h-px bg-white/5 flex-1 ml-4"></div>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <TiltCard className="h-full">
              <div className={`group h-full p-8 bento-panel border border-white/5 transition-all duration-500 relative flex flex-col justify-between ${service.glow}`}>
                <div>
                  <div className="mb-6 p-4 bg-white/5 rounded-2xl w-max border border-white/5 group-hover:bg-white/10 transition-colors">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-6 font-sans tracking-tight">
                    {service.title}
                  </h3>
                  
                  <ul className="space-y-4 flex-1">
                    {service.skills.map((skill, i) => (
                      <li key={i} className="flex items-start text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors duration-300">
                        <span className="text-accent mr-3 font-sans">✦</span>
                        <span className="font-sans leading-relaxed">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatIDo;
