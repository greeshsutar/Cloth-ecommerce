'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { useSilkReveal } from '@/hooks/useSilkReveal';

export const NewArrivals: React.FC = () => {
  const {
    addItem,
    isInWishlist,
    toggleWishlist,
    formatPrice,
    openQuickView,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const sectionRef = useSilkReveal<HTMLDivElement>({ stagger: 0.1 });

  const categories = ['All', 'Gowns', 'Dresses', 'Ethnic', 'Bridal'];

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="new-arrivals"
      ref={sectionRef}
      className="w-full py-28 lg:py-36 bg-blush relative overflow-hidden"
    >
      {/* Decorative hairline border at top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="silk-item flex items-center gap-2.5 text-gold text-xs uppercase tracking-[0.35em] font-medium font-sans mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JUST IN · SPRING 2026</span>
            </div>
            <h2 className="silk-item font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-espresso tracking-tight">
              New Arrivals
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="silk-item flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-espresso text-ivory shadow-md'
                    : 'bg-white/50 text-espresso/70 hover:bg-white hover:text-espresso'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Grid (2 on mobile) of 3:4 Portrait Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
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

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
  formatPrice: (val: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  formatPrice,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="silk-item group flex flex-col bg-white/40 hover:bg-white p-3.5 rounded-2xl border border-espresso/5 hover:border-gold/30 hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3:4 Portrait Image Container with Dual Image Crossfade */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-ivory-200 mb-4 silk-image-container">
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={`silk-image object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image (Hover Crossfade) */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate angle`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Small Gold "NEW" Pill */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-gold text-espresso font-semibold text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full shadow-sm">
            NEW
          </div>
        )}

        {/* Wishlist Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          aria-label="Toggle Wishlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
            isWishlisted
              ? 'bg-gold text-white shadow-md'
              : 'bg-white/80 text-espresso hover:text-gold hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-current text-white' : 'stroke-[1.5]'
            }`}
          />
        </button>

        {/* Quick View Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView();
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-espresso/85 text-ivory text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-espresso backdrop-blur-sm flex items-center gap-1.5 shadow-xl"
        >
          <Eye className="w-3 h-3" />
          <span>Quick View</span>
        </button>

        {/* Slide-Up "Add to Bag" Bar on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-espresso/90 to-espresso/60 backdrop-blur-md transition-all duration-400 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full py-2 px-3 rounded-full bg-gold hover:bg-gold-light text-espresso text-[11px] font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between px-1">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-medium">
            {product.overline || product.category}
          </span>
          <h3
            onClick={onQuickView}
            className="font-serif text-base lg:text-lg font-medium text-espresso hover:text-gold transition-colors line-clamp-1 cursor-pointer mt-0.5"
          >
            {product.name}
          </h3>
          <p className="text-xs text-espresso/60 font-sans line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-espresso/5">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base font-semibold text-espresso">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs line-through text-espresso/40">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-espresso/50 uppercase tracking-wider">
            {product.sizes.length} Sizes
          </span>
        </div>
      </div>
    </div>
  );
};
