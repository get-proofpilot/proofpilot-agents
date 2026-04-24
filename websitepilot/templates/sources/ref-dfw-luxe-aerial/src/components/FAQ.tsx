import { useState } from 'react';

const FAQS = [
  {
    q: 'How long does a full pool + backyard build take?',
    a: 'Most complete builds land in the 14–22 week range from contract to final walk. We give a realistic timeline in the proposal and update you weekly if anything shifts.',
  },
  {
    q: 'Do you handle the full backyard or just the pool?',
    a: 'Full backyard. Pool, decking, outdoor kitchen, pavilion, landscape, and lighting — all in-house or with long-standing partners we supervise directly.',
  },
  {
    q: 'What\u2019s a realistic budget for a DFW build?',
    a: 'New pools typically start around $85k and scale based on size, finishes, and outdoor living features. We\u2019ll give you a line-item number, not a range.',
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes. We partner with two national lenders and can pre-qualify you in under 10 minutes without a hard pull.',
  },
  {
    q: 'What\u2019s your warranty?',
    a: 'Lifetime workmanship on the build. Manufacturer warranties on equipment and finishes, handled by us so you don\u2019t play middleman.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white section-pad">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-10">
          <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
            FAQ
          </p>
          <h2 className="section-headline">
            The <span className="text-accent">real</span> questions homeowners ask.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border border-navy/10 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-body font-semibold text-navy text-[17px]">{f.q}</span>
                  <span
                    className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full grid place-items-center border transition ${
                      isOpen
                        ? 'bg-accent border-accent text-white rotate-45'
                        : 'bg-white border-navy/20 text-navy'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M11 5h2v14h-2z" />
                      <path d="M5 11h14v2H5z" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 font-body text-navy/75 text-[16px] leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
