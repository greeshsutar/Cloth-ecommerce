'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { RotateCcw, Play } from 'lucide-react';

interface SariCurtainProps {
  onComplete?: () => void;
}

export const SariCurtain: React.FC<SariCurtainProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  // Asset reference: Single processed sari canvas image used for BOTH entrance and opening
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Master GSAP Timeline State
  const animStateRef = useRef({
    // Phase 1 (0.0s - 1.5s): Right -> Left full viewport cover (0 -> 1)
    p1: 0,
    // Phase 2 (1.65s - 3.25s): Bottom-Right -> Top-Left organic retraction (0 -> 1)
    p2: 0,
  });

  // Chroma-key out dark background on left of wavy border in Image 1
  const processWaveImage = useCallback((img: HTMLImageElement) => {
    const offCanvas = document.createElement('canvas');
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    offCanvas.width = w;
    offCanvas.height = h;

    const ctx = offCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return offCanvas;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Remove dark background pixels outside the left wavy border
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      if (r < 35 && g < 35 && b < 35) {
        data[i + 3] = 0; // Transparent
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return offCanvas;
  }, []);

  // Main Canvas Render Loop
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !waveCanvasRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const waveImg = waveCanvasRef.current;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const { p1, p2 } = animStateRef.current;

    // Enforce sari scale to cover viewport completely without left or right gaps
    const sariW = Math.max(W * 1.85, H * 2.8, 1920);
    const sariH = Math.max(H * 1.5, W * 1.0, 1080);
    const topY = (H - sariH) / 2;

    // Start position: Sari fully off-screen to the right
    const startX = W + 100;

    // End position: Solid sari fabric fully covers 100% of viewport from X=0 to X=W, compensating for left transparent margins
    const endX = -Math.round(sariW * 0.42);

    // =========================================================================
    // PHASE 1 — FULL EDGE-TO-EDGE COVERAGE (RIGHT -> LEFT MOVEMENT, 0.0s - 1.5s)
    // =========================================================================
    if (p2 === 0) {
      const currentX = startX + (endX - startX) * p1;

      // Render smooth sari body with wavy leading edge
      ctx.drawImage(waveImg, currentX, topY, sariW, sariH);
      ctx.restore();
      return;
    }

    // =========================================================================
    // PHASE 2 — ORGANIC FABRIC RETRACTION FROM BOTTOM-RIGHT TO TOP-LEFT (1.65s - 3.25s)
    // =========================================================================
    // Polar center of fabric retraction (just beyond bottom-right corner)
    const CX = W + 80;
    const CY = H + 80;
    const R_max = Math.sqrt((W + 300) ** 2 + (H + 300) ** 2) + 400;

    // Base radius sweeps from 0 (100% SARI) to R_max (0% SARI)
    const R_base = p2 * R_max;

    // Construct clipping path enclosing remaining SARI area (Top-Left region)
    ctx.beginPath();
    ctx.moveTo(-200, -200);
    ctx.lineTo(W + 200, -200);

    // Trace the organic fabric edge from right edge (a = 1.5 * PI) to bottom edge (a = PI)
    const steps = 90;
    for (let i = steps; i >= 0; i--) {
      const t = i / steps; // 1 (right edge) down to 0 (bottom edge)
      const angle = Math.PI + t * 0.5 * Math.PI;

      // Organic fabric drape curvature formula
      const arch = Math.sin(t * Math.PI) * (R_base * 0.14);
      const ripple1 = Math.sin(t * Math.PI * 3 + p2 * Math.PI * 1.5) * (R_base * 0.035);
      const ripple2 = Math.cos(t * Math.PI * 5) * (R_base * 0.015);
      const r = R_base + arch + ripple1 + ripple2;

      const px = CX + r * Math.cos(angle);
      const py = CY + r * Math.sin(angle);

      ctx.lineTo(px, py);
    }

    ctx.lineTo(-200, H + 200);
    ctx.closePath();

    ctx.clip();

    // Render THE EXACT SAME SARI IMAGE AT THE EXACT SAME FINAL POSITION (ZERO IMAGE SWAP)
    ctx.drawImage(waveImg, endX, topY, sariW, sariH);

    // Double-layered gold zari accent stroke along the organic fabric boundary
    // 1. Soft gold glow
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
    ctx.stroke();

    // 2. Sharp gold zari thread
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(255, 223, 118, 0.95)';
    ctx.stroke();

    ctx.restore();
  }, []);

  // Resize handler for Canvas DPR
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    renderFrame();
  }, [renderFrame]);

  // Preload single reference asset
  useEffect(() => {
    const waveImg = new Image();
    waveImg.src = '/sari_wave.png';
    waveImg.onload = () => {
      waveCanvasRef.current = processWaveImage(waveImg);
      setIsLoaded(true);
      handleResize();
    };
  }, [processWaveImage, handleResize]);

  // Master GSAP Timeline (Phase 1 COVER -> HOLD 150ms -> Phase 2 OPEN)
  const startAnimation = useCallback(() => {
    if (!isLoaded || !waveCanvasRef.current) return;

    setIsPlaying(true);
    setIsFinished(false);

    if (animTimelineRef.current) {
      animTimelineRef.current.kill();
    }

    animStateRef.current = { p1: 0, p2: 0 };

    const tl = gsap.timeline({
      onUpdate: () => {
        requestAnimationFrame(renderFrame);
      },
      onComplete: () => {
        setIsPlaying(false);
        setIsFinished(true);
        if (onComplete) onComplete();
      },
    });

    animTimelineRef.current = tl;

    // =========================================================================
    // MASTER TIMELINE:
    // =========================================================================
    // PHASE 1 — FULL COVER: 0.0s -> 1.5s (RIGHT -> LEFT, 100% viewport cover)
    tl.to(animStateRef.current, {
      p1: 1.0,
      duration: 1.5,
      ease: 'power2.out',
    }, 0.0);

    // PHASE 2 — SHORT HOLD: 1.5s -> 1.65s (150ms hold at 100% full sari cover)
    // Screen is 100% covered with sari before opening begins.

    // PHASE 3 — ORGANIC FABRIC REVEAL: 1.65s -> 3.25s (BOTTOM-RIGHT -> TOP-LEFT)
    tl.to(animStateRef.current, {
      p2: 1.0,
      duration: 1.6,
      ease: 'power2.inOut',
    }, 1.65);

  }, [isLoaded, renderFrame, onComplete]);

  // Auto-play on mount & listen for custom replay event from Navbar logo click
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    if (isLoaded) {
      window.scrollTo(0, 0);
      startAnimation();
    }

    const handleReplayEvent = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      startAnimation();
    };

    window.addEventListener('replay-sari-curtain', handleReplayEvent);
    return () => window.removeEventListener('replay-sari-curtain', handleReplayEvent);
  }, [isLoaded, startAnimation]);

  // Window resize listener
  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (isFinished) {
    return (
      <button
        onClick={startAnimation}
        className="fixed bottom-6 right-6 z-50 bg-espresso/90 hover:bg-gold text-ivory hover:text-espresso border border-gold/40 px-4 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-2xl backdrop-blur-md transition-all duration-300 group"
        title="Replay Silk Sari Curtain Reveal"
        aria-label="Replay Silk Sari Reveal"
      >
        <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-180 text-gold group-hover:text-espresso" />
        <span>REPLAY SARI ENTRANCE</span>
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] pointer-events-none w-full h-full overflow-hidden ${
        !isPlaying ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
      />

      <button
        onClick={startAnimation}
        className="pointer-events-auto absolute bottom-6 right-6 z-[10000] bg-espresso/80 text-gold-light border border-gold/30 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase flex items-center gap-1.5 opacity-70 hover:opacity-100 backdrop-blur-sm transition-opacity"
      >
        <Play className="w-3 h-3 fill-current" />
        <span>RESTART ANIMATION</span>
      </button>
    </div>
  );
};
