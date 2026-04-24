/**
 * ProcessPremium — the 5-step commission process rendered on an ink section
 * with italic-serif stage numbers. Mirrors Cinco's Free Consultation → 3D
 * Design & Quote → Scheduling → Construction → Final Walkthrough rhythm,
 * adapted to the editorial treatment.
 */
type Step = { n: string; title: string; body: string };

const steps: Step[] = [
  {
    n: "01",
    title: "Discovery",
    body: "A private studio visit or site walk. We map goals, constraints, and budget before anything is drawn.",
  },
  {
    n: "02",
    title: "Concept &amp; Design",
    body: "Hand sketches become 3D renders and construction drawings. One revision round is included.",
  },
  {
    n: "03",
    title: "Proposal &amp; Scheduling",
    body: "Line-item proposal, long-lead materials ordered, crew blocked on the calendar.",
  },
  {
    n: "04",
    title: "Construction",
    body: "Our in-house crew executes. Daily photos, weekly walkthroughs, one point of contact.",
  },
  {
    n: "05",
    title: "Final Walkthrough",
    body: "Punch list closed, warranty registered, plant care guide delivered.",
  },
];

export default function ProcessPremium() {
  return (
    <section id="process" className="section section-ink">
      <div className="container-wide">
        <div className="max-w-2xl mb-14">
          <p className="text-h4-label text-brand-gold-soft mb-4">How We Work</p>
          <h2 className="text-h2-mobile md:text-h2-display text-brand-cream">
            Five stages, <span className="italic-accent text-brand-gold-soft">one studio</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {steps.map((s) => (
            <article key={s.n} className="lg:border-l border-brand-cream/15 lg:pl-5">
              <p className="italic-accent text-[56px] leading-none text-brand-gold-soft mb-5">
                {s.n}
              </p>
              <h3
                className="text-h3-card text-brand-cream mb-3"
                dangerouslySetInnerHTML={{ __html: s.title }}
              />
              <p
                className="text-body-base text-brand-cream/70"
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
