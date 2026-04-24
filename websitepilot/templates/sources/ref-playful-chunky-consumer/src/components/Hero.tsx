export default function Hero() {
  return (
    <section id="home" className="hero-surface">
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <h1 className="display-hero text-white">
              {/* {{HERO-H1}} */}
              Top Rated Holiday Lighting in the East Valley
            </h1>
            <p className="display-eyebrow text-brand-primary mt-6">
              {/* {{HERO-SUB}} */}
              Let&rsquo;s light up your holidays and make this season unforgettable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="btn-primary btn-xl">Get a Fast Quote</a>
              <a href="tel:{{PHONE-RAW}}" className="btn-ghost-light">
                Call {/* {{PHONE-DISPLAY}} */}555-000-0000
              </a>
            </div>
          </div>

          {/* Inline quote card — the Santa Banana signature right-rail form */}
          <aside className="lg:col-span-2 bg-white/[0.04] border border-white/10 rounded-card p-6 backdrop-blur-sm">
            <div className="kicker text-brand-primary">Free Quote</div>
            <h3 className="font-sans font-black uppercase text-white text-2xl mt-1">
              No Obligations &mdash; Just a Free Quote
            </h3>
            <form className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-btn border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-primary"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-btn border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-primary"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full rounded-btn border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-brand-primary"
              />
              <button type="button" className="btn-primary w-full btn-xl">
                Get a Fast Quote
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
