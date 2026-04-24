/**
 * CTABandRugged
 *
 * Full-bleed concrete-blue CTA band with a diagonal-slash texture, a
 * left-aligned ALL-CAPS headline + subhead, and a flat ink CTA rectangle on
 * the right. The mid-page or penultimate conversion wedge.
 *
 * WHEN TO USE:
 * - Mid-scroll on a long page where you need to re-assert the offer between
 *   service cards and the comparison / process section.
 * - Immediately above the footer as the final before-exit CTA.
 *
 * WHEN NOT TO USE:
 * - Directly below a hero — the repetition of blue-on-ink will feel redundant.
 * - On a short page (< 3 sections) — it eats too much vertical rhythm.
 *
 * Props:
 * - `heading`: short, UPPERCASE, ≤ 10 words.
 * - `subhead`: optional tagline.
 * - `ctaLabel` / `ctaHref`: the ink-rectangle CTA.
 *
 * Tokens: --color-ink, --color-concrete.
 */
type Props = {
  heading: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const TEXTURE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g stroke='%23ffffff' stroke-width='1' stroke-opacity='0.1'><line x1='-10' y1='60' x2='60' y2='-10'/><line x1='30' y1='130' x2='130' y2='30'/></g></svg>\")";

export default function CTABandRugged({
  heading,
  subhead,
  ctaLabel = 'Get a Free Quote',
  ctaHref = '#quote',
}: Props) {
  return (
    <section
      className="w-full text-white"
      style={{
        backgroundColor: 'var(--color-concrete, #0071BA)',
        backgroundImage: TEXTURE,
        backgroundRepeat: 'repeat',
        backgroundSize: '120px 120px',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            {heading}
          </h2>
          {subhead && (
            <p
              className="mt-2 text-white/85"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 15 }}
            >
              {subhead}
            </p>
          )}
        </div>
        <a
          href={ctaHref}
          className="whitespace-nowrap"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            borderRadius: 4,
            padding: '16px 28px',
            background: 'var(--color-ink, #151C24)',
            color: '#fff',
            border: '2px solid var(--color-ink, #151C24)',
            textDecoration: 'none',
            transition: 'background 160ms ease, border-color 160ms ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = '#0B1017';
            el.style.borderColor = '#0B1017';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = 'var(--color-ink, #151C24)';
            el.style.borderColor = 'var(--color-ink, #151C24)';
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
