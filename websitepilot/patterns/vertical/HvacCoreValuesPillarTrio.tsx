/**
 * HvacCoreValuesPillarTrio — alliterative 3-pillar core-values block.
 *
 * Source: https://smockhvac.com (Smock Heating & Air, "The 3 Cs")
 * Signature move: a tightly-branded "Core Values" section that names exactly
 * THREE pillars sharing a memorable letter or sound — Smock uses "The 3 Cs:
 * Comfort / Care / Commitment." The naming makes a generic "why us" feel
 * proprietary. Pillars are typically rendered on a colored background as
 * large-cap centered cards with a single icon, name, and short body. The
 * shared letter/sound is the hook.
 *
 * WHEN TO USE:
 *  - Service-trade brands (HVAC, plumbing, electrical, cleaning, pest)
 *    where you want a memorable "way of doing things" anchor
 *  - Heritage / contractor-heritage / archetype-mascot presets where the
 *    naming convention matches the brand voice
 *  - Pages between hero and proof where you need a brand-personality beat
 *
 * WHEN NOT TO USE:
 *  - Brands without a real alliterative or rhyming trio worth naming
 *  - Premium / design-build brands — feels too consumer-ad
 *  - Pages already full of "why choose us" content
 */
type Pillar = {
  letter?: string;        // The shared letter/sound, e.g. "C"
  name: string;           // "Comfort"
  body: string;           // Short paragraph
  icon?: string;
};

type Props = {
  eyebrow?: string;
  headline?: string;       // "The 3 Cs That Make Us Who We Are"
  pillars?: Pillar[];      // exactly 3 — pattern enforces trio
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string };
};

export default function HvacCoreValuesPillarTrio({
  eyebrow = "Core Values",
  headline = "The 3 Cs That Make Us Who We Are",
  pillars = [
    { letter: "C", name: "Comfort", body: "Your home should be the place where you feel most relaxed. We make sure your HVAC system never gets in the way of that.", icon: "🛋️" },
    { letter: "C", name: "Care", body: "Customer care isn't a tagline — it's the core of every visit. We treat your house like our own.", icon: "🤝" },
    { letter: "C", name: "Commitment", body: "We commit to one-hour windows, clean job sites, and a follow-up call. Every job, every time.", icon: "🛡️" },
  ],
  brand = { ink: "#FFFFFF", primary: "#0A4DA8", primaryInk: "#FFFFFF", surface: "#0A2540" },
}: Props) {
  const ink = brand.ink ?? "#FFFFFF";
  const primary = brand.primary ?? "#0A4DA8";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#0A2540";

  // pattern is a TRIO — enforce 3 pillars
  const trio = pillars.slice(0, 3);

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {headline}
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 list-none p-0">
          {trio.map((p) => (
            <li
              key={p.name}
              className="text-center px-6 py-10 md:py-12 rounded-[12px] relative overflow-hidden"
              style={{ background: `${primaryInk}08`, border: `1px solid ${primaryInk}1F` }}
            >
              {/* Oversized initial letter as background motif */}
              {p.letter && (
                <span
                  aria-hidden
                  className="absolute select-none pointer-events-none font-display font-bold"
                  style={{
                    top: "-8%",
                    right: "-4%",
                    fontSize: "clamp(120px, 16vw, 200px)",
                    lineHeight: 1,
                    color: `${primary}40`,
                  }}
                >
                  {p.letter}
                </span>
              )}
              <div className="relative">
                <span
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full text-[26px] mb-5"
                  style={{ background: primary, color: primaryInk }}
                  aria-hidden
                >
                  {p.icon}
                </span>
                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.018em" }}
                >
                  {p.name}
                </h3>
                <p className="text-[15px] opacity-85 max-w-xs mx-auto">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
