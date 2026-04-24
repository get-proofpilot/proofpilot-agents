/**
 * FooterLuxe — black-ground 4-column footer with italic-accent headings.
 *
 * Brand block on the left carries crown monogram, brand wordmark, italic
 * tagline, short blurb. 4 link columns (Disciplines / Firm / Areas / Studio),
 * italic accent-green headings. Bottom strip: copyright + social WORDMARKS
 * (no icons).
 *
 * WHEN TO USE
 *  - Any editorial-serif preset page.
 *  - Luxury service brands where social icons would read as cheap.
 *
 * WHEN NOT TO USE
 *  - Deep site maps (10+ columns) — use a hierarchical mega-footer instead.
 *  - Consumer / e-commerce where payment-method icons matter.
 *
 * FITTING VERTICALS
 *  luxury design-build · architects · boutique law · wealth advisory ·
 *  private schools · galleries · fine jewelry
 */
import React from "react";

export type BrandTokens = { accent?: string; ink?: string; cream?: string; black?: string };

export type FooterColumn = {
  heading: string;
  links: Array<{ label: string; href: string } | string>;
};

export interface FooterLuxeProps {
  brand?: BrandTokens;
  brandName?: string;
  brandTagline?: string;
  brandBlurb?: string;
  monogramSvg?: React.ReactNode;
  columns: FooterColumn[];
  socials?: Array<{ label: string; href: string }>;
  copyrightName?: string;
}

const DEFAULTS: Omit<Required<FooterLuxeProps>, "monogramSvg"> & { monogramSvg?: React.ReactNode } = {
  brand: { accent: "#42AC54", ink: "#1F1E1A", cream: "#FFFCF4", black: "#0E0D0A" },
  brandName: "BRAND NAME",
  brandTagline: "Luxury Landscape",
  brandBlurb: "Luxury landscape architecture and design-build across the region.",
  columns: [],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Houzz", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Pinterest", href: "#" },
  ],
  copyrightName: "Brand Name",
};

const defaultMonogram = (accent: string) => (
  <svg viewBox="0 0 64 42" style={{ width: 64, height: 40 }} aria-hidden="true">
    <path
      d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
      fill={accent}
    />
  </svg>
);

export default function FooterLuxe(props: FooterLuxeProps) {
  const {
    brand = DEFAULTS.brand,
    brandName = DEFAULTS.brandName,
    brandTagline = DEFAULTS.brandTagline,
    brandBlurb = DEFAULTS.brandBlurb,
    monogramSvg,
    columns,
    socials = DEFAULTS.socials,
    copyrightName = DEFAULTS.copyrightName,
  } = props;

  const accent = brand.accent ?? DEFAULTS.brand.accent!;
  const cream = brand.cream ?? DEFAULTS.brand.cream!;
  const black = brand.black ?? DEFAULTS.brand.black!;

  return (
    <footer
      style={{
        background: black,
        color: cream,
        padding: "80px 0 32px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
            marginBottom: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {monogramSvg ?? defaultMonogram(accent)}
            <div>
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: 18,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                {brandName}
              </div>
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontStyle: "italic",
                  color: "rgba(255,252,244,0.6)",
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {brandTagline}
              </div>
            </div>
            <p
              style={{
                color: "rgba(255,252,244,0.6)",
                fontSize: 14,
                lineHeight: 1.6,
                fontFamily: '"Fraunces", Georgia, serif',
              }}
            >
              {brandBlurb}
            </p>
          </div>

          {columns.map((c) => (
            <div key={c.heading}>
              <h4
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontStyle: "italic",
                  color: accent,
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                  fontWeight: 400,
                }}
              >
                {c.heading}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {c.links.map((l, i) => {
                  const label = typeof l === "string" ? l : l.label;
                  const href = typeof l === "string" ? "#" : l.href;
                  return (
                    <li key={i}>
                      <a
                        href={href}
                        style={{
                          color: "rgba(255,252,244,0.8)",
                          fontSize: 15,
                          fontFamily: '"Fraunces", Georgia, serif',
                          textDecoration: "none",
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,252,244,0.1)",
            paddingTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="md:flex-row"
        >
          <div
            style={{
              color: "rgba(255,252,244,0.5)",
              fontSize: 12,
              fontFamily: '"Fraunces", Georgia, serif',
              fontStyle: "italic",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              color: "rgba(255,252,244,0.6)",
              fontSize: 12,
              fontFamily: '"Fraunces", Georgia, serif',
              fontStyle: "italic",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {socials.map((s) => (
              <a key={s.label} href={s.href} style={{ color: "inherit", textDecoration: "none" }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
