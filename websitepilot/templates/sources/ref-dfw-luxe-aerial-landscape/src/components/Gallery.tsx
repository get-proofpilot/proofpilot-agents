const TILES = [
  { label: 'Southlake — modern lagoon', span: 'md:col-span-2 md:row-span-2' },
  { label: 'Grapevine — concrete-luxe' },
  { label: 'Westlake — resort package' },
  { label: 'Colleyville — fire + water' },
  { label: 'Keller — spa overflow' },
];

export default function Gallery() {
  return (
    <section id="portfolio" className="bg-white section-pad">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
              Portfolio
            </p>
            <h2 className="section-headline">
              Real <span className="text-accent">DFW</span> backyards, drone-shot at golden hour.
            </h2>
          </div>
          <a href="#" className="btn-chunk btn-chunk--ghost">
            See all 40+ builds
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 aspect-auto md:aspect-[16/9]">
          {TILES.map((t, i) => (
            <div
              key={i}
              className={`relative rounded-xl overflow-hidden border border-navy/10 bg-gradient-to-br from-twilight via-navy to-accent-ink min-h-[180px] md:min-h-0 ${
                t.span || ''
              }`}
            >
              <div className="absolute inset-0 bg-hero-overlay" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="font-body font-semibold text-white text-[13px] drop-shadow">
                  {t.label}
                </p>
              </div>
              <div className="absolute top-3 right-3 text-white/40 font-display text-xs">
                [AERIAL]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
