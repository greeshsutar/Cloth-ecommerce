'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export interface TrendItem {
  id: number;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

const INITIAL_TRENDS: TrendItem[] = [
  {
    id: 1,
    number: '01',
    category: 'FESTIVE',
    title: 'The Royal Zardozi',
    description: 'Opulent hand-embroidered heritage silks infused with pure metallic zari threads.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 2,
    number: '02',
    category: 'HERITAGE',
    title: 'Timeless Weaves',
    description: 'Master-loom Banarasi brocades celebrating centuries of royal Indian court craftsmanship.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 3,
    number: '03',
    category: 'CONTEMPORARY',
    title: 'Modern Drapes',
    description: 'Fluid Mulberry silk silhouettes reimagined for modern galas and cocktail affairs.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 4,
    number: '04',
    category: 'OCCASION',
    title: 'Evening Stories',
    description: 'Deep jewel-toned tissue organzas and hand-pleated ensembles crafted for dusk celebrations.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 5,
    number: '05',
    category: 'BRIDAL',
    title: 'Celebration Couture',
    description: 'Architectural silk velvet ensembles embellished by hand over 300 patient hours.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=90',
  },
];

// Depth rank configurations (Ranks 0 to 4)
const STACK_RANKS = [
  { x: 0, y: 0, scale: 1.0, rotate: 0, zIndex: 10, opacity: 1.0 },
  { x: -10, y: -8, scale: 0.97, rotate: -2, zIndex: 8, opacity: 1.0 },
  { x: -20, y: -16, scale: 0.94, rotate: -3, zIndex: 6, opacity: 1.0 },
  { x: -30, y: -24, scale: 0.91, rotate: -4, zIndex: 4, opacity: 1.0 },
  { x: -40, y: -32, scale: 0.88, rotate: -5, zIndex: 2, opacity: 1.0 },
];

