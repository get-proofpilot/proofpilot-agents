/**
 * CTABand — "Considering what's next for your property? Let's begin the conversation."
 *
 * Dark ink band with italic serif H2, short supporting copy, and a two-button
 * row (primary green + light ghost). The discovery-call-first motion is the
 * editorial-serif conversion anchor — no forms here, only a call-booking CTA.
 *
 * Minimal contact metadata below the CTAs: hours, phone, studio address.
 */
export default function CTABand() {
  return (
    <section id="contact" className="section section-ink">
      <div className="container-narrow text-center">
        <div className="font-display italic text-brand-accent text-sm tracking-[0.2em] uppercase mb-5">
          {"{{CTA_EYEBROW — Begin The Conversation}}"}
        </div>
        <h2 className="font-display text-brand-cream text-[34px] md:text-[50px] leading-[1.15] mb-6">
          <span>
            {"{{CTA_H2_LINE1 — Considering what's next for your property? }}"}
          </span>
          <em className="block">{"{{CTA_H2_LINE2 — Let's begin the conversation.}}"}</em>
        </h2>
        <p className="text-brand-cream/75 text-[17px] leading-[1.6] max-w-[580px] mx-auto mb-10">
          {
            "{{CTA_SUBCOPY — A discovery call is the first step. We'll listen, walk your property, and recommend an approach worthy of the investment.}}"
          }
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="tel:{{PHONE_E164}}" className="btn btn-ghost-light">
            Call {"{{PHONE_DISPLAY}}"}
          </a>
          <a href="#" className="btn btn-primary">
            Schedule Discovery Call
          </a>
        </div>

        <div className="mt-16 pt-10 border-t border-brand-cream/15 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <div className="font-display italic text-brand-accent text-xs tracking-[0.2em] uppercase mb-2">
              Studio
            </div>
            <div className="text-brand-cream/80 text-sm leading-relaxed">
              {"{{ADDRESS_LINE_1}}"}
              <br />
              {"{{ADDRESS_LINE_2}}"}
            </div>
          </div>
          <div>
            <div className="font-display italic text-brand-accent text-xs tracking-[0.2em] uppercase mb-2">
              Hours
            </div>
            <div className="text-brand-cream/80 text-sm leading-relaxed">
              Mon — Fri 9:00 AM to 5:00 PM
              <br />
              Saturday by appointment
            </div>
          </div>
          <div>
            <div className="font-display italic text-brand-accent text-xs tracking-[0.2em] uppercase mb-2">
              Inquiries
            </div>
            <div className="text-brand-cream/80 text-sm leading-relaxed">
              {"{{EMAIL}}"}
              <br />
              {"{{PHONE_DISPLAY}}"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
