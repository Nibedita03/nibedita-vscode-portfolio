import { motion } from 'framer-motion';
import { PenTool, Code2, Wrench } from 'lucide-react';

const techGroups = [
  {
    category: "Design",
    icon: <PenTool className="text-[#FFBD2E] mb-4" size={24} />,
    skills: ["Figma", "Framer", "Adobe XD", "Adobe Photoshop", "Adobe Illustrator", "Adobe AfterEffects"]
  },
  {
    category: "Development",
    icon: <Code2 className="text-vscode-accent mb-4" size={24} />,
    skills: ["HTML5 / CSS3", "JavaScript", "React.js", "Tailwind CSS", "Python"]
  },
  {
    category: "Tools & Others",
    icon: <Wrench className="text-[#4ADE80] mb-4" size={24} />,
    skills: ["Git & GitHub", "Notion", "Arduino IDE", "Responsive Design", "Wireframing", "Prototyping"]
  }
];

const TechStack = () => {
  return (
    <div className="pt-8 pb-16 relative">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-16 flex items-center space-x-4 text-white font-sans"
      >
        <span className="text-vscode-accent font-mono text-xl">04.</span>
        <span>My Tech Stack</span>
        <div className="h-px bg-vscode-border flex-1 ml-4"></div>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techGroups.map((group, i) => (
          <motion.div 
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col minimal-card p-8 rounded-md border border-vscode-border bg-[#1E1E1E] transition-all duration-300 hover:border-vscode-accent/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            {group.icon}
            <h4 className="font-bold text-white font-sans text-xl mb-6 border-b border-vscode-border pb-4">{group.category}</h4>
            <div className="flex flex-wrap gap-3 mt-2">
              {group.skills.map((skill, index) => (
                <motion.span 
                  key={skill} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                  className="px-3 py-1.5 bg-[#252526] border border-vscode-border rounded text-sm text-vscode-text font-mono hover:text-white hover:border-vscode-accent cursor-default shadow-sm hover:scale-110 hover:bg-[#2A2D2E] hover:-translate-y-1 transition-all duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
