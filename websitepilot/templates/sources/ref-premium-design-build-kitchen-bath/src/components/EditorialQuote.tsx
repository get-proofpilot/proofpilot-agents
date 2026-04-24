/**
 * EditorialQuote — kitchen/bath specialization. Oversized italic-Fraunces
 * pull quote, single homeowner voice. Tone is specific to the lived
 * experience of a kitchen remodel: timeline kept, mess managed, the
 * details the studio caught that the homeowner didn't have to think about.
 */
export default function EditorialQuote() {
  return (
    <section className="section bg-brand-cream">
      <div className="container-narrow text-center">
        <p className="text-h4-label text-brand-gold mb-10">Homeowner, Hillcrest Kitchen</p>

        <blockquote className="italic-accent text-[32px] md:text-[44px] leading-[1.1] text-brand-ink mb-10">
          &ldquo;Five months, on schedule, on budget. The cabinet pull I forgot to confirm? They
          remembered. The way light hits the island at 4pm? They thought of that before we did.&rdquo;
        </blockquote>

        <p className="text-h4-label text-brand-ink-muted">
          {`{{ CLIENT_INITIAL }}. {{ CLIENT_LAST_INITIAL }}. — Kitchen + Hearth, {{ CITY }}`}
        </p>
      </div>
    </section>
  );
}
