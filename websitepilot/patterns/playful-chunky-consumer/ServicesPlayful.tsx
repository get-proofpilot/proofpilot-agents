import { type CSSProperties } from "react";
import { BrandTokens, defaultBrand } from "./types";
import ChunkyRoundedButton from "./ChunkyRoundedButton";

/**
 * ServicesPlayful
 * ---------------
 * Mid-blue alt-band with a 4-card grid. Each card is a dark-navy rectangle with
 * uppercase H4 title, body copy, and its own CTA. This is the Santa Banana
 * "Our Service is All Inclusive" block — the moment the brand says "here's what
 * you get" in 4 confident pillars.
 *
 * WHEN TO USE
 *   - 4 distinct services / offers / pillars.
 *   - Every card has its own CTA destination.
 *   - Brand is on the playful-chunky-consumer lane.
 *
 * WHEN NOT TO USE
 *   - You have 1–3 services (use a featured-service block instead).
 *   - You have 6+ services (promote to a dedicated services page).
 *   - Services each need a hero-image (use a photo-grid pattern instead).
 */
export type ServicesPlayfulProps = {
  brand?: Partial<BrandTokens>;
  kicker?: string;
  headline?: string;
  subheadline?: string;
  items?: Array<{ title: string; body: string; cta?: { label: string; href: string } }>;
};

export default function ServicesPlayful({
  brand,
  kicker = "What's Included",
  headline = "Our Service is All Inclusive",
  subheadline = "And covers everything that you need.",
  items = [
    { title: "Custom Made", body: "A design consultation tailored to your home. Every detail dialed in.", cta: { label: "Get a Free Consultation", href: "#quote" } },
    { title: "Perfect Install", body: "A pro crew, safety-first, no messy wires — ever.", cta: { label: "Get a Free Consultation", href: "#quote" } },
    { title: "Free Maintenance", body: "If anything goes out, we fix it in 48 hours — on our dime.", cta: { label: "Get a Free Consultation", href: "#quote" } },
    { title: "Removal + Storage", body: "We take them down, store them safe, bring them back fresh.", cta: { label: "Get a Free Consultation", href: "#quote" } },
  ],
}: ServicesPlayfulProps) {
  const b = { ...defaultBrand, ...brand };
  const sectionStyle: CSSProperties = {
    background: b.sky ?? b.dark,
    color: b.onDark,
    fontFamily: b.bodyFontFamily,
  };
  return (
    <section style={sectionStyle}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 24px 112px", textAlign: "center" }}>
        <div style={kickerStyle(b, b.primary)}>{kicker}</div>
        <h2 style={h2Style(b, b.onDark)}>{headline}</h2>
        <p style={{ fontFamily: b.fontFamily, fontWeight: 500, fontSize: "clamp(18px,2vw,26px)", color: b.onDarkMuted, marginTop: 12 }}>
          {subheadline}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginTop: 48,
            textAlign: "left",
          }}
        >
          {items.map((it) => (
            <div
              key={it.title}
              style={{
                borderRadius: 8,
                background: b.dark,
                border: "2px solid rgba(255,255,255,0.1)",
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: b.fontFamily,
                  fontWeight: 800,
                  fontSize: 23,
                  lineHeight: 1.2,
                  letterSpacing: "-0.2px",
                  textTransform: "uppercase",
                  color: b.onDark,
                  margin: 0,
                }}
              >
                {it.title}
              </h3>
              <p style={{ color: b.onDarkMuted, marginTop: 14, fontSize: 15, lineHeight: 1.55 }}>{it.body}</p>
              {it.cta && (
                <div style={{ marginTop: 20 }}>
                  <ChunkyRoundedButton brand={b} variant="primary" href={it.cta.href} fullWidth>
                    {it.cta.label}
                  </ChunkyRoundedButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function kickerStyle(b: BrandTokens, color: string): CSSProperties {
  return {
    fontFamily: b.fontFamily,
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color,
  };
}
function h2Style(b: BrandTokens, color: string): CSSProperties {
  return {
    fontFamily: b.fontFamily,
    fontWeight: 900,
    fontSize: "clamp(32px, 4.2vw, 57px)",
    lineHeight: 1.2,
    letterSpacing: "-0.5px",
    textTransform: "uppercase",
    color,
    margin: "12px auto 0",
    maxWidth: 900,
  };
}
