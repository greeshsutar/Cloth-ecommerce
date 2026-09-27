'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface LookbookItem {
  id: string;
  number: string;
  counter: string;
  title: string;
  titleWords: string[];
  category: string;
  subtitle: string;
  price: number; // in USD base
  inrPrice: number;
  description: string;
  modelSrc: string;
  rawMode?: 'checkerboard' | 'black' | 'none';
  colors: { name: string; hex: string }[];
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-01',
    number: '01',
    counter: '01 / 03 LOOKS',
    title: 'The Royal Heritage Saree',
    titleWords: ['The', 'Royal', 'Heritage', 'Saree'],
    category: 'BRIDAL EDIT',
    subtitle: 'Kadhwa Zari Banarasi Silk',
    price: 890,
    inrPrice: 25800,
    description:
      'A timeless silhouette crafted with intricate zari work and rich textures, celebrating the grandeur of Indian bridal heritage.',
    modelSrc: '/look_model_01.png',
    rawMode: 'none',
    colors: [
      { name: 'Royal Burgundy', hex: '#4A1525' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Rose Quartz', hex: '#C28D75' },
      { name: 'Emerald Forest', hex: '#1C3E2D' },
    ],
  },
  {
    id: 'look-02',
    number: '02',
    counter: '02 / 03 LOOKS',
    title: 'Crimson Grace Saree',
    titleWords: ['Crimson', 'Grace', 'Saree'],
    category: 'ATELIER EDITION',
    subtitle: 'Nude Gold Tissue Handloom',
    price: 950,
    inrPrice: 28900,
    description:
      'Woven over 160 artisan hours in Varanasi. Features hand-cut floral jaal, heavy kalis, and a diaphanous gold organza dupatta.',
    modelSrc: '/look_model_02.png',
    rawMode: 'none',
    colors: [
      { name: 'Nude Gold', hex: '#D6C0A8' },
      { name: 'Emerald Forest', hex: '#1C3E2D' },
      { name: 'Ruby Scarlet', hex: '#80182A' },
    ],
  },
  {
    id: 'look-03',
    number: '03',
    counter: '03 / 03 LOOKS',
    title: 'Emerald Elegance Saree',
    titleWords: ['Emerald', 'Elegance', 'Saree'],
    category: 'ROYAL ETHNIC',
    subtitle: 'Deep Forest Metallic Zari',
    price: 870,
    inrPrice: 27500,
    description:
      'An opulent expression of royal heritage. Deep forest green silk draped gracefully with shimmering beaten metallic gold zari borders.',
    modelSrc: '/look_model_03_raw.jpg',
    rawMode: 'checkerboard',
    colors: [
      { name: 'Emerald Forest', hex: '#1C3E2D' },
      { name: 'Antique Gold', hex: '#C49A53' },
      { name: 'Deep Plum', hex: '#362117' },
    ],
  },
];

