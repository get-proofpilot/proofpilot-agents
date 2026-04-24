const SERVICES = [
  'Garage Floors',
  'Patio Coatings',
  'Basement Floors',
  'Pool Decks',
  'Commercial',
  'Epoxy',
  'Resin Stone',
  'Rubber Stone',
];

export default function ServiceRibbon() {
  return (
    <div className="bg-concrete-deep text-white">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 md:px-8 py-4">
        {SERVICES.map((label, i) => (
          <div key={label} className="flex items-center gap-8">
            <a href="#" className="font-display font-bold uppercase tracking-wide text-[13px] md:text-sm text-white hover:text-white/70">
              {label}
            </a>
            {i < SERVICES.length - 1 && (
              <span className="w-1.5 h-1.5 rotate-45 bg-white/50" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
