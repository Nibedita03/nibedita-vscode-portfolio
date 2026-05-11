import { motion } from 'framer-motion';
import { Paperclip } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-8 pb-16 relative">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12 flex items-center space-x-4 text-white"
      >
        <span className="text-vscode-accent font-mono text-xl">02.</span>
        <span>About Me</span>
        <div className="h-px bg-vscode-border flex-1 ml-4"></div>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="minimal-card p-8 md:p-12 rounded-md max-w-4xl font-mono text-sm leading-relaxed relative shadow-lg"
      >
        {/* Photo with Paper Clip */}
        <motion.div
          initial={{ opacity: 0, rotate: 6, x: 50 }}
          whileInView={{ opacity: 1, rotate: 3, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="md:absolute static -top-12 -right-8 z-30 group mb-12 md:mb-0 ml-auto md:ml-0 w-max"
        >
          <div className="relative">
            <Paperclip size={56} className="absolute -top-6 left-1/2 -translate-x-1/2 text-vscode-textDark z-40 rotate-12" />
            <div className="w-48 h-64 md:w-64 md:h-[320px] bg-[#252526] p-2 md:p-3 border border-vscode-border rounded-sm shadow-2xl overflow-hidden group-hover:rotate-0 transition-all duration-500">
              <img
                src="/profile.png"
                alt="Nibedita"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <span className="text-purple-400">import</span> <span className="text-blue-300">React</span> <span className="text-purple-400">from</span> <span className="text-yellow-300">'react'</span>;
        </div>

        <div className="text-vscode-textDark mb-4 italic">
          {'/**'} <br />
          {' * About Me'} <br />
          {' * A passionate developer dedicated to creating intuitive and'} <br />
          {' * dynamic user experiences.'} <br />
          {' */'}
        </div>

        <div>
          <span className="text-purple-400">const</span> <span className="text-blue-400">AboutMe</span> <span className="text-white">=</span> () <span className="text-purple-400">{'=>'}</span> {'{'}
        </div>

        <div className="pl-6 py-4 border-l-2 border-vscode-border ml-2 space-y-6 relative z-10 w-full md:w-3/5">
          <div>
            <span className="text-purple-400">return</span> (
            <div className="pl-6">
              <span className="text-gray-400">{'<'}</span><span className="text-blue-400">section</span> <span className="text-blue-300">id</span><span className="text-white">=</span><span className="text-yellow-300">"about"</span><span className="text-gray-400">{'>'}</span>

              <div className="pl-6 space-y-6 text-vscode-text font-sans text-base leading-loose mt-4 mb-4">
                <p>
                  Hello! My name is Nibedita and I enjoy creating things that live on the internet. As a user-centric designer, I focus on building well-structured, functional digital experiences where design decisions are driven by real user needs.
                </p>
                <p>
                  I'm a passionate UI/UX designer and front-end developer focused on clean, usable interfaces based in Bengaluru, India. I design with empathy and code with logic.
                </p>
                <p>
                  Languages I speak: English, Hindi, Odia.
                </p>
              </div>

              <span className="text-gray-400">{'</'}</span><span className="text-blue-400">section</span><span className="text-gray-400">{'>'}</span>
            </div>
            );
          </div>
        </div>
        <div>{'}'}</div>

        <div className="mt-8">
          <span className="text-purple-400">export default</span> <span className="text-blue-400">AboutMe</span>;
        </div>
      </motion.div>
    </div>
  );
};

export default About;
