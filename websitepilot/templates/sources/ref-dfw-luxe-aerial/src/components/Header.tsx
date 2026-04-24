const NAV = ['Home', 'Pools', 'Outdoor Living', 'Portfolio', 'About', 'FAQ', 'Contact'];

export default function Header() {
  return (
    <div className="w-full">
      {/* Utility bar */}
      <div className="bg-navy text-white text-xs md:text-sm">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 py-2">
          <div className="flex items-center gap-4 opacity-80">
            <span className="hidden md:inline">TikTok</span>
            <span className="hidden md:inline">Instagram</span>
            <span className="hidden md:inline">Facebook</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-body font-semibold tracking-wide">[CITY / METRO]</span>
            <a href="tel:" className="font-body font-semibold tracking-wide text-accent">
              (000) 000-0000
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-white border-b border-navy/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-2">
            {/* Placeholder logo — replace with brand mark */}
            <div className="w-10 h-10 rounded bg-navy grid place-items-center text-white font-display text-xl">
              [L]
            </div>
            <span className="font-display text-navy text-2xl tracking-wide">[BRAND NAME]</span>
          </div>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="font-body font-medium text-[14px] text-navy hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#quote" className="btn-chunk">
            Get a Free Quote
          </a>
        </div>
      </header>
    </div>
  );
}
