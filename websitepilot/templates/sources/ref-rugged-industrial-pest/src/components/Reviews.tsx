const REVIEWS = [
  {
    name: '[CUSTOMER NAME]',
    location: 'Garage Floor &mdash; [CITY]',
    quote:
      'Great customer service from everyone on the team &mdash; from the initial quote to install day. Crew was on-site by 7am, done by 4pm, and the finish looks better than the showroom photos.',
  },
  {
    name: '[CUSTOMER NAME]',
    location: 'Patio Coating &mdash; [CITY]',
    quote:
      'These guys are the real deal. Professional, clean, on-time, and the floor is absolutely rugged. I have already recommended them to three neighbors.',
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-caution">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1l2.6 6 6.4.6-4.9 4.4 1.5 6.5L10 15.8 4.4 18.5l1.5-6.5L1 7.6 7.4 7z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="relative section-pad rugged-ink-texture">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">What Neighbors Say</div>
          <h2 className="section-headline section-headline--light">See What Your Neighbors Have Been Saying</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <article key={i} className="bg-white rounded-[4px] p-6 md:p-8 border-l-4 border-concrete">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-steel grid place-items-center font-display font-black text-concrete">G</div>
                <Stars />
                <span className="font-display font-bold uppercase text-[11px] tracking-[0.16em] text-text-body ml-auto">Google Review</span>
              </div>
              <p className="font-body text-text-body text-[15px] leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-5">
                <div className="font-display font-black uppercase text-ink">{r.name}</div>
                <div
                  className="font-body text-text-body text-sm"
                  dangerouslySetInnerHTML={{ __html: r.location }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
