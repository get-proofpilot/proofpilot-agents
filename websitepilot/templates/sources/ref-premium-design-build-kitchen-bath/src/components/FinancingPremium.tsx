/**
 * FinancingPremium — adapted from `vertical/ConstructionFinancingPromoCard.tsx`
 * and `contractor-heritage/FinancingCallout.tsx`, normalized to the editorial
 * preset.
 *
 * The signature stays: a single section devoted only to financing — not
 * buried in a benefits grid. But everything that reads "trade-y" in the
 * source patterns (red gradient slash, oversized %, partner logo block) is
 * dialed back. Here we get a black-on-cream split card, italic-Fraunces
 * accent, gold CTA, and tasteful disclosure copy.
 *
 * Kitchen/bath specifics: "up to 60 months" framing, partner reads as
 * "{{FINANCE_PARTNER_NAME}}" placeholder so studios can drop in Hearth,
 * GreenSky, Wisetack, Synchrony, etc.
 */
export default function FinancingPremium() {
  return (
    <section className="section section-warm">
      <div className="container-wide">
        <div className="rounded-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-brand-white shadow-card-lift">
          {/* Left: ink panel */}
          <div className="lg:col-span-7 section-ink p-10 md:p-14 relative overflow-hidden">
            <span
              aria-hidden
              className="absolute select-none pointer-events-none italic-accent text-brand-gold-soft/15 font-medium"
              style={{
                top: "-10%",
                right: "-5%",
                fontSize: "clamp(180px, 22vw, 320px)",
                lineHeight: 1,
              }}
            >
              %
            </span>
            <div className="relative">
              <p className="text-h4-label text-brand-gold-soft mb-4">Financing</p>
              <h2 className="text-h2-mobile md:text-h2-display text-brand-cream mb-5">
                Flexible financing,
                <br />
                <span className="italic-accent text-brand-gold-soft">up to 60 months</span>.
              </h2>
              <p className="text-body-lg text-brand-cream/85 max-w-md mb-8">
                A kitchen or bath remodel is one of the largest investments a homeowner makes.
                Spread it over 12, 36, or 60 months — competitive APRs, no money down on approved
                credit, and a soft pull that won&rsquo;t affect your score.
              </p>
              <a href="#financing" className="btn btn-primary">
                Check My Rate
              </a>
            </div>
          </div>

          {/* Right: partner card */}
          <div className="lg:col-span-5 p-10 md:p-12 flex flex-col justify-between bg-brand-cream-warm">
            <div>
              <p className="text-h4-label text-brand-ink-muted mb-4">In partnership with</p>
              <div className="rounded-card border border-brand-cream-line bg-brand-white p-8 flex items-center justify-center min-h-[140px]">
                <span className="italic-accent text-[28px] text-brand-ink">
                  &#123;&#123;FINANCE_PARTNER_NAME&#125;&#125;
                </span>
              </div>
              <p className="italic-accent text-italic-accent-sm text-brand-gold mt-6">
                pre-qualify in sixty seconds.
              </p>
              <p className="text-body-base text-brand-ink-soft mt-2">
                Soft credit pull. No impact to your credit score.
              </p>
            </div>
            <p className="text-[11px] text-brand-ink-muted leading-relaxed mt-8">
              Subject to credit approval. Minimum monthly payments required. Promotional period
              and APR vary by plan and credit profile. See {`{{FINANCE_PARTNER_NAME}}`} for full
              terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
