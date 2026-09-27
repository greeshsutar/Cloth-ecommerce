'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CampaignItem {
  id: string;
  number: string;
  titleWords: string[];
  subtitle: string;
  image: string;
}

const CAMPAIGN_ITEMS: CampaignItem[] = [
  {
    id: 'fl-01',
    number: '01',
    titleWords: ['First', 'Light'],
    subtitle: 'THE CELEBRATION STORY',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'fl-02',
    number: '02',
    titleWords: ['Courtyard', 'Air'],
    subtitle: 'THE RITUAL OF LIGHT',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'fl-03',
    number: '03',
    titleWords: ['Wedding', 'Circle'],
    subtitle: 'HERITAGE SILK ENSEMBLE',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'fl-04',
    number: '04',
    titleWords: ['Temple', 'Steps'],
    subtitle: 'VALLEY OF FLOWERS EDIT',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85',
  },
];

export const FirstLightSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevImage, setPrevImage] = useState<string>(CAMPAIGN_ITEMS[0].image);
  const [currentImage, setCurrentImage] = useState<string>(CAMPAIGN_ITEMS[0].image);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const topBgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const activeItem = CAMPAIGN_ITEMS[activeIndex] || CAMPAIGN_ITEMS[0];

  // ScrollTrigger entrance animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Coordinated Background Crossfade & Title Update when Active Thumbnail Changes
  const handleSelectStory = (targetIndex: number) => {
    if (targetIndex === activeIndex) return;

    const nextImgUrl = CAMPAIGN_ITEMS[targetIndex]?.image;
    if (!nextImgUrl) return;

    setPrevImage(currentImage);
    setCurrentImage(nextImgUrl);
    setActiveIndex(targetIndex);

    // Kill any active running timeline to prevent stacking
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline();
    activeTimelineRef.current = tl;

    // 1. Large background image crossfade with subtle scale
    if (topBgRef.current) {
      tl.fromTo(
        topBgRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1.0, duration: 1.0, ease: 'power2.out' },
        0.0
      );
    }

    // 2. Editorial title text fade-slide reveal
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.15
      );
    }
  };

  // Continuous Auto-Moving Image Cycle Effect (4s timer, pauses on hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIdx = (prev + 1) % CAMPAIGN_ITEMS.length;
        const nextImgUrl = CAMPAIGN_ITEMS[nextIdx]?.image;
        if (nextImgUrl) {
          setPrevImage(CAMPAIGN_ITEMS[prev]?.image || currentImage);
          setCurrentImage(nextImgUrl);

          if (topBgRef.current) {
            gsap.fromTo(
              topBgRef.current,
              { opacity: 0, scale: 1.02 },
              { opacity: 1, scale: 1.0, duration: 1.0, ease: 'power2.out' }
            );
          }
        }
        return nextIdx;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, currentImage]);

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % CAMPAIGN_ITEMS.length;
    handleSelectStory(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + CAMPAIGN_ITEMS.length) % CAMPAIGN_ITEMS.length;
    handleSelectStory(prevIdx);
  };

  const handleWatchFilm = () => {
    const el = document.getElementById('shop-occasion') || document.getElementById('new-arrivals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="first-light-section"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[85vh] sm:h-[92vh] min-h-[580px] max-h-[900px] bg-espresso text-ivory overflow-hidden select-none"
      aria-label="First Light Cinematic Campaign Section"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC FULL-BLEED BACKGROUND IMAGE LAYERS                           */}
      {/* ========================================================================= */}
      {/* Base Layer (Previous Image during Crossfade) */}
      {prevImage && (
        <Image
          src={prevImage}
          alt="First Light Campaign Background Previous"
          fill
          className="object-cover object-center"
          priority
        />
      )}

      {/* Top Layer (Active Image fading in) */}
      <div ref={topBgRef} className="absolute inset-0 w-full h-full">
        <Image
          src={currentImage}
          alt={activeItem.titleWords.join(' ')}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Subtle Dark Gradient Overlay for Typography Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none z-10" />

      {/* ========================================================================= */}
      {/* 2. LEFT OVERLAY EDITORIAL TITLE & CAMPAIGN DETAILS                       */}
      {/* ========================================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto w-full h-full flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none">
        
        {/* Top Left Campaign Tag */}
        <div className="pointer-events-auto">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-gold-light font-medium block">
            CAMPAIGN
          </span>
        </div>

        {/* Center-Left Main Editorial Title */}
        <div ref={textRef} className="my-auto max-w-md pointer-events-auto">
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-white mb-3">
            {activeItem.titleWords[0]}
            <br />
            {activeItem.titleWords[1]}
          </h2>

          <div className="w-12 h-[1px] bg-gold/50 mb-4" />

          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-ivory/80 block mb-5 font-medium">
            {activeItem.subtitle}
          </span>

          <button
            onClick={handleWatchFilm}
            className="flex items-center gap-3 text-xs sm:text-sm font-sans tracking-[0.22em] uppercase text-ivory hover:text-gold transition-colors duration-300 group"
            aria-label="Watch Campaign Film"
          >
            <div className="w-8 h-8 rounded-full border border-gold/60 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-espresso transition-all duration-300 shadow-md">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>WATCH FILM</span>
          </button>
        </div>

        {/* Bottom Left Subtle Caption */}
        <div className="hidden sm:block pointer-events-auto">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-ivory/60">
            SS26 · THE LUXURY ATELIER COLLECTION
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTER-MIDDLE FLOATING THUMBNAIL ROW WITH LEFT/RIGHT CHEVRON CONTROLS   */}
      {/* ========================================================================= */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 sm:gap-4 select-none max-w-[95vw] p-2">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-gold/40 text-gold hover:bg-gold hover:text-black flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-xl flex-shrink-0 group cursor-pointer"
          aria-label="Previous Story Image"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Floating Horizontal Thumbnail Navigation Row */}
        <div className="flex items-start gap-2.5 sm:gap-3.5 overflow-x-auto py-2">
          {CAMPAIGN_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectStory(idx)}
                className={`relative rounded-[2px] overflow-hidden transition-all duration-650 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'w-[95px] h-[130px] sm:w-[125px] sm:h-[165px] lg:w-[145px] lg:h-[190px] ring-2 ring-gold shadow-2xl z-20 opacity-100 scale-100'
                    : 'w-[70px] h-[48px] sm:w-[90px] sm:h-[62px] lg:w-[105px] lg:h-[72px] opacity-75 hover:opacity-100 border border-white/20 z-10'
                }`}
                aria-label={`Select story ${item.titleWords.join(' ')}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                <Image
                  src={item.image}
                  alt={item.titleWords.join(' ')}
                  fill
                  className="object-cover object-center"
                />

                {isActive && (
                  <div className="absolute inset-0 border border-gold pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-gold/40 text-gold hover:bg-gold hover:text-black flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-xl flex-shrink-0 group cursor-pointer"
          aria-label="Next Story Image"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
};
