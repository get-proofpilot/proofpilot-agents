/**
 * HvacCouponEmbeddedServices — service grid with coupon chip over each tile.
 *
 * Source: https://genzryan.com (Genz-Ryan, Minneapolis)
 * Signature move: each service card carries a distinct $-off coupon ribbon
 * directly above it ("Get $50 When You Get a Quote", "$26 Water Heater Flush",
 * "Save Up to $600 off Electrical Panel Upgrade"). The coupon is styled like
 * a torn-edge ticket and links to the full coupons page. This converts
 * browsing into a trigger-by-offer scroll.
 *
 * WHEN TO USE:
 *  - HVAC / plumbing / electrical / garage-door brands that already run
 *    promotional offers
 *  - High-intent, price-sensitive verticals (tune-ups, flushes, repairs)
 *  - Brands that want to increase service-card click-through without adding
 *    new copy
 *
 * WHEN NOT TO USE:
 *  - Premium / design-build / architectural brands (coupons cheapen perception)
 *  - B2B / commercial-only accounts
 *  - Brands with no active promotions — faking a coupon kills trust
 */
type ServiceWithCoupon = {
  icon?: string;         // optional img src or emoji
  title: string;
  bullets: string[];
  href: string;
  couponLabel: string;   // "Get $50 When You Get a Quote"
  couponHref?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  services?: ServiceWithCoupon[];
  seeAllLabel?: string;
  seeAllHref?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; couponBg?: string; couponInk?: string; surface?: string };
};

export default function HvacCouponEmbeddedServices({
  eyebrow = "Services & Savings",
  heading = "Service you need, with savings built in.",
  services = [
    {
      icon: "🔥",
      title: "Heating",
      bullets: ["Furnace Repair", "Furnace Installation", "Heat Pumps", "Air Ducts"],
      href: "/heating",
      couponLabel: "Get $50 When You Get a Quote",
      couponHref: "/coupons",
    },
    {
      icon: "❄️",
      title: "Air Conditioning",
      bullets: ["AC Repair", "AC Installation", "Hybrid AC Systems", "Air Ducts"],
      href: "/cooling",
      couponLabel: "Get $50 When You Get a Quote",
      couponHref: "/coupons",
    },
    {
      icon: "🚿",
      title: "Plumbing",
      bullets: ["Water Heaters", "Water Softeners", "Repairs", "Drain Cleaning"],
      href: "/plumbing",
      couponLabel: "$26 Water Heater Flush & Fill",
      couponHref: "/coupons",
    },
    {
      icon: "⚡",
      title: "Electrical",
      bullets: ["Lighting", "Wiring", "EV Chargers", "Outlets & Switches"],
      href: "/electrical",
      couponLabel: "Save up to $600 off Panel Upgrade",
      couponHref: "/coupons",
    },
  ],
  seeAllLabel = "See All Offers",
  seeAllHref = "/coupons",
  brand = {
    ink: "#102540",
    primary: "#1F78D1",
    primaryInk: "#FFFFFF",
    couponBg: "#E6222E",
    couponInk: "#FFFFFF",
    surface: "#F5F8FC",
  },
}: Props) {
  const ink = brand.ink ?? "#102540";
  const primary = brand.primary ?? "#1F78D1";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const couponBg = brand.couponBg ?? "#E6222E";
  const couponInk = brand.couponInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F5F8FC";

  return (
    <section className="py-20 md:py-24" style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: primary }}>
              {eyebrow}
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.015em" }}
            >
              {heading}
            </h2>
          </div>
          <a
            href={seeAllHref}
            className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.12em] uppercase"
            style={{ color: primary }}
          >
            {seeAllLabel} <span aria-hidden>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {services.map((s) => (
            <div key={s.title} className="relative">
              {/* Coupon chip */}
              <a
                href={s.couponHref ?? seeAllHref}
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-4 py-2 text-[12px] font-bold tracking-[0.06em] rounded-full shadow-md whitespace-nowrap"
                style={{ background: couponBg, color: couponInk }}
              >
                <span aria-hidden>🏷️</span>
                {s.couponLabel}
              </a>

              {/* Service card */}
              <a
                href={s.href}
                className="block rounded-[6px] p-7 pt-9 border h-full transition-transform hover:-translate-y-1"
                style={{
                  background: "#FFFFFF",
                  borderColor: "rgba(0,0,0,0.08)",
                  boxShadow: "0 6px 22px rgba(0,0,0,0.05)",
                }}
              >
                <div className="text-4xl mb-4" aria-hidden>
                  {s.icon}
                </div>
                <h3 className="text-[20px] font-bold mb-3">{s.title}</h3>
                <ul className="space-y-1.5 mb-5 text-[14px] opacity-80">
                  {s.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <span
                  className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: primary }}
                >
                  Learn More <span aria-hidden>→</span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
