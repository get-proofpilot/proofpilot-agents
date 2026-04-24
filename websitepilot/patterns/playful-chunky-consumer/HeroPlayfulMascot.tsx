import { type CSSProperties, type ReactNode } from "react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * HeroPlayfulMascot
 * -----------------
 * Deep-navy radial-gradient hero with a 2-column layout: a giga-uppercase 900-weight
 * headline on the left and a frictionless inline quote-card on the right. Includes
 * a twinkle-light seam at the bottom edge and an optional mascot peek.
 *
 * WHEN TO USE
 *   - Character-led consumer brand (holiday lighting, pets, kids, parties).
 *   - Homeowner / family audience.
 *   - Brand voice is playful, confident, friendly.
 *   - Conversion goal = a quick quote form commit directly from the hero.
 *
 * WHEN NOT TO USE
 *   - B2B / corporate / premium-editorial.
 *   - No mascot or character available AND no good hero photo.
 *   - Hero must carry a dense-copy above-the-fold (use IntroSplit instead).
 *
 * Brand-agnostic. All colors / fonts resolve from the `brand` prop.
 */
export type HeroPlayfulMascotProps = {
  brand?: Partial<BrandTokens>;
  mascotSrc?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  formTitle?: string;
  formKicker?: string;
  formFields?: Array<{ name: string; type: "text" | "email" | "tel"; placeholder: string }>;
  formSubmitLabel?: string;
  /** Optional inline node placed in the right rail instead of the quote form. */
  rightSlot?: ReactNode;
};

export default function HeroPlayfulMascot({
  brand,
  mascotSrc,
  headline = "Top Rated Holiday Lighting in the East Valley",
  subheadline = "Let's light up your holidays and make this season unforgettable.",
  primaryCta = { label: "Get a Fast Quote", href: "#quote" },
  secondaryCta,
  formTitle = "No Obligations — Just a Free Quote",
  formKicker = "Free Quote",
  formFields = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "tel", placeholder: "Phone" },
  ],
  formSubmitLabel = "Get a Fast Quote",
  rightSlot,
}: HeroPlayfulMascotProps) {
  const b = { ...defaultBrand, ...brand };
  const bg: CSSProperties = {
    background: `
      radial-gradient(ellipse 70% 45% at 50% 10%, ${hexToRgba(b.primary, 0.12)} 0%, transparent 60%),
      radial-gradient(ellipse at top, ${lighten(b.dark, 0.15)} 0%, ${b.dark} 55%, ${b.darker} 100%)
    `,
    color: b.onDark,
    fontFamily: b.bodyFontFamily,
    position: "relative",
    overflow: "hidden",
  };

  return (
    <section style={bg}>
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1320,
          padding: "80px 24px 112px",
          display: "grid",
          gap: 40,
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: b.fontFamily,
              fontWeight: 900,
              fontSize: "clamp(44px, 7vw, 100px)",
              lineHeight: 1.03,
              letterSpacing: "-0.3px",
              textTransform: "uppercase",
              color: b.onDark,
              margin: 0,
            }}
          >
            {headline}
          </h1>
          <p
            style={{
              fontFamily: b.fontFamily,
              fontWeight: 500,
              fontSize: "clamp(20px, 2vw, 31px)",
              letterSpacing: "-0.5px",
              color: b.primary,
              marginTop: 24,
              marginBottom: 0,
            }}
          >
            {subheadline}
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={primaryCta.href} style={chunkyBtnStyle(b, "primary", "xl")}>
              {primaryCta.label}
            </a>
            {secondaryCta && (
              <a href={secondaryCta.href} style={chunkyBtnStyle(b, "ghost-light")}>
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        {rightSlot ?? (
          <aside
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              padding: 24,
              alignSelf: "start",
            }}
          >
            <div
              style={{
                fontFamily: b.fontFamily,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: b.primary,
              }}
            >
              {formKicker}
            </div>
            <h3
              style={{
                fontFamily: b.fontFamily,
                fontWeight: 900,
                fontSize: 24,
                lineHeight: 1.15,
                textTransform: "uppercase",
                color: b.onDark,
                margin: "4px 0 20px",
              }}
            >
              {formTitle}
            </h3>
            <form style={{ display: "grid", gap: 12 }}>
              {formFields.map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: b.onDark,
                    padding: "12px 16px",
                    fontFamily: b.bodyFontFamily,
                    fontSize: 15,
                    boxSizing: "border-box",
                  }}
                />
              ))}
              <button type="button" style={{ ...chunkyBtnStyle(b, "primary", "xl"), width: "100%" }}>
                {formSubmitLabel}
              </button>
            </form>
          </aside>
        )}
      </div>

      {mascotSrc && (
        <img
          src={mascotSrc}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            right: -20,
            bottom: 24,
            height: "72%",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      )}

      <div aria-hidden style={twinkleSeamStyle(b, 16)} />
    </section>
  );
}

/* -------- shared chunky-button style & twinkle seam -------- */
export function chunkyBtnStyle(
  b: BrandTokens,
  variant: "primary" | "accent" | "ghost-light" = "primary",
  size: "md" | "xl" = "md",
): CSSProperties {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: b.fontFamily,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    borderRadius: 5,
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform .15s ease, filter .15s ease",
  };
  if (size === "xl") {
    base.fontSize = 22;
    base.padding = "16px 34px";
  } else {
    base.fontSize = 18;
    base.padding = "13px 28px";
  }
  if (variant === "primary") {
    return { ...base, background: b.primary, color: b.primaryInk, border: `2px solid ${b.primary}` };
  }
  if (variant === "accent") {
    return { ...base, background: "transparent", color: b.accent, border: `2px solid ${b.accent}` };
  }
  return { ...base, background: "transparent", color: b.onDark, border: `2px solid ${b.onDark}` };
}

export function twinkleSeamStyle(b: BrandTokens, height = 16): CSSProperties {
  return {
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    height,
    backgroundImage: `
      radial-gradient(circle at 10px ${height - 4}px, ${b.primary} 0 3.5px, transparent 4px),
      radial-gradient(circle at 30px ${height - 2}px, ${b.accent} 0 3.5px, transparent 4px),
      radial-gradient(circle at 50px ${height - 4}px, ${b.primary} 0 3.5px, transparent 4px),
      radial-gradient(circle at 70px ${height - 2}px, ${b.sky ?? b.dark} 0 3.5px, transparent 4px)
    `,
    backgroundSize: `80px ${height}px`,
    backgroundRepeat: "repeat-x",
    pointerEvents: "none",
  };
}

/* -------- color helpers -------- */
function hexToRgba(hex: string, a: number) {
  const [r, g, bb] = parseHex(hex);
  return `rgba(${r},${g},${bb},${a})`;
}
function lighten(hex: string, amt: number) {
  const [r, g, bb] = parseHex(hex);
  const m = (c: number) => Math.round(c + (255 - c) * amt);
  return `rgb(${m(r)},${m(g)},${m(bb)})`;
}
function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
