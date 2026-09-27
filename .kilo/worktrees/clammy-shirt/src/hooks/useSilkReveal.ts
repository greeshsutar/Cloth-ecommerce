'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SilkRevealOptions {
  trigger?: HTMLElement | null;
  start?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  scrub?: boolean | number;
}

export function useSilkReveal<T extends HTMLElement = HTMLDivElement>(
  options: SilkRevealOptions = {}
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll('.silk-item, .silk-line, .silk-image'), {
        opacity: 1,
        y: 0,
        skewY: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Silk Entrance (opacity: 0, y: 60, skewY: 4 -> 1, 0, 0)
      const silkItems = el.querySelectorAll('.silk-item');
      if (silkItems.length > 0) {
        gsap.fromTo(
          silkItems,
          {
            opacity: 0,
            y: 60,
            skewY: 4,
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: options.duration || 1.1,
            ease: 'power4.out',
            stagger: options.stagger ?? 0.08,
            delay: options.delay || 0,
            scrollTrigger: {
              trigger: options.trigger || el,
              start: options.start || 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Masked Line Reveal (y: 110% -> 0)
      const silkLines = el.querySelectorAll('.silk-line');
      if (silkLines.length > 0) {
        gsap.fromTo(
          silkLines,
          {
            y: '110%',
            opacity: 0.2,
          },
          {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: options.trigger || el,
              start: options.start || 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Ken-Burns Scroll Parallax (scale 1.15 -> 1.0)
      const silkImages = el.querySelectorAll('.silk-image');
      silkImages.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.silk-image-container') || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [options.trigger, options.start, options.stagger, options.delay, options.duration, options.scrub]);

  return containerRef;
}
