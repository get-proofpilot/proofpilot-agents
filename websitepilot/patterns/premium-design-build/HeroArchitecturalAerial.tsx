/**
 * HeroArchitecturalAerial — premium-design-build hero.
 * Full-bleed architectural / aerial placeholder with gradient overlay, eyebrow
 * + H1 (medium-weight sans) + H2 tri-word bullet tagline (bold sans) +
 * italic-serif accent phrase + dual CTA + floating studio stat card.
 *
 * Signature moves:
 *   - bullet-separated tri-word tagline ("Design · Build · Live") with italic bullets
 *   - one italic Fraunces accent phrase (the only serif in the section)
 *   - 4px radius buttons, never pill
 *   - "Start a Project" CTA, never "Get a Quote"
 */
type Props = {
  city?: string;
  established?: string | number;
  eyebrow?: string;
  leftWord?: string;
  middleWord?: string;
  rightWord?: string;
  italicAccent?: string;
  subcopy?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  studioCard?: { eyebrow: string; tagline: string; left: { label: string; value: string }; right: { label: string; value: string } };
  brand?: { goldSoftHex?: string; creamHex?: string; inkHex?: string };
};

export default function HeroArchitecturalAerial({
  city = "{{CITY}}",
  established = "{{ESTABLISHED_YEAR}}",
  eyebrow,
  leftWord = "Design",
  middleWord = "Build",
  rightWord = "Live",
  italicAccent = "bespoke outdoor architecture, built once, built right.",
  subcopy = "A small studio of master craftsmen delivering end-to-end commissioned outdoor builds — concept through install — for {{SERVICE_AREA}}.",
  primaryCta = { label: "Start a Project", href: "#contact" },
  secondaryCta = { label: "View the Portfolio", href: "#portfolio" },
  studioCard = {
    eyebrow: "The Studio",
    tagline: "Craftsmanship, unrushed.",
    left: { label: "Commissioned since", value: "{{YEAR}}" },
    right: { label: "Projects delivered", value: "{{PROJECTS}}+" },
  },
  brand = { goldSoftHex: "#D4B26B", creamHex: "#F7F2E8", inkHex: "#111111" },
}: Props) {
  const derivedEyebrow = eyebrow ?? `${established} / ${city}`;
  const gold = brand.goldSoftHex ?? "#D4B26B";
  const cream = brand.creamHex ?? "#F7F2E8";

  return (
    <section className="relative min-h-[720px] flex items-end pb-24 pt-40 overflow-hidden placeholder-architectural">
      <div className="photo-overlay" />
      <div className="relative z-10 max-w-[1240px] mx-auto px-7 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <p className="mb-5 text-[12px] font-semibold tracking-[0.24em] uppercase" style={{ color: gold }}>
            {derivedEyebrow}
          </p>
          <h1 className="font-display font-medium" style={{ color: cream, fontSize: "clamp(28px, 5vw, 50px)", lineHeight: 1.2 }}>
            {city} Outdoor Living:
          </h1>
          <h2
            className="font-display font-bold mt-2 mb-6"
            style={{ color: cream, fontSize: "clamp(40px, 7vw, 74px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            {leftWord}{" "}
            <span className="italic-accent" style={{ color: gold, fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic" }}>
              &middot;
            </span>{" "}
            {middleWord}{" "}
            <span className="italic-accent" style={{ color: gold, fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic" }}>
              &middot;
            </span>{" "}
            {rightWord}
          </h2>
          <p
            className="italic-accent mb-8 max-w-xl"
            style={{ color: gold, fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", fontSize: "clamp(22px, 2vw, 32px)", lineHeight: 1.2 }}
          >
            {italicAccent}
          </p>
          <p className="text-[18px] max-w-xl mb-10" style={{ color: "rgba(247,242,232,0.85)", lineHeight: 1.6 }}>
            {subcopy}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
            </a>
            <a href={secondaryCta.href} className="btn btn-ghost-light">
              {secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:block">
          <div className="p-8 rounded-[6px] shadow-hero-card border border-[rgba(247,242,232,0.1)]" style={{ background: "rgba(10,10,10,0.8)", backdropFilter: "blur(6px)" }}>
            <p className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: gold }}>
              {studioCard.eyebrow}
            </p>
            <p className="italic-accent mb-5" style={{ color: cream, fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", fontSize: "22px", lineHeight: 1.2 }}>
              {studioCard.tagline}
            </p>
            <div className="flex items-center justify-between border-t border-[rgba(247,242,232,0.1)] pt-5">
              {[studioCard.left, studioCard.right].map((stat, idx) => (
                <div key={stat.label} className={idx === 1 ? "text-right" : ""}>
                  <p className="text-[11px] uppercase tracking-[0.2em] mb-1" style={{ color: "rgba(247,242,232,0.5)" }}>
                    {stat.label}
                  </p>
                  <p className="text-[32px] font-bold leading-none" style={{ color: cream }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