export const LatestTrendsSection: React.FC = () => {
  const [stack, setStack] = useState<TrendItem[]>(INITIAL_TRENDS);
  const isAnimatingRef = useRef<boolean>(false);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const activeTrend = stack[0];
  const activeOriginalIndex = INITIAL_TRENDS.findIndex((t) => t.id === activeTrend.id);

  // Set initial canonical GSAP positions on mount and stack update
  useEffect(() => {
    stack.forEach((item, index) => {
      const el = cardRefs.current.get(item.id);
      if (el) {
        const rank = STACK_RANKS[Math.min(index, 4)];
        gsap.set(el, {
          x: rank.x,
          y: rank.y,
          scale: rank.scale,
          rotate: rank.rotate,
          zIndex: rank.zIndex,
          opacity: rank.opacity,
        });
      }
    });
  }, [stack]);

  // Physical Card Shuffle: Active Card Moves RIGHT -> BEHIND STACK -> BACK POSITION
  const handleShuffleForward = () => {
    if (isAnimatingRef.current || stack.length <= 1) return;
    isAnimatingRef.current = true;

    const topCardItem = stack[0];
    const topEl = cardRefs.current.get(topCardItem.id);

    if (!topEl) {
      isAnimatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setStack((prev) => [...prev.slice(1), prev[0]]);

        stack.forEach((item, idx) => {
          const el = cardRefs.current.get(item.id);
          if (el) {
            const nextIdx = (idx - 1 + stack.length) % stack.length;
            const rank = STACK_RANKS[Math.min(nextIdx, 4)];
            gsap.set(el, {
              x: rank.x,
              y: rank.y,
              scale: rank.scale,
              rotate: rank.rotate,
              zIndex: rank.zIndex,
              opacity: rank.opacity,
            });
          }
        });

        isAnimatingRef.current = false;
      },
    });

    // PHASE 1 — Lift front card slightly
    tl.to(topEl, {
      x: 5,
      y: -5,
      scale: 1.02,
      rotate: 1,
      duration: 0.12,
      ease: 'power2.out',
    });

    // PHASE 2 — Travel RIGHT out of the stack
    tl.to(
      topEl,
      {
        x: 210,
        y: -10,
        scale: 0.98,
        rotate: 4,
        duration: 0.32,
        ease: 'power2.in',
      },
      '+=0.01'
    );

    // Promote rear cards underneath at the same time (Rank 1 -> Rank 0, Rank 2 -> Rank 1, etc.)
    stack.slice(1).forEach((item, idx) => {
      const rearEl = cardRefs.current.get(item.id);
      if (rearEl) {
        const targetRank = STACK_RANKS[idx];
        tl.to(
          rearEl,
          {
            x: targetRank.x,
            y: targetRank.y,
            scale: targetRank.scale,
            rotate: targetRank.rotate,
            zIndex: targetRank.zIndex,
            opacity: targetRank.opacity,
            duration: 0.35,
            ease: 'power2.inOut',
          },
          '<=0.04'
        );
      }
    });

    // PHASE 3 — Pass BEHIND stack (change z-index only after clearing right edge)
    tl.to(topEl, {
      zIndex: 1,
      duration: 0.01,
    });

    // PHASE 4 — Return from RIGHT side into the BACK position
    tl.to(topEl, {
      x: STACK_RANKS[4].x,
      y: STACK_RANKS[4].y,
      scale: STACK_RANKS[4].scale,
      rotate: STACK_RANKS[4].rotate,
      opacity: STACK_RANKS[4].opacity,
      duration: 0.34,
      ease: 'power3.out',
    });
  };

  // Reverse Physical Shuffle for Previous Arrow
  const handleShuffleBackward = () => {
    if (isAnimatingRef.current || stack.length <= 1) return;
    isAnimatingRef.current = true;

    const backCardItem = stack[stack.length - 1];
    const backEl = cardRefs.current.get(backCardItem.id);

    if (!backEl) {
      isAnimatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setStack((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
        isAnimatingRef.current = false;
      },
    });

    // Pull back card out from behind the RIGHT side
    tl.to(backEl, {
      x: 210,
      y: -10,
      scale: 0.98,
      rotate: 4,
      zIndex: 12,
      duration: 0.32,
      ease: 'power2.out',
    });

    // Shift current cards backward by 1 rank
    stack.slice(0, stack.length - 1).forEach((item, idx) => {
      const el = cardRefs.current.get(item.id);
      if (el) {
        const targetRank = STACK_RANKS[idx + 1];
        tl.to(
          el,
          {
            x: targetRank.x,
            y: targetRank.y,
            scale: targetRank.scale,
            rotate: targetRank.rotate,
            zIndex: targetRank.zIndex,
            opacity: targetRank.opacity,
            duration: 0.35,
            ease: 'power2.inOut',
          },
          '<=0.04'
        );
      }
    });

    // Settle card into FRONT position
    tl.to(backEl, {
      x: STACK_RANKS[0].x,
      y: STACK_RANKS[0].y,
      scale: STACK_RANKS[0].scale,
      rotate: STACK_RANKS[0].rotate,
      zIndex: STACK_RANKS[0].zIndex,
      duration: 0.34,
      ease: 'power3.out',
    });
  };

  const handleSelectCategory = (targetIdx: number) => {
    if (isAnimatingRef.current || targetIdx === activeOriginalIndex) return;

    const targetItem = INITIAL_TRENDS[targetIdx];
    const currentStackIdx = stack.findIndex((item) => item.id === targetItem.id);

    if (currentStackIdx > 0) {
      handleShuffleForward();
    }
  };

  return (
    <section
      id="latest-trends"
      className="w-full py-16 sm:py-20 lg:py-24 pt-24 lg:pt-28 bg-ivory text-espresso border-b border-gold/15 select-none relative z-[1] isolate overflow-hidden min-h-[85vh] flex items-center"
      aria-label="Latest Trends Physical Rightward Card Stack Section"
    >
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* ========================================================================= */}
        {/* EDITORIAL THREE-ZONE GRID (LEFT 30% | CENTER 40% | RIGHT 20%)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Condensed Display Typography & Serif Copy (lg:col-span-4)  */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Eyebrow Label */}
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-2">
              EXCLUSIVELY CURATED
            </span>

            {/* Main Heading: CONDENSED BOLD SANS-SERIF DISPLAY (Bebas Neue) */}
            <h2 className="font-bebas text-[68px] sm:text-[86px] lg:text-[110px] font-bold uppercase text-[#181716] leading-[0.84] tracking-tight mb-4">
              LATEST
              <br />
              TRENDS
            </h2>

            {/* Small Hairline Divider */}
            <div className="w-10 h-[1px] bg-gold/40 mb-4" />

            {/* Supporting Editorial Serif Copy */}
            <p className="font-cormorant text-2xl sm:text-3xl text-[#181716] font-normal leading-tight mb-3">
              Crafted Slowly.{' '}
              <span className="italic text-gold font-light">Cherished for Generations.</span>
            </p>

            {/* Short Description */}
            <div className="min-h-[60px] mb-6 max-w-[310px] transition-opacity duration-300">
              <p className="text-xs sm:text-sm text-espresso/70 font-sans leading-relaxed">
                {activeTrend.description}
              </p>
            </div>

            {/* CTA Link */}
            <button
              onClick={handleShuffleForward}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#181716] hover:text-gold transition-colors duration-300 group font-medium w-max cursor-pointer"
            >
              <span>DISCOVER MORE</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER COLUMN: Rightward Physical Card Shuffle & Controls (lg:col-span-5) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
            
            {/* Physical Stack Frame */}
            <div className="relative w-[270px] h-[375px] sm:w-[320px] sm:h-[445px] lg:w-[350px] lg:h-[490px]">
              {stack.map((item, index) => {
                const isTop = index === 0;

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(item.id, el);
                      else cardRefs.current.delete(item.id);
                    }}
                    onClick={isTop ? handleShuffleForward : undefined}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      pointerEvents: isTop ? 'auto' : 'none',
                    }}
                    className={`rounded-[2px] overflow-hidden border border-white/80 bg-ivory-200 shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-shadow duration-300 ${
                      isTop ? 'cursor-pointer hover:shadow-[0_25px_55px_rgba(0,0,0,0.22)]' : ''
                    }`}
                  >
                    {/* Fashion Image */}
                    <Image
                      src={item.image}
                      alt={`${item.category} - ${item.title}`}
                      fill
                      sizes="(max-width: 640px) 270px, (max-width: 1024px) 320px, 350px"
                      className="object-cover object-center filter contrast-[1.03]"
                      priority={isTop}
                      draggable={false}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                    {/* Pill Badge */}
                    <div className="absolute top-3.5 left-3.5 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-gold/40 text-[9px] font-mono tracking-widest text-gold uppercase font-medium rounded-[1px]">
                      {item.number} · {item.category}
                    </div>

                    {/* Card Title Overlay */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gold-light block mb-0.5">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-normal leading-tight tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Number & Arrows directly beneath the Card */}
            <div className="mt-6 flex flex-col items-center gap-3 z-20">
              {/* Active Indicator 01 / 05 */}
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-espresso/60">
                <span className="text-gold font-bold">{activeTrend.number}</span>
                <span>/</span>
                <span>05</span>
              </div>

              {/* Minimal Prev / Next Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShuffleBackward}
                  className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center text-[#181716] hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
                  aria-label="Previous Trend Card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShuffleForward}
                  className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center text-[#181716] hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
                  aria-label="Next Trend Card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Explore the Range Minimal Editorial Text List (lg:col-span-3) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col justify-center pl-0 lg:pl-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-semibold block mb-5">
              EXPLORE THE RANGE
            </span>

            {/* Editorial Text Rows */}
            <div className="flex flex-col space-y-3 font-serif">
              {INITIAL_TRENDS.map((item, idx) => {
                const isActive = idx === activeOriginalIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectCategory(idx)}
                    className={`flex items-center justify-between text-left py-2 border-b transition-all duration-300 group cursor-pointer ${
                      isActive
                        ? 'border-gold text-[#181716] font-medium translate-x-1.5'
                        : 'border-espresso/10 text-espresso/40 hover:text-espresso/80 translate-x-0'
                    }`}
                  >
                    <span className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-mono">
                      <span className={isActive ? 'text-gold font-bold' : 'text-espresso/35'}>
                        {item.number}
                      </span>
                      <span className="font-serif normal-case text-sm sm:text-base font-normal">
                        {item.category}
                      </span>
                    </span>

                    {/* Active Accent Indicator */}
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-gold scale-125' : 'bg-transparent group-hover:bg-gold/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
