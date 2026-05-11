import { motion } from 'framer-motion';
import { Send, Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-8 relative flex flex-col min-h-[60vh] justify-between">
      <div>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-16 flex items-center space-x-4 text-white"
        >
          <span className="text-vscode-accent font-mono text-xl">05.</span>
          <span>Contact Me</span>
          <div className="h-px bg-vscode-border flex-1 ml-4"></div>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-vscode-textDark mb-4 italic font-mono text-sm">/* send-message.html */</div>
          
          <form className="minimal-card p-8 md:p-12 rounded-md shadow-lg flex flex-col space-y-6 font-sans relative border-t-4 border-t-vscode-accent">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Let's Work Together</h3>
              <p className="text-vscode-textDark text-sm">I'm currently available for freelance work or full-time roles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-vscode-textDark uppercase tracking-wider mb-2 font-mono">First Name *</label>
                <input 
                  type="text" 
                  className="w-full bg-[#1E1E1E] border border-vscode-border rounded p-3 text-white focus:outline-none focus:border-vscode-accent transition-all"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label className="block text-xs text-vscode-textDark uppercase tracking-wider mb-2 font-mono">Email Address *</label>
                <input 
                  type="email" 
                  className="w-full bg-[#1E1E1E] border border-vscode-border rounded p-3 text-white focus:outline-none focus:border-vscode-accent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-vscode-textDark uppercase tracking-wider mb-2 font-mono">Message *</label>
              <textarea 
                className="w-full bg-[#1E1E1E] border border-vscode-border rounded p-3 text-white focus:outline-none focus:border-vscode-accent transition-all h-32 resize-none"
                placeholder="Hello there..."
              ></textarea>
            </div>
            
            <button 
              type="button"
              className="flex items-center justify-center space-x-2 w-full py-4 bg-vscode-accent text-white rounded hover:bg-blue-600 transition-all duration-300 font-mono text-sm tracking-wider font-bold hover:scale-[1.02] active:scale-95"
            >
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer / Socials */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 pt-8 border-t border-vscode-border flex flex-col items-center justify-center text-vscode-textDark font-mono text-xs"
      >
        <div className="flex space-x-6 mb-6">
          <a href="#" className="hover:text-vscode-accent transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-[#0077b5] transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-[#1DA1F2] transition-colors"><Twitter size={20} /></a>
          <a href="mailto:nibedita.design@gmail.com" className="hover:text-[#FF5F56] transition-colors"><Mail size={20} /></a>
        </div>
        <p>Built with React & Tailwind CSS</p>
        <p className="mt-2">Inspired by Visual Studio Code. Designed by Nibedita Behera.</p>
      </motion.footer>
    </div>
  );
};

export default Contact;
