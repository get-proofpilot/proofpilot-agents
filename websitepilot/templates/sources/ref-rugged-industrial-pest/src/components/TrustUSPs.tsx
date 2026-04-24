const USPS = [
  { title: 'Prompt Service', body: 'Most installs wrapped in a single day. You&rsquo;re back in your garage by dinner.' },
  { title: 'Polyaspartic Strength', body: '4x more durable than standard epoxy. Shrugs off hot tires and winter salt.' },
  { title: 'W-2 Crew', body: 'Factory-trained, fully insured &mdash; we do not subcontract a single pour.' },
  { title: '15-Year Warranty', body: 'Industry-leading structural warranty with a 100% satisfaction guarantee.' },
];

function Shield() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <path d="M22 4 L38 10 V22 C38 32 30 38 22 40 C14 38 6 32 6 22 V10 Z" fill="none" stroke="#0071BA" strokeWidth="2.5" />
      <path d="M14 22 l6 6 l10 -12" fill="none" stroke="#0071BA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TrustUSPs() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-headline">Why Trust [BRAND]?</h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-concrete" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {USPS.map((u) => (
            <div key={u.title} className="text-center md:text-left">
              <div className="mb-5 inline-grid place-items-center w-20 h-20 bg-steel rounded-[4px]">
                <Shield />
              </div>
              <h3 className="font-display font-black text-ink text-xl uppercase tracking-tight leading-tight mb-3">
                {u.title}
              </h3>
              <p
                className="font-body text-text-body text-[14px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: u.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
