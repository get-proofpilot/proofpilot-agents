import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Pest-variant palette nudge: ink shifts darker (predator/desert vibe vs.
      // industrial concrete), concrete blue retained for trust accents. Swap
      // `concrete` to a green or amber for friendlier residential pest brands.
      colors: {
        ink: '#0F1620',
        'ink-deep': '#070B11',
        concrete: '#0071BA',
        'concrete-deep': '#005083',
        steel: '#F3F3F3',
        'steel-ink': '#CCD3DA',
        paper: '#FFFFFF',
        'text-body': '#333333',
        caution: '#E0A419',
      },
      fontFamily: {
        display: ['Montserrat', 'Impact', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': ['clamp(1.875rem, 4.25vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.01em' }],
        'section-xl': ['clamp(1.625rem, 3.5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'section-lg': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.04' }],
        'card-lg': ['clamp(1.25rem, 2vw, 1.625rem)', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        eyebrow: ['clamp(0.95rem, 1.2vw, 1.25rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
      },
      backgroundImage: {
        // Diagonal-slash concrete motif — inline SVG, brand-agnostic replica of Tagg's PNG overlays.
        'diagonal-slash': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g stroke='%23ffffff' stroke-width='1' stroke-opacity='0.05'><line x1='-10' y1='60' x2='60' y2='-10'/><line x1='30' y1='130' x2='130' y2='30'/><line x1='-30' y1='120' x2='90' y2='0'/></g></svg>\")",
        'hex-grid':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='64' viewBox='0 0 56 64'><path d='M28 2 L54 17 L54 47 L28 62 L2 47 L2 17 Z' fill='none' stroke='%23ffffff' stroke-opacity='0.04' stroke-width='1'/></svg>\")",
        'hero-overlay':
          'linear-gradient(102deg, rgba(11,16,23,0.92) 0%, rgba(21,28,36,0.8) 42%, rgba(21,28,36,0.35) 100%)',
        'section-fade':
          'linear-gradient(180deg, rgba(21,28,36,0) 0%, rgba(21,28,36,0.9) 100%)',
      },
      boxShadow: {
        ribbon: '0 10px 30px rgba(0,80,131,0.25)',
        card: '0 2px 8px rgba(21,28,36,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
