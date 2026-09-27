'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MoodItem {
  id: string;
  category: string;
  collection: string;
  description: string;
  image: string;
  targetCategory: string;
}

const SIX_MOODS: MoodItem[] = [
  {
    id: 'mood-1',
    category: 'Wedding Edit',
    collection: 'The Sovereign Series',
    description: 'Handwoven bridal drapes for unforgettable ceremonies.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    targetCategory: 'Bridal',
  },
  {
    id: 'mood-2',
    category: 'Kanchipuram Icons',
    collection: 'Temple Gold Borders',
    description: 'Heirloom zari temple borders woven with pure metallic thread.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    targetCategory: 'Ethnic',
  },
  {
    id: 'mood-3',
    category: 'Festival Radiance',
    collection: 'Chanderi & Organza',
    description: 'Luminous pastel silks celebrating joy, light, and heritage.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    targetCategory: 'Ethnic',
  },
  {
    id: 'mood-4',
    category: 'Silk Signatures',
    collection: '22-Momme Mulberry',
    description: 'Fluid, weightless drapes tailored for modern galas.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    targetCategory: 'Dresses',
  },
  {
    id: 'mood-5',
    category: 'Bridal Edit',
    collection: 'Royal Velvet Kalis',
    description: 'Sculpted corsetry paired with 16-kali Banarasi skirts.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85',
    targetCategory: 'Bridal',
  },
  {
    id: 'mood-6',
    category: 'Royal Classic',
    collection: 'Kadhwa Weaves',
    description: 'Timeless masterpieces hand-spun for generations of grace.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85',
    targetCategory: 'Gowns',
  },
];

// Curated organic silk-drape veil contours covering top-right and sliding ↗ away on scroll
const VEIL_PATHS = [
  'M -200 -200 L 500 -200 L 500 600 L 340 440 C 260 330, 200 230, 130 150 C 70 80, 0 5, -80 -80 Z',
  'M -200 -200 L 500 -200 L 500 600 L 350 430 C 270 320, 210 220, 135 145 C 75 75, 10 10, -75 -75 Z',
  'M -200 -200 L 500 -200 L 500 600 L 330 450 C 250 340, 190 240, 125 155 C 65 85, -5 0, -85 -85 Z',
  'M -200 -200 L 500 -200 L 500 600 L 345 435 C 265 325, 205 225, 132 148 C 72 78, 5 8, -78 -78 Z',
  'M -200 -200 L 500 -200 L 500 600 L 335 445 C 255 335, 195 235, 128 152 C 68 82, -2 3, -82 -82 Z',
  'M -200 -200 L 500 -200 L 500 600 L 340 440 C 260 330, 200 230, 130 150 C 70 80, 0 5, -80 -80 Z',
];

export const SixMoodsArchive: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current || !cardsContainerRef.current) return;

    if (prefersReducedMotion) {
      SIX_MOODS.forEach((_, i) => {
        const veil = cardsContainerRef.current?.querySelector(`.veil-mover-${i}`);
        const label = cardsContainerRef.current?.querySelector(`.mood-label-${i}`);
        if (veil) gsap.set(veil, { x: 220, y: -290 });
        if (label) gsap.set(label, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Exact Diagonal Wave Reveal Scrubbed Timeline (Bottom-Left ↗ Top-Right)
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 1, // Smooth scrubbed response to scroll & perfect reverse
        },
      });

      // Stagger each of the 6 cards diagonally
      SIX_MOODS.forEach((_, i) => {
        const veil = cardsContainerRef.current?.querySelector(`.veil-mover-${i}`);
        const label = cardsContainerRef.current?.querySelector(`.mood-label-${i}`);

        if (veil) {
          // Subtle timeline offset: 0.08 between each card
          const startTime = i * 0.08;

          revealTimeline.fromTo(
            veil,
            {
              x: -125,
              y: 175, // Initial: covers ~85% of image, only bottom-left corner uncovered
            },
            {
              x: 220,
              y: -290, // Final: slides ↗ past top-right, 100% uncovered
              ease: 'none',
              duration: 0.62,
            },
            startTime
          );

          if (label) {
            revealTimeline.fromTo(
              label,
              {
                opacity: 0.3,
                y: 8,
              },
              {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                duration: 0.28,
              },
              startTime + 0.32
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (category: string) => {
    const el = document.getElementById('new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="six-moods-archive"
      ref={sectionRef}
      className="w-full pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8 bg-[#F8F3EE] relative overflow-hidden border-t border-gold/15"
    >
      {/* SVG ClipPath Definition for Exact Cathedral Arch Silhouette */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="cathedralArchClip" clipPathUnits="objectBoundingBox">
            {/* Cathedral arch: semicircular top dome (r=0.5), straight vertical sides, flat bottom */}
            <path d="M 0.5,0 C 0.776,0 1,0.145 1,0.318 L 1,1 L 0,1 L 0,0.318 C 0,0.145 0.224,0 0.5,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Heading Row */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-5 lg:mb-6"
        >
          {/* Left: Editorial Headline */}
          <div>
            <div className="flex items-baseline gap-4 flex-wrap">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso tracking-tight">
                SIX MOODS.
              </h2>
              <span className="font-serif italic text-xl sm:text-2xl text-gold-dark font-light">
                Timeless Drapes
              </span>
            </div>
          </div>

          {/* Right: Small Descriptive Copy */}
          <div className="max-w-sm lg:text-right">
            <p className="text-xs sm:text-sm text-espresso/70 font-sans leading-relaxed">
              Discover curated sarees for every celebration, every emotion, every version of you.
            </p>
          </div>
        </div>

        {/* Six Cathedral Arch-Shaped Cards Row with Staggered Diagonal Wave Reveal */}
        <div
          ref={cardsContainerRef}
          className="flex lg:grid lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-5 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory lg:overflow-visible items-start justify-between"
        >
          {SIX_MOODS.map((mood, index) => (
            <div
              key={mood.id}
              onClick={() => handleCardClick(mood.targetCategory)}
              className="arch-mood-card flex-shrink-0 w-[150px] sm:w-[165px] lg:w-full group cursor-pointer snap-center"
            >
              {/* 1. Cathedral Arch Image Container with Organic Silk Veil */}
              <div
                className="relative w-full aspect-[140/220] overflow-hidden drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                style={{
                  clipPath: 'url(#cathedralArchClip)',
                }}
              >
                {/* Stationary High-Quality Photograph */}
                <Image
                  src={mood.image}
                  alt={mood.category}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 170px, 200px"
                  priority={index < 3}
                  className="object-cover object-center"
                />

                {/* Subtle warm tint overlay */}
                <div className="absolute inset-0 bg-[#2B211B]/[0.04] pointer-events-none" />

                {/* Organic Silk Veil (Covers top-right, slides away ↗ on scroll) */}
                <div
                  className={`veil-mover-${index} absolute inset-0 w-full h-full pointer-events-none will-change-transform`}
                >
                  <svg
                    viewBox="0 0 200 300"
                    className="w-full h-full overflow-visible block"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={VEIL_PATHS[index]}
                      fill="#ECE5DB"
                    />
                  </svg>
                </div>
              </div>

              {/* 2. Category Label (Underneath Arch) */}
              <div className={`mood-label-${index} w-full text-center mt-3.5`}>
                <h3 className="font-serif text-sm font-medium text-espresso tracking-wide group-hover:text-gold transition-colors duration-300">
                  {mood.category}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
