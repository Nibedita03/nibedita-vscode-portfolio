import { motion } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      onAnimationComplete={onLoadingComplete}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0D17] text-vscode-accent font-mono"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter"
      >
        <span className="text-white">{'<'}</span>Nibedita<span className="text-vscode-accent">.design</span><span className="text-white ml-1">/</span><span className="text-white">{'>'}</span>
      </motion.div>

      <div className="w-64 h-1 bg-vscode-border rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-vscode-accent to-transparent"
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-sm text-vscode-textDark flex space-x-2"
      >
        <span>Initializing workspace</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >...</motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
