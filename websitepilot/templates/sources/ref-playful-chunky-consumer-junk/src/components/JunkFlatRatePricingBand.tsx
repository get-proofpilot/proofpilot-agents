/**
 * JunkFlatRatePricingBand — "Starting at $X" transparent pricing band.
 *
 * Source pattern: patterns/vertical/GarageFlatRatePricingHero.tsx
 *   (originally extracted from prolinedoorservice.com).
 *
 * Adapted for the JUNK-REMOVAL vertical and for the playful-chunky DNA:
 *   - In a junk page the inline-quote-form is already the hero, so this
 *     pattern lives MID-page as a transparent "starting at" band rather
 *     than the hero itself.
 *   - 5px-radius chunky rectangle treatment (not pills).
 *   - Yellow + navy palette + a lime "GO" stamp on the headline price
 *     for go-energy.
 *
 * The shareable-price moves trust forward in junk — competitors hide it,
 * so naming a starting-at number wins.
 */

type PriceRow = {
  label: string;
  price: string;
  prefix?: string;
  note?: string;
};

const ROWS: PriceRow[] = [
  {
    label: "Single Item Pickup",
    price: "$89",
    prefix: "Starting at",
    note: "Couch, mattress, treadmill — one-and-done.",
  },
  {
    label: "Pickup-Truck Load",
    price: "$199",
    prefix: "Starting at",
    note: "Garage clear-out, basement, yard waste.",
  },
  {
    label: "Half-Truck Load",
    price: "$329",
    prefix: "Starting at",
    note: "Full-room cleanout, attic purge, small reno.",
  },
  {
    label: "Full-Truck Load",
    price: "$549",
    prefix: "Starting at",
    note: "Whole-house worth — we bring two crew + the big rig.",
  },
];

export default function JunkFlatRatePricingBand() {
  return (
    <section className="section-dark relative">
      <div className="lights-divider absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="kicker text-brand-go">Flat-Rate Pricing</div>
            <h2 className="display-h1 text-white mt-3">
              {/* {{PRICING-H2}} */}
              Real Numbers. Up Front. No Surprise Bills.
            </h2>
            <p className="mt-5 text-brand-onDarkMuted text-[17px] leading-relaxed">
              {/* {{PRICING-P}} */}
              Most competitors won't tell you a price till they're standing in your driveway. We will. Pick the size that matches your pile — your quote starts here.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#quote" className="btn-primary btn-xl">
                Get My Exact Quote
              </a>
              <a href="tel:{{PHONE-RAW}}" className="btn-ghost-light">
                {/* {{PHONE-DISPLAY}} */}Call 555-000-0000
              </a>
            </div>
            <p className="mt-5 text-[13px] text-brand-onDarkMuted/80">
              All-in pricing — labor, hauling, and dump fees included.
            </p>
          </div>

          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
            {ROWS.map((r) => (
              <li
                key={r.label}
                className="rounded-card border-2 border-white/10 bg-white/[0.04] p-5 hover:border-brand-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="kicker text-brand-primary">{r.prefix ?? "Starting at"}</div>
                  <span className="pill-go">FLAT</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-sans font-black uppercase text-white text-[44px] leading-none tabular-nums">
                    {r.price}
                  </span>
                </div>
                <h3 className="tile-title text-white mt-3">{r.label}</h3>
                {r.note && (
                  <p className="mt-2 text-brand-onDarkMuted text-[14px] leading-relaxed">
                    {r.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lights-divider absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
