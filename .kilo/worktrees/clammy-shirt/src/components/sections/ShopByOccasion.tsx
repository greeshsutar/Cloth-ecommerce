'use client';

import React from 'react';
import Image from 'next/image';
import { OCCASIONS } from '@/data/products';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useSilkReveal } from '@/hooks/useSilkReveal';

export const ShopByOccasion: React.FC = () => {
  const sectionRef = useSilkReveal<HTMLDivElement>({ stagger: 0.12 });

  const tallOccasion = OCCASIONS[0]; // Wedding & Bridal
  const rightOccasions = OCCASIONS.slice(1); // Evening, Casual Day, Festive Ethnic

  const handleOccasionClick = (category: string) => {
    const el = document.getElementById('new-arrivals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="shop-occasion"
      ref={sectionRef}
      className="w-full py-28 lg:py-36 bg-ivory relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="silk-item flex items-center justify-center gap-2 text-gold text-xs uppercase tracking-[0.35em] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED FOR EVERY AFFAIR</span>
          </div>
          <h2 className="silk-item font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso tracking-tight">
            Shop by Occasion
          </h2>
          <p className="silk-item text-sm sm:text-base text-espresso/70 font-sans mt-3">
            From majestic wedding lehengas to effortless coastal soirées.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Tall Card (5 cols on desktop) */}
          <div
            onClick={() => handleOccasionClick(tallOccasion.category)}
            className="silk-item lg:col-span-5 relative group min-h-[480px] lg:min-h-[620px] rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-gold/20 silk-image-container"
          >
            <Image
              src={tallOccasion.image}
              alt={tallOccasion.title}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="silk-image object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108"
            />
            {/* Soft dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/40 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-ivory text-[10px] uppercase tracking-[0.25em] font-medium border border-white/20">
                {tallOccasion.count}
              </span>
            </div>

            {/* Bottom Content with Slide-In "Explore" Pill */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium block mb-1">
                  CEREMONIAL EDIT
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-medium">
                  {tallOccasion.title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory/80 font-sans max-w-xs mt-1">
                  {tallOccasion.subtitle}
                </p>
              </div>

              {/* Gold Explore Pill Sliding In */}
              <div className="transform translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <div className="w-12 h-12 rounded-full bg-gold group-hover:bg-gold-light text-espresso flex items-center justify-center shadow-xl">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {rightOccasions.map((occ, idx) => (
              <div
                key={occ.id}
                onClick={() => handleOccasionClick(occ.category)}
                className={`silk-item relative group min-h-[280px] lg:min-h-[295px] rounded-3xl overflow-hidden cursor-pointer shadow-md border border-gold/15 silk-image-container ${
                  idx === 2 ? 'sm:col-span-2' : ''
                }`}
              >
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="silk-image object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/45 to-transparent" />

                {/* Top Count Badge */}
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-ivory text-[9px] uppercase tracking-[0.2em] font-medium border border-white/20">
                    {occ.count}
                  </span>
                </div>

                {/* Bottom Label & Hover Pill */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      {occ.title}
                    </h3>
                    <p className="text-xs text-ivory/80 font-sans line-clamp-1 mt-0.5">
                      {occ.subtitle}
                    </p>
                  </div>

                  <div className="transform translate-y-3 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-gold text-espresso flex items-center justify-center shadow-lg">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
