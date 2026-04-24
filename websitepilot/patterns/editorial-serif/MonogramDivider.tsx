/**
 * MonogramDivider — centered crown (or custom) glyph flanked by thin hairlines.
 *
 * WHEN TO USE
 *  - Between dense editorial sections (ethos ↔ quote ↔ reviews).
 *  - Above section headings that don't carry an eyebrow.
 *  - Inside long-form copy blocks (ethos, about) to give the reader a breath.
 *
 * WHEN NOT TO USE
 *  - Between tight transactional sections (stats ↔ services) — redundant.
 *  - On dark backgrounds without a recolor — hairlines disappear.
 *  - Decoratively, more than 3× per page.
 *
 * FITTING VERTICALS
 *  luxury design-build · museums · galleries · fine jewelry · private schools ·
 *  luxury hospitality · private clubs · boutique law · wealth advisory
 */
import React from "react";

export type BrandTokens = {
  accent?: string;
  ruleColor?: string;
};

export interface MonogramDividerProps {
  brand?: BrandTokens;
  glyph?: React.ReactNode;
  width?: number;
  ariaLabel?: string;
}

const DEFAULTS = {
  brand: { accent: "#42AC54", ruleColor: "#CFCDC6" },
  width: 80,
  ariaLabel: "Section divider",
};

const defaultGlyph = (
  <svg viewBox="0 0 64 42" style={{ width: 32, height: 20 }} aria-hidden="true">
    <path
      d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
      fill="currentColor"
    />
  </svg>
);

export default function MonogramDivider(props: MonogramDividerProps) {
  const {
    brand = DEFAULTS.brand,
    glyph = defaultGlyph,
    width = DEFAULTS.width,
    ariaLabel = DEFAULTS.ariaLabel,
  } = props;

  const accent = brand.accent ?? DEFAULTS.brand.accent;
  const ruleColor = brand.ruleColor ?? DEFAULTS.brand.ruleColor;

  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        color: accent,
      }}
    >
      <span
        aria-hidden
        style={{ flex: 1, maxWidth: width, height: 1, background: ruleColor }}
      />
      {glyph}
      <span
        aria-hidden
        style={{ flex: 1, maxWidth: width, height: 1, background: ruleColor }}
      />
    </div>
  );
}
