const Terminal = () => {
  return (
    <div className="mt-8 rounded-lg bg-[#1e1e1e] border border-vscode-border overflow-hidden shadow-lg shadow-black/50">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-vscode-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-xs text-vscode-textDark font-mono">bash - my-portfolio</div>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed text-vscode-text">
        <div className="flex items-center text-green-400">
          <span className="mr-2">user@portfolio:~$</span>
          <span className="text-white">whoami</span>
        </div>
        <div className="mb-2 text-blue-300">Full Stack Developer | UI/UX Designer | Creative Technologist</div>
        
        <div className="flex items-center text-green-400">
          <span className="mr-2">user@portfolio:~$</span>
          <span className="text-white">skills --list</span>
        </div>
        <div className="mb-2 text-yellow-300">Figma, React, Tailwind CSS, Python, Adobe Suite</div>

        <div className="flex items-center text-green-400">
          <span className="mr-2">user@portfolio:~$</span>
          <span className="text-white">status</span>
        </div>
        <div className="mb-2 text-purple-300">Ready for new opportunities! 🚀</div>
        
        <div className="flex items-center text-green-400">
          <span className="mr-2">user@portfolio:~$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
