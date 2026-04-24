/**
 * AboutMascot — "Why Choose {{BRAND}}" — 2-col copy + mascot image.
 * The mascot placeholder is a bear-shaped silhouette — swap for client mascot.
 */
export default function AboutMascot() {
  return (
    <section className="section">
      <div className="container-1200 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="text-h2-desktop uppercase text-brand-ink mb-5">
            Why Choose {"{{BRAND_NAME}}"}
          </h2>
          <p className="text-body-base text-brand-ink/85 mb-4">
            We built our reputation on trust, skill, and a dedication to doing the job right.
            Homeowners appreciate that we don't apply temporary fixes. Instead, we take time to
            understand each issue and provide detailed, long-lasting solutions.
          </p>
          <p className="text-body-base text-brand-ink/85 mb-6">
            We also take pride in serving the {"{{CITY}}"} community. Our team knows the area
            well and understands the unique needs of local homeowners.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#quote" className="btn btn-primary">Book Now</a>
            <a href="tel:2813502327" className="btn btn-dark">Call 281-350-2327</a>
          </div>
        </div>

        <div className="relative aspect-[4/5] bg-brand-gray-soft rounded-card flex items-center justify-center">
          {/* Bear-shaped silhouette placeholder — CLIENT MASCOT HERE */}
          <svg viewBox="0 0 200 240" className="w-2/3 h-2/3 fill-brand-ink/30" aria-label="CLIENT MASCOT HERE">
            <circle cx="60" cy="40" r="20" />
            <circle cx="140" cy="40" r="20" />
            <ellipse cx="100" cy="100" rx="60" ry="55" />
            <ellipse cx="100" cy="180" rx="75" ry="55" />
          </svg>
          <div className="absolute bottom-4 left-4 right-4 text-center text-xs uppercase tracking-wider text-brand-ink/60 bg-brand-white/80 rounded-btn px-3 py-1">
            {"{{CLIENT MASCOT HERE}}"}
          </div>
        </div>
      </div>
    </section>
  );
}
