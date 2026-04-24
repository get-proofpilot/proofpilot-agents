const REVIEWS = [
  {
    emoji: "🤩",
    name: "J. Miller",
    city: "Queen Creek, AZ",
    quote:
      "Best decision we made this year. The design consult was fast, the install was perfect, and the house glows. Our neighbors keep asking who did it!",
  },
  {
    emoji: "🎄",
    name: "A. Pham",
    city: "Gilbert, AZ",
    quote:
      "Zero hassle. They showed up on time, cut everything to fit the roofline, and one strand went out — fixed inside 24 hours. Ten stars.",
  },
  {
    emoji: "✨",
    name: "The Ortega Family",
    city: "San Tan Valley, AZ",
    quote:
      "Worth every penny. The kids said it looked like Santa&rsquo;s workshop. Already booked for next year.",
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
              Loved By Homes All Over Town
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
