/**
 * Process — archetype-mascot.
 *
 * Three numbered step cards (01 / 02 / 03) stacked horizontally, each with:
 *   - Orange circle step badge
 *   - Step title (display-step, 33px 700)
 *   - 2–3 line description
 *   - A CTA repeat with the orange hand-pointer icon affordance
 *
 * Runs on cream bg with a big icon-illustration watermark (source uses
 * the longboat illustration). We leave watermark as a placeholder.
 */
const steps = [
  {
    n: "01",
    title: "{{Step 1 Title — e.g. Get A Fast Quote}}",
    body: "{{2-sentence description of step 1 — what the customer does and what they receive.}}",
  },
  {
    n: "02",
    title: "{{Step 2 Title — e.g. Set A Schedule}}",
    body: "{{2-sentence description of step 2.}}",
  },
  {
    n: "03",
    title: "{{Step 3 Title — e.g. Sit Back & Relax}}",
    body: "{{2-sentence description of step 3.}}",
  },
];

export default function Process() {
  return (
    <section className="section-cream py-24 lg:py-32 relative overflow-hidden">
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow text-brand-primary">{"{{EYEBROW — OUR SIMPLE 3 STEP PROCESS}}"}</p>
          <h2 className="display-h2 text-brand-dark mt-2 normal-case">
            {"{{Getting world-class service has never been easier}}"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-card bg-white shadow-card p-8 text-left border border-black/5"
            >
              <div className="inline-flex items-center gap-2 bg-brand-primary text-brand-dark font-black uppercase px-4 py-1 rounded-btn">
                <span>STEP</span>
                <span className="text-brand-primaryInk">{s.n}</span>
              </div>
              <h3 className="display-step mt-5 text-brand-dark">{s.title}</h3>
              <p className="mt-3 text-sm text-brand-ink leading-relaxed">{s.body}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-brand-primary font-bold uppercase hover:underline"
              >
                <span aria-hidden>←</span>
                {"{{CTA LABEL}}"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
