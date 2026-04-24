/**
 * GalleryMasonryAerials
 *
 * 4-column grid with the first tile spanning 2x2 — a "hero-forward" masonry
 * pattern tuned for drone-aerial portfolios. Each tile gets the 138deg
 * navy-to-transparent overlay so captions stay legible.
 *
 * WHEN TO USE:
 * - Portfolio where drone aerials are the primary asset.
 * - 5–9 items — fewer and it reads sparse, more and it loses its punch.
 *
 * WHEN NOT TO USE:
 * - Interior-photo-heavy portfolios — a 3-col uniform grid reads better.
 * - Brands with mixed aspect ratios — the spanning tile expects a wide aerial.
 */

type Tile = {
  imageUrl?: string;
  label: string;
  /** Set `true` on exactly one tile to span 2x2 (the hero tile). */
  span2x2?: boolean;
};

type Props = {
  eyebrow?: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTrail?: string;
  tiles: Tile[];
  viewAllLabel?: string;
  viewAllHref?: string;
};

export default function GalleryMasonryAerials({
  eyebrow = 'Portfolio',
  headlineLead,
  headlineAccent,
  headlineTrail = '',
  tiles,
  viewAllLabel,
  viewAllHref = '#',
}: Props) {
  return (
    <section
      style={{
        background: '#fff',
        padding: 'clamp(64px, 8vw, 120px) clamp(16px, 4vw, 56px)',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <p
              style={{
                fontFamily: "'Work Sans', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: 3,
                color: 'var(--color-accent, #4CA8DE)',
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              {eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                lineHeight: 1.02,
                color: 'var(--color-navy, #121A1E)',
                textTransform: 'none',
                margin: 0,
              }}
            >
              {headlineLead}{' '}
              <span style={{ color: 'var(--color-accent, #4CA8DE)' }}>{headlineAccent}</span>
              {headlineTrail ? ' ' + headlineTrail : ''}
            </h2>
          </div>
          {viewAllLabel && (
            <a
              href={viewAllHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                background: '#fff',
                color: 'var(--color-accent, #4CA8DE)',
                border: '1px solid var(--color-navy, #121A1E)',
                borderRadius: 8,
                padding: '12px 24px',
                boxShadow: '0 5px 0 0 var(--color-navy, #121A1E)',
                textDecoration: 'none',
              }}
            >
              {viewAllLabel}
            </a>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '200px',
            gap: 14,
          }}
          className="gma-grid"
        >
          {tiles.map((t, i) => (
            <div
              key={i}
              style={{
                gridColumn: t.span2x2 ? 'span 2' : 'span 1',
                gridRow: t.span2x2 ? 'span 2' : 'span 1',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid rgba(18,26,30,0.08)',
                background:
                  'linear-gradient(135deg, #0C0C0C, #121A1E, #2F85B7)',
                position: 'relative',
                minHeight: 180,
              }}
            >
              {t.imageUrl && (
                <img
                  src={t.imageUrl}
                  alt={t.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(138deg, rgb(0,0,0), rgba(0,0,0,0) 28%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 16,
                  right: 16,
                  fontFamily: "'Work Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                }}
              >
                {t.label}
              </div>
              {!t.imageUrl && (
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 16,
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 12,
                  }}
                >
                  [AERIAL]
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .gma-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 160px !important; }
          .gma-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
