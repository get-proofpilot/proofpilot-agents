/**
 * HeroRuggedAllCaps
 *
 * Full-bleed photo hero with a 102-deg ink overlay, a short ALL-CAPS
 * Montserrat 900 headline (one color-painted noun), and a right-side inline
 * quick-quote card. This is the Tagg/rugged-industrial signature hero move.
 *
 * WHEN TO USE:
 * - Concrete, epoxy, pest, demolition, hauling, industrial services where the
 *   lead wants a number, not a story.
 * - Brand voice is direct, tradesman, "done-in-one-day" confident.
 * - The form above the fold is load-bearing — converting visitors is the job.
 *
 * WHEN NOT TO USE:
 * - Hospitality, spa, editorial, or luxury brands — Montserrat 900 UPPERCASE
 *   reads too loud and flat.
 * - You want a chunky offset-shadow CTA (that's `dfw-luxe-aerial` territory).
 * - Headline would run more than ~9 words at 64–72px desktop.
 *
 * Tokens: --color-ink, --color-ink-deep, --color-concrete, --color-text.
 * Fonts: Montserrat (display, 500–900), Roboto (body).
 */
import type { ReactNode } from 'react';

type Props = {
  imageUrl: string;
  imageAlt?: string;
  eyebrow?: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTrail?: string;
  subhead?: string;
  /** Replace the default quote-form card with any right-side ReactNode (video, calc, etc). */
  rightSlot?: ReactNode;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function HeroRuggedAllCaps({
  imageUrl,
  imageAlt = '',
  eyebrow,
  headlineLead,
  headlineAccent,
  headlineTrail = '',
  subhead,
  rightSlot,
  primaryCtaLabel = 'Get a Free Quote',
  primaryCtaHref = '#quote',
  secondaryCtaLabel,
  secondaryCtaHref = 'tel:',
}: Props) {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: 'var(--color-ink, #151C24)' }}>
      <div className="absolute inset-0">
        <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(102deg, rgba(11,16,23,0.92) 0%, rgba(21,28,36,0.8) 42%, rgba(21,28,36,0.35) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 lg:px-14 pt-12 md:pt-20 pb-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            {eyebrow && (
              <div className="inline-block px-4 py-2 mb-5" style={{ backgroundColor: 'var(--color-concrete, #0071BA)' }}>
                <span className="text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 'clamp(0.95rem, 1.2vw, 1.25rem)' }}>
                  {eyebrow}
                </span>
              </div>
            )}
            <h1
              className="text-white"
              style={{
                fontFamily: 'Montserrat, Impact, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
                lineHeight: 0.98,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
              }}
            >
              {headlineLead} <span style={{ color: 'var(--color-concrete, #0071BA)' }}>{headlineAccent}</span>
              {headlineTrail ? ' ' + headlineTrail : ''}
            </h1>
            {subhead && (
              <p
                className="mt-6 max-w-xl text-white/85"
                style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 17, lineHeight: 1.55 }}
              >
                {subhead}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={primaryCtaHref} className="rugged-btn rugged-btn-primary">{primaryCtaLabel}</a>
              {secondaryCtaLabel && (
                <a href={secondaryCtaHref} className="rugged-btn rugged-btn-ghost">{secondaryCtaLabel}</a>
              )}
            </div>
          </div>

          {rightSlot && <div className="lg:col-span-5">{rightSlot}</div>}
        </div>
      </div>

      <style>{`
        .rugged-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 15px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          border-radius: 4px;
          padding: 16px 28px;
          text-decoration: none;
          transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
        }
        .rugged-btn-primary {
          background: var(--color-concrete, #0071BA);
          color: #fff;
          border: 2px solid var(--color-concrete, #0071BA);
        }
        .rugged-btn-primary:hover {
          background: var(--color-concrete-deep, #005083);
          border-color: var(--color-concrete-deep, #005083);
        }
        .rugged-btn-ghost {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
        }
        .rugged-btn-ghost:hover { background: #fff; color: var(--color-ink, #151C24); }
      `}</style>
    </section>
  );
}
