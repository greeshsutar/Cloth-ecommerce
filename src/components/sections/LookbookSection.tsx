'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { LOOKBOOK_IMAGES } from '@/data/products';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LookbookSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !pinRef.current || !trackRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 120);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 600}`,
          pin: pinRef.current,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Individual image subtle parallax offsets
      const images = track.querySelectorAll('.lookbook-inner-img');
      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { x: i % 2 === 0 ? 30 : -30 },
          {
            x: i % 2 === 0 ? -30 : 30,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${track.scrollWidth - window.innerWidth + 600}`,
              scrub: 1.3,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={containerRef}
      className="relative w-full bg-ivory"
    >
      <div
        ref={pinRef}
        className="sticky top-0 w-full h-screen flex flex-col justify-between py-12 lg:py-16 overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-espresso">
              Spring · Summer &apos;26 Vignettes
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs tracking-widest uppercase text-espresso/60 font-sans">
            <span>Scroll horizontally</span>
            <ArrowRight className="w-4 h-4 text-gold animate-bounce" />
          </div>
        </div>

        {/* Horizontal Track Row */}
        <div className="w-full my-auto overflow-visible py-4">
          <div
            ref={trackRef}
            className="flex items-center gap-8 lg:gap-12 pl-6 lg:pl-16 pr-24 will-change-transform"
          >
            {LOOKBOOK_IMAGES.map((item, index) => (
              <div
                key={item.id}
                className="relative flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group border border-gold/20"
              >
                {/* Image Parallax Container */}
                <div className="relative w-full h-full overflow-hidden bg-ivory-300">
                  <div className="lookbook-inner-img relative w-[115%] h-full -left-[7.5%]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="400px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 rounded-full bg-espresso/60 backdrop-blur-md text-gold text-[10px] uppercase tracking-[0.25em] font-mono border border-gold/30">
                    {item.season} · 0{index + 1}
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ivory/80 font-sans mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Thin Gold Progress Line */}
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          <div className="w-full h-[2px] bg-espresso/10 relative rounded-full overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full bg-gold rounded-full transition-all duration-100 ease-out"
              style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
