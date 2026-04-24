const REVIEWS = [
  {
    emoji: "🛻",
    name: "J. Miller",
    city: "{{CITY-A}}",
    quote:
      "Texted a photo of the garage at 9am. Quote back by 9:08, crew on-site by noon. Driveway swept cleaner than when they showed up.",
  },
  {
    emoji: "💪",
    name: "A. Pham",
    city: "{{CITY-B}}",
    quote:
      "We had a hot tub jammed in the side yard for 4 years. Two guys, one truck, gone in 25 minutes. Fair price. No drama.",
  },
  {
    emoji: "✨",
    name: "The Ortega Family",
    city: "{{CITY-C}}",
    quote:
      "Estate cleanout after my grandma passed — they were respectful, gentle, and fast. Donated half the house to a local charity. 10 stars.",
  },
];

export default function ReviewsWithEmoji() {
  return (
    <section id="reviews" className="section-dark">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="kicker text-brand-primary">What Neighbors Say</div>
            <h2 className="display-h1 text-white mt-3 max-w-2xl">
              {/* {{REVIEWS-H2}} */}
              The Pile's Gone. The Smile's On.
            </h2>
          </div>
          <a href="#reviews" className="btn-ghost-light">Read All Reviews</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="rounded-card bg-white/[0.04] border-2 border-white/10 p-7 hover:border-brand-primary/40 transition-colors"
            >
              <div className="text-4xl" aria-hidden>{r.emoji}</div>
              <blockquote
                className="mt-4 text-white text-[17px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${r.quote}&rdquo;` }}
              />
              <figcaption className="mt-5 tile-title text-brand-primary">
                {r.name}
                <div className="text-[13px] font-normal tracking-normal uppercase text-brand-onDarkMuted mt-1">
                  {r.city}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
