import { Star } from "lucide-react";

/**
 * Reviews — archetype-mascot.
 *
 * Pattern:
 *   - Dark purple section with orange eyebrow.
 *   - 2 wide testimonial cards side by side.
 *   - Each card = reviewer name + 5 stars + service headline + photo-thumb + long quote.
 *   - "See More Reviews" outline link at bottom.
 */
const reviews = [
  {
    author: "{{Reviewer 1 Name}}",
    heading: "{{Service Headline 1}}",
    body: "{{3–4 sentence authentic testimonial — leave verbatim from client reviews; DO NOT invent.}}",
  },
  {
    author: "{{Reviewer 2 Name}}",
    heading: "{{Service Headline 2}}",
    body: "{{3–4 sentence authentic testimonial — leave verbatim from client reviews; DO NOT invent.}}",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section-dark py-24 lg:py-32">
      <div className="container">
        <div className="text-center mb-14">
          <p className="eyebrow text-brand-primary">{"{{EYEBROW — e.g. HEAR IT FROM OUR HAPPY CUSTOMERS}}"}</p>
          <h2 className="display-h2 text-brand-onDark mt-2">
            {"{{DON'T TAKE IT FROM US.}}"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="rounded-card bg-brand-darker border border-white/5 p-8 shadow-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-brand-primary/30 grid place-items-center font-black text-brand-onDark">
                  {r.author[0]}
                </div>
                <div>
                  <p className="font-bold text-brand-onDark">{r.author}</p>
                  <div className="flex gap-0.5 mt-1" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-brand-primary text-brand-primary" />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="service-title text-brand-onDark uppercase tracking-wide mb-3">
                {r.heading}
              </h3>
              <p className="text-sm text-brand-onDarkMuted leading-relaxed">{r.body}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase hover:underline">
            See More Reviews <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
