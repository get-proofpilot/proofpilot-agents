/**
 * OwnerTwilightFeature — the Get Local Leads signature: owner portrait cutout
 * against a twilight-lit patio photo. Picks up Cinco's "El Paso native Jose
 * Mendoza" moment and upgrades it to the premium-design-build editorial
 * treatment.
 *
 * Left: twilight-patio placeholder with the owner cutout implied.
 * Right: italic-accent pull-line + short bio + signature.
 */
export default function OwnerTwilightFeature() {
  return (
    <section id="about" className="section bg-brand-cream">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden placeholder-twilight shadow-card-lift">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
              {/* Owner cutout placeholder — a simple silhouette block. */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] aspect-[3/5] rounded-t-[120px] bg-brand-ink/80" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="text-h4-label text-brand-gold mb-5">Meet the Owner</p>
            <h2 className="text-h2-mobile md:text-h2-display text-brand-ink mb-6">
              &#123;&#123;CITY&#125;&#125; native
              <br />
              <span className="italic-accent text-brand-gold">&#123;&#123;OWNER_NAME&#125;&#125;</span>
            </h2>
            <p className="text-body-lg text-brand-ink-soft mb-5">
              I grew up on the mesa. I learned landscape architecture so I could build outdoor
              rooms for my neighbors that would still feel like home after a hot summer and a
              freezing winter.
            </p>
            <p className="text-body-lg text-brand-ink-soft mb-8">
              Every client works directly with me, start to finish. Six commissions a year, no
              subcontracting out the design, no junior PM running the job. That&rsquo;s the bargain.
            </p>
            <p className="italic-accent text-[28px] text-brand-gold">&mdash; &#123;&#123;OWNER_FIRST&#125;&#125;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
