'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Ruler, Sparkles, MessageCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide, showToast } = useCart();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeGuideOpen) return null;

  const sizeChartInches = [
    { size: 'XS', uk: 'UK 6', us: 'US 2', eu: 'EU 34', bust: '32 - 33"', waist: '24 - 25"', hips: '34 - 35"', length: '58"' },
    { size: 'S', uk: 'UK 8', us: 'US 4', eu: 'EU 36', bust: '34 - 35"', waist: '26 - 27"', hips: '36 - 37"', length: '58.5"' },
    { size: 'M', uk: 'UK 10', us: 'US 6', eu: 'EU 38', bust: '36 - 37"', waist: '28 - 29"', hips: '38 - 39"', length: '59"' },
    { size: 'L', uk: 'UK 12', us: 'US 8', eu: 'EU 40', bust: '38 - 39.5"', waist: '30 - 31.5"', hips: '40 - 41.5"', length: '59.5"' },
    { size: 'XL', uk: 'UK 14', us: 'US 10', eu: 'EU 42', bust: '40 - 42"', waist: '32 - 34"', hips: '42 - 44"', length: '60"' },
    { size: 'XXL', uk: 'UK 16', us: 'US 12', eu: 'EU 44', bust: '43 - 45"', waist: '35 - 37"', hips: '45 - 47"', length: '60.5"' },
  ];

  const sizeChartCm = [
    { size: 'XS', uk: 'UK 6', us: 'US 2', eu: 'EU 34', bust: '81 - 84 cm', waist: '61 - 64 cm', hips: '86 - 89 cm', length: '147 cm' },
    { size: 'S', uk: 'UK 8', us: 'US 4', eu: 'EU 36', bust: '86 - 89 cm', waist: '66 - 69 cm', hips: '91 - 94 cm', length: '148 cm' },
    { size: 'M', uk: 'UK 10', us: 'US 6', eu: 'EU 38', bust: '91 - 94 cm', waist: '71 - 74 cm', hips: '96 - 99 cm', length: '150 cm' },
    { size: 'L', uk: 'UK 12', us: 'US 8', eu: 'EU 40', bust: '96 - 100 cm', waist: '76 - 80 cm', hips: '101 - 105 cm', length: '151 cm' },
    { size: 'XL', uk: 'UK 14', us: 'US 10', eu: 'EU 42', bust: '101 - 106 cm', waist: '81 - 86 cm', hips: '106 - 112 cm', length: '152 cm' },
    { size: 'XXL', uk: 'UK 16', us: 'US 12', eu: 'EU 44', bust: '109 - 114 cm', waist: '89 - 94 cm', hips: '114 - 119 cm', length: '154 cm' },
  ];

  const currentChart = unit === 'in' ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto">
      <div
        onClick={closeSizeGuide}
        className="fixed inset-0 bg-espresso/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="relative w-full max-w-3xl rounded-3xl bg-ivory text-espresso shadow-2xl border border-gold/30 p-6 sm:p-10 overflow-hidden animate-scaleUp z-10">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-espresso/10">
            <div>
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-medium mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ATELIER SIZING SYSTEM</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                Women&apos;s Haute Couture Size Guide
              </h3>
            </div>

            <button
              onClick={closeSizeGuide}
              className="w-10 h-10 rounded-full bg-white hover:bg-gold/20 flex items-center justify-center text-espresso transition-colors border border-espresso/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center justify-between my-6">
            <p className="text-xs text-espresso/70 font-sans">
              All garments are tailored true to luxury French &amp; British sizing.
            </p>

            <div className="flex items-center bg-espresso/10 p-1 rounded-full border border-gold/20">
              <button
                onClick={() => setUnit('in')}
                className={`px-4 py-1 text-xs uppercase tracking-wider rounded-full font-semibold transition-all ${
                  unit === 'in' ? 'bg-espresso text-ivory shadow' : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                Inches (&quot;)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-4 py-1 text-xs uppercase tracking-wider rounded-full font-semibold transition-all ${
                  unit === 'cm' ? 'bg-espresso text-ivory shadow' : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Measurement Table */}
          <div className="overflow-x-auto rounded-2xl border border-espresso/10 bg-white/70 shadow-sm mb-6">
            <table className="w-full text-left text-xs text-espresso font-sans">
              <thead className="bg-blush/60 text-espresso uppercase tracking-wider font-semibold border-b border-espresso/10">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-3">UK</th>
                  <th className="py-3 px-3">US</th>
                  <th className="py-3 px-3">EU</th>
                  <th className="py-3 px-4">Bust</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Hips</th>
                  <th className="py-3 px-4">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-espresso/5">
                {currentChart.map((row) => (
                  <tr key={row.size} className="hover:bg-gold/10 transition-colors">
                    <td className="py-3 px-4 font-bold text-espresso font-mono">{row.size}</td>
                    <td className="py-3 px-3 text-espresso/70">{row.uk}</td>
                    <td className="py-3 px-3 text-espresso/70">{row.us}</td>
                    <td className="py-3 px-3 text-espresso/70">{row.eu}</td>
                    <td className="py-3 px-4 font-medium text-espresso">{row.bust}</td>
                    <td className="py-3 px-4 font-medium text-espresso">{row.waist}</td>
                    <td className="py-3 px-4 font-medium text-espresso">{row.hips}</td>
                    <td className="py-3 px-4 text-gold-dark font-medium">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Guide & Bespoke Help */}
          <div className="p-4 rounded-2xl bg-blush/40 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-sm font-semibold text-espresso">
                Need Bespoke Custom Alterations or Sizing?
              </h4>
              <p className="text-xs text-espresso/70 font-sans mt-0.5">
                Complimentary personalized tailoring is included with all Bridal and Evening Gown orders.
              </p>
            </div>

            <button
              onClick={() => {
                closeSizeGuide();
                showToast('Connecting you with an Aurelle Fitting Master...');
              }}
              className="px-5 py-2.5 rounded-full bg-espresso hover:bg-gold hover:text-espresso text-ivory text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold" />
              <span>Request Master Tailor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
