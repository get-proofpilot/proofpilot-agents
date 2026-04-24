/**
 * AboutPhilosophy — two-part long-form "ethos" section.
 *
 * Copy column on the left carries: eyebrow, H2, paragraph 1, monogram divider,
 * italic H3, paragraph 2, ghost-dark button, and an optional certification-badge
 * row. Photo column on the right carries two stacked commissioned photos with
 * an intentional offset.
 *
 * WHEN TO USE
 *  - "About" sections that need to read as a firm manifesto.
 *  - Founder-led or principal-led service brands.
 *  - Any site where the story IS the product (luxury, editorial, craft).
 *
 * WHEN NOT TO USE
 *  - Transactional pages where users skim (use a 4-up values grid).
 *  - When you don't have two photos — the single-photo variant reads thin.
 *
 * FITTING VERTICALS
 *  luxury design-build · architects · interior designers · boutique law ·
 *  wealth advisory · aesthetic med-spa · private schools · galleries
 */
import React from "react";

export type BrandTokens = { accent?: string; ink?: string; cream?: string; ruleColor?: string; inkSoft?: string };

export interface AboutPhilosophyProps {
  brand?: BrandTokens;
  eyebrow?: string;
  heading?: string;
  paragraph1?: string;
  subheading?: string;
  paragraph2?: string;
  cta?: { label: string; href: string };
  certifications?: string[];
  photos?: { top?: string; bottom?: string };
}

const DEFAULTS: Required<
  Omit<AboutPhilosophyProps, "brand" | "photos">
> & { brand: BrandTokens; photos: { top?: string; bottom?: string } } = {
  brand: {
    accent: "#42AC54",
    ink: "#1F1E1A",
    cream: "#FFFCF4",
    inkSoft: "#464646",
    ruleColor: "#CFCDC6",
  },
  eyebrow: "Our Story",
  heading: "The Firm Ethos",
  paragraph1:
    "We are a team of craftspeople and professionals passionate about creating intentional, timeless work. Every project is a study in material, proportion, and seamless function.",
  subheading: "From Vision to Commitment",
  paragraph2:
    "What began as a commitment to intentional work has evolved into a full-service firm known for creating refined, enduring results. Every project reflects a belief in craftsmanship and meaningful client relationships.",
  cta: { label: "Learn More About Our Firm", href: "#" },
  certifications: [],
  photos: {},
};

export default function AboutPhilosophy(props: AboutPhilosophyProps) {
  const {
    brand = DEFAULTS.brand,
    eyebrow = DEFAULTS.eyebrow,
    heading = DEFAULTS.heading,
    paragraph1 = DEFAULTS.paragraph1,
    subheading = DEFAULTS.subheading,
    paragraph2 = DEFAULTS.paragraph2,
    cta = DEFAULTS.cta,
    certifications = DEFAULTS.certifications,
    photos = DEFAULTS.photos,
  } = props;

  const accent = brand.accent ?? DEFAULTS.brand.accent!;
  const ink = brand.ink ?? DEFAULTS.brand.ink!;
  const cream = brand.cream ?? DEFAULTS.brand.cream!;
  const inkSoft = brand.inkSoft ?? DEFAULTS.brand.inkSoft!;
  const ruleColor = brand.ruleColor ?? DEFAULTS.brand.ruleColor!;

  const photoStyle = (url?: string, fallback?: string) => ({
    backgroundImage: url ? `url(${url})` : fallback,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  return (
    <section style={{ padding: "120px 0", background: cream }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
          gap: 64,
          alignItems: "start",
        }}
        className="lg:grid grid-cols-1"
      >
        {/* Copy */}
        <div>
          <div
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontStyle: "italic",
              color: accent,
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {eyebrow}
          </div>
          <h2
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              color: ink,
              fontSize: "clamp(34px, 4vw, 44px)",
              lineHeight: 1.1,
              fontWeight: 400,
              marginBottom: 40,
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              color: inkSoft,
              fontSize: 17,
              lineHeight: 1.75,
              fontFamily: '"Fraunces", Georgia, serif',
              marginBottom: 32,
            }}
          >
            {paragraph1}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              maxWidth: 240,
              marginBottom: 32,
              color: accent,
            }}
          >
            <span
              aria-hidden
              style={{ flex: 1, maxWidth: 80, height: 1, background: ruleColor }}
            />
            <svg viewBox="0 0 64 42" style={{ width: 32, height: 20 }} aria-hidden="true">
              <path
                d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
                fill={accent}
              />
            </svg>
            <span
              aria-hidden
              style={{ flex: 1, maxWidth: 80, height: 1, background: ruleColor }}
            />
          </div>

          <h3
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontStyle: "italic",
              color: ink,
              fontSize: 28,
              lineHeight: 1.2,
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            {subheading}
          </h3>
          <p
            style={{
              color: inkSoft,
              fontSize: 17,
              lineHeight: 1.75,
              fontFamily: '"Fraunces", Georgia, serif',
              marginBottom: 32,
            }}
          >
            {paragraph2}
          </p>

          <a
            href={cta.href}
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              border: `1px solid ${ink}`,
              color: ink,
              display: "inline-block",
              borderRadius: 0,
            }}
          >
            {cta.label}
          </a>

          {certifications.length > 0 && (
            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: `1px solid ${ruleColor}`,
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {certifications.map((c) => (
                <div
                  key={c}
                  style={{
                    height: 56,
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${ruleColor}`,
                    color: "#8C8B87",
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontStyle: "italic",
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Photos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              aspectRatio: "4/5",
              background: "rgba(31,30,26,0.1)",
              ...photoStyle(
                photos.top,
                "linear-gradient(160deg, rgba(66,172,84,0.25), rgba(31,30,26,0.55))",
              ),
            }}
            aria-label="Firm photo top"
          />
          <div
            style={{
              aspectRatio: "4/3",
              background: "rgba(31,30,26,0.1)",
              marginLeft: 48,
              ...photoStyle(
                photos.bottom,
                "linear-gradient(220deg, rgba(246,240,226,0.45), rgba(31,30,26,0.65))",
              ),
            }}
            aria-label="Firm photo bottom"
          />
        </div>
      </div>
    </section>
  );
}
