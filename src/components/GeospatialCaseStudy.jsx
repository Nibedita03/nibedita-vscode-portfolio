import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, AlertTriangle, Users, Building2, Database, ChevronDown, ChevronUp } from 'lucide-react';

/* ──────────────────────────────────────────────
   DATA
────────────────────────────────────────────── */
const maps = [
  {
    id: 'risk',
    label: 'Map 1',
    title: 'Cyclone Risk Zones',
    color: '#3b82f6',
    colorMuted: 'rgba(59,130,246,0.12)',
    colorBorder: 'rgba(59,130,246,0.3)',
    purpose: 'Establish the baseline hazard exposure across Ganjam district.',
    layers: ['Very High risk zones (deep blue)', 'High risk zones (mid blue)', 'Ganjam administrative block boundaries'],
    insight: 'The entire coastal belt from Chatrapur to Gopalpur falls in the Very High category — the population living there is exposed to every cyclone that makes landfall on this stretch of coast.',
    imageSrc: '/geo-map-1.png',
  },
  {
    id: 'population',
    label: 'Map 2',
    title: 'Population at Risk',
    color: '#ec4899',
    colorMuted: 'rgba(236,72,153,0.12)',
    colorBorder: 'rgba(236,72,153,0.3)',
    purpose: 'Overlay Census population data on the cyclone risk zones to find the most exposed communities.',
    layers: ['Proportional circles sized by block population (0 – 1,26,706)', 'Cyclone zone background', 'Admin block outlines'],
    insight: 'The largest population circles cluster right on top of the darkest blue zone — Berhampur, Chhatrapur, and Ganjam blocks concentrate the most people in the highest-risk strip.',
    imageSrc: '/geo-map-2.png',
  },
  {
    id: 'facilities',
    label: 'Map 3',
    title: 'Facilities in Risk Zones',
    color: '#c5a880',
    colorMuted: 'rgba(197,168,128,0.12)',
    colorBorder: 'rgba(197,168,128,0.3)',
    purpose: 'Add hospital and school locations (potential shelters) to the combined risk-population map.',
    layers: ['Hospital markers (red cross)', 'Population circles', 'Cyclone risk zone background'],
    insight: 'Most hospitals cluster in the south — exactly where risk is highest. This is a double vulnerability: the facilities communities depend on during a disaster are themselves inside the danger zone.',
    imageSrc: '/geo-map-3.png',
  },
];

const findings = [
  {
    num: '01',
    title: 'High Risk = High Density',
    body: 'Very High cyclone risk zones coincide directly with the most densely populated coastal blocks, maximising potential casualty exposure.',
  },
  {
    num: '02',
    title: 'Uneven Shelter Coverage',
    body: 'Facilities are skewed south and coastal. Northern and inland blocks — while lower-risk — are relatively underserved if communities need to evacuate inland.',
  },
  {
    num: '03',
    title: 'Double Vulnerability',
    body: 'Hospitals and schools that serve as cyclone shelters are themselves inside Very High risk zones, raising serious questions about resilient facility siting.',
  },
  {
    num: '04',
    title: 'Priority Blocks Identified',
    body: 'Integrating all three layers surfaces a short-list of blocks where dense population, extreme hazard, and sparse shelters overlap — the highest-priority targets for preparedness investment.',
  },
];

const dataSources = [
  { label: 'Cyclone Hazard Zones', source: 'OSDMA' },
  { label: 'Block-level Population', source: 'Census of India (CSV)' },
  { label: 'Admin Boundaries', source: 'Ganjam GeoJSON' },
  { label: 'Hospitals & Schools', source: 'OpenStreetMap via QGIS' },
];

