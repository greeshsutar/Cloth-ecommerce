'use client';

import React from 'react';
import { SariCurtain } from '@/components/common/SariCurtain';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { InstagramStrip } from '@/components/sections/InstagramStrip';
import { SixMoodsArchive } from '@/components/sections/SixMoodsArchive';
import { CurvedProductRibbon } from '@/components/sections/CurvedProductRibbon';
import { DressShowcase } from '@/components/sections/DressShowcase';
import { BridalCollectionSection } from '@/components/sections/BridalCollectionSection';
import { OccasionEditsSection } from '@/components/sections/OccasionEditsSection';
import { WorthYourAttentionSection } from '@/components/sections/WorthYourAttentionSection';
import { FirstLightSection } from '@/components/sections/FirstLightSection';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { BestSellers } from '@/components/sections/BestSellers';
import { ShopByOccasion } from '@/components/sections/ShopByOccasion';
import { FabricAndCraft } from '@/components/sections/FabricAndCraft';
import { LatestTrendsSection } from '@/components/sections/LatestTrendsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { NewsletterFooter } from '@/components/sections/NewsletterFooter';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-ivory text-espresso selection:bg-gold selection:text-white">
      {/* 0. Hero Physical Sari Curtain Reveal */}
      <SariCurtain />

      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Hero Cinematic Scroll Film (240-frame sequence) */}
      <HeroSection />

      {/* 3. Luxury Infinite Marquee Strip */}
      <InstagramStrip />

      {/* 4. The Drift Archive: Six Moods (Cathedral Arch Interactive Cards) */}
      <SixMoodsArchive />

      {/* 5. "Woven to Be Remembered" Curved Editorial Ribbon */}
      <CurvedProductRibbon />

      {/* 6. New Arrivals (Moving product rail from Right to Left) */}
      <NewArrivals />

      {/* 7. Best Sellers (Moving product rail from Left to Right) */}
      <BestSellers />

      {/* 8. Featured Dress Showcase (pinned scroll carousel with cross-swaps) */}
      <DressShowcase />

      {/* 8.5 The Bridal Collection (Organic Wave Deep Burgundy Editorial Section) */}
      <BridalCollectionSection />

      {/* 8.6 EDITS FOR every occasion (Editorial Collection Discovery) */}
      <OccasionEditsSection />

      {/* 8.7 Worth your attention (Interactive Horizontal Expanding Editorial Gallery) */}
      <WorthYourAttentionSection />

      {/* 8.8 First Light (Cinematic Editorial Image Physical Expansion Campaign) */}
      <FirstLightSection />

      {/* 8. Shop by Occasion (Bento grid layout with slide-in explore pills) */}
      <ShopByOccasion />

      {/* 9. Fabric & Craft (Split parallax with macro visual & animated counters) */}
      <FabricAndCraft />

      {/* 9.5 Latest Trends (Scroll-Driven Editorial Card Physical Expansion Showcase) */}
      <LatestTrendsSection />

      {/* 11. Testimonials ("Loved by Every Silhouette" offset review cards) */}
      <TestimonialsSection />

      {/* 12. Newsletter & Footer (Floating card, giant watermark & client care) */}
      <NewsletterFooter />
    </main>
  );
}
