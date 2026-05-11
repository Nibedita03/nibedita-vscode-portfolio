import { motion } from 'framer-motion';
import { LayoutTemplate, Code2, MonitorSmartphone } from 'lucide-react';

const services = [
  {
    title: "UI/UX Design",
    icon: <LayoutTemplate className="text-vscode-accent" size={32} />,
    skills: [
      "Wireframes & mockups",
      "Interactive prototypes",
      "Design systems & style guides",
      "User flows and Task journeys",
      "Mobile-first & responsive design",
      "UX research & Heuristic analysis"
    ]
  },
  {
    title: "Front-End Dev",
    icon: <Code2 className="text-[#4ADE80]" size={32} />,
    skills: [
      "HTML5 / CSS3 / JavaScript",
      "Tailwind CSS / Bootstrap",
      "Web animations & transitions",
      "Responsive layout (Flexbox & Grid)",
      "React.js integration",
      "Cross-browser compatibility"
    ]
  },
  {
    title: "Design to Code",
    icon: <MonitorSmartphone className="text-[#FFBD2E]" size={32} />,
    skills: [
      "Framer development",
      "Clean, scalable, maintainable code",
      "Mobile & tablet optimization",
      "Asset optimization for performance"
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
        className="text-3xl font-bold mb-16 flex items-center space-x-4 text-white font-sans"
      >
        <span className="text-vscode-accent font-mono text-xl">03.</span>
        <span>What I Do</span>
        <div className="h-px bg-vscode-border flex-1 ml-4"></div>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative"
          >
            {/* Minimal floating card */}
            <div className="h-full minimal-card p-8 rounded-md border border-vscode-border hover:border-vscode-accent transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(0,122,204,0.1)] flex flex-col bg-[#1E1E1E] z-10 relative">
              <div className="mb-8 p-4 bg-[#252526] rounded-full w-max border border-vscode-border group-hover:bg-vscode-accent/10 transition-colors">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6 font-sans tracking-tight">
                {service.title}
              </h3>
              
              <ul className="space-y-4 flex-1">
                {service.skills.map((skill, i) => (
                  <li key={i} className="flex items-start text-vscode-textDark text-sm group-hover:text-vscode-text transition-colors duration-300">
                    <span className="text-vscode-border group-hover:text-vscode-accent mr-3 font-mono transition-colors duration-300">▹</span>
                    <span className="font-sans leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Subtle drop shadow block behind it for depth */}
            <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-vscode-border rounded-md -z-10 group-hover:bg-vscode-accent/50 transition-colors duration-300"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatIDo;
