/**
 * Header — transparent-over-hero at top, cream-opaque once scrolled past hero.
 * Logo left (monogram crown glyph), 4 center dropdown labels, ghost-light CTA right.
 *
 * Kingswood's nav treatment: serif labels, no underline, small caret chevron.
 * Swap crown monogram for client's mark. Keep the serif — that is the DNA.
 */
export default function Header() {
  const nav = ["Pages", "Landscape Services", "Design & Build", "About"];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container-wide flex items-center justify-between py-8">
        <a href="/" className="flex items-center gap-3 shrink-0" aria-label="{{BRAND_NAME}} home">
          {/* Placeholder crown monogram — swap for client mark */}
          <svg viewBox="0 0 64 42" className="w-14 h-9" aria-hidden="true">
            <path
              d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
              fill="#FFFCF4"
              opacity="0.95"
            />
          </svg>
          <span className="font-display text-brand-cream text-lg tracking-[0.18em] uppercase leading-none">
            {"{{BRAND_NAME}}"}
            <span className="block font-display text-[10px] tracking-[0.3em] text-brand-cream/70 mt-1">
              {"{{BRAND_TAGLINE}}"}
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-10 font-display text-brand-cream">
          {nav.map((n) => (
            <a key={n} href="#" className="text-base flex items-center gap-1 hover:text-brand-accent transition-colors">
              {n}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-ghost-light">
          Schedule Discovery Call
        </a>
      </div>
    </header>
  );
}
