'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, Award, Scissors, Feather } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FabricAndCraft: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftImageRef = useRef<HTMLDivElement | null>(null);
  const counter1Ref = useRef<HTMLSpanElement | null>(null);
  const counter2Ref = useRef<HTMLSpanElement | null>(null);
  const counter3Ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Counter animations on scroll reveal
      const counters = [
        { ref: counter1Ref, target: 160, prefix: '', suffix: '+ hrs' },
        { ref: counter2Ref, target: 100, prefix: '', suffix: '%' },
        { ref: counter3Ref, target: 100, prefix: '', suffix: '% Custom' },
      ];

      counters.forEach((item) => {
        if (!item.ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.target,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (item.ref.current) {
              item.ref.current.textContent = `${Math.floor(obj.val)}${item.suffix}`;
            }
          },
        });
      });

      // 2. Parallax scale on left macro visual
      if (leftImageRef.current) {
        gsap.fromTo(
          leftImageRef.current,
          { scale: 1.18, y: -20 },
          {
            scale: 1.0,
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fabric-craft"
      ref={sectionRef}
      className="w-full py-28 lg:py-36 bg-ivory-200 relative overflow-hidden border-y border-gold/15"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Macro Ken-Burns Silk & Zari Visual Frame (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/70">
              <div ref={leftImageRef} className="relative w-full h-full will-change-transform">
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=90"
                  alt="Aurelle Pure Silk, Zari and Hand Embroidery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter contrast-[1.05]"
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              </div>

              {/* Floating Monogram Atelier Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">
                    ATELIER CERTIFIED
                  </span>
                  <p className="text-sm font-serif text-espresso font-medium mt-0.5">
                    Mulberry Silk Mark &amp; Pure Metallic Zari
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Staggered Copy & 3 Animated Counters (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-espresso">
            <div className="flex items-center gap-2.5 text-gold text-xs uppercase tracking-[0.35em] font-medium font-sans mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ATELIER MANIFESTO</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-espresso leading-tight tracking-tight mb-6">
              Crafted Slowly. <br />
              <span className="italic text-gold-dark font-light">Cherished for Generations.</span>
            </h2>

            <p className="text-base sm:text-lg text-espresso/80 font-sans leading-relaxed mb-8">
              At AURELLE, we reject mass production. Each creation is born through patient
              artistry — hand-dyed organically in small batches, sculpted on bespoke dressforms,
              and embellished by master artisans whose lineages date back to royal courts.
            </p>

            {/* 3 Animated Counters Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-espresso/10">
              {/* Counter 1 */}
              <div className="p-4 rounded-2xl bg-white/60 border border-gold/20 flex flex-col">
                <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3">
                  <Scissors className="w-3.5 h-3.5" />
                </div>
                <span
                  ref={counter1Ref}
                  className="font-serif text-2xl sm:text-3xl font-bold text-espresso"
                >
                  160+ hrs
                </span>
                <span className="text-xs uppercase tracking-wider text-espresso/60 font-sans mt-1">
                  Handwork Per Piece
                </span>
              </div>

              {/* Counter 2 */}
              <div className="p-4 rounded-2xl bg-white/60 border border-gold/20 flex flex-col">
                <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3">
                  <Feather className="w-3.5 h-3.5" />
                </div>
                <span
                  ref={counter2Ref}
                  className="font-serif text-2xl sm:text-3xl font-bold text-espresso"
                >
                  100%
                </span>
                <span className="text-xs uppercase tracking-wider text-espresso/60 font-sans mt-1">
                  Pure Mulberry Silks
                </span>
              </div>

              {/* Counter 3 */}
              <div className="p-4 rounded-2xl bg-white/60 border border-gold/20 flex flex-col">
                <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span
                  ref={counter3Ref}
                  className="font-serif text-2xl sm:text-3xl font-bold text-espresso"
                >
                  Made to
                </span>
                <span className="text-xs uppercase tracking-wider text-espresso/60 font-sans mt-1">
                  Measure Precision
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
