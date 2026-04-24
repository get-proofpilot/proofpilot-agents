import { useState } from 'react';

const ITEMS = [
  {
    q: 'Are your treatments pet-safe and family-safe?',
    a: 'Yes &mdash; every product we use is EPA-registered for residential interiors and dries within 30&ndash;60 minutes. Pets and kids are clear to walk on treated areas as soon as the product dries. We carry the SDS sheet on every truck if you want to review.',
  },
  {
    q: 'Do you offer same-day service?',
    a: 'Most service requests booked before 11am get same-day service. Emergency scorpion or wasp calls are slotted ahead of routine maintenance. Call us and we&rsquo;ll tell you the exact ETA before you book.',
  },
  {
    q: 'What\'s the difference between bi-monthly and one-time treatment?',
    a: 'A single treatment kills what\'s active today. Bi-monthly treatment (every 60 days) is what actually keeps pests gone &mdash; the desert breeds them faster than any one-shot can hold off. Bi-monthly customers also get free re-treats between visits at no charge.',
  },
  {
    q: 'How much does pest control cost?',
    a: 'General pest bi-monthly service starts at $X / visit on an annual agreement. Initial service is typically $X. Termite and scorpion-specific protocols are quoted per home after a free inspection.',
  },
  {
    q: 'Will my service prevent scorpions?',
    a: 'Standard pest plans don\'t. Our scorpion-specific protocol (blacklight inspection, dust treatment for wall voids, exterior banding) significantly reduces interior scorpion activity &mdash; usually within the first 2 visits. Bi-monthly service maintains the result.',
  },
  {
    q: 'Do you treat termites?',
    a: 'Yes &mdash; we run WDIIR-compliant inspections, soil-treatment perimeter trenching, and bait stations. Existing customers get a free annual termite re-inspection.',
  },
  {
    q: 'What if pests come back between visits?',
    a: 'On bi-monthly service: free re-treat, no questions asked, usually within 48 hours. That\'s the whole point of the agreement &mdash; we own the result, not just the visit.',
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
          <h2 className="section-headline">Frequently Asked Pest Control Questions</h2>
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
