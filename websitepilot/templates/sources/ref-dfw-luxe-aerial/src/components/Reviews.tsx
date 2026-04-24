const REVIEWS = [
  {
    name: 'Logan A.',
    city: 'Burleson',
    body: 'The crew showed up when they said, the renders matched the finished yard almost pixel-for-pixel, and the communication never dropped off.',
  },
  {
    name: 'Dylan C.',
    city: 'Southlake',
    body: 'We interviewed six builders. The proposal, the reference visits, and the honest timeline made the choice obvious.',
  },
  {
    name: 'Daniel T.',
    city: 'Westlake',
    body: 'Second home they\u2019ve done for us. That should tell you everything.',
  },
];

export default function Reviews() {
  return (
    <section className="bg-white section-pad">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-10">
          <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
            Reviews
          </p>
          <h2 className="section-headline">
            Why DFW homeowners keep <span className="text-accent">raving</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-xl border border-navy/10 bg-white p-7 hover:shadow-pill transition"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-[#F6B100]">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-navy/85 text-[16px] leading-relaxed italic mb-5">
                &ldquo;{r.body}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-navy/5">
                <div className="w-10 h-10 rounded-full bg-accent grid place-items-center text-white font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-body font-bold text-navy text-[14px]">{r.name}</div>
                  <div className="font-body text-navy/60 text-[12px]">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
