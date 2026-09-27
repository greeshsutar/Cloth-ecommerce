'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RibbonProduct {
  id: string;
  name: string;
  fabric: string;
  price: string;
  image: string;
  hoverImage: string;
}

const RIBBON_PRODUCTS: RibbonProduct[] = [
  {
    id: 'ribbon-1',
    name: 'Heritage Paithani',
    fabric: 'PAITHANI SILK',
    price: '₹6,800',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'ribbon-2',
    name: 'Aarunya Emerald Kanjivaram',
    fabric: 'KANJIVARAM SILK',
    price: '₹4,890',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'ribbon-3',
    name: 'Ruhani Temple Silk',
    fabric: 'TEMPLE SILK',
    price: '₹5,200',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'ribbon-4',
    name: 'Saanjh Monsoon Banarasi',
    fabric: 'BANARASI SILK',
    price: '₹6,450',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'ribbon-5',
    name: 'Prema Festive Silk',
    fabric: 'FESTIVE SILK',
    price: '₹6,900',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'ribbon-6',
    name: 'Leela Courtyard Silk',
    fabric: 'COURTYARD SILK',
    price: '₹7,200',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'ribbon-7',
    name: 'Tara Peach Tissue',
    fabric: 'TISSUE SILK',
    price: '₹5,800',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'ribbon-8',
    name: 'Noor Handcrafted Anarkali',
    fabric: 'RAW SILK',
    price: '₹9,800',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=85',
    hoverImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
  },
];

