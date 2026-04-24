/**
 * HvacBrandedVanHero — hero with the company branded van as primary visual.
 *
 * Source: https://calldoggone.com (Doggone Good Heating & Cooling, Baton Rouge)
 * Signature move: the hero image is not a technician, not a house — it's the
 * company's branded van, cut-out and floating at an angle with a colored
 * shape backdrop. Because the van IS the brand (mascot, phone, colors all
 * baked in) it doubles as logo + billboard. Pairs with a themed value-prop
 * bar beneath ("1-Hour Scheduling", themed-name membership, etc).
 *
 * WHEN TO USE:
 *  - HVAC / plumbing / electrical / carpet / pest brands with a fleet wrap
 *    they're proud of
 *  - Mascot-forward or theme-forward brands (Doggone = dog puns; bear =
 *    plumbing; etc.) where the van reinforces the personality
 *  - Hyper-local markets where seeing "that van" around town = the sale
 *
 * WHEN NOT TO USE:
 *  - Brands without a branded van (no wrap, unmarked fleet)
 *  - Premium / design-build / architectural — the van looks transactional
 *  - Brands whose vehicles look tired or off-brand
 */
type Props = {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  vanImage?: string;          // cut-out PNG of the branded van
  valueProps?: { label: string; icon?: string }[];
  brand?: { ink?: string; primary?: string; primaryInk?: string; backdrop?: string; onDark?: string };
};

export default function HvacBrandedVanHero({
  eyebrow = "Welcome to {{BRAND_NAME}}",
  headline = "Top-Dog HVAC Services in {{CITY}} & surrounding areas.",
  subhead = "Locally owned, personally run. One-hour appointment windows because you've got better things to do than wait around all day.",
  primaryCta = { label: "Schedule Now", href: "/book" },
  secondaryCta = { label: "Call (225) 555-0100", href: "tel:+12255550100" },
  vanImage = "/brand/branded-van.png",
  valueProps = [
    { icon: "⏰", label: "1-Hour Appointment Windows" },
    { icon: "🐾", label: "Pack Perks Membership" },
    { icon: "🔧", label: "24/7 Emergency Service" },
    { icon: "✅", label: "Fully Licensed & Insured" },
  ],
  brand = { ink: "#142C43", primary: "#F59E0B", primaryInk: "#142C43", backdrop: "#E8F0FA", onDark: "#FFFFFF" },
}: Props) {
  const ink = brand.ink ?? "#142C43";
  const primary = brand.primary ?? "#F59E0B";
  const primaryInk = brand.primaryInk ?? "#142C43";
  const backdrop = brand.backdrop ?? "#E8F0FA";

  return (
    <section className="relative overflow-hidden" style={{ background: backdrop, color: ink }}>
      {/* Diagonal color block behind van */}
      <div
        aria-hidden
        className="absolute top-0 right-0 h-full w-3/5 pointer-events-none hidden md:block"
        style={{
          background: `linear-gradient(135deg, ${primary}22 0%, ${primary}00 55%)`,
          clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 pt-20 md:pt-28 pb-14 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h1
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(34px, 5.5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.022em" }}
          >
            {headline}
          </h1>
          <p className="text-lg opacity-85 mb-8 max-w-xl">{subhead}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={primaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
              style={{ background: primary, color: primaryInk }}
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px] border"
              style={{ borderColor: ink, color: ink }}
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <img
            src={vanImage}
            alt=""
            className="w-full h-auto drop-shadow-2xl"
            style={{ transform: "rotate(-2deg)" }}
          />
        </div>
      </div>

      {/* Value-prop strip */}
      <div className="relative" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-[1320px] mx-auto px-6 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {valueProps.map((v) => (
            <div key={v.label} className="flex items-center gap-3">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full text-[18px] shrink-0"
                style={{ background: primary, color: primaryInk }}
                aria-hidden
              >
                {v.icon}
              </span>
              <span className="text-[14px] md:text-[15px] font-semibold leading-snug">
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
