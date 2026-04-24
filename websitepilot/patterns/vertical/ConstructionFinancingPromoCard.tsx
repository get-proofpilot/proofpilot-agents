/**
 * ConstructionFinancingPromoCard — standalone 0% financing promo card with partner brand.
 *
 * Source: https://youngconstructionnorthiowa.com (Young Construction, NIA)
 * Signature move: a single full-width section devoted JUST to financing,
 * not buried in a "why choose us" grid. Layout: LEFT = oversized "0%
 * Financing Available" headline + finance partner logo (Service Finance,
 * GreenSky, Synchrony, Hearth, Wisetack), RIGHT = 1-paragraph what-it-
 * covers + apply-now CTA. Visual treatment uses brand color block backing
 * to make it feel like a card, not a band. Anchors the financing
 * conversation as a real product offering, not a footnote.
 *
 * WHEN TO USE:
 *  - Roofing / construction / HVAC / solar / large-ticket trades
 *    (>$5K average job) where financing materially expands the buyer pool
 *  - Brands with a real finance partner whose logo carries weight
 *  - Heritage / contractor-heritage / rugged-industrial presets where
 *    financing positions the brand as serious about big jobs
 *
 * WHEN NOT TO USE:
 *  - Sub-$1K services (cleaning, junk removal) — financing is overkill
 *  - Brands without a real finance partner — generic "we offer financing"
 *    text reads weak
 *  - Premium / design-build presets where price-talk hurts the aesthetic
 */
type Props = {
  eyebrow?: string;
  headline?: string;            // "0% Financing Available"
  body?: string;
  partnerName?: string;         // "Service Finance", "Synchrony", etc.
  partnerLogoUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  disclosures?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; cardBg?: string; accent?: string };
};

export default function ConstructionFinancingPromoCard({
  eyebrow = "Financing",
  headline = "0% APR Financing Available",
  body = "Big projects shouldn't have to wait. Spread your roof, siding, or window investment over 12, 24, or 60 months — with no money down and no hidden fees.",
  partnerName = "Service Finance Company",
  partnerLogoUrl = "/finance/service-finance-logo.png",
  ctaLabel = "Check My Rate",
  ctaHref = "/financing",
  disclosures = "Subject to credit approval. Minimum monthly payments required. Promotion period varies by plan. See partner for details.",
  brand = { ink: "#0A2540", primary: "#0A4DA8", primaryInk: "#FFFFFF", surface: "#F4F7FB", cardBg: "#FFFFFF", accent: "#15803D" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#0A4DA8";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F4F7FB";
  const cardBg = brand.cardBg ?? "#FFFFFF";
  const accent = brand.accent ?? "#15803D";

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
        <div
          className="rounded-[16px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative"
          style={{ background: cardBg, boxShadow: "0 18px 56px rgba(10,37,64,0.10)" }}
        >
          {/* Left: brand color block + headline */}
          <div
            className="lg:col-span-7 p-8 md:p-12 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${primary} 0%, ${ink} 100%)`, color: primaryInk }}
          >
            {/* Decorative big % */}
            <span
              aria-hidden
              className="absolute select-none pointer-events-none font-display font-bold"
              style={{
                top: "-12%",
                right: "-4%",
                fontSize: "clamp(180px, 22vw, 320px)",
                lineHeight: 1,
                color: "rgba(255,255,255,0.08)",
              }}
            >
              %
            </span>
            <div className="relative">
              <p
                className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4 opacity-85"
              >
                {eyebrow}
              </p>
              <h2
                className="font-display font-bold mb-5"
                style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.0, letterSpacing: "-0.025em" }}
              >
                {headline}
              </h2>
              <p className="text-[16px] md:text-[17px] opacity-90 max-w-md mb-8">{body}</p>
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
                style={{ background: accent, color: primaryInk }}
              >
                {ctaLabel}
              </a>
            </div>
          </div>

          {/* Right: partner brand */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.22em] uppercase mb-4 opacity-70">
                Powered By
              </p>
              <div
                className="rounded-[12px] p-6 flex items-center justify-center"
                style={{ background: surface, minHeight: 120 }}
              >
                {partnerLogoUrl ? (
                  <img
                    src={partnerLogoUrl}
                    alt={partnerName}
                    className="max-w-full max-h-16 w-auto h-auto object-contain"
                  />
                ) : (
                  <p className="text-[18px] font-bold">{partnerName}</p>
                )}
              </div>
              <p className="text-[14px] mt-5 opacity-80">
                Pre-qualify in 60 seconds with a soft credit pull. Won't affect your score.
              </p>
            </div>
            {disclosures && (
              <p className="text-[11px] opacity-60 leading-snug mt-6">{disclosures}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
