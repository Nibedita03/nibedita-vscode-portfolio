import React from 'react';

const Logo = ({ className = "text-xl", showText = false }) => {
  return (
    <div className="flex items-center gap-2 select-none">
      <span className={`font-sans font-black tracking-wider uppercase bg-gradient-to-r from-[#ffffff] via-[#e5dfd5] to-[#c5a880] bg-clip-text text-transparent ${className}`}>
        NB
      </span>
      {showText && (
        <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase border-l border-white/10 pl-3 ml-1 block">
          STUDIO
        </span>
      )}
    </div>
  );
};

export default Logo;
