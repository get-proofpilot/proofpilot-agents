/**
 * Collection — "The {{BRAND}} Collection" — 6-up project gallery, 3×2.
 *
 * Editorial-serif gallery treatment: each card is a single commissioned photo,
 * no hover lift, no card bg. Title overlays bottom-left of photo, arrow link
 * opens project detail. Gallery reads as a curated portfolio.
 */
const PROJECTS = [
  { title: "New Home Construction Landscaping in Southlake, TX", href: "#" },
  { title: "Luxury Outdoor Living Remodel in Preston Hollow, TX", href: "#" },
  { title: "Custom Design & Build in Frisco, TX", href: "#" },
  { title: "New Construction Build in Southlake, TX", href: "#" },
  { title: "New Home Construction Build in Park Cities, TX", href: "#" },
  { title: "New Home Build Project in Keller, TX", href: "#" },
];

export default function Collection() {
  return (
    <section className="section bg-brand-cream">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-[680px]">
            <div className="font-display italic text-brand-accent text-sm tracking-[0.2em] uppercase mb-3">
              {"{{COLLECTION_EYEBROW — Selected Work}}"}
            </div>
            <h2 className="font-display text-brand-ink text-[34px] md:text-[44px] leading-[1.1]">
              {"{{COLLECTION_HEADING — The {{BRAND_NAME}} Collection}}"}
            </h2>
          </div>
          <a href="#" className="btn btn-ghost-dark self-start">
            View The Full Collection
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group relative block aspect-[4/5] overflow-hidden"
              aria-label={p.title}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, rgba(66,172,84,0.25), rgba(14,13,10,0.55))",
                }}
                aria-label={`{{PROJECT_PHOTO — ${p.title}}}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between gap-4">
                <h3 className="font-display text-brand-cream text-[22px] leading-[1.15] max-w-[260px]">
                  {p.title}
                </h3>
                <div className="shrink-0 w-11 h-11 border border-brand-cream/70 flex items-center justify-center text-brand-cream text-lg group-hover:bg-brand-cream group-hover:text-brand-ink transition-colors">
                  ↗
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
