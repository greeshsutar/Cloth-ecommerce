'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface BridalItem {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in USD base
  inrPrice: number;
  image: string;
  category: string;
}

const BRIDAL_ITEMS: BridalItem[] = [
  {
    id: 'bridal-01',
    name: 'Royal Heritage Saree',
    subtitle: 'Kadhwa Weave Banarasi Silk',
    price: 320,
    inrPrice: 25800,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    category: 'Bridal Saree',
  },
  {
    id: 'bridal-02',
    name: 'Crimson Grace Saree',
    subtitle: 'Zardozi Border Pure Silk',
    price: 360,
    inrPrice: 28900,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    category: 'Bridal Saree',
  },
  {
    id: 'bridal-03',
    name: 'Golden Tradition Saree',
    subtitle: 'Real Gold Zari Tissue',
    price: 340,
    inrPrice: 27500,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    category: 'Bridal Saree',
  },
  {
    id: 'bridal-04',
    name: 'Regal Velvet Saree',
    subtitle: 'Plum Velvet Hand Embroidered',
    price: 390,
    inrPrice: 31200,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
    category: 'Bridal Saree',
  },
  {
    id: 'bridal-05',
    name: 'Emerald Bridal Saree',
    subtitle: 'Heritage Forest Zari Jaal',
    price: 330,
    inrPrice: 26700,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    category: 'Bridal Saree',
  },
  {
    id: 'bridal-06',
    name: 'Opulent Zardozi Saree',
    subtitle: 'Artisan Dabka & Moti Drape',
    price: 410,
    inrPrice: 34500,
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1000&q=85',
    category: 'Bridal Saree',
  },
];

