/**
 * Hero — kitchen/bath specialization of the premium-design-build hero.
 *
 * Mirrors the base hero rhythm (eyebrow → modern-sans display tagline →
 * italic Fraunces qualifier → supporting copy → primary CTA) but is rewritten
 * for kitchen + bath remodel studios.
 *
 * Signature beat: "Kitchens *designed* for the way you live." — modern sans
 * with one Fraunces italic word so the editorial preset reads at a glance.
 *
 * Photography intent: commissioned kitchen interior — natural-light island,
 * warm wood + stone, one human gesture (hand on a cabinet pull, espresso
 * cup on counter). Use `placeholder-architectural` until the asset arrives.
 */
export default function Hero() {
  return (
    <section className="relative min-h-[720px] flex items-end pb-24 pt-40 overflow-hidden placeholder-architectural">
      <div className="photo-overlay" />

      <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 text-brand-cream">
          <p className="mb-5 text-[12px] font-semibold tracking-[0.24em] uppercase text-brand-gold-soft">
            {/* eyebrow */}
            &#123;&#123;ESTABLISHED_YEAR&#125;&#125; &nbsp;/&nbsp; &#123;&#123;CITY&#125;&#125;, &#123;&#123;STATE&#125;&#125; &nbsp;/&nbsp; By Appointment
          </p>

          <h1 className="text-h1-eyebrow-mobile md:text-h1-eyebrow text-brand-cream font-medium">
            &#123;&#123;CITY&#125;&#125; Kitchen &amp; Bath:
          </h1>

          <h2 className="text-h1-mobile md:text-h1-display text-brand-cream mt-2 mb-6">
            Kitchens <span className="italic-accent text-brand-gold-soft">designed</span>
            <br className="hidden md:block" /> for the way you live.
          </h2>

          <p className="italic-accent text-italic-accent-sm md:text-italic-accent-lg text-brand-gold-soft mb-8 max-w-xl">
            full-service design-build for kitchens, primary baths, and whole-floor remodels.
          </p>

          <p className="text-body-lg text-brand-cream/85 max-w-xl mb-10">
            A small studio of architects, interior designers, and lead carpenters delivering
            commissioned kitchen and bath builds &mdash; concept through final reveal &mdash; for homeowners
            across &#123;&#123;SERVICE_AREA&#125;&#125;.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn btn-primary">
              Start a Project
            </a>
            <a href="#portfolio" className="btn btn-ghost-light">
              View the Portfolio
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:block">
          <div className="bg-brand-ink/80 backdrop-blur-sm border border-brand-cream/10 p-8 shadow-hero-card rounded-[6px]">
            <p className="text-h4-label text-brand-gold-soft mb-3">The Studio</p>
            <p className="italic-accent text-italic-accent-sm text-brand-cream mb-5">
              By appointment. Eight commissions a year.
            </p>
            <div className="flex items-center justify-between border-t border-brand-cream/10 pt-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand-cream/50 mb-1">
                  Designing since
                </p>
                <p className="text-[32px] font-bold text-brand-cream leading-none">
                  &#123;&#123;YEAR&#125;&#125;
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[0.2em] text-brand-cream/50 mb-1">
                  Kitchens &amp; baths
                </p>
                <p className="text-[32px] font-bold text-brand-cream leading-none">
                  &#123;&#123;PROJECTS&#125;&#125;+
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
