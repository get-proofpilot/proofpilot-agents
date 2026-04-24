/**
 * TankVsTanklessSpecCompare — product-type spec comparison table.
 *
 * Source: https://speedywaterheatersoc.com (Speedy Water Heaters)
 * Signature move: a 2-column comparison focused not on us-vs-them, but on
 * TWO PRODUCT OPTIONS the visitor is choosing between (Tank vs Tankless,
 * Asphalt vs Metal, Gas vs Electric, etc.). Each column has a header card
 * with the option image + 1-line summary, and a SHARED-ATTRIBUTE row
 * structure ("Efficiency / Up-front cost / Lifespan / Footprint / Best
 * for"). Visitor walks away with a choice they trust, primed to book.
 *
 * WHEN TO USE:
 *  - Specialty install brands where the visitor's main decision is between
 *    two product families (water heaters, AC types, roof materials, fencing
 *    materials, EV charger types)
 *  - Mid-funnel pages — visitor knows they need the category but not the
 *    specific product
 *  - Heritage / premium-design-build presets where consultative tone fits
 *
 * WHEN NOT TO USE:
 *  - Service-only brands (no product variant decision)
 *  - Pages where us-vs-them is the goal — use ConcreteVsTraditionalCompare
 *  - Brands that only sell one option (don't fake a comparison)
 */
type Spec = {
  attribute: string;        // e.g. "Energy Efficiency"
  optionA: string;          // value for option A column
  optionB: string;          // value for option B column
  highlight?: "A" | "B";    // optional row-level winner indicator
};

type OptionCard = {
  name: string;
  tagline?: string;
  image?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  optionA?: OptionCard;
  optionB?: OptionCard;
  specs?: Spec[];
  brand?: { ink?: string; primary?: string; surface?: string; cardBg?: string; rowAlt?: string };
};

export default function TankVsTanklessSpecCompare({
  eyebrow = "Pick Your Path",
  headline = "Tank vs Tankless — Which Fits Your Home?",
  intro = "Both work. The right answer depends on usage, budget, and how long you plan to stay in the home.",
  optionA = {
    name: "Tank Water Heater",
    tagline: "Reliable, affordable, familiar",
    image: "/services/tank-heater.jpg",
    badge: "Most homes",
    ctaLabel: "Get a Tank Quote",
    ctaHref: "/quote?type=tank",
  },
  optionB = {
    name: "Tankless Water Heater",
    tagline: "On-demand, efficient, longer-lived",
    image: "/services/tankless-heater.jpg",
    badge: "Best efficiency",
    ctaLabel: "Get a Tankless Quote",
    ctaHref: "/quote?type=tankless",
  },
  specs = [
    { attribute: "Up-Front Cost", optionA: "$1,200–$2,000", optionB: "$3,000–$5,000", highlight: "A" },
    { attribute: "Energy Efficiency", optionA: "60–70%", optionB: "85–95%", highlight: "B" },
    { attribute: "Average Lifespan", optionA: "8–12 years", optionB: "20+ years", highlight: "B" },
    { attribute: "Hot Water Supply", optionA: "Limited by tank size", optionB: "Endless on-demand", highlight: "B" },
    { attribute: "Footprint", optionA: "Floor-mounted, large", optionB: "Wall-mounted, small", highlight: "B" },
    { attribute: "Best For", optionA: "Smaller homes, tight budgets", optionB: "Large homes, long-term owners" },
  ],
  brand = { ink: "#0A2540", primary: "#0A4DA8", surface: "#F4F7FB", cardBg: "#FFFFFF", rowAlt: "#F8FAFC" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#0A4DA8";
  const surface = brand.surface ?? "#F4F7FB";
  const cardBg = brand.cardBg ?? "#FFFFFF";
  const rowAlt = brand.rowAlt ?? "#F8FAFC";

  const optionCard = (opt: OptionCard, side: "A" | "B") => (
    <div
      className="rounded-[12px] overflow-hidden flex flex-col"
      style={{ background: cardBg, border: `1px solid ${ink}14` }}
    >
      <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
        {opt.image && <img src={opt.image} alt="" className="w-full h-full object-cover" />}
        {opt.badge && (
          <span
            className="absolute top-3 left-3 inline-flex items-center px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase rounded-[4px]"
            style={{ background: side === "B" ? primary : ink, color: "#FFFFFF" }}
          >
            {opt.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3
          className="font-display font-bold mb-1"
          style={{ fontSize: "clamp(20px, 2.4vw, 26px)", letterSpacing: "-0.018em" }}
        >
          {opt.name}
        </h3>
        {opt.tagline && <p className="text-[14px] opacity-75">{opt.tagline}</p>}
        {opt.ctaLabel && (
          <a
            href={opt.ctaHref ?? "#"}
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 text-[12px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
            style={{ background: primary, color: "#FFFFFF" }}
          >
            {opt.ctaLabel}
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {headline}
          </h2>
          {intro && <p className="text-lg opacity-85">{intro}</p>}
        </div>

        {/* Option header cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {optionCard(optionA, "A")}
          {optionCard(optionB, "B")}
        </div>

        {/* Spec table */}
        <div className="rounded-[12px] overflow-hidden" style={{ background: cardBg, border: `1px solid ${ink}14` }}>
          <div
            className="grid grid-cols-[1.4fr_1fr_1fr] text-[12px] font-bold tracking-[0.16em] uppercase"
            style={{ background: ink, color: "#FFFFFF" }}
          >
            <div className="px-5 py-3">Attribute</div>
            <div className="px-5 py-3 border-l border-white/15">{optionA.name}</div>
            <div className="px-5 py-3 border-l border-white/15">{optionB.name}</div>
          </div>
          {specs.map((s, idx) => (
            <div
              key={s.attribute}
              className="grid grid-cols-[1.4fr_1fr_1fr] text-[14px]"
              style={{ background: idx % 2 === 0 ? cardBg : rowAlt }}
            >
              <div className="px-5 py-4 font-semibold">{s.attribute}</div>
              <div
                className="px-5 py-4 border-l"
                style={{
                  borderColor: `${ink}14`,
                  background: s.highlight === "A" ? `${primary}10` : "transparent",
                  fontWeight: s.highlight === "A" ? 700 : 400,
                }}
              >
                {s.optionA}
              </div>
              <div
                className="px-5 py-4 border-l"
                style={{
                  borderColor: `${ink}14`,
                  background: s.highlight === "B" ? `${primary}10` : "transparent",
                  fontWeight: s.highlight === "B" ? 700 : 400,
                }}
              >
                {s.optionB}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
