/**
 * RoofingSignatureSystem — branded proprietary-process card.
 *
 * Source: https://owlroofing.com ("Protect Your Nest" System + Get It Right Guarantee)
 * Signature move: a named, trademarked-feeling "system" card that packages the
 * brand's unique process into a memorable asset. Bundled under it: a numbered
 * cleanup / QC sub-process and a proprietary-named guarantee. The brand
 * metaphor (nest, paws, whatever) is woven into every step name.
 *
 * WHEN TO USE:
 *  - Roofing / HVAC / plumbing brands that do comparable work to competitors
 *    but want to SOUND different. A named system creates perceived uniqueness
 *    from a common workflow.
 *  - Brands with a strong mascot, metaphor, or identity concept that can
 *    extend naturally into sub-step names.
 *  - Pages that need a "proof" block that isn't reviews or stats.
 *
 * WHEN NOT TO USE:
 *  - Brand has no distinctive metaphor / mascot — the step names will feel
 *    hollow ("Our Premium Blue Process").
 *  - Industries where over-named processes read as gimmicky (premium
 *    design-build, architectural).
 */
type SystemStep = {
  n: string;
  title: string;
  body: string;
};

type Props = {
  eyebrow?: string;
  systemName?: string;
  systemTagline?: string;
  systemBody?: string;
  steps?: SystemStep[];
  guaranteeTitle?: string;
  guaranteeBody?: string;
  ctaLabel?: string;
  ctaHref?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; accent?: string };
};

export default function RoofingSignatureSystem({
  eyebrow = "The {{BRAND_METAPHOR}} System",
  systemName = "Protect Your {{METAPHOR_NOUN}}",
  systemTagline = "A smarter way to {{VERB}} — because your home deserves nothing less.",
  systemBody = "Our proprietary system keeps your home covered at every stage of your project. From setup through cleanup through aftercare, each step works together so nothing is left to chance.",
  steps = [
    {
      n: "01",
      title: "First-Pass Protection",
      body: "We shield your siding, landscaping, and outdoor spaces before a single nail is pulled.",
    },
    {
      n: "02",
      title: "Three-Part Cleanup",
      body: "Crew pass one. Magnet pass two. PM quality check. No nails left behind.",
    },
    {
      n: "03",
      title: "Aftercare Kit",
      body: "Leftover materials secured in a weather-protected kit so repairs later are instant.",
    },
  ],
  guaranteeTitle: guaranteeTitleProp,
  guaranteeBody = "There will occasionally be bumps in any project — what's important is you know your contractor will make it right. We either get it right the first time, or we make it right every time. That's the promise.",
  ctaLabel = "Learn About the System",
  ctaHref = "#process",
  brand = {
    ink: "#14242E",
    primary: "#D8A53B",
    primaryInk: "#14242E",
    surface: "#F7F4EE",
    accent: "#8E6C2D",
  },
}: Props) {
  const ink = brand.ink ?? "#14242E";
  const primary = brand.primary ?? "#D8A53B";
  const primaryInk = brand.primaryInk ?? "#14242E";
  const surface = brand.surface ?? "#F7F4EE";
  const accent = brand.accent ?? "#8E6C2D";
  const guaranteeTitle = guaranteeTitleProp ?? 'The "Get It Right" Guarantee';

  return (
    <section className="py-20 md:py-28" style={{ background: surface, color: ink }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* System intro */}
        <div className="max-w-3xl mb-14">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.025em" }}
          >
            {systemName}
          </h2>
          <p className="italic text-xl md:text-2xl leading-snug mb-6" style={{ color: accent }}>
            {systemTagline}
          </p>
          <p className="text-lg opacity-80 max-w-2xl leading-relaxed">{systemBody}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative rounded-[6px] p-8 border"
              style={{
                background: "#FFFFFF",
                borderColor: "rgba(0,0,0,0.06)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              }}
            >
              <span
                className="absolute -top-5 left-6 px-3 py-1 text-[13px] font-bold tracking-[0.18em]"
                style={{ background: primary, color: primaryInk }}
              >
                {step.n}
              </span>
              <h3 className="text-[22px] font-bold mt-3 mb-3">{step.title}</h3>
              <p className="text-[15px] leading-relaxed opacity-75">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div
          className="rounded-[6px] p-8 md:p-10 flex flex-col md:flex-row items-start gap-6"
          style={{ background: ink, color: surface }}
        >
          <div
            className="shrink-0 w-20 h-20 rounded-full flex items-center justify-center font-bold text-[22px]"
            style={{ background: primary, color: primaryInk }}
            aria-hidden
          >
            ✓
          </div>
          <div className="flex-1">
            <h3 className="text-[22px] font-bold mb-3">{guaranteeTitle}</h3>
            <p className="text-[16px] leading-relaxed opacity-85 mb-5">{guaranteeBody}</p>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: primary }}
            >
              {ctaLabel} <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
