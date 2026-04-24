/**
 * Hero — full-bleed dark photo hero with red diagonal slash bg + inline 6-field
 * quote form in the right rail. THIS IS HOOK'S SIGNATURE MOVE for contractor sites.
 *
 * Left rail  : H1 uppercase 55/800, reassurance bullets, red + dark CTAs,
 *              Google-rating + assoc trust pills at bottom.
 * Right rail : floating white card form (First/Last/Phone/Email/Message + TCPA).
 *
 * Desktop: 2-col. Mobile: stack, form drops under.
 */
export default function Hero() {
  const bullets = [
    "Local Family Owned",
    "Workmanship Guaranteed",
    "Upfront Pricing",
    "On-Time Service",
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Red diagonal slash background */}
      <div className="slash-red" />
      {/* Darker overlay to lift white text */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div className="container-1200 relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 py-16 lg:py-24">
        {/* Left rail */}
        <div className="flex flex-col gap-6 text-brand-white">
          <h1 className="text-[42px] md:text-[55px] leading-[1.05] md:leading-[66px] font-display font-extrabold uppercase">
            {"{{HERO_H1 — Roofing & Exterior Services in {{CITY}}, {{STATE}}}}"}
          </h1>
          <p className="text-body-base text-brand-white/90 max-w-lg">
            {"{{HERO_SUBCOPY — Storm-tough roofs. Lifetime workmanship guarantee. Free 19-point inspection.}}"}
          </p>

          <ul className="space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-brand-white/90">
                <span className="text-brand-red text-xl leading-none">✓</span>
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 flex-wrap">
            <a href="#quote" className="btn btn-primary">Book Now</a>
            <a href="tel:2813502327" className="btn btn-dark">Call 281-350-2327</a>
          </div>

          {/* Trust cluster — Google rating + associations */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white rounded-md px-3 py-2 text-brand-ink font-display font-bold text-sm uppercase">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center font-bold text-xs">G</span>
              <span className="text-brand-red">★★★★★</span>
              <span>5.0</span>
            </div>
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-brand-gray-soft border-2 border-white"
                  aria-label="Customer avatar placeholder"
                />
              ))}
            </div>
            <span className="text-white/80 text-sm">{"{{REVIEW_COUNT}}+ 5-star reviews"}</span>
          </div>
        </div>

        {/* Right rail — Inline quote form card. Hook's signature move. */}
        <div id="quote" className="bg-brand-white rounded-xl shadow-quote-form p-6 md:p-8">
          <div className="mb-4">
            <div className="inline-block bg-brand-red text-brand-white px-3 py-1 text-xs font-display font-bold uppercase rounded-sm">
              Get a quote
            </div>
            <h3 className="text-2xl font-display font-extrabold uppercase text-brand-ink mt-3">
              Contact Us
            </h3>
          </div>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="text" placeholder="First Name" required />
              <input className="input" type="text" placeholder="Last Name" required />
            </div>
            <input className="input" type="tel" placeholder="Phone Number" required />
            <input className="input" type="email" placeholder="Email Address" required />
            <textarea className="input" placeholder="Message" rows={3} />
            <label className="flex items-start gap-2 text-xs text-brand-gray-text leading-tight">
              <input type="checkbox" className="mt-1" required />
              <span>
                By submitting, you consent to receive SMS from {"{{BRAND_NAME}}"}. Msg &amp; data
                rates may apply. Reply STOP to unsubscribe.{" "}
                <a href="#" className="underline">Privacy Policy</a> &amp;{" "}
                <a href="#" className="underline">Terms</a>.
              </span>
            </label>
            <button type="submit" className="btn btn-primary w-full">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
