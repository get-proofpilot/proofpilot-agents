import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Landscape-vertical palette nudge:
      // accent shifted from pool-blue (#4CA8DE) to landscape-green (#2D6A4F)
      // mist shifted from pool-blue tint (#E9F5FB) to fresh-green tint (#E8F2EC)
      // navy retained — preserves the luxe-aerial structural DNA.
      colors: {
        accent: '#2D6A4F',
        'accent-ink': '#1F5238',
        navy: '#121A1E',
        mist: '#E8F2EC',
        twilight: '#0C0C0C',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.98', letterSpacing: '0' }],
        'section-xl': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.02' }],
        'card-lg': ['clamp(1.5rem, 2.5vw, 2.5rem)', { lineHeight: '1.05' }],
      },
      boxShadow: {
        chunk: '0 5px 0 0 #121A1E',
        'chunk-white': '0 5px 0 0 #FFFFFF',
        'chunk-accent': '0 5px 0 0 #2D6A4F',
        pill: '0 4px 12px rgba(18,26,30,0.08)',
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(138deg, #121A1E 0%, rgba(18,26,30,0) 28%)',
        'hero-bottom-fade': 'linear-gradient(180deg, rgba(18,26,30,0) 55%, rgba(18,26,30,0.8) 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
