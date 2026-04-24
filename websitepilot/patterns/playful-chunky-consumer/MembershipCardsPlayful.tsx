import { type CSSProperties } from "react";
import { BrandTokens, defaultBrand } from "./types";
import ChunkyRoundedButton from "./ChunkyRoundedButton";

/**
 * MembershipCardsPlayful
 * ----------------------
 * A 2 or 3-card pricing / package / membership row, in the playful-chunky-consumer
 * signature: alternating dark-navy + white card fills (with the "featured" card
 * lifted by a candy-primary crown band). Uppercase card titles, chunky 5px-radius
 * CTAs on every card.
 *
 * WHEN TO USE
 *   - Holiday lighting seasonal packages (Basic / Premium / Luxe).
 *   - Pet grooming tiers (Wash / Full Groom / Spa).
 *   - Kids camp sessions (Half-day / Full-day / Overnight).
 *   - 2–4 packages total.
 *
 * WHEN NOT TO USE
 *   - 5+ packages → use a table instead; chunky cards get overwhelming.
 *   - Enterprise / SaaS pricing (this style reads consumer).
 *   - When a package needs >5 bullet items (use a long-form tier card instead).
 */
export type MembershipCardsPlayfulProps = {
  brand?: Partial<BrandTokens>;
  kicker?: string;
  headline?: string;
  tiers?: Array<{
    name: string;
    tagline?: string;
    priceLabel?: string;
    featureList: string[];
    cta: { label: string; href: string };
    featured?: boolean;
  }>;
};

export default function MembershipCardsPlayful({
  brand,
  kicker = "Pick a Package",
  headline = "Packages That Fit Your Home",
  tiers = [
    {
      name: "Classic",
      tagline: "The essentials, flawlessly installed.",
      priceLabel: "Starting at $599",
      featureList: ["Rooflines only", "Custom cut to home", "Free removal", "48-hour maintenance"],
      cta: { label: "Start With Classic", href: "#quote" },
    },
    {
      name: "Signature",
      tagline: "Our most-loved package.",
      priceLabel: "Starting at $1,199",
      featureList: ["Rooflines + trees", "Color-matched design", "Free removal + storage", "48-hour maintenance", "Design consultation"],
      cta: { label: "Go With Signature", href: "#quote" },
      featured: true,
    },
    {
      name: "Showcase",
      tagline: "Turn the block into an event.",
      priceLabel: "Starting at $2,499",
      featureList: ["Full-property lights", "Wreaths + bows", "Animated programming", "All Signature perks"],
      cta: { label: "Book the Showcase", href: "#quote" },
    },
  ],
}: MembershipCardsPlayfulProps) {
  const b = { ...defaultBrand, ...brand };
  return (
    <section style={{ background: b.cream, fontFamily: b.bodyFontFamily }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 24px 112px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: b.fontFamily,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: b.accent,
            }}
          >
            {kicker}
          </div>
          <h2
            style={{
              fontFamily: b.fontFamily,
              fontWeight: 900,
              fontSize: "clamp(32px, 4.2vw, 57px)",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
              color: b.dark,
              margin: "12px 0 0",
            }}
          >
            {headline}
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginTop: 48,
            alignItems: "stretch",
          }}
        >
          {tiers.map((t) => (
            <Tier key={t.name} tier={t} b={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tier({
  tier,
  b,
}: {
  tier: NonNullable<MembershipCardsPlayfulProps["tiers"]>[number];
  b: BrandTokens;
}) {
  const isDark = !!tier.featured;
  const ink = isDark ? b.onDark : b.ink ?? b.darker;
  const subInk = isDark ? b.onDarkMuted ?? "#CCD9E4" : b.inkMuted ?? "#3F444B";
  const bg = isDark ? b.dark : "#FFFFFF";
  const wrap: CSSProperties = {
    position: "relative",
    borderRadius: 8,
    background: bg,
    border: isDark ? `2px solid ${b.primary}` : `2px solid ${hexToRgba(b.dark, 0.12)}`,
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxShadow: isDark ? `0 18px 40px ${hexToRgba(b.dark, 0.25)}` : `0 10px 30px ${hexToRgba(b.dark, 0.08)}`,
  };
  return (
    <div style={wrap}>
      {tier.featured && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: 20,
            background: b.primary,
            color: b.primaryInk,
            fontFamily: b.fontFamily,
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "6px 12px",
            borderRadius: 4,
          }}
        >
          Most Loved
        </div>
      )}
      <div>
        <h3
          style={{
            fontFamily: b.fontFamily,
            fontWeight: 900,
            fontSize: 28,
            textTransform: "uppercase",
            letterSpacing: "-0.3px",
            color: ink,
            margin: 0,
          }}
        >
          {tier.name}
        </h3>
        {tier.tagline && <p style={{ color: subInk, marginTop: 6, fontSize: 15 }}>{tier.tagline}</p>}
      </div>
      {tier.priceLabel && (
        <div
          style={{
            fontFamily: b.fontFamily,
            fontWeight: 800,
            fontSize: 24,
            color: isDark ? b.primary : b.dark,
          }}
        >
          {tier.priceLabel}
        </div>
      )}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
        {tier.featureList.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: ink, fontSize: 15 }}>
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: 8,
                background: b.accent,
                marginTop: 7,
                flexShrink: 0,
              }}
            />
            {f}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "auto" }}>
        <ChunkyRoundedButton
          brand={b}
          variant={isDark ? "primary" : "primary"}
          size="md"
          href={tier.cta.href}
          fullWidth
        >
          {tier.cta.label}
        </ChunkyRoundedButton>
      </div>
    </div>
  );
}

function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const bl = n & 255;
  return `rgba(${r},${g},${bl},${a})`;
}
