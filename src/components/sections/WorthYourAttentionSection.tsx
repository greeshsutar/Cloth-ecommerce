'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface AttentionItem {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
}

const ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-01',
    number: '01',
    title: 'The Wedding Edit',
    category: 'BRIDAL HEIRLOOM',
    subtitle: 'Kadhwa Zari Banarasi Silk',
    description: 'Grand couture silhouettes woven over 160 artisan hours for iconic wedding celebrations.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'att-02',
    number: '02',
    title: 'Heritage Weaves',
    category: 'ROYAL ETHNIC',
    subtitle: 'Kashmiri Tilla & Gold Thread',
    description: 'Ancient needlework techniques celebrating centuries of Indian textile craftsmanship.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'att-03',
    number: '03',
    title: 'Modern Drapes',
    category: 'CAPSULE RESORT',
    subtitle: 'Asymmetrical Organza & Silk Satin',
    description: 'Contemporary fluid drapes designed for effortless movement and modern gala occasions.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'att-04',
    number: '04',
    title: 'Evening Stories',
    category: 'ATELIER NOIR',
    subtitle: 'Silk Micro-Velvet & Corsetry',
    description: 'Sculpted evening gowns draped in liquid velvet with Chantilly lace boning.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'att-05',
    number: '05',
    title: 'Festive Edit',
    category: 'CEREMONIAL FLUIDITY',
    subtitle: '28-Kali Gota Patti Anarkali',
    description: 'Floor-grazing festive silhouettes enriched with hand-beaten dabka and gold sequins.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'att-06',
    number: '06',
    title: 'Private Affair',
    category: 'MINIMALIST LUXURY',
    subtitle: 'Diaphanous Gold Tissue Scallop',
    description: 'Understated luxury eveningwear cut on the true bias in pure mulberry silk.',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=85',
  },
];

export const WorthYourAttentionSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default center active item (03)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  // ScrollTrigger entrance animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Gallery panels entrance
      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardActivate = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleExplore = (id: string) => {
    const el = document.getElementById('shop-occasion') || document.getElementById('new-arrivals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="worth-your-attention-section"
      ref={containerRef}
      className="w-full bg-ivory text-espresso pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
      aria-label="Worth Your Attention Expanding Editorial Gallery"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div ref={headerRef} className="flex items-end justify-between pb-6 sm:pb-8 border-b border-gold/20 mb-6 sm:mb-8">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-mono font-medium text-gold block mb-1">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-4xl font-normal text-espresso tracking-tight">
              Worth your attention
            </h2>
          </div>

          <button
            onClick={() => handleExplore('all')}
            className="flex items-center gap-2 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-medium text-espresso/80 hover:text-gold transition-colors group"
            aria-label="View all stories"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE EXPANDING HORIZONTAL EDITORIAL GALLERY                       */}
        {/* ========================================================================= */}
        <div
          ref={galleryRef}
          className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] flex flex-row-reverse gap-2 sm:gap-3 overflow-x-auto lg:overflow-hidden select-none"
        >
          {ATTENTION_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleCardActivate(index)}
                onClick={() => handleCardActivate(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardActivate(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-current={isActive ? 'true' : 'false'}
                className={`relative h-full rounded-[2px] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ${
                  isActive
                    ? 'flex-[4.5] sm:flex-[5] min-w-[260px] sm:min-w-[400px] lg:min-w-[460px] shadow-xl'
                    : 'flex-[1] min-w-[55px] sm:min-w-[75px] opacity-80 hover:opacity-100'
                }`}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={isActive ? '(max-width: 1024px) 70vw, 45vw' : '(max-width: 1024px) 15vw, 10vw'}
                  className={`object-cover object-center transition-all duration-700 ${
                    isActive ? 'scale-100 filter-none' : 'scale-105 filter grayscale-[50%]'
                  }`}
                  priority={index <= 3}
                />

                {/* Dark Overlay (Gradient for Active, Soft Wash for Inactive) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-espresso/90 via-espresso/30 to-black/10 opacity-90'
                      : 'bg-espresso/40 hover:bg-espresso/25 opacity-75'
                  }`}
                />

                {/* Number Badge (Always Visible Top Left) */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                  <span
                    className={`font-mono text-xs sm:text-sm font-semibold tracking-widest block transition-colors duration-300 ${
                      isActive ? 'text-gold-light' : 'text-ivory/80'
                    }`}
                  >
                    {item.number}
                  </span>
                </div>

                {/* INACTIVE CARD VERTICAL TEXT (ROTATED 90 DEG / VERTICAL MODE) */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <span className="font-serif text-sm sm:text-base text-ivory/90 uppercase tracking-[0.3em] font-medium whitespace-nowrap [writing-mode:vertical-rl] rotate-180 transition-opacity duration-300">
                      {item.title}
                    </span>
                  </div>
                )}

                {/* ACTIVE CARD FULL EDITORIAL OVERLAY CONTENT (BOTTOM LEFT) */}
                {isActive && (
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 z-20 text-ivory animate-fadeIn">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-mono text-gold-light font-medium block mb-1.5">
                      {item.category} · {item.subtitle}
                    </span>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-4xl lg:text-4xl font-normal text-white tracking-tight leading-none mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-ivory/80 font-sans font-light max-w-md line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExplore(item.id);
                        }}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold hover:bg-gold-light text-espresso flex items-center justify-center shadow-xl transition-all duration-300 flex-shrink-0 group/btn"
                        aria-label={`Explore ${item.title}`}
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
