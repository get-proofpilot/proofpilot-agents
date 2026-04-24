/**
 * CTABand — archetype-mascot.
 *
 * Full-bleed orange guarantee band OR dark-mountain final CTA. The source
 * uses TWO such bands:
 *   - Mid-page orange band ("100% SATISFACTION GUARANTEE FOR ALL SERVICES")
 *   - End-page dark band ("READY FOR A LEGENDARY ELECTRICAL SERVICE?")
 *
 * Both are simple headline + sub + CTA — same structure, different surface.
 * Expose a `variant` prop via the pattern version in /patterns/.
 */
export default function CTABand() {
  return (
    <section
      id="contact"
      className="section-darker py-24 lg:py-32 relative overflow-hidden"
    >
      {/* decorative mountain strip */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          clipPath:
            "polygon(0 100%,10% 60%,22% 90%,35% 55%,48% 88%,60% 58%,72% 85%,85% 60%,100% 90%,100% 100%)",
          background: "linear-gradient(180deg,#170331 0%,#080115 100%)",
        }}
      />
      {/* Placeholder mascot silhouette on right */}
      <img
        src="/placeholder-mascot.svg"
        alt=""
        aria-hidden
        className="absolute -right-10 bottom-0 h-[78%] opacity-75 pointer-events-none"
      />

      <div className="container relative z-10 text-center">
        <h2 className="display-hero text-brand-onDark max-w-4xl mx-auto">
          {"{{READY FOR LEGENDARY {{SERVICE}}?}}"}
        </h2>
        <p className="mt-5 text-lg text-brand-onDarkMuted max-w-2xl mx-auto">
          {"{{One-sentence reinforcement of urgency + guarantee.}}"}
        </p>
        <div className="mt-8">
          <a href="tel:+15555555555" className="btn-primary btn-xl">
            {"{{PRIMARY CTA}}"}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
