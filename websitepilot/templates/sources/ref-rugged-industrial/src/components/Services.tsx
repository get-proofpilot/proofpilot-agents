const SERVICES = [
  { title: 'Garage Floor Coatings', body: 'Transforming your garage into a clean, attractive, and highly durable space is easier than you think.' },
  { title: 'Commercial Concrete', body: 'Heavy-traffic coatings for warehouses, showrooms, and industrial facilities.' },
  { title: 'Patio Coatings', body: 'Outdoor surfaces that resist UV, weather, and foot-traffic while staying slip-safe.' },
  { title: 'Basement Floors', body: 'Seal, brighten, and waterproof-ready finishes for finished or utility basements.' },
  { title: 'Concrete Coatings', body: 'Our flagship polyaspartic system — one day installation, 15-year structural warranty.' },
  { title: 'Epoxy Floors', body: 'Custom flake + chip systems in any color palette you can dream up.' },
  { title: 'Pool Deck Coatings', body: 'Cool-to-touch, barefoot-friendly textures built to outlast the warranty.' },
  { title: 'Resin Stone', body: 'Seamless decorative natural-stone aggregate systems for showpiece surfaces.' },
  { title: 'Rubber Stone', body: 'Impact-absorbing surfaces ideal for pool surrounds, decks, and play areas.' },
];

function IconCoating() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 8h32v26H8z" fill="none" stroke="#0071BA" strokeWidth="2.5" />
      <path d="M14 14h20v14H14z" fill="#0071BA" opacity="0.25" />
      <rect x="18" y="38" width="12" height="4" fill="#0071BA" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative section-pad rugged-ink-texture">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">What We Do</div>
          <h2 className="section-headline section-headline--light">Our Concrete Floor Coating Services</h2>
          <p className="font-body text-white/75 text-[15px] md:text-base max-w-2xl mx-auto mt-4">
            Every job is installed by our W-2 crew &mdash; no subcontractors, no shortcuts, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group bg-ink-deep border border-white/10 rounded-[4px] p-6 md:p-7 hover:border-concrete transition-colors"
            >
              <div className="mb-5 w-14 h-14 bg-white/5 rounded-[4px] grid place-items-center">
                <IconCoating />
              </div>
              <h3 className="card-headline mb-3">{s.title}</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed">{s.body}</p>
              <a href="#" className="inline-flex items-center gap-2 mt-5 font-display font-bold uppercase tracking-wide text-xs text-white group-hover:text-concrete">
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
