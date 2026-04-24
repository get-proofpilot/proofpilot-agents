/**
 * HeroEditorialSerif — Kingswood Landscape signature hero.
 *
 * WHEN TO USE
 *  - Luxury design-build firms (landscape, custom home, estate remodel, millwork).
 *  - Dental / medical / cosmetic / legal practices where "editorial" is on-brand.
 *  - Any brand with commissioned architectural photography.
 *  - Funnels where the conversion is a scheduled call, not a submit form.
 *
 * WHEN NOT TO USE
 *  - Trades (plumbing, HVAC, roofing, pest) — use a contractor-heritage hero.
 *  - Consumer / playful brands — italic serif reads wrong.
 *  - Any brand without commissioned photography — stock imagery under italic
 *    serif collapses into wedding-invitation territory.
 *
 * FITTING VERTICALS
 *  landscape design-build · custom home builders · estate remodel · luxury dental ·
 *  cosmetic derm · aesthetic med-spa · boutique law · wealth advisory · private clubs ·
 *  private schools · museums · galleries · bespoke interiors · fine jewelry
 */
import React from "react";

export type BrandTokens = {
  accent?: string;
  ink?: string;
  cream?: string;
};

export type Cta = { label: string; href: string };

export interface HeroEditorialSerifProps {
  brand?: BrandTokens;
  eyebrow?: string;
  h1Italic?: string;
  subCopy?: string;
  primaryCta?: Cta;
  backgroundImageUrl?: string;
  monogramSvg?: React.ReactNode;
  navLabels?: string[];
  brandName?: string;
  brandTagline?: string;
}

const DEFAULTS = {
  brand: { accent: "#42AC54", ink: "#1F1E1A", cream: "#FFFCF4" },
  eyebrow: "Transform Your",
  h1Italic: "Outdoor Space",
  subCopy:
    "Design-build excellence spanning new construction home installs, estate remodels, landscape design, and fully integrated outdoor living.",
  primaryCta: { label: "Schedule Discovery Call", href: "#contact" },
  navLabels: ["Services", "Design & Build", "About", "Contact"],
  brandName: "BRAND NAME",
  brandTagline: "Luxury Landscape",
};

const defaultMonogram = (
  <svg viewBox="0 0 64 42" className="w-14 h-9" aria-hidden="true">
    <path
      d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
      fill="currentColor"
      opacity="0.95"
    />
  </svg>
);

export default function HeroEditorialSerif(props: HeroEditorialSerifProps) {
  const {
    brand = DEFAULTS.brand,
    eyebrow = DEFAULTS.eyebrow,
    h1Italic = DEFAULTS.h1Italic,
    subCopy = DEFAULTS.subCopy,
    primaryCta = DEFAULTS.primaryCta,
    backgroundImageUrl,
    monogramSvg = defaultMonogram,
    navLabels = DEFAULTS.navLabels,
    brandName = DEFAULTS.brandName,
    brandTagline = DEFAULTS.brandTagline,
  } = props;

  const accent = brand.accent ?? DEFAULTS.brand.accent;
  const ink = brand.ink ?? DEFAULTS.brand.ink;
  const cream = brand.cream ?? DEFAULTS.brand.cream;

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: ink }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : `linear-gradient(135deg, #2a2926 0%, #4a4740 45%, #6b6558 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,13,10,0.1) 0%, rgba(14,13,10,0.55) 100%)",
        }}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div
          className="flex items-center justify-between py-8 px-8"
          style={{ maxWidth: 1280, margin: "0 auto" }}
        >
          <div className="flex items-center gap-3" style={{ color: cream }}>
            {monogramSvg}
            <div>
              <div
                className="uppercase leading-none"
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  letterSpacing: "0.18em",
                  fontSize: 18,
                }}
              >
                {brandName}
              </div>
              <div
                className="mt-1 uppercase"
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontStyle: "italic",
                  letterSpacing: "0.28em",
                  fontSize: 10,
                  opacity: 0.7,
                }}
              >
                {brandTagline}
              </div>
            </div>
          </div>
          <nav
            className="hidden lg:flex items-center gap-10"
            style={{ color: cream, fontFamily: '"Fraunces", Georgia, serif' }}
          >
            {navLabels.map((n) => (
              <a key={n} href="#" className="text-base hover:opacity-70 transition">
                {n}
              </a>
            ))}
          </nav>
          <a
            href={primaryCta.href}
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              border: `1px solid ${cream}`,
              color: cream,
              borderRadius: 0,
            }}
          >
            {primaryCta.label}
          </a>
        </div>
      </header>

      {/* Composition */}
      <div className="relative z-10 h-screen flex flex-col justify-end pb-20 lg:pb-28">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-end px-8"
          style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}
        >
          <div>
            <h2
              className="uppercase"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: cream,
                letterSpacing: "0.06em",
                fontSize: "clamp(26px, 3vw, 36px)",
                lineHeight: 1.2,
                marginBottom: 8,
                fontWeight: 400,
              }}
            >
              {eyebrow}
            </h2>
            <h1
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontStyle: "italic",
                color: cream,
                fontSize: "clamp(54px, 7.5vw, 92px)",
                lineHeight: 1.05,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {h1Italic}
            </h1>
          </div>

          <div
            style={{
              background: "rgba(14,13,10,0.55)",
              backdropFilter: "blur(12px)",
              padding: "28px 32px",
              border: "1px solid rgba(255,252,244,0.1)",
              boxShadow: "0 28px 60px -20px rgba(0,0,0,0.45)",
            }}
          >
            <p
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: cream,
                fontSize: 17,
                lineHeight: 1.55,
                marginBottom: 24,
              }}
            >
              {subCopy}
            </p>
            <a
              href={primaryCta.href}
              className="w-full inline-flex items-center justify-center"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "16px 32px",
                borderRadius: 0,
                background: accent,
                color: cream,
                width: "100%",
              }}
            >
              {primaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
