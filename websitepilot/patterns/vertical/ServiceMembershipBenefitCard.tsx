/**
 * ServiceMembershipBenefitCard — single named-membership card with 5 anchor benefits.
 *
 * Source: https://smithservicesaz.com (Smith "Prime Membership Program") +
 * https://smockhvac.com (Smock "Comfort Maintenance Plan")
 * Signature move: a single full-width card where the LEFT side is the
 * branded program name (e.g. "Prime Membership Program") + dual CTA, and
 * the RIGHT side is a tight 5-bullet benefit list with concrete dollar
 * amounts: $100 toward services, 10% discount, no-fee emergencies, 1-year
 * labor warranty, front-of-line priority. Differs from a pricing-tier
 * card because there's only ONE tier — the program is the offer.
 *
 * WHEN TO USE:
 *  - HVAC / plumbing / pool / pest brands with a single named maintenance
 *    or membership program
 *  - Heritage / contractor-heritage presets where the program reads as
 *    earned (50 years in business, etc.)
 *  - Pages where you want the membership to feel like a "club" not a
 *    discount tier
 *
 * WHEN NOT TO USE:
 *  - Brands with multiple tiered memberships — use a pricing-tier pattern
 *  - Brands without dollar-specific benefits — vague benefits look weak
 *  - Premium / design-build presets — the language reads transactional
 */
type Props = {
  eyebrow?: string;
  programName?: string;        // "Prime Membership Program"
  pitch?: string;              // 1-line description
  benefits?: string[];         // 4-6 short bullet benefits
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badgeLabel?: string;         // "$X /yr" or "MEMBERS-ONLY"
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; cardBg?: string };
};

export default function ServiceMembershipBenefitCard({
  eyebrow = "Members Save More",
  programName = "Prime Membership Program",
  pitch = "Keep your plumbing, heating, and cooling running smoothly — at member-only prices.",
  benefits = [
    "One-year labor warranties on all installations and repairs",
    "Front-of-line priority service when you need us most",
    "No fees for emergency, night, or weekend calls",
    "$100 annual credit toward regular services",
    "10% discount on every repair and install — for life",
  ],
  primaryCta = { label: "Request the Program", href: "/membership" },
  secondaryCta = { label: "Learn More", href: "/membership/details" },
  badgeLabel = "$X /YR",
  brand = { ink: "#0A2540", primary: "#0A4DA8", primaryInk: "#FFFFFF", surface: "#F4F7FB", cardBg: "#0A2540" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#0A4DA8";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F4F7FB";
  const cardBg = brand.cardBg ?? "#0A2540";

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div
          className="rounded-[16px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
          style={{ background: cardBg, color: primaryInk, boxShadow: "0 24px 64px rgba(10,37,64,0.18)" }}
        >
          {/* Left: program identity */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between relative" style={{ background: `linear-gradient(135deg, ${cardBg} 0%, ${primary} 100%)` }}>
            {badgeLabel && (
              <span
                className="absolute top-6 right-6 inline-flex items-center px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase rounded-[4px]"
                style={{ background: primaryInk, color: cardBg }}
              >
                {badgeLabel}
              </span>
            )}
            <div>
              <p
                className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4 opacity-80"
              >
                {eyebrow}
              </p>
              <h2
                className="font-display font-bold mb-5"
                style={{ fontSize: "clamp(26px, 3.4vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.018em" }}
              >
                {programName}
              </h2>
              <p className="text-[16px] opacity-90 max-w-md">{pitch}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
                style={{ background: primaryInk, color: cardBg }}
              >
                {primaryCta.label}
              </a>
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-bold tracking-[0.12em] uppercase rounded-[4px] border"
                  style={{ borderColor: primaryInk, color: primaryInk }}
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          </div>

          {/* Right: benefit list */}
          <div className="lg:col-span-7 p-8 md:p-12">
            <p className="text-[12px] font-semibold tracking-[0.22em] uppercase mb-5 opacity-70">
              What You Get
            </p>
            <ul className="space-y-4 list-none p-0">
              {benefits.map((b, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full text-[14px] font-bold shrink-0"
                    style={{ background: `${primaryInk}1A`, color: primaryInk, border: `1px solid ${primaryInk}40` }}
                  >
                    ✓
                  </span>
                  <p className="text-[15px] md:text-[16px] leading-snug pt-1.5">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
