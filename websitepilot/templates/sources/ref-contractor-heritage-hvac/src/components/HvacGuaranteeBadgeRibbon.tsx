/**
 * HvacGuaranteeBadgeRibbon — five-icon trust ribbon of brand guarantees.
 *
 * Source: https://genzryan.com (Genz-Ryan, Twin Cities HVAC / Plumbing / Electrical)
 * Signature move: a single horizontal ribbon, set against a strong brand color,
 * with five circular badges captioned with all-caps "guarantee names":
 *  BUDGET-FRIENDLY FINANCING / HOMEPULSE WARRANTY PLAN / PREMIUM PRODUCTS /
 *  COMMITTED TO COMMUNITY / SAME-DAY INSTALLATIONS.
 * Different from a generic "why us" grid because each item is named like a
 * branded program (HomePulse Warranty, etc) — the company's reassurance
 * stack reads as proprietary, not commodity.
 *
 * WHEN TO USE:
 *  - HVAC / plumbing / electrical brands with multiple named programs
 *    (financing partner, branded warranty, membership, charity tie-in)
 *  - Multi-trade home-service brands that need to communicate breadth of
 *    reassurance in a single horizontal scan
 *  - Heritage / family-trade brands that have invested in branding their
 *    guarantees rather than listing generic checkmarks
 *
 * WHEN NOT TO USE:
 *  - Brands without named programs — this becomes a generic icon row
 *  - Premium / design-build brands where the language reads transactional
 *  - Single-service specialists (water heater only, garage door only) —
 *    five guarantees feels overstuffed
 */
type Item = {
  title: string;        // ALL-CAPS PROGRAM NAME, branded if possible
  caption?: string;     // Single line below
  icon?: string;        // Emoji, image URL, or SVG path
};

type Props = {
  eyebrow?: string;
  headline?: string;
  items?: Item[];
  ctaLabel?: string;
  ctaHref?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string };
};

export default function HvacGuaranteeBadgeRibbon({
  eyebrow = "Why {{BRAND_NAME}}",
  headline = "Guarantees You Can Bank On",
  items = [
    { title: "BUDGET-FRIENDLY FINANCING", caption: "0% APR plans available", icon: "💳" },
    { title: "HOMEPULSE WARRANTY PLAN", caption: "Lifetime parts & labor", icon: "🛡️" },
    { title: "PREMIUM PRODUCTS", caption: "Top-tier brands only", icon: "⭐" },
    { title: "COMMITTED TO COMMUNITY", caption: "Local since 1950", icon: "🤝" },
    { title: "SAME-DAY INSTALLATIONS", caption: "When the schedule allows", icon: "⚡" },
  ],
  ctaLabel = "Looking for a Resource? Visit Our Information Center",
  ctaHref = "/resources",
  brand = { ink: "#FFFFFF", primary: "#0A4DA8", primaryInk: "#FFFFFF", surface: "#FFD23F" },
}: Props) {
  const ink = brand.ink ?? "#FFFFFF";
  const primary = brand.primary ?? "#0A4DA8";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#FFD23F";

  return (
    <section className="relative" style={{ background: primary, color: ink }}>
      <div className="max-w-[1320px] mx-auto px-6 py-14 md:py-20">
        {(eyebrow || headline) && (
          <div className="text-center mb-10 md:mb-14">
            {eyebrow && (
              <p
                className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-3"
                style={{ color: surface }}
              >
                {eyebrow}
              </p>
            )}
            {headline && (
              <h2
                className="font-display font-bold"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.018em" }}
              >
                {headline}
              </h2>
            )}
          </div>
        )}

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 list-none p-0">
          {items.map((it) => (
            <li key={it.title} className="flex flex-col items-center text-center">
              <span
                className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full text-[28px] md:text-[32px] mb-4"
                style={{ background: surface, color: "#142C43" }}
                aria-hidden
              >
                {it.icon}
              </span>
              <p
                className="text-[12px] md:text-[13px] font-bold tracking-[0.14em] uppercase leading-tight"
                style={{ color: ink }}
              >
                {it.title}
              </p>
              {it.caption && (
                <p className="text-[13px] mt-2 opacity-85 max-w-[14rem]">{it.caption}</p>
              )}
            </li>
          ))}
        </ul>

        {ctaLabel && (
          <div className="mt-12 md:mt-16 text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
              style={{ background: surface, color: "#142C43" }}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
