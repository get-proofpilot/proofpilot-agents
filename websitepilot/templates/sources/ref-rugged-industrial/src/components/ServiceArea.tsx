const CITIES = [
  ['[City One]', '[City Two]', '[City Three]', '[City Four]'],
  ['[City Five]', '[City Six]', '[City Seven]', '[City Eight]'],
  ['[City Nine]', '[City Ten]', '[City Eleven]', '[City Twelve]'],
];

export default function ServiceArea() {
  return (
    <section className="relative section-pad bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-slash opacity-70" aria-hidden="true" />
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">Proudly Serving</div>
          <h2 className="section-headline section-headline--light">
            Get The Highest Quality Coatings Across [METRO]
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 mt-6">
            {CITIES.flat().map((c) => (
              <a key={c} href="#" className="font-display font-semibold uppercase text-[13px] tracking-wide text-white/80 hover:text-concrete">
                {c}
              </a>
            ))}
          </div>
          <a href="#quote" className="btn-rugged mt-8 inline-flex">Check My ZIP</a>
        </div>
        <div className="relative aspect-[3/2] w-full">
          <img src="/placeholder-map.svg" alt="Service area map" className="absolute inset-0 w-full h-full object-cover rounded-[4px] border border-white/10" />
        </div>
      </div>
    </section>
  );
}
