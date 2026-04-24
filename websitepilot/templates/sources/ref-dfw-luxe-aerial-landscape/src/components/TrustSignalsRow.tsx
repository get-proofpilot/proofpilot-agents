const BADGES = [
  'Google Guaranteed',
  'BBB A+ Rated',
  'HomeAdvisor Elite',
  'Licensed & Insured',
  'Angi Certified',
];

export default function TrustSignalsRow() {
  return (
    <section className="bg-white border-y border-navy/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {BADGES.map((b) => (
            <div
              key={b}
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
            >
              <div className="w-8 h-8 rounded-full bg-mist grid place-items-center text-accent">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <span className="font-body font-semibold text-[13px] text-navy tracking-wide uppercase">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
