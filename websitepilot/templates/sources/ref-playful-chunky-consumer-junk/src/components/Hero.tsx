/**
 * Junk-removal Hero — character-led, deep-navy radial, twinkle-seam,
 * with a quick "we haul it / you smile" energy block on the left and a
 * compact lead-capture card on the right.
 *
 * The full multi-step intake lives in MultiStepServiceTypeIntake.tsx
 * one section below; this hero card is the express-lane (name + phone +
 * one-tap submit) for buyers who are ready to commit on first scroll.
 */
export default function Hero() {
  return (
    <section id="home" className="hero-surface">
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <span className="pill-go inline-block mb-5">
              {/* {{HERO-PILL}} */}Same-Day Pickup Available
            </span>
            <h1 className="display-hero text-white">
              {/* {{HERO-H1}} */}
              We Haul It. You Smile.
            </h1>
            <p className="display-eyebrow text-brand-primary mt-6">
              {/* {{HERO-SUB}} */}
              Furniture, garages, construction debris, estate cleanouts — one truck, one crew, one flat price.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="btn-primary btn-xl">Get Instant Quote</a>
              <a href="sms:{{PHONE-RAW}}" className="btn-ghost-light">
                📱 Text a Photo
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-brand-onDarkMuted text-[14px]">
              <span className="flex items-center gap-2">
                <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-brand-go" />
                Flat-rate pricing
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-brand-primary" />
                10-min text quote
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-brand-accent" />
                We sweep after
              </span>
            </div>
          </div>

          {/* Express-lane quote card — full multi-step form sits below the hero. */}
          <aside className="lg:col-span-2 bg-white/[0.04] border border-white/10 rounded-card p-6 backdrop-blur-sm">
            <div className="kicker text-brand-primary">Express Quote</div>
            <h3 className="font-sans font-black uppercase text-white text-2xl mt-1">
              Snap, Send, Sorted.
            </h3>
            <p className="text-brand-onDarkMuted text-[14px] mt-2">
              Drop a name + number — we'll text the quote in 10 min or less.
            </p>
            <form className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-btn border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-primary"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full rounded-btn border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-primary"
              />
              <input
                type="text"
                placeholder="What needs to go? (one line)"
                className="w-full rounded-btn border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-primary"
              />
              <button type="button" className="btn-primary w-full btn-xl">
                Text Me My Quote
              </button>
            </form>
          </aside>
        </div>
      </div>

      {/* Twinkle-light divider pinned to the bottom seam */}
      <div className="lights-divider absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}
