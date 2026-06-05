import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Lightbulb, Target, Users, Search, Layout, Compass, ShieldAlert, Sparkles, MonitorSmartphone, ChevronDown, ChevronRight, MapPin, Navigation, Car, Bus, Clock, Shield, CheckCircle, ThumbsUp, MessageSquare, Plus, ArrowRight, Award } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Reusable Section Component
const Section = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className="mb-24 relative"
  >
    <div className="absolute -left-8 md:-left-12 top-0 h-full w-px bg-gradient-to-b from-vscode-accent/50 to-transparent hidden md:block"></div>
    <div className="flex items-center space-x-4 mb-8">
      {Icon && <div className="p-3 rounded-full bg-vscode-accent/10 text-vscode-accent border border-vscode-accent/20"><Icon size={24} /></div>}
      <h3 className="text-2xl md:text-3xl font-bold font-sans text-white">{title}</h3>
    </div>
    <div className="prose prose-invert max-w-none font-sans text-vscode-text leading-relaxed">
      {children}
    </div>
  </motion.div>
);

// Abstract Placeholder Component for Mockup Screens
const Placeholder = ({ text = "Screen", icon: Icon, className = "" }) => (
  <div className={`w-full h-full bg-[#1E1E1E]/80 flex flex-col items-center justify-center border-2 border-dashed border-[#3C3C3C] text-vscode-textDark font-mono backdrop-blur-sm transition-colors hover:border-vscode-accent/50 hover:bg-vscode-accent/5 ${className}`}>
    {Icon && <div className="text-3xl mb-3 opacity-60 text-vscode-accent"><Icon size={32} /></div>}
    <div className="text-xs tracking-wider uppercase font-semibold text-center px-4">{text}</div>
  </div>
);

