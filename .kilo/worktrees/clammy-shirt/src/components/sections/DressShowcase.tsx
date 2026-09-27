'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SHOWCASE_LOOKS, PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShowcaseLook, DressSize, ColorOption } from '@/types';
import { ArrowRight, Sparkles, Check, Ruler, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const DressShowcase: React.FC = () => {
  const { addItem, formatPrice, openSizeGuide, openQuickView } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<DressSize>('S');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    SHOWCASE_LOOKS[0].colors[0]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinTargetRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  const currentLook: ShowcaseLook = SHOWCASE_LOOKS[activeIndex];

  // Update selected color when look changes
  useEffect(() => {
    if (currentLook.colors.length > 0) {
      setSelectedColor(currentLook.colors[0]);
    }
    if (currentLook.sizes.length > 0 && !currentLook.sizes.includes(selectedSize)) {
      setSelectedSize(currentLook.sizes[0]);
    }
  }, [activeIndex]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !pinTargetRef.current) return;

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger spanning through 4 looks
      const totalSteps = SHOWCASE_LOOKS.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalSteps * 90}%`,
        pin: pinTargetRef.current,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          const rawProgress = self.progress * totalSteps;
          const newIdx = Math.min(
            totalSteps - 1,
            Math.max(0, Math.floor(rawProgress))
          );
          setActiveIndex((prev) => (prev !== newIdx ? newIdx : prev));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Soft cross-swap animation whenever activeIndex changes
  useEffect(() => {
    if (!imageContainerRef.current || !contentContainerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Tween image: scale 0.85 -> 1.0, subtle rotateY, blur clear
    gsap.fromTo(
      imageContainerRef.current,
      {
        opacity: 0.3,
        scale: 0.9,
        filter: 'blur(8px)',
        transformPerspective: 1000,
        rotateY: 6,
      },
      {
        opacity: 1,
        scale: 1.0,
        filter: 'blur(0px)',
        rotateY: 0,
        duration: 0.9,
        ease: 'power3.out',
      }
    );

    // Tween text content
    const textEls = contentContainerRef.current.querySelectorAll('.showcase-text-item');
    gsap.fromTo(
      textEls,
      { opacity: 0, y: 25, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 }
    );
  }, [activeIndex]);

  const handleAddToBag = () => {
    const matchedProduct =
      PRODUCTS.find((p) => p.id === currentLook.productRefId) || PRODUCTS[0];
    addItem(matchedProduct, selectedSize, selectedColor, 1);
  };

  const handleQuickView = () => {
    const matchedProduct =
      PRODUCTS.find((p) => p.id === currentLook.productRefId) || PRODUCTS[0];
    openQuickView(matchedProduct);
  };

  return (
    <section
      id="dress-showcase"
      ref={containerRef}
      className="relative w-full h-[380vh] transition-colors duration-1000 ease-in-out"
      style={{
        backgroundColor: currentLook.accentBg,
      }}
    >
      <div
        ref={pinTargetRef}
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden px-6 lg:px-16"
      >
        {/* Subtle background luxury watermark */}
        <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.035] font-serif text-[28vw] leading-none text-espresso">
          AURELLE
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-10">
          
          {/* Left Column: Cross-Swapping Editorial Image Frame (5 cols) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/60 group"
            >
              <Image
                src={currentLook.image}
                alt={currentLook.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Tag Pill Overlay */}
              <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-espresso/80 backdrop-blur-md text-ivory text-[10px] tracking-[0.25em] uppercase font-medium border border-gold/30 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>{currentLook.category}</span>
              </div>

              {/* Quick View Button */}
              <button
                onClick={handleQuickView}
                className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-ivory/90 hover:bg-gold hover:text-white text-espresso flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-md"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Look Details, Size pills, Swatches & Add to Bag (7 cols) */}
          <div
            ref={contentContainerRef}
            className="lg:col-span-6 flex flex-col justify-center text-espresso"
          >
            {/* Top Index & Progress Bar */}
            <div className="showcase-text-item mb-6">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl text-espresso font-semibold">
                    {currentLook.index.split('/')[0]}
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-espresso/50">
                    / {SHOWCASE_LOOKS.length.toString().padStart(2, '0')} LOOKS
                  </span>
                </div>
                <span className="text-[11px] font-mono tracking-widest text-gold font-bold uppercase">
                  ATELIER CAPSULE
                </span>
              </div>

              {/* Segmented Gold Progress Bar */}
              <div className="grid grid-cols-4 gap-2 h-1 w-full bg-espresso/10 rounded-full overflow-hidden">
                {SHOWCASE_LOOKS.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-full cursor-pointer transition-all duration-500 rounded-full ${
                      idx === activeIndex
                        ? 'bg-gold shadow-sm'
                        : idx < activeIndex
                        ? 'bg-espresso/50'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Overline & Dress Name (Masked Line Reveal) */}
            <div className="showcase-text-item mb-2">
              <span className="text-xs uppercase tracking-[0.35em] text-gold font-sans font-semibold">
                {currentLook.subtitle}
              </span>
            </div>

            <h2 className="showcase-text-item font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium text-espresso mb-4">
              {currentLook.name}
            </h2>

            {/* Price & MRP */}
            <div className="showcase-text-item flex items-baseline gap-4 mb-4">
              <span className="text-2xl sm:text-3xl font-serif text-gold font-medium">
                {formatPrice(currentLook.price)}
              </span>
              <span className="text-sm line-through text-espresso/40 font-sans">
                {formatPrice(currentLook.mrp)}
              </span>
              <span className="text-[10px] tracking-widest uppercase bg-gold/15 text-gold px-2.5 py-1 rounded-full font-semibold">
                Complimentary Bespoke Hemming
              </span>
            </div>

            {/* Fabric Note */}
            <div className="showcase-text-item p-3.5 rounded-2xl bg-white/60 border border-espresso/10 backdrop-blur-sm mb-6">
              <p className="text-xs uppercase tracking-widest text-gold-dark font-medium mb-1">
                Fabric & Weave
              </p>
              <p className="text-sm text-espresso/90 font-sans leading-relaxed">
                {currentLook.fabric}
              </p>
              <p className="text-xs text-espresso/60 font-sans mt-1">
                {currentLook.description}
              </p>
            </div>

            {/* Color Swatches */}
            <div className="showcase-text-item mb-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-2">
                <span className="font-medium text-espresso/70">Palette:</span>
                <span className="text-espresso font-semibold">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {currentLook.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full p-0.5 border-2 transition-all duration-300 ${
                      selectedColor.name === color.name
                        ? 'border-gold scale-110 shadow-md'
                        : 'border-transparent hover:scale-105'
                    }`}
                    title={color.name}
                  >
                    <div
                      className="w-full h-full rounded-full shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.name === color.name && (
                        <Check className="w-3 h-3 text-white drop-shadow" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide */}
            <div className="showcase-text-item mb-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-2">
                <span className="font-medium text-espresso/70">Select Atelier Size:</span>
                <button
                  onClick={openSizeGuide}
                  className="flex items-center gap-1.5 text-gold hover:text-gold-dark font-semibold transition-colors lowercase first-letter:uppercase"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart & Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {currentLook.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[46px] h-10 px-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-espresso text-ivory shadow-lg scale-105 border border-espresso'
                        : 'bg-white/70 hover:bg-white text-espresso border border-espresso/15'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Black Pill "Add to Bag" */}
            <div className="showcase-text-item flex items-center gap-4">
              <button
                onClick={handleAddToBag}
                className="flex-1 bg-espresso hover:bg-gold hover:text-espresso text-ivory py-4 px-8 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-400 shadow-xl flex items-center justify-center gap-3 group"
              >
                <span>Add Look to Bag</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleQuickView}
                className="px-6 py-4 rounded-full border border-espresso/20 hover:border-espresso text-xs font-medium uppercase tracking-widest transition-colors bg-white/50"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
