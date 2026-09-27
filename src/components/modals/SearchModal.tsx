'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { Search, X, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    closeSearch,
    openQuickView,
    formatPrice,
    addItem,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.occasion.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectProduct = (product: (typeof PRODUCTS)[0]) => {
    closeSearch();
    openQuickView(product);
  };

  const trendingTags = ['Velvet Column Gown', 'Banarasi Lehenga', 'Mulberry Silk', 'Chiffon Midi', 'Bridal'];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-espresso/80 backdrop-blur-xl transition-opacity animate-fadeIn"
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 lg:p-12 pt-20">
        <div className="relative w-full max-w-3xl rounded-3xl bg-ivory text-espresso shadow-2xl border border-gold/40 p-6 sm:p-8 z-10 animate-scaleUp">
          
          {/* Top Search Input Bar */}
          <div className="relative flex items-center pb-4 border-b border-espresso/15">
            <Search className="w-6 h-6 text-gold mr-3 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by silhouette, fabric (e.g. Mulberry Silk, Banarasi, Velvet)..."
              className="w-full bg-transparent text-base sm:text-lg text-espresso placeholder:text-espresso/40 focus:outline-none font-sans font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-espresso/40 hover:text-espresso p-1 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="w-8 h-8 rounded-full bg-white hover:bg-gold/20 flex items-center justify-center text-espresso transition-colors border border-espresso/10 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Trending Suggestions */}
          {!searchQuery && (
            <div className="py-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trending Atelier Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-1.5 rounded-full bg-white border border-espresso/10 hover:border-gold hover:bg-gold/10 text-xs font-medium text-espresso transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Quick Picks */}
              <h4 className="text-xs uppercase tracking-[0.25em] text-espresso/60 font-semibold mb-4">
                Curated Haute Couture Picks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRODUCTS.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-white border border-espresso/5 hover:border-gold/30 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="relative w-14 h-16 aspect-[3/4] rounded-xl overflow-hidden bg-ivory-300 flex-shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-serif font-medium text-espresso truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-espresso/60 truncate">{item.fabric}</p>
                      <p className="text-xs font-serif font-semibold text-gold mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {searchQuery && (
            <div className="py-6 max-h-[60vh] overflow-y-auto space-y-3">
              <p className="text-xs uppercase tracking-wider text-espresso/60 mb-2">
                Found {results.length} Haute Couture Creation{results.length === 1 ? '' : 's'}
              </p>

              {results.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-serif text-lg text-espresso mb-1">No matches found</p>
                  <p className="text-xs text-espresso/60">
                    Try searching for &quot;Silk&quot;, &quot;Gown&quot;, &quot;Lehenga&quot;, or &quot;Velvet&quot;.
                  </p>
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-espresso/10 hover:border-gold/40 hover:shadow-md transition-all group"
                  >
                    <div
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
                    >
                      <div className="relative w-16 h-20 aspect-[3/4] rounded-xl overflow-hidden bg-ivory-300 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-widest text-gold font-medium">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-espresso group-hover:text-gold transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-espresso/60 truncate">{product.fabric}</p>
                        <p className="font-serif text-sm font-semibold text-espresso mt-0.5">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addItem(product);
                        closeSearch();
                      }}
                      className="p-2.5 rounded-full bg-gold/15 hover:bg-gold text-gold hover:text-espresso transition-colors ml-3 flex-shrink-0"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
