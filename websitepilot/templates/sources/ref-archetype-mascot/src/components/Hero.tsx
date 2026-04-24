/**
 * Hero — archetype-mascot.
 *
 * Structural moves the source uses:
 *   - Dark night-sky "hero-surface" with layered mountain silhouettes.
 *   - GIANT 3-word stack (display-giga, 123px/900 UPPER) as main headline.
 *   - Single sub-paragraph.
 *   - Single orange CTA.
 *   - Mascot tucked into the hero surface to the right / behind.
 *
 * Swap targets: headline 3 lines, subheadline, CTA label/href, mascot.
 */
export default function Hero() {
  return (
    <section className="hero-surface relative min-h-[640px] lg:min-h-[760px] flex items-center">
      {/* Mascot placeholder — right-side peek */}
      <img
        src="/placeholder-mascot.svg"
        alt="Mascot placeholder"
        className="absolute right-0 bottom-0 h-[70%] lg:h-[88%] pointer-events-none select-none animate-float opacity-95"
      />

      <div className="container relative z-10 py-20 lg:py-28 text-brand-onDark">
        <div className="max-w-4xl">
          <h1 className="display-giga text-white">
            <span className="block">{"{{HEADLINE LINE 1}}"}</span>
            <span className="block">{"{{HEADLINE LINE 2}}"}</span>
            <span className="block">{"{{HEADLINE LINE 3}}"}</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-xl text-brand-onDarkMuted font-medium">
            {"{{SUBHEADLINE — one-sentence promise combining speed + safety + smart tech.}}"}
          </p>

          <div className="mt-8">
            <a href="#contact" className="btn-primary btn-xl">
              {"{{PRIMARY CTA — e.g. GET A FAST QUOTE}}"}
              <span aria-hidden className="inline-block">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
