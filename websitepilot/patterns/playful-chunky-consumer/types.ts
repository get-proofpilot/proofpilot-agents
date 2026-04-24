/**
 * Shared BrandTokens shape for the playful-chunky-consumer pattern lane.
 *
 * Every pattern in this folder accepts a single `brand?: Partial<BrandTokens>`
 * prop and merges over `defaultBrand` — so any pattern renders faithfully out
 * of the box, and overriding 2–3 tokens is enough to re-skin a whole section.
 */
export type BrandTokens = {
  name: string;
  /** Candy CTA color (yellow-gold on the reference). */
  primary: string;
  /** Ink on the primary CTA (near-black). */
  primaryInk: string;
  /** Second-stop accent (candy-red on the reference): phone buttons, mid-page band. */
  accent: string;
  /** Ink on the accent fill when the accent is used as a surface. */
  accentInk: string;
  /** Deep field color (navy on the reference). */
  dark: string;
  /** Deeper field variant (footers, deeper cards). */
  darker: string;
  /** Optional mid-stop blue used on dark-on-dark alt-bands. */
  sky?: string;
  /** Warm light alt-surface (cream). */
  cream?: string;
  /** Primary body-text color on dark surfaces. */
  onDark: string;
  /** Muted body text on dark surfaces. */
  onDarkMuted?: string;
  /** Default ink on light surfaces. */
  ink?: string;
  inkMuted?: string;
  /** Display font family — ONE family, wide weight range. */
  fontFamily?: string;
  /** Body font family. */
  bodyFontFamily?: string;
};

export const defaultBrand: BrandTokens = {
  name: "Santa Banana Lighting",
  primary:        "#FDD40C",
  primaryInk:     "#090F17",
  accent:         "#D11F2E",
  accentInk:      "#FFFFFF",
  dark:           "#063250",
  darker:         "#0F1A28",
  sky:            "#146094",
  cream:          "#F8F8F8",
  onDark:         "#FFFFFF",
  onDarkMuted:    "#CCD9E4",
  ink:            "#0F1A28",
  inkMuted:       "#3F444B",
  fontFamily:     "'Fira Sans', sans-serif",
  bodyFontFamily: "'Open Sans', sans-serif",
};
