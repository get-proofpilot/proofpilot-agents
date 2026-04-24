import { type CSSProperties } from "react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * ReviewsWithEmoji
 * ----------------
 * Dark-navy surface, 3 testimonial cards, each led by a large emoji glyph that
 * sets the emotional tone before the quote. This is the playful-chunky-consumer
 * voice made literal: instead of a stock 5-star graphic, a single emoji. It
 * works because consumer audiences read emoji faster than copy.
 *
 * WHEN TO USE
 *   - Consumer brand where the review vibe is emotional / enthusiastic.
 *   - 3 testimonials that represent distinct "feelings" (delighted, relieved, awed).
 *
 * WHEN NOT TO USE
 *   - B2B / corporate (emoji reads juvenile).
 *   - Medical, financial, or other "serious" verticals.
 *   - When reviews need star-ratings surfaced (use a ratings card variant).
 */
export type ReviewsWithEmojiProps = {
  brand?: Partial<BrandTokens>;
  kicker?: string;
  headline?: string;
  items?: Array<{ emoji: string; name: string; city?: string; quote: string }>;
  readAllCta?: { label: string; href: string };
};

export default function ReviewsWithEmoji({
  brand,
  kicker = "What Neighbors Say",
  headline = "Loved By Homes All Over Town",
  items = [
    { emoji: "🤩", name: "J. Miller", city: "Queen Creek, AZ", quote: "Best decision we made this year. Neighbors keep asking who did the install." },
    { emoji: "🎄", name: "A. Pham", city: "Gilbert, AZ", quote: "Zero hassle. On time, custom-fit, and fixed a strand inside 24 hours. Ten stars." },
    { emoji: "✨", name: "The Ortega Family", city: "San Tan Valley, AZ", quote: "Worth every penny. The kids said it looked like Santa's workshop." },
  ],
  readAllCta,
}: ReviewsWithEmojiProps) {
  const b = { ...defaultBrand, ...brand };
  return (
    <section style={{ background: b.dark, color: b.onDark, fontFamily: b.bodyFontFamily }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "80px 24px 112px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: b.fontFamily,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: b.primary,
              }}
            >
              {kicker}
            </div>
            <h2
              style={{
                fontFamily: b.fontFamily,
                fontWeight: 900,
                fontSize: "clamp(32px, 4.2vw, 57px)",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                textTransform: "uppercase",
                color: b.onDark,
                margin: "10px 0 0",
                maxWidth: 680,
              }}
            >
              {headline}
            </h2>
          </div>
          {readAllCta && (
            <a
              href={readAllCta.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: b.fontFamily,
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: 18,
                padding: "13px 24px",
                border: `2px solid ${b.onDark}`,
                color: b.onDark,
                borderRadius: 5,
                textDecoration: "none",
              }}
            >
              {readAllCta.label}
            </a>
          )}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {items.map((r) => (
            <figure
              key={r.name}
              style={{
                margin: 0,
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "2px solid rgba(255,255,255,0.1)",
                padding: 28,
              }}
            >
              <div style={{ fontSize: 40, lineHeight: 1 }} aria-hidden>{r.emoji}</div>
              <blockquote
                style={{
                  margin: "14px 0 0",
                  color: b.onDark,
                  fontSize: 17,
                  lineHeight: 1.55,
                }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  marginTop: 18,
                  fontFamily: b.fontFamily,
                  fontWeight: 700,
                  color: b.primary,
                }}
              >
                {r.name}
                {r.city && (
                  <div
                    style={{
                      fontWeight: 400,
                      fontSize: 13,
                      letterSpacing: 0,
                      textTransform: "uppercase",
                      color: b.onDarkMuted,
                      marginTop: 4,
                    }}
                  >
                    {r.city}
                  </div>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
