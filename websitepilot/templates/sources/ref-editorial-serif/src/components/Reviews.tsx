/**
 * Reviews — "Why Clients Choose {{BRAND}}" — 3-up testimonial cards on cream.
 *
 * Kingswood treats reviews as printed cards — no stars inside the card, instead
 * a thin 5-star row spans the eyebrow, and each card carries:
 *   - italic quote mark opener
 *   - short 3-4 sentence body
 *   - reviewer name + city in caps serif
 *
 * Google / Yelp badges live in the eyebrow row, not inside cards.
 */
const REVIEWS = [
  {
    name: "J. Baldwin",
    city: "Southlake, TX",
    body:
      "Kingswood did a great job on our backyard remodel. The team was professional, the design captured our vision, and the craftsmanship is remarkable.",
  },
  {
    name: "M. Contreras",
    city: "Preston Hollow, TX",
    body:
      "Every detail was considered. From the consultation through the reveal, we felt we were building something lasting — not ordering a service.",
  },
  {
    name: "A. Whitfield",
    city: "Frisco, TX",
    body:
      "They treat your property like their own. The pool and surround read like architecture — clean lines, durable materials, endlessly usable.",
  },
];

export default function Reviews() {
  return (
    <section className="section bg-brand-cream">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-[640px]">
            <div className="font-display italic text-brand-accent text-sm tracking-[0.2em] uppercase mb-3">
              {"{{REVIEWS_EYEBROW — In Their Words}}"}
            </div>
            <h2 className="font-display text-brand-ink text-[34px] md:text-[44px] leading-[1.1]">
              {"{{REVIEWS_HEADING — Why Clients Choose {{BRAND_NAME}}}}"}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="text-brand-accent tracking-[6px]">★★★★★</div>
            <div className="text-brand-ink-soft text-sm font-display italic">
              5.0 across Google · {"{{REVIEW_COUNT}}+ reviews"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="bg-brand-cream-warm p-8 border-l-2 border-brand-accent flex flex-col gap-5"
            >
              <div className="font-display italic text-brand-accent text-5xl leading-none -mb-3" aria-hidden>
                &ldquo;
              </div>
              <p className="text-brand-ink-soft text-[16px] leading-[1.7] flex-1">{r.body}</p>
              <div>
                <div className="font-display text-brand-ink text-base tracking-[0.12em] uppercase">
                  {r.name}
                </div>
                <div className="font-display italic text-brand-ink-muted text-sm mt-1">
                  {r.city}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="#" className="btn btn-ghost-dark">
            Read All Testimonials
          </a>
        </div>
      </div>
    </section>
  );
}
