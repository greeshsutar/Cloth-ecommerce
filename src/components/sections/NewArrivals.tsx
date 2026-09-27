'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductCardProps {
  prod: any;
  cardW: number;
  cardH: number;
  openQuickView: (prod: any) => void;
  formatPrice: (price: number) => string;
  textWaveRef?: (el: HTMLDivElement | null) => void;
}

const NewArrivalProductCard: React.FC<ProductCardProps> = ({
  prod,
  cardW,
  cardH,
  openQuickView,
  formatPrice,
  textWaveRef,
}) => {
  const images = prod.images && prod.images.length > 0 ? prod.images : [prod.image];
  const primaryImg = images[0];
  const secondaryImg = images.length > 1 ? images[1] : images[0];

  const [isHovered, setIsHovered] = useState(false);
  const secondaryImgRef = useRef<HTMLDivElement | null>(null);

  // Smooth editorial crossfade on hover (Primary <-> Secondary Image)
  useEffect(() => {
    if (images.length < 2 || !secondaryImgRef.current) return;

    if (isHovered) {
      gsap.fromTo(
        secondaryImgRef.current,
        { opacity: 0, scale: 1.015 },
        { opacity: 1, scale: 1.0, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(secondaryImgRef.current, {
        opacity: 0,
        scale: 1.0,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [isHovered, images.length]);

  return (
    <div
      onClick={() => openQuickView(prod)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex-shrink-0 cursor-pointer flex flex-col select-none"
      style={{ width: cardW }}
    >
      {/* 100% CLEAN Rectangular Image Tile — Sharp 0px corners, NO buttons, NO overlays */}
      <div
        className="relative w-full overflow-hidden bg-espresso/5 mb-3.5"
        style={{ height: cardH, borderRadius: 0 }}
      >
        {/* Primary Image (Default) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={primaryImg}
            alt={prod.name}
            fill
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 300px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Secondary Image (Fades in on Hover) */}
        {images.length > 1 && (
          <div
            ref={secondaryImgRef}
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
          >
            <Image
              src={secondaryImg}
              alt={`${prod.name} Alternate View`}
              fill
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 300px"
              className="object-cover object-center"
            />
          </div>
        )}
      </div>

      {/* Text Block (Below Image) */}
      <div ref={textWaveRef} className="flex flex-col text-left">
        {/* Category */}
        <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#B08A45] font-sans font-medium mb-1">
          {prod.overline || prod.category}
        </span>

        {/* Title */}
        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-normal text-espresso group-hover:text-[#B08A45] transition-colors duration-300 line-clamp-1 mb-1">
          {prod.name}
        </h3>

        {/* Description / Fabric */}
        <p className="text-xs sm:text-[13px] text-espresso/60 font-sans line-clamp-1 mb-1.5">
          {prod.fabric}
        </p>

        {/* Price */}
        <span className="font-serif text-base sm:text-lg font-normal text-espresso">
          {formatPrice(prod.price)}
        </span>
      </div>
    </div>
  );
};

export const NewArrivals: React.FC = () => {
  const { formatPrice, openQuickView } = useCart();

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const textWaveRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use products list
  const newProducts = PRODUCTS.filter((p) => p.isNew).length >= 5
    ? PRODUCTS.filter((p) => p.isNew)
    : PRODUCTS.slice(0, 7);

  const TOTAL_UNIQUE = newProducts.length;
  const REPEAT = 3;
  const displayItems = Array.from({ length: REPEAT }, (_, setIdx) =>
    newProducts.map((p, i) => ({
      ...p,
      uniqueKey: `${p.id}-set${setIdx}-${i}`,
      globalIdx: setIdx * TOTAL_UNIQUE + i,
    }))
  ).flat();

  // Dimensions & Loop Math (Desktop: 300x450px)
  const cardW = useRef(300);
  const cardH = useRef(450);
  const gap = useRef(28);
  const singleSetW = useRef(0);

  const xPos = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragOffsetX = useRef(0);

  const measure = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 640) {
      cardW.current = 220;
      cardH.current = 330;
      gap.current = 16;
    } else if (w < 1024) {
      cardW.current = 260;
      cardH.current = 390;
      gap.current = 22;
    } else {
      cardW.current = 300;
      cardH.current = 450;
      gap.current = 28;
    }
    singleSetW.current = TOTAL_UNIQUE * (cardW.current + gap.current);
  }, [TOTAL_UNIQUE]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Section Level Product Carousel Navigation (Controls Product Track)
  const handleSectionNext = () => {
    const step = cardW.current + gap.current;
    const targetX = xPos.current - step;

    gsap.to(xPos, {
      current: targetX,
      duration: 0.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (singleSetW.current > 0) {
          while (xPos.current < -singleSetW.current * 2) {
            xPos.current += singleSetW.current;
          }
          while (xPos.current > -singleSetW.current) {
            xPos.current -= singleSetW.current;
          }
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
        }
      },
    });
  };

  const handleSectionPrev = () => {
    const step = cardW.current + gap.current;
    const targetX = xPos.current + step;

    gsap.to(xPos, {
      current: targetX,
      duration: 0.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (singleSetW.current > 0) {
          while (xPos.current < -singleSetW.current * 2) {
            xPos.current += singleSetW.current;
          }
          while (xPos.current > -singleSetW.current) {
            xPos.current -= singleSetW.current;
          }
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
        }
      },
    });
  };

  const baseSpeed = useRef(35); // ~35px/sec slow luxury marquee speed
  const speed = useRef(35);
  const lastTime = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // Continuous Marquee Animation Loop (RIGHT -> LEFT)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf: number;
    const tick = (t: number) => {
      if (!lastTime.current) lastTime.current = t;
      const dt = Math.min((t - lastTime.current) / 1000, 0.1);
      lastTime.current = t;

      if (!dragging.current) {
        const targetSpd = isHovered ? 0 : speed.current;
        xPos.current -= targetSpd * dt;

        if (singleSetW.current > 0) {
          while (xPos.current < -singleSetW.current * 2) {
            xPos.current += singleSetW.current;
          }
          while (xPos.current > -singleSetW.current) {
            xPos.current -= singleSetW.current;
          }
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  // GSAP ScrollTrigger Text Wave Reveal
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Text Wave Reveal
      const validTextRefs = textWaveRefs.current.filter(Boolean);
      if (validTextRefs.length > 0) {
        gsap.fromTo(
          validTextRefs,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Touch & Pointer Drag Handlers for Mobile & Desktop Swipe
  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragOffsetX.current = xPos.current;
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStartX.current;
    xPos.current = dragOffsetX.current + dx;

    if (singleSetW.current > 0) {
      if (xPos.current <= -singleSetW.current * 2) {
        xPos.current += singleSetW.current;
        dragStartX.current = e.clientX;
        dragOffsetX.current = xPos.current;
      } else if (xPos.current > 0) {
        xPos.current -= singleSetW.current;
        dragStartX.current = e.clientX;
        dragOffsetX.current = xPos.current;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
    }
  };

  const onUp = () => {
    dragging.current = false;
  };

  return (
    <section
      id="new-arrivals"
      ref={sectionRef}
      className="w-full pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 bg-[#F8F3EE] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-3 border-b border-espresso/10"
        >
          <div>
            <span className="block text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#B08A45] font-mono font-medium mb-1">
              CURATED ESSENTIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-espresso tracking-tight">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            {/* Section Level Navigation Arrows (Controls Product Track OUTSIDE Cards) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSectionPrev}
                aria-label="Previous New Arrivals"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-espresso/20 text-espresso hover:border-[#B08A45] hover:text-[#B08A45] flex items-center justify-center transition-colors duration-300 group cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleSectionNext}
                aria-label="Next New Arrivals"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-espresso/20 text-espresso hover:border-[#B08A45] hover:text-[#B08A45] flex items-center justify-center transition-colors duration-300 group cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('best-sellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans uppercase tracking-[0.22em] font-semibold text-espresso hover:text-[#B08A45] transition-colors duration-300 pb-0.5 border-b border-[#B08A45]/40"
            >
              <span>VIEW ALL</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Product Track */}
        <div
          ref={trackWrapperRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            dragging.current = false;
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y group/track"
        >
          {/* Floating Left Navigation Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSectionPrev();
            }}
            aria-label="Previous Products"
            className="absolute left-2 sm:left-4 top-[38%] -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#B08A45] text-espresso hover:text-white border border-espresso/15 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
          </button>

          {/* Floating Right Navigation Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSectionNext();
            }}
            aria-label="Next Products"
            className="absolute right-2 sm:right-4 top-[38%] -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#B08A45] text-espresso hover:text-white border border-espresso/15 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
          </button>

          {/* Edge Vignette Fades */}
          <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#F8F3EE] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#F8F3EE] to-transparent z-20 pointer-events-none" />

          {/* Track */}
          <div
            ref={trackRef}
            className="flex items-start will-change-transform py-2"
            style={{ gap: `${gap.current}px` }}
          >
            {displayItems.map((prod, i) => (
              <NewArrivalProductCard
                key={prod.uniqueKey}
                prod={prod}
                cardW={cardW.current}
                cardH={cardH.current}
                openQuickView={openQuickView}
                formatPrice={formatPrice}
                textWaveRef={(el) => {
                  textWaveRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
