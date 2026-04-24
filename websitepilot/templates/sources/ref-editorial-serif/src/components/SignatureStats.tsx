/**
 * SignatureStats — "Signature Disciplines" band, 4-up metrics.
 *
 * Kingswood treats these as editorial numerals (green italic serif, big) stacked
 * over a single-line label. Monogram-crown divider above the row.
 *
 * Swap metrics for ANY discipline: projects, reviews, years, minimum ticket.
 * Keep the four-count — it reads more substantial than three, less busy than five.
 */
const STATS = [
  { metric: "600+", label: "Jobs Completed" },
  { metric: "100+", label: "5-Star Google Reviews" },
  { metric: "50+", label: "Years Of Experience" },
  { metric: "$30K", label: "Project Minimum" },
];

export default function SignatureStats() {
  return (
    <section className="section-sm bg-brand-cream">
      <div className="container-wide">
        <div className="monogram-divider mb-8">
          <svg viewBox="0 0 64 42" className="w-10 h-7" aria-hidden="true">
            <path
              d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
              fill="#42AC54"
            />
          </svg>
        </div>

        <h2 className="font-display text-center text-brand-ink text-[32px] md:text-[44px] leading-tight mb-14">
          {"{{SIG_HEADING — Signature Disciplines}}"}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="editorial-numeral text-[64px] lg:text-[80px] leading-none mb-4">
                {s.metric}
              </div>
              <div className="h-px w-12 bg-brand-cream-line mx-auto mb-4" />
              <div className="font-display text-brand-ink-soft text-[15px] tracking-[0.08em] uppercase">
                {s.label}
              </div>
              {/* Hidden ordinal — editorial detail */}
              <div className="text-brand-ink-muted text-xs font-display italic mt-2">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
