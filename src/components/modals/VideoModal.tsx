'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { isVideoOpen, closeVideo } = useCart();
  const [isMuted, setIsMuted] = React.useState(true);

  if (!isVideoOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden">
      <div
        onClick={closeVideo}
        className="fixed inset-0 bg-espresso/90 backdrop-blur-xl transition-opacity animate-fadeIn"
      />

      <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-espresso shadow-2xl border border-gold/40 z-10 animate-scaleUp">
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso/80 text-gold text-[10px] uppercase tracking-[0.25em] backdrop-blur-md border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AURELLE · SS 26 RUNWAY EDITORIAL FILM</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-espresso/80 hover:bg-gold text-ivory hover:text-espresso flex items-center justify-center backdrop-blur-md border border-white/20 transition-all"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={closeVideo}
              className="w-10 h-10 rounded-full bg-espresso/80 hover:bg-gold text-ivory hover:text-espresso flex items-center justify-center backdrop-blur-md border border-white/20 transition-all"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-pink-silk-dress-41130-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Bottom Title Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-espresso via-espresso/60 to-transparent flex items-end justify-between text-ivory">
          <div>
            <h3 className="font-serif text-2xl lg:text-3xl font-medium">
              &ldquo;Dressed in Poetry&rdquo; — Paris Haute Couture
            </h3>
            <p className="text-xs text-ivory/70 font-sans mt-1">
              Directorial cut by Aurelle Atelier · Original Score &amp; Silk Choreography
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
