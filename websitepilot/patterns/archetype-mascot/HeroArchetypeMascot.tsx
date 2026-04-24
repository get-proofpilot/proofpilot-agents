import { type CSSProperties } from "react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * HeroArchetypeMascot
 * -------------------
 * A mascot-led dark-surface hero. Giga-uppercase 3-line word stack,
 * dusty mountain silhouette base, mascot peeks bottom-right, one primary CTA.
 *
 * WHEN TO USE
 *   - Home-service brands (electrical, plumbing, HVAC, pest, roofing, pool).
 *   - Audience = homeowners, not businesses.
 *   - Brand is bold, playful, mascot-forward.
 *
 * WHEN NOT TO USE
 *   - Corporate / editorial / luxury.
 *   - Brand has no mascot asset (use a photo hero instead).
 *   - Dense-copy hero (use an IntroSplit pattern with sidebar form).
 *
 * All styling is inlined via CSS variables from `brand`; no Tailwind required,
 * but Tailwind utility classes are preserved where they add ergonomics.
 */
export type HeroArchetypeMascotProps = {
  brand?: Partial<BrandTokens>;
  mascotSrc?: string;
  headlineLines?: [string, string, string];
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  eyebrow?: string;
};

export default function HeroArchetypeMascot({
  brand,
  mascotSrc = "/placeholder-mascot.svg",
  headlineLines = ["LEGENDARY", "ELECTRICAL", "SERVICES"],
  subheadline = "Empowering homeowners with expert electrical solutions — speed, safety, and smart technology.",
  primaryCta = { label: "GET A FAST QUOTE", href: "#contact" },
  eyebrow,
}: HeroArchetypeMascotProps) {
  const b = { ...defaultBrand, ...brand };

  const bg: CSSProperties = {
    background: `
      radial-gradient(ellipse 80% 50% at 50% 110%, ${hexToRgba(b.primary, 0.18)} 0%, transparent 60%),
      radial-gradient(ellipse at top, ${lighten(b.dark, 0.15)} 0%, ${b.dark} 45%, ${b.darker} 100%)
    `,
    fontFamily: b.fontFamily,
    color: b.onDark,
  };

  return (
    <section
      style={bg}
      className="relative overflow-hidden min-h-[640px] lg:min-h-[760px] flex items-center"
    >
      {/* Layered mountain silhouettes */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
        style={{
          clipPath:
            "polygon(0 100%,8% 60%,18% 85%,30% 40%,42% 75%,55% 35%,68% 72%,80% 48%,92% 80%,100% 55%,100% 100%)",
          background: `linear-gradient(180deg, ${darken(b.dark, 0.25)} 0%, ${darken(b.darker, 0.4)} 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[22%] pointer-events-none"
        style={{
          clipPath:
            "polygon(0 100%,10% 80%,22% 92%,35% 70%,48% 88%,60% 68%,72% 85%,85% 72%,100% 90%,100% 100%)",
          background: `linear-gradient(180deg, ${darken(b.darker, 0.3)} 0%, #000 100%)`,
        }}
      />

      {/* Mascot peek */}
      <img
        src={mascotSrc}
        alt=""
        aria-hidden
        className="absolute right-0 bottom-0 h-[70%] lg:h-[88%] pointer-events-none select-none"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-4xl">
          {eyebrow && (
            <p
              className="uppercase font-bold tracking-widest mb-6"
              style={{ color: b.primary, fontSize: 18 }}
            >
              {eyebrow}
            </p>
          )}

          <h1
            className="font-black uppercase"
            style={{
              fontSize: "clamp(56px, 9vw, 123px)",
              lineHeight: 0.9,
              letterSpacing: "-0.5px",
              color: b.onDark,
            }}
          >
            <span className="block">{headlineLines[0]}</span>
            <span className="block">{headlineLines[1]}</span>
            <span className="block">{headlineLines[2]}</span>
          </h1>

          <p
            className="mt-6 max-w-xl font-medium"
            style={{ color: b.onDarkMuted ?? "#ddd", fontSize: 18, lineHeight: 1.5 }}
          >
            {subheadline}
          </p>

          <a
            href={primaryCta.href}
            className="mt-8 inline-flex items-center gap-3 font-bold uppercase"
            style={{
              background: b.primary,
              color: b.primaryInk,
              padding: "18px 32px",
              borderRadius: 10,
              fontSize: 28,
            }}
          >
            {primaryCta.label}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------- tiny color helpers (avoid runtime deps) -------- */
function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
function lighten(hex: string, amt: number) { return mix(hex, "#ffffff", amt); }
function darken(hex: string, amt: number) { return mix(hex, "#000000", amt); }
function mix(a: string, b: string, t: number) {
  const pa = parseHex(a), pb = parseHex(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${m(pa[0], pb[0])},${m(pa[1], pb[1])},${m(pa[2], pb[2])})`;
}
function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
