export default function Intro() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">
            Pest Control In [METRO]
          </div>
          <h2 className="section-headline leading-[1.02]">
            One Family. One Set Of Techs. Every Visit.
          </h2>
          <p className="font-body text-text-body text-[15px] md:text-base mt-5 leading-relaxed">
            We handle the desert&rsquo;s worst &mdash; scorpions, spiders, termites, ants, roaches, rodents &mdash; with
            a bi-monthly protocol that treats the inside, the outside, and the perimeter every single visit.
            Pet-safe, family-safe, and same-day available.
          </p>
          <p className="font-body text-text-body text-[15px] md:text-base mt-4 leading-relaxed">
            Locally owned. W-2 technicians (no subcontractors). Free re-treats between visits. We show up when we
            say we will &mdash; and we back every visit with our come-back guarantee.
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
            <div className="font-display font-semibold uppercase text-[11px] tracking-[0.14em] mt-1">Years In The Desert</div>
          </div>
        </div>
      </div>
    </section>
  );
}