export const CurvedProductRibbon: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const ribbonAreaRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hoveredIdx;

  // Build 3 repeated sets for seamless infinite looping across all screens
  const TOTAL_UNIQUE = RIBBON_PRODUCTS.length;
  const REPEAT = 3;
  const allItems = Array.from({ length: REPEAT }, (_, setIdx) =>
    RIBBON_PRODUCTS.map((p, i) => ({ ...p, uid: `${p.id}-set${setIdx}`, idx: setIdx * TOTAL_UNIQUE + i }))
  ).flat();
  const TOTAL_CARDS = allItems.length;

  // Geometry dimensions
  const cardW = useRef(280);
  const cardH = useRef(420);
  const gap = useRef(4);
  const singleSetW = useRef(0);
  const arcHeight = useRef(60); // shallow upward arch vertical drop from center to edges
  const maxRot = useRef(6.5); // degrees rotation at edges
  const offset = useRef(0);
  const speed = useRef(38);
  const lastTime = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragOffset = useRef(0);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);

  const measure = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 640) {
      cardW.current = 190;
      cardH.current = 285;
      gap.current = 3;
      arcHeight.current = 35;
      maxRot.current = 5;
    } else if (w < 1024) {
      cardW.current = 230;
      cardH.current = 345;
      gap.current = 3;
      arcHeight.current = 48;
      maxRot.current = 6;
    } else {
      cardW.current = 280;
      cardH.current = 420;
      gap.current = 4;
      arcHeight.current = 60;
      maxRot.current = 6.5;
    }
    singleSetW.current = TOTAL_UNIQUE * (cardW.current + gap.current);
  }, [TOTAL_UNIQUE]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Entrance ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
      if (ribbonAreaRef.current) {
        gsap.fromTo(
          ribbonAreaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animation Loop for continuous shallow arc motion
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf: number;

    const tick = (t: number) => {
      if (!lastTime.current) lastTime.current = t;
      const dt = Math.min((t - lastTime.current) / 1000, 0.1);
      lastTime.current = t;

      // Advance offset (RIGHT → LEFT)
      if (!dragging.current && !reduced) {
        offset.current -= speed.current * dt;
        if (singleSetW.current > 0) {
          while (offset.current < -singleSetW.current * 2) offset.current += singleSetW.current;
          while (offset.current > -singleSetW.current) offset.current -= singleSetW.current;
        }
      }

      const container = cardsContainerRef.current;
      if (!container) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const cw = container.offsetWidth || window.innerWidth;
      const centerX = cw / 2;
      const step = cardW.current + gap.current;
      const halfSpan = Math.max(cw * 0.45, 500);

      for (let i = 0; i < TOTAL_CARDS; i++) {
        const el = cardEls.current[i];
        if (!el) continue;

        // Card center X position
        const cardLeft = offset.current + i * step;
        const cx = cardLeft + cardW.current / 2;
        const dx = cx - centerX; // distance from center of screen

        // Normalized position: t = 0 center, -1 left edge, +1 right edge
        const normT = dx / halfSpan;
        const absT = Math.abs(normT);

        // Shallow Arch Y calculation
        const arcY = arcHeight.current * (normT * normT);
        const rotDeg = Math.max(-8, Math.min(8, normT * maxRot.current));
        const sc = Math.max(0.96, 1 - absT * 0.035);

        // Hover effect lift
        const hovered = hoveredRef.current === i;
        const finalY = hovered ? arcY - 10 : arcY;
        const finalSc = hovered ? sc * 1.025 : sc;
        const zIndex = hovered ? 300 : Math.round(100 - absT * 20);

        el.style.transform = `translate3d(${cardLeft}px, ${finalY}px, 0) rotateZ(${rotDeg}deg) scale(${finalSc})`;
        el.style.zIndex = `${zIndex}`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [TOTAL_CARDS]);

  // Pointer drag controls for touch / desktop horizontal drag
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragOffset.current = offset.current;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    offset.current = dragOffset.current + (e.clientX - dragStartX.current);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <section
      id="woven-signatures-ribbon"
      ref={sectionRef}
      className="w-full pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-[#F9F6F0] relative overflow-hidden border-t border-gold/15 select-none"
    >
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-4 sm:mb-6">
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-espresso tracking-tight">
                Woven to Be
              </h2>
              <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-gold font-light">
                Remembered
              </span>
            </div>
          </div>
          <button
            onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans uppercase tracking-[0.25em] font-semibold text-espresso hover:text-gold transition-colors duration-300 self-start sm:self-end cursor-pointer"
          >
            <span>Explore the Edit</span>
            <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>

      {/* Shallow Curved Product Ribbon Container */}
      <div
        ref={ribbonAreaRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Soft edge fade vignettes */}
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#F9F6F0] to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#F9F6F0] to-transparent z-30 pointer-events-none" />

        {/* Track Height Container */}
        <div
          ref={cardsContainerRef}
          className="relative w-full h-[360px] sm:h-[430px] lg:h-[510px]"
        >
          {allItems.map((prod, i) => (
            <div
              key={prod.uid}
              ref={(el) => {
                cardEls.current[i] = el;
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="absolute top-0 left-0 will-change-transform cursor-pointer"
              style={{ width: cardW.current, height: cardH.current, transformOrigin: '50% 100%' }}
            >
              {/* Rectangular Editorial Image Tile with completely sharp corners */}
              <div
                className="group/tile relative w-full h-full overflow-hidden bg-espresso/5 shadow-md border-r border-black/20"
                style={{ borderRadius: 0 }}
              >
                {/* Primary Image */}
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  sizes="(max-width:640px) 190px,(max-width:1024px) 230px, 280px"
                  className="object-cover object-center transition-all duration-550 ease-out opacity-100 group-hover/tile:opacity-0 group-hover/tile:scale-105 pointer-events-none"
                />

                {/* Secondary Hover Image */}
                <Image
                  src={prod.hoverImage || prod.image}
                  alt={`${prod.name} Alternate View`}
                  fill
                  sizes="(max-width:640px) 190px,(max-width:1024px) 230px, 280px"
                  className="object-cover object-center transition-all duration-550 ease-out opacity-0 group-hover/tile:opacity-100 scale-105 group-hover/tile:scale-100 pointer-events-none"
                />

                {/* Dark bottom gradient overlay for editorial text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />

                {/* Typography overlaid inside the image tile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-left pointer-events-none z-20">
                  <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-sans font-medium mb-1 drop-shadow-sm">
                    {prod.fabric}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base lg:text-lg font-normal text-white tracking-wide leading-snug line-clamp-2 mb-2 drop-shadow-md">
                    {prod.name}
                  </h3>
                  <div className="flex items-center justify-between text-white/90">
                    <span className="font-serif text-xs sm:text-sm tracking-wider drop-shadow">
                      {prod.price} <span className="ml-1 opacity-80">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
