'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ArrowRight, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const NewsletterFooter: React.FC = () => {
  const { openSizeGuide, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !footerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle entrance animation when footer enters viewport
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to Aurelle Privé. Your 10% code is AURELLE10');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full select-none overflow-hidden min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex flex-col justify-between border-t border-gold/30"
      aria-label="Aurelle Luxury Atelier Editorial Campaign Footer"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED FASHION CAMPAIGN BACKGROUND IMAGE                           */}
      {/* ========================================================================= */}
      <Image
        src="/footer_campaign.png"
        alt="Aurelle Haute Couture Luxury Indian Fashion Campaign"
        fill
        sizes="100vw"
        className="object-cover object-center filter contrast-[1.05]"
        priority
      />

      {/* ========================================================================= */}
      {/* 2. SUBTLE LEGIBILITY OVERLAY GRADIENT                                     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80 pointer-events-none" />

      {/* ========================================================================= */}
      {/* 3. EDITORIAL CONTENT OVERLAY LAYER                                        */}
      {/* ========================================================================= */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-8 flex flex-col justify-between h-full min-h-[640px] sm:min-h-[720px] lg:min-h-[780px]"
      >
        {/* 5-COLUMN EDITORIAL OVERLAY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start text-ivory">
          
          {/* COLUMN 1: BRAND / ABOUT (lg:col-span-3.5 -> 3.5fr) */}
          <div className="lg:col-span-4 flex flex-col pr-0 lg:pr-4">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.22em] font-medium uppercase text-ivory block">
              AURELLE
            </span>
            <span className="text-[9px] tracking-[0.45em] uppercase text-gold font-sans block mt-0.5 mb-4 font-semibold">
              HAUTE COUTURE · ATELIER
            </span>

            <p className="font-serif text-lg sm:text-xl text-ivory font-normal leading-snug mb-3 italic">
              &ldquo;Timeless Indian craftsmanship, reimagined for the modern wardrobe.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-ivory/80 font-sans leading-relaxed max-w-sm mb-6">
              An intimate fashion atelier celebrating timeless silhouette drapery, pure mulberry silk weaves, and bespoke Indian couture.
            </p>

            {/* Translucent WhatsApp Concierge Button */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[2px] bg-white/90 hover:bg-gold text-espresso hover:text-espresso text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 backdrop-blur-md shadow-lg border border-white/60 w-max"
            >
              <MessageCircle className="w-4 h-4 text-gold group-hover:text-espresso" />
              <span>WHATSAPP CONCIERGE</span>
            </a>
          </div>

          {/* COLUMN 2: SHOP (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-ivory/85 font-sans">
              <li>
                <button
                  onClick={() => scrollToSection('new-arrivals')}
                  className="hover:text-gold transition-colors text-left"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('shop-occasion')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Heritage Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('bridal-collection')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Bridal Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('dress-showcase')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Draped Silk Midis
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('occasion-edits')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Occasion Edits
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('best-sellers')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: EXPLORE (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              EXPLORE
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-ivory/85 font-sans">
              <li>
                <button
                  onClick={() => scrollToSection('fabric-craft')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('fabric-craft')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Atelier Craftsmanship
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('lookbook')}
                  className="hover:text-gold transition-colors text-left"
                >
                  SS &apos;26 Runway Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('latest-trends')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Latest Trends
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('six-moods')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Six Moods Archive
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: SUPPORT (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              SUPPORT
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-ivory/85 font-sans">
              <li>
                <button
                  onClick={() => showToast('Atelier Concierge: concierge@aurelle.luxury')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Complimentary worldwide express shipping over $300')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Returns accepted within 14 days of delivery')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={openSizeGuide}
                  className="hover:text-gold transition-colors text-left"
                >
                  Size &amp; Fit Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Silk Mark Certificate included with all heirloom creations')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Fabric Authentication
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: STAY UPDATED (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              STAY UPDATED
            </h4>
            
            <p className="text-xs text-ivory/85 font-sans leading-relaxed mb-5">
              Receive new collections, seasonal stories and private updates from the house.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-[2px] bg-black/50 border border-gold/40 backdrop-blur-md text-center">
                <span className="font-serif text-xs font-medium text-ivory block mb-0.5">
                  Welcome to Aurelle Privé
                </span>
                <p className="text-[10px] text-ivory/80 font-sans">
                  Use code <span className="font-mono font-bold text-gold">AURELLE10</span> for 10% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-white/40 focus-within:border-gold py-2.5 transition-colors mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address..."
                  required
                  className="w-full bg-transparent text-xs tracking-wider placeholder:text-ivory/50 text-ivory focus:outline-none pr-8 font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-gold hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>
              </form>
            )}

            {/* Service Badges */}
            <div className="space-y-2 pt-2 border-t border-white/15 text-[10px] text-ivory/75 uppercase tracking-wider font-mono">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                Pure Silk Mark Certified
              </span>
              <span className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                Global Express Delivery
              </span>
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                Bespoke Alterations
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL & SOCIAL OVERLAY ROW */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/75 font-sans mt-auto">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-[10px] tracking-wider text-ivory/70 font-mono">
              © 2026 AURELLE LUXURY BOUTIQUES. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-[11px] font-sans text-ivory/70">
            <button onClick={() => showToast('Privacy Policy')} className="hover:text-gold transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => showToast('Terms of Service')} className="hover:text-gold transition-colors">
              Terms of Service
            </button>
            <span>·</span>
            <button onClick={() => showToast('Shipping Policy')} className="hover:text-gold transition-colors">
              Shipping Policy
            </button>
            <span>·</span>
            <span className="text-gold font-mono">India (INR ₹)</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-mono text-gold">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
            <span>·</span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Facebook
            </a>
            <span>·</span>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Pinterest
            </a>
            <span>·</span>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
