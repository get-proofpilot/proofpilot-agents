/**
 * ReviewsWithGoogle5Star — Hook's review block.
 *
 * Anatomy:
 *   1) Google-G pill + rating at top with overlapping reviewer avatars
 *   2) 3 review cards (name, 5 red stars, 3-line clipped body)
 *   3) Dual CTA footer: Read Reviews + Leave Review
 *
 * WHEN TO USE
 *  - Contractor/home-service sites with 50+ Google reviews to flex.
 *  - Anywhere the social-proof section needs to feel like a G-search result excerpt.
 *
 * WHEN NOT TO USE
 *  - Brands with fewer than ~20 reviews (use a testimonial-quote pattern instead).
 *  - B2B/enterprise where avatars + first names feel wrong.
 *
 * FITTING VERTICALS
 *  all residential home-service + local B2C services.
 */
import React from "react";

export type ReviewItem = { name: string; body: string; rating?: number };

export interface ReviewsWithGoogle5StarProps {
  red?: string;
  ink?: string;
  heading?: string;
  ratingValue?: number;
  ratingCount?: number;
  reviews?: ReviewItem[];
  avatarCount?: number;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const DEFAULTS = {
  red: "#EF3E33",
  ink: "#231F20",
  heading: "What Your Neighbors Are Saying About Us",
  ratingValue: 5.0,
  ratingCount: 250,
  avatarCount: 6,
  primaryCta: { label: "Read Reviews", href: "#" },
  secondaryCta: { label: "Leave Us a Review", href: "#" },
  reviews: [
    { name: "Gail R.", body: "Colby and Isaac did a great job installing my water heater. On time, polite, efficient, and explained everything clearly..." },
    { name: "Gary P.", body: "Excellent water filtration install. Jose was knowledgeable and efficient, and their price was very fair. Best experience ever..." },
    { name: "Santiago S.", body: "Colby and Luke relocated a tub drain. Quick, clean, and communicated through the whole process. Highly recommend." },
  ],
};

export default function ReviewsWithGoogle5Star(props: ReviewsWithGoogle5StarProps) {
  const {
    red = DEFAULTS.red,
    ink = DEFAULTS.ink,
    heading = DEFAULTS.heading,
    ratingValue = DEFAULTS.ratingValue,
    ratingCount = DEFAULTS.ratingCount,
    avatarCount = DEFAULTS.avatarCount,
    reviews = DEFAULTS.reviews,
    primaryCta = DEFAULTS.primaryCta,
    secondaryCta = DEFAULTS.secondaryCta,
  } = props;

  return (
    <section style={{ padding: "72px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <h2
          className="text-center uppercase"
          style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: "48px", color: ink, marginBottom: 16 }}
        >
          {heading}
        </h2>

        <div
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
          style={{ background: red, color: "#fff", borderRadius: 7, padding: "16px 24px" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xl"
              style={{ background: "#fff", color: red, fontFamily: '"Roboto Condensed", system-ui, sans-serif' }}
            >
              G
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider font-bold" style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif' }}>Google Reviews</div>
              <div className="text-xl font-extrabold" style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif' }}>
                {"★".repeat(Math.round(ratingValue))} {ratingValue.toFixed(1)} / {ratingCount}+
              </div>
            </div>
          </div>
          <div className="flex" style={{ marginLeft: -12 }}>
            {[...Array(avatarCount)].map((_, i) => (
              <div
                key={i}
                style={{ width: 40, height: 40, borderRadius: "50%", background: "#CCD6DF", border: "2px solid #fff", marginLeft: -12 }}
                aria-label="reviewer avatar placeholder"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <article
              key={r.name}
              style={{
                background: "#F4F6F8",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #CCD6DF80",
              }}
            >
              <div
                className="uppercase mb-1"
                style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontWeight: 800, color: ink, fontSize: 18 }}
              >
                {r.name}
              </div>
              <div style={{ color: red, letterSpacing: 2, fontSize: 16, marginBottom: 12 }}>
                {"★".repeat(r.rating ?? 5)}
              </div>
              <p style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 17, lineHeight: "27.2px", color: ink + "D9" }}>
                {r.body}
              </p>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a
            href={primaryCta.href}
            className="uppercase font-bold"
            style={{ background: red, color: "#fff", padding: "16px 32px", borderRadius: 7, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 16 }}
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="uppercase font-bold"
            style={{ background: ink, color: "#fff", padding: "16px 32px", borderRadius: 7, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 16 }}
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
