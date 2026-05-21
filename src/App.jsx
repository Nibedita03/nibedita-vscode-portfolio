import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Tabs from './components/Tabs';
import StatusBar from './components/StatusBar';
import Loader from './components/Loader';
import Home from './sections/Home';
import About from './sections/About';
import WhatIDo from './sections/WhatIDo';
import TechStack from './sections/TechStack';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Home.jsx');
  const [openTabs, setOpenTabs] = useState(['Home.jsx']);

  const handleTabSelect = (tab) => {
    // Add to open tabs if not already there
    if (!openTabs.includes(tab)) {
      setOpenTabs(prev => [...prev, tab]);
    }
    setActiveTab(tab);

    const sectionId = tab.split('.')[0].toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 40; // Tabs height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTabClose = (tabToClose, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab !== tabToClose);
    setOpenTabs(newTabs);

    // If closing the active tab, switch to the nearest remaining tab
    if (activeTab === tabToClose && newTabs.length > 0) {
      const closedIndex = openTabs.indexOf(tabToClose);
      const newActiveIndex = Math.min(closedIndex, newTabs.length - 1);
      const newActive = newTabs[newActiveIndex];
      setActiveTab(newActive);

      // Scroll to the new active section
      const sectionId = newActive.split('.')[0].toLowerCase();
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 40;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'whatido', 'techstack', 'contact'];
      let current = '';

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }

      if (current) {
        const tabMapping = {
          'home': 'Home.jsx',
          'projects': 'Projects.jsx',
          'about': 'About.js',
          'whatido': 'WhatIDo.ts',
          'techstack': 'TechStack.json',
          'contact': 'Contact.css'
        };
        const active = tabMapping[current];
        if (active && active !== activeTab) {
          setActiveTab(active);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, activeTab]);

  return (
    <>
      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      
      <div className={`min-h-screen bg-vscode-bg text-vscode-text font-sans transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Fixed UI Shell */}
        <div className="fixed top-0 left-0 h-[calc(100vh-24px)] w-64 z-40 hidden md:block border-r border-vscode-border">
          <Sidebar activeTab={activeTab} onTabSelect={handleTabSelect} />
        </div>
        
        <div className="fixed top-0 md:left-64 right-0 h-9 z-40 border-b border-vscode-border bg-vscode-sidebar">
          <Tabs 
            activeTab={activeTab} 
            openTabs={openTabs} 
            onTabSelect={handleTabSelect} 
            onTabClose={handleTabClose} 
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 h-6 z-50">
          <StatusBar />
        </div>

        {/* Scrollable Content with Line Numbers Gutter */}
        <main className="md:ml-64 pt-9 pb-6 flex">
          {/* Line numbers gutter */}
          <div className="hidden lg:flex flex-col items-end w-12 shrink-0 border-r border-vscode-border/50 text-[#858585] font-mono text-[10px] sm:text-xs pt-20 pb-32 pr-2 select-none opacity-50 bg-[#1E1E1E]">
            {Array.from({ length: 150 }).map((_, i) => (
              <div key={i} className="h-[28px] md:h-[32px]">{i + 1}</div>
            ))}
          </div>

          <div className="flex-1 max-w-5xl mx-auto px-6 md:px-12 pb-32 relative z-10">
            <div id="home"><Home /></div>
            <div id="projects" className="pt-20"><Projects /></div>
            <div id="about" className="pt-20"><About /></div>
            <div id="whatido" className="pt-20"><WhatIDo /></div>
            <div id="techstack" className="pt-20"><TechStack /></div>
            <div id="contact" className="pt-20 pb-32"><Contact /></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
