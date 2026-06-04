import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CornerDownRight, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

const PROJECT_CARDS = {
  about: {
    id: "about",
    title: "About Nibedita Behera",
    category: "Bangalore based // UI UX Design",
    content: "I don't like staying in one box. Some days I'm designing app experiences, other days I'm experimenting with creative code, AI, sound, or physical installations. My work is driven by curiosity and a love for turning complex ideas into engaging experiences that people can interact with.",
    color: "#8b5cf6",
    skills: ["Interaction Design", "Figma Systems", "Product Strategy"]
  },
  rydr: {
    id: "rydr",
    title: "Rydr - Cab Hailing App",
    category: "Featured Project // UX Case Study",
    content: "A ridesharing design system focusing on mental map navigation and clear user flows, styled with editorial warmth.",
    color: "#3b82f6",
    skills: ["User Flows", "Prototyping", "Interface Systems"]
  },
  scrap: {
    id: "scrap",
    title: "Scrap Garden",
    category: "Exploration Project // Creative Sandbox",
    content: "An interactive, web-based digital sandbox exploring audio synthesis and generative plant ecosystems. Designed to make exploration interactive.",
    color: "#10b981",
    skills: ["HTML Canvas", "Web Audio API", "Generative Art"]
  },
  noogin: {
    id: "noogin",
    title: "Noogin Nooks",
    category: "Featured Project // Spatial Soundscape",
    content: "A mental wellness sanctuary blending structural interface layouts with ambient, mood-responsive soundscapes.",
    color: "#fbbf24",
    skills: ["Sound Design", "Product Design", "Layout Architecture"]
  }
};

