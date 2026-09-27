'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    openCart,
    wishlistCount,
    openSearch,
    currency,
    setCurrency,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'glass-header py-4 shadow-sm border-b border-gold/15'
            : 'bg-gradient-to-b from-espresso/60 via-espresso/25 to-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left group"
            >
              <span
                className={`font-serif text-2xl lg:text-3xl tracking-[0.22em] font-medium uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-espresso' : 'text-ivory drop-shadow-md'
                }`}
              >
                AURELLE
              </span>
              <span className="block text-[8px] tracking-[0.45em] uppercase text-gold -mt-1 font-sans pl-0.5">
                HAUTE COUTURE
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9">
            {[
              { label: 'New In', target: 'new-arrivals' },
              { label: 'Dresses', target: 'dress-showcase' },
              { label: 'Occasion', target: 'shop-occasion' },
              { label: 'Atelier & Craft', target: 'fabric-craft' },
              { label: 'Lookbook', target: 'lookbook' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.target)}
                className={`text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300 hover:text-gold relative py-1 group ${
                  isScrolled ? 'text-espresso/80' : 'text-ivory/90 hover:text-white'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Controls (Currency, Search, Wishlist, Bag, Menu) */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Currency Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`flex items-center gap-1.5 text-xs tracking-wider uppercase px-2.5 py-1 rounded-full border transition-all ${
                  isScrolled
                    ? 'border-gold/30 text-espresso hover:border-gold'
                    : 'border-white/30 text-ivory hover:border-white'
                }`}
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 mt-2 py-2 w-28 bg-ivory text-espresso rounded-xl shadow-2xl border border-gold/30 backdrop-blur-xl z-50 animate-fadeIn">
                  {(['USD', 'EUR', 'GBP', 'INR'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-4 py-1.5 text-xs font-medium hover:bg-blush/60 transition-colors flex items-center justify-between ${
                        currency === curr ? 'text-gold font-semibold' : 'text-espresso/80'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              aria-label="Search catalog"
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-espresso hover:text-gold' : 'text-ivory hover:text-gold'
              }`}
            >
              <Search className="w-4 h-4 lg:w-5 lg:h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => {
                const element = document.getElementById('new-arrivals');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Wishlist"
              className={`p-2 rounded-full relative transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-espresso hover:text-gold' : 'text-ivory hover:text-gold'
              }`}
            >
              <Heart className="w-4 h-4 lg:w-5 lg:h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              aria-label="Shopping Bag"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 relative group ${
                isScrolled
                  ? 'bg-espresso text-ivory hover:bg-gold hover:text-espresso'
                  : 'bg-ivory/20 backdrop-blur-md text-ivory border border-ivory/30 hover:bg-gold hover:text-espresso hover:border-gold'
              }`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="text-xs font-semibold tracking-wider font-sans">
                {cartCount > 0 ? cartCount : '0'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-espresso' : 'text-ivory'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-espresso/95 backdrop-blur-2xl text-ivory flex flex-col justify-between p-8 pt-28 animate-fadeIn md:hidden">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-mono">
              Menu Navigation
            </span>
            {[
              { label: 'New Arrivals', target: 'new-arrivals' },
              { label: 'Featured Dresses', target: 'dress-showcase' },
              { label: 'Shop by Occasion', target: 'shop-occasion' },
              { label: 'Fabric & Atelier Craft', target: 'fabric-craft' },
              { label: 'Lookbook SS · 26', target: 'lookbook' },
              { label: 'Client Reviews', target: 'testimonials' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.target)}
                className="text-2xl font-serif tracking-wide text-left hover:text-gold transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-gold/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest text-ivory/60 uppercase">Currency</span>
              <div className="flex gap-2">
                {(['USD', 'EUR', 'GBP', 'INR'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      currency === curr
                        ? 'border-gold bg-gold text-espresso font-semibold'
                        : 'border-white/20 text-ivory/70'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-ivory/40 tracking-wider">
              AURELLE Haute Couture · Paris · Milan · New Delhi
            </p>
          </div>
        </div>
      )}
    </>
  );
};
