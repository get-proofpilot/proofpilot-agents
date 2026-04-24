/**
 * ConstructionMultiCityPhoneRow — multi-market location phone-switcher row.
 *
 * Source: https://youngconstructionnorthiowa.com (Iowa + MN + FL)
 * Signature move: the very top header bar contains three (or more) city-
 * labeled phone numbers rather than a single headquarters number. Each
 * link is clearly per-market: "Mason City, IA (641) 430-0655",
 * "Albert Lea, MN (587) 369-5845", "Venice, FL (941) 837-6135". Signals
 * real local presence in each service area + routes calls correctly.
 *
 * WHEN TO USE:
 *  - Service brands with 2+ physical offices or 2+ tracked numbers
 *  - Franchise / multi-location / expansion brands (avoid a "we're huge
 *    but nowhere specifically" feel)
 *  - SEO-conscious brands that want to reinforce city-level relevance
 *
 * WHEN NOT TO USE:
 *  - Single-market single-number brands (dilutes trust)
 *  - Pure dispatch service without a physical office presence
 *  - Premium editorial brands (feels transactional)
 */
type LocationNumber = {
  city: string;
  phoneLabel: string;
  phoneHref: string;
  badge?: string;   // "Main" / "HQ" / "NEW"
};

type Props = {
  locations?: LocationNumber[];
  ctaLabel?: string;
  ctaHref?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; onDark?: string; dark?: string };
  placement?: "light" | "dark";
};

export default function ConstructionMultiCityPhoneRow({
  locations = [
    { city: "Mason City, IA", phoneLabel: "(641) 430-0655", phoneHref: "tel:6414300655", badge: "HQ" },
    { city: "Albert Lea, MN", phoneLabel: "(587) 369-5845", phoneHref: "tel:5873695845" },
    { city: "Venice, FL", phoneLabel: "(941) 837-6135", phoneHref: "tel:9418376135" },
  ],
  ctaLabel = "Get In Touch",
  ctaHref = "/contact",
  brand = { ink: "#14233B", primary: "#F59E0B", primaryInk: "#14233B", onDark: "#FFFFFF", dark: "#0E1B2D" },
  placement = "dark",
}: Props) {
  const ink = brand.ink ?? "#14233B";
  const primary = brand.primary ?? "#F59E0B";
  const primaryInk = brand.primaryInk ?? "#14233B";
  const onDark = brand.onDark ?? "#FFFFFF";
  const dark = brand.dark ?? "#0E1B2D";

  const isDark = placement === "dark";
  const bg = isDark ? dark : "#FFFFFF";
  const fg = isDark ? onDark : ink;

  return (
    <div
      className="w-full border-b"
      style={{ background: bg, color: fg, borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {locations.map((loc) => (
            <li key={loc.city}>
              <a
                href={loc.phoneHref}
                className="group inline-flex items-center gap-2 text-[13px] md:text-[14px] transition-opacity hover:opacity-80"
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                  style={{ background: primary, color: primaryInk }}
                  aria-hidden
                >
                  📞
                </span>
                <span className="font-semibold opacity-85">{loc.city}</span>
                <span className="font-bold tabular-nums" style={{ color: primary }}>
                  {loc.phoneLabel}
                </span>
                {loc.badge && (
                  <span
                    className="text-[10px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-sm"
                    style={{ background: primary + "30", color: primary }}
                  >
                    {loc.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] text-[12px] font-bold tracking-[0.14em] uppercase"
          style={{ background: primary, color: primaryInk }}
        >
          {ctaLabel} →
        </a>
      </div>
    </div>
  );
}
