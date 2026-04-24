/**
 * DarkContactBand — the secondary conversion band after service cards.
 * Left: mirror of hero quote form (white card).
 * Right: H2 "TRUSTED {{SERVICE}} IN {{CITY}}" + 2 paragraphs + CTAs.
 * Red diagonal slash asset anchors the left side.
 */
export default function DarkContactBand() {
  return (
    <section className="relative section-dark overflow-hidden">
      <div className="slash-red-left opacity-30" />
      <div className="container-1200 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
        {/* Quote form */}
        <div className="bg-brand-red/95 rounded-card p-6 md:p-8 text-brand-white">
          <h3 className="text-2xl font-display font-extrabold uppercase mb-4">Get A Quote</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="text" placeholder="First Name" required />
              <input className="input" type="text" placeholder="Last Name" required />
            </div>
            <input className="input" type="tel" placeholder="Phone Number" required />
            <input className="input" type="email" placeholder="Email Address" required />
            <textarea className="input" placeholder="Message" rows={3} />
            <button type="submit" className="btn btn-white w-full">Send</button>
          </form>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-h2-desktop uppercase">
            {"{{BAND_HEADING — Trusted Plumbing Services in Spring, TX}}"}
          </h2>
          <p className="text-body-base text-brand-white/90">
            {"{{BAND_PARAGRAPH_1}}"} — Plumbing problems never wait for the right moment, which is
            why having a team you can rely on makes all the difference. We deliver expert plumbing
            maintenance, inspections, and repairs designed to protect your home and keep your
            daily routine running smoothly.
          </p>
          <p className="text-body-base text-brand-white/90">
            {"{{BAND_PARAGRAPH_2}}"} — Homeowners in {"{{CITY}}"} count on us because we bring skill,
            care, and a customer-first mindset to every job.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#quote" className="btn btn-primary">Book Now</a>
            <a href="tel:2813502327" className="btn btn-white">Call 281-350-2327</a>
          </div>
        </div>
      </div>
    </section>
  );
}
