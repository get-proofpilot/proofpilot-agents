const SERVICES = [
  {
    title: 'Custom Pool Design',
    blurb:
      'Architectural plans, 3D renders, and structural engineering for a pool that fits the lot like it was born there.',
  },
  {
    title: 'Outdoor Living Builds',
    blurb:
      'Covered pavilions, outdoor kitchens, fire features, and pergolas — built to the same spec as the pool.',
  },
  {
    title: 'Concrete-Luxe Decking',
    blurb:
      'Honed concrete, travertine, or porcelain paver decks with clean lines and drainage done right.',
  },
  {
    title: 'Landscape & Lighting',
    blurb:
      'Low-voltage landscape lighting, mature tree placement, and planting that reads year-round.',
  },
  {
    title: 'Renovation & Resurface',
    blurb:
      'Bring a dated pool into the 2020s — plaster, tile, coping, equipment, and layout refresh.',
  },
  {
    title: 'Service & Maintenance',
    blurb:
      'Weekly chemistry, filter cleans, and same-day repairs for clients who prefer it handled.',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white section-pad">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
            What We Build
          </p>
          <h2 className="section-headline">
            The full <span className="text-accent">backyard</span> — designed, built, and maintained.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group border border-navy/10 rounded-xl p-7 bg-white hover:border-accent/60 hover:-translate-y-1 transition"
            >
              <div className="w-12 h-12 rounded-lg bg-mist grid place-items-center text-accent mb-5">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M4 12l1.41-1.41L11 16.17 18.59 8.59 20 10l-9 9z" />
                </svg>
              </div>
              <h3 className="card-headline mb-3">{s.title}</h3>
              <p className="font-body text-navy/75 text-[15px] leading-relaxed mb-5">{s.blurb}</p>
              <a href="#" className="font-body font-bold text-accent text-[14px] hover:underline">
                Learn more &rarr;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
