export default function CTAFinal() {
  return (
    <section id="contact" className="section-dark relative overflow-hidden">
      <div className="lights-divider absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28 text-center relative z-10">
        <div className="kicker text-brand-primary">Immediate Assistance</div>
        <h2 className="display-hero text-white mt-4 max-w-4xl mx-auto">
          {/* {{CTA-FINAL-H2}} */}
          Ready to Get the Best Holiday Lighting in the East Valley?
        </h2>
        <p className="text-brand-onDarkMuted mt-5 text-[18px]">
          {/* {{CTA-FINAL-P}} */}
          Call or text anytime for fast help. No voicemail jail, no &ldquo;press 9.&rdquo;
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#quote" className="btn-primary btn-xl">Get a Fast Quote</a>
          <a href="tel:{{PHONE-RAW}}" className="btn-ghost-light">
            Call {/* {{PHONE-DISPLAY}} */}555-000-0000
          </a>
          <a href="sms:{{PHONE-RAW}}" className="btn-accent" style={{ color: "#fff", background: "#D11F2E" }}>
            Text {/* {{PHONE-DISPLAY}} */}555-000-0000
          </a>
        </div>
      </div>
    </section>
  );
}
