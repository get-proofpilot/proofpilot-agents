/**
 * PlumberSymptomChecklist — "Common Signs You Need a Plumber" symptom list.
 *
 * Source: https://smithservicesaz.com (Smith Plumbing, Mesa AZ)
 * Signature move: a soft-funnel section where instead of pushing services,
 * the brand lists 6-9 SYMPTOMS the homeowner can self-diagnose ("persistent
 * low water pressure," "ongoing slow drains," "rotten-egg smell"). Each
 * symptom is a checklist row with a 1-2 sentence explanation. Reads as
 * helpful triage rather than a sell — captures top-of-funnel "is this a
 * problem?" traffic that hasn't decided to call yet.
 *
 * WHEN TO USE:
 *  - Plumbing / HVAC / pest / electrical brands targeting top-of-funnel
 *    "should I call?" intent
 *  - Heritage / contractor-heritage presets where the tone is "experienced
 *    pro guides homeowner"
 *  - SEO-content-heavy sites where this section can serve as a landing
 *    answer for symptom queries
 *
 * WHEN NOT TO USE:
 *  - Single-service repair brands where the visitor already knows what's
 *    wrong (water heater, garage door spring, etc)
 *  - Premium / design-build brands — symptom-talk reads transactional
 *  - Pages where the immediate goal is booking, not education
 */
type Symptom = {
  title: string;     // e.g. "Persistent Low Water Pressure"
  body: string;      // 1-2 sentence explanation of what causes it
  icon?: string;
};

type Props = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  symptoms?: Symptom[];
  ctaLabel?: string;
  ctaHref?: string;
  brand?: { ink?: string; primary?: string; surface?: string; check?: string };
};

export default function PlumberSymptomChecklist({
  eyebrow = "Common Signs",
  headline = "When to Call a Professional Plumber",
  intro = "When you start to notice changes in your plumbing system, it usually means a leak or clog. Don't try to fix it on your own — that often leads to more damage and costlier repairs. If we can't fix it, you don't pay.",
  symptoms = [
    { title: "Persistent Low Water Pressure", body: "Could mean a hidden clog, a leak in a wall, or a failing pressure regulator. Doesn't fix itself.", icon: "💧" },
    { title: "Slow or Backed-Up Drains", body: "Recurring slow drains usually mean a buildup deep in the line, not the trap.", icon: "🚿" },
    { title: "Rotten-Egg Smell at the Tap", body: "Bacteria in the water heater anode or sewer-gas leak. Both need a pro, fast.", icon: "🟠" },
    { title: "Discolored or Rust-Tinted Water", body: "Aging galvanized lines or sediment in your water heater — both are fixable.", icon: "🟤" },
    { title: "Spike in the Water Bill", body: "Even small running leaks add 20-30% to a bill. Worth a 15-minute leak check.", icon: "📈" },
    { title: "Toilet That Runs Constantly", body: "A flapper or fill-valve issue. Common, cheap fix — but wastes a gallon a minute.", icon: "🚽" },
    { title: "Knocking or Banging Pipes", body: "Water hammer from worn arrestors or loose lines. Will eventually crack a joint.", icon: "🔨" },
    { title: "Visible Leaks Under Sinks", body: "Standing water under a sink is never normal. Look for green corrosion on copper.", icon: "🛠️" },
    { title: "Cracked or Sweating Toilet Tank", body: "Cracks leak slowly, sweating = condensation that rots the floor over time.", icon: "🪨" },
  ],
  ctaLabel = "Schedule a Diagnostic Visit",
  ctaHref = "/book",
  brand = { ink: "#0A2540", primary: "#0A4DA8", surface: "#F4F7FB", check: "#15803D" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#0A4DA8";
  const surface = brand.surface ?? "#F4F7FB";
  const check = brand.check ?? "#15803D";

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mb-10 md:mb-14">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {headline}
          </h2>
          <p className="text-lg opacity-85">{intro}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 list-none p-0">
          {symptoms.map((s) => (
            <li
              key={s.title}
              className="flex gap-4 p-5 md:p-6 rounded-[8px]"
              style={{ background: "#FFFFFF", boxShadow: "0 6px 24px rgba(10,37,64,0.05)" }}
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full text-[16px] shrink-0"
                style={{ background: `${check}15`, color: check }}
                aria-hidden
              >
                ✓
              </span>
              <div>
                <p className="text-[15px] font-bold leading-tight mb-1.5">
                  {s.icon && <span className="mr-2" aria-hidden>{s.icon}</span>}
                  {s.title}
                </p>
                <p className="text-[14px] opacity-80 leading-snug">{s.body}</p>
              </div>
            </li>
          ))}
        </ul>

        {ctaLabel && (
          <div className="mt-12 text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-4 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
              style={{ background: primary, color: "#FFFFFF" }}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
