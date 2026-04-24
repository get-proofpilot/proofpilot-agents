/**
 * Header — transparent over hero, sticky-opaque on scroll (client-side only shell).
 * Primary nav is full-bleed but container-constrained. CTA on the right is a
 * restrained 4px-radius outlined button, not a pill.
 *
 * Kitchen/bath specialization: nav swaps "Services" for "Kitchens" + "Baths"
 * as separate entry points, and adds a "By Appointment" sublabel under the
 * Start a Project CTA — the kitchen/bath buyer expects a curated process,
 * not a quote-request form.
 */
export default function Header() {
  const nav = ["Kitchens", "Baths", "Portfolio", "Process", "About", "Journal", "Contact"];
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-5">
      <div className="container-wide flex items-center justify-between">
        {/* Brand monogram — a serif italic wordmark placeholder */}
        <a href="#" className="flex items-center gap-2 text-brand-cream">
          <span className="h-8 w-8 rounded-sm border border-brand-cream/70 flex items-center justify-center italic-accent text-[18px] text-brand-cream">
            B
          </span>
          <span className="font-display font-semibold tracking-[-0.01em] text-[18px] text-brand-cream">
            &#123;&#123;BRAND_NAME&#125;&#125;
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[14px] font-medium tracking-[0.04em] text-brand-cream/90 hover:text-brand-gold-soft transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex flex-col items-end gap-1">
          <a href="#contact" className="btn btn-ghost-light">
            Start a Project
          </a>
          <span className="italic-accent text-[12px] tracking-wide text-brand-cream/70">
            by appointment
          </span>
        </div>
      </div>
    </header>
  );
}
