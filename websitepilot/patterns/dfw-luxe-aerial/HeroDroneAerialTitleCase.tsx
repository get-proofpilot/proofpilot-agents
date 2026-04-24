/**
 * HeroDroneAerialTitleCase
 *
 * Full-bleed drone-aerial hero with title-case Bebas Neue headline and a
 * single color-painted accent noun. The Be The Anomaly / Anomaly Pool
 * signature move. No offset card, no editorial sidebar — the photo is the hero.
 *
 * WHEN TO USE:
 * - Brand ships real drone aerials (pool builders, outdoor living, landscape, roofers-from-the-air).
 * - You want the BtA tradesman-confident tone (NOT hospitality soft, NOT editorial).
 * - Copy is concise and benefits from one emphasized noun.
 *
 * WHEN NOT TO USE:
 * - No aerial photography available — use an editorial split hero instead.
 * - Brand voice is serif / luxury / understated — the Bebas + pool-blue combo reads loud.
 * - More than ~12 words of H1 — the display type at 80px runs out of room.
 *
 * Tokens required: --color-accent, --color-navy (or Tailwind tokens "accent" and "navy").
 * Fonts required: Bebas Neue (display), Work Sans (body).
 */
import type { ReactNode } from 'react';

type Props = {
  imageUrl: string;
  imageAlt?: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTrail?: string;
  subhead?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Render a GoogleStarPillWithAvatars or any trust element below CTAs. */
  trustSlot?: ReactNode;
  /** Optional video URL — if provided, renders a looping muted background video instead of <img>. */
  videoUrl?: string;
};

export default function HeroDroneAerialTitleCase({
  imageUrl,
  imageAlt = 'Drone aerial',
  headlineLead,
  headlineAccent,
  headlineTrail = '',
  subhead,
  primaryCtaLabel = 'Get a Free Quote',
  primaryCtaHref = '#quote',
  secondaryCtaLabel,
  secondaryCtaHref = '#',
  trustSlot,
  videoUrl,
}: Props) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--color-navy, #121A1E)', minHeight: 'clamp(640px, 90vh, 820px)' }}
    >
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={imageUrl}
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
        )}
        {/* 138deg navy → transparent overlay (Anomaly Pool exact formula) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(138deg, var(--color-navy, #121A1E) 0%, rgba(18,26,30,0) 28%)',
          }}
        />
        {/* Bottom fade for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(18,26,30,0) 55%, rgba(18,26,30,0.8) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pt-20 md:pt-28 pb-16">
        <div className="max-w-3xl">
          <h1
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.98,
              textTransform: 'none',
            }}
          >
            {headlineLead}{' '}
            <span style={{ color: 'var(--color-accent, #4CA8DE)' }}>{headlineAccent}</span>
            {headlineTrail ? ' ' + headlineTrail : ''}
          </h1>

          {subhead && (
            <p
              className="mt-6 max-w-xl text-white/85"
              style={{ fontFamily: "'Work Sans', system-ui, sans-serif", fontSize: 17, lineHeight: 1.55 }}
            >
              {subhead}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={primaryCtaHref} className="hero-btn hero-btn-primary">
              {primaryCtaLabel}
            </a>
            {secondaryCtaLabel && (
              <a href={secondaryCtaHref} className="hero-btn hero-btn-ghost">
                {secondaryCtaLabel}
              </a>
            )}
          </div>

          {trustSlot && <div className="mt-10">{trustSlot}</div>}
        </div>
      </div>

      <style>{`
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Work Sans', system-ui, sans-serif;
          font-weight: 700;
          font-size: 16px;
          border-radius: 8px;
          padding: 12px 24px;
          border: 1px solid var(--color-navy, #121A1E);
          transition: transform 120ms ease, box-shadow 120ms ease;
          text-decoration: none;
        }
        .hero-btn-primary {
          background: var(--color-accent, #4CA8DE);
          color: #fff;
          box-shadow: 0 5px 0 0 #fff;
        }
        .hero-btn-primary:hover { transform: translateY(2px); box-shadow: 0 3px 0 0 #fff; }
        .hero-btn-ghost {
          background: #fff;
          color: var(--color-accent, #4CA8DE);
          box-shadow: 0 5px 0 0 #fff;
        }
        .hero-btn-ghost:hover { transform: translateY(2px); box-shadow: 0 3px 0 0 #fff; }
      `}</style>
    </section>
  );
}
