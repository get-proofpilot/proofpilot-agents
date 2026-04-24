const NAV = ['Home', 'Services', 'Color Options', 'Financing', 'Our Process', 'About', 'Contact'];

export default function Header() {
  return (
    <header className="bg-ink border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        <a href="#" className="flex items-center gap-3">
          {/* Placeholder hex-diamond mark */}
          <svg width="40" height="44" viewBox="0 0 40 44" aria-hidden="true">
            <path d="M20 2 L37 12 L37 32 L20 42 L3 32 L3 12 Z" fill="none" stroke="#0071BA" strokeWidth="2" />
            <path d="M20 10 L30 16 L30 28 L20 34 L10 28 L10 16 Z" fill="#0071BA" />
          </svg>
          <div className="leading-tight">
            <div className="font-display font-black text-white text-xl uppercase tracking-wide">[BRAND]</div>
            <div className="font-display font-semibold text-steel-ink text-[10px] uppercase tracking-[0.18em]">Concrete Coatings</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((item) => (
            <a
              key={item}
              href="#"
              className="font-display font-semibold text-[13px] uppercase tracking-wide text-white hover:text-concrete transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <a href="#quote" className="btn-rugged hidden md:inline-flex">
          Get a Free Quote
        </a>
      </div>
    </header>
  );
}
