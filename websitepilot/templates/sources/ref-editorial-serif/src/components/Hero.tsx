/**
 * Hero — full-bleed architectural photo, ~100vh.
 *
 *   Bottom-LEFT : eyebrow H2 (non-italic serif caps) + italic serif H1 — TWO-LINE
 *                 composition is the signature. "Transform Your" above, italic
 *                 "Outdoor Space" below.
 *   Bottom-RIGHT: translucent ink card with subcopy + single filled green CTA.
 *
 * The commissioned architectural photograph is the art. Do NOT add slashes,
 * gradients, or decorative overlays on top — only a soft 10-55% vertical
 * darkening for text legibility.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-ink">
      {/* Placeholder architectural photo — commissioned hero image here */}
      <div
        className="absolute inset-0 bg-brand-ink"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #2a2926 0%, #4a4740 45%, #6b6558 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="{{HERO_PHOTO — commissioned architectural exterior}}"
      >
        {/* Representative photo grid placeholder — replace with client photo */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_70%,rgba(255,252,244,0.15),transparent_50%)]" />
      </div>
      <div className="photo-overlay" />

      {/* Hero composition — bottom-aligned */}
      <div className="relative z-10 h-screen flex flex-col justify-end pb-20 lg:pb-28">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
          {/* LEFT: two-line headline */}
          <div>
            <h2 className="font-display text-brand-cream uppercase tracking-[0.06em] text-[28px] lg:text-[36px] leading-tight mb-2">
              {"{{HERO_EYEBROW — Transform Your}}"}
            </h2>
            <h1 className="font-display italic text-brand-cream text-[54px] md:text-[72px] lg:text-[92px] leading-[1.05]">
              {"{{HERO_H1 — Outdoor Space}}"}
            </h1>
          </div>

          {/* RIGHT: subcopy card + green CTA */}
          <div className="bg-brand-ink/55 backdrop-blur-md p-7 md:p-8 shadow-hero-card border border-brand-cream/10">
            <p className="font-display text-brand-cream text-[17px] leading-[1.55] mb-6">
              {
                "{{HERO_SUBCOPY — Design-Build Excellence Spanning New Construction Home Installs, Estate Remodels, Landscape Design, And Fully Integrated Outdoor Living.}}"
              }
            </p>
            <a href="#contact" className="btn btn-primary w-full italic">
              Schedule Discovery Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