/* ──────────────────────────────────────────────
   MAP SECTION (always visible, no click)
────────────────────────────────────────────── */
const MapSection = ({ map, index }) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center gap-4 mb-2">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/20 bg-accent/5 px-3 py-1.5 rounded-full">
        {map.label}
      </span>
      <h3 className="text-white font-black font-sans text-2xl md:text-3xl">{map.title}</h3>
    </div>

    {/* Purpose */}
    <p className="text-zinc-300 text-base md:text-lg font-sans leading-relaxed max-w-3xl">{map.purpose}</p>

    {/* Map Image */}
    <div className="w-full rounded-[24px] overflow-hidden border bg-[#0e0e0d] shadow-2xl" style={{ borderColor: map.colorBorder }}>
      <img
        src={map.imageSrc}
        alt={map.title}
        className="w-full h-auto object-contain"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>

    {/* Layers + Insight */}
    <div className="grid md:grid-cols-2 gap-5">
      <div className="p-6 rounded-[20px] border border-[#c5a880]/10 bg-[#141413]">
        <p className="text-xs font-mono uppercase tracking-widest mb-4 text-accent">Layers</p>
        <ul className="space-y-2.5">
          {map.layers.map((l, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm md:text-base font-sans text-zinc-300">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
              {l}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 rounded-[20px] border border-[#c5a880]/10 bg-[#141413] font-sans text-base md:text-lg text-zinc-300 leading-relaxed">
        <p className="text-xs font-mono uppercase tracking-widest mb-3 text-accent">Key Insight</p>
        {map.insight}
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────── */
const GeospatialCaseStudy = ({ onClose }) => {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-[#0e0e0d] overflow-y-auto case-study-overlay"
    >
      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0e0e0d]/90 backdrop-blur-md border-b border-[#c5a880]/10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">Case Study</span>
          <span className="text-zinc-700">·</span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">Geospatial · QGIS · GIS</span>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-white/10 hover:border-accent/40 bg-white/[0.02] text-zinc-400 hover:text-white transition-all hover:scale-105"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-32">

        {/* ── Hero ── */}
        <div className="pt-16 md:pt-24 pb-20 border-b border-[#c5a880]/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border border-accent/30 text-accent bg-accent/5">GIS Research</span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/5">Humanitarian</span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 bg-white/[0.02]">QGIS</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-sans text-white leading-none tracking-tight mb-6">
              Geospatial<br />
              <span className="text-accent">Mapping</span><br />
              <span className="text-zinc-500">Ganjam District</span>
            </h1>

            <p className="text-zinc-300 font-sans text-base md:text-lg leading-relaxed max-w-2xl">
              A QGIS-based spatial analysis mapping cyclone risk zones, population density, and critical infrastructure 
              across Ganjam, Odisha — one of India's most cyclone-prone coastal districts.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: <MapPin size={16} />, value: '3 Maps', label: 'Produced in QGIS' },
              { icon: <AlertTriangle size={16} />, value: '3 Zones', label: 'Very High · High · Moderate' },
              { icon: <Users size={16} />, value: '1.26L+', label: 'People in highest-risk blocks' },
              { icon: <Database size={16} />, value: '4 Sources', label: 'OSDMA · Census · OSM · GeoJSON' },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-[20px] border border-[#c5a880]/15 bg-[#141413] flex flex-col gap-2">
                <span className="text-accent">{s.icon}</span>
                <span className="text-white font-black font-sans text-xl md:text-2xl">{s.value}</span>
                <span className="text-zinc-500 text-[11px] font-mono uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Problem + Context ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 border-b border-[#c5a880]/10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4 block">01 — The Problem</span>
          <h2 className="text-3xl md:text-4xl font-black font-sans text-white mb-8 leading-tight">
            Where are Ganjam's safe and vulnerable areas?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 rounded-[24px] border border-[#c5a880]/15 bg-[#141413] space-y-4">
              <h3 className="text-white font-bold font-sans text-lg uppercase tracking-wide">Context</h3>
              <p className="text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                Ganjam district in Odisha sits directly on India's cyclone-prone east coast. Events like 
                Cyclone Phailin (2013) caused devastating loss of life and infrastructure. Yet existing data 
                on risk, population, and facilities remains <span className="text-accent font-semibold">fragmented and hard to act on</span>.
              </p>
            </div>
            <div className="p-6 md:p-8 rounded-[24px] border border-[#c5a880]/15 bg-[#141413] space-y-4">
              <h3 className="text-white font-bold font-sans text-lg uppercase tracking-wide">Why QGIS?</h3>
              <p className="text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                This project combined GIS skills (QGIS) with a real-world humanitarian application — answering 
                one concrete question: <span className="text-accent font-semibold">who is most at risk, and are the shelters where they need to be?</span> A visual evidence base can directly inform better disaster preparedness.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Goals ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 border-b border-[#c5a880]/10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4 block">02 — Goals</span>
          <h2 className="text-3xl md:text-4xl font-black font-sans text-white mb-10 leading-tight">What the maps needed to answer</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: '01', text: 'Identify which blocks face the highest cyclone hazard exposure.' },
              { num: '02', text: 'Show where population clusters overlap with Very High risk zones.' },
              { num: '03', text: 'Assess whether hospitals and schools (emergency shelters) are well-distributed relative to vulnerable populations.' },
              { num: '04', text: 'Provide a visual evidence base for better disaster preparedness and resource allocation.' },
            ].map((g) => (
              <div key={g.num} className="flex gap-4 p-6 rounded-[20px] border border-[#c5a880]/10 bg-[#141413] hover:border-[#c5a880]/30 transition-colors duration-300">
                <span className="font-mono text-3xl font-black text-[#c5a880]/20 select-none shrink-0">{g.num}</span>
                <p className="text-zinc-300 font-sans text-base md:text-lg leading-relaxed pt-1">{g.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Interactive Maps Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 border-b border-[#c5a880]/10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4 block">03 — The Maps</span>
          <h2 className="text-3xl md:text-4xl font-black font-sans text-white mb-4 leading-tight">Three layers, one picture</h2>
          <p className="text-zinc-300 font-sans text-base md:text-lg mb-16 max-w-2xl">
            Each map builds on the last — hazard → population → infrastructure.
          </p>

          <div className="space-y-20">
            {maps.map((map, i) => (
              <motion.div
                key={map.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <MapSection map={map} index={i} />
              </motion.div>
            ))}
          </div>

          {/* Visual legend */}
          <div className="mt-16 p-6 rounded-[20px] border border-[#c5a880]/10 bg-[#141413] flex flex-wrap gap-6 items-center">
            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest w-full mb-1">Cyclone Risk Legend</span>
            {[
              { color: '#1e3a8a', label: 'Very High' },
              { color: '#3b82f6', label: 'High' },
              { color: '#93c5fd', label: 'Moderate' },
            ].map(z => (
              <div key={z.label} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: z.color }} />
                <span className="text-zinc-400 font-mono text-[11px]">{z.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 ml-2">
              <span className="text-red-400 font-bold text-base">⊕</span>
              <span className="text-zinc-400 font-mono text-[11px]">Hospital</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-pink-400/40 border border-pink-400/60" />
              <span className="text-zinc-400 font-mono text-[11px]">Population circle</span>
            </div>
          </div>
        </motion.section>

        {/* ── Observations ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 border-b border-[#c5a880]/10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4 block">04 — Observations</span>
          <h2 className="text-3xl md:text-4xl font-black font-sans text-white mb-10 leading-tight">What the data revealed</h2>

          <div className="space-y-4">
            {[
              'Hospitals are clustered in high-population blocks, especially in southern Ganjam.',
              'Many facilities lie inside Very High cyclone risk zones — making them vulnerable during the disasters they are meant to serve.',
              'Coastal and urban areas have better coverage, while northern and inland blocks are relatively underserved.',
              'This creates a double vulnerability: dense populations and critical facilities are both at risk simultaneously.',
              'Disaster preparedness must therefore consider resilient facility planning — safe siting, elevated construction, and backup systems.',
            ].map((obs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 items-start p-5 rounded-[18px] border border-[#c5a880]/10 bg-[#141413] hover:border-[#c5a880]/25 transition-colors duration-300"
              >
                <span className="shrink-0 font-mono text-sm text-accent font-black mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-zinc-300 font-sans text-base md:text-lg leading-relaxed">{obs}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Key Findings ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 border-b border-[#c5a880]/10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4 block">05 — Key Findings</span>
          <h2 className="text-3xl md:text-4xl font-black font-sans text-white mb-10 leading-tight">Four takeaways</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {findings.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 md:p-8 rounded-[24px] border border-[#c5a880]/15 bg-[#141413] hover:border-[#c5a880]/35 hover:shadow-[0_0_40px_rgba(197,168,128,0.06)] transition-all duration-500"
              >
                <span className="font-mono text-xs text-accent font-black tracking-widest block mb-4">{f.num}</span>
                <h4 className="text-white font-black font-sans text-xl md:text-2xl mb-3">{f.title}</h4>
                <p className="text-zinc-300 font-sans text-base md:text-lg leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Expected Outcomes ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 border-b border-[#c5a880]/10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-4 block">06 — Outcome</span>
          <h2 className="text-3xl md:text-4xl font-black font-sans text-white mb-10 leading-tight">What was delivered</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[24px] border border-[#c5a880]/20 bg-[#141413] space-y-3">
              <MapPin className="text-accent" size={26} />
              <h4 className="text-white font-black font-sans text-xl md:text-2xl">3 QGIS Maps</h4>
              <p className="text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                Cyclone Risk Zones, Population at Risk, and Facilities in Risk — each building a more complete picture of vulnerability across Ganjam.
              </p>
            </div>
            <div className="p-8 rounded-[24px] border border-[#c5a880]/20 bg-[#141413] space-y-3">
              <AlertTriangle className="text-accent" size={26} />
              <h4 className="text-white font-black font-sans text-xl md:text-2xl">Priority Block Identification</h4>
              <p className="text-zinc-300 text-base md:text-lg font-sans leading-relaxed">
                Clear identification of safe and vulnerable areas across Ganjam to inform where preparedness investment should go first.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Data Sources (collapsible) ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="w-full flex items-center justify-between group"
          >
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-1 block text-left">07 — Data Sources</span>
              <h2 className="text-2xl md:text-3xl font-black font-sans text-white group-hover:text-accent transition-colors duration-300 text-left">Where the data came from</h2>
            </div>
            <span className="p-3 rounded-full border border-[#c5a880]/20 text-zinc-400 group-hover:text-accent group-hover:border-accent/40 transition-all duration-300">
              {sourcesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          <AnimatePresence>
            {sourcesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 grid md:grid-cols-2 gap-4 overflow-hidden"
              >
                {dataSources.map((d, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-[18px] border border-[#c5a880]/10 bg-[#141413]">
                    <div>
                      <p className="text-white font-bold font-sans text-base md:text-lg">{d.label}</p>
                      <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-1">{d.source}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ── Close Footer ── */}
        <div className="flex items-center justify-between pt-8 border-t border-[#c5a880]/10">
          <div className="space-y-1">
            <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest">End of Case Study</p>
            <p className="text-zinc-600 font-mono text-[10px]">Geospatial Mapping · Ganjam District · QGIS</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-accent hover:text-white transition-colors duration-300 border border-accent/30 hover:border-white/20 px-6 py-3 rounded-xl hover:bg-white/[0.02]"
          >
            <X size={14} />
            Close
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default GeospatialCaseStudy;
