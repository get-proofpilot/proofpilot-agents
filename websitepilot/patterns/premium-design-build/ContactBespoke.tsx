/**
 * ContactBespoke — "Begin the conversation" inquiry form, never "Get a Quote".
 * Centered italic-accent lede, 2-column form on cream-warm, single primary CTA.
 * This is the preset's contact-CTA signature.
 */
type Props = {
  eyebrow?: string;
  heading?: string;
  italicPullLine?: string;
  supportingCopy?: string;
  scopes?: string[];
  submitLabel?: string;
  brand?: { goldHex?: string };
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const defaultScopes = [
  "Landscape architecture — full estate",
  "Hardscape &amp; outdoor room",
  "Pool / spa surround",
  "Commercial campus",
  "Other / unsure",
];

export default function ContactBespoke({
  eyebrow = "Inquiries",
  heading = "Begin the conversation.",
  italicPullLine = "six commissions a year. we'd love to hear about yours.",
  supportingCopy = "Share a few details about your property and timeline. If the fit is right, we'll reach out within two business days to schedule a discovery call.",
  scopes = defaultScopes,
  submitLabel = "Send Inquiry",
  brand = { goldHex: "#B08A3E" },
  onSubmit,
}: Props) {
  const gold = brand.goldHex ?? "#B08A3E";

  return (
    <section id="contact" className="py-28 bg-[var(--brand-cream-warm,#EFE7D4)]">
      <div className="max-w-[820px] mx-auto px-7 text-center mb-12">
        <p className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-5" style={{ color: gold }}>
          {eyebrow}
        </p>
        <h2 className="font-display font-bold mb-5" style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, color: "#111" }}>
          {heading}
        </h2>
        <p
          className="italic-accent mb-6"
          style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: gold, fontSize: "clamp(22px, 2vw, 32px)", lineHeight: 1.25, fontWeight: 400 }}
        >
          {italicPullLine}
        </p>
        <p className="text-[18px]" style={{ color: "#2A2A28", lineHeight: 1.6 }}>
          {supportingCopy}
        </p>
      </div>

      <div className="max-w-[820px] mx-auto px-7">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={onSubmit}>
          <input className="input" placeholder="Full name" required />
          <input className="input" placeholder="Email" type="email" required />
          <input className="input" placeholder="Phone" type="tel" />
          <input className="input" placeholder="Project address" />
          <select className="input md:col-span-2" defaultValue="" required>
            <option value="" disabled>Project scope</option>
            {scopes.map((s) => (
              <option key={s} dangerouslySetInnerHTML={{ __html: s }} />
            ))}
          </select>
          <textarea className="input md:col-span-2" rows={5} placeholder="Tell us about the property and vision..." />
          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
            <p className="text-[12px]" style={{ color: "#6F6E6A" }}>
              Your information is kept confidential. No sales lists.
            </p>
            <button type="submit" className="btn btn-primary self-start md:self-auto">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
