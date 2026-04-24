/**
 * DesignBuildSystem — adapted from `vertical/RoofingSignatureSystem.tsx`,
 * normalized to the kitchen/bath remodel design-build phases:
 *   01 Discovery → 02 Design → 03 Selection → 04 Build → 05 Reveal
 *
 * The roofing signature is a "system" with a metaphor (Owl's "Protect Your
 * Nest"). Kitchen/bath buyers don't want a metaphor — they want a calendar
 * they can read. So the same numbered-phase structure stays, but the
 * named-system + guarantee block is rewritten as a six-month commission
 * arc with a single italic-Fraunces pull-line.
 *
 * Palette: stays in base (cream + gold + ink) — no warm counter-tone added.
 */
type Phase = {
  n: string;
  title: string;
  duration: string;
  body: string;
};

const phases: Phase[] = [
  {
    n: "01",
    title: "Discovery",
    duration: "Weeks 1–2",
    body: "A studio meeting, then a private site walk. We map how you cook, who lives in the home, and the budget envelope before drawing anything.",
  },
  {
    n: "02",
    title: "Design",
    duration: "Weeks 3–8",
    body: "Hand sketches become full plans, elevations, and a 3D walkthrough. You approve every dimension before a single cabinet is ordered.",
  },
  {
    n: "03",
    title: "Selection",
    duration: "Weeks 8–12",
    body: "Stone-yard visits, plumbing showroom, tile and lighting. We curate three options for every choice so the decisions are clear, not endless.",
  },
  {
    n: "04",
    title: "Build",
    duration: "Weeks 12–22",
    body: "Our in-house crew executes. Daily photos, a weekly walkthrough on site, one project manager — your single point of contact.",
  },
  {
    n: "05",
    title: "Reveal",
    duration: "Week 22–24",
    body: "Final clean, professional photography of your room, and a binder of every spec, warranty, and finish. Then a six-month aftercare check.",
  },
];

export default function DesignBuildSystem() {
  return (
    <section id="process" className="section bg-brand-cream">
      <div className="container-wide">
        {/* System intro */}
        <div className="max-w-3xl mb-14">
          <p className="text-h4-label text-brand-gold mb-4">Our Design-Build System</p>
          <h2 className="text-h2-mobile md:text-h2-display text-brand-ink mb-5">
            Five phases, <span className="italic-accent">one studio</span>, about six months.
          </h2>
          <p className="italic-accent text-italic-accent-sm md:text-italic-accent-lg text-brand-gold mb-6">
            you meet the same three people at week one and at week twenty-four.
          </p>
          <p className="text-body-lg text-brand-ink-soft max-w-2xl">
            Most kitchens take five to six months from discovery to reveal. Whole-floor remodels
            run nine. Every commission moves through the same five phases &mdash; no handoffs, no
            subcontracted design, no surprise change orders.
          </p>
        </div>

        {/* Phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-16">
          {phases.map((p) => (
            <article
              key={p.n}
              className="relative bg-brand-white border border-brand-cream-line rounded-card p-7 shadow-card-lift"
            >
              <span className="absolute -top-4 left-6 px-3 py-1 text-[12px] font-bold tracking-[0.18em] bg-brand-gold text-brand-cream rounded-sm">
                {p.n}
              </span>
              <h3 className="text-h3-card text-brand-ink mt-3 mb-1">{p.title}</h3>
              <p className="italic-accent text-[14px] text-brand-gold mb-4">{p.duration}</p>
              <p className="text-body-base text-brand-ink-soft">{p.body}</p>
            </article>
          ))}
        </div>

        {/* Closing pull-line on dark band */}
        <div className="rounded-card section-ink p-10 md:p-12 flex flex-col md:flex-row items-start gap-6">
          <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-brand-gold text-brand-cream font-bold text-[22px]">
            &#10003;
          </div>
          <div className="flex-1">
            <h3 className="text-h3-card text-brand-cream mb-3">
              The same three faces, every phase.
            </h3>
            <p className="text-body-base text-brand-cream/85 mb-5 max-w-2xl">
              No production crew handed your job by a sales rep. No design-only studio handing
              your plan to an outside contractor. You meet your designer, your lead carpenter, and
              your project manager on day one &mdash; and they&rsquo;re still standing in your
              kitchen at the reveal.
            </p>
            <a
              href="#contact"
              className="btn-text text-brand-gold-soft"
            >
              Begin the Conversation &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
