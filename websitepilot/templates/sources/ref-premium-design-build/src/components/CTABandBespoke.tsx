/**
 * CTABandBespoke — dark ink band positioned between process and contact.
 * Single italic-serif pull-line, phone CTA + "Start a Project" CTA. Mirrors
 * Cinco's green-on-dark CTA band but with the editorial treatment.
 */
export default function CTABandBespoke() {
  return (
    <section className="section-sm section-ink">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <p className="text-h4-label text-brand-gold-soft mb-4">Ready When You Are</p>
          <h2 className="text-h2-mobile md:text-h2-display text-brand-cream">
            The next season of your property starts with{" "}
            <span className="italic-accent text-brand-gold-soft">one conversation</span>.
          </h2>
        </div>
        <div className="lg:col-span-4 flex flex-col lg:items-end gap-3">
          <a href="tel:{{PHONE}}" className="italic-accent text-[28px] text-brand-gold-soft">
            &#123;&#123;PHONE&#125;&#125;
          </a>
          <a href="#contact" className="btn btn-primary">
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}
