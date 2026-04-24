/**
 * EditorialQuote — large-format italic pull-quote over a cream ground.
 *
 * Pure editorial-magazine treatment: oversized opening quote glyph, italic
 * serif body, dash-prefixed attribution. Sits as a breather between the
 * ethos and reviews sections.
 */
export default function EditorialQuote() {
  return (
    <section className="section-sm bg-brand-cream-warm">
      <div className="container-narrow text-center">
        <div
          className="font-display italic text-brand-accent leading-none select-none"
          style={{ fontSize: "100px" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <blockquote className="font-display italic text-brand-ink text-[26px] md:text-[34px] leading-[1.35] mb-8 -mt-2">
          {
            "{{QUOTE — Our clients don't just receive a landscape — they inherit a considered extension of their home, built to endure generations.}}"
          }
        </blockquote>
        <div className="monogram-divider mb-5">
          <svg viewBox="0 0 64 42" className="w-6 h-4" aria-hidden="true">
            <path
              d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
              fill="#42AC54"
            />
          </svg>
        </div>
        <div className="font-display text-brand-ink-muted text-sm tracking-[0.22em] uppercase">
          {"— {{ATTRIBUTION — Principal & Founder, {{BRAND_NAME}}}}"}
        </div>
      </div>
    </section>
  );
}
