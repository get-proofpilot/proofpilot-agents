const CITIES = [
  "Queen Creek",
  "San Tan Valley",
  "Gilbert",
  "Chandler",
  "Mesa",
  "Apache Junction",
  "Tempe",
  "Scottsdale",
  "Higley",
  "Florence",
];

export default function ServiceArea() {
  return (
    <section id="area" className="section-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="kicker text-brand-accent">Service Area</div>
            <h2 className="display-h1 text-brand-dark mt-3">
              {/* {{AREA-H2}} */}
              Get the Best Holiday Lighting in the East Valley Area
            </h2>
            <p className="mt-5 text-brand-inkMuted text-[17px] leading-relaxed">
              {/* {{AREA-P}} */}
              We proudly serve homes and businesses across the East Valley. Not sure if we cover your neighborhood? Just ask.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="kicker text-brand-dark bg-white border-2 border-brand-dark/20 rounded-btn px-4 py-2 hover:border-brand-accent transition-colors"
                >
                  {c}
                </span>
              ))}
            </div>

            <a href="#quote" className="btn-primary btn-xl mt-8">Get a Fast Quote</a>
          </div>

          <div className="aspect-[5/3] w-full rounded-card border-2 border-brand-dark/10 bg-brand-darker flex items-center justify-center shadow-card">
            {/* {{AREA-MAP}} — service-area map image */}
            <div className="text-brand-onDarkMuted font-sans font-semibold uppercase tracking-widest text-sm">
              Service Area Map
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
