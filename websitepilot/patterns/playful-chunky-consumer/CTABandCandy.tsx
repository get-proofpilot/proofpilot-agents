import { type CSSProperties } from "react";
import { BrandTokens, defaultBrand } from "./types";
import ChunkyRoundedButton from "./ChunkyRoundedButton";

/**
 * CTABandCandy
 * ------------
 * Full-bleed candy-colored (accent-red by default) CTA band sandwiched between
 * two twinkle-light dividers. This is the mid-page "come back to the point"
 * drum-roll on a playful-chunky-consumer site — short copy, fat button.
 *
 * WHEN TO USE
 *   - One-third of the way down the page, and again just above the footer.
 *   - Brand wants an attention-stop after a content block without pushing a form.
 *
 * WHEN NOT TO USE
 *   - Premium-editorial (too loud).
 *   - Rugged-industrial (use a steel-stamped band instead).
 *   - Inside the hero (the hero already carries the CTA).
 */
export type CTABandCandyProps = {
  brand?: Partial<BrandTokens>;
  kicker?: string;
  headline?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Override band fill — defaults to `brand.accent`. Passing `"primary"` uses `brand.primary`. */
  fill?: string | "accent" | "primary";
  /** Turn off the twinkle-light dividers above/below the band. */
  showSeams?: boolean;
};

export default function CTABandCandy({
  brand,
  kicker = "Free Consultation",
  headline = "Get Your Free Design Consultation!",
  body = "Reach out for a complimentary walkthrough. We'll show you what your property could look like.",
  primaryCta = { label: "Free Consultation", href: "#quote" },
  secondaryCta,
  fill = "accent",
  showSeams = true,
}: CTABandCandyProps) {
  const b = { ...defaultBrand, ...brand };
  const bandBg =
    fill === "accent" ? b.accent : fill === "primary" ? b.primary : fill;
  const onBand =
    fill === "primary" ? b.primaryInk : b.accentInk;

  return (
    <section style={{ position: "relative", fontFamily: b.bodyFontFamily }}>
      {showSeams && <div aria-hidden style={seamStyle(b, "top")} />}
      <div style={{ background: bandBg, color: onBand }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "56px 24px 64px",
            display: "grid",
            gap: 32,
            alignItems: "center",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: b.fontFamily,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {kicker}
            </div>
            <h2
              style={{
                fontFamily: b.fontFamily,
                fontWeight: 900,
                fontSize: "clamp(30px, 4vw, 57px)",
                lineHeight: 1.15,
                letterSpacing: "-0.4px",
                textTransform: "uppercase",
                color: onBand,
                margin: "8px 0 0",
              }}
            >
              {headline}
            </h2>
            {body && (
              <p style={{ color: onBand, marginTop: 12, fontSize: 17, lineHeight: 1.55, maxWidth: 640, opacity: 0.92 }}>
                {body}
              </p>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
            <ChunkyRoundedButton brand={b} variant="primary" size="xl" href={primaryCta.href}>
              {primaryCta.label}
            </ChunkyRoundedButton>
            {secondaryCta && (
              <ChunkyRoundedButton brand={b} variant="ghost-light" href={secondaryCta.href}>
                {secondaryCta.label}
              </ChunkyRoundedButton>
            )}
          </div>
        </div>
      </div>
      {showSeams && <div aria-hidden style={seamStyle(b, "bottom")} />}
    </section>
  );
}

function seamStyle(b: BrandTokens, pos: "top" | "bottom"): CSSProperties {
  return {
    height: 16,
    backgroundImage: `
      radial-gradient(circle at 10px 10px, ${b.primary} 0 3.5px, transparent 4px),
      radial-gradient(circle at 30px 12px, ${b.accent} 0 3.5px, transparent 4px),
      radial-gradient(circle at 50px 10px, ${b.primary} 0 3.5px, transparent 4px),
      radial-gradient(circle at 70px 12px, ${b.sky ?? b.dark} 0 3.5px, transparent 4px)
    `,
    backgroundSize: "80px 16px",
    backgroundRepeat: "repeat-x",
    [pos === "top" ? "borderBottom" : "borderTop"]: "none",
  } as CSSProperties;
}
