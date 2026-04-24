/**
 * ConcreteVsTraditionalCompare — specialist-vs-generalist comparison grid.
 *
 * Source: https://www.jandjcustomcurbing.com
 * Signature move: two-column "us vs them" head-to-head where the brand's column
 * sits left (checkmark, on-brand surface) and the generic competitor sits right
 * (X mark, muted surface). Each row is a titled value-prop with a one-line
 * explanation. The visual hierarchy is: brand column = confident and colored,
 * competitor column = faded and grey.
 *
 * WHEN TO USE:
 *  - Specialist brands that compete against generalists (curbing vs general
 *    landscaping, roofing vs handyman, tree service vs mowers, concrete
 *    coatings vs painters, etc.)
 *  - Higher-consideration decisions where the buyer is comparing specialist
 *    shops to jack-of-all-trades competitors
 *  - Mid-funnel pages — this section is a BUYING-DECISION accelerator
 *
 * WHEN NOT TO USE:
 *  - Pure emergency / impulse purchases (water heater burst, locked out)
 *  - Brands that ARE the generalist
 *  - When you don't have 3-4 defensible specialist differentiators
 *
 * Prop-driven. Ship with sensible 4-row default.
 */
type ComparisonRow = {
  usTitle: string;
  usBody: string;
  themTitle: string;
  themBody: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  usLabel?: string;
  themLabel?: string;
  rows?: ComparisonRow[];
  brand?: { ink?: string; accent?: string; accentInk?: string; muted?: string; surface?: string };
};

export default function ConcreteVsTraditionalCompare({
  eyebrow = "Why specialists win",
  heading = "{{BRAND_NAME}} vs. Traditional Contractors",
  subhead = "Choosing the right team changes every outcome. Here's the honest comparison.",
  usLabel = "{{BRAND_NAME}}",
  themLabel = "Traditional Contractors",
  rows = [
    {
      usTitle: "The only full-time specialist in the region",
      usBody: "Dedicated to one craft — unmatched expertise and precision on every project.",
      themTitle: "Generalized work, spread thin",
      themBody: "Often lack specialized skills, leading to less precise, lower-quality results.",
    },
    {
      usTitle: "Custom designs, reinforced durability",
      usBody: "Personalized engineering with materials built for decades of use.",
      themTitle: "Basic options, standard materials",
      themBody: "Off-the-shelf solutions with shorter lifespans and limited customization.",
    },
    {
      usTitle: "Professional installation, proven process",
      usBody: "A repeatable process that delivers quality every time.",
      themTitle: "Varies by crew, varies by day",
      themBody: "Attention to detail shifts with whoever shows up.",
    },
    {
      usTitle: "Specialized equipment for precision",
      usBody: "Purpose-built tools for seamless, accurate installations.",
      themTitle: "General-purpose tools",
      themBody: "Standard tools produce rougher edges and visible seams.",
    },
  ],
  brand = {
    ink: "#1A1A1A",
    accent: "#2E7D32",
    accentInk: "#FFFFFF",
    muted: "#B8B8B8",
    surface: "#F7F5F0",
  },
}: Props) {
  const ink = brand.ink ?? "#1A1A1A";
  const accent = brand.accent ?? "#2E7D32";
  const accentInk = brand.accentInk ?? "#FFFFFF";
  const muted = brand.muted ?? "#B8B8B8";
  const surface = brand.surface ?? "#F7F5F0";

  return (
    <section className="py-20 md:py-28" style={{ background: surface, color: ink }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.015em" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg opacity-80">{subhead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* US column */}
          <div
            className="rounded-[6px] p-8 md:p-10"
            style={{ background: accent, color: accentInk, boxShadow: "0 14px 48px rgba(0,0,0,0.12)" }}
          >
            <h3 className="text-[22px] font-bold mb-6">{usLabel}</h3>
            <ul className="space-y-6">
              {rows.map((row, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden
                    className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[14px] font-bold mt-0.5"
                    style={{ background: accentInk, color: accent }}
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold text-[17px] mb-1">{row.usTitle}</p>
                    <p className="text-[14px] opacity-90 leading-relaxed">{row.usBody}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* THEM column */}
          <div
            className="rounded-[6px] p-8 md:p-10 border"
            style={{ background: "#FFFFFF", color: ink, borderColor: "rgba(0,0,0,0.08)" }}
          >
            <h3 className="text-[22px] font-bold mb-6" style={{ color: muted }}>
              {themLabel}
            </h3>
            <ul className="space-y-6">
              {rows.map((row, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden
                    className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-[14px] font-bold mt-0.5 border"
                    style={{ borderColor: muted, color: muted }}
                  >
                    ✕
                  </span>
                  <div>
                    <p className="font-semibold text-[17px] mb-1" style={{ color: muted }}>
                      {row.themTitle}
                    </p>
                    <p className="text-[14px] leading-relaxed opacity-70">{row.themBody}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
