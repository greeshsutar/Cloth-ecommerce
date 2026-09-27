'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Sparkles, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Exactly 240 frames in sequential order from docs/ezgif-17d65ebcc68321de-jpg
const TOTAL_FRAMES = 240;

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Editorial Text Overlay Refs
  const introOverlayRef = useRef<HTMLDivElement | null>(null);
  const drapeOverlayRef = useRef<HTMLDivElement | null>(null);
  const craftOverlayRef = useRef<HTMLDivElement | null>(null);
  const modelOverlayRef = useRef<HTMLDivElement | null>(null);
  const finalCtaOverlayRef = useRef<HTMLDivElement | null>(null);

  // High-performance image cache & animation references (zero React re-renders during scroll)
  const imagesCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState<boolean>(false);
  const isReducedMotionRef = useRef<boolean>(false);

  // Build zero-padded sequential frame URL: /frames/ezgif-frame-001.jpg -> ezgif-frame-240.jpg
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/frames/ezgif-frame-${frameNum}.jpg`;
  }, []);

  // Canvas frame drawing function with aspect-ratio cover scaling
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Find requested frame or nearest loaded frame to eliminate any flicker
    let img: HTMLImageElement | null = imagesCacheRef.current[index] || null;
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Search backward
      for (let i = index - 1; i >= 0; i--) {
        const candidate = imagesCacheRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          img = candidate;
          break;
        }
      }
      // If still null, search forward
      if (!img) {
        for (let i = index + 1; i < TOTAL_FRAMES; i++) {
          const candidate = imagesCacheRef.current[i];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            img = candidate;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderHeight = canvasHeight;
      renderWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, []);

  // Resize canvas for device pixel ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = window.innerWidth * dpr;
    const targetH = window.innerHeight * dpr;

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all 240 sequential frames progressively
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isReducedMotionRef.current = prefersReduced;

    // 1. Immediately load frame 001 for instant visual presentation
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      imagesCacheRef.current[0] = firstImg;
      setFirstFrameLoaded(true);
      handleResize();
    };

    if (prefersReduced) {
      const finalImg = new Image();
      finalImg.src = getFrameUrl(TOTAL_FRAMES - 1);
      finalImg.onload = () => {
        imagesCacheRef.current[TOTAL_FRAMES - 1] = finalImg;
        currentFrameRef.current = TOTAL_FRAMES - 1;
        handleResize();
      };
      return;
    }

    // 2. Preload batch 1: Frames 002–050 + keyframes across the sequence
    const keyframes: number[] = [];
    for (let i = 1; i < Math.min(50, TOTAL_FRAMES); i++) {
      keyframes.push(i);
    }
    for (let i = 50; i < TOTAL_FRAMES; i += 3) {
      keyframes.push(i);
    }

    keyframes.forEach((idx) => {
      const img = new Image();
      img.src = getFrameUrl(idx);
      img.onload = () => {
        imagesCacheRef.current[idx] = img;
      };
    });

    // 3. Preload all remaining frames in idle / background queue
    const loadAll = () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!imagesCacheRef.current[i]) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => {
            imagesCacheRef.current[i] = img;
          };
        }
      }
    };

    const idleId =
      typeof window.requestIdleCallback !== 'undefined'
        ? window.requestIdleCallback(loadAll)
        : setTimeout(loadAll, 200);

    return () => {
      if (typeof window.cancelIdleCallback !== 'undefined' && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, [getFrameUrl, handleResize]);

  // Window resize listener
  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // GSAP ScrollTrigger synchronization for smooth frame progression
  useEffect(() => {
    if (!containerRef.current || !pinRef.current || isReducedMotionRef.current) return;

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger spanning the 700vh scroll narrative
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: 1.0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Normalized progress (0.0 -> 1.0) maps to exact frame index (0 -> 239)
          const targetIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
          );

          if (targetIndex !== currentFrameRef.current) {
            currentFrameRef.current = targetIndex;
            requestAnimationFrame(() => drawFrame(targetIndex));
          }
        },
      });

      // Synchronized timeline for editorial copy across the journey
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      // 0–10%: Initial Intro Welcome
      textTimeline.fromTo(
        introOverlayRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -25, duration: 0.1, ease: 'power2.inOut' },
        0.02
      );

      // 12–25%: "THE ART OF DRAPE"
      textTimeline
        .fromTo(
          drapeOverlayRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.07, ease: 'power3.out' },
          0.12
        )
        .to(
          drapeOverlayRef.current,
          { opacity: 0, y: -25, duration: 0.06, ease: 'power2.in' },
          0.24
        );

      // 32–45%: "CRAFTED IN SILENCE" (Left side away from doorway)
      textTimeline
        .fromTo(
          craftOverlayRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.07, ease: 'power3.out' },
          0.32
        )
        .to(
          craftOverlayRef.current,
          { opacity: 0, y: -25, duration: 0.06, ease: 'power2.in' },
          0.44
        );

      // 45–74%: Doorway passage & model reveal (Silent breathing room)

      // 75–88%: "MADE TO BE REMEMBERED."
      textTimeline
        .fromTo(
          modelOverlayRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.07, ease: 'power3.out' },
          0.75
        )
        .to(
          modelOverlayRef.current,
          { opacity: 0, y: -20, duration: 0.05, ease: 'power2.in' },
          0.87
        );

      // 90–100%: Final Model Composition & CTA
      textTimeline.fromTo(
        finalCtaOverlayRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.07, ease: 'power3.out' },
        0.90
      );
    }, containerRef);

    return () => ctx.revert();
  }, [drawFrame]);

  const scrollToCollection = () => {
    const el = document.getElementById('new-arrivals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-scroll-film"
      ref={containerRef}
      className="relative w-full h-[700vh] bg-espresso"
      aria-label="Aurelle Smooth Scroll Saree Boutique Film"
    >
      {/* 100vh Sticky Viewport */}
      <div
        ref={pinRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-espresso flex items-center justify-center"
      >
        {/* HTML5 Canvas Frame Renderer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-espresso/35 pointer-events-none z-10" />

        {/* First frame loading screen */}
        {!firstFrameLoaded && (
          <div className="absolute inset-0 z-30 bg-espresso flex flex-col items-center justify-center text-ivory">
            <div className="flex items-center gap-2.5 text-gold text-xs uppercase tracking-[0.35em] font-mono mb-3 animate-pulse">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Entering the Atelier...</span>
            </div>
            <span className="font-serif text-3xl tracking-[0.25em] uppercase text-ivory">
              AURELLE
            </span>
          </div>
        )}

        {/* Editorial Text Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-7xl mx-auto">
          
          <div className="w-full pt-16 sm:pt-20" />

          <div className="relative w-full my-auto flex items-center min-h-[260px]">
            
            {/* 1. Initial State (0–10%) */}
            <div
              ref={introOverlayRef}
              className="absolute left-0 max-w-md text-ivory"
            >
              <div className="flex items-center gap-2.5 text-gold text-[11px] sm:text-xs uppercase tracking-[0.35em] font-sans font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPRING · SUMMER &apos;26</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.08] tracking-tight text-ivory mb-4">
                The Saree <br />
                <span className="italic text-gold-light font-light">Sanctuary.</span>
              </h1>
              <p className="text-xs sm:text-sm text-ivory/75 font-sans leading-relaxed mb-6 max-w-xs">
                Journey through handwoven pure silks, zari motifs, and bespoke heirlooms.
              </p>
              <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-gold font-mono">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                <span>Scroll to Walk In</span>
              </div>
            </div>

            {/* 2. 0–25%: "THE ART OF DRAPE" */}
            <div
              ref={drapeOverlayRef}
              className="absolute left-0 sm:left-4 max-w-md text-ivory opacity-0 will-change-transform"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-mono block mb-2">
                SPRING · SUMMER &apos;26
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-ivory mb-2">
                THE ART OF DRAPE
              </h2>
              <p className="text-xs sm:text-sm text-ivory/80 font-sans font-light leading-relaxed">
                Where every weave tells a story.
              </p>
            </div>

            {/* 3. 25–45%: "CRAFTED IN SILENCE" (Left side) */}
            <div
              ref={craftOverlayRef}
              className="absolute left-0 sm:left-4 max-w-md text-ivory opacity-0 will-change-transform"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-mono block mb-2">
                HERITAGE ATELIER
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-ivory mb-2">
                CRAFTED IN SILENCE
              </h2>
              <p className="text-xs sm:text-sm text-ivory/80 font-sans font-light leading-relaxed">
                Silk, zari, and patience.
              </p>
            </div>

            {/* 4. 75–90%: "MADE TO BE REMEMBERED." */}
            <div
              ref={modelOverlayRef}
              className="absolute left-0 sm:left-4 bottom-2 sm:bottom-auto max-w-md text-ivory opacity-0 will-change-transform"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-mono block mb-2">
                THE AURELLE ATELIER
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-ivory mb-2">
                MADE TO BE REMEMBERED.
              </h2>
              <p className="text-xs sm:text-sm text-ivory/80 font-sans font-light leading-relaxed">
                Timeless silhouettes. Hand-finished detail.
              </p>
            </div>

            {/* 5. 90–100%: Final Model Composition & Minimal CTA */}
            <div
              ref={finalCtaOverlayRef}
              className="absolute left-0 sm:left-4 bottom-4 sm:bottom-auto max-w-lg text-ivory opacity-0 will-change-transform pointer-events-auto"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-mono block mb-2">
                SPRING · SUMMER 2026
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-ivory mb-4">
                Dressed in <br />
                <span className="italic text-gold-light font-light">Poetry.</span>
              </h2>

              <button
                onClick={scrollToCollection}
                className="btn-gold px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase flex items-center gap-3 shadow-2xl transition-all duration-300 pointer-events-auto group"
                aria-label="Explore the Collection"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
