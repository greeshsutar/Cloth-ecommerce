'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BestSellers: React.FC = () => {
  const {
    addItem,
    isInWishlist,
    toggleWishlist,
    formatPrice,
    openQuickView,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const categories = ['All', 'Gowns', 'Ethnic', 'Bridal', 'Dresses'];

  // Best seller curated products
  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller || p.rating >= 4.9);
  const filteredProducts =
    activeCategory === 'All'
      ? bestSellerProducts
      : bestSellerProducts.filter((p) => p.category === activeCategory || p.occasion.includes(activeCategory));

  const safeProducts = filteredProducts.length > 0 ? filteredProducts : bestSellerProducts;

  // Duplicate for seamless infinite loop
  const repeatCount = safeProducts.length <= 2 ? 6 : safeProducts.length <= 4 ? 4 : 3;
  const displayItems = Array.from({ length: repeatCount }).flatMap(() => safeProducts);

  // Animation Refs for continuous smooth LEFT -> RIGHT motion
  const xPosRef = useRef<number>(-1200);
  const baseSpeedRef = useRef<number>(68); // ~68 pixels per second
  const currentSpeedRef = useRef<number>(68);
  const lastTimeRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragCurrentXRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Measure the width of one complete set of products
  const measureSetWidth = useCallback(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (!cards || cards.length === 0) return;

    let width = 0;
    const countInOneSet = safeProducts.length;
    for (let i = 0; i < countInOneSet && i < cards.length; i++) {
      const cardEl = cards[i] as HTMLElement;
      const style = window.getComputedStyle(cardEl);
      const marginRight = parseFloat(style.marginRight) || 28;
      width += cardEl.offsetWidth + marginRight;
    }
    singleSetWidthRef.current = width > 0 ? width : 1200;
  }, [safeProducts.length]);

  useEffect(() => {
    measureSetWidth();
    window.addEventListener('resize', measureSetWidth);
    return () => window.removeEventListener('resize', measureSetWidth);
  }, [measureSetWidth, displayItems.length]);

  // Continuous animation loop (LEFT -> RIGHT) with smooth velocity dampening
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      if (!isDraggingRef.current) {
        // Smooth speed easing on hover
        const targetSpeed = isHovered ? 0 : baseSpeedRef.current;
        currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * (deltaTime * 8);

        // Move track to the RIGHT (positive X translation)
        xPosRef.current += currentSpeedRef.current * deltaTime;

        // Wrap around seamlessly when translating right
        if (singleSetWidthRef.current > 0 && xPosRef.current >= 0) {
          xPosRef.current -= singleSetWidthRef.current;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isHovered]);

  // Entrance animation on scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (trackWrapperRef.current) {
        gsap.fromTo(
          trackWrapperRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Category filter switch transition
  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveCategory(cat);
      xPosRef.current = -singleSetWidthRef.current;
      setTimeout(() => {
        measureSetWidth();
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  // Pointer Drag handlers for touch / swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragCurrentXRef.current = xPosRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    xPosRef.current = dragCurrentXRef.current + deltaX;

    if (singleSetWidthRef.current > 0) {
      if (xPosRef.current >= 0) {
        xPosRef.current -= singleSetWidthRef.current;
        dragStartXRef.current = e.clientX;
        dragCurrentXRef.current = xPosRef.current;
      } else if (xPosRef.current <= -singleSetWidthRef.current * 2) {
        xPosRef.current += singleSetWidthRef.current;
        dragStartXRef.current = e.clientX;
        dragCurrentXRef.current = xPosRef.current;
      }
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="best-sellers"
      ref={sectionRef}
      className="w-full py-6 sm:py-8 lg:py-10 bg-ivory-100 relative overflow-hidden select-none border-t border-gold/15"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-5 lg:mb-6"
      >
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso tracking-tight">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-espresso/60 font-sans mt-2 max-w-md">
            Our most revered handcrafted gowns, heirloom lehengas, and fluid silks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-espresso text-ivory shadow-lg scale-105 border border-espresso'
                    : 'bg-white/80 text-espresso/75 hover:bg-white hover:text-espresso border border-espresso/10 hover:border-gold/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Moving Rail Container (Left to Right) */}
      <div
        ref={trackWrapperRef}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          isDraggingRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Soft edge fade gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-ivory-100 via-ivory-100/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-ivory-100 via-ivory-100/60 to-transparent z-10 pointer-events-none" />

        {/* Moving Rail Track (LEFT -> RIGHT) */}
        <div
          ref={trackRef}
          className={`flex gap-6 sm:gap-7 lg:gap-8 pl-6 sm:pl-12 will-change-transform py-4 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
          style={{ width: 'max-content' }}
        >
          {displayItems.map((product, index) => (
            <BestSellerCard
              key={`${product.id}-bestseller-${index}`}
              product={product}
              isWishlisted={isInWishlist(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              onQuickView={() => openQuickView(product)}
              onAddToCart={() => addItem(product)}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BestSellerCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
  formatPrice: (val: number) => string;
}

const BestSellerCard: React.FC<BestSellerCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  formatPrice,
}) => {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <div
      className="group flex-shrink-0 w-[270px] sm:w-[320px] lg:w-[340px] flex flex-col bg-white/90 hover:bg-white p-3.5 rounded-3xl border border-gold/20 hover:border-gold/50 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1.5"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-ivory-300 mb-4">
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 270px, 340px"
          className={`object-cover object-center transition-all duration-700 ease-out ${
            cardHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image on Hover */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 270px, 340px"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              cardHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Gold BESTSELLER Badge */}
        <div className="absolute top-3.5 left-3.5 bg-espresso text-gold font-semibold text-[9px] tracking-[0.25em] uppercase px-3 py-1 rounded-full shadow-sm font-mono border border-gold/40 flex items-center gap-1.5">
          <Sparkles className="w-2.5 h-2.5 text-gold" />
          <span>BESTSELLER</span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          aria-label="Save to Wishlist"
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
            isWishlisted
              ? 'bg-gold text-white shadow-md'
              : 'bg-white/80 text-espresso hover:text-gold hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-current text-white' : 'stroke-[1.5]'}`}
          />
        </button>

        {/* Slide-Up Add to Bag bar on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-espresso/90 via-espresso/70 to-transparent backdrop-blur-sm transition-all duration-400 transform ${
            cardHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full py-2.5 px-4 rounded-full bg-gold hover:bg-gold-light text-espresso text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Editorial Product Information */}
      <div className="flex flex-col flex-1 justify-between px-1 pb-1">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-medium block">
            {product.overline || product.category}
          </span>
          <h3 className="font-serif text-base lg:text-lg font-medium text-espresso transition-colors line-clamp-1 mt-0.5">
            {product.name}
          </h3>
          <p className="text-xs text-espresso/60 font-sans line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-espresso/10">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base font-semibold text-espresso">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs line-through text-espresso/40 font-sans">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-gold-dark font-medium uppercase tracking-widest font-mono">
            ★ {product.rating} RATING
          </span>
        </div>
      </div>
    </div>
  );
};
