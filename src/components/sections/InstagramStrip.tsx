'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MarqueePhrase {
  text: string;
  style: 'serif' | 'sans' | 'italic';
}

const PHRASES: MarqueePhrase[] = [
  { text: 'NEW SEASON', style: 'serif' },
  { text: "SPRING / SUMMER '26", style: 'sans' },
  { text: 'Dressed in Poetry', style: 'italic' },
  { text: 'THE ART OF DRAPE', style: 'serif' },
  { text: 'HANDCRAFTED SILK', style: 'sans' },
  { text: 'MADE TO BE REMEMBERED', style: 'serif' },
  { text: 'HAUTE COUTURE ATELIER', style: 'sans' },
  { text: 'BANARASI & KANCHIPURAM', style: 'italic' },
];

export const InstagramStrip: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const xPosRef = useRef<number>(0);
  const baseSpeedRef = useRef<number>(45); // ~45 pixels per second
  const currentSpeedRef = useRef<number>(45);
  const lastTimeRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Triple the phrases to create a seamless infinite repeating loop
  const repeatCount = 3;
  const allPhrases = Array.from({ length: repeatCount }).flatMap(() => PHRASES);

  // Measure single set width for seamless wrap
  const measureWidth = useCallback(() => {
    if (!trackRef.current) return;
    const firstSet = trackRef.current.children;
    if (!firstSet || firstSet.length === 0) return;

    let width = 0;
    const countInOneSet = PHRASES.length;
    for (let i = 0; i < countInOneSet && i < firstSet.length; i++) {
      const itemEl = firstSet[i] as HTMLElement;
      width += itemEl.offsetWidth;
    }
    singleSetWidthRef.current = width > 0 ? width : 1200;
  }, []);

  useEffect(() => {
    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, [measureWidth]);

  // Smooth continuous animation (RIGHT -> LEFT) with hover deceleration
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      const targetSpeed = isHovered ? 8 : baseSpeedRef.current;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * (deltaTime * 6);

      xPosRef.current -= currentSpeedRef.current * deltaTime;

      if (singleSetWidthRef.current > 0 && xPosRef.current <= -singleSetWidthRef.current) {
        xPosRef.current += singleSetWidthRef.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isHovered]);

  const renderPhrase = (item: MarqueePhrase, index: number) => {
    let fontClasses = 'font-serif uppercase tracking-[0.25em] font-medium text-[#2B211B] text-xs sm:text-sm lg:text-base';

    if (item.style === 'sans') {
      fontClasses = 'font-sans uppercase tracking-[0.3em] font-medium text-[#6F6258] text-[11px] sm:text-xs lg:text-sm';
    } else if (item.style === 'italic') {
      fontClasses = 'font-serif italic font-normal tracking-[0.18em] text-[#2B211B] text-sm sm:text-base lg:text-lg';
    }

    return (
      <div
        key={`${item.text}-${index}`}
        className="flex items-center flex-shrink-0 select-none py-1"
      >
        <span className={`${fontClasses} whitespace-nowrap px-4 sm:px-6 lg:px-8 transition-colors duration-300 hover:text-[#B08A45]`}>
          {item.text}
        </span>
        {/* Subtle Gold ✦ Separator */}
        <span className="text-[#B08A45] text-xs sm:text-sm font-serif select-none px-1">
          ✦
        </span>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full py-3.5 sm:py-4 lg:py-4.5 bg-[#E8DED2] overflow-hidden border-b border-[#CBBBA8] select-none"
      aria-label="Aurelle Editorial Marquee"
    >
      {/* Edge Fade Gradients */}
      <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#E8DED2] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#E8DED2] to-transparent z-10 pointer-events-none" />

      {/* Moving Track */}
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center will-change-transform"
          style={{ width: 'max-content' }}
        >
          {allPhrases.map((phrase, idx) => renderPhrase(phrase, idx))}
        </div>
      </div>
    </section>
  );
};
