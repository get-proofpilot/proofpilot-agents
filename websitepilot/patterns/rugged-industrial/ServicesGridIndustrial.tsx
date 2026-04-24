/**
 * ServicesGridIndustrial
 *
 * Dark-ink service grid with a hex + diagonal-slash texture and 3-up cards.
 * Each card gets a square concrete icon tile, ALL-CAPS blue H3, and a
 * "Learn More" arrow link. Tagg's spine-of-the-page move.
 *
 * WHEN TO USE:
 * - Any trade with 6–9 service verticals where each deserves its own page.
 * - You need the dark-ink "wedge" to break up a long stack of white sections.
 *
 * WHEN NOT TO USE:
 * - Fewer than 4 services — the grid looks sparse.
 * - Photography-heavy brands where the card should show a real photo: use a
 *   photo-grid pattern instead.
 *
 * Props:
 * - `items`: service array. Each card can pass a custom icon ReactNode.
 *
 * Tokens: --color-ink, --color-ink-deep, --color-concrete.
 */
import type { ReactNode } from 'react';

export type ServiceItem = {
  title: string;
  body: string;
  href?: string;
  icon?: ReactNode;
};

type Props = {
  eyebrow?: string;
  heading: string;
  subhead?: string;
  items: ServiceItem[];
};

function DefaultIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 8h32v26H8z" fill="none" stroke="var(--color-concrete, #0071BA)" strokeWidth="2.5" />
      <path d="M14 14h20v14H14z" fill="var(--color-concrete, #0071BA)" opacity="0.25" />
      <rect x="18" y="38" width="12" height="4" fill="var(--color-concrete, #0071BA)" />
    </svg>
  );
}

const TEXTURE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='64' viewBox='0 0 56 64'><path d='M28 2 L54 17 L54 47 L28 62 L2 47 L2 17 Z' fill='none' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1'/></svg>\")," +
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g stroke='%230071BA' stroke-width='1' stroke-opacity='0.08'><line x1='-20' y1='100' x2='100' y2='-20'/><line x1='60' y1='200' x2='200' y2='60'/></g></svg>\")";

export default function ServicesGridIndustrial({ eyebrow, heading, subhead, items }: Props) {
  return (
    <section
      className="relative w-full px-4 md:px-8 lg:px-14 py-16 md:py-24 text-white"
      style={{
        backgroundColor: 'var(--color-ink, #151C24)',
        backgroundImage: TEXTURE,
        backgroundSize: '56px 64px, 180px 180px',
      }}
    >
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          {eyebrow && (
            <div
              className="mb-3"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                color: 'var(--color-concrete, #0071BA)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                fontSize: 13,
              }}
            >
              {eyebrow}
            </div>
          )}
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4.4rem)',
              lineHeight: 1.02,
              textTransform: 'uppercase',
              color: '#fff',
              letterSpacing: '-0.01em',
            }}
          >
            {heading}
          </h2>
          {subhead && (
            <p
              className="max-w-2xl mx-auto mt-4 text-white/75"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 15 }}
            >
              {subhead}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((s) => (
            <article
              key={s.title}
              className="group rounded-[4px] p-6 md:p-7 border transition-colors"
              style={{ backgroundColor: 'var(--color-ink-deep, #0B1017)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="mb-5 w-14 h-14 rounded-[4px] grid place-items-center"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                {s.icon ?? <DefaultIcon />}
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                  lineHeight: 1.25,
                  textTransform: 'uppercase',
                  color: 'var(--color-concrete, #0071BA)',
                  letterSpacing: '-0.03em',
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {s.body}
              </p>
              <a
                href={s.href ?? '#'}
                className="inline-flex items-center gap-2 mt-5 group-hover:opacity-90"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  fontSize: 12,
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
