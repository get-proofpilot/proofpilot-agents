import { type CSSProperties } from "react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * MarqueeBar
 * ----------
 * The thin sliding candy-yellow strip of feature bullets that lives just below
 * the hero on Santa Banana. Infinite horizontal scroll, uppercase bullets
 * separated by small accent dots. Gives the "so much is included" impression
 * without yet another card grid.
 *
 * WHEN TO USE
 *   - Directly below the hero, OR directly above the footer.
 *   - 4–8 short feature / guarantee bullets (3 words max each).
 *   - Brand palette has a strong candy primary color to carry the band.
 *
 * WHEN NOT TO USE
 *   - More than ~8 bullets (it becomes noise).
 *   - Bullets longer than 4 words each (use a list grid instead).
 *   - Accessibility-critical flows without a `prefers-reduced-motion` fallback.
 */
export type MarqueeBarProps = {
  brand?: Partial<BrandTokens>;
  items?: string[];
  /** Animation duration in seconds. Default 28. */
  durationSec?: number;
  /** Override background — default uses brand.primary. */
  background?: string;
};

export default function MarqueeBar({
  brand,
  items = [
    "Custom Fitted Lights",
    "Picture Perfect Installs",
    "48-Hour Maintenance",
    "Fast & Safe Removal",
    "Free Storage Included",
    "100% Satisfaction",
  ],
  durationSec = 28,
  background,
}: MarqueeBarProps) {
  const b = { ...defaultBrand, ...brand };
  // Duplicate for seamless loop.
  const loop = [...items, ...items];
  const keyframeName = `marquee-pc-${Math.abs(hash(items.join("|")))}`;
  const trackStyle: CSSProperties = {
    display: "flex",
    gap: 56,
    whiteSpace: "nowrap",
    animation: `${keyframeName} ${durationSec}s linear infinite`,
  };
  return (
    <section
      style={{
        background: background ?? b.primary,
        color: b.primaryInk,
        overflow: "hidden",
      }}
    >
      {/* Inline keyframes so the pattern stays dependency-free. */}
      <style>{`@keyframes ${keyframeName}{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media (prefers-reduced-motion: reduce){.${keyframeName}-track{animation:none!important;transform:none!important}}`}</style>
      <div style={{ padding: "16px 0" }}>
        <div className={`${keyframeName}-track`} style={trackStyle}>
          {loop.map((it, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: b.fontFamily,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: b.primaryInk,
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  background: b.accent,
                }}
              />
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
