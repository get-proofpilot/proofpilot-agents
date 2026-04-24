/**
 * JewelToneCTABand
 *
 * Full-bleed accent-color band (pool blue by default) with a title-case
 * Bebas headline, one navy-painted accent noun, and two chunky CTAs.
 *
 * WHEN TO USE:
 * - As the final push right before the footer on any BtA-family site.
 * - When you need a color break after a long stretch of white/navy sections.
 *
 * WHEN NOT TO USE:
 * - Page already ends on a pool-blue section (InlineQuoteFormDark ends twilight, so this is fine).
 * - Brand palette has no clear jewel tone — swap the color via `bandColor` prop.
 */
import type { ReactNode } from 'react';

type Props = {
  headlineLead: string;
  headlineAccent: string;
  headlineTrail?: string;
  body?: string;
  primaryCta?: ReactNode;
  secondaryCta?: ReactNode;
  /** Band fill color — defaults to --color-accent. */
  bandColor?: string;
  /** Color of the painted-accent noun — defaults to --color-navy. */
  accentInkColor?: string;
};

export default function JewelToneCTABand({
  headlineLead,
  headlineAccent,
  headlineTrail = '',
  body,
  primaryCta,
  secondaryCta,
  bandColor = 'var(--color-accent, #4CA8DE)',
  accentInkColor = 'var(--color-navy, #121A1E)',
}: Props) {
  return (
    <section
      style={{
        background: bandColor,
        padding: 'clamp(56px, 7vw, 96px) clamp(16px, 4vw, 56px)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            lineHeight: 1.02,
            color: '#fff',
            textTransform: 'none',
            margin: 0,
          }}
        >
          {headlineLead}{' '}
          <span style={{ color: accentInkColor }}>{headlineAccent}</span>
          {headlineTrail ? ' ' + headlineTrail : ''}
        </h2>
        {body && (
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              color: 'rgba(255,255,255,0.9)',
              fontSize: 17,
              lineHeight: 1.55,
              marginTop: 20,
              maxWidth: 560,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {body}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {primaryCta}
            {secondaryCta}
          </div>
        )}
      </div>
    </section>
  );
}
