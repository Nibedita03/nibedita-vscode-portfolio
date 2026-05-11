import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Linkedin, Twitter, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        // Optional: Reset back to idle after a few seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-8 relative flex flex-col min-h-[60vh] justify-between">
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-16 flex items-center space-x-4 text-white font-sans"
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

          <form
            action="https://formspree.io/f/mykoljld"
            method="POST"
            onSubmit={handleSubmit}
            className="minimal-card p-8 md:p-12 rounded-md shadow-lg flex flex-col space-y-6 font-sans relative border-t-4 border-t-vscode-accent"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Let's Work Together</h3>
              <p className="text-vscode-textDark text-sm">I'm currently available for freelance work or full-time roles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-vscode-textDark uppercase tracking-wider mb-2 font-mono">First Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-[#1E1E1E] border border-vscode-border rounded p-3 text-white focus:outline-none focus:border-vscode-accent transition-all"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-xs text-vscode-textDark uppercase tracking-wider mb-2 font-mono">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[#1E1E1E] border border-vscode-border rounded p-3 text-white focus:outline-none focus:border-vscode-accent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-vscode-textDark uppercase tracking-wider mb-2 font-mono">Message *</label>
              <textarea
                name="message"
                required
                className="w-full bg-[#1E1E1E] border border-vscode-border rounded p-3 text-white focus:outline-none focus:border-vscode-accent transition-all h-32 resize-none"
                placeholder="Hello there..."
              ></textarea>
            </div>

            {status === 'success' ? (
              <div className="flex items-center justify-center space-x-2 w-full py-4 bg-green-500/20 text-green-400 border border-green-500/50 rounded font-mono text-sm tracking-wider font-bold">
                <CheckCircle size={16} />
                <span>Message Sent Successfully!</span>
              </div>
            ) : status === 'error' ? (
              <div className="flex items-center justify-center space-x-2 w-full py-4 bg-red-500/20 text-red-400 border border-red-500/50 rounded font-mono text-sm tracking-wider font-bold">
                <AlertCircle size={16} />
                <span>Oops! Something went wrong.</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`flex items-center justify-center space-x-2 w-full py-4 bg-vscode-accent text-white rounded transition-all duration-300 font-mono text-sm tracking-wider font-bold ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-[1.02] active:scale-95'}`}
              >
                <Send size={16} className={status === 'submitting' ? 'animate-pulse' : ''} />
                <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
              </button>
            )}
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