const MarioPortfolio = ({ onClose }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Game UI States
  const [coinsCollected, setCoinsCollected] = useState([]);
  const [totalCoinsCount, setTotalCoinsCount] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Keep ref for activeCard state so the canvas loop knows when a modal is open (and pauses physics)
  const activeCardRef = useRef(null);
  useEffect(() => {
    activeCardRef.current = activeCard;
  }, [activeCard]);

  // Audio Context Ref for synthesizers
  const audioCtxRef = useRef(null);

  // Play synthentic sound effects to keep it lightweight (zero asset dependencies)
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'coin') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5 note
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6 note
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'bump') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'powerup') {
        osc.type = 'triangle';
        const notes = [330, 392, 659, 523, 587, 784];
        notes.forEach((freq, idx) => {
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        });
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'win') {
        osc.type = 'sine';
        const fanFare = [523, 659, 784, 1046, 1318, 1568];
        fanFare.forEach((freq, idx) => {
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        });
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.85);
        osc.start(now);
        osc.stop(now + 0.85);
      }
    } catch (e) {
      console.warn("Sound play failed", e);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = canvas.width = containerRef.current.clientWidth;
    let height = canvas.height = containerRef.current.clientHeight;

    // Game variables
    const gravity = 0.45;
    const friction = 0.84;
    const floorY = height - 120;

    // Input state
    const keys = {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      KeyW: false,
      KeyA: false,
      KeyD: false,
      Space: false
    };

    // Onscreen UI touch controls helper
    const touchInputs = {
      left: false,
      right: false,
      jump: false
    };

    const player = {
      x: 100,
      y: floorY - 32,
      width: 24,
      height: 32,
      vx: 0,
      vy: 0,
      grounded: false,
      speed: 4.5,
      jumpForce: 10.5,
      frame: 0,
      direction: 'right',
      isWalking: false
    };

    // Camera viewport offset
    let cameraX = 0;

    // Coins (representing skills)
    const coins = [
      { x: 300, y: floorY - 70, label: "Figma", collected: false },
      { x: 380, y: floorY - 90, label: "UX Research", collected: false },
      { x: 780, y: floorY - 140, label: "User Testing", collected: false },
      { x: 860, y: floorY - 160, label: "Wireframing", collected: false },
      { x: 1350, y: floorY - 70, label: "React", collected: false },
      { x: 1430, y: floorY - 90, label: "Motion", collected: false },
      { x: 1980, y: floorY - 140, label: "Spatial UX", collected: false },
      { x: 2060, y: floorY - 160, label: "Hardware", collected: false },
      { x: 2550, y: floorY - 70, label: "Audio Synthesis", collected: false },
      { x: 2630, y: floorY - 90, label: "Prototyping", collected: false },
    ];
    setTotalCoinsCount(coins.length);

    // Question Blocks
    const blocks = [
      { x: 550, y: floorY - 140, width: 42, height: 42, type: 'about', text: '?', hit: false, bounceProgress: 0 },
      { x: 1100, y: floorY - 140, width: 42, height: 42, type: 'rydr', text: '?', hit: false, bounceProgress: 0 },
      { x: 1750, y: floorY - 140, width: 42, height: 42, type: 'scrap', text: '?', hit: false, bounceProgress: 0 },
      { x: 2400, y: floorY - 140, width: 42, height: 42, type: 'noogin', text: '?', hit: false, bounceProgress: 0 },
    ];

    // Flagpole at the end of the level
    const flagPole = {
      x: 3050,
      y: floorY - 320,
      width: 8,
      height: 320,
      triggered: false,
      flagY: floorY - 320
    };

    // Parallax background items
    const hills = [
      { x: 100, w: 200, h: 100, speed: 0.2 },
      { x: 500, w: 320, h: 160, speed: 0.2 },
      { x: 1200, w: 250, h: 120, speed: 0.2 },
      { x: 1800, w: 400, h: 180, speed: 0.2 },
      { x: 2500, w: 300, h: 130, speed: 0.2 }
    ];

    const clouds = [
      { x: 150, y: 100, w: 80, h: 30, speed: 0.4 },
      { x: 450, y: 150, w: 120, h: 40, speed: 0.4 },
      { x: 900, y: 80, w: 100, h: 35, speed: 0.4 },
      { x: 1500, y: 120, w: 150, h: 45, speed: 0.4 },
      { x: 2100, y: 160, w: 90, h: 32, speed: 0.4 },
      { x: 2700, y: 90, w: 130, h: 40, speed: 0.4 }
    ];

    const particles = [];

    // Setup input listeners
    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
      }
    };

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    // Bind touch event controllers for mobile testing
    const setupTouchEvents = () => {
      const btnLeft = document.getElementById('touch-left');
      const btnRight = document.getElementById('touch-right');
      const btnJump = document.getElementById('touch-jump');

      if (btnLeft && btnRight && btnJump) {
        const startLeft = (e) => { e.preventDefault(); touchInputs.left = true; };
        const endLeft = (e) => { e.preventDefault(); touchInputs.left = false; };
        const startRight = (e) => { e.preventDefault(); touchInputs.right = true; };
        const endRight = (e) => { e.preventDefault(); touchInputs.right = false; };
        const startJump = (e) => { e.preventDefault(); touchInputs.jump = true; };
        const endJump = (e) => { e.preventDefault(); touchInputs.jump = false; };

        btnLeft.addEventListener('touchstart', startLeft);
        btnLeft.addEventListener('touchend', endLeft);
        btnRight.addEventListener('touchstart', startRight);
        btnRight.addEventListener('touchend', endRight);
        btnJump.addEventListener('touchstart', startJump);
        btnJump.addEventListener('touchend', endJump);

        return () => {
          btnLeft.removeEventListener('touchstart', startLeft);
          btnLeft.removeEventListener('touchend', endLeft);
          btnRight.removeEventListener('touchstart', startRight);
          btnRight.removeEventListener('touchend', endRight);
          btnJump.removeEventListener('touchstart', startJump);
          btnJump.removeEventListener('touchend', endJump);
        };
      }
      return () => {};
    };

    const cleanupTouch = setupTouchEvents();

    const spawnParticles = (x, y, colorCount = 8) => {
      for (let i = 0; i < colorCount; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5 - 2,
          radius: Math.random() * 2.5 + 1,
          alpha: 1,
          decay: Math.random() * 0.04 + 0.02,
          color: Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4'
        });
      }
    };

    // AABB Bounding Box Collision
    const checkCollision = (r1, r2) => {
      return (
        r1.x < r2.x + r2.width &&
        r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height &&
        r1.y + r1.height > r2.y
      );
    };

    const updatePhysics = () => {
      // Pause walking physics if a case study popup is open
      if (activeCardRef.current || gameWon) {
        player.vx = 0;
        player.isWalking = false;
        return;
      }

      // Left/Right Controls
      player.isWalking = false;
      if (keys.ArrowLeft || keys.KeyA || touchInputs.left) {
        player.vx = -player.speed;
        player.direction = 'left';
        player.isWalking = true;
      } else if (keys.ArrowRight || keys.KeyD || touchInputs.right) {
        player.vx = player.speed;
        player.direction = 'right';
        player.isWalking = true;
      } else {
        player.vx *= friction;
      }

      // Jump controls
      if ((keys.ArrowUp || keys.KeyW || keys.Space || touchInputs.jump) && player.grounded) {
        player.vy = -player.jumpForce;
        player.grounded = false;
        playSound('jump');
      }

      // Apply Gravity
      player.vy += gravity;

      // Update positions
      player.x += player.vx;
      player.y += player.vy;

      // Ground bounds collision
      if (player.y + player.height >= floorY) {
        player.y = floorY - player.height;
        player.vy = 0;
        player.grounded = true;
      }

      // Level boundaries
      if (player.x < 10) player.x = 10;
      if (player.x > 3400) player.x = 3400;

      // Update character legs swing animation frame
      if (player.isWalking) {
        player.frame += 0.15;
      } else {
        player.frame = 0;
      }

      // Camera positioning system (scroll camera to track player offset)
      const targetCameraX = player.x - width / 3.5;
      cameraX += (targetCameraX - cameraX) * 0.1;
      if (cameraX < 0) cameraX = 0;
      if (cameraX > 3500 - width) cameraX = 3500 - width;

      // Block Collisions
      blocks.forEach((block) => {
        // Simple bounce cycle tick
        if (block.bounceProgress > 0) {
          block.bounceProgress -= 0.1;
        }

        if (checkCollision(player, block)) {
          // Check collision direction
          const overlapX = Math.min(player.x + player.width, block.x + block.width) - Math.max(player.x, block.x);
          const overlapY = Math.min(player.y + player.height, block.y + block.height) - Math.max(player.y, block.y);

          if (overlapY < overlapX) {
            // Collision is vertical
            if (player.vy < 0 && player.y + player.height/2 > block.y + block.height/2) {
              // Player hit block from bottom
              player.y = block.y + block.height;
              player.vy = 0.5; // slow down velocity
              
              if (!block.hit) {
                block.hit = true;
                block.bounceProgress = 1;
                spawnParticles(block.x + block.width/2, block.y, 12);
                playSound('coin');
                
                // Show the unlocked bento-panel content
                setTimeout(() => {
                  setActiveCard(PROJECT_CARDS[block.type]);
                  playSound('powerup');
                }, 200);
              } else {
                playSound('bump');
              }
            } else if (player.vy > 0 && player.y < block.y) {
              // Stand on top of the block
              player.y = block.y - player.height;
              player.vy = 0;
              player.grounded = true;
            }
          } else {
            // Collision is horizontal (solid barrier walls)
            if (player.x < block.x) {
              player.x = block.x - player.width;
            } else {
              player.x = block.x + block.width;
            }
          }
        }
      });

      // Coin collections
      coins.forEach((coin) => {
        if (!coin.collected) {
          // Bounding circle collision
          const cx = coin.x;
          const cy = coin.y;
          const px = player.x + player.width/2;
          const py = player.y + player.height/2;
          const dist = Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
          
          if (dist < 26) {
            coin.collected = true;
            setCoinsCollected(prev => [...prev, coin.label]);
            spawnParticles(coin.x, coin.y, 6);
            playSound('coin');
          }
        }
      });

      // Flagpole slide interaction
      if (player.x + player.width >= flagPole.x && !flagPole.triggered) {
        flagPole.triggered = true;
        player.vx = 0;
        player.x = flagPole.x - player.width / 2;
        playSound('win');
        
        // Slide player down the flag pole
        const slideDown = () => {
          if (player.y + player.height < floorY) {
            player.y += 2.5;
            flagPole.flagY += 2.5;
            if (flagPole.flagY > floorY - 40) flagPole.flagY = floorY - 40;
            requestAnimationFrame(slideDown);
          } else {
            player.y = floorY - player.height;
            setTimeout(() => {
              setGameWon(true);
            }, 600);
          }
        };
        slideDown();
      }

      // Update float particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravity on sparks
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    const draw = () => {
      // Clear viewport
      ctx.fillStyle = '#0d0a1a';
      ctx.fillRect(0, 0, width, height);

      // Parallax Sky Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 40; i++) {
        const starX = (i * 12345) % width;
        const starY = (i * 98765) % (floorY - 50);
        ctx.fillRect(starX, starY, 1.2, 1.2);
      }

      // Parallax Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      clouds.forEach((cloud) => {
        const drawX = cloud.x - cameraX * cloud.speed;
        // Wrap rendering around screen size bounds
        const wrapX = ((drawX + cloud.w) % (width + cloud.w * 2)) - cloud.w;
        
        ctx.beginPath();
        ctx.arc(wrapX, cloud.y, cloud.h/2, 0, Math.PI * 2);
        ctx.arc(wrapX + cloud.w/3, cloud.y - cloud.h/4, cloud.h/2, 0, Math.PI * 2);
        ctx.arc(wrapX + cloud.w/1.6, cloud.y, cloud.h/2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Parallax Hills
      ctx.fillStyle = 'rgba(139, 92, 246, 0.025)';
      hills.forEach((hill) => {
        const drawX = hill.x - cameraX * hill.speed;
        ctx.beginPath();
        ctx.moveTo(drawX, floorY);
        ctx.quadraticCurveTo(drawX + hill.w/2, floorY - hill.h, drawX + hill.w, floorY);
        ctx.fill();
      });

      // Floor grid grid lines (looks futuristic & structural)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const startGrid = Math.floor(cameraX / 40) * 40;
      for (let x = startGrid; x < startGrid + width + 40; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x - cameraX, floorY);
        ctx.lineTo(x - cameraX, height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(width, floorY);
      ctx.stroke();

      // Draw Floor ground platform
      ctx.fillStyle = '#06040e';
      ctx.fillRect(0, floorY, width, height - floorY);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
      ctx.fillRect(0, floorY, width, 3); // glowing top neon edge

      // Draw Flagpole
      const fpDrawX = flagPole.x - cameraX;
      if (fpDrawX + flagPole.width > 0 && fpDrawX < width) {
        // Pole line
        ctx.fillStyle = '#27272a';
        ctx.fillRect(fpDrawX, flagPole.y, flagPole.width, flagPole.height);
        
        // Pole top ball
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(fpDrawX + flagPole.width/2, flagPole.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Moving flag banner
        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.moveTo(fpDrawX + flagPole.width, flagPole.flagY);
        ctx.lineTo(fpDrawX + flagPole.width + 36, flagPole.flagY + 12);
        ctx.lineTo(fpDrawX + flagPole.width, flagPole.flagY + 24);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.fillText("GOAL", fpDrawX - 12, flagPole.y - 18);
      }

      // Draw Level Signs / Milestones
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '9px monospace';
      ctx.fillText("<- ESC TO EXIT GAME", 20, 24);

      const signDrawX = 140 - cameraX;
      if (signDrawX > -100 && signDrawX < width) {
        ctx.fillStyle = '#18181b';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(signDrawX, floorY - 60, 110, 36, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#3f3f46';
        ctx.fillRect(signDrawX + 50, floorY - 24, 6, 24); // sign pole

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px monospace';
        ctx.fillText("USE ARROW KEYS", signDrawX + 10, floorY - 46);
        ctx.fillText("OR A/D TO RUN!", signDrawX + 10, floorY - 34);
      }

      // Draw Question Blocks (?)
      blocks.forEach((block) => {
        const drawX = block.x - cameraX;
        if (drawX + block.width > 0 && drawX < width) {
          // Bounce visual offset
          let drawY = block.y;
          if (block.bounceProgress > 0) {
            drawY += -14 * Math.sin(block.bounceProgress * Math.PI);
          }

          // Block container
          ctx.fillStyle = block.hit ? '#18181b' : '#27272a';
          ctx.strokeStyle = block.hit ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(drawX, drawY, block.width, block.height, 8);
          ctx.fill();
          ctx.stroke();

          // Monospace Inner ? or Block state
          ctx.fillStyle = block.hit ? '#52525b' : '#ffffff';
          ctx.font = 'bold 16px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            block.hit ? 'x' : '?',
            drawX + block.width/2,
            drawY + block.height/2 + (block.hit ? -1 : 0)
          );
          ctx.textAlign = 'left'; // reset
          ctx.textBaseline = 'alphabetic'; // reset

          // Label overhead showing section name
          ctx.fillStyle = block.hit ? 'rgba(255,255,255,0.2)' : 'rgba(255, 255, 255, 0.5)';
          ctx.font = 'bold 7px monospace';
          const label = block.type.toUpperCase();
          ctx.fillText(label, drawX + block.width/2 - ctx.measureText(label).width/2, drawY - 8);
        }
      });

      // Draw Coins (Skills)
      coins.forEach((coin) => {
        if (!coin.collected) {
          const drawX = coin.x - cameraX;
          if (drawX + 16 > 0 && drawX < width) {
            // Bobbing animation offset
            const bobY = coin.y + 4 * Math.sin(Date.now() * 0.005);
            
            // Draw golden coin shape
            ctx.fillStyle = '#fbbf24';
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(drawX, bobY, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Tiny central star
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(drawX, bobY, 2, 0, Math.PI * 2);
            ctx.fill();

            // Label text underneath showing skill name
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.font = '6px monospace';
            ctx.fillText(coin.label, drawX - ctx.measureText(coin.label).width/2, bobY - 10);
          }
        }
      });

      // Draw Sparks/Particles
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x - cameraX, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0; // reset
      });

      // Draw Player Character (Minimalist sci-fi astronaut design)
      const pDrawX = player.x - cameraX;
      
      // Face direction flip
      ctx.save();
      if (player.direction === 'left') {
        ctx.translate(pDrawX + player.width/2, player.y + player.height/2);
        ctx.scale(-1, 1);
        ctx.translate(-(pDrawX + player.width/2), -(player.y + player.height/2));
      }

      // Legs animation math
      const legSwing = player.isWalking ? Math.sin(player.frame) * 6 : 0;

      // Draw Body Capsule (dark grey space jacket)
      ctx.fillStyle = '#27272a';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pDrawX, player.y + 10, player.width, 16, 6);
      ctx.fill();
      ctx.stroke();

      // Draw Helmet (white circle)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pDrawX + player.width/2, player.y + 7, 7, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Neon Visor (cyan glass mask)
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.roundRect(pDrawX + player.width/2 - 1, player.y + 4, 6, 5, 2);
      ctx.fill();

      // Draw walking legs swing paths
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3.5;
      
      if (!player.grounded) {
        // Jumping state legs pulled up
        ctx.beginPath();
        ctx.moveTo(pDrawX + 6, player.y + 25);
        ctx.lineTo(pDrawX + 4, player.y + 28);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pDrawX + 18, player.y + 25);
        ctx.lineTo(pDrawX + 20, player.y + 28);
        ctx.stroke();
      } else {
        // Walking swing cycles
        ctx.beginPath();
        ctx.moveTo(pDrawX + 7, player.y + 25);
        ctx.lineTo(pDrawX + 7 + legSwing, player.y + 32);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pDrawX + 17, player.y + 25);
        ctx.lineTo(pDrawX + 17 - legSwing, player.y + 32);
        ctx.stroke();
      }

      ctx.restore();

      // Loop frame cycle
      updatePhysics();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      cleanupTouch();
      cancelAnimationFrame(animationFrameId);
    };
  }, [soundEnabled]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-screen h-screen bg-[#0d0a1a] z-[100] overflow-hidden flex flex-col font-mono select-none"
    >
      {/* Game Header Bar */}
      <div className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-[#06040e]/90 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-white tracking-widest uppercase">NIBEDITA'S WORLD</span>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-bold">
            <span>🪙 SKILLS:</span>
            <span>{coinsCollected.length}/{totalCoinsCount}</span>
          </div>
        </div>

        {/* Sound toggle & close */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title={soundEnabled ? "Mute audio" : "Unmute audio"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 text-xs font-black uppercase text-zinc-400 hover:text-red-400 transition-all cursor-pointer"
          >
            <X size={12} /> Exit Game
          </button>
        </div>
      </div>

      {/* Main Game Screen Canvas */}
      <div className="flex-1 relative bg-black/40">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Start Game Instructions overlay */}
        {coinsCollected.length === 0 && !activeCard && (
          <div className="absolute top-12 left-12 p-5 max-w-sm rounded-2xl border border-white/5 bg-[#12131c]/65 backdrop-blur-md text-left pointer-events-none select-none">
            <h4 className="text-xs font-black text-accent uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span>✦</span> INSTRUCTIONS
            </h4>
            <ul className="space-y-1 text-[10px] text-zinc-400 leading-relaxed font-sans">
              <li className="flex items-center gap-1.5">
                <CornerDownRight size={10} className="text-indigo-400 flex-shrink-0" />
                <span>Move with **Arrow Keys** or **A / D**</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CornerDownRight size={10} className="text-indigo-400 flex-shrink-0" />
                <span>Jump with **Space**, **Up**, or **W**</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CornerDownRight size={10} className="text-indigo-400 flex-shrink-0" />
                <span>Hit Question Blocks **(?)** to pop portfolio slides</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CornerDownRight size={10} className="text-indigo-400 flex-shrink-0" />
                <span>Collect golden coins to view interactive skills</span>
              </li>
            </ul>
          </div>
        )}

        {/* Mobile View Touch HUD Pad Overlay (renders only on touch screen triggers) */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between md:hidden pointer-events-none z-10">
          <div className="flex gap-3 pointer-events-auto">
            <button 
              id="touch-left"
              className="w-14 h-14 rounded-full border border-white/10 bg-white/5 active:bg-accent active:text-[#0d0a1a] flex items-center justify-center text-lg font-black font-mono transition-all select-none"
            >
              ◀
            </button>
            <button 
              id="touch-right"
              className="w-14 h-14 rounded-full border border-white/10 bg-white/5 active:bg-accent active:text-[#0d0a1a] flex items-center justify-center text-lg font-black font-mono transition-all select-none"
            >
              ▶
            </button>
          </div>
          <div className="pointer-events-auto">
            <button 
              id="touch-jump"
              className="w-16 h-16 rounded-full border border-white/10 bg-accent text-[#0d0a1a] active:opacity-80 flex items-center justify-center text-sm font-black tracking-wider transition-all select-none"
            >
              JUMP
            </button>
          </div>
        </div>

        {/* Fullscreen Overlay Dialogs for Question Block Hits */}
        <AnimatePresence>
          {activeCard && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0d0a1a]/85 backdrop-blur-sm z-30 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ type: 'spring', damping: 20 }}
                className="bento-panel border border-white/10 p-6 md:p-8 rounded-[32px] w-full max-w-lg relative bg-[#12131c]/90 text-left shadow-2xl flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black block">
                      {activeCard.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white mt-1" style={{ color: activeCard.color }}>
                      {activeCard.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveCard(null)}
                    className="p-1.5 rounded-lg border border-white/5 hover:bg-white/5 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Content body */}
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans font-medium">
                  {activeCard.content}
                </p>

                {/* Skill tag list */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeCard.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-white/5 border border-white/5 text-zinc-400 rounded-lg text-[9px] font-mono uppercase font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  {activeCard.id !== 'about' ? (
                    <a
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCard(null);
                        onClose(); // Exit game so they scroll to the project details section
                        setTimeout(() => {
                          const element = document.getElementById('projects');
                          if (element) {
                            window.scrollTo({
                              top: element.getBoundingClientRect().top + window.scrollY - 90,
                              behavior: 'smooth'
                            });
                          }
                        }, 100);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-[#0d0a1a] hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                      style={{ backgroundColor: activeCard.color }}
                    >
                      View Case Study <ArrowRight size={12} />
                    </a>
                  ) : (
                    <div />
                  )}

                  <button 
                    onClick={() => setActiveCard(null)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-black uppercase text-white cursor-pointer"
                  >
                    Resume Journey ▷
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Victory Flagpole Complete Screen */}
        <AnimatePresence>
          {gameWon && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#0d0a1a]/95 z-40 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, rotate: -1 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 18 }}
                className="border border-white/10 p-8 rounded-[36px] bg-[#12131c]/80 backdrop-blur-md max-w-md w-full text-center flex flex-col gap-6 relative overflow-hidden"
              >
                {/* Glowing celebration background */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="text-5xl">🏆</div>
                <div>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-accent uppercase font-black block">CONGRATULATIONS!</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1">YOU CLEARED THE STAGE!</h3>
                </div>

                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
                  You have successfully explored Nibedita's design portfolio and collected <strong>{coinsCollected.length} skill nodes</strong>!
                </p>

                {/* Collected Skills Tag list */}
                {coinsCollected.length > 0 && (
                  <div className="bg-black/30 border border-white/5 p-4 rounded-2xl text-left">
                    <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase font-black block mb-2">Collected Skills Inventory</span>
                    <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto pr-1">
                      {Array.from(new Set(coinsCollected)).map((skill, idx) => (
                        <span key={idx} className="bg-white/5 border border-white/5 text-zinc-300 text-[8px] font-mono px-2 py-0.5 rounded uppercase">
                          ★ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Victory Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          window.scrollTo({
                            top: element.getBoundingClientRect().top + window.scrollY - 90,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="flex-1 py-3 rounded-2xl bg-accent text-[#0d0a1a] font-black uppercase text-xs tracking-wider hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent/20 cursor-pointer"
                  >
                    Hire Nibedita ✉
                  </button>
                  <button
                    onClick={() => {
                      // Restart the game levels
                      setCoinsCollected([]);
                      setGameWon(false);
                      setActiveCard(null);
                    }}
                    className="flex-1 py-3 rounded-2xl border border-white/10 hover:bg-white/5 text-white font-black uppercase text-xs tracking-wider transition-all cursor-pointer"
                  >
                    Play Again ↻
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MarioPortfolio;
