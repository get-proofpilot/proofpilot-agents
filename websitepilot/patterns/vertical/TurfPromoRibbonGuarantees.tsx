/**
 * TurfPromoRibbonGuarantees — seasonal promo banner + triple guarantee icons.
 *
 * Source: https://biltrightturf.com
 * Signature move: a slim full-width promo ribbon at the very top of the page
 * ("20% Off + 0% Down | Offer Ends Sunday") directly above the hero, then
 * below the hero a 3-up guarantee row (25-Year Warranty / No Seams /
 * Fast Installation Time). Pair works together: the ribbon creates urgency,
 * the guarantee row justifies the commitment.
 *
 * WHEN TO USE:
 *  - Seasonal or always-on promo categories (turf, pool, windows, roofing,
 *    pressure wash, HVAC install, wraps)
 *  - Brands that run true guarantees (warranty, money-back, lifetime parts)
 *  - High-ticket decisions where the buyer needs both incentive + reassurance
 *
 * WHEN NOT TO USE:
 *  - Brands that never discount (the ribbon will feel fake)
 *  - Emergency services where promos cheapen the pitch
 *  - Brands without a real, writable guarantee
 */
type Guarantee = {
  icon?: string;
  title: string;
  body: string;
};

type Props = {
  ribbonText?: string;
  ribbonCta?: { label: string; href: string };
  guarantees?: Guarantee[];
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; accent?: string };
};

export default function TurfPromoRibbonGuarantees({
  ribbonText = "20% Off + 0% Down · Offer Ends Sunday",
  ribbonCta = { label: "Claim the Offer", href: "/estimate" },
  guarantees = [
    { icon: "🛡️", title: "Up to 25-Year Warranty", body: "Long-lasting beauty and peace of mind with our installation warranty." },
    { icon: "✨", title: "No Seams Guaranteed", body: "Flawless, natural-looking lawn with no visible artificial turf seams." },
    { icon: "⚡", title: "Fast Installation Time", body: "Go from dirt to turf in under two weeks from signing the project agreement." },
  ],
  brand = { ink: "#18261C", primary: "#5F9E47", primaryInk: "#FFFFFF", surface: "#F6F7F0", accent: "#F5A623" },
}: Props) {
  const ink = brand.ink ?? "#18261C";
  const primary = brand.primary ?? "#5F9E47";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F6F7F0";
  const accent = brand.accent ?? "#F5A623";

  return (
    <>
      {/* Ribbon */}
      <div
        className="relative w-full py-3 px-6 text-center"
        style={{ background: ink, color: "#FFFFFF" }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <span
            className="text-[12px] font-black tracking-[0.14em] uppercase"
            style={{ color: accent }}
            aria-hidden
          >
            ★
          </span>
          <span className="text-[14px] md:text-[15px] font-bold tracking-[0.04em]">
            {ribbonText}
          </span>
          <a
            href={ribbonCta.href}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-[0.14em] uppercase"
            style={{ background: accent, color: ink }}
          >
            {ribbonCta.label} →
          </a>
        </div>
      </div>

      {/* Guarantees row */}
      <section className="py-14 md:py-20" style={{ background: surface, color: ink }}>
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[12px] font-semibold tracking-[0.24em] uppercase" style={{ color: primary }}>
              The {`{{BRAND_NAME}}`} Guarantees
            </p>
            <h2
              className="font-display font-bold mt-3"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.015em" }}
            >
              Three promises we sign in writing.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="p-8 text-center rounded-[6px] border"
                style={{
                  background: "#FFFFFF",
                  borderColor: "rgba(0,0,0,0.06)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full text-[28px]"
                  style={{ background: primary, color: primaryInk }}
                  aria-hidden
                >
                  {g.icon}
                </div>
                <h3 className="text-[20px] font-bold mb-2">{g.title}</h3>
                <p className="text-[15px] opacity-80 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
