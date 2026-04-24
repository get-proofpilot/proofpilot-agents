const SERVICES = [
  {
    title: 'General Pest Control',
    body: 'Bi-monthly perimeter + interior treatment that handles ants, spiders, crickets, roaches, earwigs, and the daily desert nuisances. Pet-safe formulas, every visit.',
  },
  {
    title: 'Scorpion Control',
    body: 'Scorpion-specific protocol with blacklight inspection, dust treatment for wall voids, and exterior banding. The treatment most general pest plans don\'t cover.',
  },
  {
    title: 'Termite Inspection & Treatment',
    body: 'WDIIR-compliant inspection, soil-treatment perimeter trenching, and bait stations. Free re-inspection every year for active customers.',
  },
];

function IconPest() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 8c-6 0-10 4-10 10v8c0 6 4 10 10 10s10-4 10-10v-8c0-6-4-10-10-10z" fill="none" stroke="#0071BA" strokeWidth="2.5" />
      <circle cx="20" cy="18" r="1.5" fill="#0071BA" />
      <circle cx="28" cy="18" r="1.5" fill="#0071BA" />
      <path d="M14 18l-6-3M34 18l6-3M14 26l-6 3M34 26l6 3M24 8v-4M24 36v6" stroke="#0071BA" strokeWidth="2" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative section-pad rugged-ink-texture">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">What We Do</div>
          <h2 className="section-headline section-headline--light">Pest Control Services Built For The Desert</h2>
          <p className="font-body text-white/75 text-[15px] md:text-base max-w-2xl mx-auto mt-4">
            Every visit handled by our W-2 technicians &mdash; no subcontractors, no third-party pest mills, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group bg-ink-deep border border-white/10 rounded-[4px] p-6 md:p-7 hover:border-concrete transition-colors"
            >
              <div className="mb-5 w-14 h-14 bg-white/5 rounded-[4px] grid place-items-center">
                <IconPest />
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
