/**
 * EditorialQuoteBlock — oversized italic pull-quote on cream-warm ground.
 *
 * Reads like a magazine breather: ~100px opening quote glyph, 26–34px italic
 * serif body, monogram divider below, dash-prefixed attribution in tracked
 * caps. Sits between dense sections (ethos ↔ reviews) to slow the scroll.
 *
 * WHEN TO USE
 *  - Between two long-form copy sections that need visual separation.
 *  - Principal/founder quotes on about or philosophy pages.
 *  - Case study openers where the client voice should lead.
 *
 * WHEN NOT TO USE
 *  - As a review testimonial — use Reviews card treatment instead.
 *  - More than once per page — the drama decays.
 *
 * FITTING VERTICALS
 *  luxury design-build · architects · boutique law · wealth advisory ·
 *  galleries · museums · private schools
 */
import React from "react";

export type BrandTokens = {
  accent?: string;
  ink?: string;
  cream?: string;
  creamWarm?: string;
  inkMuted?: string;
};

export interface EditorialQuoteBlockProps {
  brand?: BrandTokens;
  quote?: string;
  attribution?: string;
}

const DEFAULTS = {
  brand: {
    accent: "#42AC54",
    ink: "#1F1E1A",
    cream: "#FFFCF4",
    creamWarm: "#F6F0E2",
    inkMuted: "#8C8B87",
  },
  quote:
    "Our clients don't just receive a finished space — they inherit a considered extension of their home, built to endure generations.",
  attribution: "— Principal & Founder",
};

export default function EditorialQuoteBlock(props: EditorialQuoteBlockProps) {
  const {
    brand = DEFAULTS.brand,
    quote = DEFAULTS.quote,
    attribution = DEFAULTS.attribution,
  } = props;

  const accent = brand.accent ?? DEFAULTS.brand.accent;
  const ink = brand.ink ?? DEFAULTS.brand.ink;
  const creamWarm = brand.creamWarm ?? DEFAULTS.brand.creamWarm;
  const inkMuted = brand.inkMuted ?? DEFAULTS.brand.inkMuted;

  return (
    <section style={{ padding: "72px 0", background: creamWarm }}>
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontStyle: "italic",
            color: accent,
            fontSize: 100,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          &ldquo;
        </div>
        <blockquote
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontStyle: "italic",
            color: ink,
            fontSize: "clamp(24px, 2.8vw, 34px)",
            lineHeight: 1.35,
            margin: "-8px 0 32px",
          }}
        >
          {quote}
        </blockquote>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 20,
            color: accent,
          }}
        >
          <span aria-hidden style={{ flex: 1, maxWidth: 60, height: 1, background: "#CFCDC6" }} />
          <svg viewBox="0 0 64 42" style={{ width: 24, height: 16 }} aria-hidden="true">
            <path
              d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
              fill={accent}
            />
          </svg>
          <span aria-hidden style={{ flex: 1, maxWidth: 60, height: 1, background: "#CFCDC6" }} />
        </div>

        <div
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            color: inkMuted,
            fontSize: 14,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {attribution}
        </div>
      </div>
    </section>
  );
}
