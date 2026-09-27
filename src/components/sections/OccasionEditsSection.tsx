'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface OccasionEditItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

const OCCASION_EDITS: OccasionEditItem[] = [
  {
    id: 'edit-01',
    title: 'The Wedding Edit',
    subtitle: 'CEREMONIAL GRANDUER',
    description: 'Grand couture silhouettes crafted for iconic celebrations and royal sangeets.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    href: '#shop-occasion',
  },
  {
    id: 'edit-02',
    title: 'Heritage Weaves',
    subtitle: 'ANCIENT ARTISANSHIP',
    description: 'Handloomed Banarasi, Kanjivaram & Kadhwa zari silk heirlooms.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    href: '#shop-occasion',
  },
  {
    id: 'edit-03',
    title: 'The New Drapes',
    subtitle: 'MODERN HAUTE SILHOUETTES',
    description: 'Contemporary fluid silhouettes woven for modern haute elegance.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    href: '#shop-occasion',
  },
  {
    id: 'edit-04',
    title: 'Private Affair',
    subtitle: 'MINIMALIST LUXURY SOIRÉE',
    description: 'Diaphanous organzas, delicate tilla & understated luxury evening drapes.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
    href: '#shop-occasion',
  },
];

export const OccasionEditsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Heading entrance
      if (headingRef.current) {
        const headingElements = headingRef.current.querySelectorAll('.editorial-heading-part');
        gsap.fromTo(
          headingElements,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Cards entrance stagger
      if (gridRef.current) {
        const cardElements = gridRef.current.querySelectorAll('.occasion-card-item');
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.1,
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

  const handleCardClick = (href: string) => {
    const el = document.getElementById('shop-occasion') || document.getElementById('new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="occasion-edits-section"
      ref={containerRef}
      className="w-full bg-ivory text-espresso pt-2 sm:pt-4 lg:pt-6 pb-14 sm:pb-18 lg:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
      aria-label="Edits for Every Occasion Editorial Discovery"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* ========================================================================= */}
        {/* SECTION EDITORIAL HEADING                                                  */}
        {/* ========================================================================= */}
        <div ref={headingRef} className="mb-10 sm:mb-12 lg:mb-16">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="editorial-heading-part font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-espresso tracking-tight uppercase">
              EDITS FOR
            </h2>
            <span className="editorial-heading-part font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-gold/90 lowercase tracking-normal">
              every occasion
            </span>
          </div>
          <p className="editorial-heading-part text-xs sm:text-sm text-espresso/70 font-sans tracking-widest uppercase mt-2.5 font-medium">
            CURATED ESSENTIALS FOR ICONIC MOMENTS
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 4-CARD HORIZONTAL EDITORIAL GRID                                          */}
        {/* ========================================================================= */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
        >
          {OCCASION_EDITS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.href)}
              className="occasion-card-item relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-[2px] overflow-hidden cursor-pointer group shadow-md transition-all duration-300"
            >
              {/* Card Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority
              />

              {/* Bottom Dark Gradient Overlay (Subtle transparent -> dark) */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-400" />

              {/* Subtitle Badge */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-mono text-gold-light/90 block">
                  {item.subtitle}
                </span>
              </div>

              {/* Card Bottom Content (Text OVER Image) */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 text-ivory">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg sm:text-2xl lg:text-2xl font-medium text-white tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-6 h-6 rounded-full border border-gold/40 text-gold flex items-center justify-center transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso group-hover:translate-x-1 flex-shrink-0 ml-2">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-ivory/80 font-sans font-light mt-1.5 leading-relaxed line-clamp-2 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
