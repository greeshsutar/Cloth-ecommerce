'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, DressSize, ColorOption } from '@/types';

type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string }> = {
  USD: { rate: 1, symbol: '$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.79, symbol: '£' },
  INR: { rate: 83.5, symbol: '₹' },
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, selectedSize?: DressSize, selectedColor?: ColorOption, qty?: number) => void;
  removeItem: (productId: string, size: DressSize, colorName: string) => void;
  updateQuantity: (productId: string, size: DressSize, colorName: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  
  // Modals
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  isVideoOpen: boolean;
  openVideo: () => void;
  closeVideo: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  
  // Currency & Formatter
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInUSD: number) => string;

  // Toast
  toast: { message: string; visible: boolean } | null;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('aurelle_cart');
      if (savedCart) setItems(JSON.parse(savedCart));
      
      const savedWishlist = localStorage.getItem('aurelle_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurelle_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('aurelle_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addItem = (
    product: Product,
    selectedSize: DressSize = product.sizes[0] || 'S',
    selectedColor: ColorOption = product.colors[0] || { name: 'Default', hex: '#000000' },
    qty = 1
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      } else {
        return [...prev, { product, selectedSize, selectedColor, quantity: qty }];
      }
    });

    showToast(`Added ${product.name} (${selectedSize}) to Bag`);
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, size: DressSize, colorName: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor.name === colorName)
      )
    );
  };

  const updateQuantity = (productId: string, size: DressSize, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, colorName);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === size && item.selectedColor.name === colorName) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const wishlistCount = wishlist.length;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const formatPrice = (amountInUSD: number) => {
    const { rate, symbol } = CURRENCY_RATES[currency];
    const converted = Math.round(amountInUSD * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSizeGuideOpen,
        openSizeGuide,
        closeSizeGuide,
        isVideoOpen,
        openVideo,
        closeVideo,
        isSearchOpen,
        openSearch,
        closeSearch,
        currency,
        setCurrency,
        formatPrice,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
