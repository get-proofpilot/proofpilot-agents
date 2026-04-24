/**
 * MidCTABand — Pest pricing simplicity variant.
 *
 * Shows the bi-monthly price as a single oversized number with the
 * "what's included" promise inline. Pest buyers in the Phoenix-belt
 * convert better when the recurring price is upfront — no discovery
 * call required to learn the bi-monthly rate.
 */
export default function MidCTABand() {
  return (
    <section className="rugged-ribbon text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 md:py-14 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 text-center md:text-left">
        <div className="leading-none">
          <div className="font-display font-black text-[64px] md:text-[88px] leading-[0.85]">$X</div>
          <div className="font-display font-semibold uppercase text-[11px] tracking-[0.18em] mt-2 text-white/85">Bi-Monthly Service</div>
        </div>
        <div>
          <h2 className="font-display font-black uppercase text-2xl md:text-3xl leading-tight">
            One Flat Price. Free Re-Treats Between Visits.
          </h2>
          <p className="font-body text-white/85 text-sm md:text-base mt-2">
            Interior + exterior + perimeter every visit. No upcharges, no surprise add-ons, no contracts longer
            than a year. Cancel anytime &mdash; though most families stay 5+ years.
          </p>
        </div>
        <a href="#quote" className="btn-rugged btn-rugged--ink whitespace-nowrap">
          Get My Bi-Monthly Quote
        </a>
      </div>
    </section>
  );
}
