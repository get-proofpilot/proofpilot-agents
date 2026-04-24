/**
 * ProcessPremium — 5-step commission process rendered on an ink section with
 * italic-serif stage numerals. Mirrors Cinco's 5-stage rhythm translated to
 * the editorial preset treatment.
 */
export type ProcessStep = { n: string; title: string; body: string };

type Props = {
  eyebrow?: string;
  heading?: string;
  italicHeadingAccent?: string;
  steps?: ProcessStep[];
  brand?: { goldSoftHex?: string; inkHex?: string; creamHex?: string };
};

const defaultSteps: ProcessStep[] = [
  { n: "01", title: "Discovery", body: "A private studio visit or site walk. We map goals, constraints, and budget before anything is drawn." },
  { n: "02", title: "Concept &amp; Design", body: "Hand sketches become 3D renders and construction drawings. One revision round is included." },
  { n: "03", title: "Proposal &amp; Scheduling", body: "Line-item proposal, long-lead materials ordered, crew blocked on the calendar." },
  { n: "04", title: "Construction", body: "Our in-house crew executes. Daily photos, weekly walkthroughs, one point of contact." },
  { n: "05", title: "Final Walkthrough", body: "Punch list closed, warranty registered, plant care guide delivered." },
];

export default function ProcessPremium({
  eyebrow = "How We Work",
  heading = "Five stages,",
  italicHeadingAccent = "one studio.",
  steps = defaultSteps,
  brand = { goldSoftHex: "#D4B26B", inkHex: "#111", creamHex: "#F7F2E8" },
}: Props) {
  const gold = brand.goldSoftHex ?? "#D4B26B";
  const ink = brand.inkHex ?? "#111";
  const cream = brand.creamHex ?? "#F7F2E8";

  return (
    <section id="process" className="py-28" style={{ background: ink, color: cream }}>
      <div className="max-w-[1240px] mx-auto px-7">
        <div className="max-w-2xl mb-14">
          <p className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: gold }}>
            {eyebrow}
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, color: cream }}>
            {heading}{" "}
            <span className="italic-accent" style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: gold, fontWeight: 400 }}>
              {italicHeadingAccent}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {steps.map((s) => (
            <article key={s.n} className="lg:border-l lg:pl-5" style={{ borderColor: "rgba(247,242,232,0.15)" }}>
              <p
                className="italic-accent text-[56px] leading-none mb-5"
                style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: gold, fontWeight: 400 }}
              >
                {s.n}
              </p>
              <h3
                className="text-[22px] font-semibold mb-3"
                style={{ color: cream }}
                dangerouslySetInnerHTML={{ __html: s.title }}
              />
              <p
                className="text-[16px]"
                style={{ color: "rgba(247,242,232,0.7)", lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
