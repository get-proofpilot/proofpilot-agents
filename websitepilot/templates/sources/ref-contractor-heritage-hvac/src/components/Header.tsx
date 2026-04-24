/**
 * Header — white sticky bar (HVAC variant).
 * Logo left, nav center, red "Get A Free Quote" + dark "Call" CTAs right.
 * Nav reflects HVAC three-door entry: Heating / Cooling / IAQ + service areas.
 * Swap logo placeholder for client logo.
 */
export default function Header() {
  const nav = [
    "Heating",
    "Cooling",
    "Indoor Air Quality",
    "Service Areas",
    "About Us",
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-white border-b border-brand-gray-soft/60">
      <div className="container-1200 flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3 shrink-0">
          {/* Placeholder logo — red HVAC mark */}
          <div
            className="w-14 h-14 rounded-full bg-brand-red flex items-center justify-center text-brand-white font-display font-extrabold text-2xl"
            aria-label="{{CLIENT LOGO HERE}}"
          >
            HC
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
            Get A Free Quote
          </a>
          <a href="tel:5555555555" className="btn btn-dark">
            {"{{PHONE_NUMBER}}"}
          </a>
        </div>
      </div>
    </header>
  );
}
