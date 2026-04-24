/**
 * PhilosophyStatement — centered long-form philosophy paragraph with a single
 * italic pull-line. Replaces the "services grid" entry point in the
 * premium-design-build preset. No cards, no icons, just voice.
 */
type Props = {
  eyebrow?: string;
  heading?: string;
  italicPullLine?: string;
  body?: string[];
  brand?: { goldHex?: string };
};

export default function PhilosophyStatement({
  eyebrow = "Our Philosophy",
  heading = "Outdoor architecture, not landscaping.",
  italicPullLine = "We build one project at a time — the way it used to be done.",
  body = [
    "Every stone, every grade line, every low-voltage fixture is resolved in drawing before it meets the site. Our crew installs what our studio drafted — no subcontractor telephone, no value-engineered substitutions. This is slower. It is also the reason our work is still crisp after a decade of freeze-thaw.",
    "We take on six residential commissions a year and two commercial campuses. If the fit is right, we'd love to hear about yours.",
  ],
  brand = { goldHex: "#B08A3E" },
}: Props) {
  const gold = brand.goldHex ?? "#B08A3E";
  return (
    <section className="py-28 bg-[var(--brand-cream,#F7F2E8)]">
      <div className="max-w-[820px] mx-auto px-7 text-center">
        <p className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-6" style={{ color: gold }}>
          {eyebrow}
        </p>
        <h2
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, color: "#111" }}
        >
          {heading}
        </h2>
        <p
          className="italic-accent mb-10"
          style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: gold, fontSize: "clamp(22px, 2.5vw, 32px)", lineHeight: 1.25, fontWeight: 400 }}
        >
          {italicPullLine}
        </p>
        {body.map((p, i) => (
          <p key={i} className="text-[18px] mb-6 last:mb-0" style={{ color: "#2A2A28", lineHeight: 1.6 }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
