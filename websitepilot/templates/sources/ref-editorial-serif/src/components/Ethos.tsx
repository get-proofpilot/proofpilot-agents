/**
 * Ethos — "The {{BRAND}} Ethos" two-part long-form section.
 *
 * Kingswood treats this as a philosophical statement, not a marketing blurb —
 * two stacked paragraphs separated by a monogram divider, flanked by tall
 * architectural photography on one side. Certification badges sit at the base.
 */
export default function Ethos() {
  return (
    <section className="section bg-brand-cream">
      <div className="container-wide grid lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
        {/* Copy */}
        <div>
          <div className="font-display italic text-brand-accent text-sm tracking-[0.2em] uppercase mb-3">
            {"{{ETHOS_EYEBROW — Our Story}}"}
          </div>
          <h2 className="font-display text-brand-ink text-[34px] md:text-[44px] leading-[1.1] mb-10">
            {"{{ETHOS_HEADING — The {{BRAND_NAME}} Ethos}}"}
          </h2>

          <div className="prose max-w-none text-brand-ink-soft text-[17px] leading-[1.75] space-y-5">
            <p>
              {
                "{{ETHOS_P1 — We are a team of landscape architects and professionals passionate about creating intentional, timeless residences. We transform outdoor areas into home extensions by focusing on comprehensive landscape architecture, long-lasting materials, and seamless functionality.}}"
              }
            </p>
          </div>

          <div className="monogram-divider my-8 max-w-[240px]">
            <svg viewBox="0 0 64 42" className="w-8 h-6" aria-hidden="true">
              <path
                d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
                fill="#42AC54"
              />
            </svg>
          </div>

          <h3 className="font-display italic text-brand-ink text-[28px] mb-4">
            {"{{ETHOS_SUBHEADING — Our Story: From Vision to Commitment}}"}
          </h3>
          <p className="text-brand-ink-soft text-[17px] leading-[1.75] mb-8">
            {
              "{{ETHOS_P2 — What began as a commitment to intentional outdoor living has evolved into a full-service design and build firm known for creating refined, enduring spaces. Every project reflects a belief in timeless craftsmanship and meaningful client relationships.}}"
            }
          </p>

          <a href="#" className="btn btn-ghost-dark">
            Learn More About Our Firm
          </a>

          {/* Certification badge row — placeholders */}
          <div className="mt-12 pt-8 border-t border-brand-cream-line flex items-center gap-8 flex-wrap">
            {["{{CERT 1}}", "{{CERT 2 — NALP}}", "{{CERT 3 — DBIA}}"].map((c) => (
              <div
                key={c}
                className="h-14 px-5 flex items-center border border-brand-cream-line text-brand-ink-muted font-display italic text-xs tracking-[0.2em] uppercase"
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Tall flanking photography */}
        <div className="flex flex-col gap-5">
          <div
            className="aspect-[4/5] bg-brand-ink/10"
            style={{
              backgroundImage:
                "linear-gradient(160deg, rgba(66,172,84,0.25), rgba(31,30,26,0.55))",
            }}
            aria-label="{{ETHOS_PHOTO_TOP}}"
          />
          <div
            className="aspect-[4/3] bg-brand-ink/10 ml-12"
            style={{
              backgroundImage:
                "linear-gradient(220deg, rgba(246,240,226,0.45), rgba(31,30,26,0.65))",
            }}
            aria-label="{{ETHOS_PHOTO_BOT}}"
          />
        </div>
      </div>
    </section>
  );
}
