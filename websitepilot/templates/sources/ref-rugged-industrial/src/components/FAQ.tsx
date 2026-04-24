import { useState } from 'react';

const ITEMS = [
  {
    q: 'What services do you offer?',
    a: 'Any property owner in [METRO] can turn to us for concrete coatings, commercial flooring, patio surfaces, basement floors, epoxy, pool decks, resin stone, and rubber stone installations.',
  },
  {
    q: 'How long does the installation take?',
    a: 'Most residential jobs are installed in a single day. Larger commercial projects typically run 2&ndash;3 days depending on square footage and prep requirements.',
  },
  {
    q: 'How much does a coating cost?',
    a: 'Pricing depends on size, condition, and finish system. Most two-car garages fall between $3,500 and $6,500 installed. Book a free consultation and we&rsquo;ll send a firm quote in under 48 hours.',
  },
  {
    q: 'Will the coating yellow or peel?',
    a: 'Our polyaspartic topcoat is UV-stable, hot-tire resistant, and backed by a 15-year structural warranty. Cheap DIY epoxy kits yellow and peel &mdash; ours does not.',
  },
  {
    q: 'What about financing?',
    a: 'We partner with a 0% APR lender so you can split payments over 12, 18, or 24 months with a soft credit check that does not affect your score.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative section-pad bg-white overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-slash opacity-30" aria-hidden="true" />
      <div className="relative z-10 max-w-[960px] mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">Questions &amp; Answers</div>
          <h2 className="section-headline">Frequently Asked Coating Questions</h2>
        </div>
        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-steel/50 rounded-[4px] border border-steel-ink/30">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-5 md:px-6 py-4 font-display font-black uppercase text-ink text-sm md:text-base tracking-tight"
                >
                  <span>{item.q}</span>
                  <span className={`shrink-0 ml-4 w-8 h-8 grid place-items-center rounded-[4px] bg-concrete text-white transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                {isOpen && (
                  <div
                    className="px-5 md:px-6 pb-5 font-body text-text-body text-[15px] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
