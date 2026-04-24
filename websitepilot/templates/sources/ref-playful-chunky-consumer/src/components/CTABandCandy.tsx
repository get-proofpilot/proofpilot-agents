export default function CTABandCandy() {
  return (
    <section className="relative" aria-label="Consultation CTA">
      <div className="lights-divider" aria-hidden />
      <div className="bg-brand-accent">
        <div className="mx-auto max-w-[1320px] px-6 py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="kicker text-white/80">Free Consultation</div>
            <h2 className="display-h1 text-white mt-2">
              {/* {{CTA-H2}} */}
              Get Your Free Holiday Light Design Consultation!
            </h2>
            <p className="text-white/90 mt-3 text-[17px] max-w-2xl leading-relaxed">
              {/* {{CTA-P}} */}
              Reach out for your complimentary design consultation. We&rsquo;ll show you what your property could look like, fully lit up.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <a href="#quote" className="btn-primary btn-xl">Free Consultation</a>
            <a href="tel:{{PHONE-RAW}}" className="btn-ghost-light">
              {/* {{PHONE-DISPLAY}} */}555-000-0000
            </a>
          </div>
        </div>
      </div>
      <div className="lights-divider" aria-hidden />
    </section>
  );
}
