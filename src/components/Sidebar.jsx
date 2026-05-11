import { useState } from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  PlaySquare, 
  Box, 
  ChevronDown, 
  ChevronRight, 
  Linkedin,
  Twitter,
  Instagram,
  FileText,
  Download
} from 'lucide-react';

const files = [
  { name: 'Home.jsx', icon: '⚛️', section: 'home' },
  { name: 'Projects.jsx', icon: '⚛️', section: 'projects' },
  { name: 'About.js', icon: 'JS', section: 'about', isJs: true },
  { name: 'WhatIDo.ts', icon: 'TS', section: 'whatido', isTs: true },
  { name: 'TechStack.json', icon: '{}', section: 'techstack', isJson: true },
  { name: 'Contact.css', icon: '#', section: 'contact', isCss: true }
];

const Sidebar = ({ activeTab, onTabSelect }) => {
  const [explorerOpen, setExplorerOpen] = useState(true);

  return (
    <div className="flex h-full bg-vscode-sidebar border-r border-vscode-border text-vscode-text select-none">
      
      {/* Activity Bar */}
      <div className="w-12 h-full flex flex-col items-center py-4 space-y-6 border-r border-vscode-border bg-[#1E1E1E]">
        <div className="relative group cursor-pointer">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vscode-accent rounded-r" />
          <Files size={24} className="text-white" />
        </div>
        <Search size={24} className="text-vscode-textDark hover:text-white cursor-pointer transition-colors" />
        <GitBranch size={24} className="text-vscode-textDark hover:text-white cursor-pointer transition-colors" />
        <PlaySquare size={24} className="text-vscode-textDark hover:text-white cursor-pointer transition-colors" />
        <Box size={24} className="text-vscode-textDark hover:text-white cursor-pointer transition-colors" />
      </div>

      {/* Primary Side Bar */}
      <div className="flex-1 flex flex-col w-52 bg-vscode-sidebar">
        <div className="px-4 py-3 text-xs tracking-widest text-vscode-textDark font-sans">
          EXPLORER
        </div>

        {/* Portfolio Dropdown */}
        <div className="flex flex-col">
          <div 
            className="flex items-center px-2 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white font-bold"
            onClick={() => setExplorerOpen(!explorerOpen)}
          >
            {explorerOpen ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />}
            <span className="text-sm font-sans">PORTFOLIO</span>
          </div>

          {explorerOpen && (
            <div className="flex flex-col py-1">
              {files.map((file) => (
                <div 
                  key={file.name}
                  className={`flex items-center px-6 py-1 cursor-pointer text-sm ${activeTab === file.name ? 'bg-vscode-activeTab text-white' : 'hover:bg-vscode-hover hover:text-white'}`}
                  onClick={() => onTabSelect(file.name)}
                >
                  <span className={`mr-2 text-xs font-mono
                    ${file.isJs ? 'text-yellow-400' : ''}
                    ${file.isTs ? 'text-blue-400' : ''}
                    ${file.isJson ? 'text-yellow-200' : ''}
                    ${file.isCss ? 'text-blue-300' : ''}
                  `}>
                    {file.icon}
                  </span>
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spacer to push everything to bottom */}
        <div className="flex-1" />

        {/* Social Media Direct Links */}
        <div className="flex flex-col px-4 py-4 border-t border-vscode-border/50">
          <h3 className="text-xs text-vscode-textDark mb-3 font-mono">SOCIAL LINKS</h3>
          <div className="flex space-x-4 px-2">
            <a href="#" target="_blank" rel="noreferrer" className="text-vscode-textDark hover:text-[#0077b5] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-vscode-textDark hover:text-[#1DA1F2] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-vscode-textDark hover:text-[#E1306C] transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Resume Direct Link */}
        <a 
          href="https://drive.google.com/file/d/1kFg3vWveiIqvV6MMDfxyWoi_22V-NpgQ/view?usp=sharing" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center px-6 py-4 border-t border-vscode-border bg-[#1E1E1E] hover:bg-vscode-accent hover:text-white text-vscode-text transition-colors group cursor-pointer"
        >
          <FileText size={16} className="mr-3 text-vscode-textDark group-hover:text-white" />
          <span className="font-sans text-sm font-bold flex-1">Resume.pdf</span>
          <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

      </div>
    </div>
  );
};

export default Sidebar;