export const DressShowcase: React.FC = () => {
  const { addItem, formatPrice, currency } = useCart();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [processedModels, setProcessedModels] = useState<Record<string, string>>({});
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const [displayPrevModel, setDisplayPrevModel] = useState<string>('');
  const [displayCurrentModel, setDisplayCurrentModel] = useState<string>('');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<HTMLDivElement | null>(null);
  const oldModelContainerRef = useRef<HTMLDivElement | null>(null);
  const newModelContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const infoRef = useRef<HTMLDivElement | null>(null);
  const titleWordsRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);
  const swatchesRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const numberWatermarkRef = useRef<HTMLDivElement | null>(null);
  const counterTextRef = useRef<HTMLSpanElement | null>(null);

  const activeIndexRef = useRef<number>(0);
  const currentLook = LOOKBOOK_ITEMS[activeIndex] || LOOKBOOK_ITEMS[0];

  // Helper to pre-process Model 3 transparency dynamically
  useEffect(() => {
    const processModels = async () => {
      const newProcessed: Record<string, string> = {};

      for (const item of LOOKBOOK_ITEMS) {
        if (item.rawMode === 'none') {
          newProcessed[item.id] = item.modelSrc;
        } else {
          try {
            const processedUrl = await new Promise<string>((resolve) => {
              const img = new window.Image();
              img.crossOrigin = 'anonymous';
              img.src = item.modelSrc;
              img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                if (!ctx) return resolve(item.modelSrc);

                ctx.drawImage(img, 0, 0);
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;

                if (item.rawMode === 'checkerboard') {
                  for (let i = 0; i < data.length; i += 4) {
                    const r = data[i], g = data[i + 1], b = data[i + 2];
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    const diff = max - min;

                    const isEmeraldSaree = g > r + 8 && g > b;
                    const isSkinOrGold = r > 100 && g > 65 && b < 170 && r > b + 10;
                    const isDarkShadow = r < 70 && g < 70 && b < 70;

                    if (!isEmeraldSaree && !isSkinOrGold && !isDarkShadow && diff < 30 && r > 120) {
                      data[i + 3] = 0;
                    }
                  }
                }

                ctx.putImageData(imgData, 0, 0);
                resolve(canvas.toDataURL('image/png'));
              };
              img.onerror = () => resolve(item.modelSrc);
            });
            newProcessed[item.id] = processedUrl;
          } catch (e) {
            newProcessed[item.id] = item.modelSrc;
          }
        }
      }

      setProcessedModels(newProcessed);
      const initialUrl = newProcessed[LOOKBOOK_ITEMS[0].id] || LOOKBOOK_ITEMS[0].modelSrc;
      setDisplayCurrentModel(initialUrl);
    };

    processModels();
  }, []);

  // Coordinated editorial transition function (Old out with Sari Flip -> New in)
  const executeLookTransition = useCallback((targetIndex: number) => {
    const prevIdx = activeIndexRef.current;
    const isForward = targetIndex >= prevIdx;

    setActiveIndex(targetIndex);
    setSelectedColorIndex(0);

    const oldUrl = processedModels[LOOKBOOK_ITEMS[prevIdx]?.id] || LOOKBOOK_ITEMS[prevIdx]?.modelSrc || '';
    const newUrl = processedModels[LOOKBOOK_ITEMS[targetIndex]?.id] || LOOKBOOK_ITEMS[targetIndex]?.modelSrc || '';

    setDisplayPrevModel(oldUrl);
    setDisplayCurrentModel(newUrl);

    const oldModelEl = oldModelContainerRef.current;
    const newModelEl = newModelContainerRef.current;
    const numberEl = numberWatermarkRef.current;
    const counterEl = counterTextRef.current;
    const wordsEl = titleWordsRef.current;
    const descEl = descRef.current;
    const priceEl = priceRef.current;
    const swatchesEl = swatchesRef.current;
    const ctaEl = ctaRef.current;

    // Rapid scroll protection: clean up active timeline before starting new transition
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (newModelEl) {
          gsap.set(newModelEl, { clearProps: 'transform,filter,opacity' });
        }
      },
    });
    activeTimelineRef.current = tl;

    // 1. HORIZONTAL DIRECTIONAL MODEL TRANSITION (1.2s)
    // NEW MODEL: Enters from LEFT (x: -90px -> 0px), opacity 0 -> 1
    // OLD MODEL: Exits toward RIGHT (x: 0px -> +60px), opacity 1 -> 0
    if (oldModelEl && newModelEl) {
      // Layer 1: NEW MODEL (LEFT -> CENTER + fade in)
      tl.fromTo(
        newModelEl,
        {
          x: -90,
          opacity: 0,
          scale: 1.01,
          filter: 'blur(4px)',
        },
        {
          x: 0,
          opacity: 1.0,
          scale: 1.0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0.0
      );

      // Layer 2: OLD MODEL (CENTER -> RIGHT + fade out)
      tl.fromTo(
        oldModelEl,
        {
          x: 0,
          opacity: 1.0,
          scale: 1.0,
          filter: 'blur(0px)',
        },
        {
          x: 60,
          opacity: 0,
          scale: 1.01,
          filter: 'blur(3px)',
          duration: 1.2,
          ease: 'power2.inOut',
        },
        0.0
      );
    }

    // 2. Oversized watermark & counter text transition
    if (numberEl) {
      tl.fromTo(
        numberEl,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.1
      );
    }

    if (counterEl) {
      tl.fromTo(
        counterEl,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        0.12
      );
    }

    // 3. Editorial Title Wave Stagger Reveal
    if (wordsEl) {
      const wordNodes = wordsEl.querySelectorAll('.editorial-word');
      if (wordNodes.length > 0) {
        tl.fromTo(
          wordNodes,
          { opacity: 0, y: 20, rotation: 2 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power3.out',
          },
          0.15
        );
      }
    }

    // 4. Description Reveal
    if (descEl) {
      tl.fromTo(
        descEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.3
      );
    }

    // 5. Price Reveal
    if (priceEl) {
      tl.fromTo(
        priceEl,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        0.4
      );
    }

    // 6. Colour Swatches Reveal
    if (swatchesEl) {
      const swatchNodes = swatchesEl.querySelectorAll('.swatch-item');
      if (swatchNodes.length > 0) {
        tl.fromTo(
          swatchNodes,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1.0, duration: 0.3, stagger: 0.04, ease: 'back.out(1.5)' },
          0.48
        );
      }
    }

    // 7. CTA Reveal
    if (ctaEl) {
      tl.fromTo(
        ctaEl,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        0.55
      );
    }
  }, [processedModels]);

  // GSAP ScrollTrigger Pinned Navigation Setup (300vh scroll)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Pinned ScrollTrigger across scroll container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0.0 -> 1.0
          const count = LOOKBOOK_ITEMS.length;
          const targetIndex = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));

          if (targetIndex !== activeIndexRef.current) {
            const prevIdx = activeIndexRef.current;
            activeIndexRef.current = targetIndex;
            executeLookTransition(targetIndex);
          }
        },
      });

      // Subtle scroll parallax on model image
      if (modelRef.current) {
        gsap.to(modelRef.current, {
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [executeLookTransition]);

  // Smooth scroll helper for thumbnail clicks and Prev/Next buttons
  const scrollToLook = useCallback((targetIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const scrollTop = window.scrollY + containerRect.top;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = containerHeight - viewportHeight;

    const maxIdx = Math.max(1, LOOKBOOK_ITEMS.length - 1);
    const targetY = scrollTop + (targetIndex / maxIdx) * scrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % LOOKBOOK_ITEMS.length;
    scrollToLook(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length;
    scrollToLook(prevIdx);
  };

  const handleExploreLook = () => {
    const productObj: any = {
      id: currentLook.id,
      name: currentLook.title,
      subtitle: currentLook.subtitle,
      price: currentLook.price,
      mrp: Math.round(currentLook.price * 1.3),
      category: 'Bridal',
      occasion: 'Wedding & Bridal',
      fabric: currentLook.subtitle,
      description: currentLook.description,
      details: ['100% Pure Mulberry Silk', 'Handloom Zari Embroidery', 'Artisan Certified'],
      care: 'Specialized dry clean only',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: currentLook.colors,
      images: [processedModels[currentLook.id] || currentLook.modelSrc],
      rating: 4.95,
      reviewsCount: 38,
    };
    addItem(productObj);
  };

  const activeModelUrl = processedModels[currentLook.id] || currentLook.modelSrc;
  const priceDisplay =
    currency === 'INR'
      ? `₹${currentLook.inrPrice.toLocaleString('en-IN')}`
      : formatPrice(currentLook.price);

  return (
    <section
      id="dress-showcase"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-ivory text-espresso"
      aria-label="01 / 03 LOOKS Scroll-Driven Editorial Showcase"
    >
      {/* 100svh Sticky Viewport Pinned during scroll (starts below header top-16 sm:top-20) */}
      <div
        ref={pinRef}
        className="sticky top-16 sm:top-20 w-full h-[calc(100svh-4rem)] sm:h-[calc(100svh-5rem)] overflow-hidden bg-ivory flex items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-16"
      >
        {/* Dynamic Editorial Wireframe Background Circle */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full border border-gold/15 pointer-events-none z-0" />

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 xl:gap-12 py-2 sm:py-4">
          
          {/* ========================================================================= */}
          {/* LEFT / CENTER: LARGE TRANSPARENT MODEL & OVERSIZED WATERMARK NUMERAL      */}
          {/* ========================================================================= */}
          <div className="relative w-full lg:w-[52%] h-[48%] lg:h-full flex items-center justify-center overflow-visible">
            
            {/* Oversized Watermark Numeral ("01", "02", "03") */}
            <div
              ref={numberWatermarkRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
            >
              <span className="font-serif text-[130px] sm:text-[200px] lg:text-[260px] xl:text-[300px] font-normal leading-none text-gold/10 tracking-tighter block">
                {currentLook.number}
              </span>
            </div>

            {/* Large Transparent Model Image Stage (Dual-layer horizontal directional transition) */}
            <div
              ref={modelRef}
              className="relative z-10 w-full h-full max-h-[calc(100svh-6.5rem)] sm:max-h-[calc(100svh-7.5rem)] flex items-center justify-center p-1"
            >
              {/* Layer 1: New Model (Enters from LEFT -> CENTER) */}
              <div
                ref={newModelContainerRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10"
              >
                {(displayCurrentModel || activeModelUrl) && (
                  <Image
                    src={displayCurrentModel || activeModelUrl}
                    alt={currentLook.title}
                    fill
                    className="object-contain object-bottom drop-shadow-xl max-h-full max-w-full"
                    priority
                  />
                )}
              </div>

              {/* Layer 2: Old Model (Exits from CENTER -> RIGHT) */}
              <div
                ref={oldModelContainerRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20"
              >
                {displayPrevModel && displayPrevModel !== (displayCurrentModel || activeModelUrl) && (
                  <Image
                    src={displayPrevModel}
                    alt="Previous Lookbook Model"
                    fill
                    className="object-contain object-bottom drop-shadow-xl max-h-full max-w-full"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Left Vertical Editorial Caption */}
            <div className="hidden lg:flex absolute left-0 bottom-4 flex-col items-center gap-2 z-20 text-gold/60">
              <div className="w-[1px] h-8 bg-gold/30" />
              <span className="text-[9px] uppercase tracking-[0.35em] font-mono [writing-mode:vertical-lr] rotate-180">
                SCROLL TO EXPLORE
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: LOOK COUNTER, THUMBNAILS, TITLE, PRICE, SWATCHES, CTA         */}
          {/* ========================================================================= */}
          <div
            ref={infoRef}
            className="w-full lg:w-[48%] h-auto max-h-full flex flex-col justify-center max-w-xl text-espresso overflow-y-auto lg:overflow-visible py-1 sm:py-2"
          >
            {/* 1. TOP LOOK COUNTER & NAV CONTROLS */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gold/20">
              <span
                ref={counterTextRef}
                className="text-[11px] sm:text-xs uppercase tracking-[0.35em] font-mono font-medium text-espresso/80 inline-block"
              >
                {currentLook.counter}
              </span>

              {/* Minimal Previous / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold/40 text-espresso hover:bg-gold hover:text-white flex items-center justify-center transition-all duration-300 group"
                  aria-label="Previous Look"
                >
                  <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-espresso text-ivory hover:bg-gold hover:text-espresso flex items-center justify-center transition-all duration-300 group"
                  aria-label="Next Look"
                >
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* 2. THREE LOOK THUMBNAILS */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3 max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]">
              {LOOKBOOK_ITEMS.map((item, idx) => {
                const isActive = idx === activeIndex;
                const thumbUrl = processedModels[item.id] || item.modelSrc;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToLook(idx)}
                    className={`relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-ivory/60 transition-all duration-300 group ${
                      isActive
                        ? 'ring-2 ring-gold ring-offset-2 ring-offset-ivory scale-105 shadow-md'
                        : 'opacity-70 hover:opacity-100 hover:scale-102'
                    }`}
                    aria-label={`Scroll to Look ${item.number}`}
                  >
                    {thumbUrl && (
                      <Image
                        src={thumbUrl}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                      />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 border border-gold/40 rounded-sm pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 3. CATEGORY & EDITORIAL WAVE TITLE */}
            <div className="mb-2 sm:mb-3">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-gold font-sans font-medium block mb-1">
                {currentLook.category} · {currentLook.subtitle}
              </span>

              {/* Title with Word-by-Word Wave Reveal Stagger */}
              <div ref={titleWordsRef} className="flex flex-wrap gap-x-2 gap-y-0.5 overflow-hidden">
                {currentLook.titleWords.map((word, wIdx) => (
                  <h2
                    key={`${word}-${wIdx}`}
                    className="editorial-word font-serif text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[1.1] tracking-tight text-espresso inline-block will-change-transform"
                  >
                    {word}
                  </h2>
                ))}
              </div>
            </div>

            {/* 4. DESCRIPTION */}
            <p
              ref={descRef}
              className="text-xs sm:text-sm text-espresso/75 font-sans leading-relaxed mb-2 sm:mb-3 font-light max-w-md line-clamp-2 sm:line-clamp-3"
            >
              {currentLook.description}
            </p>

            {/* 5. PRICE */}
            <div ref={priceRef} className="mb-2 sm:mb-3">
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-medium text-espresso">
                {priceDisplay}
              </span>
            </div>

            {/* 6. COLOUR SWATCHES */}
            <div ref={swatchesRef} className="mb-3 sm:mb-4">
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-espresso/60 block mb-1.5">
                COLOURS
              </span>
              <div className="flex items-center gap-2">
                {currentLook.colors.map((c, i) => {
                  const isSelected = i === selectedColorIndex;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIndex(i)}
                      className={`swatch-item w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                        isSelected
                          ? 'ring-2 ring-gold ring-offset-2 ring-offset-ivory scale-110'
                          : 'hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-ivory shadow-sm" />
                      )}
                    </button>
                  );
                })}
                <span className="text-xs font-sans text-espresso/70 ml-2 font-medium">
                  {currentLook.colors[selectedColorIndex]?.name}
                </span>
              </div>
            </div>

            {/* 7. CTAs */}
            <div ref={ctaRef} className="flex items-center gap-4 sm:gap-5">
              <button
                onClick={handleExploreLook}
                className="btn-gold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-2 shadow-xl transition-all duration-300 group"
                aria-label="Explore Look"
              >
                <span>EXPLORE LOOK</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={handleExploreLook}
                className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium text-espresso/80 hover:text-gold transition-colors py-1 border-b border-espresso/30 hover:border-gold"
              >
                VIEW DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

