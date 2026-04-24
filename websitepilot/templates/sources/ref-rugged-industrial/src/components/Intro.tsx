export default function Intro() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">
            Concrete Coatings In [METRO]
          </div>
          <h2 className="section-headline leading-[1.02]">
            We&rsquo;re Your One-Stop Shop for Floor Coatings
          </h2>
          <p className="font-body text-text-body text-[15px] md:text-base mt-5 leading-relaxed">
            Adding coatings to your concrete, patio, deck, garage, basement, and other floors transforms dull, damaged
            slabs into rugged surfaces you&rsquo;re proud to stand on. Our crew installs in a single day using a
            polyaspartic system built to handle hot tires, winter salt, and the occasional dropped wrench.
          </p>
          <p className="font-body text-text-body text-[15px] md:text-base mt-4 leading-relaxed">
            Locally owned. Factory-trained. Fully insured. We show up when we say we will &mdash; and we back every job
            with our 100% satisfaction guarantee.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href="#quote" className="btn-rugged">See Pricing</a>
            <a href="#services" className="btn-rugged btn-rugged--ink">All Services</a>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full">
          <img src="/placeholder-floor.svg" alt="Finished floor" className="absolute inset-0 w-full h-full object-cover rounded-[4px]" />
          <div className="absolute -bottom-4 -right-4 bg-concrete text-white px-5 py-4 rounded-[4px] shadow-ribbon hidden md:block">
            <div className="font-display font-black text-2xl leading-none">15+</div>
            <div className="font-display font-semibold uppercase text-[11px] tracking-[0.14em] mt-1">Years Rugged</div>
          </div>
        </div>
      </div>
    </section>
  );
}
