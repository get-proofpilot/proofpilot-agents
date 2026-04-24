const POINTS = [
  'Family Owned and Locally Operated',
  'Pet-Safe & Family-Safe Formulas',
  'W-2 Technicians, No Subcontractors',
  'Bi-Monthly Or One-Time Service',
  'Free Re-Treats Between Visits',
  'Same-Day Service Available',
];

const FAMILY = [
  { name: '[FOUNDER NAME]', role: 'Owner & Lead Technician' },
  { name: '[CO-OWNER NAME]', role: 'Co-Owner & Operations' },
  { name: '[TECH NAME]', role: 'Senior Pest Technician' },
];

function Check() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0071BA" />
      <path d="M7 12 l3 3 l7 -7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * PeaceOfMind — Family-team variant for pest control.
 *
 * Replaces the single founder block with a 2-3 owner/tech portrait row
 * + founder story + 6-point trust list. Pest buyers in Phoenix-belt
 * markets respond to "we are a real family business, not a route".
 * Richardson v2 learning: lead with the people, not the chemical.
 */
export default function PeaceOfMind() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
        <div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {FAMILY.map((m, i) => (
              <div key={m.name} className="relative">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-steel">
                  <img src={`/placeholder-team-${i + 1}.svg`} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-section-fade" />
                  <div className="absolute left-3 right-3 bottom-3 text-white">
                    <div className="font-display font-black uppercase text-[13px] md:text-sm leading-tight">{m.name}</div>
                    <div className="font-display font-semibold uppercase text-[10px] tracking-[0.14em] text-white/85 mt-0.5">{m.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">Family Owned. Family Run.</div>
          <h3 className="section-headline leading-[1.02]">
            When You Call [BRAND], You Talk To The Family.
          </h3>
          <p className="font-body text-text-body text-[15px] md:text-base mt-5 leading-relaxed">
            We started [BRAND] because every pest company in town felt like a route &mdash; one tech, one spray, one
            invoice, gone. We do it the opposite way: same family, same techs, same protocols every visit. If a pest
            comes back between treatments, so do we &mdash; free of charge.
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
