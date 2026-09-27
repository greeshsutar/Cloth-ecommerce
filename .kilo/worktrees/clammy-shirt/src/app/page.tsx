'use client';

import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { DressShowcase } from '@/components/sections/DressShowcase';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { ShopByOccasion } from '@/components/sections/ShopByOccasion';
import { FabricAndCraft } from '@/components/sections/FabricAndCraft';
import { LookbookSection } from '@/components/sections/LookbookSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { InstagramStrip } from '@/components/sections/InstagramStrip';
import { NewsletterFooter } from '@/components/sections/NewsletterFooter';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-ivory text-espresso selection:bg-gold selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Section 1: Hero (h-screen pinned with scrub parallax) */}
      <HeroSection />

      {/* 3. Section 2: Dress Showcase (pinned scroll carousel with cross-swaps) */}
      <DressShowcase />

      {/* 4. Section 3: New Arrivals (Blush grid with dual-image crossfade & silk reveals) */}
      <NewArrivals />

      {/* 5. Section 4: Shop by Occasion (Bento grid layout with slide-in explore pills) */}
      <ShopByOccasion />

      {/* 6. Section 5: Fabric & Craft (Split parallax with macro visual & animated counters) */}
      <FabricAndCraft />

      {/* 7. Section 6: Lookbook SS '26 (Pinned horizontal scroll with differential depth) */}
      <LookbookSection />

      {/* 8. Section 7: Testimonials ("Loved by Every Silhouette" offset review cards) */}
      <TestimonialsSection />

      {/* 9. Section 8: Instagram Strip (Infinite marquee with center follow pill) */}
      <InstagramStrip />

      {/* 10. Section 9: Newsletter & Footer (Floating card, giant watermark & client care) */}
      <NewsletterFooter />
    </main>
  );
}
