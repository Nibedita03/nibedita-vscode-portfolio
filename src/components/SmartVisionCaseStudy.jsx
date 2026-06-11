import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Target, Users, Search, Compass, ShieldAlert, Sparkles, Code, Play, CheckCircle, RefreshCw, Cpu, Database, Eye } from 'lucide-react';
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
    <div className="absolute -left-8 md:-left-12 top-0 h-full w-px bg-gradient-to-b from-accent/50 to-transparent hidden md:block"></div>
    <div className="flex items-center space-x-4 mb-8">
      {Icon && <div className="p-3 rounded-full bg-accent/10 text-accent border border-accent/20"><Icon size={24} /></div>}
      <h3 className="text-2xl md:text-3xl font-bold font-sans text-white">{title}</h3>
    </div>
    <div className="prose prose-invert max-w-none font-sans text-zinc-300 leading-relaxed text-lg md:text-xl">
      {children}
    </div>
  </motion.div>
);

const SmartVisionCaseStudy = ({ onClose, onNavigate }) => {

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
      className="fixed inset-0 z-[150] bg-[#161513] overflow-y-auto case-study-overlay custom-scrollbar"
      style={{
        backgroundImage: 'radial-gradient(rgba(197, 168, 128, 0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        backgroundAttachment: 'local'
      }}
    >
      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-0 z-50 w-full bg-[#161513]/85 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onClose}
            className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-wider group cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Close Overview</span>
          </button>
          <span className="h-4 w-px bg-white/10 hidden sm:block"></span>
          <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase hidden sm:block">
            Case Study // 03 // Smart Vision AI System
          </span>
        </div>
        
        <button 
          onClick={onClose}
          className="p-2 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] text-zinc-400 hover:text-white transition-all cursor-pointer hover:scale-105"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── main Scrollable Wrapper ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* HERO TITLE BLOCK */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase border border-accent/20 bg-accent/5 px-3 py-1 rounded-full">
              Computer Vision & UX Design
            </span>
            <span className="font-mono text-xs text-zinc-400 tracking-[0.2em] uppercase">
              // Research & Code Prototype
            </span>
          </div>
          <h1 className="font-black uppercase leading-[0.85] text-[clamp(2.5rem,7.5vw,5.5rem)] flex flex-col mb-8 tracking-tighter select-none">
            <span style={{
              background: 'linear-gradient(110deg, #ffffff 30%, #e5dfd5 60%, #c5a880 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} className="inline-block font-sans">SMART VISION AI</span>
            <span style={{
              background: 'linear-gradient(110deg, #ffffff 30%, #e5dfd5 60%, #c5a880 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} className="inline-block font-sans">PARKING SYSTEM</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-sans max-w-4xl leading-relaxed">
            Eliminating one of the most frustrating everyday tasks through design research and a fully functional Computer Vision object-detection prototype.
          </p>
        </div>

        {/* HERO IMAGE CONTAINER */}
        <div className="w-full max-w-5xl mx-auto rounded-[32px] overflow-hidden border border-white/5 bg-zinc-950 mb-20 shadow-2xl relative aspect-square md:aspect-[4/3] lg:aspect-[4/3] max-h-[600px]">
          <img 
            src="/vision-cover.jpg" 
            alt="Smart Vision AI Parking System CCTV"
            className="w-full h-full object-cover opacity-90 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161513] via-transparent to-transparent"></div>
        </div>

        {/* PROJECT INFO SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 mb-24 border-b border-white/10">
          <div>
            <h4 className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-2">Assignment Brief</h4>
            <p className="text-zinc-300 font-sans text-sm md:text-base">Identify & Eliminate a Mundane Everyday Task</p>
          </div>
          <div>
            <h4 className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-2">My Role</h4>
            <p className="text-zinc-300 font-sans text-sm md:text-base">UX Design Researcher & System Engineer</p>
          </div>
          <div>
            <h4 className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-2">Technologies Used</h4>
            <p className="text-zinc-300 font-sans text-sm md:text-base">Python, OpenCV, YOLOv8, React</p>
          </div>
          <div>
            <h4 className="text-zinc-500 font-mono text-xs uppercase tracking-wider mb-2">Project Duration</h4>
            <p className="text-zinc-300 font-sans text-sm md:text-base">7 Days (University Project)</p>
          </div>
        </div>

        {/* SECTION 1: OVERVIEW & ASSIGNMENT BRIEF */}
        <Section title="Project Overview & Brief" icon={Target}>
          <div className="space-y-6">
            <p className="text-lg text-zinc-200 leading-relaxed font-sans">
              The prompt was simple yet challenging: <strong>"Find a mundane, repetitive task in daily life that people find frustrating, and design a solution to eliminate or optimize it."</strong>
            </p>
            <p className="text-zinc-300 leading-relaxed font-sans">
              As designers, we often focus on digital interfaces like social apps or shopping carts. But the most significant pain points occur at the intersection of our physical and digital lives. 
            </p>
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 mt-4">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">The Goal</span>
              <p className="text-zinc-300 font-sans text-sm leading-relaxed">
                Bridge the gap between design theory and technical reality. Rather than just sketching high-fidelity UI screens, I decided to build a working sensor system using AI to prove that we can collect and display physical space vacancy in real time.
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 2: FINDING THE MUNDANE TASK */}
        <Section title="Finding the Mundane Task" icon={Search}>
          <p className="mb-8 font-sans">
            To start, I mapped daily repetitive activities across multiple fields. Each task was evaluated based on frequency, time consumed, user effort, and potential utility if optimized.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-white/5 mb-8">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-[#141413] border-b border-white/5 text-zinc-400 font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Daily Task Category</th>
                  <th className="p-4">Utility Level</th>
                  <th className="p-4">Frequency</th>
                  <th className="p-4">Est. Time Lost</th>
                  <th className="p-4 text-accent">Frustration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                <tr>
                  <td className="p-4 font-semibold text-white">Grocery Checkout Lines</td>
                  <td className="p-4">Moderate</td>
                  <td className="p-4">2-3x / week</td>
                  <td className="p-4">12 mins / visit</td>
                  <td className="p-4 text-amber-500">Medium</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Sorting Mail / Packages</td>
                  <td className="p-4">Low</td>
                  <td className="p-4">Daily</td>
                  <td className="p-4">4 mins / day</td>
                  <td className="p-4 text-zinc-500">Low</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Filling Water Bottles</td>
                  <td className="p-4">High</td>
                  <td className="p-4">Multiple / day</td>
                  <td className="p-4">2 mins / fill</td>
                  <td className="p-4 text-zinc-500">Low</td>
                </tr>
                <tr className="bg-accent/5">
                  <td className="p-4 font-semibold text-white">Searching for Parking Spots</td>
                  <td className="p-4">High</td>
                  <td className="p-4">Daily / Commute</td>
                  <td className="p-4 text-accent font-bold">15-20 mins / search</td>
                  <td className="p-4 text-red-500 font-black">EXCESSIVE</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Refilling Printer Cartridges</td>
                  <td className="p-4">Low</td>
                  <td className="p-4">Monthly</td>
                  <td className="p-4">10 mins / change</td>
                  <td className="p-4 text-amber-500">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 rounded-[20px] bg-white/[0.01] border border-white/5">
            <h4 className="text-white font-sans font-bold text-lg mb-3">Why "Searching for Parking" Emerged as the Winner</h4>
            <p className="text-zinc-300 leading-relaxed font-sans text-sm">
              It is a unique challenge: unlike grocery queues where you can see the line size, parking is completely blind. Drivers are forced to circulate multi-story garages hoping to stumble upon a vacancy. This generates enormous stress, wastes fuel, increases carbon footprints, and causes students to miss lectures and meetings.
            </p>
          </div>
        </Section>

        {/* SECTION 3: RESEARCH & OBSERVATIONS */}
        <Section title="User Research & Observations" icon={Users}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-[#141413] border border-white/5">
              <span className="font-mono text-xs text-accent uppercase block mb-3">01 // The Observation</span>
              <p className="text-zinc-300 font-sans text-sm leading-relaxed">
                I shadowed three university commuters during peak hours (9:00 AM - 11:30 AM). On average, commuters had to drive up four floors, circling 6 times before securing a space.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#141413] border border-white/5">
              <span className="font-mono text-xs text-accent uppercase block mb-3">02 // The User Quotes</span>
              <p className="text-zinc-300 font-sans text-sm italic leading-relaxed">
                "I get so anxious when entering the structure. There's a sign that says 'Open' outside, but once you go in, there is nothing. You're completely on your own."
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#141413] border border-white/5">
              <span className="font-mono text-xs text-accent uppercase block mb-3">03 // The Process Map</span>
              <p className="text-zinc-300 font-sans text-sm leading-relaxed">
                We mapped the workflow: Entering &rarr; Circling &rarr; False Hope (seeing a space that's actually small/occupied) &rarr; Settling (parking far away) &rarr; Walking.
              </p>
            </div>
          </div>

          <div className="border border-white/5 rounded-2xl bg-white/[0.01] p-8 space-y-6">
            <h4 className="text-white text-xl font-bold font-sans">Primary Challenges Identified</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent font-mono text-xs uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <span>1. Real-Time Spot Visibility</span>
                </div>
                <p className="text-zinc-300 text-base md:text-lg font-sans pl-3.5 leading-relaxed">
                  Drivers enter the parking garage blindly, causing confusion and traffic.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent font-mono text-xs uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <span>2. Dynamic Level Guidance</span>
                </div>
                <p className="text-zinc-300 text-base md:text-lg font-sans pl-3.5 leading-relaxed">
                  Drivers waste too much time driving around floors looking for an empty spot.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent font-mono text-xs uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <span>3. Cost-Effective Scaling</span>
                </div>
                <p className="text-zinc-300 text-base md:text-lg font-sans pl-3.5 leading-relaxed">
                  Putting sensors in every single parking spot is way too expensive and hard to install.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent font-mono text-xs uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <span>4. Glanceable HUD Interface</span>
                </div>
                <p className="text-zinc-300 text-base md:text-lg font-sans pl-3.5 leading-relaxed">
                  Looking at detailed maps or reading text while driving is dangerous.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 4: IDEATION & CONCEPT EXPLORATION */}
        <Section title="Ideation & Concept Exploration" icon={Compass}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-[#141413] border border-white/5 space-y-4">
              <div className="font-mono text-zinc-500 text-xs">Concept A</div>
              <h5 className="text-white font-bold font-sans">Google Maps Parking</h5>
              <p className="text-zinc-400 text-xs font-sans">
                A software expansion that uses historical crowd-sourced GPS telemetry to predict parking spot vacancies.
              </p>
              <span className="text-[10px] font-mono text-red-400 bg-red-400/5 px-2.5 py-1 rounded border border-red-400/10 inline-block max-w-full whitespace-normal leading-tight">
                Rejected: Low Real-Time Accuracy
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#141413] border border-white/5 space-y-4">
              <div className="font-mono text-zinc-500 text-xs">Concept B</div>
              <h5 className="text-white font-bold font-sans">Dashboard Assistant</h5>
              <p className="text-zinc-400 text-xs font-sans">
                Integration with vehicles' built-in sensor packages to share parking space data directly peer-to-peer.
              </p>
              <span className="text-[10px] font-mono text-red-400 bg-red-400/5 px-2.5 py-1 rounded border border-red-400/10 inline-block max-w-full whitespace-normal leading-tight">
                Rejected: Requires Car Ecosystem API
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#141413] border border-white/5 space-y-4">
              <div className="font-mono text-zinc-500 text-xs">Concept C</div>
              <h5 className="text-white font-bold font-sans">Cinema Parking Selection</h5>
              <p className="text-zinc-400 text-xs font-sans">
                Users reserve specific spots in advance via an online booking portal, much like movie theater seating.
              </p>
              <span className="text-[10px] font-mono text-red-400 bg-red-400/5 px-2.5 py-1 rounded border border-red-400/10 inline-block max-w-full whitespace-normal leading-tight">
                Rejected: Impractical for Quick Rotations
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#141413] border border-accent/20 bg-accent/[0.02] space-y-4">
              <div className="font-mono text-accent text-xs">Concept D (Chosen)</div>
              <h5 className="text-white font-bold font-sans">AI Computer Vision Feed</h5>
              <p className="text-zinc-300 text-xs font-sans">
                Using existing security camera infrastructure combined with Object Detection models to scan, map, and output free spots.
              </p>
              <span className="text-[10px] font-mono text-accent bg-accent/5 px-2.5 py-1 rounded border border-accent/10 inline-block max-w-full whitespace-normal leading-tight">
                Selected: Low Cost, Real-Time
              </span>
            </div>
          </div>

          <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.01]">
            <h4 className="text-white font-sans font-bold text-lg mb-3">Transitioning to a Working Code Prototype</h4>
            <p className="text-zinc-300 leading-relaxed font-sans text-sm mb-4">
              During my UI/UX design phase, I realized that making flat dashboard mockups felt hollow. A parking app is only as good as the underlying data feed. If the feed is slow or inaccurate, the design fails.
            </p>
            <p className="text-zinc-300 leading-relaxed font-sans text-sm">
              I decided to build a functional prototype using **Python**, **OpenCV**, and **YOLOv8** (You Only Look Once object detection). This system analyzes security camera frames, defines coordinate masks for each spot, checks if a vehicle class is detected in that bounding box, and reports a binary state (occupied or vacant) to our web service.
            </p>
          </div>

          {/* Physical Model Image & Video Playlist Block */}
          <div className="mt-12 border border-white/5 bg-[#141413] rounded-3xl p-8 relative overflow-hidden space-y-8 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <span className="text-xs font-mono text-accent uppercase tracking-widest block font-bold">The Working Prototype Setup</span>
                <h4 className="text-white font-sans text-xl font-bold tracking-tight">Real-World Object Detection Validation</h4>
                <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                  To test the computer vision algorithms under controlled conditions, I built a physical scale model. It features a custom three-bay parking layout drawn on paper, monitored by an overhead camera feed.
                </p>
                <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                  Toy cars of various sizes, shapes, and colors were placed in the bays to validate detection thresholds, class mapping (verifying that only objects classified as cars/trucks trigger an occupied state), and model resilience against minor camera angles or ambient lighting shifts.
                </p>
              </div>
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <img 
                  src="/parking-prototype.png" 
                  alt="Physical YOLOv8 Parking Detector Scale Model Setup" 
                  className="w-full h-auto object-cover opacity-90"
                />
              </div>
            </div>

            {/* Video Player */}
            <div className="border-t border-white/5 pt-8">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center max-w-4xl mx-auto">
                <video 
                  src="/untitled-design-cropped.mp4" 
                  controls 
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/60 backdrop-blur text-[10px] font-mono text-accent uppercase tracking-widest border border-accent/20">
                  Prototype Video Demonstration
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 5: TECHNICAL IMPLEMENTATION */}
        <Section title="System Architecture & Python Implementation" icon={Code}>
          <p className="mb-8 font-sans">
            Below is the core system architecture. A stationary CCTV camera feeds frame-by-frame data. The Python processor loops through defined coordinate masks representing parking slots and updates the occupancy API.
          </p>

          {/* Flowchart Diagram */}
          <div className="p-8 rounded-[24px] border border-white/5 bg-[#141413] mb-10 overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-center">
              
              <div className="p-4 rounded-xl border border-white/10 bg-zinc-950 w-full md:w-44">
                <span className="font-mono text-[10px] text-zinc-500 block mb-1">INPUT</span>
                <span className="font-bold text-white font-sans text-xs">CCTV Video Feed</span>
              </div>
              
              <span className="text-accent text-xl hidden md:block">→</span>
              
              <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 w-full md:w-48">
                <span className="font-mono text-[10px] text-accent block mb-1">PROCESSING</span>
                <span className="font-bold text-white font-sans text-xs">YOLOv8 Slot Model</span>
              </div>

              <span className="text-accent text-xl hidden md:block">→</span>
              
              <div className="p-4 rounded-xl border border-white/10 bg-zinc-950 w-full md:w-44">
                <span className="font-mono text-[10px] text-zinc-500 block mb-1">INTERFACING</span>
                <span className="font-bold text-white font-sans text-xs">OpenCV Slot Painter</span>
              </div>

              <span className="text-accent text-xl hidden md:block">→</span>
              
              <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 w-full md:w-44">
                <span className="font-mono text-[10px] text-accent block mb-1">OUTPUT</span>
                <span className="font-bold text-white font-sans text-xs">Mobile App API</span>
              </div>

            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
          </div>

          {/* Python Code Block */}
          <div className="rounded-2xl border border-white/5 bg-zinc-950 overflow-hidden">
            <div className="bg-[#141413] border-b border-white/5 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-zinc-500 font-mono text-xs ml-4">parking_detector.py</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Python 3.10 // YOLOv8</span>
            </div>
            <div className="p-6 overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300">
              <pre className="text-left">
{`import cv2
from ultralytics import YOLO
import numpy as np

# Load pre-trained YOLOv8 weights optimized for vehicle detection
model = YOLO('yolov8n.pt')

# Define bounding box coordinates for individual slots [x1, y1, x2, y2]
slots = {
    "Slot_A1": [120, 240, 240, 390],
    "Slot_A2": [250, 240, 370, 390],
    "Slot_A3": [380, 240, 500, 390],
    "Slot_A4": [510, 240, 630, 390]
}

def check_occupancy(frame):
    results = model(frame, verbose=False)[0]
    detections = results.boxes.data.cpu().numpy()  # [x1, y1, x2, y2, confidence, class]
    
    occupied_slots = {}
    for slot_name, coords in slots.items():
        slot_occupied = False
        for det in detections:
            x1, y1, x2, y2, conf, cls = det
            if int(cls) in [2, 7]:  # Class IDs for Car and Truck
                # Calculate Intersection over Union (IoU) of vehicle and parking slot
                overlap = get_overlap_ratio(coords, [x1, y1, x2, y2])
                if overlap > 0.45:
                    slot_occupied = True
                    break
        occupied_slots[slot_name] = slot_occupied
        
    return occupied_slots`}
              </pre>
            </div>
          </div>
        </Section>

        {/* SECTION 5 Reflection Quote */}
        <div className="relative p-10 md:p-14 border border-[#c5a880]/20 bg-[#1e1d1b] rounded-3xl mt-16 text-center max-w-4xl mx-auto shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#c5a880]/30" />
          <span className="text-8xl text-[#c5a880]/10 font-serif absolute -top-2 left-6 pointer-events-none select-none">“</span>
          <p className="text-zinc-200 text-lg md:text-2xl font-serif italic leading-relaxed relative z-10 font-medium">
            Building this project taught me that design isn't just about beautiful Figma screens. By learning Python and writing the computer vision detection script myself, I was able to validate the product concept completely. It showed that good designers must understand the constraints of the technology they are designing for.
          </p>
          <span className="text-8xl text-[#c5a880]/10 font-serif absolute -bottom-14 right-6 pointer-events-none select-none">”</span>
          <div className="mt-8 font-mono text-xs text-accent uppercase tracking-widest">— Project Reflection</div>
        </div>



        {/* Cinematic Split Image Navigation Footer */}
        <div className="mt-28 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Previous Project Card */}
            <div 
              onClick={() => onNavigate('rydr')}
              className="group relative cursor-pointer overflow-hidden rounded-2xl h-28 md:h-32 border border-white/5 bg-zinc-950 flex flex-col justify-end p-6"
            >
              <img 
                src="/rydr-cover.jpg" 
                alt="Rydr" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10 space-y-0.5">
                <span className="text-zinc-400 font-mono text-[9px] uppercase block tracking-wider">Campus Mobility Platform</span>
                <h4 className="text-white text-xl md:text-2xl font-black uppercase font-sans tracking-tight group-hover:text-accent transition-colors duration-300">
                  ← PREVIOUS PROJECT
                </h4>
                <span className="text-zinc-400 text-[10px] md:text-xs font-normal tracking-wider font-mono block group-hover:text-zinc-200 transition-colors duration-300">
                  RYDR
                </span>
              </div>
            </div>

            {/* Next Project Card */}
            <div 
              onClick={() => onNavigate('creative-explorations')}
              className="group relative cursor-pointer overflow-hidden rounded-2xl h-28 md:h-32 border border-[#c5a880]/15 hover:border-[#c5a880]/30 bg-zinc-950 flex flex-col justify-end p-6 text-right items-end"
            >
              <img 
                src="/scrapgarden-cover.jpg" 
                alt="Creative Explorations" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10 space-y-0.5">
                <span className="text-zinc-400 font-mono text-[9px] uppercase block tracking-wider">Creative Experiments</span>
                <h4 className="text-white text-xl md:text-2xl font-black uppercase font-sans tracking-tight group-hover:text-accent transition-colors duration-300">
                  EXPLORE MORE →
                </h4>
                <span className="text-zinc-400 text-[10px] md:text-xs font-normal tracking-wider font-mono block group-hover:text-zinc-200 transition-colors duration-300">
                  CREATIVE EXPLORATIONS
                </span>
              </div>
            </div>

          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/20 px-6 py-2.5 rounded-xl bg-white/[0.01] font-mono text-xs uppercase tracking-wider"
            >
              Return to Portfolio
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default SmartVisionCaseStudy;
