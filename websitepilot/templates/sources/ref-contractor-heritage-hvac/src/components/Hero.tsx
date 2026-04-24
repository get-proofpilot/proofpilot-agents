/**
 * Hero — HVAC-vertical hero composed of two parts:
 *   1. <HvacBrandedVanHero /> — the company branded van as primary visual,
 *      themed in red+ink+blue. The pattern is documented at
 *      ../../../patterns/vertical/HvacBrandedVanHero.tsx.
 *   2. Inline quote form band — a brand-red form card sitting directly under
 *      the van so undecided visitors can convert in the same scroll.
 *
 * Why the form lives here (not just in DarkContactBand): contractor-heritage
 * DNA always anchors the hero with an inline quote form (Hook signature move).
 * The HvacBrandedVanHero pattern is van-only by design, so we wrap it so the
 * combined block reads as a single "hero" to the visitor.
 *
 * Tokens follow the contractor-heritage HVAC palette — red for primary CTA,
 * comfort-blue (#1976D2) appears in the value-prop strip via the HVAC pattern.
 */
import HvacBrandedVanHero from "./HvacBrandedVanHero";

export default function Hero() {
  return (
    <>
      <HvacBrandedVanHero
        eyebrow="Welcome to {{BRAND_NAME}}"
        headline="{{HERO_H1 — Heating, Cooling & Indoor Air Quality in {{CITY}}, {{STATE}}}}"
        subhead="{{HERO_SUBCOPY — Family-owned HVAC since {{YEAR_FOUNDED}}. Upfront pricing, on-time arrivals, and one-hour appointment windows because your time matters.}}"
        primaryCta={{ label: "Get A Free Quote", href: "#quote" }}
        secondaryCta={{ label: "{{PHONE_NUMBER}}", href: "tel:5555555555" }}
        valueProps={[
          { icon: "🔥", label: "Heating Repair & Install" },
          { icon: "❄️", label: "AC Service & New Systems" },
          { icon: "🌬️", label: "Indoor Air Quality" },
          { icon: "⏰", label: "1-Hour Arrival Windows" },
        ]}
        brand={{
          ink: "#231F20",
          primary: "#EF3E33",
          primaryInk: "#FFFFFF",
          backdrop: "#F4F6F8",
          onDark: "#FFFFFF",
        }}
      />

      {/* Inline quote form band — direct extension of the van hero */}
      <section id="quote" className="relative overflow-hidden bg-brand-ink text-brand-white">
        <div className="container-1200 relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 py-14 lg:py-20">
          <div className="flex flex-col gap-5 justify-center">
            <span className="inline-block bg-brand-red text-brand-white px-3 py-1 text-xs font-display font-bold uppercase rounded-sm w-fit">
              Get A Free Quote
            </span>
            <h2 className="text-h2-desktop uppercase leading-[1.05]">
              {"{{QUOTE_HEADING — Comfort starts with a free, no-pressure quote.}}"}
            </h2>
            <p className="text-body-base text-brand-white/85 max-w-lg">
              {"{{QUOTE_SUBCOPY — Tell us what's going on with your system. A real {{CITY}} dispatcher reads every form and texts back within 30 minutes during business hours.}}"}
            </p>
            <ul className="space-y-2 mt-2">
              {[
                "Free in-home estimates on new systems",
                "Workmanship guaranteed in writing",
                "Locally owned, never sold to private equity",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2 text-brand-white/90">
                  <span className="text-brand-red text-xl leading-none">✓</span>
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-white rounded-xl shadow-quote-form p-6 md:p-8 text-brand-ink">
            <h3 className="text-2xl font-display font-extrabold uppercase mb-4">
              Tell Us About Your Job
            </h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <input className="input" type="text" placeholder="First Name" required />
                <input className="input" type="text" placeholder="Last Name" required />
              </div>
              <input className="input" type="tel" placeholder="Phone Number" required />
              <input className="input" type="email" placeholder="Email Address" required />
              <select className="input" defaultValue="" required>
                <option value="" disabled>
                  Service Type
                </option>
                <option>Heating — Repair</option>
                <option>Heating — Install</option>
                <option>Cooling — Repair</option>
                <option>Cooling — Install</option>
                <option>Indoor Air Quality</option>
                <option>Maintenance / Tune-Up</option>
              </select>
              <textarea className="input" placeholder="Tell us what's going on" rows={3} />
              <label className="flex items-start gap-2 text-xs text-brand-gray-text leading-tight">
                <input type="checkbox" className="mt-1" required />
                <span>
                  By submitting, you consent to receive SMS from {"{{BRAND_NAME}}"}. Msg &amp; data
                  rates may apply. Reply STOP to unsubscribe.{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>{" "}
                  &amp;{" "}
                  <a href="#" className="underline">
                    Terms
                  </a>
                  .
                </span>
              </label>
              <button type="submit" className="btn btn-primary w-full">
                Send My Free Quote Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
