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
    { name: "Own Bicycles", rate: "20%", icon: "🚲" },
    { name: "Shared Cycles", rate: "15%", icon: "🚲" },
    { name: "Shuttle Bus", rate: "40%", icon: "🚌" },
    { name: "Find Scooty", rate: "12%", icon: "🛵" },
    { name: "Manual Rental", rate: "8%", icon: "🔑" }
  ];

  return (
    <div className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 my-8 shadow-xl">
      <h4 className="text-white font-bold text-lg font-sans mb-6">Current Campus Transit Habits & Alternatives</h4>
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex gap-2 border-b border-vscode-border pb-3">
            {habits.map((h, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === i ? 'bg-[#28C840] text-white' : 'text-vscode-textDark hover:text-white'}`}
              >
                {h.icon} {h.title}
              </button>
            ))}
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-xl border border-vscode-border min-h-[140px] flex flex-col justify-between">
            <p className="text-vscode-text text-sm leading-relaxed font-sans">{habits[activeTab].details}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-[10px] font-mono text-vscode-textDark uppercase">Observed Challenge</span>
              <span className="px-2 py-0.5 bg-[#FF5F56]/10 text-[#FF5F56] rounded text-[10px] font-bold font-mono">{habits[activeTab].metric}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3">
          <h5 className="text-vscode-textDark font-mono text-xs uppercase tracking-wider">What Students Do Now (Overlap %)</h5>
          <div className="space-y-2">
            {currentAlternatives.map((alt, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#1E1E1E] px-3 py-2 rounded-lg border border-vscode-border">
                <span className="text-lg">{alt.icon}</span>
                <span className="text-white font-sans text-xs flex-grow font-semibold">{alt.name}</span>
                <span className="text-[#28C840] font-mono text-xs font-bold">{alt.rate}</span>
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
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      title: "BBSR Mo Cycle",
      source: "TelegraphIndia",
      metric: "120 stations • 1,220 bikes",
      desc: "Covers approximately 40 sq. km inside Bhubaneswar. Managed directly by CRUT (Capital Region Urban Transport).",
      bullets: [
        "Bicycles are equipped with GPS tracking and smart ring locks",
        "Provides utility baskets and adjustable seats for students",
        "High dock network density bridges the gap between educational hubs"
      ],
      color: "#28C840"
    },
    {
      title: "Chandigarh PBS System",
      source: "Hindustan Times & Indian Express",
      metric: "574 stations • 5,000 bikes",
      desc: "One of India's largest automated Public Bicycle Sharing (PBS) systems, initiated in December 2020.",
      bullets: [
        "Fully automated system managed via SmartBike app",
        "Operated by Smart Bike Mobility Pvt Ltd under a 10-year PPP model",
        "Enables seamless locate, unlock, and lock operations for students"
      ],
      color: "#3B82F6"
    },
    {
      title: "Abroad Campus Sharing",
      source: "UC Berkeley, UW, Cambridge",
      metric: "Global Benchmarks",
      desc: "Large global universities use dedicated bike-sharing systems to enable fluid intra-campus transportation.",
      bullets: [
        "Specialized bike parking spots reduce corridor and pathway clutter",
        "Provides affordable monthly student passes & regular vehicle inspections",
        "Students can locate & pick/drop anywhere inside geofenced areas using apps"
      ],
      color: "#F59E0B"
    }
  ];

  return (
    <div className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 my-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-vscode-border">
        <div>
          <h4 className="text-white font-bold text-lg font-sans">Secondary Research Case Studies</h4>
          <p className="text-vscode-textDark text-xs font-mono">Analyzing successful public & campus transit models</p>
        </div>
        <div className="flex gap-2">
          {cases.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCase(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all border ${
                activeCase === i 
                  ? 'bg-vscode-accent text-white border-transparent' 
                  : 'text-vscode-textDark border-vscode-border hover:text-white'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#1E1E1E] text-vscode-text font-mono text-[10px] rounded uppercase border border-vscode-border">Source: {cases[activeCase].source}</span>
            <span className="text-xs font-mono text-vscode-textDark font-bold">{cases[activeCase].metric}</span>
          </div>

          <h3 className="text-white font-bold text-2xl font-sans">{cases[activeCase].title}</h3>
          <p className="text-vscode-text text-sm leading-relaxed font-sans">{cases[activeCase].desc}</p>
          
          <ul className="space-y-2.5 pt-2">
            {cases[activeCase].bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs font-sans text-vscode-text">
                <span className="w-1.5 h-1.5 rounded-full bg-vscode-accent mt-1.5 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 bg-[#1E1E1E] border border-vscode-border rounded-xl p-6 text-center space-y-4 shadow-inner">
          <div className="w-16 h-16 rounded-full bg-vscode-accent/10 border border-vscode-accent/20 flex items-center justify-center text-3xl mx-auto">
            🚲
          </div>
          <div>
            <span className="text-[10px] font-mono text-vscode-textDark uppercase block">System Highlight</span>
            <span className="text-white font-bold font-sans text-sm block mt-1">Smart Tracking & Locks</span>
            <p className="text-vscode-textDark text-[11px] leading-relaxed font-mono mt-2">
              GPS tracking, auto-locking, and mobile app integrations form the foundation of modern campus micro-mobility.
            </p>
          </div>
        </div>
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
      <div className="p-6 bg-[#252526] border border-vscode-border rounded-xl shadow-lg">
        <h4 className="text-white font-bold font-sans text-base mb-4 flex items-center gap-2 text-[#28C840]">
          <span>🌟</span> Student Commute Expectations
        </h4>
        <ul className="space-y-3">
          {expectations.map((exp, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-sans text-vscode-text">
              <span className="text-[#28C840] shrink-0 font-bold font-mono">✓</span>
              <span>{exp}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 bg-[#252526] border border-vscode-border rounded-xl shadow-lg">
        <h4 className="text-white font-bold font-sans text-base mb-4 flex items-center gap-2 text-[#FF5F56]">
          <span>⚠️</span> Legacy App Complaints (e.g. Yulu)
        </h4>
        <ul className="space-y-3">
          {complaints.map((comp, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-sans text-vscode-text">
              <span className="text-[#FF5F56] shrink-0 font-bold font-mono">✕</span>
              <span>{comp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Features contrast widget: Normal vs Rydr Standout
const FeaturesComparisonWidget = () => {
  const standardFeatures = [
    "User Registration", "Bike Locator Map", "QR Code Unlock",
    "Real-Time Tracking", "Ride History Log", "Payment Options",
    "Ride Timer & Distance", "In-App Support Chat", "Safety Tips & Rules",
    "Battery Status Indicator", "Multi-Language Support"
  ];

  const rydrStandout = [
    { name: "Group Booking for Friends", desc: "Unlock up to 3 bikes simultaneously from a single account for group travel." },
    { name: "In-App Issue & Block Bike", desc: "Instantly report safety issues with photos to disable and lock the bike for servicing." },
    { name: "Emergency Contact Button", desc: "SOS button in active ride HUD to instantly alert campus security guards." },
    { name: "Restricted Riding Hours", desc: "Auto-disable booking during late night hours (11 PM - 5 AM) for campus safety." },
    { name: "Geofenced Speed Limiter", desc: "Enforces a strict 10-15 km/h limit in pedestrian zones to avoid accidents." }
  ];

  return (
    <div className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 my-8 shadow-xl">
      <h4 className="text-white font-bold text-lg font-sans mb-6">Features Offered vs. Rydr Standout Additions</h4>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <span className="text-vscode-textDark font-mono text-xs uppercase tracking-wider block mb-2">Normal Features Offered</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {standardFeatures.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#1E1E1E] px-3 py-2 rounded border border-vscode-border text-xs text-vscode-text font-sans">
                <span className="text-zinc-500 font-mono">●</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-vscode-accent font-mono text-xs uppercase tracking-wider block mb-2">Rydr Standout Features (Exclusive)</span>
          <div className="space-y-3">
            {rydrStandout.map((feat, i) => (
              <div key={i} className="bg-[#1E1E1E] border border-vscode-border border-l-2 border-l-[#28C840] p-3 rounded-lg shadow-sm">
                <span className="text-white font-sans text-xs font-bold block">{feat.name}</span>
                <p className="text-vscode-textDark text-[11px] font-sans leading-relaxed mt-1">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
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
      problem: "Adoption drop: hard to use app, or bikes aren't easily available",
      mitigation: "1-tap QR scanning bypasses menu navigation. Peak demand rebalancing routes managed by admin."
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
      problem: "Payment quit: rides too expensive or payment fails",
      mitigation: "Extremely affordable campus-specific pricing with prepaid monthly passes and zero security deposits."
    },
    {
      problem: "App ignores busy class timings and student habit models",
      mitigation: "Heatmap tracking positions vehicles automatically near dorms in the morning, and lecture halls at noon."
    }
  ];

  return (
    <div className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 my-8 shadow-xl">
      <h4 className="text-white font-bold text-lg font-sans mb-6">Risk Analysis: How Might It Fail & Rydr Mitigations</h4>
      <div className="space-y-4">
        {risks.map((risk, i) => (
          <div key={i} className="grid md:grid-cols-12 gap-4 bg-[#1E1E1E] p-4 rounded-xl border border-vscode-border hover:border-vscode-accent/30 transition-colors">
            <div className="md:col-span-5 flex items-start gap-2.5">
              <span className="text-[#FF5F56] shrink-0 text-xs mt-0.5 font-bold font-mono">Risk {i+1}</span>
              <span className="text-white font-sans text-xs md:text-sm font-semibold">{risk.problem}</span>
            </div>
            <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-vscode-border/50 pt-2.5 md:pt-0 md:pl-4 flex items-start gap-2.5">
              <span className="text-[#28C840] font-bold text-xs mt-0.5 font-mono">Mitigation</span>
              <p className="text-vscode-text font-sans text-xs md:text-sm leading-relaxed">{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// College Concerns
const CollegeConcernsWidget = () => {
  return (
    <div className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 my-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] rounded-full">
          <span>🛡️</span>
        </div>
        <h4 className="text-white font-bold text-lg font-sans">College Administration Concerns & Safety Compliance</h4>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-[#1E1E1E] rounded-lg border border-vscode-border">
          <span className="text-white font-bold font-sans text-sm block mb-1">Accident Prevention</span>
          <p className="text-vscode-textDark font-sans text-xs leading-relaxed">
            Speed limits capped strictly at **10-15 km/h** inside pedestrian zones to ensure safety of walking students and faculty.
          </p>
        </div>
        <div className="p-4 bg-[#1E1E1E] rounded-lg border border-vscode-border">
          <span className="text-white font-bold font-sans text-sm block mb-1">Designated Parking</span>
          <p className="text-vscode-textDark font-sans text-xs leading-relaxed">
            Specific paths and geofenced zones prevent bikes from cluttering lawns, blocking entries, or causing property damage.
          </p>
        </div>
        <div className="p-4 bg-[#1E1E1E] rounded-lg border border-vscode-border">
          <span className="text-white font-bold font-sans text-sm block mb-1">Regular Maintenance</span>
          <p className="text-vscode-textDark font-sans text-xs leading-relaxed">
            Scheduled checks by operations teams ensure tyres, smart ring locks, and brake cables remain fully compliant with safety policies.
          </p>
        </div>
      </div>
    </div>
  );
};

// Interactive Journey Map with clickable stages for Rydr
const journeyData = [
  { label: "Locating", emoji: "🔍", color: "#3B82F6", goal: "Find a bike nearby", action: "Opens app, scans map for nearest bike dock", touchpoint: "Map Hub Screen", pain: "Bikes are scattered or canteens are empty during class peaks.", fix: "Structured docking zones with real-time stock indicators." },
  { label: "Inspecting", emoji: "🔋", color: "#F59E0B", goal: "Verify battery and status", action: "Checks selected bike's charge level in app", touchpoint: "Bike Info Details", pain: "Walking to a bike only to find a low charge or a flat tire.", fix: "Trust-building icons (Green Check = serviced, Lightning = charged)." },
  { label: "Unlocking", emoji: "🔓", color: "#10B981", goal: "Unlock bike instantly", action: "Scans QR code on handlebar", touchpoint: "In-App Scanner", pain: "QR code is scratched, dirty, or unreadable.", fix: "Manual Bike ID text input fallback and UV-laminated stickers." },
  { label: "Riding", emoji: "🚲", color: "#28C840", goal: "Navigate campus safely", action: "Pedals to class with e-bike assist", touchpoint: "Active Ride HUD", pain: "Pedestrian collision risks in busy corridors.", fix: "Strict 10-15 km/h campus speed cap and geofenced zones." },
  { label: "Parking", emoji: "🅿️", color: "#8B5CF6", goal: "Find open parking spot", action: "Arrives at target dock, checks open slots", touchpoint: "End Ride Screen", pain: "Target docking station is full, cannot return bike.", fix: "Redirects to nearest dock with 5-min grace period or overflow standby." },
  { label: "Locking", emoji: "🔒", color: "#EC4899", goal: "End ride securely", action: "Locks physical ring lock & submits review", touchpoint: "Ride Summary Screen", pain: "Forgot to lock or charged extra due to lag.", fix: "Auto-end ride on physical dock lock confirmation." },
];

const JourneyMap = () => {
  const [active, setActive] = useState(0);
  const stage = journeyData[active];

  return (
    <div>
      <div className="relative flex items-center justify-between mb-8 overflow-x-auto py-4 hide-scrollbar">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-vscode-border -translate-y-1/2 z-0 min-w-[500px]" />
        
        {journeyData.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative z-10 flex flex-col items-center gap-2 group flex-shrink-0 px-2"
          >
            <span className={`text-2xl md:text-4xl transition-transform duration-300 ${active === i ? 'scale-125' : 'scale-100 opacity-60 group-hover:opacity-100'}`}>
              {s.emoji}
            </span>
            <span 
              className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold font-sans transition-all duration-300 whitespace-nowrap"
              style={{ 
                backgroundColor: active === i ? s.color : 'transparent',
                color: active === i ? '#fff' : '#888',
                border: active === i ? 'none' : '1px solid #444',
              }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[360px] md:min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-[#252526] border border-vscode-border rounded-xl p-6 md:p-8 absolute w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{stage.emoji}</span>
              <div>
                <h4 className="text-white font-bold text-xl font-sans">{stage.label} Stage</h4>
                <p className="text-vscode-textDark text-sm font-mono">Stage {active + 1} of 6</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-4 bg-[#1E1E1E] rounded-lg">
                  <div className="text-xs font-mono text-vscode-accent mb-1 uppercase">🎯 Goal</div>
                  <p className="text-white font-sans text-sm">{stage.goal}</p>
                </div>
                <div className="p-4 bg-[#1E1E1E] rounded-lg">
                  <div className="text-xs font-mono text-vscode-accent mb-1 uppercase">⚡ Action</div>
                  <p className="text-vscode-text font-sans text-sm">{stage.action}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border" style={{ backgroundColor: '#FF5F5610', borderColor: '#FF5F5630' }}>
                  <div className="text-xs font-mono text-[#FF5F56] mb-1 uppercase">😤 Pain Point</div>
                  <p className="text-vscode-text font-sans text-sm">{stage.pain}</p>
                </div>
                <div className="p-4 rounded-lg border" style={{ backgroundColor: '#28C84010', borderColor: '#28C84030' }}>
                  <div className="text-xs font-mono text-[#28C840] mb-1 uppercase">✨ Realignment Fix</div>
                  <p className="text-vscode-text font-sans text-sm">{stage.fix}</p>
                </div>
              </div>
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
    "City e-bike apps (Yulu) lack presence in closed educational campuses and ignore student pricing constraints.",
    "Dockless systems lead to scattered, damaged bikes blocking pathways, violating college code-of-conduct.",
    "Bikes are often left with depleted batteries or hidden damage, frustrating students running late.",
    "No integrated student-only reporting mechanism that locks down unsafe bikes instantly for repair."
  ];

  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-vscode-border shadow-2xl overflow-hidden font-mono mt-8">
      <div className="flex bg-[#252526] border-b border-vscode-border text-xs overflow-x-auto hide-scrollbar">
        <div className="px-4 py-3 border-b-2 border-vscode-accent text-white uppercase tracking-wider whitespace-nowrap">
          Campus Commute Gaps <span className="ml-2 bg-[#FF5F56]/20 text-[#FF5F56] px-1.5 rounded-full">{gaps.length}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-1">
        {gaps.map((gap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="flex items-start gap-3 py-3 px-3 hover:bg-[#2A2D2E] rounded cursor-pointer group"
          >
            <ShieldAlert size={16} className="text-[#F59E0B] mt-0.5 shrink-0 group-hover:text-[#FF5F56] transition-colors" />
            <div className="flex-1">
              <span className="text-[#F59E0B] group-hover:text-[#FF5F56] mr-2 transition-colors">Gap {i+1}:</span>
              <span className="text-vscode-text text-sm font-sans">{gap}</span>
            </div>
            <div className="text-vscode-textDark text-xs shrink-0 font-mono hidden md:block">
              IA-Prtcl {i * 14 + 102}
            </div>
          </motion.div>
        ))}
      </div>
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
    <div className="bg-[#1E1E1E] rounded-xl border border-vscode-border shadow-2xl overflow-hidden relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-[#1E1E1E] z-20 p-4 border-b border-vscode-border font-mono text-xs text-vscode-textDark uppercase w-48 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
                Feature
              </th>
              {allComps.map((comp, i) => (
                <th 
                  key={i} 
                  className={`p-4 border-b border-vscode-border font-sans font-bold text-sm ${comp.isOurs ? 'text-vscode-accent bg-[#252526]' : 'text-white'}`}
                >
                  {comp.name}
                  {comp.isOurs && <div className="h-1 w-full bg-vscode-accent absolute top-0 left-0"></div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compFeatures.map((feat, fi) => (
              <tr key={fi} className="hover:bg-[#252526] transition-colors group">
                <td className="sticky left-0 bg-[#1E1E1E] z-20 p-4 border-b border-vscode-border font-sans text-sm font-medium text-white shadow-[4px_0_12px_rgba(0,0,0,0.5)] group-hover:bg-[#252526] transition-colors">
                  {feat}
                </td>
                {allComps.map((comp, ci) => (
                  <td 
                    key={ci} 
                    className={`p-4 border-b border-vscode-border font-sans text-xs md:text-sm leading-relaxed ${comp.isOurs ? 'text-white bg-[#252526]' : 'text-vscode-text'}`}
                  >
                    {comp.data[fi]}
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
    { hex: "#28C840", name: "Rydr Green", role: "Primary Brand / Active state" },
    { hex: "#3B82F6", name: "Electric Blue", role: "Map Docks / Live GPS tracking" },
    { hex: "#EF4444", name: "Alert Crimson", role: "Low Battery / Forbidden perimeter" },
    { hex: "#F59E0B", name: "Amber Zone", role: "Restricted Speed Limit notifications" },
    { hex: "#252526", name: "Slate Grey", role: "UI Card panels and header backgrounds" },
    { hex: "#FAF9F5", name: "Bone White", role: "Mid-Fidelity Wireframe canvas borders" }
  ];

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="mt-16 border-t border-vscode-border pt-16">
      <h4 className="text-white font-bold mb-8 font-sans text-2xl md:text-3xl">Visual Style Guide</h4>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-[#252526] border border-vscode-border rounded-xl p-8 shadow-xl">
          <h5 className="text-white font-bold mb-6 font-sans text-lg flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] animate-pulse"></span>
            <span>Rydr Color Palette</span>
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div 
                key={color.hex} 
                onClick={() => handleCopy(color.hex)}
                className="group cursor-pointer flex flex-col space-y-3 p-3 bg-[#1e1e1e] border border-vscode-border rounded-lg hover:border-vscode-accent/50 transition-all duration-300 relative overflow-hidden"
              >
                <div 
                  className="w-full aspect-square rounded-md shadow-inner transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                
                <div className="flex flex-col">
                  <span className="text-white font-mono text-sm font-bold tracking-wider">{color.hex}</span>
                  <span className="text-vscode-textDark text-xs font-sans font-medium">{color.name}</span>
                </div>
                
                {copiedColor === color.hex && (
                  <div className="absolute inset-0 bg-[#28C840]/90 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest font-sans">
                    Copied!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#252526] border border-vscode-border rounded-xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h5 className="text-white font-bold mb-6 font-sans text-lg flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840] animate-pulse"></span>
              <span>Typography System</span>
            </h5>
            
            <div className="space-y-8">
              <div className="border-b border-vscode-border/50 pb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <h6 className="text-white text-2xl font-bold tracking-wide font-sans">
                    Outfit Sans
                  </h6>
                  <span className="text-[10px] font-mono bg-vscode-accent/10 text-vscode-accent px-2 py-0.5 rounded border border-vscode-accent/20">Brand Typography</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-5xl font-sans text-[#28C840]/20 select-none">
                    Aa
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-[#28C840] mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Used for primary headings, callouts, and key UI markers.</span>
                    </p>
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-[#28C840] mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Chosen for its rounded, student-friendly modern curves.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <h6 className="text-white text-xl font-bold tracking-wide font-sans font-medium">
                    DM Sans
                  </h6>
                  <span className="text-[10px] font-mono bg-vscode-accent/10 text-vscode-accent px-2 py-0.5 rounded border border-vscode-accent/20">System Typography</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-5xl font-bold text-[#28C840]/20 select-none font-sans">
                    Aa
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-[#28C840] mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Used for map status overlays, ETA updates, and settings lists.</span>
                    </p>
                    <p className="text-white/90 text-sm font-sans flex items-start space-x-2">
                      <span className="text-[#28C840] mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span>Provides highly legible text during fast running commutes.</span>
                    </p>
                  </div>
                </div>
              </div>
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
      icon: "🔧",
      issue: "How to maintain the vehicle fleet and prevent sudden breakdowns during busy hours?",
      solution: "Implement automatic vehicle tracking that flags a bike for a check-up after X rides or X kilometers. The docking rack displays an 'in maintenance' indicator and digitally locks the bike. A servicing van does weekly campus rounds."
    },
    {
      id: 2,
      title: "Charging & Batteries",
      icon: "🔋",
      issue: "How to ensure battery charge levels and avoid dead vehicles?",
      solution: "Equip bikes with swappable batteries swapped daily by operations. Design smart charging docks at key spots (hostels, canteens). If a bike falls below 20% charge, the backend flags it as unavailable and alerts staff."
    },
    {
      id: 3,
      title: "Theft Protection",
      icon: "🔒",
      issue: "How to prevent theft and unauthorized exits from campus bounds?",
      solution: "Integrate geofencing so bikes lock up and alert security if they cross the campus perimeter. Bikes feature a hidden GPS tracker in the frame and use digital app unlocks linked to verified student IDs (no manual keys)."
    },
    {
      id: 4,
      title: "Service Administration",
      icon: "👥",
      issue: "Who will handle regular servicing and support?",
      solution: "Operations are managed by a small dedicated team from the college maintenance department or a contracted vendor. Checkups are performed on a fixed schedule (every 2 weeks or after 120km traveled)."
    },
    {
      id: 5,
      title: "College Policies",
      icon: "📜",
      issue: "How to align with college policies and get administrative approval?",
      solution: "Present a detailed proposal covering geofencing boundaries, speed limits, and liability. Start with a 5-bike pilot phase to demonstrate safety and reliability. Define roles for administration, security, and vendors."
    },
    {
      id: 6,
      title: "Overcrowding & Idle Time",
      icon: "⏳",
      issue: "How to handle overcrowding at classrooms and idle bikes at hostels?",
      solution: "Position larger docking racks near high-demand zones. Use historic data to predict peak hours (e.g., 8-10 AM class start) and assign staff to rebalance bikes. Shorten maximum rental times to 30 mins during peak periods."
    },
    {
      id: 7,
      title: "Parking Limitations",
      icon: "🅿️",
      issue: "What happens when a student arrives at a completely full docking station?",
      solution: "The app redirects the user to the nearest open dock with a 5-minute grace period. Introduce overflow standby stands where bikes can be parked temporarily and locked digitally, alerting operations to pick them up."
    },
    {
      id: 8,
      title: "Defective Pickups",
      icon: "⚠️",
      issue: "How to prevent students from picking a damaged or flat-tire bike?",
      solution: "Incorporate quick post-ride feedback ('Did the ride go smoothly?'). If a bike is flagged twice, it is auto-disabled. Show visual trust icons on bikes (Green Check = Good, Red Triangle = Disabled/Flagged)."
    },
    {
      id: 9,
      title: "Damaged QR Codes",
      icon: "📱",
      issue: "What if a student cannot unlock a bike because the QR code sticker is damaged?",
      solution: "Laminate QR stickers with UV protection and print a prominent numeric Bike ID on the frame. Students can manually type this ID in the app to unlock the bike immediately."
    },
    {
      id: 10,
      title: "Data & Privacy",
      icon: "🛡️",
      issue: "How to secure student data and ride history?",
      solution: "Only collect essential information: student name, college email ID, and student ID. Encrypt all databases and integrate with college OTP login systems. Present a clear, human-readable data privacy terms popup."
    },
    {
      id: 11,
      title: "Misuse Control",
      icon: "🚫",
      issue: "How to handle reckless riding, vandalism, or hoarding?",
      solution: "Link every account to verified college credentials. Track riding behavior via internal sensors. Issue temporary bans or penalty fees for wrong-zone parking, and escalate persistent misuse to dean offices."
    }
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-8 bg-[#252526] border border-vscode-border rounded-xl p-6 shadow-xl">
      <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto max-h-[350px] gap-2 pr-2 hide-scrollbar pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-vscode-border/50">
        {problemsData.map((prob, idx) => (
          <button
            key={prob.id}
            onClick={() => setActiveProblem(idx)}
            className={`p-3 rounded-lg text-left font-sans text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-3 shrink-0 ${
              activeProblem === idx
                ? "bg-[#28C840] text-white shadow-md font-bold"
                : "bg-[#1E1E1E] text-vscode-textDark hover:text-white hover:bg-[#2A2D2E] border border-vscode-border/50"
            }`}
          >
            <span>{prob.icon}</span>
            <span className="truncate">{prob.title}</span>
          </button>
        ))}
      </div>

      <div className="lg:col-span-8 flex flex-col justify-between min-h-[250px]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{problemsData[activeProblem].icon}</span>
            <div>
              <span className="text-[10px] font-mono text-[#28C840] uppercase tracking-widest block font-bold">Identified Problem {problemsData[activeProblem].id} of 11</span>
              <h4 className="text-white font-bold text-lg font-sans">{problemsData[activeProblem].title}</h4>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl space-y-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/40" />
              <span className="text-red-400 text-[10px] font-mono tracking-wider uppercase font-bold">The Problem Issue</span>
              <p className="text-vscode-text text-sm font-sans">{problemsData[activeProblem].issue}</p>
            </div>

            <div className="p-4 bg-[#28C840]/5 border border-[#28C840]/10 rounded-xl space-y-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#28C840]/40" />
              <span className="text-[#28C840] text-[10px] font-mono tracking-wider uppercase font-bold">Our Design Solution</span>
              <p className="text-vscode-text text-sm font-sans">{problemsData[activeProblem].solution}</p>
            </div>
          </div>
        </div>
      </div>
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

// ==========================================
// MASSIVE DUAL-AGENT INTERACTIVE APP SIMULATOR
// ==========================================
const RydrSimulatorModal = ({ show, onClose }) => {
  const [screen, setScreen] = useState("welcome"); // welcome, select_role, rider_map, rider_route, rider_request, rider_loading, rider_hud, rider_complete, driver_setup, driver_loading, driver_hud, driver_complete
  const [activeTab, setActiveTab] = useState("shuttle"); // shuttle, carpool
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: "driver", text: "Hey! I'm parked at the Student Union fountain in the red Honda. Ready when you are." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [backpackRequired, setBackpackRequired] = useState(false);
  const [passengersRequested, setPassengersRequested] = useState(1);
  const [driverSeats, setDriverSeats] = useState(2);
  const [driverDestination, setDriverDestination] = useState("Science Quad");

  // Simulated Rider Booking Confirmation Waiter
  useEffect(() => {
    if (screen === "rider_loading") {
      const timer = setTimeout(() => {
        setScreen("rider_hud");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Simulated Driver Booking Confirmation Waiter
  useEffect(() => {
    if (screen === "driver_loading") {
      const timer = setTimeout(() => {
        setScreen("driver_hud");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: "rider", text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: "driver", text: "Sounds good, heading out in a minute!" }]);
    }, 1200);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-[#09090B]/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1E1E1E] border border-vscode-border rounded-[32px] w-full max-w-5xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-vscode-border bg-gradient-to-br from-[#252526] to-[#1E1E1E]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 bg-vscode-accent/20 border border-vscode-accent/30 text-vscode-accent font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Interactive Prototype</span>
              <button onClick={onClose} className="p-2 text-vscode-textDark hover:text-white rounded-full bg-[#1E1E1E]/80 border border-vscode-border/50 lg:hidden"><X size={16} /></button>
            </div>
            
            <div className="space-y-3 font-sans">
              <h3 className="text-white font-extrabold text-2xl md:text-3xl tracking-tight leading-tight">Rydr Live App Simulator</h3>
              <p className="text-vscode-textDark text-sm leading-relaxed">
                Test the actual user interface designed for both students seeking rides and drivers offering carpool space.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-vscode-border/50">
              <span className="text-[11px] font-mono uppercase tracking-widest text-vscode-accent font-bold">Simulator Controls</span>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { setScreen("rider_map"); setActiveTab("shuttle"); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">🚌</span>
                  <div>
                    <span className="font-bold block mt-1">Shuttle Tracker</span>
                    <span className="text-[9px] text-vscode-textDark">Campus transit lines</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setScreen("rider_map"); setActiveTab("carpool"); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">🚗</span>
                  <div>
                    <span className="font-bold block mt-1">Peer Pool list</span>
                    <span className="text-[9px] text-vscode-textDark">Rideshare bookings</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setScreen("driver_setup"); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">⚙️</span>
                  <div>
                    <span className="font-bold block mt-1">Driver setup</span>
                    <span className="text-[9px] text-vscode-textDark">Offer empty seats</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setScreen("welcome"); setChatMessages([{ sender: "driver", text: "Hey! I'm parked at the Student Union fountain in the red Honda. Ready when you are." }]); }} 
                  className="p-3 bg-[#1E1E1E] border border-vscode-border hover:border-vscode-accent/50 text-white rounded-xl text-left font-sans text-xs flex flex-col justify-between hover:scale-[1.02] transition-all"
                >
                  <span className="text-lg">🔄</span>
                  <div>
                    <span className="font-bold block mt-1">Reset HUD</span>
                    <span className="text-[9px] text-vscode-textDark">Restart simulator</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-vscode-border/50 hidden lg:flex items-center justify-between">
            <span className="text-xs text-vscode-textDark font-mono">Built by Nibedit (Solo)</span>
            <button 
              onClick={onClose} 
              className="px-5 py-2.5 bg-[#1E1E1E] border border-vscode-border hover:border-red-500/50 hover:bg-red-500/10 text-vscode-textDark hover:text-red-400 rounded-xl font-sans font-bold text-xs transition-all"
            >
              Exit Simulator
            </button>
          </div>
        </div>

        {/* Right Phone Display Panel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-[#09090B] relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2.5 text-vscode-textDark hover:text-white rounded-full bg-[#1E1E1E]/80 border border-vscode-border/50 hidden lg:block hover:scale-105 transition-transform"><X size={18} /></button>

          <div className="relative border-[8px] border-zinc-800 rounded-[48px] p-2 bg-[#000] shadow-[0_0_60px_rgba(0,102,204,0.18)] w-full max-w-[320px] aspect-[9/19.5] overflow-hidden flex flex-col justify-start relative select-none">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-zinc-900 rounded-full z-40 border border-zinc-800/80 flex items-center justify-end px-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse"></div>
            </div>
            
            <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#1A1A1E] relative flex flex-col justify-between pt-6 pb-4">
              
              <div className="px-5 py-1 flex items-center justify-between text-zinc-400 font-mono text-[9px] font-bold z-30 absolute top-0 w-full bg-[#1A1A1E]">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span>📶</span>
                  <span>5G</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* RENDER ACTIVE SCREEN */}
              <div className="flex-grow flex flex-col justify-between relative overflow-y-auto mt-2 h-full">
                
                {/* A. Welcome Splash */}
                {screen === "welcome" && (
                  <div className="flex flex-col justify-between h-full p-5 text-center bg-gradient-to-b from-[#252526] via-[#1E1E1E] to-[#0A0A0A]">
                    <div className="mt-16 space-y-4">
                      <div className="w-16 h-16 bg-[#3B82F6]/10 border-2 border-[#3B82F6]/30 rounded-2xl flex items-center justify-center mx-auto shadow-2xl relative">
                        <Navigation className="text-[#3B82F6]" size={32} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-extrabold text-3xl tracking-tight font-sans">Rydr</h4>
                        <span className="text-[#10B981] font-mono text-[10px] uppercase tracking-widest font-semibold block">Campus Commutes Simplified</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      <button
                        onClick={() => setScreen("select_role")}
                        className="w-full py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                      >
                        Find My Ride
                      </button>
                      <p className="text-vscode-textDark text-[9px] leading-relaxed">
                        Securely logs you in with your verified university credentials.
                      </p>
                    </div>
                  </div>
                )}

                {/* B. Select Role */}
                {screen === "select_role" && (
                  <div className="flex flex-col justify-between h-full p-5 bg-[#1E1E1E]">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-vscode-textDark font-mono text-[9px] uppercase font-bold tracking-widest">CHOOSE PROFILE</span>
                        <h5 className="text-white font-bold text-lg font-sans leading-tight">Are you commuting or offering a seat?</h5>
                      </div>

                      <div className="space-y-4">
                        <button 
                          onClick={() => { setScreen("rider_map"); setActiveTab("shuttle"); }}
                          className="w-full p-4 bg-[#252526] border border-vscode-border hover:border-[#3B82F6]/50 rounded-xl text-left flex items-start gap-4 transition-all"
                        >
                          <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg">
                            <Bus size={20} />
                          </div>
                          <div>
                            <span className="text-white font-bold text-xs block font-sans">I am a Commuter</span>
                            <span className="text-[9px] text-vscode-textDark">Check shuttles & book peer seats</span>
                          </div>
                        </button>

                        <button 
                          onClick={() => { setScreen("driver_setup"); }}
                          className="w-full p-4 bg-[#252526] border border-vscode-border hover:border-[#10B981]/50 rounded-xl text-left flex items-start gap-4 transition-all"
                        >
                          <div className="p-2.5 bg-[#10B981]/10 text-[#10B981] rounded-lg">
                            <Car size={20} />
                          </div>
                          <div>
                            <span className="text-white font-bold text-xs block font-sans">I am a Driver</span>
                            <span className="text-[9px] text-vscode-textDark">Offer empty car space to peers</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => setScreen("welcome")}
                      className="w-full py-2.5 bg-[#252526] text-vscode-textDark font-mono text-[9px] uppercase rounded-xl hover:text-white transition-colors"
                    >
                      ⬅ Back
                    </button>
                  </div>
                )}

                {/* C. Rider Map Hub */}
                {screen === "rider_map" && (
                  <div className="flex flex-col h-full bg-[#1E1E1E]">
                    {/* Simulated SVG/Canvas Map */}
                    <div className="h-44 bg-[#141416] relative border-b border-vscode-border flex items-center justify-center overflow-hidden">
                      {/* Grid representation */}
                      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                      
                      {/* Stylized Campus Paths */}
                      <svg className="absolute inset-0 w-full h-full text-zinc-800" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 0,50 Q 50,20 100,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3" />
                        <path d="M 50,0 Q 20,50 50,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3" />
                      </svg>

                      {/* Map Pins */}
                      <div className="absolute top-8 left-8 flex flex-col items-center">
                        <MapPin className="text-[#3B82F6] animate-bounce" size={14} />
                        <span className="text-[7px] text-zinc-500 font-bold bg-black/60 px-1 rounded">Union</span>
                      </div>
                      <div className="absolute bottom-6 right-10 flex flex-col items-center">
                        <MapPin className="text-[#10B981]" size={14} />
                        <span className="text-[7px] text-zinc-500 font-bold bg-black/60 px-1 rounded">Eng Quad</span>
                      </div>

                      {/* Moving Shuttle Representation */}
                      <motion.div 
                        animate={{ x: [0, 80, 0], y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute top-1/2 left-6 p-1 bg-[#3B82F6] text-white rounded-full shadow-lg z-10"
                      >
                        <Bus size={10} />
                      </motion.div>
                      
                      {/* Moving Car Representation */}
                      <motion.div 
                        animate={{ x: [60, -30, 60], y: [20, -10, 20] }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="absolute bottom-10 right-10 p-1 bg-[#10B981] text-white rounded-full shadow-lg z-10"
                      >
                        <Car size={10} />
                      </motion.div>

                      <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded-full text-[8px] text-zinc-400 font-mono">
                        GPS Active 🟢
                      </div>
                    </div>

                    {/* Mode Switcher */}
                    <div className="p-3 grid grid-cols-2 gap-2 bg-[#252526] border-b border-vscode-border">
                      <button 
                        onClick={() => setActiveTab("shuttle")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold font-sans transition-all ${activeTab === 'shuttle' ? 'bg-[#3B82F6] text-white shadow' : 'text-zinc-400 hover:text-white'}`}
                      >
                        🚌 Campus Shuttles
                      </button>
                      <button 
                        onClick={() => setActiveTab("carpool")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold font-sans transition-all ${activeTab === 'carpool' ? 'bg-[#10B981] text-white shadow' : 'text-zinc-400 hover:text-white'}`}
                      >
                        🚗 Peer Pool
                      </button>
                    </div>

                    {/* Listings feed */}
                    <div className="p-3 flex-grow overflow-y-auto max-h-[170px] space-y-2">
                      {activeTab === "shuttle" ? (
                        <>
                          <button 
                            onClick={() => { setSelectedRoute("Blue Route 1"); setScreen("rider_route"); }}
                            className="w-full p-2.5 bg-[#252526] border border-vscode-border hover:border-[#3B82F6]/50 rounded-xl text-left flex justify-between items-center transition-all group"
                          >
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[10px] block font-sans group-hover:text-[#3B82F6]">Blue Route 1 (North Loop)</span>
                              <span className="text-[8px] text-vscode-textDark font-mono flex items-center gap-1">
                                <Clock size={8} /> 2 mins away • Student Union Stop
                              </span>
                            </div>
                            <span className="px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] text-[8px] rounded font-bold font-mono">Seat OK</span>
                          </button>

                          <button 
                            onClick={() => { setSelectedRoute("Green Express"); setScreen("rider_route"); }}
                            className="w-full p-2.5 bg-[#252526] border border-vscode-border hover:border-[#3B82F6]/50 rounded-xl text-left flex justify-between items-center transition-all group"
                          >
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[10px] block font-sans group-hover:text-[#3B82F6]">Green Express (Science Hub)</span>
                              <span className="text-[8px] text-vscode-textDark font-mono flex items-center gap-1">
                                <Clock size={8} /> 8 mins away • Main Gym Stop
                              </span>
                            </div>
                            <span className="px-2 py-0.5 bg-[#EF4444]/15 text-[#EF4444] text-[8px] rounded font-bold font-mono">CROWDED</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => setScreen("rider_request")}
                            className="w-full p-2.5 bg-[#252526] border border-vscode-border hover:border-[#10B981]/50 rounded-xl text-left flex justify-between items-center transition-all group"
                          >
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[10px] block font-sans group-hover:text-[#10B981]">Dev K. • Black Civic</span>
                              <span className="text-[8px] text-vscode-textDark font-mono">Heading to Science Quad • Leaves in 3m</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#10B981]">Join ➔</span>
                          </button>

                          <button 
                            onClick={() => setScreen("rider_request")}
                            className="w-full p-2.5 bg-[#252526] border border-vscode-border hover:border-[#10B981]/50 rounded-xl text-left flex justify-between items-center transition-all group"
                          >
                            <div className="space-y-0.5">
                              <span className="text-white font-bold text-[10px] block font-sans group-hover:text-[#10B981]">Aria M. • Blue Tesla</span>
                              <span className="text-[8px] text-vscode-textDark font-mono">Heading to South Dorms • Leaves in 7m</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#10B981]">Join ➔</span>
                          </button>
                        </>
                      )}
                    </div>

                    <button 
                      onClick={() => setScreen("select_role")}
                      className="m-3 mt-0 py-2 bg-[#252526] text-vscode-textDark font-mono text-[9px] uppercase rounded-xl hover:text-white transition-colors"
                    >
                      ⬅ Back
                    </button>
                  </div>
                )}

                {/* D. Rider Shuttle Route Details */}
                {screen === "rider_route" && (
                  <div className="flex flex-col justify-between h-full p-4 bg-[#1E1E1E]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setScreen("rider_map")} className="text-[#3B82F6] font-bold text-xs">⬅ Back</button>
                        <span className="text-white font-bold text-xs">{selectedRoute} Tracker</span>
                      </div>

                      <div className="p-3 bg-[#252526] border border-vscode-border rounded-xl font-sans space-y-2">
                        <span className="text-[9px] font-mono text-zinc-500 block uppercase">ETA Summary</span>
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">Student Union Stop</span>
                          <span className="text-[#3B82F6] font-bold text-sm">2 mins</span>
                        </div>
                        <span className="text-[9px] text-[#10B981] font-mono block">🟢 Shuttle is running on time</span>
                      </div>

                      {/* Stops Timeline vertical */}
                      <div className="p-3 bg-[#252526]/50 border border-vscode-border rounded-xl space-y-4">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Route stop list</span>
                        <div className="space-y-4 pl-3 relative border-l border-zinc-700">
                          <div className="relative">
                            <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></div>
                            <span className="text-white font-sans text-[10px] block font-bold">Student Union (Next)</span>
                            <span className="text-[8px] text-zinc-500 font-mono">ETA 2m • Crowd level Low</span>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                            <span className="text-zinc-400 font-sans text-[10px] block">Engineering Building</span>
                            <span className="text-[8px] text-zinc-500 font-mono">ETA 6m • Crowd level Low</span>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                            <span className="text-zinc-400 font-sans text-[10px] block">Freshman Dorm Complex</span>
                            <span className="text-[8px] text-zinc-500 font-mono">ETA 12m • Crowd level Medium</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setScreen("rider_map")}
                      className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-bold text-xs rounded-xl"
                    >
                      Return to Map
                    </button>
                  </div>
                )}

                {/* E. Rider Request Rideshare Form */}
                {screen === "rider_request" && (
                  <div className="flex flex-col justify-between h-full p-4 bg-[#1E1E1E]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setScreen("rider_map")} className="text-[#10B981] font-bold text-xs">⬅ Back</button>
                        <span className="text-white font-bold text-xs">Request Ride-Pool</span>
                      </div>

                      {/* Driver Card */}
                      <div className="p-3 bg-[#252526] border border-vscode-border rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-lg">
                          👤
                        </div>
                        <div>
                          <span className="text-white font-bold text-xs block font-sans">Dev K. (Comp Sci Major)</span>
                          <span className="text-[8px] text-zinc-500 font-mono">Verified Student • ⭐️ 4.9 Rating</span>
                        </div>
                      </div>

                      {/* Form options */}
                      <div className="space-y-3 font-sans">
                        <div className="p-3 bg-[#252526] border border-vscode-border rounded-xl space-y-2">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase block">Destination Route</span>
                          <span className="text-white font-bold text-xs">Student Union ➔ Science Quad</span>
                        </div>

                        <div className="p-3 bg-[#252526] border border-vscode-border rounded-xl flex justify-between items-center">
                          <span className="text-white text-[10px] font-bold">Need space for a backpack?</span>
                          <input 
                            type="checkbox" 
                            checked={backpackRequired} 
                            onChange={(e) => setBackpackRequired(e.target.checked)} 
                            className="w-4 h-4 accent-[#10B981]" 
                          />
                        </div>

                        <div className="p-3 bg-[#252526] border border-vscode-border rounded-xl flex justify-between items-center">
                          <span className="text-white text-[10px] font-bold">Seats Required</span>
                          <div className="flex items-center gap-2.5">
                            <button onClick={() => setPassengersRequested(Math.max(1, passengersRequested - 1))} className="text-zinc-400 hover:text-white font-bold">-</button>
                            <span className="text-white font-bold text-xs">{passengersRequested}</span>
                            <button onClick={() => setPassengersRequested(Math.min(2, passengersRequested + 1))} className="text-zinc-400 hover:text-white font-bold">+</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setScreen("rider_loading")}
                      className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white font-sans font-bold text-xs rounded-xl shadow-lg"
                    >
                      Confirm Seat Request
                    </button>
                  </div>
                )}

                {/* F. Rider Loading Match */}
                {screen === "rider_loading" && (
                  <div className="flex flex-col items-center justify-center h-full p-5 text-center bg-[#1E1E1E] space-y-4">
                    <div className="w-12 h-12 border-4 border-t-[#10B981] border-[#252526] rounded-full animate-spin"></div>
                    <div>
                      <span className="text-vscode-accent font-mono text-[9px] uppercase font-bold tracking-widest block">Connecting you</span>
                      <h5 className="text-white font-bold text-xs font-sans">Awaiting Dev's approval...</h5>
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono">Securing peer verification channel...</span>
                  </div>
                )}

                {/* G. Rider Trip HUD & Chat */}
                {screen === "rider_hud" && (
                  <div className="flex flex-col justify-between h-full bg-[#1E1E1E]">
                    <div className="px-4 py-2 border-b border-vscode-border/50 bg-[#252526] flex items-center justify-between">
                      <span className="text-[#10B981] font-bold text-[10px] font-sans">Active Ride HUD</span>
                      <span className="px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] text-[8px] rounded-full font-mono font-bold">MATCHED</span>
                    </div>

                    {/* Driver details bar */}
                    <div className="p-3 bg-[#252526] border-b border-vscode-border flex justify-between items-center">
                      <div>
                        <span className="text-white font-bold text-[10px] block font-sans">Dev K. • Red Civic</span>
                        <span className="text-[8px] text-[#10B981] font-mono">Arriving at fountain in 2 mins</span>
                      </div>
                      <Car size={16} className="text-[#10B981]" />
                    </div>

                    {/* Chat Feed */}
                    <div className="flex-grow overflow-y-auto p-3 space-y-2 max-h-[140px] bg-[#141416]">
                      {chatMessages.map((msg, i) => (
                        <div 
                          key={i} 
                          className={`flex ${msg.sender === "rider" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`p-2.5 rounded-xl text-[9px] leading-relaxed max-w-[85%] font-sans ${
                            msg.sender === "rider" 
                              ? "bg-[#10B981] text-white rounded-br-none" 
                              : "bg-[#252526] border border-vscode-border text-vscode-text rounded-bl-none shadow-sm"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Replies */}
                    <div className="p-2 border-t border-vscode-border/50 bg-[#1E1E1E] flex gap-1.5 overflow-x-auto hide-scrollbar flex-shrink-0">
                      {["I'm at fountain! 🏃‍♂️", "Awesome, thanks!", "Heading there now."].map((text, i) => (
                        <button 
                          key={i} 
                          onClick={() => {
                            setChatMessages(prev => [...prev, { sender: "rider", text }]);
                            setTimeout(() => {
                              setChatMessages(prev => [...prev, { sender: "driver", text: "Got it!" }]);
                            }, 1000);
                          }}
                          className="px-2.5 py-1 bg-[#252526] border border-vscode-border hover:border-[#10B981]/50 text-white rounded-lg text-[8px] font-sans flex-shrink-0 transition-all"
                        >
                          {text}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input Bar */}
                    <div className="p-2 border-t border-vscode-border/50 bg-[#1E1E1E] flex items-center gap-1.5 flex-shrink-0">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                        placeholder="Message Dev..."
                        className="flex-grow px-2 py-1 bg-[#252526] border border-vscode-border rounded-lg text-[9px] font-sans text-white focus:outline-none focus:border-[#10B981]"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="p-1 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-xs"
                      >
                        ➔
                      </button>
                    </div>

                    <button 
                      onClick={() => setScreen("rider_complete")}
                      className="mx-3 my-2.5 py-2.5 bg-[#10B981] text-white font-sans font-bold text-xs rounded-xl shadow"
                    >
                      Complete Ride 🏁
                    </button>
                  </div>
                )}

                {/* H. Rider Complete Screen */}
                {screen === "rider_complete" && (
                  <div className="flex flex-col justify-between h-full p-5 text-center bg-[#1E1E1E]">
                    <div className="mt-12 space-y-4">
                      <span className="text-4xl animate-bounce block">🎓</span>
                      <div className="space-y-1">
                        <span className="text-[#10B981] font-mono text-[9px] uppercase font-bold tracking-widest block">ARRIVED SAFELY</span>
                        <h4 className="text-white font-extrabold text-lg tracking-tight font-sans">Commute Complete!</h4>
                      </div>
                      
                      <div className="p-4 bg-[#252526] border border-vscode-border rounded-2xl mt-4 space-y-2">
                        <span className="text-[10px] font-mono text-[#10B981] font-bold uppercase tracking-wider block">Carbon footprint savings</span>
                        <span className="text-white font-extrabold text-base block font-sans">🌲 1.2kg CO2 Saved</span>
                        <p className="text-vscode-textDark text-[9px] leading-relaxed">
                          By sharing a campus ride with Dev, you saved 18 minutes of walk time and kept campus air clean!
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setScreen("welcome")}
                      className="w-full py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-bold text-xs rounded-xl shadow-lg"
                    >
                      Done
                    </button>
                  </div>
                )}

                {/* I. Driver Setup */}
                {screen === "driver_setup" && (
                  <div className="flex flex-col justify-between h-full p-4 bg-[#1E1E1E]">
                    <div className="space-y-4 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-vscode-border/50">
                        <span className="text-white font-bold text-xs">Publish Ride Offer</span>
                        <span className="px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] font-mono text-[8px] rounded-full font-bold">DRIVER MODE</span>
                      </div>

                      <div className="p-3 rounded-lg bg-[#10B981]/5 border border-[#10B981]/10 text-[9px] text-vscode-text leading-relaxed">
                        🚘 **Share the Ride:** Offer your empty vehicle seats to peers walking to help reduce parking congestion and earn parking credits!
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Choose Destination</label>
                          <select 
                            value={driverDestination}
                            onChange={(e) => setDriverDestination(e.target.value)}
                            className="w-full px-3 py-2 bg-[#252526] border border-vscode-border rounded-xl text-[10px] text-white focus:outline-none focus:border-[#10B981]"
                          >
                            <option>Science Quad</option>
                            <option>Engineering Bldg</option>
                            <option>Student Dorm Complex</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Available Seats</label>
                          <div className="flex items-center gap-3">
                            {[1, 2, 3, 4].map(s => (
                              <button 
                                key={s}
                                onClick={() => setDriverSeats(s)}
                                className={`w-8 h-8 rounded-full border text-xs font-bold transition-all ${driverSeats === s ? 'bg-[#10B981] text-white border-none shadow' : 'border-zinc-700 text-zinc-400'}`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button 
                        onClick={() => setScreen("driver_loading")}
                        className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white font-sans font-bold text-xs rounded-xl shadow-lg"
                      >
                        Publish Ride Route
                      </button>
                      <button 
                        onClick={() => setScreen("select_role")}
                        className="w-full py-2 bg-[#252526] text-vscode-textDark font-mono text-[9px] uppercase rounded-xl hover:text-white transition-colors"
                      >
                        ⬅ Back
                      </button>
                    </div>
                  </div>
                )}

                {/* J. Driver Loading Page */}
                {screen === "driver_loading" && (
                  <div className="flex flex-col items-center justify-center h-full p-5 text-center bg-[#1E1E1E] space-y-4">
                    <div className="w-12 h-12 border-4 border-t-[#10B981] border-[#252526] rounded-full animate-spin"></div>
                    <div>
                      <span className="text-[#10B981] font-mono text-[9px] uppercase font-bold tracking-widest block">Live Map Published</span>
                      <h5 className="text-white font-bold text-xs font-sans">Awaiting passengers...</h5>
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono">Matched riders will ping you here.</span>
                  </div>
                )}

                {/* K. Driver HUD notification */}
                {screen === "driver_hud" && (
                  <div className="flex flex-col justify-between h-full p-4 bg-[#1E1E1E]">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-vscode-border/50">
                        <span className="text-white font-bold text-xs">Drive Active HUD</span>
                        <span className="px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] font-mono text-[8px] rounded-full font-bold">ONLINE</span>
                      </div>

                      {/* Request notification card */}
                      <div className="p-4 bg-[#252526] border border-[#10B981]/30 rounded-xl space-y-3 shadow-xl">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-[#10B981]/20 text-[#10B981] font-mono text-[8px] rounded font-bold uppercase">Ride Request!</span>
                          <span className="text-[8px] text-zinc-500 font-mono">4 mins ago</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center">👤</div>
                          <div>
                            <span className="text-white font-bold text-[10px] block">Maya B. (Business Major)</span>
                            <span className="text-[8px] text-zinc-500 block">Wants to join near Union fountain</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button 
                            onClick={() => setScreen("driver_setup")}
                            className="py-1.5 bg-[#252526] hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-[9px] font-sans font-bold border border-zinc-700 transition-colors"
                          >
                            Decline
                          </button>
                          <button 
                            onClick={() => setScreen("driver_complete")}
                            className="py-1.5 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-[9px] font-sans font-bold transition-colors"
                          >
                            Accept Ride
                          </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setScreen("driver_setup")}
                      className="w-full py-2 bg-[#252526] text-vscode-textDark font-mono text-[9px] uppercase rounded-xl hover:text-white transition-colors"
                    >
                      Cancel Route Offer
                    </button>
                  </div>
                )}

                {/* L. Driver Trip Complete */}
                {screen === "driver_complete" && (
                  <div className="flex flex-col justify-between h-full p-5 text-center bg-[#1E1E1E]">
                    <div className="mt-12 space-y-4">
                      <span className="text-4xl animate-bounce block">🏆</span>
                      <div className="space-y-1">
                        <span className="text-[#10B981] font-mono text-[9px] uppercase font-bold tracking-widest block">TRIP COMPLETED</span>
                        <h4 className="text-white font-extrabold text-lg tracking-tight font-sans">Thanks for driving!</h4>
                      </div>
                      
                      <div className="p-4 bg-[#252526] border border-vscode-border rounded-2xl mt-4 space-y-2">
                        <span className="text-[10px] font-mono text-[#3B82F6] font-bold uppercase tracking-wider block">Credits Earned</span>
                        <span className="text-white font-extrabold text-base block font-sans">⭐️ +15 Green Credits</span>
                        <p className="text-vscode-textDark text-[9px] leading-relaxed">
                          Your account has been credited. Use these points for campus parking discounts next semester!
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setScreen("welcome")}
                      className="w-full py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-bold text-xs rounded-xl shadow-lg"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                )}

              </div>

              {/* Simulated Home Indicator Bar */}
              <div className="w-24 h-1 bg-zinc-700/80 rounded-full mx-auto mt-2"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const RydrCaseStudy = ({ onClose }) => {
  const [activeTestTab, setActiveTestTab] = useState(0);
  const [showSimulator, setShowSimulator] = useState(false);

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
      className="fixed inset-0 z-[100] bg-[#07080b] overflow-y-auto overflow-x-hidden shadow-2xl"
    >
      {/* Navbar */}
      <div className="sticky top-0 z-[110] bg-[#07080b]/85 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group font-sans text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>
        <div className="text-zinc-500 text-sm font-semibold tracking-wider uppercase hidden md:block">Rydr / Case Study</div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <span className="font-mono text-vscode-accent text-sm mb-4 block">02. Featured Case Study</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-sans tracking-tight mb-8">
            Rydr
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-[#252526] border border-vscode-border rounded-lg font-mono text-sm shadow-xl">
            <div>
              <span className="text-vscode-textDark block mb-1">Role</span>
              <span className="text-white font-bold">UI/UX Design</span>
            </div>
            <div>
              <span className="text-vscode-textDark block mb-1">Timeline</span>
              <span className="text-white font-bold">3 Weeks</span>
            </div>
            <div>
              <span className="text-vscode-textDark block mb-1">Context</span>
              <span className="text-white font-bold">Academic Project</span>
            </div>
            <div>
              <span className="text-vscode-textDark block mb-1">Team</span>
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
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { text: "How might we caps speed limits automatically in crowded pedestrian corridors?", bg: "#FFF9C4", delay: 0.1 },
              { text: "How might we establish strict student trust to ensure safe bicycle sharing and lock compliance?", bg: "#FFF9C4", delay: 0.15 },
              { text: "How might we incentivize students to park bikes in designated dock areas?", bg: "#FFF9C4", delay: 0.2 },
              { text: "How might we alert rushing students when a bike is damaged or battery is low before they walk to it?", bg: "#FFF9C4", delay: 0.25 },
              { text: "How might we allow group booking so friends can unlock multiple e-bikes together?", bg: "#FFF9C4", delay: 0.3 },
            ].map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: note.delay }}
                className="rounded p-4 shadow-md w-[170px] h-[170px]"
                style={{ backgroundColor: note.bg }}
              >
                <p className="text-[#2a2a2a] font-sans text-xs md:text-sm leading-snug font-medium">{note.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Research Methods" icon={Search}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { title: "Student Surveys", desc: "Quantified campus transit bottlenecks" },
              { title: "Field Research", desc: "Observed walkway congestion & delays" },
              { title: "Competitive Study", desc: "Analyzed Yulu, Zypp & EVeez" },
              { title: "Secondary Studies", desc: "Reviewed Mo Cycle & SmartBike" }
            ].map((method, idx) => (
              <div key={idx} className="p-4 bg-[#252526] border border-vscode-border rounded-xl">
                <span className="text-white font-bold font-sans text-sm block mb-1">{method.title}</span>
                <span className="text-vscode-textDark font-mono text-xs block">{method.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Secondary Research Case Studies */}
        <Section title="Secondary Research Case Studies" icon={Search}>
          <SecondaryResearchShowcase />
        </Section>

        {/* Affinity Mapping Section */}
        <Section title="Affinity Mapping Insights" icon={Compass}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-vscode-text font-sans">
                By clustering survey feedback and interview logs from 40+ campus commuters, key thematic areas emerged regarding walk fatigue, rental app lock instability, and the absolute necessity of real-time battery tracking.
              </p>
              <ul className="space-y-3 font-sans text-sm">
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-[#10B981] mt-1 shrink-0" /> Unified app interface: students hate toggling maps to find bikes.</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-[#10B981] mt-1 shrink-0" /> Low battery locking: app must block bookings if battery is below 15%.</li>
                <li className="flex items-start gap-2"><CheckCircle size={14} className="text-[#10B981] mt-1 shrink-0" /> Photo damage logs: allow reporting broken tyres or brakes with one tap.</li>
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-6 rounded-xl overflow-hidden border border-vscode-border shadow-2xl"
            >
              <img src="/rydr-affinity.png" alt="Rydr Affinity Mapping Board" className="w-full h-auto" />
            </motion.div>
          </div>
        </Section>

        {/* Expectations vs Complaints */}
        <Section title="Student Expectations vs. App Complaints" icon={ShieldAlert}>
          <ExpectationsVsComplaints />
        </Section>

        {/* User Persona Section */}
        <Section title="User Persona" icon={Users}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 rounded-xl overflow-hidden border border-vscode-border shadow-2xl"
            >
              <img src="/rydr-persona.png" alt="Rydr User Persona — Maya, 20" className="w-full h-auto" />
            </motion.div>
            <div className="lg:col-span-5 space-y-4 font-sans text-base">
              <h4 className="text-white font-bold text-xl">Primary Persona: The Busy Commuter</h4>
              <p className="text-vscode-text leading-relaxed">
                Maya represents students balancing tight academic schedules. Living slightly off-campus, she depends entirely on erratic shuttle transport to avoid walking 20 minutes between back-to-back classes.
              </p>
              <div className="p-4 bg-[#252526] rounded-xl border border-vscode-border">
                <span className="text-[10px] font-mono text-vscode-accent block uppercase mb-1">Key User Need</span>
                <p className="text-white italic text-sm">"I need an intuitive way to track transit options instantly so I never walk into a lecture late."</p>
              </div>
            </div>
          </div>
        </Section>

        {/* User Journey Map */}
        <Section title="User Journey Map" icon={Compass}>
          <JourneyMap />
        </Section>

        {/* Competitive Analysis */}
        <Section title="Competitive Landscape" icon={Target}>
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
              
              {/* Styled IA Tree */}
              <div className="p-6 bg-[#252526] border border-vscode-border rounded-xl font-mono text-xs md:text-sm text-vscode-text space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-[#28C840]/20 text-[#28C840] rounded font-bold">Rydr Core</span>
                </div>
                <div className="pl-6 border-l border-zinc-700 space-y-4">
                  <div>
                    <span className="text-white font-bold">1. Entry & Auth:</span>
                    <span className="text-vscode-textDark block font-sans text-sm mt-1">➔ Student .edu Login ➔ Verify Campus Code ➔ Load Profile</span>
                  </div>
                  <div>
                    <span className="text-white font-bold">2. Map Hub (Rider view):</span>
                    <span className="text-vscode-textDark block font-sans text-sm mt-1">➔ Toggle e-Bike Locations (Battery / Walk ETA) ➔ Scan to Unlock QR</span>
                  </div>
                  <div>
                    <span className="text-white font-bold">3. Operations Portal:</span>
                    <span className="text-[#888] block font-sans text-sm mt-1">➔ Flag Servicing Needs ➔ Swap Low Batteries ➔ Track Geo-locked Violations</span>
                  </div>
                  <div>
                    <span className="text-white font-bold">4. Campus Ride HUD:</span>
                    <span className="text-[#888] block font-sans text-sm mt-1">➔ Battery Charge Meter ➔ Geofenced Speed Warning ➔ Overflow Docks Standby</span>
                  </div>
                </div>
              </div>
            </div>

            <StyleGuide />
            
            <FeaturesComparisonWidget />
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

        {/* Live Interactive Prototype Launch Card */}
        <div className="mb-24 p-8 bg-[#252526] border border-[#3B82F6]/30 rounded-2xl text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-xl mx-auto space-y-3">
            <span className="px-3.5 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] font-mono text-[10px] rounded-full uppercase tracking-wider font-semibold">Try it Yourself</span>
            <h4 className="text-2xl md:text-3xl font-bold font-sans text-white">Live Rydr App Simulator</h4>
            <p className="text-vscode-textDark text-sm">
              We have compiled our high-fidelity designs into a fully interactive React prototype simulation. Open it to test booking rides and checking shuttles in real-time.
            </p>
          </div>

          <button
            onClick={() => setShowSimulator(true)}
            className="px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-bold text-sm rounded-xl shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            Launch Rydr Simulator 🚀
          </button>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-vscode-border flex justify-between items-center text-vscode-textDark font-mono text-sm">
          <span>End of Case Study</span>
          <button onClick={onClose} className="text-vscode-accent hover:text-white transition-colors">Return to Portfolio</button>
        </div>
      </div>

      {/* Renders Simulator Modal */}
      <RydrSimulatorModal show={showSimulator} onClose={() => setShowSimulator(false)} />
    </motion.div>
  );
};

export default RydrCaseStudy;
