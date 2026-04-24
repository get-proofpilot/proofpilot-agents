/**
 * RoofingVisualizerCta — "Try Before You Buy" home-visualizer feature band.
 *
 * Source: https://veteranscontractingllc.com (EagleView / DesignEyeQ
 * visualizer integration). Also echoes patterns from Hover, Roofle, and
 * other major contractor tools.
 * Signature move: a featured band dedicated to "Try Before You Buy" — upload
 * a photo of your home, swap siding colors / shingle styles / windows in
 * an interactive tool before you commit. The CTA promises AR-ish preview
 * instead of "request a quote." Reduces buyer anxiety for major exterior
 * commitments.
 *
 * WHEN TO USE:
 *  - Roofing / siding / window / exterior remodeling brands with access to
 *    a third-party visualizer (EagleView DesignEyeQ, Roofle, Hover, GAF,
 *    Owens Corning)
 *  - Categories with high regret risk and visible-from-the-street outcome
 *  - Brands that want a differentiating mid-funnel experience
 *
 * WHEN NOT TO USE:
 *  - Emergency / repair-only services (no visualizer relevance)
 *  - Brands without a visualizer partner integration
 *  - Low-consideration impulse services (drain clean, tune-up)
 */
type SwatchPreview = {
  label: string;
  color: string;
  image?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroImage?: string;        // photo of a home ready to be "redesigned"
  swatches?: SwatchPreview[];
  partnerLogo?: string;      // e.g. DesignEyeQ / Hover logo
  partnerLabel?: string;     // "Powered by DesignEyeQ"
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string };
};

export default function RoofingVisualizerCta({
  eyebrow = "Try Before You Buy",
  heading = "See your new exterior before you commit.",
  subhead = "Upload a photo of your home, swap shingles, siding colors, and windows — all in a live visualizer. No guessing, no regrets.",
  ctaLabel = "Launch Home Visualizer",
  ctaHref = "/home-visualizer",
  heroImage = "/visualizer/sample-home.jpg",
  swatches = [
    { label: "Weathered Wood", color: "#6B5D4B" },
    { label: "Driftwood", color: "#9B8E77" },
    { label: "Onyx Black", color: "#1A1A1A" },
    { label: "Harbor Slate", color: "#4A5A6B" },
    { label: "Teak", color: "#7C4E2F" },
    { label: "Estate Grey", color: "#5D5F63" },
  ],
  partnerLogo = "/partners/eagleview-badge.svg",
  partnerLabel = "Powered by DesignEyeQ",
  brand = { ink: "#0F2C4A", primary: "#FFB703", primaryInk: "#0F2C4A", surface: "#F5F7FA" },
}: Props) {
  const ink = brand.ink ?? "#0F2C4A";
  const primary = brand.primary ?? "#FFB703";
  const primaryInk = brand.primaryInk ?? "#0F2C4A";
  const surface = brand.surface ?? "#F5F7FA";

  return (
    <section className="relative py-20 md:py-28" style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-3"
            style={{ color: primary, textShadow: "0 1px 0 rgba(0,0,0,0.15)" }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)", lineHeight: 1.06, letterSpacing: "-0.022em" }}
          >
            {heading}
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-lg">{subhead}</p>

          <a
            href={ctaHref}
            className="inline-flex items-center gap-3 px-8 py-4 text-[15px] font-bold tracking-[0.1em] uppercase rounded-[4px]"
            style={{ background: primary, color: primaryInk, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
          >
            <span aria-hidden>🏠</span>
            {ctaLabel}
          </a>

          {partnerLogo && (
            <div className="mt-8 flex items-center gap-3 opacity-80">
              <img src={partnerLogo} alt="" className="h-10 w-auto" />
              <span className="text-[13px] tracking-[0.14em] uppercase font-semibold">
                {partnerLabel}
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div
            className="relative rounded-[8px] overflow-hidden"
            style={{
              aspectRatio: "16/10",
              background: "#000",
              boxShadow: "0 30px 70px rgba(15,44,74,0.18)",
            }}
          >
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
            {/* Swatch rail */}
            <div
              className="absolute inset-x-4 bottom-4 flex items-center gap-2 p-2 rounded-[4px]"
              style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(4px)" }}
            >
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase px-2" style={{ color: ink }}>
                Shingle
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
                {swatches.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    title={s.label}
                    className="w-9 h-9 rounded-full border-2 shrink-0 transition-transform hover:scale-110"
                    style={{ background: s.color, borderColor: "rgba(0,0,0,0.2)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
