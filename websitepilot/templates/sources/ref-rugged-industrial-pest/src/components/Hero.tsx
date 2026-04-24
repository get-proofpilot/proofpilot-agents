type Props = {
  eyebrow?: string;
  headlineLead?: string;
  headlineAccent?: string;
  headlineTrail?: string;
  subhead?: string;
  imageUrl?: string;
};

export default function Hero({
  eyebrow = '#1 Rated Pest Control In The [METRO] Area',
  headlineLead = 'Same-Day',
  headlineAccent = 'Pest Control',
  headlineTrail = 'Pet-Safe & Family-Safe.',
  subhead = 'Scorpions, spiders, termites, ants — we handle the desert\'s worst with bi-monthly service that actually keeps them gone. 100% satisfaction guaranteed.',
  imageUrl = '/placeholder-pest-hero.svg',
}: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      {/* Full-bleed photo with dark-biased overlay (Tagg 102-degree formula). */}
      <div className="absolute inset-0">
        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-diagonal-slash opacity-80" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 lg:px-14 pt-12 md:pt-20 pb-16 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-block bg-concrete px-4 py-2 mb-5">
              <span className="eyebrow text-white">{eyebrow}</span>
            </div>
            <h1 className="display-headline text-white">
              {headlineLead} <span className="accent">{headlineAccent}</span> {headlineTrail}
            </h1>
            <p className="mt-6 max-w-xl font-body text-white/85 text-[16px] md:text-[17px] leading-relaxed">
              {subhead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#quote" className="btn-rugged">Get a Free Quote</a>
              <a href="tel:" className="btn-rugged btn-rugged--ghost">(000) 000-0000</a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-white/80 font-body text-sm">
              <div className="flex items-center gap-1 text-caution">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1l2.6 6 6.4.6-4.9 4.4 1.5 6.5L10 15.8 4.4 18.5l1.5-6.5L1 7.6 7.4 7z" />
                  </svg>
                ))}
              </div>
              <span className="font-display font-bold tracking-wide uppercase">5.0 · 200+ Google Reviews</span>
            </div>
          </div>

          {/* Inline quick-quote card — Tagg signature above-the-fold. */}
          <div className="lg:col-span-5">
            <form id="quote" className="bg-white rounded-[4px] p-6 md:p-7 shadow-card border-t-4 border-concrete">
              <h2 className="font-display font-black text-ink text-xl md:text-2xl uppercase tracking-tight leading-tight">
                Get Your Free Quote Today
              </h2>
              <p className="font-body text-text-body text-sm mt-1">Takes less than 60 seconds.</p>
              <div className="grid grid-cols-1 gap-3 mt-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-steel border border-transparent focus:border-concrete rounded-[4px] px-4 py-3 font-body text-sm outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-steel border border-transparent focus:border-concrete rounded-[4px] px-4 py-3 font-body text-sm outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-steel border border-transparent focus:border-concrete rounded-[4px] px-4 py-3 font-body text-sm outline-none"
                />
                <select
                  className="bg-steel border border-transparent focus:border-concrete rounded-[4px] px-4 py-3 font-body text-sm outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>Service Needed</option>
                  <option>General Pest Control</option>
                  <option>Scorpion Control</option>
                  <option>Termite Inspection / Treatment</option>
                  <option>Rodent Control</option>
                  <option>Commercial</option>
                </select>
                <button type="submit" className="btn-rugged w-full mt-2">
                  Request My Free Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
