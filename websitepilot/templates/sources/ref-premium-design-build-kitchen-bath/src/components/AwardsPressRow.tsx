/**
 * Awards / Press — kitchen/bath specialization. NKBA + Houzz + interior-design
 * editorial press are the load-bearing trust signals for this vertical.
 * Italic-serif logo placeholders so the press row reads as editorial, not as
 * a generic "as seen in" badge bar.
 */
export default function AwardsPressRow() {
  const logos = [
    "NKBA Member",
    "Houzz Best of Design",
    "Sub-Zero Wolf Showroom Partner",
    "Luxe Interiors",
    "House Beautiful",
    "Architectural Digest",
  ];
  return (
    <section className="section-sm section-warm border-b border-brand-cream-line">
      <div className="container-wide">
        <p className="text-center text-h4-label text-brand-ink-muted mb-8">
          Featured &amp; recognized by
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center">
          {logos.map((name) => (
            <div
              key={name}
              className="opacity-60 hover:opacity-100 transition-opacity text-center"
              title={name}
            >
              <span className="italic-accent text-[18px] text-brand-ink">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
