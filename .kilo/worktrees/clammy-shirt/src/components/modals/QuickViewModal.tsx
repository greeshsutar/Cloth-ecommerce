'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { DressSize, ColorOption } from '@/types';
import { X, Heart, ShoppingBag, Ruler, Check, Star, Sparkles, ShieldCheck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addItem,
    isInWishlist,
    toggleWishlist,
    formatPrice,
    openSizeGuide,
  } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<DressSize>('S');
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setSelectedSize(quickViewProduct.sizes[0] || 'S');
      setSelectedColor(quickViewProduct.colors[0] || null);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    if (selectedColor) {
      addItem(product, selectedSize, selectedColor, 1);
    } else {
      addItem(product, selectedSize, product.colors[0], 1);
    }
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-espresso/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="relative w-full max-w-4xl rounded-3xl bg-ivory text-espresso shadow-2xl border border-gold/30 overflow-hidden animate-scaleUp z-10">
          
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-gold hover:text-white flex items-center justify-center text-espresso transition-all shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="p-6 bg-blush/30 flex flex-col justify-between">
              {/* Main Image */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-ivory-300 shadow-md">
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-all duration-500"
                />

                {/* Overline tag */}
                <div className="absolute top-4 left-4 bg-espresso/80 text-gold text-[9px] uppercase tracking-[0.25em] px-3 py-1 rounded-full backdrop-blur-md font-mono border border-gold/30">
                  {product.tag || product.category}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-gold scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`thumbnail ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh]">
              <div>
                {/* Overline & Category */}
                <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-semibold block mb-1">
                  {product.overline || product.category}
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl text-espresso font-medium">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-espresso/60 font-sans font-medium">
                    {product.rating} ({product.reviewsCount} verified reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 my-4">
                  <span className="font-serif text-2xl sm:text-3xl font-semibold text-gold">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-sm line-through text-espresso/40">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-mono tracking-wider bg-gold/15 text-gold px-2.5 py-0.5 rounded-full">
                    Includes Taxes &amp; Duties
                  </span>
                </div>

                {/* Fabric & Description */}
                <p className="text-xs sm:text-sm text-espresso/80 font-sans leading-relaxed mb-4">
                  {product.description}
                </p>

                <div className="p-3 rounded-xl bg-blush/40 border border-gold/15 text-xs space-y-1 mb-5">
                  <p className="font-semibold text-espresso">Fabric Composition:</p>
                  <p className="text-espresso/75">{product.fabric}</p>
                </div>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mb-5">
                    <span className="text-xs uppercase tracking-wider text-espresso/70 block mb-2 font-medium">
                      Color: {selectedColor?.name}
                    </span>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full p-0.5 border-2 transition-all ${
                            selectedColor?.name === color.name
                              ? 'border-gold scale-110 shadow-sm'
                              : 'border-transparent hover:scale-105'
                          }`}
                          title={color.name}
                        >
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          >
                            {selectedColor?.name === color.name && (
                              <Check className="w-3 h-3 text-white drop-shadow" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector + Size Chart link */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-2">
                    <span className="text-espresso/70 font-medium">Size:</span>
                    <button
                      onClick={openSizeGuide}
                      className="text-gold hover:text-gold-dark flex items-center gap-1 font-semibold lowercase first-letter:uppercase"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[42px] h-9 px-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                          selectedSize === sz
                            ? 'bg-espresso text-ivory border border-espresso shadow-md'
                            : 'bg-white text-espresso border border-espresso/15 hover:border-gold'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions: Add to Bag + Wishlist */}
              <div className="pt-4 border-t border-espresso/10 flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 btn-gold py-3.5 px-6 rounded-full text-xs font-bold tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    isWishlisted
                      ? 'bg-gold text-white border-gold'
                      : 'border-espresso/20 text-espresso hover:border-gold hover:text-gold bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? 'fill-current' : 'stroke-[1.5]'}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
