/**
 * GalleryCommissioned — editorial portfolio grid.
 *
 * Cards are photo-only (no card bg, no card shadow). Title + arrow-badge
 * overlay the lower portion of each photo. On hover, the photo zooms subtly.
 *
 * WHEN TO USE
 *  - Portfolio / selected-work / collection sections.
 *  - Any section where commissioned photography is the product.
 *
 * WHEN NOT TO USE
 *  - Stock imagery — the treatment demands shot-for-client photography.
 *  - Product catalogs with spec details — use a proper PDP grid.
 *  - Sites where the gallery must be filterable — wrap this with a filter bar
 *    of your own.
 *
 * FITTING VERTICALS
 *  landscape design-build · custom home builders · interior designers ·
 *  architects · photographers · art galleries · luxury real estate
 */
import React from "react";

export type GalleryItem = {
  title: string;
  href: string;
  imageUrl?: string;
  ariaLabel?: string;
};

export type BrandTokens = { accent?: string; ink?: string; cream?: string };

export interface GalleryCommissionedProps {
  brand?: BrandTokens;
  eyebrow?: string;
  heading?: string;
  viewAllCta?: { label: string; href: string };
  items: GalleryItem[];
  columns?: 2 | 3;
}

const DEFAULTS = {
  brand: { accent: "#42AC54", ink: "#1F1E1A", cream: "#FFFCF4" },
  eyebrow: "Selected Work",
  heading: "The Collection",
  viewAllCta: { label: "View The Full Collection", href: "#" },
  columns: 3 as const,
};

export default function GalleryCommissioned(props: GalleryCommissionedProps) {
  const {
    brand = DEFAULTS.brand,
    eyebrow = DEFAULTS.eyebrow,
    heading = DEFAULTS.heading,
    viewAllCta = DEFAULTS.viewAllCta,
    items,
    columns = DEFAULTS.columns,
  } = props;

  const accent = brand.accent ?? DEFAULTS.brand.accent;
  const ink = brand.ink ?? DEFAULTS.brand.ink;
  const cream = brand.cream ?? DEFAULTS.brand.cream;

  const gridCols = columns === 2
    ? "repeat(auto-fit, minmax(320px, 1fr))"
    : "repeat(auto-fit, minmax(280px, 1fr))";

  return (
    <section style={{ padding: "120px 0", background: cream }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ gap: 24, marginBottom: 56 }}
        >
          <div style={{ maxWidth: 680 }}>
            <div
              className="uppercase"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontStyle: "italic",
                color: accent,
                fontSize: 14,
                letterSpacing: "0.2em",
                marginBottom: 12,
              }}
            >
              {eyebrow}
            </div>
            <h2
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: ink,
                fontSize: "clamp(34px, 4vw, 44px)",
                lineHeight: 1.1,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {heading}
            </h2>
          </div>
          <a
            href={viewAllCta.href}
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              border: `1px solid ${ink}`,
              color: ink,
              alignSelf: "flex-start",
              borderRadius: 0,
            }}
          >
            {viewAllCta.label}
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 24 }}>
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              className="group relative block overflow-hidden"
              style={{ aspectRatio: "4/5" }}
              aria-label={it.ariaLabel ?? it.title}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: it.imageUrl
                    ? `url(${it.imageUrl})`
                    : `linear-gradient(160deg, rgba(66,172,84,0.25), rgba(14,13,10,0.55))`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />
              <div
                className="absolute flex items-end justify-between"
                style={{ left: 24, right: 24, bottom: 24, gap: 16 }}
              >
                <h3
                  style={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    color: cream,
                    fontSize: 22,
                    lineHeight: 1.15,
                    fontWeight: 400,
                    maxWidth: 260,
                    margin: 0,
                  }}
                >
                  {it.title}
                </h3>
                <div
                  className="shrink-0 flex items-center justify-center group-hover:bg-[#FFFCF4]"
                  style={{
                    width: 44,
                    height: 44,
                    border: `1px solid ${cream}`,
                    color: cream,
                    fontSize: 18,
                    transition: "all 200ms ease",
                  }}
                >
                  ↗
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