// Interactive Hover Reveal Card
const RevealCard = ({ title, subtitle, colorClass, children }) => {
  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      className={`p-8 bg-[#252526] border border-vscode-border border-l-4 ${colorClass} rounded-md relative overflow-hidden group h-full`}
    >
      <div className="relative z-10 h-full flex flex-col">
        <h4 className="font-mono text-sm mb-3 opacity-80">{subtitle}</h4>
        <h3 className="text-2xl font-bold text-white font-sans mb-4">{title}</h3>
        
        <div className="relative flex-1">
          <p className="text-vscode-text transition-opacity duration-300 group-hover:opacity-0 absolute inset-0">
            Hover to reveal deep insights...
          </p>
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 leading-relaxed font-sans text-sm">
            {children}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

// Collapsible Code Comment Card — auto-expands on scroll
const CollapsibleCard = ({ color, label, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOpen(true);
        }
      },
      { threshold: 0.6 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="rounded-lg overflow-hidden border border-vscode-border bg-[#1E1E1E]"
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-vscode-border/50">
        <ChevronDown 
          size={16} 
          className="transition-transform duration-500 flex-shrink-0" 
          style={{ color, transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} 
        />
        <span className="font-mono text-xs opacity-50 flex-shrink-0" style={{ color }}>{label}</span>
        <span className="font-mono text-lg text-white font-bold">{title}</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-3 ml-5">
              <div className="border-l-2 pl-4 w-fit" style={{ borderColor: color + '40' }}>
                <p className="text-vscode-text leading-relaxed font-sans text-sm">
                  {children}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Target Audience & Primary/Secondary Users
const TargetAudienceWidget = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      <motion.div 
        whileHover={{ y: -4 }}
        className="p-6 bg-[#252526] border border-vscode-border border-l-4 border-l-[#28C840] rounded-xl shadow-lg"
      >
        <span className="text-[#28C840] font-mono text-xs uppercase tracking-wider block mb-1">Primary Users</span>
        <h4 className="text-white font-bold font-sans text-lg mb-3 flex items-center gap-2">
          <span>🎓</span> College Students
        </h4>
        <p className="text-vscode-text font-sans text-sm leading-relaxed">
          Students traveling across hostels, academic wings, libraries, and canteens on a regular daily schedule. They need affordable, fast, and instant transit to bypass walking 20-30 minutes under hot sun or rain.
        </p>
      </motion.div>

      <motion.div 
        whileHover={{ y: -4 }}
        className="p-6 bg-[#252526] border border-vscode-border border-l-4 border-l-[#3B82F6] rounded-xl shadow-lg"
      >
        <span className="text-[#3B82F6] font-mono text-xs uppercase tracking-wider block mb-1">Secondary Users</span>
        <h4 className="text-white font-bold font-sans text-lg mb-3 flex items-center gap-2">
          <span>👔</span> Campus Staff & Faculty
        </h4>
        <p className="text-vscode-text font-sans text-sm leading-relaxed">
          Designated campus staff, guards, and faculty members who need to move between departments, administrative offices, and hostel blocks for inspections, teaching, or facilities coordination.
        </p>
      </motion.div>
    </div>
  );
};

// User Behaviour & Transit Alternatives
const UserBehaviourWidget = () => {
  const [activeTab, setActiveTab] = useState(0);

  const habits = [
    {
      title: "Walking Habits",
      icon: "🚶‍♂️",
      details: "Most common yet frustrating. Hostel-to-class distance is 20-30 minutes. Rushing during peak intervals leads to high class tardiness and fatigue.",
      metric: "20-30m Walk Time"
    },
    {
      title: "Cycles & Scooters",
      icon: "🚲",
      details: "Widely desired, but ownership is expensive. Requires constant tires/battery servicing and security chains to prevent lock theft inside large campuses.",
      metric: "High Maintenance"
    },
    {
      title: "Personal Vehicles",
      icon: "🛵",
      details: "Used by a small percentage, mostly with friends or family. Campus rules restrict motorized vehicles in pedestrian corridors to avoid accidents.",
      metric: "Restricted Access"
    }
  ];

  const currentAlternatives = [
    { name: "Walking", rate: "85%", icon: "🚶‍♂️" },
    { name: "Shuttle Bus", rate: "40%", icon: "🚌" },
    { name: "Own Bicycles", rate: "20%", icon: "🚲" },
    { name: "Shared Cycles", rate: "15%", icon: "🚲" },
    { name: "Find Scooty", rate: "12%", icon: "🛵" },
    { name: "Manual Rental", rate: "8%", icon: "🔑" }
  ];

  return (
    <div className="w-full my-8 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[32px] p-6 md:p-8 shadow-2xl space-y-8">
      {/* Title & Help Guide */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h4 className="text-white font-bold text-lg md:text-xl font-sans">Current Campus Transit Habits</h4>
          <p className="text-zinc-500 text-sm font-mono mt-1">Observed user behaviors and primary frustrations</p>
        </div>
        <span className="text-xs md:text-sm font-sans text-zinc-400 animate-pulse flex items-center gap-1 self-start md:self-center">
          <span>Click a tab to explore</span>
          <span>➔</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Interactive Habit Slider (one-by-one) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          {/* Tab Headers */}
          <div className="flex gap-2 border-b border-white/5 pb-3 overflow-x-auto hide-scrollbar">
            {habits.map((h, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold font-sans transition-all flex items-center gap-2 whitespace-nowrap border ${
                  activeTab === i 
                    ? 'bg-[#c5a880] text-[#141413] border-transparent shadow-lg' 
                    : 'text-zinc-400 border-white/5 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{h.icon}</span>
                <span>{h.title}</span>
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className="p-6 bg-[#141413]/60 border border-white/5 rounded-2xl min-h-[160px] flex flex-col justify-between transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{habits[activeTab].icon}</span>
                <h5 className="text-white font-bold text-lg font-sans">{habits[activeTab].title}</h5>
              </div>
              <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed">
                {habits[activeTab].details}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">Observed Challenge</span>
              <span className="px-2.5 py-1 bg-[#FF5F56]/10 text-[#FF5F56] rounded-lg text-xs font-bold font-mono">
                {habits[activeTab].metric}
              </span>
            </div>
          </div>

          {/* Sequential Controls */}
          <div className="flex items-center justify-between pt-2">
            <button 
              onClick={() => activeTab > 0 && setActiveTab(activeTab - 1)}
              disabled={activeTab === 0}
              className="px-3.5 py-2 rounded-lg border border-[#c5a880]/15 text-zinc-400 hover:text-white disabled:opacity-20 text-sm font-mono font-semibold transition-all flex items-center gap-1.5"
            >
              ← Prev
            </button>
            
            <div className="flex gap-1.5">
              {habits.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTab === idx ? 'bg-[#c5a880] w-4' : 'bg-white/10'}`} 
                />
              ))}
            </div>

            <button 
              onClick={() => activeTab < habits.length - 1 && setActiveTab(activeTab + 1)}
              disabled={activeTab === habits.length - 1}
              className="px-3.5 py-2 rounded-lg border border-[#c5a880]/15 text-[#c5a880] hover:text-white disabled:opacity-20 text-sm font-mono font-semibold transition-all flex items-center gap-1.5"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Right Side: Alternatives Overlaps */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
          <div>
            <h5 className="text-[#c5a880] font-mono text-sm uppercase tracking-wider font-bold">
              What Students Do Now
            </h5>
            <p className="text-zinc-500 text-xs font-sans mt-0.5">Mode overlap percentages</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {currentAlternatives.map((alt, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 bg-[#141413]/60 border border-white/5 px-4 py-2.5 rounded-xl hover:border-[#c5a880]/20 transition-colors"
              >
                <span className="text-lg">{alt.icon}</span>
                <span className="text-zinc-300 font-sans text-sm flex-grow font-semibold">{alt.name}</span>
                <span className="text-[#28C840] font-mono text-sm font-bold">{alt.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Secondary Research Case Studies (Mo Cycle, Chandigarh, Universities Abroad)
const SecondaryResearchShowcase = () => {
  const cases = [
    {
      title: "BBSR Mo Cycle",
      scale: "1,220 Bikes • 120 Hubs",
      model: "Capital Region Urban Transport (CRUT)",
      lesson: "GPS smart ring locks; high dock density successfully bridges campus transit gaps."
    },
    {
      title: "Chandigarh PBS",
      scale: "5,000 Bikes • 574 Hubs",
      model: "SmartBike PPP Model",
      lesson: "Fully automated app operations; seamless user locate, unlock, and ride cycle."
    },
    {
      title: "Abroad Campuses",
      scale: "Global Benchmarks (UC Berkeley, Cambridge)",
      model: "University & Transit Hub Partnerships",
      lesson: "Geofenced parking boundaries; specialized parking zones minimize walkway clutter."
    }
  ];

  return (
    <div className="w-full my-8 overflow-hidden rounded-[24px] border border-[#c5a880]/15 bg-[#1e1d1b] shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left font-sans">
          <thead>
            <tr className="border-b border-[#c5a880]/10 bg-[#c5a880]/5 text-[#c5a880] text-xs uppercase tracking-wider font-bold">
              <th className="p-5 md:p-6 text-xs md:text-sm">System</th>
              <th className="p-5 md:p-6 text-xs md:text-sm">Scale</th>
              <th className="p-5 md:p-6 text-xs md:text-sm">Model / Operator</th>
              <th className="p-5 md:p-6 text-xs md:text-sm">Key System Lesson</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300 text-xs md:text-sm">
            {cases.map((c, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors duration-200">
                <td className="p-5 md:p-6 font-bold text-white whitespace-nowrap">{c.title}</td>
                <td className="p-5 md:p-6 whitespace-nowrap text-zinc-400 font-mono text-xs">{c.scale}</td>
                <td className="p-5 md:p-6 text-zinc-300">{c.model}</td>
                <td className="p-5 md:p-6 text-[#f7f5f0]/80 leading-relaxed">{c.lesson}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Expectations vs Complaints
const ExpectationsVsComplaints = () => {
  const expectations = [
    "Affordable rides (student budget friendly)",
    "Easy to use app interface (unlock in 1-tap)",
    "Always available bikes at major docks",
    "Well-maintained bikes (tyres, batteries checked)",
    "Fast support system (immediate dispute resolution)",
    "No hidden charges (clean billing model)"
  ];

  const complaints = [
    "Bikes not active or battery low at docks",
    "Unstable app lock (fails to unlock physically)",
    "Slow scan response (takes a lot of time)",
    "Customer care doesn't support quickly in case of issues",
    "Students charged extra fees even after locking the bike"
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      <div className="p-8 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[28px] shadow-2xl">
        <h4 className="text-[#28C840] font-bold font-sans text-base md:text-lg mb-4 flex items-center gap-2">
          <span>🌟</span> Student Commute Expectations
        </h4>
        <ul className="space-y-3">
          {expectations.map((exp, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-sans text-zinc-300">
              <span className="text-[#28C840] shrink-0 font-bold font-sans">✓</span>
              <span>{exp}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[28px] shadow-2xl">
        <h4 className="text-[#FF5F56] font-bold font-sans text-base md:text-lg mb-4 flex items-center gap-2">
          <span>⚠️</span> Legacy App Complaints (e.g. Yulu)
        </h4>
        <ul className="space-y-3">
          {complaints.map((comp, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-sans text-zinc-300">
              <span className="text-[#FF5F56] shrink-0 font-bold font-sans">✕</span>
              <span>{comp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Risks ("How Might It Fail") and Mitigations
const RiskAnalysisWidget = () => {
  const risks = [
    {
      problem: "Bikes get broken/damaged and aren't fixed quickly",
      mitigation: "Photo-based reporting logs it instantly into the admin service queue and blocks bookings."
    },
    {
      problem: "Without parking zones, bikes block pathways & get scattered",
      mitigation: "Geofenced parking docks. Users cannot lock or end rides unless parked within strict coordinates."
    },
    {
      problem: "Battery charging constraints & flat charges mid-ride",
      mitigation: "Real-time battery telemetry in app; bikes with < 15% charge are hidden from active booking map."
    },
    {
      problem: "Security issues: bikes get stolen or hoarded",
      mitigation: "GPS tracker with anti-tamper sensors, alarm sirens, and .edu account authorization loops."
    },
    {
      problem: "Accidents in pedestrian-heavy campus walkways",
      mitigation: "Geofenced speed limiters capping ride speed automatically to 10-15 km/h in busy zones."
    }
  ];

  return (
    <div className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 my-8 shadow-xl">
      <h4 className="text-white font-bold text-lg font-sans mb-6">Risk Analysis & Mitigations</h4>
      <div className="space-y-4">
        {risks.map((risk, i) => (
          <div key={i} className="grid md:grid-cols-12 gap-4 bg-[#1E1E1E] p-4 rounded-xl border border-vscode-border hover:border-vscode-accent/30 transition-colors">
            <div className="md:col-span-5 flex items-start gap-2.5">
              <span className="text-[#FF5F56] shrink-0 text-xs md:text-sm mt-0.5 font-bold font-mono">Risk {i+1}</span>
              <span className="text-white font-sans text-sm md:text-base font-semibold">{risk.problem}</span>
            </div>
            <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-vscode-border/50 pt-2.5 md:pt-0 md:pl-4 flex items-start gap-2.5">
              <span className="text-[#28C840] font-bold text-xs md:text-sm mt-0.5 font-mono">Mitigation</span>
              <p className="text-vscode-text font-sans text-sm md:text-base leading-relaxed">{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// College Concerns
const CollegeConcernsWidget = () => {
  const concerns = [
    {
      title: "Accident Prevention",
      desc: "Speed limits capped strictly at **10-15 km/h** inside pedestrian zones to ensure safety of walking students and faculty."
    },
    {
      title: "Designated Parking",
      desc: "Specific paths and geofenced zones prevent bikes from cluttering lawns, blocking entries, or causing property damage."
    },
    {
      title: "Regular Maintenance",
      desc: "Scheduled checks by operations teams ensure tyres, smart ring locks, and brake cables remain fully compliant with safety policies."
    }
  ];

  return (
    <div className="bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[24px] p-6 md:p-8 my-8 shadow-xl space-y-6">
      {concerns.map((concern, idx) => (
        <div key={idx} className="flex gap-4 items-start">
          <span className="h-2 w-2 rounded-full bg-[#c5a880] mt-2.5 shrink-0" />
          <div className="space-y-1">
            <h5 className="text-[#c5a880] font-sans font-bold text-base md:text-lg">
              {concern.title}
            </h5>
            <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed">
              {concern.desc.split("**").map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Interactive Journey Map with clickable stages for Rydr
const journeyData = [
  { label: "Locating", emoji: "🥵", color: "#3B82F6", goal: "Find a bike nearby", action: "Opens app, scans map for nearest bike dock", touchpoint: "Map Hub Screen", pain: "Bikes are scattered or canteens are empty during class peaks.", fix: "Structured docking zones with real-time stock indicators." },
  { label: "Inspecting", emoji: "🧐", color: "#F59E0B", goal: "Verify battery and status", action: "Checks selected bike's charge level in app", touchpoint: "Bike Info Details", pain: "Walking to a bike only to find a low charge or a flat tire.", fix: "Trust-building icons (Green Check = serviced, Lightning = charged)." },
  { label: "Unlocking", emoji: "😬", color: "#10B981", goal: "Unlock bike instantly", action: "Scans QR code on handlebar", touchpoint: "In-App Scanner", pain: "QR code is scratched, dirty, or unreadable.", fix: "Manual Bike ID text input fallback and UV-laminated stickers." },
  { label: "Riding", emoji: "😎", color: "#28C840", goal: "Navigate campus safely", action: "Pedals to class with e-bike assist", touchpoint: "Active Ride HUD", pain: "Pedestrian collision risks in busy corridors.", fix: "Strict 10-15 km/h campus speed cap and geofenced zones." },
  { label: "Parking", emoji: "😰", color: "#8B5CF6", goal: "Find open parking spot", action: "Arrives at target dock, checks open slots", touchpoint: "End Ride Screen", pain: "Target docking station is full, cannot return bike.", fix: "Redirects to nearest dock with 5-min grace period or overflow standby." },
  { label: "Locking", emoji: "😌", color: "#EC4899", goal: "End ride securely", action: "Locks physical ring lock & submits review", touchpoint: "Ride Summary Screen", pain: "Forgot to lock or charged extra due to lag.", fix: "Auto-end ride on physical dock lock confirmation." },
];

const JourneyMap = () => {
  const [active, setActive] = useState(0);
  const stage = journeyData[active];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[10px] md:text-xs font-mono text-[#c5a880] uppercase tracking-wider font-bold">
          ✦ Student Journey Flow
        </span>
        <span className="text-[10px] md:text-xs font-sans text-zinc-400 animate-pulse flex items-center gap-1">
          <span>Click any emoji to explore</span>
          <span>➔</span>
        </span>
      </div>

      <div className="relative flex items-center justify-between mb-8 overflow-x-auto py-4 hide-scrollbar">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#c5a880]/10 -translate-y-1/2 z-0 min-w-[500px]" />
        
        {journeyData.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative z-10 flex flex-col items-center gap-2 group flex-shrink-0 px-2"
          >
            <span className={`text-3xl md:text-5xl transition-transform duration-300 ${active === i ? 'scale-125' : 'scale-100 opacity-55 group-hover:opacity-100 group-hover:scale-105'}`}>
              {s.emoji}
            </span>
            <span 
              className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold font-sans transition-all duration-300 whitespace-nowrap"
              style={{ 
                backgroundColor: active === i ? s.color : 'transparent',
                color: active === i ? '#fff' : '#c5a880',
                border: active === i ? 'none' : '1px solid rgba(197, 168, 128, 0.15)',
              }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[430px] md:min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[28px] p-6 md:p-8 absolute w-full shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl md:text-5xl">{stage.emoji}</span>
                <div>
                  <h4 className="text-white font-bold text-xl font-sans">{stage.label} Stage</h4>
                  <p className="text-zinc-500 text-xs font-mono">Stage {active + 1} of 6</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-4 bg-[#141413]/60 border border-white/5 rounded-2xl">
                    <div className="text-xs font-mono text-[#c5a880] mb-1 uppercase tracking-wider font-bold">🎯 Goal</div>
                    <p className="text-zinc-200 font-sans text-sm">{stage.goal}</p>
                  </div>
                  <div className="p-4 bg-[#141413]/60 border border-white/5 rounded-2xl">
                    <div className="text-xs font-mono text-[#c5a880] mb-1 uppercase tracking-wider font-bold">⚡ Action</div>
                    <p className="text-zinc-300 font-sans text-sm">{stage.action}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border bg-[#FF5F56]/5 border-[#FF5F56]/20">
                    <div className="text-xs font-mono text-[#FF5F56] mb-1 uppercase tracking-wider font-bold font-sans">🥵 Friction / Pain Point</div>
                    <p className="text-zinc-300 font-sans text-sm">{stage.pain}</p>
                  </div>
                  <div className="p-4 rounded-2xl border bg-[#28C840]/5 border-[#28C840]/20">
                    <div className="text-xs font-mono text-[#28C840] mb-1 uppercase tracking-wider font-bold font-sans">✨ Solution / Fix</div>
                    <p className="text-zinc-300 font-sans text-sm">{stage.fix}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <button 
                onClick={() => active > 0 && setActive(active - 1)}
                disabled={active === 0}
                className="px-3 py-1.5 rounded-lg border border-[#c5a880]/15 text-zinc-400 hover:text-white disabled:opacity-20 text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
              >
                ← Prev Stage
              </button>
              
              <div className="flex gap-1.5">
                {journeyData.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${active === idx ? 'bg-[#c5a880] w-4' : 'bg-white/10'}`} 
                  />
                ))}
              </div>

              <button 
                onClick={() => active < journeyData.length - 1 && setActive(active + 1)}
                disabled={active === journeyData.length - 1}
                className="px-3 py-1.5 rounded-lg border border-[#c5a880]/15 text-[#c5a880] hover:text-white disabled:opacity-20 text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
              >
                Next Stage →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const swotData = [
  {
    letter: "S",
    title: "Strengths",
    color: "#28C840",
    points: [
      "Rigid geofencing ensures bikes remain strictly inside campus bounds",
      "Interactive dock mapping prevents cluttered parking layouts",
      "Low maintenance costs compared to university shuttle fleets",
      "High student trust via official college email & ID verification"
    ]
  },
  {
    letter: "W",
    title: "Weaknesses",
    color: "#EF4444",
    points: [
      "Extreme demand peaks concentrated around class change intervals",
      "Manual rebalancing required to move bikes back to high-demand docks",
      "Weather dependency (reduced ridership during monsoon/mid-day heat)",
      "Battery swapping logistics require dedicated operational support"
    ]
  },
  {
    letter: "O",
    title: "Opportunities",
    color: "#3B82F6",
    points: [
      "Integration with student ID card for RFID tap-to-unlock",
      "Gamification of carbon savings to reward green-travel credits",
      "Direct partnership with campus administration for official funding",
      "Expansion of routes to off-campus student housing zones"
    ]
  },
  {
    letter: "T",
    title: "Threats",
    color: "#F59E0B",
    points: [
      "Vandalism or reckless riding causing high repair costs",
      "Strict administration bans if pedestrian speed rules are violated",
      "Battery degradation over intense summer or winter conditions",
      "Students locking bikes with personal locks to hoard vehicles"
    ]
  }
];

const SwotAnalysis = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {swotData.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 overflow-hidden group transition-all duration-300 hover:border-vscode-border/80"
        >
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-current opacity-20 rounded-xl transition-colors duration-300 pointer-events-none" style={{ color: item.color }} />
          
          <div 
            className="absolute -right-6 -bottom-10 text-[180px] font-bold opacity-[0.03] leading-none pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-300 font-sans"
            style={{ color: item.color }}
          >
            {item.letter}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-2"
                style={{ borderColor: item.color, color: item.color, backgroundColor: `${item.color}15` }}
              >
                {item.letter}
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white font-sans tracking-wide uppercase">{item.title}</h4>
            </div>
            
            <ul className="space-y-4">
              {item.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-vscode-text text-sm md:text-base leading-relaxed font-sans">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const GapAnalysis = () => {
  const gaps = [
    {
      num: "01",
      title: "Campus Exclusion",
      desc: "City e-bike apps (Yulu) lack presence in closed educational campuses and ignore student pricing constraints.",
    },
    {
      num: "02",
      title: "Pathway Congestion",
      desc: "Dockless systems lead to scattered, damaged bikes blocking pathways, violating college code-of-conduct.",
    },
    {
      num: "03",
      title: "Unpredictable Fleet",
      desc: "Bikes are often left with depleted batteries or hidden damage, frustrating students running late.",
    },
    {
      num: "04",
      title: "Reporting Friction",
      desc: "No integrated student-only reporting mechanism that locks down unsafe bikes instantly for repair.",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full">
      {gaps.map((gap, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative p-8 rounded-[28px] border bg-[#141413] border-white/5 hover:border-accent/30 overflow-hidden group shadow-2xl flex flex-col justify-between transition-all duration-300"
        >
          {/* Subtle background gradient glow */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-[100px] bg-gradient-to-tr from-[#c5a880]/10 to-transparent group-hover:from-[#c5a880]/25 transition-all duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-accent">
                Gap Area
              </span>
              <span className="text-5xl font-black text-[#c5a880]/15 group-hover:text-[#c5a880]/30 transition-colors font-sans select-none leading-none">
                {gap.num}
              </span>
            </div>
            
            <h4 className="text-xl font-extrabold text-white uppercase tracking-tight mb-3 font-sans">
              {gap.title}
            </h4>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
              {gap.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const compFeatures = [
  "Primary use case",
  "Target Audience",
  "Campus presence",
  "Vehicle types",
  "How to pay",
  "Unlock method",
  "Tracking features",
  "Battery charging",
  "Focus on students",
  "Booking method",
  "Standout features"
];

const allComps = [
  {
    name: "Yulu",
    data: [
      "Short city rides",
      "Student, city people",
      "Yes, some its",
      "e-bikes, e-scooters",
      "Per minute ride",
      "Scan qr code in app",
      "Gps and telematics",
      "Swap batteries at stations",
      "some students",
      "Book instantly in app",
      "easy to use, dockless but parking zone there"
    ]
  },
  {
    name: "Zypp Electric",
    data: [
      "delivery service",
      "Delivery workers",
      "No",
      "e-bikes, e-scooters",
      "Ride for business",
      "assigned vehicles",
      "fleet gps tracking",
      "staff charges bikes",
      "No",
      "admin assigns vehicles",
      "good for delivery"
    ]
  },
  {
    name: "Halo Mobility",
    data: [
      "Rent bikes, autos",
      "tourist, city users",
      "No",
      "autos, ebikes",
      "pay per ride",
      "unlock with app",
      "app tracks ride",
      "user or station charging",
      "No",
      "Book with app",
      "multiple transport types"
    ]
  },
  {
    name: "EVeez",
    data: [
      "employee transport",
      "office workers",
      "No",
      "ebikes and escooters",
      "monthly subscription",
      "assigned by company",
      "app tracking",
      "charging at office",
      "No",
      "assigned by company",
      "only for employees"
    ]
  },
  {
    name: "Rydr (Ours)",
    isOurs: true,
    data: [
      "Student transport inside campus",
      "College students",
      "yes for pretty big campuses",
      "ebikes/ pedal assist bikes",
      "pay per ride/ monthly pass",
      "scan qr",
      "real time gps",
      "charging stations in campus",
      "yes",
      "Book instantly",
      "designed for daily use of students"
    ]
  }
];


const CompetitiveAnalysis = () => {
  return (
    <div className="bg-[#141413] rounded-[24px] border border-[#c5a880]/15 shadow-2xl overflow-hidden relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-[#1e1d1b] z-20 p-5 border-b border-[#c5a880]/15 border-r border-[#c5a880]/10 font-mono text-sm text-[#c5a880] uppercase w-48 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
                Feature
              </th>
              {allComps.map((comp, i) => (
                <th 
                  key={i} 
                  className={`p-5 border-b border-[#c5a880]/15 font-sans font-bold text-sm md:text-base relative ${
                    comp.isOurs 
                      ? 'text-white bg-[#25221c] border-x border-[#c5a880]/30 shadow-[0_0_15px_rgba(197,168,128,0.1)]' 
                      : 'text-zinc-200 bg-[#1e1d1b]'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {comp.isOurs && (
                      <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block font-extrabold mb-1">
                        ★ OUR SOLUTION
                      </span>
                    )}
                    <span className={comp.isOurs ? 'text-[#c5a880] text-base md:text-lg font-black' : 'text-white'}>
                      {comp.name}
                    </span>
                  </div>
                  {comp.isOurs && <div className="h-1 w-full bg-[#c5a880] absolute top-0 left-0"></div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compFeatures.map((feat, fi) => (
              <tr key={fi} className="hover:bg-[#1e1d1b]/40 transition-colors group">
                <td className="sticky left-0 bg-[#1e1d1b] z-20 p-5 border-b border-[#c5a880]/10 border-r border-[#c5a880]/10 font-sans text-sm font-semibold text-[#c5a880] shadow-[4px_0_12px_rgba(0,0,0,0.5)] group-hover:bg-[#252526] transition-colors">
                  {feat}
                </td>
                {allComps.map((comp, ci) => (
                  <td 
                    key={ci} 
                    className={`p-5 border-b border-[#c5a880]/10 font-sans text-sm leading-relaxed ${
                      comp.isOurs 
                        ? 'text-white bg-[#25221c]/70 border-x border-[#c5a880]/20 font-medium' 
                        : 'text-zinc-400 group-hover:text-zinc-300'
                    }`}
                  >
                    {comp.isOurs ? (
                      <div className="flex items-start gap-2">
                        <span className="text-[#c5a880] mt-0.5">✓</span>
                        <span>{comp.data[fi]}</span>
                      </div>
                    ) : (
                      <span>{comp.data[fi]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PhoneFrame = ({ children, label = "", disableHover = false }) => (
  <div className="flex flex-col items-center space-y-4">
    <div className={`relative w-full aspect-[9/19.5] bg-[#09090b] rounded-[36px] p-2.5 shadow-2xl border-4 border-[#27272a] ring-1 ring-white/10 flex flex-col overflow-hidden transition-all duration-300 ${!disableHover ? 'hover:border-vscode-accent/50 hover:scale-102 cursor-pointer' : ''}`}>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#27272a] rounded-full z-20 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 ml-auto mr-3"></div>
      </div>
      <div className="w-full h-full bg-[#1c1c1e] rounded-[28px] overflow-hidden relative flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
    {label && (
      <span className="text-white font-sans text-sm font-bold text-center">
        {label}
      </span>
    )}
  </div>
);

const StyleGuide = () => {
  const [copiedColor, setCopiedColor] = useState(null);

  const colors = [
    { hex: "#139D86", name: "Primary Teal", role: "Main branding, call-to-actions, and checked states" },
    { hex: "#5BB0E5", name: "Secondary Blue", role: "Active routes, docking markers, and GPS paths" },
    { hex: "#D25B5B", name: "Accent Red", role: "Alerts, penalty notifications, and boundary locks" },
    { hex: "#F8F9FA", name: "Base Off-White", role: "Light background panels and card canvas fills" },
    { hex: "#333333", name: "Dark Charcoal", role: "High-contrast text, title headers, and dark bases" }
  ];

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="mt-16 border-t border-vscode-border pt-16">
      <h4 className="text-white font-bold mb-8 font-sans text-2xl md:text-3xl">Visual Style Guide</h4>
      <div className="grid lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Colors Section */}
        <div className="bg-[#252526] border border-vscode-border rounded-xl p-8 shadow-xl flex flex-col justify-between h-full">
          <div>
            <h5 className="text-white font-bold mb-6 font-sans text-lg flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#139D86] animate-pulse"></span>
              <span>Color Palette</span>
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {colors.map((color) => (
                <div 
                  key={color.hex} 
                  onClick={() => handleCopy(color.hex)}
                  className="group cursor-pointer flex flex-col space-y-3 p-3 bg-[#1e1e1e] border border-vscode-border rounded-lg hover:border-vscode-accent/50 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Color Swatch */}
                  <div 
                    className="w-full aspect-square rounded-md shadow-inner transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                  />
                  
                  {/* Hex & Name */}
                  <div className="flex flex-col">
                    <span className="text-white font-mono text-sm font-bold tracking-wider">{color.hex}</span>
                    <span className="text-vscode-textDark text-xs font-sans font-medium">{color.name}</span>
                  </div>
                  
                  {/* Copied Overlay */}
                  {copiedColor === color.hex && (
                    <div className="absolute inset-0 bg-[#139D86]/90 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest font-sans">
                      Copied!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="bg-[#252526] border border-vscode-border rounded-xl p-8 shadow-xl flex flex-col justify-between h-full">
          <div>
            <h5 className="text-white font-bold mb-6 font-sans text-lg flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#139D86] animate-pulse"></span>
              <span>Typography System</span>
            </h5>
            
            <div className="space-y-8">
              {/* DM Sans Specimen */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <h6 className="text-white text-xl font-bold tracking-wide font-sans font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    DM Sans
                  </h6>
                  <span className="text-[10px] font-mono bg-vscode-accent/10 text-vscode-accent px-2 py-0.5 rounded border border-vscode-accent/20">Primary Font</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-5xl font-bold text-[#139D86]/20 select-none font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Aa
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-[#139D86] mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Used for primary headings, callouts, agreements, body copy, and UI markers.</span>
                    </p>
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-[#139D86] mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Chosen for its rounded, modern curves, providing maximum legibility for mobile commutes.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Type Scale Specimen */}
          <div className="mt-8 pt-6 border-t border-vscode-border/50 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Headings</span>
              <span className="text-white font-sans text-sm font-semibold">24px (DM Sans - Bold)</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Subheadings</span>
              <span className="text-white font-sans text-sm font-semibold">18px (DM Sans - Medium)</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Body</span>
              <span className="text-white font-sans text-sm font-semibold">14px (DM Sans)</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono text-vscode-textDark tracking-wider uppercase">Labels</span>
              <span className="text-white font-sans text-sm font-semibold">12px (DM Sans)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const ProblemsDashboard = () => {
  const [activeProblem, setActiveProblem] = useState(0);

  const problemsData = [
    {
      id: 1,
      title: "Regular Servicing",
      issue: "How to maintain the vehicle fleet and prevent sudden breakdowns during busy hours?",
      solution: "Implement automatic vehicle tracking that flags a bike for a check-up after X rides or X kilometers. The docking rack displays an 'in maintenance' indicator and digitally locks the bike. A servicing van does weekly campus rounds."
    },
    {
      id: 2,
      title: "Charging & Batteries",
      issue: "How to ensure battery charge levels and avoid dead vehicles?",
      solution: "Equip bikes with swappable batteries swapped daily by operations. Design smart charging docks at key spots (hostels, canteens). If a bike falls below 20% charge, the backend flags it as unavailable and alerts staff."
    },
    {
      id: 3,
      title: "Theft Protection",
      issue: "How to prevent theft and unauthorized exits from campus bounds?",
      solution: "Integrate geofencing so bikes lock up and alert security if they cross the campus perimeter. Bikes feature a hidden GPS tracker in the frame and use digital app unlocks linked to verified student IDs (no manual keys)."
    },
    {
      id: 4,
      title: "Service Administration",
      issue: "Who will handle regular servicing and support?",
      solution: "Operations are managed by a small dedicated team from the college maintenance department or a contracted vendor. Checkups are performed on a fixed schedule (every 2 weeks or after 120km traveled)."
    },
    {
      id: 5,
      title: "College Policies",
      issue: "How to align with college policies and get administrative approval?",
      solution: "Present a detailed proposal covering geofencing boundaries, speed limits, and liability. Start with a 5-bike pilot phase to demonstrate safety and reliability. Define roles for administration, security, and vendors."
    },
    {
      id: 6,
      title: "Overcrowding & Idle Time",
      issue: "How to handle overcrowding at classrooms and idle bikes at hostels?",
      solution: "Position larger docking racks near high-demand zones. Use historic data to predict peak hours (e.g., 8-10 AM class start) and assign staff to rebalance bikes. Shorten maximum rental times to 30 mins during peak periods."
    },
    {
      id: 7,
      title: "Parking Limitations",
      issue: "What happens when a student arrives at a completely full docking station?",
      solution: "The app redirects the user to the nearest open dock with a 5-minute grace period. Introduce overflow standby stands where bikes can be parked temporarily and locked digitally, alerting operations to pick them up."
    },
    {
      id: 8,
      title: "Defective Pickups",
      issue: "How to prevent students from picking a damaged or flat-tire bike?",
      solution: "Incorporate quick post-ride feedback ('Did the ride go smoothly?'). If a bike is flagged twice, it is auto-disabled. Show visual trust icons on bikes (Green Check = Good, Red Triangle = Disabled/Flagged)."
    },
    {
      id: 9,
      title: "Damaged QR Codes",
      issue: "What if a student cannot unlock a bike because the QR code sticker is damaged?",
      solution: "Laminate QR stickers with UV protection and print a prominent numeric Bike ID on the frame. Students can manually type this ID in the app to unlock the bike immediately."
    },
    {
      id: 10,
      title: "Data & Privacy",
      issue: "How to secure student data and ride history?",
      solution: "Only collect essential information: student name, college email ID, and student ID. Encrypt all databases and integrate with college OTP login systems. Present a clear, human-readable data privacy terms popup."
    },
    {
      id: 11,
      title: "Misuse Control",
      issue: "How to handle reckless riding, vandalism, or hoarding?",
      solution: "Link every account to verified college credentials. Track riding behavior via internal sensors. Issue temporary bans or penalty fees for wrong-zone parking, and escalate persistent misuse to dean offices."
    }
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-8 bg-[#141413] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl relative">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-y-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-y-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-y-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 168, 128, 0.15);
          border-radius: 10px;
        }
        .custom-y-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 168, 128, 0.4);
        }
      `}} />

      <div className="lg:col-span-4 relative flex flex-col">
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3 hidden lg:block font-bold">
          Explore 11 Problems (Click to switch)
        </div>
        
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto max-h-[380px] gap-2 pr-2 pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/5 scroll-smooth custom-y-scrollbar relative">
          {problemsData.map((prob, idx) => (
            <button
              key={prob.id}
              onClick={() => setActiveProblem(idx)}
              className={`p-3.5 rounded-xl text-left font-sans text-sm md:text-base font-semibold transition-all duration-200 flex items-center justify-between gap-3 shrink-0 group ${
                activeProblem === idx
                  ? "bg-[#25221c] text-[#c5a880] border-l-4 border-[#c5a880] font-extrabold pl-4 shadow-inner"
                  : "bg-[#1e1d1b] text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5 pl-4"
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className={`font-mono text-xs ${activeProblem === idx ? 'text-[#c5a880]' : 'text-zinc-500'}`}>{String(prob.id).padStart(2, '0')}</span>
                <span className="truncate">{prob.title}</span>
              </div>
              <span className={`text-xs transition-transform duration-200 ${
                activeProblem === idx 
                  ? 'text-[#c5a880] translate-x-0' 
                  : 'text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-1'
              }`}>
                ➔
              </span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-2 h-12 bg-gradient-to-t from-[#141413] to-transparent pointer-events-none hidden lg:block" />
        <div className="absolute right-2 top-0 bottom-0 w-12 bg-gradient-to-l from-[#141413] to-transparent pointer-events-none lg:hidden" />
      </div>

      <div className="lg:col-span-8 flex flex-col justify-between min-h-[250px]">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block font-bold">Identified Problem {problemsData[activeProblem].id} of 11</span>
              <h4 className="text-white font-bold text-xl md:text-2xl font-sans mt-0.5">{problemsData[activeProblem].title}</h4>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <span className="text-red-400 text-xs md:text-sm font-mono tracking-wider uppercase font-bold">The Problem Issue</span>
              <p className="text-zinc-200 text-base md:text-lg font-sans font-medium leading-relaxed">{problemsData[activeProblem].issue}</p>
            </div>

            <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/40" />
              <span className="text-emerald-400 text-xs md:text-sm font-mono tracking-wider uppercase font-bold">Our Design Solution</span>
              <p className="text-zinc-200 text-base md:text-lg font-sans leading-relaxed">{problemsData[activeProblem].solution}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InformationArchitectureWidget = () => {
  const [activeLink, setActiveLink] = useState(null);

  return (
    <div className="w-full relative">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-ia-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-ia-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-ia-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 168, 128, 0.15);
          border-radius: 10px;
        }
        .custom-ia-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 168, 128, 0.4);
        }
      `}} />

      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">
          ✦ Interactive IA Flowchart
        </span>
        <span className="text-[10px] md:text-xs font-sans text-[#c5a880]/80 animate-pulse flex items-center gap-1.5 font-semibold">
          <span>Hover over highlighted nodes to trace flow connectors</span>
          <span>➔</span>
        </span>
      </div>

      <div className="flex flex-nowrap overflow-x-auto gap-6 pb-6 pt-2 scroll-smooth custom-ia-scrollbar relative">
        {/* Step 1: Onboarding */}
        <div className={`w-[290px] md:w-[320px] shrink-0 bg-[#141413] border rounded-[20px] p-5 transition-all duration-300 ${
          activeLink === 'onboarding-to-homescreen'
            ? 'border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.1)]'
            : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <span className="text-xs font-mono text-[#c5a880] font-bold">FLOW 01</span>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider font-sans">Onboarding & Auth</h5>
          </div>
          
          <div className="space-y-3 font-sans text-xs md:text-sm">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[#c5a880] font-bold block mb-1">Onboarding</span>
              <div className="pl-3 border-l border-zinc-700 space-y-1 text-zinc-400">
                <div>└ Choose role (student/teacher)</div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[#c5a880] font-bold block mb-1">Login / Signup</span>
              <div className="pl-3 border-l border-zinc-700 space-y-1.5 text-zinc-400">
                <div>├── Enter college email & verify ID</div>
                <div>├── Allow app permissions</div>
                <div className="pt-1">
                  <span className="text-zinc-300 font-semibold block text-[11px]">Signup Option:</span>
                  <span className="text-[10px] block pl-2 text-zinc-400">Sign Up ➔ Ask edu email ➔ Verify ➔ Done</span>
                </div>
                <div className="pt-1">
                  <span className="text-zinc-300 font-semibold block text-[11px]">Login Option:</span>
                  <span className="text-[10px] block pl-2 text-zinc-400">Login ➔ Ask email ➔ Verify ➔ Done</span>
                </div>
              </div>
            </div>

            <div 
              onMouseEnter={() => setActiveLink('onboarding-to-homescreen')}
              onMouseLeave={() => setActiveLink(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeLink === 'onboarding-to-homescreen'
                  ? 'bg-[#c5a880]/10 border-[#c5a880]'
                  : 'bg-white/5 border-white/5 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#c5a880] font-bold">Profile Setup</span>
                <span className="text-[10px] bg-[#c5a880]/20 text-[#c5a880] px-1.5 py-0.5 rounded font-mono font-bold animate-pulse">➔ HOME</span>
              </div>
              <div className="pl-3 border-l border-zinc-700 text-zinc-400 mt-1">
                <div>└── Vehicle description</div>
              </div>
            </div>
          </div>
        </div>

        {/* Connector Column 1 */}
        <div className="flex items-center justify-center shrink-0">
          <span className="text-zinc-700 font-mono text-xl">➔</span>
        </div>

        {/* Step 2: Homescreen */}
        <div className={`w-[290px] md:w-[320px] shrink-0 bg-[#141413] border transition-all duration-300 rounded-[20px] p-5 ${
          activeLink === 'scan-to-rideflow' || activeLink === 'reserve-to-rideflow'
            ? 'border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.1)]'
            : activeLink === 'onboarding-to-homescreen'
              ? 'border-emerald-500/30 bg-[#28c840]/5'
              : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <span className="text-xs font-mono text-[#c5a880] font-bold">FLOW 02</span>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider font-sans">Homescreen Map</h5>
          </div>

          <div className="space-y-3 font-sans text-xs md:text-sm">
            <div 
              onMouseEnter={() => setActiveLink('scan-to-rideflow')}
              onMouseLeave={() => setActiveLink(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeLink === 'scan-to-rideflow'
                  ? 'bg-emerald-950/40 border-emerald-500'
                  : 'bg-white/5 border-white/5 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Scan QR Code</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">➔ RIDE</span>
              </div>
              <div className="pl-3 border-l border-zinc-700 text-zinc-400 mt-1">
                <div>└── Success Screen</div>
              </div>
            </div>

            <div 
              onMouseEnter={() => setActiveLink('reserve-to-rideflow')}
              onMouseLeave={() => setActiveLink(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeLink === 'reserve-to-rideflow'
                  ? 'bg-emerald-950/40 border-emerald-500'
                  : 'bg-white/5 border-white/5 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Reserve a Ride</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">➔ RIDE</span>
              </div>
              <div className="pl-3 border-l border-zinc-700 text-zinc-400 mt-1">
                <div>└── 5-Min Reserv Timer</div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[#c5a880] font-bold block mb-1">Search Docks</span>
              <div className="pl-3 border-l border-zinc-700 text-zinc-400">
                <div>└── Show battery status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Connector Column 2 */}
        <div className="flex items-center justify-center shrink-0">
          <span className="text-zinc-700 font-mono text-xl">➔</span>
        </div>

        {/* Step 3: Profile Settings */}
        <div className="w-[290px] md:w-[320px] shrink-0 bg-[#141413] border border-white/10 rounded-[20px] p-5">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <span className="text-xs font-mono text-[#c5a880] font-bold">FLOW 03</span>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider font-sans">Profile & Settings</h5>
          </div>

          <div className="space-y-3 font-sans text-xs md:text-sm">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-[#c5a880]">✦</span>
                <span>Ride History & Receipts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c5a880]">✦</span>
                <span>Help / Support Center</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c5a880]">✦</span>
                <span>Wallet / Campus Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c5a880]">✦</span>
                <span>Account & App Settings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connector Column 3 */}
        <div className="flex items-center justify-center shrink-0">
          <span className="text-zinc-700 font-mono text-xl">➔</span>
        </div>

        {/* Step 4: Rideflow */}
        <div className={`w-[290px] md:w-[320px] shrink-0 bg-[#141413] border transition-all duration-300 rounded-[20px] p-5 ${
          activeLink === 'scan-to-rideflow' || activeLink === 'reserve-to-rideflow'
            ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
            : activeLink === 'rideflow-to-summary'
              ? 'border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.1)]'
              : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <span className="text-xs font-mono text-[#c5a880] font-bold">FLOW 04</span>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider font-sans">Active Ride Flow</h5>
          </div>

          <div className="space-y-3 font-sans text-xs md:text-sm">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white font-bold block mb-1">Ride HUD</span>
              <div className="pl-3 border-l border-zinc-700 text-zinc-400">
                <div>└── Live Stats (timer + distance)</div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white font-bold block mb-1">Navigation</span>
              <div className="pl-3 border-l border-zinc-700 text-zinc-400">
                <div>└── GPS Route to target dock</div>
              </div>
            </div>

            <div 
              onMouseEnter={() => setActiveLink('rideflow-to-summary')}
              onMouseLeave={() => setActiveLink(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeLink === 'rideflow-to-summary'
                  ? 'bg-[#c5a880]/10 border-[#c5a880]'
                  : 'bg-white/5 border-white/5 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#c5a880] font-bold">End Ride Trigger</span>
                <span className="text-[10px] bg-[#c5a880]/20 text-[#c5a880] px-1.5 py-0.5 rounded font-mono font-bold">➔ SUMMARY</span>
              </div>
              <div className="pl-3 border-l border-zinc-700 text-zinc-400 mt-1.5 space-y-1.5">
                <div>
                  <span className="text-emerald-400 font-semibold block text-[11px]">If Dock Available:</span>
                  <span className="block pl-2 text-[10px]">Lock Bike ➔ End Rental</span>
                </div>
                <div>
                  <span className="text-red-400 font-semibold block text-[11px]">If Dock Full:</span>
                  <span className="block pl-2 text-[10px]">Nearby Docks / Waitlist / Byp-Alert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connector Column 4 */}
        <div className="flex items-center justify-center shrink-0">
          <span className="text-zinc-700 font-mono text-xl">➔</span>
        </div>

        {/* Step 5: Post Ride Summary */}
        <div className={`w-[290px] md:w-[320px] shrink-0 bg-[#141413] border transition-all duration-300 rounded-[20px] p-5 ${
          activeLink === 'rideflow-to-summary'
            ? 'border-[#c5a880] bg-[#c5a880]/5'
            : 'border-white/10'
        }`}>
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <span className="text-xs font-mono text-[#c5a880] font-bold">FLOW 05</span>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider font-sans">Post-Ride Summary</h5>
          </div>

          <div className="space-y-3 font-sans text-xs md:text-sm">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-[#c5a880]">✦</span>
                <span>Ride Summary & Invoice</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c5a880]">✦</span>
                <span>Rate Ride & Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">✦</span>
                <span className="text-red-300 font-semibold">Report a Vehicle/Dock Issue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-12 bottom-6 w-16 bg-gradient-to-l from-[#1e1e1e] to-transparent pointer-events-none" />
    </div>
  );
};

const HighFidelityGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, show: false });
  const [lensEnabled, setLensEnabled] = useState(false);
  const containerRef = useRef(null);

  const screensData = [
    { title: "Bike Map & GPS", image: "/rydr-screenshot-1.png", icon: "🗺️" },
    { title: "Active Ride HUD", image: "/rydr-tracker.png", icon: "🚲" },
    { title: "Ride Paused HUD", image: "/rydr-screenshot-2.png", icon: "⏸️" },
    { title: "Bike Reserved Confirmation", image: "/rydr-screenshot-5.png", icon: "✅" },
    { title: "Rules & Agreements", image: "/rydr-rules.png", icon: "📜" },
    { title: "Final Ride Summary", image: "/rydr-summary.png", icon: "🏁" },
    { title: "Welcome & Onboarding", image: "/rydr-onboarding.png", icon: "👋" },
    { title: "Dock Search & Filter", image: "/rydr-rider-search.png", icon: "🔍" }
  ];

  const GridContent = ({ isLensLayer = false }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
      {screensData.map((screen, i) => (
        <PhoneFrame 
          key={i} 
          label={screen.title} 
          disableHover={isLensLayer || lensEnabled}
        >
          <img 
            src={screen.image} 
            alt={screen.title} 
            className="w-full h-full object-fill bg-[#1C1C1E]" 
          />
        </PhoneFrame>
      ))}
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 my-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-full bg-[#28C840]/10 text-[#28C840] border border-[#28C840]/20">
            <MonitorSmartphone size={24} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">High Fidelity Designs</h2>
            <p className="text-[#28C840] font-mono text-sm mt-1">
              {lensEnabled 
                ? "Move your mouse over the screens to use the magnifying lens →" 
                : "A clean overview of all 8 final Rydr screens →"}
            </p>
          </div>
        </div>

        <div className="flex items-center bg-[#252526] border border-vscode-border rounded-md p-1 self-start md:self-auto ml-auto">
          <button
            onClick={() => setLensEnabled(false)}
            title="Standard Grid View"
            className={`p-2 rounded-sm transition-all duration-300 ${!lensEnabled ? 'bg-[#28C840] text-white shadow-sm' : 'text-vscode-textDark hover:text-white hover:bg-[#3C3C3C]'}`}
          >
            <Layout size={18} />
          </button>
          <button
            onClick={() => setLensEnabled(true)}
            title="Lens Inspector View"
            className={`p-2 rounded-sm transition-all duration-300 ${lensEnabled ? 'bg-[#28C840] text-white shadow-sm' : 'text-vscode-textDark hover:text-white hover:bg-[#3C3C3C]'}`}
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className={`relative ${lensEnabled ? 'cursor-none' : ''}`}
        onMouseMove={(e) => {
          if (!containerRef.current || !lensEnabled) return;
          const rect = containerRef.current.getBoundingClientRect();
          setMousePos({ 
            x: e.clientX - rect.left, 
            y: e.clientY - rect.top, 
            show: true 
          });
        }}
        onMouseLeave={() => setMousePos(p => ({ ...p, show: false }))}
      >
        <GridContent />

        <AnimatePresence>
          {lensEnabled && mousePos.show && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
              style={{
                clipPath: `circle(160px at ${mousePos.x}px ${mousePos.y}px)`
              }}
            >
              <div 
                className="absolute inset-0 bg-[#1E1E1E]"
                style={{
                  transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
                  transform: 'scale(1.8)'
                }}
              >
                <GridContent isLensLayer={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const RedesignedScreens = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="relative border border-vscode-border bg-[#252526] rounded-3xl shadow-2xl overflow-hidden w-full min-h-[520px] flex flex-col justify-start">
        
        <div className="grid grid-cols-2 bg-[#1E1E1E] border-b border-vscode-border w-full relative z-10">
          <button
            onClick={() => setActiveTab(0)}
            className={`py-4 px-4 font-sans text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative ${
              activeTab === 0
                ? "bg-[#252526] text-white border-b-2 border-[#28C840] scale-[1.01]"
                : "text-vscode-textDark hover:text-white"
            }`}
          >
            <span className="truncate">1. Station Discovery</span>
          </button>
          
          <button
            onClick={() => setActiveTab(1)}
            className={`py-4 px-4 font-sans text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative ${
              activeTab === 1
                ? "bg-[#252526] text-white border-b-2 border-[#28C840] scale-[1.01]"
                : "text-vscode-textDark hover:text-white"
            }`}
          >
            <span className="truncate">2. Active In-Ride HUD</span>
          </button>
        </div>

        <div className="p-6 md:p-8 flex-grow flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="redesign-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="px-3.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs rounded-full uppercase tracking-wider font-semibold">Evolution 1</span>
                    <h4 className="text-white font-extrabold text-2xl font-sans tracking-tight leading-tight">Finding Docks & Bikes</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 space-y-2">
                      <span className="text-red-400 text-xs font-mono uppercase font-bold block">Legacy App Flow:</span>
                      <p className="text-vscode-text text-sm font-sans">
                        Students had to search via search input and guess where the nearest dock was, resulting in long walk errors.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#28C840]/5 border border-[#28C840]/10 space-y-2">
                      <span className="text-[#28C840] text-xs font-mono uppercase font-bold block">Redesigned Hub:</span>
                      <p className="text-vscode-text text-sm font-sans">
                        A live interactive campus map showing exactly how many bikes are docked, their battery charge, and walk routes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#1E1E1E]/50 rounded-2xl border border-vscode-border/50 w-full">
                  <span className="font-mono text-[10px] text-vscode-textDark uppercase tracking-widest mb-4 font-semibold">Visual Evolution</span>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full justify-items-center">
                    <div className="flex flex-col items-center space-y-3 w-full max-w-[210px]">
                      <div className="relative border-4 border-red-500/20 rounded-[38px] p-1.5 bg-[#09090B] shadow-2xl w-full">
                        <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                          <img src="/rydr-rider-search.png" alt="Before: list view" className="w-full h-full object-fill" />
                        </div>
                      </div>
                      <span className="text-red-400 font-mono text-xs tracking-wider uppercase font-semibold text-center">Before: Text Search</span>
                    </div>

                    <div className="flex flex-col items-center space-y-3 w-full max-w-[210px]">
                      <div className="relative border-4 border-[#28C840]/20 rounded-[38px] p-1.5 bg-[#09090B] shadow-2xl w-full">
                        <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                          <img src="/rydr-screenshot-1.png" alt="After: map view" className="w-full h-full object-fill" />
                        </div>
                      </div>
                      <span className="text-[#28C840] font-mono text-xs tracking-wider uppercase font-semibold text-center">After: Live Map Docks</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="redesign-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="px-3.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs rounded-full uppercase tracking-wider font-semibold">Evolution 2</span>
                    <h4 className="text-white font-extrabold text-2xl font-sans tracking-tight leading-tight">In-Ride Control HUD</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 space-y-2">
                      <span className="text-red-400 text-xs font-mono uppercase font-bold block">Legacy App Flow:</span>
                      <p className="text-vscode-text text-sm font-sans">
                        Basic counter timer which didn't show safety rules, pause locks, or live battery remaining.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#28C840]/5 border border-[#28C840]/10 space-y-2">
                      <span className="text-[#28C840] text-xs font-mono uppercase font-bold block">Redesigned Hub:</span>
                      <p className="text-vscode-text text-sm font-sans">
                        Comprehensive HUD featuring live battery tracking, easy pause lock, geofence alarm alerts, and a help button.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#1E1E1E]/50 rounded-2xl border border-vscode-border/50 w-full">
                  <span className="font-mono text-[10px] text-vscode-textDark uppercase tracking-widest mb-4 font-semibold">Visual Evolution</span>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full justify-items-center">
                    <div className="flex flex-col items-center space-y-3 w-full max-w-[210px]">
                      <div className="relative border-4 border-red-500/20 rounded-[38px] p-1.5 bg-[#09090B] shadow-2xl w-full">
                        <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                          <img src="/rydr-screenshot-2.png" alt="Before: simple timer" className="w-full h-full object-fill" />
                        </div>
                      </div>
                      <span className="text-red-400 font-mono text-xs tracking-wider uppercase font-semibold text-center">Before: Basic Timer</span>
                    </div>

                    <div className="flex flex-col items-center space-y-3 w-full max-w-[210px]">
                      <div className="relative border-4 border-[#28C840]/20 rounded-[38px] p-1.5 bg-[#09090B] shadow-2xl w-full">
                        <div className="w-full aspect-[9/19.5] rounded-[28px] overflow-hidden relative border border-zinc-800">
                          <img src="/rydr-tracker.png" alt="After: e-bike tracker" className="w-full h-full object-fill" />
                        </div>
                      </div>
                      <span className="text-[#28C840] font-mono text-xs tracking-wider uppercase font-semibold text-center">After: Interactive HUD</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const PersonaShowcase = () => {
  const personas = [
    {
      name: "Ashika Priya",
      role: "Student Commuter",
      avatar: "/ashika_avatar.png",
      details: [
        { label: "Age", value: "21" },
        { label: "Education", value: "Final year design student" },
        { label: "Status", value: "Single" },
        { label: "Occupation", value: "Full time student" },
        { label: "Location", value: "Lives in PG" },
        { label: "Tech Literacy", value: "High" }
      ],
      quote: "I'm used to online services — I even shop on Instagram. I want something just as easy when I move around campus.",
      personality: ["Organized", "Independent", "Resourceful", "Active"],
      bio: "Ashika is a 21-year-old design student in her final year. She's always busy — running between classes, labs, and college events. She often carries big design stuff and needs to move fast. Her schedule is full, and she likes being in control of her time.",
      needs: [
        "Get to class quickly when she's late",
        "Avoid walking long distances every day",
        "Find something quick and easy to use without planning ahead",
        "Not waste time in the heat or rain",
        "Prefer something affordable or part of campus life"
      ],
      frustrations: [
        "Wastes a lot of time walking between far-off classrooms and studios",
        "Carries heavy design materials which makes walking uncomfortable",
        "Feels drained after busy days filled with classes, clubs, and project work"
      ],
      struggle: "I carry more stuff than a moving van.",
      favSpots: ["Design Lab", "Amphitheatre"],
      devices: [
        { type: "Laptop", icon: "💻" },
        { type: "Mobile", icon: "📱" }
      ]
    },
    {
      name: "Dr. Meena Kumari",
      role: "Faculty Commuter",
      avatar: "/dr_meena_avatar.png",
      details: [
        { label: "Age", value: "38" },
        { label: "Education", value: "Assistant professor" },
        { label: "Status", value: "Married" },
        { label: "Occupation", value: "Assistant professor" },
        { label: "Location", value: "Lives in staff quarters" },
        { label: "Tech Literacy", value: "Not much" }
      ],
      quote: "I use apps for everything — meetings, reminders, even groceries. If there's a smooth way to get around campus, I'm in.",
      personality: ["Calm", "Disciplined", "Focused", "Efficient"],
      bio: "Dr. Meena is a 38-year-old assistant professor. She teaches in different blocks and moves a lot during the day. She doesn't like walking too much, especially in the heat. She likes things to be simple, smooth, and on time.",
      needs: [
        "Reach lecture halls on time across departments",
        "Avoid getting tired walking across a big campus",
        "Prefer a clean, reliable way to move during hot or rainy days",
        "Manage her time well between teaching and meetings",
        "Have access to something simple, not too modern or complex"
      ],
      frustrations: [
        "Has to walk long distances between lectures in different blocks",
        "Hot or rainy weather makes movement across campus uncomfortable",
        "No easy transport option for quick and regular travel within campus"
      ],
      struggle: "Why are all my classes in opposite ends of the campus?",
      favSpots: ["Admin Staff Room", "Library"],
      devices: [
        { type: "Laptop", icon: "💻" },
        { type: "Mobile", icon: "📱" }
      ]
    }
  ];

  return (
    <div className="w-full space-y-16">
      {personas.map((p, idx) => (
        <div key={idx} className="space-y-6">
          {/* Section Subtitle */}
          <div className="flex items-center gap-3">
            <span className="text-xl">{idx === 0 ? "🎓" : "👩‍🏫"}</span>
            <h4 className="text-[#c5a880] font-sans font-bold text-lg md:text-xl">
              {idx === 0 ? "Primary Persona: Student" : "Secondary Persona: Faculty"}
            </h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Side: Profile Card (col-span-4) */}
            <div className="lg:col-span-4 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[32px] p-6 space-y-6 flex flex-col justify-between shadow-2xl">
              <div className="text-center space-y-4">
                <h3 className="text-white font-sans font-bold text-2xl tracking-tight">{p.name}</h3>
                
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-[#c5a880]/30 shadow-lg">
                  <img 
                    src={p.avatar} 
                    alt={p.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-xs font-bold text-[#c5a880] font-sans uppercase tracking-wider">
                  {p.role}
                </span>
              </div>

              {/* Profile Attributes List */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                {p.details.map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm font-sans">
                    <span className="text-zinc-500 uppercase tracking-wider font-mono text-xs">
                      {detail.label}
                    </span>
                    <span className="text-zinc-200 font-semibold text-right max-w-[200px] truncate font-sans text-sm">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Personality Tags */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Personality</span>
                <div className="flex flex-wrap gap-1.5">
                  {p.personality.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-lg bg-[#141413]/40 border border-white/5 text-xs text-zinc-300 font-sans font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-4 bg-[#141413]/60 border border-white/5 rounded-2xl relative">
                <span className="text-[#c5a880] text-4xl font-serif absolute -top-1 left-2 opacity-30">“</span>
                <p className="text-zinc-300 italic text-sm font-sans leading-relaxed pl-4 pr-2">
                  {p.quote}
                </p>
              </div>
            </div>

            {/* Right Side: Bento Grid Cards (col-span-8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Bio (Full width span 2) */}
              <div className="md:col-span-2 p-6 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[24px] space-y-3">
                <h4 className="text-[#c5a880] font-sans font-bold text-sm uppercase tracking-wider border-b border-white/5 pb-2">Bio</h4>
                <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed">
                  {p.bio}
                </p>
              </div>

              {/* Card 2: Core Needs */}
              <div className="p-6 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[24px] space-y-4">
                <h4 className="text-[#c5a880] font-sans font-bold text-sm uppercase tracking-wider border-b border-white/5 pb-2">Core Needs</h4>
                <ul className="space-y-2.5">
                  {p.needs.map((need, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm md:text-base font-sans text-zinc-300">
                      <span className="text-[#c5a880] mt-0.5">•</span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3: Frustrations */}
              <div className="p-6 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[24px] space-y-4">
                <h4 className="text-[#c5a880] font-sans font-bold text-sm uppercase tracking-wider border-b border-white/5 pb-2">Frustrations</h4>
                <ul className="space-y-2.5">
                  {p.frustrations.map((frust, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm md:text-base font-sans text-zinc-300">
                      <span className="text-[#FF5F56] mt-0.5">•</span>
                      <span>{frust}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 4: Biggest Campus Struggle (Full width span 2) */}
              <div className="md:col-span-2 p-5 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[24px] flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FF5F56] uppercase tracking-widest font-bold">Biggest Campus Struggle</span>
                  <p className="text-white font-sans text-base md:text-lg font-semibold">
                    "{p.struggle}"
                  </p>
                </div>
                <span className="text-4xl filter saturate-75">😫</span>
              </div>

              {/* Card 5: Favourite Spot */}
              <div className="p-6 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[24px] space-y-3">
                <h4 className="text-[#c5a880] font-sans font-bold text-sm uppercase tracking-wider border-b border-white/5 pb-2">Favourite Spots</h4>
                <ul className="space-y-2">
                  {p.favSpots.map((spot, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm md:text-base font-sans text-zinc-300">
                      <span className="text-[#28C840]">📍</span>
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 6: Device Used Mostly */}
              <div className="p-6 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[24px] space-y-3">
                <h4 className="text-[#c5a880] font-sans font-bold text-sm uppercase tracking-wider border-b border-white/5 pb-2">Devices Used</h4>
                <div className="flex gap-4">
                  {p.devices.map((dev, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141413]/60 border border-white/5">
                      <span className="text-xl">{dev.icon}</span>
                      <span className="text-zinc-300 font-sans text-sm font-semibold">{dev.type}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          {idx === 0 && <div className="border-t border-[#c5a880]/15 my-12" />}
        </div>
      ))}
    </div>
  );
};

const RydrCaseStudy = ({ onClose }) => {
  const [activeTestTab, setActiveTestTab] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#161513] overflow-y-auto overflow-x-hidden shadow-2xl case-study-overlay"
      style={{
        backgroundImage: 'radial-gradient(rgba(197, 168, 128, 0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        backgroundAttachment: 'local'
      }}
    >
      {/* Navbar */}
      <div className="sticky top-0 z-[110] bg-[#161513]/85 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group font-sans text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>
        <div className="text-zinc-500 text-sm font-semibold tracking-wider uppercase hidden md:block">Rydr / Case Study</div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.35em] uppercase text-accent mb-4">
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="inline-block">✦</motion.span>
            02 ✦ FEATURED CASE STUDY
          </div>
          <h1 className="font-black uppercase leading-[0.85] text-[clamp(2.5rem,7.5vw,6rem)] flex flex-col mb-8 tracking-tighter select-none">
            <span style={{
              background: 'linear-gradient(110deg, #ffffff 30%, #e5dfd5 60%, #c5a880 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} className="inline-block">RYDR</span>
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 border border-[#c5a880]/15 bg-[#141413] rounded-[24px] font-sans text-sm shadow-2xl relative overflow-hidden">
            <div>
              <span className="text-zinc-500 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">Role</span>
              <span className="text-white font-bold">UI/UX Design</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">Timeline</span>
              <span className="text-white font-bold">3 Weeks</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">Context</span>
              <span className="text-white font-bold">Academic Project</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">Team</span>
              <span className="text-white font-bold">Solo Project</span>
            </div>
          </div>

          {/* 5-Phone Stacked Hero for Rydr */}
          <div className="relative h-[550px] md:h-[720px] flex items-center justify-center mb-8 overflow-hidden">
            {/* Background glow */}
            <div className="absolute w-[600px] h-[500px] bg-vscode-accent/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Phone 1 - Far left: Bike Reserved */}
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ rotate: -8, x: -30, scale: 1.02 }}
              className="absolute w-[160px] md:w-[230px] rounded-[24px] overflow-hidden border-[5px] border-[#3C3C3C] shadow-[0_25px_50px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 z-[5]"
              style={{ left: 'calc(50% - 370px)', top: '12%', rotate: -14 }}
            >
              <img src="/rydr-screenshot-5.png" alt="Rydr Bike Reserved" className="w-full h-auto" />
            </motion.div>

            {/* Phone 2 - Left: User Map Docks */}
            <motion.div 
              initial={{ opacity: 0, x: -40, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: -7 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ rotate: -3, x: -15, scale: 1.02 }}
              className="absolute w-[180px] md:w-[260px] rounded-[26px] overflow-hidden border-[6px] border-[#3C3C3C] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 z-10"
              style={{ left: 'calc(50% - 260px)', top: '6%' }}
            >
              <img src="/rydr-screenshot-1.png" alt="Rydr Map Docks" className="w-full h-auto" />
            </motion.div>

            {/* Phone 3 - Center: Ride Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="relative w-[220px] md:w-[300px] rounded-[32px] overflow-hidden border-[7px] border-[#3C3C3C] shadow-[0_40px_80px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-500 z-30"
            >
              <img src="/rydr-summary.png" alt="Rydr Ride Summary" className="w-full h-auto" />
            </motion.div>

            {/* Phone 4 - Right: User Ride Paused */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotate: 15 }}
              animate={{ opacity: 1, x: 0, rotate: 7 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              whileHover={{ rotate: 3, x: 15, scale: 1.02 }}
              className="absolute w-[180px] md:w-[260px] rounded-[26px] overflow-hidden border-[6px] border-[#3C3C3C] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 z-10"
              style={{ right: 'calc(50% - 260px)', top: '6%' }}
            >
              <img src="/rydr-screenshot-2.png" alt="Rydr Ride Paused" className="w-full h-auto" />
            </motion.div>

            {/* Phone 5 - Far right: Rules Agreement */}
            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ rotate: 8, x: 30, scale: 1.02 }}
              className="absolute w-[160px] md:w-[230px] rounded-[24px] overflow-hidden border-[5px] border-[#3C3C3C] shadow-[0_25px_50px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 z-[5]"
              style={{ right: 'calc(50% - 370px)', top: '12%', rotate: 14 }}
            >
              <img src="/rydr-rules.png" alt="Rydr Rules Agreement" className="w-full h-auto" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <Section title="Project Overview" icon={Lightbulb}>
          <p className="text-xl md:text-2xl leading-relaxed">
            <span className="text-vscode-accent font-semibold">Rydr is a smart campus micro-mobility ecosystem</span> designed specifically for college campuses. By offering a network of dock-based shared electric bikes, Rydr bridges the gap between classes, hostels, and amenities, giving students a simple, reliable, and highly affordable transportation solution that seamlessly fits into campus life.
          </p>
        </Section>

        {/* Problem & Research Goals */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <CollapsibleCard
            color="#EF4444"
            label="01"
            title="Problem Statement"
          >
            Most Indian college campuses are large, with long distances between classes, hostels, and facilities. Students often waste time walking or struggle without personal transport. Current bike rental apps aren't designed for campus life or student needs. There’s a need for a simple, affordable, and student-friendly mobility solution inside campuses.
          </CollapsibleCard>

          <CollapsibleCard
            color="#10B981"
            label="02"
            title="Research Goal"
          >
            Our objective was to understand campus transit habits, map frequent student route bottlenecks, evaluate Yulu/city app flaws in closed campus environments, and design a custom student-friendly electric bike-sharing application.
          </CollapsibleCard>
        </div>

        {/* Target Audience */}
        <Section title="Target Audience" icon={Users}>
          <TargetAudienceWidget />
        </Section>

        {/* User Behaviour & Habits */}
        <Section title="User Behaviour & Habits" icon={Compass}>
          <UserBehaviourWidget />
        </Section>

        {/* How Might We (HMW) Sticky Notes */}
        <Section title="How Might We" icon={Target}>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { text: "How might we make sure a student rushing to a 9 AM class always finds a bike nearby?", delay: 0.1 },
              { text: "How might we prevent bikes from cluttering campus walkways without making parking a chore?", delay: 0.15 },
              { text: "How might we eliminate 'battery anxiety' so students never unlock a dead bike?", delay: 0.2 },
              { text: "How might we design a student pass that costs less than a daily cup of coffee?", delay: 0.25 },
              { text: "How might we keep campus walkways safe and walking-friendly during peak rush hours?", delay: 0.3 },
            ].map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: note.delay }}
                className="bg-[#1e1d1b] border border-[#c5a880]/15 hover:border-[#c5a880]/30 rounded-2xl p-5 shadow-xl w-full sm:w-[230px] min-h-[160px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#c5a880]/5"
              >
                <p className="text-[#f7f5f0]/90 font-sans text-xs md:text-sm leading-relaxed font-normal">{note.text}</p>
                <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                  <span className="text-[#c5a880] text-[9px] font-bold tracking-wider uppercase">HMW {i + 1}</span>
                  <span className="text-[#c5a880] text-sm">✦</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Research Methods" icon={Search}>
          <div className="w-full p-8 md:p-10 bg-[#1e1d1b] border border-[#c5a880]/15 rounded-[32px] shadow-2xl space-y-6">
            {[
              { title: "Field Research", desc: "Observed walkway congestion, commuter behavior, and campus transit bottlenecks first-hand." },
              { title: "Competitive Study", desc: "Analyzed existing micro-mobility networks (like Yulu, Zypp, and EVeez) to understand pricing models and docking dynamics." },
              { title: "Secondary Research", desc: "Reviewed global micro-mobility case studies (such as Mo Cycle and SmartBike) tailored to university campus frameworks." }
            ].map((method, idx) => (
              <div key={idx} className="flex items-start space-x-4 text-left">
                <span className="text-[#c5a880] mt-1.5 text-base flex-shrink-0">✦</span>
                <div>
                  <h4 className="text-white font-sans font-bold text-lg md:text-xl mb-1">{method.title}</h4>
                  <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Secondary Research Case Studies */}
        <Section title="Secondary Research Case Studies" icon={Search}>
          <SecondaryResearchShowcase />
        </Section>

        <Section title="Affinity Mapping Insights" icon={Compass}>
          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-zinc-300 font-sans max-w-4xl">
              Since the proposed Rydr system is new, user research was grounded in observing **existing campus commute behaviors** and auditing **public feedback/complaints regarding commercial apps (like Yulu)**. Clustering these observations on an Affinity Board revealed three distinct friction areas:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
              {/* Category 1: Campus Commute Bottlenecks */}
              <div className="p-6 bg-[#1a1917]/40 border border-[#c5a880]/10 rounded-[28px] space-y-6 flex flex-col justify-start">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <h4 className="text-white font-bold font-sans text-xs tracking-wider uppercase">Campus Commute Frictions</h4>
                </div>
                <div className="space-y-5">
                  {[
                    { text: "Hostels completely run out of transit options by 8:45 AM ahead of morning lectures.", bg: "#fef9c3", textCol: "#422006", rot: "-2deg" },
                    { text: "Commuters pile up around primary lecture halls, creating severe hallway congestion.", bg: "#fef9c3", textCol: "#422006", rot: "1.5deg" },
                    { text: "Students walk long distances in extreme heat because class transition windows are too short.", bg: "#fef9c3", textCol: "#422006", rot: "-1deg" }
                  ].map((note, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 10 }}
                      className="p-5 shadow-[4px_6px_12px_rgba(0,0,0,0.35)] rounded-sm flex flex-col justify-between aspect-square w-full max-w-[210px] mx-auto transition-all duration-200 cursor-pointer"
                      style={{ 
                        backgroundColor: note.bg, 
                        transform: `rotate(${note.rot})`,
                      }}
                    >
                      <p className="font-sans text-xs md:text-sm font-semibold leading-relaxed" style={{ color: note.textCol }}>
                        "{note.text}"
                      </p>
                      <span className="text-[9px] font-sans font-bold opacity-30 mt-4 block text-right" style={{ color: note.textCol }}>✦ Field Observation</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Category 2: Legacy App Pain Points */}
              <div className="p-6 bg-[#1a1917]/40 border border-[#c5a880]/10 rounded-[28px] space-y-6 flex flex-col justify-start">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                  <h4 className="text-white font-bold font-sans text-xs tracking-wider uppercase">Legacy App Frictions (e.g. Yulu)</h4>
                </div>
                <div className="space-y-5">
                  {[
                    { text: "Riders scan and unlock active cycles only to discover the battery is dead.", bg: "#e0f2fe", textCol: "#0369a1", rot: "1deg" },
                    { text: "Invisible geofencing lines penalize riders without warning during drop-offs.", bg: "#e0f2fe", textCol: "#0369a1", rot: "-1.5deg" },
                    { text: "Commercial pricing models don't fit student budgets for quick 5-minute rides.", bg: "#e0f2fe", textCol: "#0369a1", rot: "2deg" }
                  ].map((note, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 10 }}
                      className="p-5 shadow-[4px_6px_12px_rgba(0,0,0,0.35)] rounded-sm flex flex-col justify-between aspect-square w-full max-w-[210px] mx-auto transition-all duration-200 cursor-pointer"
                      style={{ 
                        backgroundColor: note.bg, 
                        transform: `rotate(${note.rot})`,
                      }}
                    >
                      <p className="font-sans text-xs md:text-sm font-semibold leading-relaxed" style={{ color: note.textCol }}>
                        "{note.text}"
                      </p>
                      <span className="text-[9px] font-sans font-bold opacity-30 mt-4 block text-right" style={{ color: note.textCol }}>✦ App Review</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Category 3: Pathway & Safety Hazards */}
              <div className="p-6 bg-[#1a1917]/40 border border-[#c5a880]/10 rounded-[28px] space-y-6 flex flex-col justify-start">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <h4 className="text-white font-bold font-sans text-xs tracking-wider uppercase">Pathway & Safety Hazards</h4>
                </div>
                <div className="space-y-5">
                  {[
                    { text: "Dockless drop-offs litter narrow walking pathways, blocking wheelchair access.", bg: "#d1fae5", textCol: "#065f46", rot: "-1.5deg" },
                    { text: "High vehicle speeds in pedestrian-only zones create safety concerns.", bg: "#d1fae5", textCol: "#065f46", rot: "2deg" },
                    { text: "Riders fail to report physical vehicle damages, leaving broken bikes active in the fleet.", bg: "#d1fae5", textCol: "#065f46", rot: "-0.5deg" }
                  ].map((note, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 10 }}
                      className="p-5 shadow-[4px_6px_12px_rgba(0,0,0,0.35)] rounded-sm flex flex-col justify-between aspect-square w-full max-w-[210px] mx-auto transition-all duration-200 cursor-pointer"
                      style={{ 
                        backgroundColor: note.bg, 
                        transform: `rotate(${note.rot})`,
                      }}
                    >
                      <p className="font-sans text-xs md:text-sm font-semibold leading-relaxed" style={{ color: note.textCol }}>
                        "{note.text}"
                      </p>
                      <span className="text-[9px] font-sans font-bold opacity-30 mt-4 block text-right" style={{ color: note.textCol }}>✦ Safety Audit</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Expectations vs Complaints */}
        <Section title="Student Expectations vs. App Complaints" icon={ShieldAlert}>
          <ExpectationsVsComplaints />
        </Section>

        {/* User Persona Section */}
        <Section title="User Persona" icon={Users}>
          <PersonaShowcase />
        </Section>

        {/* User Journey Map */}
        <Section title="User Journey Map" icon={Compass}>
          <JourneyMap />
        </Section>

        {/* Competitive Analysis */}
        <Section title="Competitive Analysis" icon={Target}>
          <CompetitiveAnalysis />
        </Section>

        {/* SWOT Analysis */}
        <Section title="SWOT Analysis" icon={Lightbulb}>
          <SwotAnalysis />
        </Section>

        {/* College Concerns & Safety Compliance */}
        <Section title="College Concerns & Policy Compliance" icon={ShieldAlert}>
          <CollegeConcernsWidget />
        </Section>

        {/* Gap & Opportunity Areas */}
        <Section title="Gaps & Opportunity Areas" icon={ShieldAlert}>
          <GapAnalysis />
        </Section>

        {/* Identified Problems & Solutions Dashboard */}
        <Section title="Identified Problems & Solutions" icon={ShieldAlert}>
          <ProblemsDashboard />
        </Section>

        {/* Design Architecture */}
        <Section title="Design & Architecture" icon={Layout}>
          <div className="space-y-12">
            <div>
              <h4 className="text-white font-bold mb-6 font-sans text-xl">Information Architecture</h4>
              
              <InformationArchitectureWidget />
            </div>

            <StyleGuide />
          </div>
        </Section>

        {/* High Fidelity Grid */}
        <HighFidelityGrid />

        {/* User Usability Testing */}
        <Section title="Usability Testing" icon={Users}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-vscode-border bg-[#252526] p-2 shadow-2xl">
              <div className="p-8 bg-[#1e1e1e] border border-vscode-border rounded-lg text-center space-y-4">
                <span className="text-5xl block animate-pulse">🧪</span>
                <span className="text-white font-bold block font-sans">Usability Testing Session</span>
                <p className="text-xs text-vscode-textDark leading-relaxed font-mono">Tested 12 active campus commuters across 2 iterations to calculate cognitive friction during peak lecture intervals.</p>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-6 font-sans">
              <h4 className="text-white font-bold text-2xl">Refining the Mobility Flow</h4>
              <p className="text-vscode-text text-base leading-relaxed">
                Putting our interactive prototypes directly in front of students revealed key friction points. Rushing between classes makes students impatient; they need transit decisions made in under 3 seconds.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1E1E1E] border border-vscode-border rounded-xl p-4">
                  <span className="text-vscode-accent font-mono text-xs block mb-1">METHOD</span>
                  <span className="text-white font-bold text-sm">Task Walkthroughs</span>
                </div>
                <div className="bg-[#1E1E1E] border border-vscode-border rounded-xl p-4">
                  <span className="text-vscode-accent font-mono text-xs block mb-1">PARTICIPANTS</span>
                  <span className="text-white font-bold text-sm">12 Students</span>
                </div>
                <div className="bg-[#1E1E1E] border border-vscode-border rounded-xl p-4">
                  <span className="text-vscode-accent font-mono text-xs block mb-1">KPI METRIC</span>
                  <span className="text-white font-bold text-sm">Time to Match</span>
                </div>
              </div>
            </div>
          </div>

          {/* Usability Findings Segmented Dashboard */}
          <div className="w-full">
            <div className="relative border border-vscode-border bg-[#252526] rounded-3xl shadow-2xl overflow-hidden w-full min-h-[460px] flex flex-col justify-start">
              
              <div className="grid grid-cols-2 bg-[#1E1E1E] border-b border-vscode-border w-full relative z-10">
                <button
                  onClick={() => setActiveTestTab(0)}
                  className={`py-4 px-4 font-sans text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative ${
                    activeTestTab === 0
                      ? "bg-[#252526] text-white border-b-2 border-vscode-accent scale-[1.01]"
                      : "text-vscode-textDark hover:text-white"
                  }`}
                >
                  <span>1. Map Interface Clarity</span>
                </button>
                
                <button
                  onClick={() => setActiveTestTab(1)}
                  className={`py-4 px-4 font-sans text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 relative ${
                    activeTestTab === 1
                      ? "bg-[#252526] text-white border-b-2 border-vscode-accent scale-[1.01]"
                      : "text-vscode-textDark hover:text-white"
                  }`}
                >
                  <span>2. Safety & Trust Signals</span>
                </button>
              </div>

              <div className="p-6 md:p-8 flex-grow flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                  {activeTestTab === 0 && (
                    <motion.div
                      key="test-tab-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
                    >
                      <div className="lg:col-span-6 space-y-6">
                        <span className="px-3.5 py-1 bg-vscode-accent/15 border border-vscode-accent/30 text-vscode-accent font-mono text-xs rounded-full uppercase tracking-wider font-semibold">Finding 1</span>
                        <h4 className="text-white font-bold text-2xl font-sans leading-tight">Unified Map Over separate tabs</h4>
                        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                          <span className="text-red-400 text-xs font-mono block mb-1">PROBLEM OBSERVED</span>
                          <p className="text-vscode-text text-sm">"I hated toggling between separate screens to compare shuttle schedules against carpool drivers. I just wanted to see what's closer."</p>
                        </div>
                        <div className="p-4 bg-[#10B981]/5 border border-[#10B981]/10 rounded-xl">
                          <span className="text-[#10B981] text-xs font-mono block mb-1">DESIGN FIX</span>
                          <p className="text-vscode-text text-sm">We redesigned the map to display BOTH shuttle route vectors and peer-car pool vehicles in a single interactive map screen.</p>
                        </div>
                      </div>
                      <div className="lg:col-span-6 p-6 bg-[#1E1E1E]/50 rounded-2xl border border-vscode-border text-center">
                        <span className="text-3xl block mb-2">⚡</span>
                        <span className="text-white font-bold block font-sans">45% Commute Speed Improvement</span>
                        <span className="text-vscode-textDark text-xs font-mono">Consolidating routes saved students key decision time during transitions.</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTestTab === 1 && (
                    <motion.div
                      key="test-tab-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
                    >
                      <div className="lg:col-span-6 space-y-6">
                        <span className="px-3.5 py-1 bg-vscode-accent/15 border border-vscode-accent/30 text-vscode-accent font-mono text-xs rounded-full uppercase tracking-wider font-semibold">Finding 2</span>
                        <h4 className="text-white font-bold text-2xl font-sans leading-tight">Elevating verification Badges</h4>
                        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                          <span className="text-red-400 text-xs font-mono block mb-1">PROBLEM OBSERVED</span>
                          <p className="text-vscode-text text-sm">"Getting into a stranger's car on campus makes me hesitant unless I know they are definitely a student here."</p>
                        </div>
                        <div className="p-4 bg-[#10B981]/5 border border-[#10B981]/10 rounded-xl">
                          <span className="text-[#10B981] text-xs font-mono block mb-1">DESIGN FIX</span>
                          <p className="text-vscode-text text-sm">Introduced a clear verified student badge next to driver profiles and displayed their college major and mutual dormitory connections.</p>
                        </div>
                      </div>
                      <div className="lg:col-span-6 p-6 bg-[#1E1E1E]/50 rounded-2xl border border-vscode-border text-center">
                        <span className="text-3xl block mb-2">🔒</span>
                        <span className="text-white font-bold block font-sans">96% Student Trust Rating</span>
                        <span className="text-vscode-textDark text-xs font-mono">Explicit safety signals and EDU verification eliminated ridesharing hesitation.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Section>

        {/* Redesigned Screens */}
        <Section title="Redesigned Screens" icon={Layout}>
          <RedesignedScreens />
        </Section>

        {/* Risk Analysis */}
        <Section title="Risk Analysis: How Might It Fail?" icon={ShieldAlert}>
          <RiskAnalysisWidget />
        </Section>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-vscode-border flex justify-between items-center text-vscode-textDark font-mono text-sm">
          <span>End of Case Study</span>
          <button onClick={onClose} className="text-vscode-accent hover:text-white transition-colors">Return to Portfolio</button>
        </div>
      </div>
    </motion.div>
  );
};

export default RydrCaseStudy;
