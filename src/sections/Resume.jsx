import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const Resume = () => {
  return (
    <div className="p-8 md:p-16 max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="minimal-card p-12 rounded-md text-center max-w-lg w-full shadow-lg relative overflow-hidden"
      >
        <div className="w-20 h-20 bg-[#1E1E1E] rounded-full flex items-center justify-center mx-auto mb-6 border border-vscode-border relative z-10">
          <FileText size={32} className="text-vscode-accent" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Resume.pdf</h2>
        <p className="text-vscode-textDark text-sm mb-8">142 KB • PDF Document</p>
        
        <div className="flex flex-col space-y-4 relative z-10">
          <a href="https://drive.google.com/file/d/1kFg3vWveiIqvV6MMDfxyWoi_22V-NpgQ/view?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 w-full py-4 bg-vscode-accent text-white rounded-md hover:bg-blue-600 transition-colors font-mono uppercase tracking-wider text-sm">
            <Download size={18} />
            <span>Download Resume</span>
          </a>
          
          <button className="flex items-center justify-center space-x-2 w-full py-4 bg-[#1E1E1E] border border-vscode-border text-white rounded-md hover:border-vscode-accent transition-colors font-mono text-sm uppercase tracking-wider">
            <FileText size={18} />
            <span>View in Browser</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
