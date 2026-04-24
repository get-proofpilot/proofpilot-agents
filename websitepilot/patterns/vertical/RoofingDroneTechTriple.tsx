/**
 * RoofingDroneTechTriple — 3-card "tech credibility" tile with sample reports.
 *
 * Source: https://veteranscontractingllc.com (Veterans Contracting LLC)
 * Signature move: instead of saying "we use drones," the brand shows THREE
 * specific tech-deliverable cards side by side: INSPECTION (drone shot of
 * a roof) / THERMAL (false-color heat map) / MEASUREMENTS (wireframe
 * report PDF preview). Each card has a sample report screenshot — proof
 * the deliverable exists, not a stock photo of a drone. Converts "drone
 * inspections" from buzzword to product line.
 *
 * WHEN TO USE:
 *  - Roofing / solar / siding / commercial-exterior brands using drone
 *    technology as a competitive differentiator
 *  - Insurance-claim-focused storm-restoration brands (the report cards
 *    are also what insurance adjusters need)
 *  - Heritage / contractor-heritage / rugged-industrial / premium-design-
 *    build presets where tech-forward credibility matters
 *
 * WHEN NOT TO USE:
 *  - Brands without real drone capability — fake screenshots are obvious
 *  - Service trades without a "deliverable artifact" (can't show a thermal
 *    image for plumbing)
 *  - Pages where you've already shown drone footage in the hero
 */
type Capability = {
  title: string;          // "Inspection"
  caption: string;        // 1-2 sentences
  imageUrl: string;       // sample report / thermal map / drone shot
  imageAlt?: string;
  badge?: string;         // optional pill: "AI-assisted", "Same-day", "Insurance-ready"
};

type Props = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  capabilities?: Capability[];
  ctaLabel?: string;
  ctaHref?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; cardBg?: string };
};

export default function RoofingDroneTechTriple({
  eyebrow = "Drone Technology",
  headline = "Get Your Inspection in High Definition",
  intro = "We optimize roof inspections with high-resolution drone imagery and an analytics platform built for accuracy, speed, and insurance-ready documentation.",
  capabilities = [
    {
      title: "Inspection",
      caption: "Centimeter-accurate aerial imagery captures every shingle, flashing detail, and storm-damage indicator — without anyone climbing a ladder.",
      imageUrl: "/drone/inspection-sample.jpg",
      imageAlt: "Drone aerial inspection report",
      badge: "Same-Day Report",
    },
    {
      title: "Thermal",
      caption: "False-color thermal imaging reveals trapped moisture and heat-loss patterns invisible to the naked eye — before a small leak becomes a deck rebuild.",
      imageUrl: "/drone/thermal-sample.jpg",
      imageAlt: "Thermal heat-map of a roof",
      badge: "Catches Hidden Leaks",
    },
    {
      title: "Measurements",
      caption: "Wireframe takeoffs measure every plane, valley, and ridge to within 1% accuracy — making your estimate faster and your insurance claim airtight.",
      imageUrl: "/drone/measurement-sample.jpg",
      imageAlt: "Wireframe measurement report",
      badge: "Insurance-Ready",
    },
  ],
  ctaLabel = "Schedule My Drone Inspection",
  ctaHref = "/inspection",
  brand = { ink: "#0A2540", primary: "#B91C1C", primaryInk: "#FFFFFF", surface: "#F4F7FB", cardBg: "#FFFFFF" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#B91C1C";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F4F7FB";
  const cardBg = brand.cardBg ?? "#FFFFFF";

  const trio = capabilities.slice(0, 3);

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {headline}
          </h2>
          {intro && <p className="text-lg opacity-85">{intro}</p>}
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
          {trio.map((c) => (
            <li
              key={c.title}
              className="rounded-[12px] overflow-hidden flex flex-col"
              style={{ background: cardBg, boxShadow: "0 8px 28px rgba(10,37,64,0.08)" }}
            >
              <div className="aspect-[16/11] relative overflow-hidden bg-gray-200">
                <img src={c.imageUrl} alt={c.imageAlt ?? c.title} className="w-full h-full object-cover" />
                {c.badge && (
                  <span
                    className="absolute top-3 left-3 inline-flex items-center px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase rounded-[4px]"
                    style={{ background: primary, color: primaryInk }}
                  >
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <h3
                  className="font-display font-bold mb-2.5"
                  style={{ fontSize: "clamp(20px, 2.4vw, 26px)", letterSpacing: "-0.018em" }}
                >
                  {c.title}
                </h3>
                <p className="text-[14px] opacity-80 leading-snug">{c.caption}</p>
              </div>
            </li>
          ))}
        </ul>

        {ctaLabel && (
          <div className="mt-12 text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
              style={{ background: primary, color: primaryInk }}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
