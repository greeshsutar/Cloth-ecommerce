'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] transition-all duration-500 ease-out">
      <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-full bg-espresso text-ivory border border-gold/40 shadow-2xl backdrop-blur-md">
        <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        </div>
        <p className="text-xs font-sans tracking-wider uppercase font-medium">{toast.message}</p>
      </div>
    </div>
  );
};
