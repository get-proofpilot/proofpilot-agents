/**
 * Header — white sticky bar.
 * Logo left, nav center, red "Book Now" + dark "Call" CTAs right.
 * Swap logo placeholder for client logo.
 */
export default function Header() {
  const nav = [
    "Plumbing Services",
    "Lines, Pipes & Sewer",
    "Water Heaters",
    "Service Areas",
    "About Us",
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-white border-b border-brand-gray-soft/60">
      <div className="container-1200 flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3 shrink-0">
          {/* Placeholder logo — red bear silhouette */}
          <div
            className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center text-brand-white font-display font-extrabold text-2xl"
            aria-label="{{CLIENT LOGO HERE}}"
          >
            BP
          </div>
          <span className="font-display font-extrabold uppercase text-brand-ink text-xl leading-tight">
            {"{{BRAND_NAME}}"}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1 font-display font-bold text-btn-base text-brand-ink uppercase">
          {nav.map((n) => (
            <a key={n} href="#" className="px-3 py-2 hover:text-brand-red transition-colors">
              {n}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#quote" className="btn btn-primary hidden md:inline-flex">
            Book Now
          </a>
          <a href="tel:2813502327" className="btn btn-dark">
            Call: (281) 350-BEAR
          </a>
        </div>
      </div>
    </header>
  );
}
