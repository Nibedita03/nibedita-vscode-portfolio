import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Linkedin, Mail, CheckCircle, AlertCircle } from 'lucide-react';

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
          className="text-3xl font-bold mb-16 flex items-center space-x-4 text-white font-sans tracking-tight"
        >
          <span className="text-accent font-sans text-2xl">✦</span>
          <span>Contact Me</span>
          <div className="h-px bg-white/5 flex-1 ml-4"></div>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <form
            action="https://formspree.io/f/mykoljld"
            method="POST"
            onSubmit={handleSubmit}
            className="p-8 md:p-12 rounded-[32px] shadow-2xl flex flex-col space-y-6 font-sans relative border border-[#c5a880]/15 bg-[#141413]"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Let's Work Together</h3>
              <p className="text-zinc-400 text-sm">I'm currently available for full-time roles or design contracts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2.5 font-mono font-black">First Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-accent/40 transition-all font-sans"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2.5 font-mono font-black">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-accent/40 transition-all font-sans"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-500 uppercase tracking-widest mb-2.5 font-mono font-black">Message *</label>
              <textarea
                name="message"
                required
                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-accent/40 transition-all h-32 resize-none font-sans"
                placeholder="Hello there..."
              ></textarea>
            </div>

            {status === 'success' ? (
              <div className="flex items-center justify-center space-x-2 w-full py-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl font-sans text-sm font-bold">
                <CheckCircle size={16} />
                <span>Message Sent Successfully!</span>
              </div>
            ) : status === 'error' ? (
              <div className="flex items-center justify-center space-x-2 w-full py-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-sans text-sm font-bold">
                <AlertCircle size={16} />
                <span>Oops! Something went wrong.</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`flex items-center justify-center space-x-2 w-full py-4 bg-accent text-[#0e0e0d] rounded-xl transition-all duration-300 font-sans text-sm font-black uppercase tracking-wider ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-lg hover:shadow-accent/10 active:scale-95 cursor-pointer'}`}
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
        className="mt-32 pt-12 border-t border-white/5 flex flex-col items-center justify-center text-zinc-500 font-sans text-xs"
      >
        <div className="flex space-x-6 mb-6">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><Linkedin size={22} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><Instagram size={22} /></a>
          <a href="mailto:nibedita.design@gmail.com" className="hover:text-accent transition-colors"><Mail size={22} /></a>
        </div>
        <p className="tracking-wide">© 2026 Nibedita Behera. All rights reserved.</p>
        <p className="mt-2 text-zinc-600">Crafting thoughtful digital interfaces backed by user research.</p>
      </motion.footer>
    </div>
  );
};

export default Contact;
