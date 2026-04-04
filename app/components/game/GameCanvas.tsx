'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gameProjects } from './gameData';
import ProjectModal from './ProjectModal';
import { ProjectItem } from './types';

interface GameCanvasProps {
  onAllCollected?: () => void;
  onSkip?: () => void;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
  layer: number; // 0=far, 1=mid, 2=near
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface FloatingProject extends ProjectItem {
  spawnX: number;
  spawnY: number;
  bobOffset: number;
  bobSpeed: number;
  glowIntensity: number;
  spawned: boolean;
  pulsePhase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export default function GameCanvas({ onAllCollected, onSkip }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>();
  const timeRef = useRef(0);

  // Airplane state
  const planeRef = useRef({
    x: 200,
    y: 300,
    targetX: 200,
    targetY: 300,
    rotation: 0,
    trail: [] as { x: number; y: number; opacity: number }[],
    speed: 0,
  });

  // Clouds for parallax background
  const cloudsRef = useRef<Cloud[]>([]);
  const starsRef = useRef<Star[]>([]);
  const projectsRef = useRef<FloatingProject[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'complete'>('idle');
  const gameStateRef = useRef<'idle' | 'playing' | 'paused' | 'complete'>('idle');
  const [collectedCount, setCollectedCount] = useState(0);
  const [modalProject, setModalProject] = useState<FloatingProject | null>(null);
  const collectedCountRef = useRef(0);

  const setGameStateBoth = (s: 'idle' | 'playing' | 'paused' | 'complete') => {
    gameStateRef.current = s;
    setGameState(s);
  };

  // Initialize background elements
  const initBackground = useCallback((width: number, height: number) => {
    // Stars (subtle, far background)
    starsRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      radius: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.5,
      twinkleSpeed: 0.5 + Math.random() * 2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Clouds across 3 parallax layers
    cloudsRef.current = [];
    // Far layer (slow, small)
    for (let i = 0; i < 6; i++) {
      cloudsRef.current.push({
        x: Math.random() * width * 1.5 - width * 0.25,
        y: 40 + Math.random() * height * 0.35,
        width: 120 + Math.random() * 80,
        height: 50 + Math.random() * 30,
        speed: 0.15 + Math.random() * 0.1,
        opacity: 0.15 + Math.random() * 0.1,
        layer: 0,
      });
    }
    // Mid layer
    for (let i = 0; i < 5; i++) {
      cloudsRef.current.push({
        x: Math.random() * width * 1.5 - width * 0.25,
        y: 60 + Math.random() * height * 0.5,
        width: 150 + Math.random() * 100,
        height: 60 + Math.random() * 40,
        speed: 0.3 + Math.random() * 0.15,
        opacity: 0.2 + Math.random() * 0.15,
        layer: 1,
      });
    }
    // Near layer (fast, large)
    for (let i = 0; i < 4; i++) {
      cloudsRef.current.push({
        x: Math.random() * width * 1.5 - width * 0.25,
        y: 80 + Math.random() * height * 0.6,
        width: 200 + Math.random() * 120,
        height: 80 + Math.random() * 50,
        speed: 0.5 + Math.random() * 0.2,
        opacity: 0.25 + Math.random() * 0.15,
        layer: 2,
      });
    }
  }, []);

  // Initialize projects - spawn closer and faster
  const initProjects = useCallback((width: number, height: number) => {
    projectsRef.current = gameProjects.map((p, i) => ({
      ...p,
      position: { x: width + 100 + i * 200, y: height * 0.2 + Math.random() * height * 0.6 },
      velocity: { vx: -(1.8 + Math.random() * 0.8), vy: 0 },
      radius: 50,
      collected: false,
      spawnX: width + 100 + i * 200,
      spawnY: height * 0.2 + Math.random() * height * 0.6,
      bobOffset: Math.random() * Math.PI * 2,
      bobSpeed: 0.8 + Math.random() * 0.5,
      glowIntensity: 0,
      spawned: true,
      pulsePhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  // Draw sky gradient background
  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    // Deep sky gradient - twilight/dusk sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#0a0a1a');
    skyGrad.addColorStop(0.3, '#0d1b3e');
    skyGrad.addColorStop(0.6, '#1a2a5e');
    skyGrad.addColorStop(0.8, '#2d3a6e');
    skyGrad.addColorStop(1, '#1a1a3e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle horizon glow (aurora effect)
    const horizonGrad = ctx.createRadialGradient(width / 2, height * 0.75, 0, width / 2, height * 0.75, width * 0.8);
    horizonGrad.addColorStop(0, 'rgba(239, 83, 39, 0.06)');
    horizonGrad.addColorStop(0.5, 'rgba(100, 50, 200, 0.04)');
    horizonGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = horizonGrad;
    ctx.fillRect(0, 0, width, height);
  };

  // Draw twinkling stars
  const drawStars = (ctx: CanvasRenderingContext2D, time: number) => {
    starsRef.current.forEach(star => {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
      ctx.save();
      ctx.globalAlpha = star.opacity * twinkle;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  };

  // Draw a fluffy cloud
  const drawCloud = (ctx: CanvasRenderingContext2D, cloud: Cloud) => {
    ctx.save();
    ctx.globalAlpha = cloud.opacity;
    ctx.fillStyle = 'rgba(200, 220, 255, 1)';

    const cx = cloud.x;
    const cy = cloud.y;
    const w = cloud.width;
    const h = cloud.height;

    ctx.beginPath();
    ctx.ellipse(cx, cy, w * 0.5, h * 0.35, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - w * 0.25, cy + h * 0.1, w * 0.3, h * 0.28, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + w * 0.25, cy + h * 0.08, w * 0.32, h * 0.26, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - w * 0.1, cy - h * 0.15, w * 0.25, h * 0.25, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + w * 0.15, cy - h * 0.12, w * 0.22, h * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Draw airplane with engine glow + trail
  const drawAirplane = (ctx: CanvasRenderingContext2D, plane: typeof planeRef.current, time: number) => {
    // Draw trail
    plane.trail.forEach((pt, i) => {
      const alpha = pt.opacity * (i / plane.trail.length) * 0.4;
      if (alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ef5327';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3 * (i / plane.trail.length), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    ctx.save();
    ctx.translate(plane.x, plane.y);
    ctx.rotate(plane.rotation);

    const s = 1.4; // scale

    // Engine glow
    const engineGlow = ctx.createRadialGradient(-14 * s, 0, 0, -14 * s, 0, 20 * s);
    engineGlow.addColorStop(0, 'rgba(239, 100, 39, 0.6)');
    engineGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = engineGlow;
    ctx.beginPath();
    ctx.arc(-14 * s, 0, 20 * s, 0, Math.PI * 2);
    ctx.fill();

    // Exhaust flame (animated)
    const flameLen = 15 + Math.sin(time * 20) * 5;
    const flameGrad = ctx.createLinearGradient(-14 * s, 0, -14 * s - flameLen, 0);
    flameGrad.addColorStop(0, 'rgba(255, 180, 50, 0.9)');
    flameGrad.addColorStop(0.4, 'rgba(239, 83, 39, 0.7)');
    flameGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(-12 * s, -4 * s);
    ctx.lineTo(-12 * s - flameLen, 0);
    ctx.lineTo(-12 * s, 4 * s);
    ctx.closePath();
    ctx.fill();

    // Main fuselage
    ctx.fillStyle = '#e8e8f0';
    ctx.beginPath();
    ctx.moveTo(22 * s, 0);
    ctx.lineTo(10 * s, -5 * s);
    ctx.lineTo(-14 * s, -6 * s);
    ctx.lineTo(-18 * s, -3 * s);
    ctx.lineTo(-18 * s, 3 * s);
    ctx.lineTo(-14 * s, 6 * s);
    ctx.lineTo(10 * s, 5 * s);
    ctx.closePath();
    ctx.fill();

    // Nose cone
    ctx.fillStyle = '#ef5327';
    ctx.beginPath();
    ctx.moveTo(22 * s, 0);
    ctx.lineTo(14 * s, -3 * s);
    ctx.lineTo(14 * s, 3 * s);
    ctx.closePath();
    ctx.fill();

    // Main wings
    ctx.fillStyle = '#c8c8d8';
    ctx.beginPath();
    ctx.moveTo(2 * s, -5 * s);
    ctx.lineTo(-6 * s, -24 * s);
    ctx.lineTo(-10 * s, -24 * s);
    ctx.lineTo(-8 * s, -5 * s);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(2 * s, 5 * s);
    ctx.lineTo(-6 * s, 24 * s);
    ctx.lineTo(-10 * s, 24 * s);
    ctx.lineTo(-8 * s, 5 * s);
    ctx.closePath();
    ctx.fill();

    // Wing accent
    ctx.fillStyle = '#ef5327';
    ctx.beginPath();
    ctx.moveTo(0, -5 * s);
    ctx.lineTo(-4 * s, -22 * s);
    ctx.lineTo(-6 * s, -22 * s);
    ctx.lineTo(-6 * s, -5 * s);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 5 * s);
    ctx.lineTo(-4 * s, 22 * s);
    ctx.lineTo(-6 * s, 22 * s);
    ctx.lineTo(-6 * s, 5 * s);
    ctx.closePath();
    ctx.fill();

    // Tail fin
    ctx.fillStyle = '#c8c8d8';
    ctx.beginPath();
    ctx.moveTo(-10 * s, -5 * s);
    ctx.lineTo(-16 * s, -14 * s);
    ctx.lineTo(-18 * s, -14 * s);
    ctx.lineTo(-18 * s, -5 * s);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-10 * s, 5 * s);
    ctx.lineTo(-16 * s, 14 * s);
    ctx.lineTo(-18 * s, 14 * s);
    ctx.lineTo(-18 * s, 5 * s);
    ctx.closePath();
    ctx.fill();

    // Cockpit window
    ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
    ctx.beginPath();
    ctx.ellipse(12 * s, -2 * s, 5 * s, 3 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Window shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.ellipse(13 * s, -3 * s, 2 * s, 1.5 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Draw a project item as a glowing orb in the sky
  const drawProjectItem = (ctx: CanvasRenderingContext2D, project: FloatingProject, time: number) => {
    if (project.collected) return;

    const { x, y } = project.position;
    const bob = Math.sin(time * project.bobSpeed + project.bobOffset) * 8;
    const py = y + bob;
    const pulse = Math.sin(time * 2 + project.pulsePhase) * 0.3 + 0.7;

    // Outer glow ring
    for (let r = 3; r >= 1; r--) {
      const glowGrad = ctx.createRadialGradient(x, py, 0, x, py, project.radius * r);
      glowGrad.addColorStop(0, `rgba(239, 83, 39, ${0.15 / r})`);
      glowGrad.addColorStop(0.5, `rgba(239, 83, 39, ${0.05 / r})`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x, py, project.radius * r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Main orb
    const orbGrad = ctx.createRadialGradient(x - 8, py - 8, 0, x, py, project.radius);
    orbGrad.addColorStop(0, 'rgba(255, 150, 100, 0.95)');
    orbGrad.addColorStop(0.4, 'rgba(239, 83, 39, 0.9)');
    orbGrad.addColorStop(0.8, 'rgba(180, 40, 10, 0.85)');
    orbGrad.addColorStop(1, 'rgba(100, 20, 0, 0.7)');
    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(x, py, project.radius * pulse * 0.05 + project.radius * 0.95, 0, Math.PI * 2);
    ctx.fill();

    // Orb border ring
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 180, 100, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, py, project.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Inner shine
    const shineGrad = ctx.createRadialGradient(x - 10, py - 12, 0, x - 10, py - 12, project.radius * 0.6);
    shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    shineGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = shineGrad;
    ctx.beginPath();
    ctx.arc(x, py, project.radius, 0, Math.PI * 2);
    ctx.fill();

    // Project initial letter
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${project.radius * 0.7}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText(project.title.charAt(0), x, py);
    ctx.restore();

    // Project name label below orb
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = `bold 13px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 6;
    ctx.fillText(project.title, x, py + project.radius + 8);
    ctx.restore();
  };

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(p => {
      const alpha = p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  };

  // Spawn collect particles
  const spawnCollectParticles = (x: number, y: number) => {
    const colors = ['#ef5327', '#ff8c42', '#ffd700', '#ffffff', '#ff6b6b'];
    for (let i = 0; i < 25; i++) {
      const angle = (Math.PI * 2 * i) / 25 + Math.random() * 0.3;
      const speed = 2 + Math.random() * 5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
        maxLife: 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 4,
      });
    }
  };

  // Distance helper
  const dist = (ax: number, ay: number, bx: number, by: number) =>
    Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);

  // Main game loop
  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const t = (timeRef.current += 0.016);
      const W = canvas.width;
      const H = canvas.height;

      // ---- Draw Background ----
      drawBackground(ctx, W, H, t);
      drawStars(ctx, t);

      // ---- Update & Draw Clouds ----
      cloudsRef.current.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.width < -50) {
          cloud.x = W + cloud.width + Math.random() * 200;
          cloud.y = 40 + Math.random() * H * 0.6;
        }
        drawCloud(ctx, cloud);
      });

      // ---- Update Airplane ----
      const plane = planeRef.current;
      const lerpF = 0.06;
      const prevX = plane.x;
      const prevY = plane.y;
      plane.x += (plane.targetX - plane.x) * lerpF;
      plane.y += (plane.targetY - plane.y) * lerpF;

      const dx = plane.targetX - plane.x;
      const dy = plane.targetY - plane.y;
      plane.rotation = Math.atan2(dy, dx);
      plane.speed = dist(plane.x, plane.y, prevX, prevY);

      // Trail
      plane.trail.unshift({ x: plane.x, y: plane.y, opacity: 1 });
      if (plane.trail.length > 40) plane.trail.pop();
      plane.trail.forEach(pt => { pt.opacity -= 0.025; });

      // ---- Update & Draw Projects ----
      if (gameStateRef.current === 'playing') {
        projectsRef.current.forEach((project, idx) => {
          if (project.collected) return;

          // Move left slowly
          project.position.x += project.velocity.vx;

          // If off left edge, wrap to right with closer spacing
          if (project.position.x < -100) {
            project.position.x = W + 100 + Math.random() * 150;
            project.position.y = H * 0.15 + Math.random() * H * 0.65;
          }

          // Collision detection
          const bob = Math.sin(t * project.bobSpeed + project.bobOffset) * 8;
          const projY = project.position.y + bob;
          const d = dist(plane.x, plane.y, project.position.x, projY);

          if (d < project.radius + 25) {
            project.collected = true;
            spawnCollectParticles(project.position.x, projY);
            const newCount = collectedCountRef.current + 1;
            collectedCountRef.current = newCount;
            setCollectedCount(newCount);
            gameStateRef.current = 'paused';
            setGameState('paused');
            setTimeout(() => {
              setModalProject({ ...project });
            }, 200);
          }

          drawProjectItem(ctx, project, t);
        });
      } else if (gameStateRef.current === 'paused') {
        // Draw projects but no collision
        projectsRef.current.forEach(project => {
          drawProjectItem(ctx, project, t);
        });
      }

      // ---- Draw Particles ----
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life--;
        return p.life > 0;
      });
      drawParticles(ctx);

      // ---- Draw Airplane (on top) ----
      if (gameStateRef.current !== 'idle') {
        drawAirplane(ctx, plane, t);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Setup canvas & resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initBackground(canvas.width, canvas.height);
      if (gameStateRef.current !== 'idle') {
        // Re-init projects if needed
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [initBackground]);

  // Start animation loop
  useEffect(() => {
    const cleanup = startLoop();
    return cleanup;
  }, [startLoop]);

  // Mouse/touch tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      planeRef.current.targetX = e.clientX - rect.left;
      planeRef.current.targetY = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      planeRef.current.targetX = touch.clientX - rect.left;
      planeRef.current.targetY = touch.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleStart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Center plane
    planeRef.current.x = canvas.width * 0.2;
    planeRef.current.y = canvas.height * 0.5;
    planeRef.current.targetX = canvas.width * 0.2;
    planeRef.current.targetY = canvas.height * 0.5;
    planeRef.current.trail = [];
    collectedCountRef.current = 0;
    setCollectedCount(0);

    initProjects(canvas.width, canvas.height);
    setGameStateBoth('playing');
  };

  const handleModalClose = () => {
    setModalProject(null);
    const allCollected = projectsRef.current.every(p => p.collected);
    if (allCollected) {
      setGameStateBoth('complete');
      setTimeout(() => {
        onAllCollected?.();
      }, 1500);
    } else {
      setGameStateBoth('playing');
    }
  };

  const totalProjects = gameProjects.length;

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ minHeight: '100vh' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block', cursor: gameState === 'playing' ? 'none' : 'default' }}
      />

      {/* Score HUD */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 flex items-center gap-3">
            <span className="text-2xl">✈️</span>
            <span className="text-white font-semibold text-sm">
              Projects Discovered:
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalProjects }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full border transition-all duration-500 ${
                    i < collectedCount
                      ? 'bg-orange-500 border-orange-300 shadow-[0_0_8px_rgba(239,83,39,0.8)]'
                      : 'bg-white/10 border-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skip button */}
      {(gameState === 'playing' || gameState === 'paused') && onSkip && (
        <button
          onClick={onSkip}
          className="absolute top-6 right-6 z-10 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white text-sm rounded-full transition-all hover:border-white/30"
        >
          Skip to Projects →
        </button>
      )}

      {/* Instruction */}
      {gameState === 'playing' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/10">
            <p className="text-white/70 text-sm">🖱️ Move your mouse to fly the plane — collect the glowing orbs!</p>
          </div>
        </div>
      )}

      {/* Start Screen */}
      {gameState === 'idle' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative text-center px-6 max-w-2xl">
            {/* Animated plane icon */}
            <div className="relative mb-6 inline-block">
              <div className="text-8xl" style={{ animation: 'bounce 2s ease-in-out infinite' }}>✈️</div>
              <div className="absolute -inset-6 bg-orange-500/15 rounded-full blur-2xl animate-pulse" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Project Explorer
            </h2>
            <p className="text-white/70 text-lg mb-1 max-w-md mx-auto">
              Fly through the sky and discover my work
            </p>
            <p className="text-orange-400/80 text-sm font-medium mb-6">
              🖱️ Move your mouse to explore my projects
            </p>

            {/* Project count badges */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {gameProjects.map((p) => (
                <span
                  key={p.id}
                  className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-full text-xs font-medium"
                >
                  {p.title}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleStart}
                className="px-12 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-bold text-lg hover:from-orange-500 hover:to-orange-400 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(239,83,39,0.5)] active:scale-95 border border-orange-400/30"
              >
                Start Game 🚀
              </button>
              {onSkip && (
                <button
                  onClick={onSkip}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 text-sm font-medium transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Short on time? View Project Grid
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Complete Screen */}
      {gameState === 'complete' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative text-center px-6">
            <div className="text-7xl mb-5" style={{ animation: 'bounce 1s ease-in-out 3' }}>🎉</div>
            <h2 className="text-4xl font-bold text-white mb-3">Mission Complete!</h2>
            <p className="text-white/60 text-lg mb-4">You explored all {totalProjects} projects!</p>
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {gameProjects.map(p => (
                <span key={p.id} className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-medium">✓ {p.title}</span>
              ))}
            </div>
            <div className="text-orange-400/80 text-sm font-medium animate-pulse">⬇ Loading full project gallery...</div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {modalProject && (
        <ProjectModal project={modalProject} onClose={handleModalClose} />
      )}
    </div>
  );
}
