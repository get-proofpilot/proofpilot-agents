export default function Header() {
  return (
    <header className="section-dark sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-6 py-3">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-brand-primaryInk font-sans font-black text-lg">
            {/* {{MASCOT-MARK}} */}SB
          </div>
          <div className="font-sans font-black uppercase leading-none text-white">
            <div className="text-lg tracking-tight">{/* {{BRAND-NAME-L1}} */}Placeholder</div>
            <div className="text-xs text-brand-onDarkMuted tracking-[0.12em]">{/* {{BRAND-NAME-L2}} */}Lighting Co.</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7 font-sans font-semibold text-white text-[15px] tracking-wide">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#area">Service Area</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:{{PHONE-RAW}}" className="btn-accent hidden md:inline-flex">
            {/* {{PHONE-DISPLAY}} */}555-000-0000
          </a>
          <a href="#quote" className="btn-primary">
            Get a Fast Quote
          </a>
        </div>
      </div>
    </header>
  );
}
