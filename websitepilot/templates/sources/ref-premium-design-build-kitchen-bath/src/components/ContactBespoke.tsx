/**
 * ContactBespoke — kitchen/bath specialization. "Begin the Conversation" stays
 * the headline. Project-scope select is rewritten for kitchen + bath +
 * whole-floor scopes. Two extra fields: rough budget envelope (so we can
 * self-qualify) and target start window (so we can scope the calendar).
 *
 * NEVER renamed to "Get a Quote" — the editorial preset's signature is the
 * conversation, not the quote.
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
          eight commissions a year. we&rsquo;d love to hear about yours.
        </p>
        <p className="text-body-lg text-brand-ink-soft">
          Share a few details about your home and timeline. If the fit is right, we&rsquo;ll reach
          out within two business days to schedule a discovery call.
        </p>
      </div>

      <div className="container-narrow">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input className="input" placeholder="Full name" />
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Phone" type="tel" />
          <input className="input" placeholder="Project address" />
          <select className="input" defaultValue="">
            <option value="" disabled>
              Project scope
            </option>
            <option>Kitchen remodel</option>
            <option>Primary bath</option>
            <option>Powder room</option>
            <option>Multi-bath / second floor</option>
            <option>Kitchen + bath together</option>
            <option>Whole-floor remodel</option>
            <option>Other / unsure</option>
          </select>
          <select className="input" defaultValue="">
            <option value="" disabled>
              Budget envelope
            </option>
            <option>$75k &ndash; $150k</option>
            <option>$150k &ndash; $300k</option>
            <option>$300k &ndash; $500k</option>
            <option>$500k+</option>
            <option>Still scoping</option>
          </select>
          <select className="input md:col-span-2" defaultValue="">
            <option value="" disabled>
              Target start window
            </option>
            <option>Within 3 months</option>
            <option>3 &ndash; 6 months out</option>
            <option>6 &ndash; 12 months out</option>
            <option>Planning ahead, no rush</option>
          </select>
          <textarea
            className="input md:col-span-2"
            rows={5}
            placeholder="Tell us about the home, the room, and what you'd like to change..."
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
