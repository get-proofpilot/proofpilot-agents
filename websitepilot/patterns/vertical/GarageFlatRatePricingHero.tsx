/**
 * GarageFlatRatePricingHero — hero with upfront "starting at $X" pricing
 * bullets.
 *
 * Source: https://prolinedoorservice.com (San Jose, CA)
 * Signature move: the hero's primary body is three stacked price-lead
 * bullets ("Spring Repair Service Starting at $397", "New Opener
 * Installations Starting at $797", "Free Service Calls with Any Repair").
 * Anchors trust by naming a number up front — rare in a category where
 * competitors hide pricing. Works for service categories where common
 * repairs have standardized, shareable prices (garage doors, locksmith,
 * water heaters, window repair).
 *
 * WHEN TO USE:
 *  - Single-service-category brands with standardized repair SKUs
 *  - Trades where competitors hide pricing and the brand wants to differentiate
 *  - Mid-ticket repair categories ($200-$1500 typical spend)
 *
 * WHEN NOT TO USE:
 *  - Premium / bespoke / design-build — naming numbers cheapens it
 *  - Brands that genuinely quote every job (don't pin a number you can't hold)
 *  - Categories with wide pricing variance (roof replacement, HVAC install)
 */
type PriceBullet = {
  label: string;        // "Spring Repair Service"
  price: string;        // "$397"
  prefix?: string;      // "Starting at"
  suffix?: string;      // "+ parts"
  note?: string;        // "Free with any repair"
};

type Props = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  priceBullets?: PriceBullet[];
  primaryCta?: { label: string; href: string };
  phoneCta?: { label: string; href: string };
  heroImage?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; accent?: string };
};

export default function GarageFlatRatePricingHero({
  eyebrow = "San Jose's #1 Rated Garage Door Company",
  headline = "Fast repairs, flat-rate pricing, no surprises.",
  subhead = "Real numbers up front. Real technicians on the truck. Real same-day service.",
  priceBullets = [
    { label: "Spring Repair Service", price: "$397", prefix: "Starting at" },
    { label: "New Opener Installation", price: "$797", prefix: "Starting at" },
    { label: "Service Calls with Any Repair", price: "FREE", note: "Always" },
  ],
  primaryCta = { label: "Get My Fast Quote", href: "/quote" },
  phoneCta = { label: "Call (408) 916-4218", href: "tel:14089164218" },
  heroImage = "/hero/branded-garage-van.png",
  brand = { ink: "#1A1A1A", primary: "#E8B500", primaryInk: "#1A1A1A", surface: "#F7F6F0", accent: "#D62828" },
}: Props) {
  const ink = brand.ink ?? "#1A1A1A";
  const primary = brand.primary ?? "#E8B500";
  const primaryInk = brand.primaryInk ?? "#1A1A1A";
  const surface = brand.surface ?? "#F7F6F0";
  const accent = brand.accent ?? "#D62828";

  return (
    <section className="relative overflow-hidden" style={{ background: surface, color: ink }}>
      <div className="max-w-[1320px] mx-auto px-6 pt-20 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h1
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(34px, 5.5vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.025em" }}
          >
            {headline}
          </h1>
          <p className="text-lg opacity-85 mb-8 max-w-xl">{subhead}</p>

          <ul className="space-y-2.5 mb-8">
            {priceBullets.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-3 p-3 rounded-[4px]"
                style={{ background: "rgba(0,0,0,0.04)" }}
              >
                <span
                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-[14px] font-bold"
                  style={{ background: primary, color: primaryInk }}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="flex-1 text-[15px] md:text-[16px] font-semibold">
                  {b.label}
                </span>
                <span
                  className="px-3 py-1 rounded-[4px] text-[14px] md:text-[15px] font-black tabular-nums"
                  style={{ background: ink, color: primary }}
                >
                  {b.prefix && <span className="opacity-70 font-normal text-[11px] mr-1.5">{b.prefix}</span>}
                  {b.price}
                  {b.suffix && <span className="opacity-70 font-normal text-[11px] ml-1">{b.suffix}</span>}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href={primaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
              style={{ background: primary, color: primaryInk }}
            >
              {primaryCta.label} →
            </a>
            <a
              href={phoneCta.href}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px] border-2"
              style={{ borderColor: ink, color: ink }}
            >
              <span aria-hidden>📞</span>
              {phoneCta.label}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <img src={heroImage} alt="" className="w-full h-auto drop-shadow-xl" />
        </div>
      </div>
    </section>
  );
}
