import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F2',
          50: '#FDFBF9',
          100: '#FAF7F2',
          200: '#F4EFEA',
          300: '#EDE4DC',
          400: '#DECFC3',
        },
        blush: {
          DEFAULT: '#F3E6E0',
          50: '#FAF2EE',
          100: '#F6EAE4',
          200: '#F3E6E0',
          300: '#E7D1C7',
          400: '#DAB8A9',
        },
        espresso: {
          DEFAULT: '#1C1512',
          50: '#F4F2F1',
          100: '#E2DCDA',
          300: '#948781',
          500: '#4A3B34',
          700: '#2A1F1B',
          800: '#221915',
          900: '#1C1512',
          950: '#100B09',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#DFBF73',
          dark: '#A68234',
          hairline: 'rgba(201, 162, 75, 0.25)',
          glow: 'rgba(201, 162, 75, 0.4)',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-fraunces)', 'Fraunces', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'widest-2xl': '0.4em',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '2/3': '2 / 3',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
