const POINTS = [
  'Industry Leading Six Step Process',
  'Family Owned and Locally Operated',
  'Jobs Completed In a Single Day',
  'Cold-Temperature Rated Coatings',
  'Hot Tire Pickup Resistance',
  'Lifetime Structural Warranty',
];

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0071BA" />
      <path d="M7 12 l3 3 l7 -7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PeaceOfMind() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="relative aspect-[4/3] w-full">
          <img src="/placeholder-crew.svg" alt="" className="absolute inset-0 w-full h-full object-cover rounded-[4px]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-section-fade rounded-b-[4px]" />
          <div className="absolute left-6 bottom-6 text-white">
            <div className="font-display font-black uppercase text-xl leading-tight">[FOUNDER NAME]</div>
            <div className="font-display font-semibold uppercase text-[11px] tracking-[0.14em] text-white/80 mt-1">Founder &amp; Lead Installer</div>
          </div>
        </div>
        <div>
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">Total Peace of Mind</div>
          <h3 className="section-headline leading-[1.02]">
            When You Hire [BRAND] You Can Have Total Peace Of Mind
          </h3>
          <p className="font-body text-text-body text-[15px] md:text-base mt-5 leading-relaxed">
            Every install is run by a factory-trained lead, fully insured, and backed by a 15-year structural warranty.
            No subcontractors. No &ldquo;we&rsquo;ll see you Thursday&rdquo; ghosting. Just a rugged floor, done right.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 font-body text-[14px] text-ink">
                <span className="mt-0.5 shrink-0"><Check /></span>
                <span className="font-display font-semibold uppercase tracking-wide text-[13px]">{p}</span>
              </li>
            ))}
          </ul>
          <a href="#quote" className="btn-rugged mt-8">Request My Free Quote</a>
        </div>
      </div>
    </section>
  );
}
