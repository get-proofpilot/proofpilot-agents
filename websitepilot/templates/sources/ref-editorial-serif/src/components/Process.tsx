/**
 * Process — "A Refined 5-Step Journey" — dark ink band with large italic ordinals.
 *
 * Kingswood treats the process as a vertical editorial list — each step is
 * numbered with a big italic serif numeral in accent green, paired with a
 * serif title and 2-sentence body. NO icons. NO card treatment. Just rhythm.
 *
 * Two commissioned architectural photos flank steps 01 and 02 (desktop only).
 */
const STEPS = [
  {
    n: "01",
    title: "Private Consultation",
    body:
      "We begin with an in-depth conversation to understand your goals, lifestyle, and property. Every great outdoor remodel starts with listening.",
  },
  {
    n: "02",
    title: "Composed Proposal",
    body:
      "You bring the vision — we carry it forward with creative direction, functional clarity, and architectural-forward landscape design proposals.",
  },
  {
    n: "03",
    title: "Design & Proposal Presentation",
    body:
      "A detailed proposal with layouts, material suggestions, and a transparent investment outline — delivered in person.",
  },
  {
    n: "04",
    title: "Build Planning & Scheduling",
    body:
      "Upon approval we secure the construction timeline — permitting, material logistics, and crew coordination handled by our project team.",
  },
  {
    n: "05",
    title: "Execution & Unveiling",
    body:
      "Our craftspeople execute the vision with accuracy and care. The result exceeds the rendering.",
  },
];

export default function Process() {
  return (
    <section className="section section-ink">
      <div className="container-wide">
        <div className="max-w-[720px] mx-auto text-center mb-16">
          <div className="font-display italic text-brand-accent text-sm tracking-[0.2em] uppercase mb-3">
            {"{{PROCESS_EYEBROW — How We Work}}"}
          </div>
          <h2 className="font-display text-brand-cream text-[34px] md:text-[44px] leading-[1.1] mb-5">
            {"{{PROCESS_HEADING — A Refined 5-Step Journey to Outdoor Excellence}}"}
          </h2>
          <p className="text-brand-cream/70 text-[17px] leading-[1.6]">
            {
              "{{PROCESS_SUBCOPY — Every outdoor space we build is converted into a stylish extension of the home — created with vision, expertise, and intent.}}"
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Left — flanking commissioned photos */}
          <div className="hidden lg:flex flex-col gap-5">
            <div
              className="aspect-[4/5] bg-brand-cream/10"
              style={{
                backgroundImage:
                  "linear-gradient(160deg, rgba(66,172,84,0.35), rgba(14,13,10,0.6))",
              }}
              aria-label="{{PROCESS_PHOTO_1}}"
            />
            <div
              className="aspect-[4/3] bg-brand-cream/10 -mt-4 ml-16"
              style={{
                backgroundImage:
                  "linear-gradient(220deg, rgba(246,240,226,0.25), rgba(14,13,10,0.7))",
              }}
              aria-label="{{PROCESS_PHOTO_2}}"
            />
          </div>

          {/* Right — step list */}
          <ol className="flex flex-col">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-[80px_1fr] gap-6 py-7 border-b border-brand-cream/15 last:border-b-0"
              >
                <div className="editorial-numeral text-[52px] leading-none pt-1">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-display text-brand-cream text-[24px] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-brand-cream/75 text-[15px] leading-[1.65]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