export const BridalCollectionSection: React.FC = () => {
  const { addItem, formatPrice, currency } = useCart();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(BRIDAL_ITEMS[0].image);
  const [prevImage, setPrevImage] = useState<string>(BRIDAL_ITEMS[0].image);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const featuredImgRef = useRef<HTMLDivElement | null>(null);
  const topImgRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const animFrameRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);
  const activeProduct = BRIDAL_ITEMS[activeIndex] || BRIDAL_ITEMS[0];

  // Smooth editorial crossfade when activeIndex changes
  useEffect(() => {
    const nextImgUrl = BRIDAL_ITEMS[activeIndex]?.image;
    if (!nextImgUrl || nextImgUrl === currentImage) return;

    setPrevImage(currentImage);
    setCurrentImage(nextImgUrl);

    if (topImgRef.current) {
      gsap.fromTo(
        topImgRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1.0, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [activeIndex, currentImage]);

  // Select card & align continuous marquee scroll position
  const handleSelectProduct = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);

    const track = trackRef.current;
    if (track && track.children.length > 0) {
      const cardEl = track.children[0] as HTMLElement;
      if (cardEl) {
        const gap = parseFloat(window.getComputedStyle(track).gap || '14') || 14;
        const cardSlotWidth = cardEl.offsetWidth + gap;
        if (cardSlotWidth > 0) {
          offsetRef.current = index * cardSlotWidth;
          track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }
    }
  }, []);

  // Continuous infinite marquee carousel animation (RIGHT -> LEFT) with active focus sync
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();
    const speed = 48; // pixels per second (increased for faster smooth flow)

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused && track) {
        offsetRef.current += speed * delta;
        const singleSetWidth = track.scrollWidth / 2;
        if (singleSetWidth > 0 && offsetRef.current >= singleSetWidth) {
          offsetRef.current %= singleSetWidth;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;

        // Sync active index automatically as carousel moves
        const cardEl = track.children[0] as HTMLElement;
        if (cardEl) {
          const gap = parseFloat(window.getComputedStyle(track).gap || '14') || 14;
          const cardSlotWidth = cardEl.offsetWidth + gap;
          if (cardSlotWidth > 0) {
            const focusIndex = Math.floor((offsetRef.current + cardSlotWidth * 0.35) / cardSlotWidth) % BRIDAL_ITEMS.length;
            if (focusIndex !== activeIndexRef.current) {
              activeIndexRef.current = focusIndex;
              setActiveIndex(focusIndex);
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused]);

  // ScrollTrigger entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Featured image slide-up
      if (featuredImgRef.current) {
        gsap.fromTo(
          featuredImgRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Header text entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Carousel track entrance
      if (trackRef.current) {
        gsap.fromTo(
          trackRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            delay: 0.35,
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

  const handleAddToCart = (e: React.MouseEvent, item: BridalItem) => {
    e.stopPropagation();
    const productObj: any = {
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      price: item.price,
      mrp: Math.round(item.price * 1.3),
      category: 'Bridal',
      occasion: 'Wedding & Bridal',
      fabric: item.subtitle,
      description: `Exquisite handwoven bridal saree - ${item.name}`,
      details: ['100% Pure Silk', 'Handloom Zari Embroidery', 'Includes unstitched blouse piece'],
      care: 'Dry clean only',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Royal Red', hex: '#80182A' }],
      images: [item.image],
      rating: 5.0,
      reviewsCount: 24,
    };
    addItem(productObj);
  };

  // Double items array to achieve smooth 100% infinite marquee loop
  const displayItems = [...BRIDAL_ITEMS, ...BRIDAL_ITEMS];

  return (
    <section
      id="bridal-collection-section"
      ref={containerRef}
      className="relative w-full bg-ivory overflow-hidden py-0"
    >
      {/* ========================================================================= */}
      {/* DEEP BURGUNDY EDITORIAL CONTAINER (#21090F) - PLANE STRAIGHT TOP DIVIDER */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#21090F] text-ivory py-12 lg:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1550px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-14">
          
          {/* 1. LARGE LEFT FEATURED EDITORIAL IMAGE */}
          <div
            ref={featuredImgRef}
            className="relative w-full max-w-[420px] lg:w-[420px] h-[520px] sm:h-[580px] rounded-sm overflow-hidden flex-shrink-0 group cursor-pointer shadow-2xl bg-[#21090F]"
            onClick={() => {
              // Advance to next product on click
              handleSelectProduct((activeIndex + 1) % BRIDAL_ITEMS.length);
            }}
          >
            {/* Base Layer (Previous Image during Crossfade) */}
            {prevImage && (
              <Image
                src={prevImage}
                alt="Bridal Collection Previous"
                fill
                className="object-cover object-center"
                priority
              />
            )}

            {/* Top Layer (Active Image fading in) */}
            <div ref={topImgRef} className="absolute inset-0 w-full h-full">
              <Image
                src={currentImage}
                alt={activeProduct.name}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
            </div>

            {/* Subtle Gradient & View Collection CTA */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#21090F]/90 via-transparent to-black/20 pointer-events-none z-10" />
            
            <div className="absolute bottom-6 left-6 z-20 text-ivory">
              <div className="flex items-center gap-2 text-gold-light text-xs sm:text-sm font-serif tracking-[0.22em] uppercase group-hover:text-gold transition-colors">
                <span>VIEW THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
              <p className="text-[11px] text-ivory/70 font-sans mt-1 tracking-wider">
                {activeProduct.name} · {activeProduct.subtitle}
              </p>
            </div>
          </div>

          {/* 2. RIGHT SIDE EDITORIAL HEADER & MOVING PRODUCT CAROUSEL */}
          <div className="w-full flex-1 overflow-hidden flex flex-col justify-between py-2">
            
            {/* Header Title */}
            <div ref={headerRef} className="mb-6 lg:mb-8">
              <div className="flex items-center gap-2 text-gold text-[11px] sm:text-xs uppercase tracking-[0.35em] font-sans font-medium mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>BRIDAL EDIT</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ivory">
                The Bridal Collection
              </h2>
            </div>

            {/* HORIZONTAL CONTINUOUS CAROUSEL TRACK (RIGHT -> LEFT) */}
            <div
              className="relative w-full overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                ref={trackRef}
                className="flex items-center gap-2.5 sm:gap-3.5 will-change-transform py-2"
                style={{ width: 'max-content' }}
              >
                {displayItems.map((item, idx) => {
                  const originalIndex = idx % BRIDAL_ITEMS.length;
                  const isActive = originalIndex === activeIndex;

                  // Price display using formatPrice
                  const priceDisplay =
                    currency === 'INR'
                      ? `₹${item.inrPrice.toLocaleString('en-IN')}`
                      : formatPrice(item.price);

                  return (
                    <div
                      key={`${item.id}-${idx}`}
                      onClick={() => handleSelectProduct(originalIndex)}
                      className={`w-[200px] sm:w-[220px] lg:w-[235px] flex-shrink-0 bg-[#F5EBE6] text-[#21090F] rounded-[2px] overflow-hidden transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? 'ring-2 ring-gold shadow-2xl scale-[1.02]'
                          : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Card Portrait Image */}
                      <div className="relative w-full h-[240px] sm:h-[260px] overflow-hidden bg-ivory">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        {isActive && (
                          <div className="absolute top-2 right-2 bg-[#21090F] text-gold px-2 py-0.5 rounded-[2px] text-[9px] font-mono tracking-widest uppercase z-10">
                            FEATURED
                          </div>
                        )}
                      </div>

                      {/* Card Content (ALL INSIDE THE CARD) */}
                      <div className="p-3 sm:p-3.5 flex flex-col justify-between h-[130px] bg-[#F5EBE6]">
                        <div>
                          <h3 className="font-serif text-sm sm:text-base font-medium text-[#21090F] leading-tight truncate">
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-[#21090F]/70 font-sans font-normal mt-1">
                            {priceDisplay}
                          </p>
                        </div>

                        {/* Gold Add to Cart Button */}
                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          className="w-full mt-2 bg-[#C89D5C] hover:bg-[#B88E4B] active:bg-[#A87E3B] text-[#21090F] text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase py-2 px-3 rounded-[2px] flex items-center justify-center gap-1.5 transition-colors duration-200 group-hover:shadow-md"
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <span>ADD TO CART</span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Manual Advance Arrow Control Button */}
              <button
                onClick={() => {
                  handleSelectProduct((activeIndex + 1) % BRIDAL_ITEMS.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#21090F]/90 border border-gold/40 text-gold hover:bg-gold hover:text-[#21090F] flex items-center justify-center shadow-xl transition-all duration-300 backdrop-blur-md group"
                title="Next Bridal Style"
                aria-label="Next Bridal Style"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ORGANIC WAVE TRANSITION (Deep Burgundy -> Warm Ivory)             */}
      {/* ========================================================================= */}
      <div className="w-full overflow-hidden leading-none bg-ivory -mt-1">
        <svg
          viewBox="0 0 1440 130"
          className="w-full h-10 sm:h-14 lg:h-18 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C280,115 580,25 900,95 C1180,35 1340,110 1440,40 L1440,0 L0,0 Z"
            fill="#21090F"
          />
        </svg>
      </div>
    </section>
  );
};
