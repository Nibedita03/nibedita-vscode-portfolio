import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  // Organic load count-up sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Organic irregular progress jumps (takes ~3.5s total)
        const jump = Math.floor(Math.random() * 5) + 2;
        return Math.min(prev + jump, 100);
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // Lab Assemblage Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const elements = [];
    const elementCount = 38;

    // Define 3D wireframe cube vertices and edges
    const cubeVertices = [
      { x: -30, y: -30, z: -30 }, { x: 30, y: -30, z: -30 },
      { x: 30, y: 30, z: -30 },  { x: -30, y: 30, z: -30 },
      { x: -30, y: -30, z: 30 },  { x: 30, y: -30, z: 30 },
      { x: 30, y: 30, z: 30 },   { x: -30, y: 30, z: 30 }
    ];
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
    ];

    // Initialize lab elements scattered in 2D/3D space
    for (let i = 0; i < elementCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const startRadius = 350 + Math.random() * 250;
      const endRadius = 40 + Math.random() * 90;

      // Classify elements into design, code, AI, and math types
      const types = ['sketch', 'component', 'code', 'node', 'diagram', '3d-cube'];
      const type = types[i % types.length];

      elements.push({
        type,
        angle,
        startRadius,
        endRadius,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        currentRot: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.6,
        // Specific type details
        codeText: [
          'const ui = fit(ux);',
          'await model.predict();',
          'ctx.lineTo(x, y);',
          'node.connect(io);',
          'install3D({'
        ][Math.floor(Math.random() * 5)],
        nodePoints: Array.from({ length: 4 }, () => ({
          x: (Math.random() - 0.5) * 40,
          y: (Math.random() - 0.5) * 40
        })),
        cubeRotX: Math.random() * Math.PI,
        cubeRotY: Math.random() * Math.PI,
        cubeRotZ: Math.random() * Math.PI
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const factor = progress / 100; // 0 to 1

      // Render laboratory drafting context lines
      ctx.strokeStyle = 'rgba(197, 168, 128, 0.02)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 260, 0, Math.PI * 2);
      ctx.moveTo(centerX - 400, centerY);
      ctx.lineTo(centerX + 400, centerY);
      ctx.moveTo(centerX, centerY - 400);
      ctx.lineTo(centerX, centerY + 400);
      ctx.stroke();

      // Render and assemble each lab element
      elements.forEach((el) => {
        // Linear interpolation of radial distance
        const r = el.startRadius - (el.startRadius - el.endRadius) * factor;
        el.currentRot += el.rotSpeed;
        
        const x = centerX + Math.cos(el.angle + el.currentRot) * r;
        const y = centerY + Math.sin(el.angle + el.currentRot) * r;

        // Fading intensity: increases as progress approaches completion
        const opacity = 0.04 + (0.22 * factor);
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(el.scale, el.scale);

        if (el.type === 'sketch') {
          // Unfinished sketches: curves & dimension lines
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-20, -20);
          ctx.bezierCurveTo(-5, 10, 5, -10, 20, 20);
          ctx.stroke();
          
          // Bounding box bounds
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
          ctx.strokeRect(-20, -20, 40, 40);
          ctx.fillStyle = `rgba(197, 168, 128, ${opacity * 0.7})`;
          ctx.font = '8px monospace';
          ctx.fillText('W: 40px', -18, -25);
        } 
        else if (el.type === 'component') {
          // Wireframe interface components: slider track or toggles
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.85;
          ctx.strokeRect(-25, -10, 50, 20);
          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.stroke();
          // Active slider fill
          ctx.fillStyle = `rgba(197, 168, 128, ${opacity * 0.8})`;
          ctx.fillRect(-20, -2, 20, 4);
        } 
        else if (el.type === 'code') {
          // Floating active code fragments
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
          ctx.font = '8.5px "Fira Code", monospace';
          ctx.fillText(el.codeText, -30, 4);
        } 
        else if (el.type === 'node') {
          // Connected AI node networks
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.2})`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          el.nodePoints.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.closePath();
          ctx.stroke();
          
          el.nodePoints.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        } 
        else if (el.type === 'diagram') {
          // Drafting system: concentric arcs and crosshairs
          ctx.strokeStyle = `rgba(197, 168, 128, ${opacity * 0.9})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 1.3);
          ctx.stroke();
          // Crosshairs
          ctx.beginPath();
          ctx.moveTo(-20, 0); ctx.lineTo(20, 0);
          ctx.moveTo(0, -20); ctx.lineTo(0, 20);
          ctx.stroke();
        } 
        else if (el.type === '3d-cube') {
          // Rotating 3D wireframe cubes
          el.cubeRotX += 0.009;
          el.cubeRotY += 0.012;
          
          // Apply 3D rotations on coordinates
          const projected = cubeVertices.map((v) => {
            // Rotate X
            let y1 = v.y * Math.cos(el.cubeRotX) - v.z * Math.sin(el.cubeRotX);
            let z1 = v.y * Math.sin(el.cubeRotX) + v.z * Math.cos(el.cubeRotX);
            // Rotate Y
            let x2 = v.x * Math.cos(el.cubeRotY) + z1 * Math.sin(el.cubeRotY);
            let z2 = -v.x * Math.sin(el.cubeRotY) + z1 * Math.cos(el.cubeRotY);
            // Simple perspective projection
            const dist = 120;
            const projScale = dist / (dist + z2);
            return {
              x: x2 * projScale,
              y: y1 * projScale
            };
          });

          // Draw cube borders
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.75})`;
          ctx.lineWidth = 0.75;
          cubeEdges.forEach(([p1, p2]) => {
            ctx.beginPath();
            ctx.moveTo(projected[p1].x, projected[p1].y);
            ctx.lineTo(projected[p2].x, projected[p2].y);
            ctx.stroke();
          });
        }

        ctx.restore();

        // Faint connection beams extending from lab pieces to the center core
        if (factor > 0.4 && r < 180) {
          const beamAlpha = (1 - r / 180) * 0.05 * factor;
          ctx.strokeStyle = `rgba(197, 168, 128, ${beamAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(centerX, centerY);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress]);

  // Fading variables for the gradual logo reveal (opacity peaks at 100% progress)
  const logoOpacity = progress < 30 ? 0 : (progress - 30) / 70; // starts appearing at 30%
  const logoScale = 0.82 + (0.18 * logoOpacity); // grows from 0.82 to 1.0

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={progress === 100 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      onAnimationComplete={onLoadingComplete}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0e0e0d] text-white select-none overflow-hidden"
    >
      {/* Immersive Lab Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Lab Central Assembly Point */}
      <div className="relative flex flex-col items-center z-10 select-none">
        
        {/* Typographic Monogram Core - Emerging Gradually */}
        <motion.div 
          style={{ opacity: logoOpacity, scale: logoScale }}
          className="relative text-7xl md:text-8xl font-black select-none font-sans tracking-widest mb-12 h-[90px] md:h-[110px] w-[150px] md:w-[220px] flex items-center justify-center"
        >
          {/* NB Unified gold/bronze metallic gradient monogram */}
          <span className="bg-gradient-to-r from-[#ffffff] via-[#e5dfd5] to-[#c5a880] bg-clip-text text-transparent uppercase tracking-wider">
            NB
          </span>
          
          {/* Subtle spinning accent star core */}
          {progress > 60 && (
            <motion.span 
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="text-accent text-2xl absolute -top-1 -right-3"
            >
              ✦
            </motion.span>
          )}
        </motion.div>

        {/* Lab Status Board Widget */}
        <div className="flex flex-col items-center justify-center bg-[#161615]/30 border border-white/5 px-6 py-3 rounded-xl backdrop-blur-sm max-w-[280px]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span className="text-[8px] font-mono tracking-[0.25em] text-zinc-500 uppercase">CREATIVE_LAB_ACTIVE</span>
          </div>

          {/* Assembly progress bar */}
          <div className="w-40 h-[1px] bg-white/5 rounded-full overflow-hidden relative my-1">
            <div 
              className="absolute top-0 left-0 h-full bg-accent transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[10px] font-mono text-zinc-400 font-bold mt-1">
            ASSEMBLING SYSTEMS: {progress}%
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export default Loader;
