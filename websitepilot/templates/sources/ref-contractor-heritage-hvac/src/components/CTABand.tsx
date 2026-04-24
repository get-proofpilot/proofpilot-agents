/**
 * CTABand — final conversion band before the footer.
 * Carries the contractor-heritage red diagonal slash motif on the left,
 * mirrors the hero quote form on a red card, and lands a final two-paragraph
 * trust beat about HVAC service in {{CITY}}.
 *
 * Mandatory part of the rhythm: a returning visitor who skipped the hero
 * form should still hit a form before the footer.
 */
export default function CTABand() {
  return (
    <section className="relative section-dark overflow-hidden">
      <div className="slash-red-left opacity-30" />
      <div className="container-1200 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
        {/* Quote form */}
        <div className="bg-brand-red/95 rounded-card p-6 md:p-8 text-brand-white">
          <h3 className="text-2xl font-display font-extrabold uppercase mb-4">Book Your Service</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="text" placeholder="First Name" required />
              <input className="input" type="text" placeholder="Last Name" required />
            </div>
            <input className="input" type="tel" placeholder="Phone Number" required />
            <input className="input" type="email" placeholder="Email Address" required />
            <select className="input" defaultValue="">
              <option value="" disabled>
                What can we help with?
              </option>
              <option>No Heat / Furnace Repair</option>
              <option>No Cool / AC Repair</option>
              <option>New System Quote</option>
              <option>Indoor Air Quality</option>
              <option>Maintenance / Tune-Up</option>
            </select>
            <textarea className="input" placeholder="Message" rows={3} />
            <button type="submit" className="btn btn-white w-full">
              Request Service
            </button>
          </form>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-h2-desktop uppercase">
            {"{{BAND_HEADING — Trusted HVAC Service in {{CITY}}, {{STATE}}}}"}
          </h2>
          <p className="text-body-base text-brand-white/90">
            {"{{BAND_PARAGRAPH_1}}"} — A broken furnace or dead AC never waits for a convenient
            moment, which is why having a heating-and-cooling team you can actually reach makes
            all the difference. We deliver expert HVAC repair, replacement, and tune-up service
            built to keep your home comfortable through every season {"{{CITY}}"} throws at it.
          </p>
          <p className="text-body-base text-brand-white/90">
            {"{{BAND_PARAGRAPH_2}}"} — Homeowners across {"{{CITY}}"} count on us because we bring
            skill, care, and a customer-first mindset to every job — from a $89 tune-up to a full
            system replacement with financing.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#quote" className="btn btn-primary">
              Get A Free Quote
            </a>
            <a href="tel:5555555555" className="btn btn-white">
              {"{{PHONE_NUMBER}}"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
