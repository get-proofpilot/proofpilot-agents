/**
 * TrustBarConcrete
 *
 * 4-up trust / USP grid with square concrete icon tiles and ALL-CAPS USP titles.
 * Instant rugged-trust scaffolding for directly below a hero or above the
 * first deep-dive section.
 *
 * WHEN TO USE:
 * - Directly below a rugged hero where credibility needs to anchor fast.
 * - Any trade where 3–4 differentiators (speed, warranty, crew, material)
 *   carry the pitch more than testimonials.
 *
 * WHEN NOT TO USE:
 * - You have only 1–2 differentiators — this grid looks sparse at less than 3.
 * - Your brand leans editorial/luxury — the icon-tile + uppercase combo reads
 *   industrial.
 *
 * Props:
 * - `items`: 3–6 USPs. Each needs a title, body, and icon slot.
 *
 * Tokens: --color-ink, --color-concrete, --color-steel, --color-text.
 */
import type { ReactNode } from 'react';

export type TrustItem = {
  title: string;
  body: string;
  icon?: ReactNode;
};

type Props = {
  heading?: string;
  items: TrustItem[];
};

function DefaultShield() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <path
        d="M22 4 L38 10 V22 C38 32 30 38 22 40 C14 38 6 32 6 22 V10 Z"
        fill="none"
        stroke="var(--color-concrete, #0071BA)"
        strokeWidth="2.5"
      />
      <path
        d="M14 22 l6 6 l10 -12"
        fill="none"
        stroke="var(--color-concrete, #0071BA)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TrustBarConcrete({ heading, items }: Props) {
  return (
    <section className="w-full bg-white px-4 md:px-8 lg:px-14 py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto">
        {heading && (
          <div className="text-center mb-10">
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 4.4rem)',
                lineHeight: 1.02,
                textTransform: 'uppercase',
                color: 'var(--color-ink, #151C24)',
                letterSpacing: '-0.01em',
              }}
            >
              {heading}
            </h2>
            <div className="mx-auto mt-4 w-16 h-1" style={{ background: 'var(--color-concrete, #0071BA)' }} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it) => (
            <div key={it.title} className="text-center md:text-left">
              <div
                className="inline-grid place-items-center w-20 h-20 rounded-[4px] mb-5"
                style={{ background: 'var(--color-steel, #F3F3F3)' }}
              >
                {it.icon ?? <DefaultShield />}
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  color: 'var(--color-ink, #151C24)',
                  letterSpacing: '-0.01em',
                }}
              >
                {it.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'var(--color-text, #333)',
                }}
              >
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
