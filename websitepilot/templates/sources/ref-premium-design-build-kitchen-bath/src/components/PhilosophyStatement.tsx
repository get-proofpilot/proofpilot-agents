/**
 * Philosophy — kitchen/bath specialization. Single column, italic accent
 * phrase, no cards. The pull line names the partnership the homeowner is
 * actually buying: a designer, a project manager, and a lead carpenter who
 * stay on the job from sketch through reveal.
 */
export default function PhilosophyStatement() {
  return (
    <section className="section bg-brand-cream">
      <div className="container-narrow text-center">
        <p className="text-h4-label text-brand-gold mb-6">Our Philosophy</p>

        <h2 className="text-h2-mobile md:text-h2-display mb-8 text-brand-ink">
          Interior architecture, not cabinet swaps.
        </h2>

        <p className="italic-accent text-italic-accent-sm md:text-italic-accent-lg text-brand-gold mb-10">
          One designer, one carpenter, one project manager &mdash; the same three faces from the
          first meeting to the final reveal.
        </p>

        <p className="text-body-lg text-brand-ink-soft mb-6">
          A kitchen is the most-used room in a home. A bath is the most personal. Neither belongs
          on a fast-track production line. Every plan is hand-drafted to the inch, every cabinet is
          spec&rsquo;d to your appliances and your reach, every stone slab is selected in person.
          We build one project at a time, in our own shop, by people you&rsquo;ve already met.
        </p>

        <p className="text-body-lg text-brand-ink-soft">
          We take on eight commissions a year. If the fit is right, we&rsquo;d love to hear about
          yours.
        </p>
      </div>
    </section>
  );
}
