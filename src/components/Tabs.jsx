import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fileIcons = {
  'Home.jsx': '⚛️',
  'About.js': '🟨',
  'WhatIDo.ts': '🟦',
  'TechStack.json': '{}',
  'Projects.jsx': '⚛️',
  'Resume.pdf': '📄',
  'WorkWithMe.md': '📝',
  'Contact.css': '🎨'
};

const Tabs = ({ activeTab, openTabs, onTabSelect, onTabClose }) => {
  return (
    <div className="flex overflow-x-auto bg-vscode-sidebar vscode-scrollbar h-9 select-none shrink-0">
      <AnimatePresence>
        {openTabs.map((tab) => (
          <motion.div
            key={tab}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center px-3 border-r border-vscode-tabBorder cursor-pointer min-w-fit max-w-[200px] h-full ${
              activeTab === tab ? 'bg-vscode-activeTab text-white border-t-2 border-t-vscode-accent' : 'bg-vscode-inactiveTab text-vscode-textDark hover:bg-vscode-bg'
            }`}
            onClick={() => onTabSelect(tab)}
          >
            <span className="mr-2 text-sm">{fileIcons[tab]}</span>
            <span className="text-[13px] italic mr-2 truncate">{tab}</span>
            <button
              className={`p-0.5 rounded-md hover:bg-vscode-hover ${activeTab === tab ? 'opacity-100' : 'opacity-0 hover:opacity-100 group-hover:opacity-100'}`}
              onClick={(e) => onTabClose(tab, e)}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Tabs;
