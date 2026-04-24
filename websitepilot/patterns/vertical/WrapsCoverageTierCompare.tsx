/**
 * WrapsCoverageTierCompare — 3-tier coverage option comparison.
 *
 * Source: https://valkyriewraps.com (New Orleans)
 * Signature move: a Spot Graphics / Partial Wrap / Full Wrap tier row where
 * each tier is shown as a sample-vehicle photo with a title and a short
 * paragraph of "who should pick this." Reads like a product-tier block but
 * without fake pricing — the pitch is "here's what each one looks like."
 * Works for any vertical with a tiered service bundle (coverage, duration,
 * materials, package levels).
 *
 * WHEN TO USE:
 *  - Vehicle wraps / PPF / tint / window film
 *  - Installed-product trades with tier options (painted vs wrapped,
 *    partial vs full re-roof, epoxy vs polyurea, etc.)
 *  - Brands that want to pre-qualify budget tier before contact
 *
 * WHEN NOT TO USE:
 *  - Services with no tier differentiation
 *  - Brands that refuse to show multiple tiers (single-SKU positioning)
 *  - Emergency / repair verticals
 */
type Tier = {
  image: string;
  title: string;        // "Spot Graphics" / "Partial Wrap" / "Full Wrap"
  tagline: string;      // "Branding on a budget"
  body: string;
  bullets?: string[];
  popular?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  tiers?: Tier[];
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; accent?: string };
};

export default function WrapsCoverageTierCompare({
  eyebrow = "Coverage options",
  heading = "Three levels. Pick what fits your fleet and budget.",
  subhead = "From single-decal spot graphics to head-to-toe branded rigs — we build the right wrap for the job.",
  tiers = [
    {
      image: "/wraps/spot-graphics.jpg",
      title: "Spot Graphics",
      tagline: "Branding on a budget",
      body: "Vinyl custom-cut to any shape — perfect for logos, door decals, hood graphics.",
      bullets: ["Logo + door decals", "Hood or trunk graphic", "1-2 day install"],
      ctaLabel: "Start a Quote",
      ctaHref: "/quote?tier=spot",
    },
    {
      image: "/wraps/partial-wrap.jpg",
      title: "Partial Wrap",
      tagline: "Our most flexible option",
      body: "Customizable to budget. Covers hood, rear panel, or 60-80% of the vehicle with brand colors.",
      bullets: ["60-80% coverage", "Full branding impact", "3-5 day install"],
      popular: true,
      ctaLabel: "Start a Quote",
      ctaHref: "/quote?tier=partial",
    },
    {
      image: "/wraps/full-wrap.jpg",
      title: "Full Wrap",
      tagline: "Head-to-toe brand rig",
      body: "100% coverage in your brand's colors. Ideal for fleet uniformity or a bold single-vehicle statement.",
      bullets: ["100% coverage", "Fleet-uniform ready", "5-7 day install"],
      ctaLabel: "Start a Quote",
      ctaHref: "/quote?tier=full",
    },
  ],
  brand = { ink: "#0A1128", primary: "#0064C8", primaryInk: "#FFFFFF", surface: "#F3F5F9", accent: "#FFB703" },
}: Props) {
  const ink = brand.ink ?? "#0A1128";
  const primary = brand.primary ?? "#0064C8";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F3F5F9";
  const accent = brand.accent ?? "#FFB703";

  return (
    <section className="py-20 md:py-28" style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <p className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: primary }}>
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.1, letterSpacing: "-0.015em" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg opacity-80">{subhead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <article
              key={t.title}
              className="relative rounded-[6px] overflow-hidden border flex flex-col"
              style={{
                background: "#FFFFFF",
                borderColor: t.popular ? accent : "rgba(0,0,0,0.08)",
                boxShadow: t.popular ? `0 20px 40px ${accent}33` : "0 10px 25px rgba(0,0,0,0.05)",
                transform: t.popular ? "translateY(-6px)" : "none",
              }}
            >
              {t.popular && (
                <span
                  className="absolute top-4 right-4 z-10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase rounded-full"
                  style={{ background: accent, color: ink }}
                >
                  Most Popular
                </span>
              )}
              <div className="aspect-[16/10] bg-gray-200 overflow-hidden">
                <img src={t.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[12px] font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: primary }}>
                  {t.tagline}
                </p>
                <h3 className="text-[24px] font-bold mb-3">{t.title}</h3>
                <p className="text-[15px] opacity-80 leading-relaxed mb-5">{t.body}</p>
                {t.bullets && (
                  <ul className="space-y-1.5 mb-6 text-[14px]">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span style={{ color: primary }} aria-hidden>
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {t.ctaLabel && t.ctaHref && (
                  <a
                    href={t.ctaHref}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
                    style={{
                      background: t.popular ? primary : "transparent",
                      color: t.popular ? primaryInk : primary,
                      border: t.popular ? "none" : `2px solid ${primary}`,
                    }}
                  >
                    {t.ctaLabel} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
