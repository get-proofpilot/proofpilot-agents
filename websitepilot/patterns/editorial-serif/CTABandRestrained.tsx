/**
 * CTABandRestrained — dark-ink conversion band with italic-serif H2.
 *
 * Split H2: one roman line above, one italic line below ("Let's begin the
 * conversation."). Two-button row (phone + primary green). Studio / Hours /
 * Inquiries row sits beneath a hairline divider. NO form.
 *
 * WHEN TO USE
 *  - Final CTA band for discovery-call-first sales motions.
 *  - Luxury / boutique / high-ticket service brands.
 *
 * WHEN NOT TO USE
 *  - Lead-gen forms — use a contractor-style inline form instead.
 *  - Consumer product sites — use an email signup or buy button.
 *
 * FITTING VERTICALS
 *  luxury design-build · custom home builders · boutique law · wealth advisory ·
 *  aesthetic med-spa · private schools · galleries · fine jewelry
 */
import React from "react";

export type BrandTokens = { accent?: string; ink?: string; cream?: string };

export interface CTABandRestrainedProps {
  brand?: BrandTokens;
  eyebrow?: string;
  headingRoman?: string;
  headingItalic?: string;
  subCopy?: string;
  phoneCta?: { label: string; href: string };
  primaryCta?: { label: string; href: string };
  details?: {
    studioLabel?: string;
    studio?: string[];
    hoursLabel?: string;
    hours?: string[];
    inquiriesLabel?: string;
    inquiries?: string[];
  };
}

const DEFAULTS: Required<
  Omit<CTABandRestrainedProps, "brand" | "details">
> & { brand: BrandTokens; details: CTABandRestrainedProps["details"] } = {
  brand: { accent: "#42AC54", ink: "#1F1E1A", cream: "#FFFCF4" },
  eyebrow: "Begin The Conversation",
  headingRoman: "Considering what's next for your property?",
  headingItalic: "Let's begin the conversation.",
  subCopy:
    "A discovery call is the first step. We'll listen, walk the site, and recommend an approach worthy of the investment.",
  phoneCta: { label: "Call (000) 000-0000", href: "tel:+10000000000" },
  primaryCta: { label: "Schedule Discovery Call", href: "#" },
  details: {
    studioLabel: "Studio",
    studio: ["0000 Example Street", "Suite 000, Dallas, TX 00000"],
    hoursLabel: "Hours",
    hours: ["Mon — Fri 9:00 AM to 5:00 PM", "Saturday by appointment"],
    inquiriesLabel: "Inquiries",
    inquiries: ["hello@example.com", "(000) 000-0000"],
  },
};

export default function CTABandRestrained(props: CTABandRestrainedProps) {
  const {
    brand = DEFAULTS.brand,
    eyebrow = DEFAULTS.eyebrow,
    headingRoman = DEFAULTS.headingRoman,
    headingItalic = DEFAULTS.headingItalic,
    subCopy = DEFAULTS.subCopy,
    phoneCta = DEFAULTS.phoneCta,
    primaryCta = DEFAULTS.primaryCta,
    details = DEFAULTS.details,
  } = props;

  const accent = brand.accent ?? DEFAULTS.brand.accent!;
  const ink = brand.ink ?? DEFAULTS.brand.ink!;
  const cream = brand.cream ?? DEFAULTS.brand.cream!;

  const section = (label?: string, lines?: string[]) =>
    lines && lines.length > 0 ? (
      <div>
        <div
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontStyle: "italic",
            color: accent,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
        <div style={{ color: "rgba(255,252,244,0.8)", fontSize: 14, lineHeight: 1.6 }}>
          {lines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <section style={{ padding: "120px 0", background: ink, color: cream }}>
      <div
        style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px", textAlign: "center" }}
      >
        <div
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontStyle: "italic",
            color: accent,
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            color: cream,
            fontSize: "clamp(34px, 4.5vw, 50px)",
            lineHeight: 1.15,
            fontWeight: 400,
            marginBottom: 24,
          }}
        >
          <span>{headingRoman}</span>
          <em style={{ display: "block", fontStyle: "italic" }}>{headingItalic}</em>
        </h2>
        <p
          style={{
            color: "rgba(255,252,244,0.75)",
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: 580,
            margin: "0 auto 40px",
            fontFamily: '"Fraunces", Georgia, serif',
          }}
        >
          {subCopy}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href={phoneCta.href}
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              border: `1px solid rgba(255,252,244,0.7)`,
              color: cream,
              borderRadius: 0,
            }}
          >
            {phoneCta.label}
          </a>
          <a
            href={primaryCta.href}
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: accent,
              color: cream,
              border: `1px solid ${accent}`,
              borderRadius: 0,
            }}
          >
            {primaryCta.label}
          </a>
        </div>

        {details && (
          <div
            style={{
              marginTop: 64,
              paddingTop: 40,
              borderTop: "1px solid rgba(255,252,244,0.15)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 32,
              textAlign: "left",
              fontFamily: '"Fraunces", Georgia, serif',
            }}
          >
            {section(details.studioLabel, details.studio)}
            {section(details.hoursLabel, details.hours)}
            {section(details.inquiriesLabel, details.inquiries)}
          </div>
        )}
      </div>
    </section>
  );
}
