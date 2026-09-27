'use client';

import React from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/data/products';
import { Star } from 'lucide-react';
import { useSilkReveal } from '@/hooks/useSilkReveal';

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useSilkReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full py-6 sm:py-8 lg:py-10 bg-ivory relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="silk-item font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso tracking-tight">
            Loved by Every Silhouette
          </h2>

          {/* Stacked Customer Avatars + Rating Badge */}
          <div className="silk-item flex items-center justify-center gap-4 mt-6">
            <div className="flex -space-x-3 overflow-hidden p-1">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="relative w-10 h-10 rounded-full border-2 border-ivory overflow-hidden shadow-sm"
                >
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-sans text-espresso font-medium">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current text-gold" />
                ))}
              </div>
              <span>4.9/5 · 500+ Happy Patrons</span>
            </div>
          </div>
        </div>

        {/* 3-Column Review Cards with Middle Offset Down */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {TESTIMONIALS.map((review, index) => (
            <div
              key={review.id}
              className={`silk-item relative p-8 lg:p-10 rounded-3xl bg-white/70 border border-gold/20 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:border-gold ${
                index === 1 ? 'md:translate-y-8 bg-blush/40' : ''
              }`}
            >
              {/* Large Decorative Serif Quotation Mark */}
              <div className="absolute top-4 right-8 font-serif text-7xl lg:text-8xl text-gold/20 select-none pointer-events-none leading-none">
                “
              </div>

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-gold mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif italic text-base lg:text-lg text-espresso/90 leading-relaxed relative z-10 mb-8">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author & Dress info */}
              <div className="pt-6 border-t border-espresso/10 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40 flex-shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-serif text-base font-semibold text-espresso">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-gold uppercase tracking-wider font-medium">
                    {review.location}
                  </p>
                  <p className="text-[10px] text-espresso/50 font-sans">
                    {review.dressPurchased} · {review.silhouette}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
