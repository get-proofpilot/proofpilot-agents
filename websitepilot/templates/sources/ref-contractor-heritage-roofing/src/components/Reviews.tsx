/**
 * Reviews — "What Your Neighbors Are Saying About Us".
 * Google 5-star pill + overlapping avatar cluster at top, 3 review cards below.
 */
const REVIEWS = [
  {
    name: "Gail R.",
    body:
      "Colby and Isaac did a great job installing my water heater. They were on time, polite, respectful of my property, and very efficient. They explained everything clearly, provided excellent customer service, and left the area clean when they...",
  },
  {
    name: "Gary P.",
    body:
      "I hired {{BRAND_NAME}} to install a water filtration system for me and they were excellent! Jose was so knowledgeable and efficient in the installation, and their price was very fair. It was one of my best experiences ever for...",
  },
  {
    name: "Santiago S.",
    body:
      "Colby and Luke came out to relocate a tub drain and they were outstanding. Quick, clean, and communicated through the whole process — highly recommend for any plumbing project you've got.",
  },
];

export default function Reviews() {
  return (
    <section className="section">
      <div className="container-1200">
        <h2 className="text-h2-desktop uppercase text-center mb-4">
          What Your Neighbors Are Saying About Us
        </h2>

        {/* Google 5-star pill + overlapping avatars */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 bg-brand-red rounded-btn px-6 py-4 text-brand-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-white text-brand-red font-display font-extrabold text-xl flex items-center justify-center">
              G
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider font-bold">Google Reviews</div>
              <div className="text-xl font-display font-extrabold">★★★★★ 5.0 / 250+</div>
            </div>
          </div>
          <div className="flex -space-x-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-brand-gray-soft border-2 border-brand-white"
                aria-label="reviewer avatar placeholder"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="bg-brand-gray-tint rounded-card p-6 border border-brand-gray-soft/60"
            >
              <div className="font-display font-extrabold uppercase text-brand-ink text-lg mb-1">
                {r.name}
              </div>
              <div className="stars mb-3">★★★★★</div>
              <p className="text-body-base text-brand-ink/85">{r.body}</p>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a href="#" className="btn btn-primary">Read Reviews</a>
          <a href="#" className="btn btn-dark">Leave Us a Review</a>
        </div>
      </div>
    </section>
  );
}
