type Row = { label: string; diy: boolean; epoxy: boolean; us: boolean };

const ROWS: Row[] = [
  { label: 'Simple Installation Process', diy: false, epoxy: true, us: true },
  { label: 'Protective Topcoat Installation', diy: false, epoxy: false, us: true },
  { label: 'Done In One Day', diy: false, epoxy: false, us: true },
  { label: 'Cold Temperature Rated', diy: false, epoxy: false, us: true },
  { label: 'UV Stable &mdash; No Yellowing', diy: false, epoxy: false, us: true },
  { label: '15-Year Structural Warranty', diy: false, epoxy: false, us: true },
  { label: 'Hot Tire Pickup Resistant', diy: false, epoxy: false, us: true },
];

function Yes() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0071BA" />
      <path d="M7 12 l3 3 l7 -7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function No() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#CC3366" />
      <path d="M8 8 l8 8 M16 8 l-8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Comparison() {
  return (
    <section className="section-pad bg-steel">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">The Difference</div>
          <h2 className="section-headline">How Is [BRAND] Different From Your Other Options?</h2>
        </div>

        <div className="bg-white rounded-[4px] overflow-hidden border border-steel-ink/40">
          <div className="grid grid-cols-4 bg-ink text-white font-display font-black uppercase text-[12px] md:text-sm tracking-wide">
            <div className="px-4 md:px-6 py-4">&nbsp;</div>
            <div className="px-4 md:px-6 py-4 text-center border-l border-white/10">DIY Epoxy</div>
            <div className="px-4 md:px-6 py-4 text-center border-l border-white/10">Standard Epoxy</div>
            <div className="px-4 md:px-6 py-4 text-center border-l border-white/10 bg-concrete">[BRAND]</div>
          </div>
          {ROWS.map((r, i) => (
            <div key={i} className={`grid grid-cols-4 ${i % 2 === 0 ? 'bg-white' : 'bg-steel/70'} border-t border-steel-ink/30`}>
              <div
                className="px-4 md:px-6 py-4 font-display font-bold uppercase text-[13px] tracking-wide text-ink"
                dangerouslySetInnerHTML={{ __html: r.label }}
              />
              <div className="px-4 md:px-6 py-4 grid place-items-center border-l border-steel-ink/30">
                {r.diy ? <Yes /> : <No />}
              </div>
              <div className="px-4 md:px-6 py-4 grid place-items-center border-l border-steel-ink/30">
                {r.epoxy ? <Yes /> : <No />}
              </div>
              <div className="px-4 md:px-6 py-4 grid place-items-center border-l border-steel-ink/30 bg-concrete/10">
                {r.us ? <Yes /> : <No />}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#quote" className="btn-rugged">See Pricing For My Floor</a>
        </div>
      </div>
    </section>
  );
}
