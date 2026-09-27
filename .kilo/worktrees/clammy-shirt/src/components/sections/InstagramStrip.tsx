'use client';

import React from 'react';
import Image from 'next/image';
import { INSTAGRAM_POSTS } from '@/data/products';
import { Instagram, ArrowUpRight, Heart } from 'lucide-react';

export const InstagramStrip: React.FC = () => {
  // Double the array for seamless infinite marquee
  const marqueeItems = [...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS];

  return (
    <section className="relative w-full py-16 bg-blush overflow-hidden border-t border-gold/15">
      {/* Floating Center Pill */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-espresso text-ivory border border-gold/40 shadow-2xl hover:bg-gold hover:text-espresso transition-all duration-400 backdrop-blur-xl"
        >
          <Instagram className="w-4 h-4 text-gold group-hover:text-espresso transition-colors" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase font-sans">
            @aurelle.official — Follow Us
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="flex overflow-hidden relative">
        <div className="flex gap-6 animate-marquee py-2 hover:[animation-play-state:paused]">
          {marqueeItems.map((post, idx) => (
            <div
              key={`${post.id}-${idx}`}
              className="relative flex-shrink-0 w-48 sm:w-60 md:w-68 aspect-square rounded-2xl overflow-hidden group shadow-md cursor-pointer border border-white/40"
            >
              <Image
                src={post.image}
                alt={`Aurelle Instagram Feed ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 192px, 260px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay with likes and tag */}
              <div className="absolute inset-0 bg-espresso/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 p-4">
                <div className="flex items-center gap-1.5 text-gold text-xs font-semibold">
                  <Heart className="w-4 h-4 fill-current text-gold" />
                  <span>{post.likes}</span>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-mono text-ivory/90">
                  {post.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
