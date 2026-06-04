import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';

const About = () => {
  return (
    <div className="pt-8 pb-16 relative">
      {/* Elegantly styled Section Heading (Not bold as requested) */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-16 flex items-center space-x-4 text-white font-sans tracking-tight"
      >
        <span className="text-accent font-sans text-2xl">✦</span>
        <span>About Me</span>
        <div className="h-px bg-white/5 flex-1 ml-4"></div>
      </motion.h2>

      {/* Simplified Layout */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        
        {/* Box 1: Profile Image Card (Col Span 2) */}
        <div className="md:col-span-2">
          <TiltCard className="h-full">
            <div className="bento-panel h-full min-h-[380px] relative overflow-hidden group/profile rounded-[32px] border border-[#c5a880]/15 bg-[#141413] shadow-2xl">
              {/* Profile Image - Colorful as requested */}
              <img 
                src="/profile.png" 
                alt="Nibedita Behera" 
                className="w-full h-full object-cover absolute inset-0 opacity-90 group-hover/profile:opacity-100 group-hover/profile:scale-[1.02] transition-all duration-1000 ease-out pointer-events-none"
              />
              
              {/* Warm gradient mask aligning with the new ebony theme background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0d] via-[#0e0e0d]/10 to-transparent pointer-events-none" />
              
              {/* Bottom tag overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-left pointer-events-none">
                <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 font-bold uppercase block mb-1">Creative Identity</span>
                <h4 className="text-white text-lg font-black tracking-tight uppercase">Nibedita Behera</h4>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Box 2: Clean Personal Statement (Col Span 4) - Opaque background, no core narrative title, no bold styling */}
        <div className="md:col-span-4 p-8 md:p-12 bento-panel relative overflow-hidden flex flex-col justify-center min-h-[380px] rounded-[32px] border border-[#c5a880]/15 bg-[#141413] shadow-2xl">
          <div className="space-y-6 relative z-10 text-left font-sans">
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-sans tracking-wide font-medium">
              Hello! My name is Nibedita and I enjoy creating things that live on the internet. As a user-centric designer, I focus on building well-structured, functional digital experiences where design decisions are driven by real user needs.
            </p>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-sans tracking-wide font-medium">
              I'm a passionate UI/UX designer and front-end developer focused on clean, usable interfaces based in Bengaluru, India. I design with empathy and code with logic.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
