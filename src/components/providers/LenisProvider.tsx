'use client';

import React, { useEffect, useRef } from 'react';

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Client-side only execution
    if (typeof window === 'undefined') return;

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let tickerCallback: (time: number) => void;
    let gsapInstance: any;

    Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([LenisModule, gsapModule, scrollTriggerModule]) => {
      const Lenis = LenisModule.default || LenisModule;
      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;

      // Disable browser automatic scroll restoration on page reload
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      const lenis = new Lenis({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
      });

      lenisRef.current = lenis;

      // Ensure Lenis starts at top
      lenis.scrollTo(0, { immediate: true });

      if (ScrollTrigger.clearScrollMemory) {
        ScrollTrigger.clearScrollMemory('manual');
      }

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger after layout settles
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    });

    return () => {
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
};
