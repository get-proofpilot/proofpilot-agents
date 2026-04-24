import { BrandTokens, defaultBrand } from "./types";

/**
 * CTAWithMascot
 * -------------
 * Dark full-bleed final drum-roll section. Mountain silhouette strip at
 * bottom, mascot silhouette peeks right, giant white uppercase headline,
 * single subhead, single primary CTA.
 *
 * WHEN TO USE
 *   - End-of-page close CTA on a mascot-led home-service homepage.
 *   - A mid-page emotional beat to break a long scroll.
 *
 * WHEN NOT TO USE
 *   - No mascot SVG available — fall back to a plain CTA band.
 *   - Corporate / editorial / luxury pages.
 */
export type CTAWithMascotProps = {
  brand?: Partial<BrandTokens>;
  headline?: string;
  subhead?: string;
  primaryCta?: { label: string; href: string };
  mascotSrc?: string;
  variant?: "dark" | "primary"; // primary = orange band ("100% satisfaction")
};

export default function CTAWithMascot({
  brand,
  headline = "READY FOR A LEGENDARY ELECTRICAL SERVICE?",
  subhead = "Get a fast quote in under 60 seconds. Licensed, bonded, insured.",
  primaryCta = { label: "GET A FAST QUOTE", href: "#contact" },
  mascotSrc = "/placeholder-mascot.svg",
  variant = "dark",
}: CTAWithMascotProps) {
  const b = { ...defaultBrand, ...brand };

  const isDark = variant === "dark";
  const bg = isDark ? b.darker : b.primary;
  const color = isDark ? b.onDark : b.primaryInk;
  const ctaBg = isDark ? b.primary : b.dark;
  const ctaInk = isDark ? b.primaryInk : b.onDark;

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: bg, color, fontFamily: b.fontFamily }}
    >
      {isDark && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            clipPath:
              "polygon(0 100%,10% 60%,22% 90%,35% 55%,48% 88%,60% 58%,72% 85%,85% 60%,100% 90%,100% 100%)",
            background: "linear-gradient(180deg,#170331 0%,#080115 100%)",
          }}
        />
      )}

      <img
        src={mascotSrc}
        alt=""
        aria-hidden
        className="absolute -right-6 bottom-0 h-[78%] opacity-80 pointer-events-none select-none"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center">
        <h2
          className="font-black uppercase mx-auto max-w-4xl"
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-0.5px",
          }}
        >
          {headline}
        </h2>
        <p className="mt-5 text-lg max-w-2xl mx-auto">{subhead}</p>
        <div className="mt-8">
          <a
            href={primaryCta.href}
            className="inline-flex items-center gap-3 font-bold uppercase"
            style={{
              background: ctaBg,
              color: ctaInk,
              padding: "18px 32px",
              borderRadius: 10,
              fontSize: 24,
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
