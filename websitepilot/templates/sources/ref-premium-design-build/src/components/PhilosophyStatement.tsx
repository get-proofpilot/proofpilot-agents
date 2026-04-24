/**
 * Philosophy — a single column of long-form prose, sans body with a single
 * italic-serif accent phrase pulled out. Editorial rhythm, no cards.
 * Replaces Cinco's "Need any Landscaping & hardscaping help?" slab with the
 * premium-design-build Statement signature.
 */
export default function PhilosophyStatement() {
  return (
    <section className="section bg-brand-cream">
      <div className="container-narrow text-center">
        <p className="text-h4-label text-brand-gold mb-6">Our Philosophy</p>

        <h2 className="text-h2-mobile md:text-h2-display mb-8 text-brand-ink">
          Outdoor architecture, not landscaping.
        </h2>

        <p className="italic-accent text-italic-accent-sm md:text-italic-accent-lg text-brand-gold mb-10">
          We build one project at a time &mdash; the way it used to be done.
        </p>

        <p className="text-body-lg text-brand-ink-soft mb-6">
          Every stone, every grade line, every low-voltage fixture is resolved in drawing before it
          meets the site. Our crew installs what our studio drafted &mdash; no subcontractor
          telephone, no value-engineered substitutions. This is slower. It is also the reason our
          work is still crisp after a decade of freeze-thaw.
        </p>

        <p className="text-body-lg text-brand-ink-soft">
          We take on six residential commissions a year and two commercial campuses. If the fit is
          right, we&rsquo;d love to hear about yours.
        </p>
      </div>
    </section>
  );
}
