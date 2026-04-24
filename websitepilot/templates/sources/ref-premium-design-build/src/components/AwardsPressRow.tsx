/**
 * Awards / Press — thin cream-warm band directly under the hero. Logos are
 * muted (greyscale/gold tint) and use monogram placeholders. Replaces
 * Cinco's "40+ Five-Star Reviews" slab with a luxury editorial press row.
 */
export default function AwardsPressRow() {
  const logos = [
    "NKBA Featured",
    "ASLA Award 2024",
    "Luxe Interiors",
    "Dwell Magazine",
    "Architectural Digest",
    "APLD Gold",
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
