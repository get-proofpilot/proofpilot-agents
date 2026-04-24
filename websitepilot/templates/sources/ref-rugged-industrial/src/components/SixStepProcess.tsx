const STEPS = [
  { n: '01', title: 'Grind It', body: 'Profile, repair, and vacuum the concrete surface to ensure the strongest adhesion possible.' },
  { n: '02', title: 'Repair It', body: 'Fill every crack and divot with 100% solids patch compound.' },
  { n: '03', title: 'Prime It', body: 'Apply a moisture-tolerant polyaspartic primer to lock down the slab.' },
  { n: '04', title: 'Flake It', body: 'Broadcast custom vinyl or flake blends to saturation &mdash; your color, your pattern.' },
  { n: '05', title: 'Seal It', body: 'Scrape back, vacuum, and lock in with a UV-stable polyaspartic topcoat.' },
  { n: '06', title: 'Walk It', body: 'Ready for foot traffic the same day, tires and furniture in 24 hours.' },
];

export default function SixStepProcess() {
  return (
    <section className="relative section-pad rugged-ink-texture text-white">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">How It Works</div>
          <h2 className="section-headline section-headline--light">The [BRAND] Six Step Process</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-ink-deep border border-white/10 rounded-[4px] p-5 hover:border-concrete transition-colors">
              <div className="font-display font-black text-concrete text-3xl leading-none mb-3">{s.n}</div>
              <h3 className="font-display font-black text-white uppercase text-sm tracking-tight mb-2">{s.title}</h3>
              <p className="font-body text-white/70 text-[12.5px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#quote" className="btn-rugged">Start My Project</a>
        </div>
      </div>
    </section>
  );
}
