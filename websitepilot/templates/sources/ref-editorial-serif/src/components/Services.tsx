/**
 * Services — 6-up disciplines grid, 3 cols × 2 rows on desktop.
 *
 * Each card:
 *  - full-bleed architectural photo on top (aspect 4:3)
 *  - service title in serif, non-italic
 *  - 2-3 sentence description
 *  - italic "Learn more" link underline-on-hover
 *
 * Mid-grid, Kingswood inserts a crown-monogram tile where the 6th card would
 * normally sit — we reproduce that break.
 */
const SERVICES = [
  {
    title: "Landscape & Outdoor Living Remodels",
    body: "Transform existing outdoor spaces with smart structural planning, elite design, and timeless materials that enhance lifestyle.",
  },
  {
    title: "New Home Construction Landscaping",
    body: "Full landscape installs for luxury new-builds, integrating architecture, planting, and lifestyle from the ground up.",
  },
  {
    title: "Landscape Design",
    body: "Architectural landscape design for residential and commercial projects — vision, structure, intent, and refinement in one document.",
  },
  {
    title: "Artificial Turf Installation",
    body: "Premium low-maintenance turf built for sharp detailing, durability, and a natural look across every elevation.",
  },
  {
    title: "Hardscaping",
    body: "Pool decks, patios, walkways, and retaining walls designed for longevity, craftsmanship, and better outdoor living.",
  },
  {
    title: "Custom Pools",
    body: "Architectural pool construction combining form, function, and aesthetics — engineered for lifetime use.",
    crowned: true,
  },
];

export default function Services() {
  return (
    <section className="section bg-brand-cream-warm">
      <div className="container-wide">
        <div className="max-w-[760px] mb-14">
          <div className="font-display italic text-brand-accent text-sm tracking-[0.2em] uppercase mb-3">
            {"{{SERVICES_EYEBROW — Our Disciplines}}"}
          </div>
          <h2 className="font-display text-brand-ink text-[34px] md:text-[44px] leading-[1.1]">
            {"{{SERVICES_HEADING — Considered design, built to endure.}}"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="bg-brand-cream rounded-card overflow-hidden flex flex-col shadow-card-lift"
            >
              {/* Placeholder commissioned photo */}
              <div
                className="aspect-[4/3] bg-brand-ink/10 relative flex items-center justify-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(66,172,84,0.2), rgba(31,30,26,0.4))",
                }}
                aria-label={`{{SERVICE_PHOTO_${s.title}}}`}
              >
                {s.crowned && (
                  <svg viewBox="0 0 64 42" className="w-16 h-10 absolute top-5 left-5" aria-hidden>
                    <path
                      d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
                      fill="#FFFCF4"
                      opacity="0.9"
                    />
                  </svg>
                )}
                <span className="font-display italic text-brand-cream/70 text-sm tracking-widest uppercase">
                  {"{{ARCHITECTURAL PHOTO}}"}
                </span>
              </div>
              <div className="p-7 flex flex-col gap-4 flex-1">
                <h3 className="font-display text-brand-ink text-[26px] leading-tight">
                  {s.title}
                </h3>
                <p className="text-brand-ink-soft text-[15px] leading-[1.65] flex-1">
                  {s.body}
                </p>
                <a href="#" className="btn-italic-link self-start">
                  Learn more
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-5 mt-14 flex-wrap">
          <a href="#" className="btn btn-ghost-dark">
            View All Disciplines
          </a>
          <a href="#contact" className="btn btn-primary">
            Schedule Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
}
