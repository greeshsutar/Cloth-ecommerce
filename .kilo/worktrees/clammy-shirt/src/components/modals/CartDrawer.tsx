'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Gift, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    cartSubtotal,
    cartCount,
    formatPrice,
    showToast,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const freeGiftThreshold = 1000;
  const progressToGift = Math.min(100, (cartSubtotal / freeGiftThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURELLE10') {
      setDiscountApplied(true);
      showToast('10% VIP discount applied!');
    } else {
      showToast('Invalid invitation code. Try AURELLE10');
    }
  };

  const finalTotal = discountApplied ? cartSubtotal * 0.9 : cartSubtotal;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      closeCart();
      showToast('Redirecting to Secured Razorpay Payment Gateway...');
    }, 1200);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-espresso/70 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-ivory text-espresso shadow-2xl flex flex-col justify-between border-l border-gold/30 animate-slideLeft">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-espresso/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-xl font-medium text-espresso">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-espresso text-ivory px-2 py-0.5 rounded-full font-mono font-medium">
                {cartCount}
              </span>
            </div>

            <button
              onClick={closeCart}
              className="w-9 h-9 rounded-full bg-white hover:bg-gold/20 flex items-center justify-center text-espresso transition-colors border border-espresso/10"
              aria-label="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Complimentary Silk Gift Tier Progress Bar */}
          <div className="px-6 py-3.5 bg-blush/60 border-b border-gold/20">
            <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
              <span className="flex items-center gap-1.5 text-espresso font-medium">
                <Gift className="w-3.5 h-3.5 text-gold" />
                {cartSubtotal >= freeGiftThreshold ? (
                  <span className="text-gold-dark font-semibold">
                    You unlocked Complimentary Silk Travel Pouch!
                  </span>
                ) : (
                  <span>
                    Add {formatPrice(freeGiftThreshold - cartSubtotal)} for a Silk Pouch
                  </span>
                )}
              </span>
              <span className="text-[10px] font-mono font-bold text-gold-dark">
                {Math.round(progressToGift)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-espresso/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-500 rounded-full"
                style={{ width: `${progressToGift}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-xl font-medium text-espresso mb-2">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-espresso/60 font-sans max-w-xs mb-6">
                  Explore our Spring &apos;26 Atelier collection and drape yourself in timeless poetry.
                </p>
                <button
                  onClick={closeCart}
                  className="btn-gold px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-white border border-espresso/10 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-26 aspect-[3/4] rounded-xl overflow-hidden bg-ivory-200 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-espresso line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedSize, item.selectedColor.name)
                          }
                          className="text-espresso/40 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Size & Color badges */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-ivory text-espresso text-[10px] uppercase font-mono font-medium border border-espresso/10">
                          Size: {item.selectedSize}
                        </span>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-ivory text-[10px] text-espresso font-sans border border-espresso/10">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-espresso/5">
                      <div className="flex items-center border border-espresso/15 rounded-full overflow-hidden bg-ivory">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 hover:bg-espresso/10 text-espresso transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-semibold text-espresso">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 hover:bg-espresso/10 text-espresso transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-espresso">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-espresso/10 bg-white/90 backdrop-blur-md space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="VIP Promo Code (e.g. AURELLE10)"
                  className="flex-1 px-3.5 py-2 text-xs uppercase tracking-wider rounded-xl bg-ivory border border-espresso/15 focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-gold hover:text-espresso transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Subtotal Breakup */}
              <div className="space-y-1.5 text-xs text-espresso/80 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-espresso">{formatPrice(cartSubtotal)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-gold-dark font-medium">
                    <span>VIP Privilege (10% Off)</span>
                    <span>-{formatPrice(cartSubtotal * 0.1)}</span>
                  </div>
                )}
                <div className="flex justify-between text-espresso/60">
                  <span>Worldwide Express Shipping</span>
                  <span className="text-gold uppercase tracking-wider font-semibold">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold text-espresso pt-2 border-t border-espresso/10">
                  <span>Total Amount</span>
                  <span className="text-gold text-lg">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Gold "Proceed to Checkout" Pill */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full btn-gold py-4 px-6 rounded-full text-xs font-bold tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <Sparkles className="w-4 h-4 animate-spin text-espresso" />
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-espresso/50 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>256-Bit SSL Encrypted Atelier Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
