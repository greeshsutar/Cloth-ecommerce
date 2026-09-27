'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

export interface StackCard {
  id: number | string;
  image: string;
  category?: string;
  title?: string;
  description?: string;
  number?: string;
}

export interface ImageStackProps {
  cards: StackCard[];
  onActiveCardChange?: (activeCard: StackCard, index: number) => void;
  className?: string;
}

export const ImageStack: React.FC<ImageStackProps> = ({
  cards,
  onActiveCardChange,
  className = '',
}) => {
  const [stack, setStack] = useState<StackCard[]>(cards);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);
  const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setStack(cards);
  }, [cards]);

  const activeCard = stack[0];
  const nextCard = stack[1] || stack[0];

  const handleRotateToNext = () => {
    if (isAnimatingRef.current || isFlipping || stack.length <= 1) return;
    isAnimatingRef.current = true;
    setIsFlipping(true);

    // 750ms 3D flip animation sequence
    setTimeout(() => {
      setStack((prevStack) => {
        const newStack = [...prevStack.slice(1), prevStack[0]];
        if (onActiveCardChange && newStack[0]) {
          const origIdx = cards.findIndex((c) => c.id === newStack[0].id);
          onActiveCardChange(newStack[0], origIdx !== -1 ? origIdx : 0);
        }
        return newStack;
      });
      setIsFlipping(false);
      isAnimatingRef.current = false;
    }, 750);
  };

  const handleSwipeAway = (direction: 'left' | 'right') => {
    if (isAnimatingRef.current || isFlipping || stack.length <= 1) return;
    isAnimatingRef.current = true;

    setStack((prevStack) => {
      const newStack = [...prevStack.slice(1), prevStack[0]];
      if (onActiveCardChange && newStack[0]) {
        const origIdx = cards.findIndex((c) => c.id === newStack[0].id);
        onActiveCardChange(newStack[0], origIdx !== -1 ? origIdx : 0);
      }
      return newStack;
    });

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 350);
  };

  const handleDragStart = (_: unknown, info: PanInfo) => {
    dragStartPosRef.current = { x: info.point.x, y: info.point.y };
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const dragDistance = Math.hypot(
      info.point.x - dragStartPosRef.current.x,
      info.point.y - dragStartPosRef.current.y
    );
    const swipeThreshold = 50;

    if (dragDistance >= swipeThreshold || Math.abs(info.offset.x) >= swipeThreshold) {
      handleSwipeAway(info.offset.x > 0 ? 'right' : 'left');
    } else {
      // Short click/tap without dragging -> Trigger 3D FLIP!
      handleRotateToNext();
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Perspective Viewport */}
      <div
        className="relative w-[270px] h-[375px] sm:w-[320px] sm:h-[445px] lg:w-[350px] lg:h-[490px]"
        style={{ perspective: '1400px' }}
      >
        <AnimatePresence mode="popLayout">
          {stack.map((card, index) => {
            const isTop = index === 0;

            // Tight, refined stack offsets matching target design
            const offsetX = isTop ? 0 : -Math.min(index * 11, 40);
            const offsetY = isTop ? 0 : -Math.min(index * 7, 26);
            const rotateDeg = isTop ? 0 : -Math.min(index * 2.5, 9);
            const scaleVal = isTop ? 1 : Math.max(1 - index * 0.012, 0.95);
            const opacityVal = isTop ? 1 : Math.max(1 - index * 0.05, 0.78);
            const zIndexVal = stack.length - index;

            return (
              <motion.div
                key={card.id}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: zIndexVal,
                  transformStyle: 'preserve-3d',
                  touchAction: isTop ? 'pan-y' : 'auto',
                }}
                initial={false}
                animate={{
                  x: offsetX,
                  y: offsetY,
                  rotate: rotateDeg,
                  scale: scaleVal,
                  opacity: opacityVal,
                  rotateY: isTop && isFlipping ? 180 : 0,
                }}
                transition={{
                  rotateY: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
                  x: { type: 'spring', stiffness: 350, damping: 28 },
                  y: { type: 'spring', stiffness: 350, damping: 28 },
                  scale: { duration: 0.3 },
                  opacity: { duration: 0.3 },
                }}
                drag={isTop && !isFlipping ? true : false}
                dragConstraints={{ left: -140, right: 140, top: -80, bottom: 80 }}
                dragElastic={0.15}
                onDragStart={isTop ? handleDragStart : undefined}
                onDragEnd={isTop ? handleDragEnd : undefined}
                onClick={isTop && !isFlipping ? handleRotateToNext : undefined}
                whileHover={isTop && !isFlipping ? { scale: 1.015 } : undefined}
                whileTap={isTop && !isFlipping ? { scale: 1.02, cursor: 'grabbing' } : undefined}
                className={`top-0 left-0 rounded-[2px] overflow-hidden border border-white/80 bg-ivory-200 shadow-[0_20px_45px_rgba(0,0,0,0.12)] ${
                  isTop ? 'cursor-pointer' : 'pointer-events-none'
                }`}
              >
                {/* 3D Card Front Side */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image
                    src={card.image}
                    alt={card.title || 'Fashion Trend'}
                    fill
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 320px, 350px"
                    className="object-cover object-center filter contrast-[1.03]"
                    priority={isTop}
                    draggable={false}
                  />

                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

                  {/* Card Number Pill */}
                  {card.number && (
                    <div className="absolute top-3.5 left-3.5 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-gold/40 text-[9px] font-mono tracking-widest text-gold uppercase font-medium rounded-[1px]">
                      {card.number} · {card.category}
                    </div>
                  )}

                  {/* Card Title Overlay */}
                  {card.title && (
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gold-light block mb-0.5">
                        {card.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-normal leading-tight tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                  )}
                </div>

                {/* 3D Card Back Side (Flipped 180deg) */}
                <div
                  className="absolute inset-0 w-full h-full bg-ivory"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <Image
                    src={nextCard.image}
                    alt={nextCard.title || 'Next Trend'}
                    fill
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 320px, 350px"
                    className="object-cover object-center filter contrast-[1.03]"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />
                  {nextCard.number && (
                    <div className="absolute top-3.5 left-3.5 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-gold/40 text-[9px] font-mono tracking-widest text-gold uppercase font-medium rounded-[1px]">
                      {nextCard.number} · {nextCard.category}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
