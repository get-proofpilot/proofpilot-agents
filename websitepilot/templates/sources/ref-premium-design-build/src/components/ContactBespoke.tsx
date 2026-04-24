/**
 * ContactBespoke — a bespoke "Begin the Conversation" contact block, not a
 * "Get A Quote" form. Single column on cream-warm, sparse fields, italic
 * accent lede. Mirrors Cinco's hero-side form, moved to the bottom and
 * restyled for the editorial voice.
 */
export default function ContactBespoke() {
  return (
    <section id="contact" className="section section-warm">
      <div className="container-narrow text-center mb-12">
        <p className="text-h4-label text-brand-gold mb-5">Inquiries</p>
        <h2 className="text-h2-mobile md:text-h2-display text-brand-ink mb-5">
          Begin the conversation.
        </h2>
        <p className="italic-accent text-italic-accent-sm md:text-italic-accent-lg text-brand-gold mb-6">
          six commissions a year. we&rsquo;d love to hear about yours.
        </p>
        <p className="text-body-lg text-brand-ink-soft">
          Share a few details about your property and timeline. If the fit is right, we&rsquo;ll
          reach out within two business days to schedule a discovery call.
        </p>
      </div>

      <div className="container-narrow">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input className="input" placeholder="Full name" />
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Phone" type="tel" />
          <input className="input" placeholder="Project address" />
          <select className="input md:col-span-2" defaultValue="">
            <option value="" disabled>
              Project scope
            </option>
            <option>Landscape architecture &mdash; full estate</option>
            <option>Hardscape &amp; outdoor room</option>
            <option>Pool / spa surround</option>
            <option>Commercial campus</option>
            <option>Other / unsure</option>
          </select>
          <textarea
            className="input md:col-span-2"
            rows={5}
            placeholder="Tell us about the property and vision..."
          />

          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
            <p className="text-[12px] text-brand-ink-muted">
              Your information is kept confidential. No sales lists.
            </p>
            <button type="submit" className="btn btn-primary self-start md:self-auto">
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
