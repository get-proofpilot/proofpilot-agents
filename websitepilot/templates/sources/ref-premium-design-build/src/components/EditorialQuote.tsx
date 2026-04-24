/**
 * EditorialQuote — oversized italic-serif pull quote on cream-warm. A single
 * homeowner testimonial treated as the editorial voice of the project.
 * Replaces Cinco's 3-testimonial grid with the premium-design-build signature.
 */
export default function EditorialQuote() {
  return (
    <section className="section section-warm">
      <div className="container-narrow text-center">
        <p className="text-h4-label text-brand-gold mb-10">Homeowner, Cedar Ridge</p>

        <blockquote className="italic-accent text-[32px] md:text-[44px] leading-[1.1] text-brand-ink mb-10">
          &ldquo;We interviewed four studios. They were the only team that showed up to the first
          meeting having already walked the property at sunrise.&rdquo;
        </blockquote>

        <p className="text-h4-label text-brand-ink-muted">
          {`{{ CLIENT_INITIAL }}. {{ CLIENT_LAST_INITIAL }}. — Estate Residence, {{ CITY }}`}
        </p>
      </div>
    </section>
  );
}
