import { Menu, Phone } from "lucide-react";

/**
 * Header — archetype-mascot.
 *
 * Pattern captured from the source:
 *   - Logo left (horizontal lockup, mascot-face + brand wordmark).
 *   - Centered primary nav with dropdown hints.
 *   - Phone-pill far right.
 *   - Height ~110px on desktop. Bar sits ABOVE hero (not overlaid).
 *   - At <lg collapses to logo + click-to-call + menu trigger.
 *
 * Swap targets: logo.svg, phone text, nav labels.
 */
export default function Header() {
  return (
    <header className="w-full bg-white/95 backdrop-blur border-b border-black/5 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4 py-4">
        {/* Logo lockup (PLACEHOLDER) */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <div className="h-14 w-14 rounded-full bg-brand-dark grid place-items-center text-brand-onDark font-black">
            VV
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-brand-dark font-black text-xl">
              {"{{BRAND NAME}}"}
            </span>
            <span className="text-brand-primary font-bold uppercase text-xs tracking-wider">
              {"{{BRAND TAGLINE}}"}
            </span>
          </div>
        </a>

        {/* Primary nav */}
        <nav className="hidden lg:flex items-center gap-7 text-brand-dark font-semibold uppercase text-sm">
          <a href="#" className="hover:text-brand-primary">Home</a>
          <a href="#" className="hover:text-brand-primary">About</a>
          <a href="#services" className="hover:text-brand-primary">Services</a>
          <a href="#area" className="hover:text-brand-primary">Service Area</a>
          <a href="#reviews" className="hover:text-brand-primary">Reviews</a>
          <a href="#" className="hover:text-brand-primary">Contact</a>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+15555555555"
            className="btn-phone hidden sm:inline-flex"
            aria-label="Call"
          >
            <Phone className="h-4 w-4" />
            <span>{"{{PHONE}}"}</span>
          </a>
          <button
            className="lg:hidden inline-flex items-center justify-center h-12 w-12 rounded-btn bg-brand-dark text-brand-onDark"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
