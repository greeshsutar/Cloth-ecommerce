import type { Metadata } from 'next';
import { Playfair_Display, Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { QuickViewModal } from '@/components/modals/QuickViewModal';
import { SizeGuideModal } from '@/components/modals/SizeGuideModal';
import { VideoModal } from '@/components/modals/VideoModal';
import { SearchModal } from '@/components/modals/SearchModal';
import { ToastNotification } from '@/components/common/ToastNotification';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AURELLE — Haute Couture, Designer Gowns & Heirloom Silks',
  description:
    'Step into the realm of AURELLE. Ultra-luxury women’s evening gowns, draped silk cocktail midis, hand-woven Banarasi lehengas, and bespoke occasion wear.',
  keywords: [
    'luxury fashion',
    'designer dresses',
    'haute couture',
    'bridal lehengas',
    'silk gowns',
    'occasion wear',
    'Aurelle',
  ],
  openGraph: {
    title: 'AURELLE — Dressed in Poetry',
    description:
      'Ultra-luxury women’s designer gowns, silk cocktail dresses, and royal bridal lehengas.',
    url: 'https://aurelle.luxury',
    siteName: 'AURELLE Luxury Boutique',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Aurelle Haute Couture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${fraunces.variable} ${inter.variable}`}>
      <body className="bg-ivory text-espresso font-sans selection:bg-gold selection:text-ivory antialiased">
        <CartProvider>
          <LenisProvider>
            {children}
            <CartDrawer />
            <QuickViewModal />
            <SizeGuideModal />
            <VideoModal />
            <SearchModal />
            <ToastNotification />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
