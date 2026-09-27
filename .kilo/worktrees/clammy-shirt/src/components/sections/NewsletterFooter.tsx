'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const NewsletterFooter: React.FC = () => {
  const { openSizeGuide, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
    <footer className="relative w-full bg-espresso text-ivory pt-20 pb-12 overflow-hidden">
      
      {/* Massive Faded Serif Watermark Spanning the Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] font-serif text-[32vw] tracking-wider leading-none text-white whitespace-nowrap z-0">
        AURELLE
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Foreground Floating Ivory Newsletter Card */}
        <div className="relative -mt-32 mb-20 p-8 sm:p-12 lg:p-16 rounded-3xl bg-ivory text-espresso shadow-2xl border border-gold/30 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-[0.35em] font-medium font-sans mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AURELLE PRIVÉ INVITATION</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-espresso">
                Get 10% Off <br />
                <span className="italic text-gold-dark font-light">Your First Bespoke Order.</span>
              </h3>
              <p className="text-sm text-espresso/70 font-sans mt-3 max-w-md">
                Subscribe for private preview access to limited seasonal runs, couture runway
                releases, and private salon appointments.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-6 rounded-2xl bg-gold/15 border border-gold text-center">
                  <span className="font-serif text-xl font-medium text-espresso block mb-1">
                    Welcome to the Inner Circle
                  </span>
                  <p className="text-xs text-espresso/80 font-sans">
                    Use code <span className="font-mono font-bold text-gold-dark">AURELLE10</span> at checkout for 10% off your creation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email address..."
                    required
                    className="flex-1 px-6 py-4 rounded-full bg-white border border-espresso/15 focus:border-gold focus:outline-none text-xs tracking-wider placeholder:text-espresso/40 text-espresso transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    className="btn-gold px-8 py-4 rounded-full text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    <span>Join Privé</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}

              {/* Guarantees row */}
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-espresso/10 text-[11px] text-espresso/60 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  Silk Mark Certified
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-gold" />
                  Global Express Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-gold" />
                  Complimentary Alterations
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column (2 cols on tablet+) */}
          <div className="col-span-2">
            <span className="font-serif text-3xl tracking-[0.2em] font-medium uppercase text-ivory block">
              AURELLE
            </span>
            <span className="block text-[9px] tracking-[0.45em] uppercase text-gold -mt-1 font-sans pl-0.5 mb-5">
              HAUTE COUTURE · ATELIER
            </span>
            <p className="text-xs text-ivory/60 font-sans leading-relaxed max-w-sm mb-6">
              An intimate fashion atelier celebrating timeless silhouette drapery, pure
              handloom silks, and bespoke occasion wear for discerning women worldwide.
            </p>

            {/* WhatsApp Concierge Link */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-gold hover:text-espresso text-ivory text-xs tracking-wider uppercase transition-all duration-300 border border-white/15"
            >
              <MessageCircle className="w-4 h-4 text-gold group-hover:text-espresso" />
              <span>WhatsApp Atelier Concierge</span>
            </a>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-xs text-ivory/70 font-sans">
              <li>
                <button
                  onClick={() => scrollToSection('new-arrivals')}
                  className="hover:text-gold transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('dress-showcase')}
                  className="hover:text-gold transition-colors"
                >
                  Evening Gowns
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('shop-occasion')}
                  className="hover:text-gold transition-colors"
                >
                  Bridal Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('shop-occasion')}
                  className="hover:text-gold transition-colors"
                >
                  Draped Silk Midis
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('lookbook')}
                  className="hover:text-gold transition-colors"
                >
                  SS &apos;26 Runway Lookbook
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care & Size Guide */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              Client Care
            </h4>
            <ul className="space-y-3 text-xs text-ivory/70 font-sans">
              <li>
                <button
                  onClick={openSizeGuide}
                  className="hover:text-gold transition-colors text-left"
                >
                  Atelier Size &amp; Fit Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Complimentary worldwide express shipping over $300')}
                  className="hover:text-gold transition-colors"
                >
                  Shipping &amp; Customs
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Returns accepted within 14 days of delivery')}
                  className="hover:text-gold transition-colors"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Bespoke bridal consultations available via video or in-salon')}
                  className="hover:text-gold transition-colors"
                >
                  Made to Measure Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Mulberry Silk Mark certificate provided with every garment')}
                  className="hover:text-gold transition-colors"
                >
                  Fabric Authentication
                </button>
              </li>
            </ul>
          </div>

          {/* Boutiques & Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              Boutiques
            </h4>
            <ul className="space-y-3 text-xs text-ivory/70 font-sans">
              <li>
                <span className="text-ivory font-medium block">Paris Salon</span>
                <span className="text-ivory/50">28 Rue du Faubourg Saint-Honoré</span>
              </li>
              <li className="pt-2">
                <span className="text-ivory font-medium block">London Studio</span>
                <span className="text-ivory/50">14 Conduit Street, Mayfair</span>
              </li>
              <li className="pt-2">
                <span className="text-ivory font-medium block">New Delhi Atelier</span>
                <span className="text-ivory/50">The Dhan Mill, Chhatarpur</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Payments, Badges, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ivory/50 font-sans">
          <div>
            <p>© 2026 AURELLE Luxury Boutiques Ltd. All rights reserved.</p>
          </div>

          {/* Payment Badges (UPI, Visa, Mastercard, Razorpay) */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-gold font-medium mr-2">
              Secured Via:
            </span>
            <div className="px-3 py-1 rounded bg-white/10 text-[10px] font-mono tracking-wider font-semibold text-ivory">
              UPI / QR
            </div>
            <div className="px-3 py-1 rounded bg-white/10 text-[10px] font-mono tracking-wider font-semibold text-ivory">
              VISA
            </div>
            <div className="px-3 py-1 rounded bg-white/10 text-[10px] font-mono tracking-wider font-semibold text-ivory">
              MASTERCARD
            </div>
            <div className="px-3 py-1 rounded bg-white/10 text-[10px] font-mono tracking-wider font-semibold text-gold">
              RAZORPAY
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
