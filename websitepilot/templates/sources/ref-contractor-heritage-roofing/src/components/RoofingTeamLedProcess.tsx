/**
 * RoofingTeamLedProcess — numbered process steps, each fronted by a real team
 * member with headshot + first-person quote.
 *
 * Source: https://northfaceconstruction.com (Northface Construction, MN)
 * Signature move: each step in the process block names the ACTUAL person who
 * owns it — Gabby does customer service, Andrew handles inspections, Bryan
 * is project-supervisor — and pulls a short first-person quote from them
 * ("I love educating you on what's going on with your home"). The headshots
 * run across the section in a row. The effect: the buyer meets the company
 * BEFORE they book. Dramatically increases brand trust for local-service.
 *
 * WHEN TO USE:
 *  - Local-service brands with a small-to-mid team (4-8 roles)
 *  - Categories where trust gap is high (roofing, siding, remodeling,
 *    plumbing, HVAC major installs)
 *  - Brands willing to invest in clean, consistent team headshots
 *
 * WHEN NOT TO USE:
 *  - Remote / dispatcher-centric teams with revolving subcontractors
 *  - Brands with zero team photography or low-quality headshots
 *  - B2B / enterprise verticals
 */
type ProcessPerson = {
  n: string;
  role: string;           // "Chat With the Office"
  phase: string;          // "Fill Out a Form or Give Us a Call"
  bullets: string[];
  headshot?: string;      // image url
  quote?: string;         // "I love chatting with homeowners..."
  personName?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  steps?: ProcessPerson[];
  brand?: { ink?: string; accent?: string; surface?: string; card?: string };
};

export default function RoofingTeamLedProcess({
  eyebrow = "Meet Your Team",
  heading = "Every step of the project has a name and a face.",
  subhead = "From your first phone call to your final walkthrough — you'll know exactly who is taking care of you.",
  steps = [
    {
      n: "1",
      role: "Chat With the Office",
      phase: "Fill Out a Form or Give Us a Call",
      bullets: ["Quick response time", "Easy appointment scheduling", "Sales rep assigned"],
      headshot: "/team/gabby.jpg",
      personName: "Gabby",
      quote: "I love chatting with homeowners and getting an inspection scheduled as soon as possible so they feel valued and heard.",
    },
    {
      n: "2",
      role: "Your Sales Rep Guides You",
      phase: "Our First Meeting & Inspection",
      bullets: ["Reliable communication", "19-point inspection process", "Follow-up & check-in"],
      headshot: "/team/andrew.jpg",
      personName: "Andrew",
      quote: "I love educating you on what's going on with your home — with quality documentation, photos, and low-pressure advice.",
    },
    {
      n: "3",
      role: "You'll Have a Dedicated PM",
      phase: "What to Expect the Day of Your Project",
      bullets: ["Polite, well-trained crews", "Regular progress updates", "Daily clean-up"],
      headshot: "/team/bryan.jpg",
      personName: "Bryan",
      quote: "It's important to me our crews respect your property, show up on time, and communicate on every change.",
    },
    {
      n: "4",
      role: "Wrap-Up With Customer Service",
      phase: "Quality Assurance + Invoicing",
      bullets: ["Final walkthrough", "Drone photos delivered", "Warranty registered"],
      headshot: "/team/dan.jpg",
      personName: "Dan",
      quote: "I don't consider a job complete until the customer is thrilled. That's the bar.",
    },
  ],
  brand = { ink: "#14233B", accent: "#D4A341", surface: "#F7F5EE", card: "#FFFFFF" },
}: Props) {
  const ink = brand.ink ?? "#14233B";
  const accent = brand.accent ?? "#D4A341";
  const surface = brand.surface ?? "#F7F5EE";
  const card = brand.card ?? "#FFFFFF";

  return (
    <section className="py-20 md:py-28" style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(30px, 4.5vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.018em" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg opacity-80">{subhead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-[6px] overflow-hidden border flex flex-col"
              style={{ background: card, borderColor: "rgba(0,0,0,0.06)" }}
            >
              <div
                className="relative aspect-[4/3] bg-gray-200"
                style={{ backgroundImage: s.headshot ? `url(${s.headshot})` : undefined, backgroundSize: "cover", backgroundPosition: "center top" }}
              >
                <div
                  className="absolute top-3 left-3 flex items-center justify-center w-10 h-10 rounded-full font-bold text-[15px]"
                  style={{ background: accent, color: ink }}
                >
                  {s.n}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[12px] tracking-[0.14em] uppercase font-semibold opacity-70 mb-1">
                  {s.role}
                </p>
                <h3 className="text-[18px] font-bold mb-3">{s.phase}</h3>
                <ul className="space-y-1.5 text-[14px] opacity-85 mb-4">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span style={{ color: accent }} aria-hidden>
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                {s.quote && (
                  <blockquote
                    className="mt-auto pt-4 border-t text-[13px] italic opacity-80 leading-snug"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    "{s.quote}"
                    {s.personName && (
                      <span className="not-italic block mt-2 text-[11px] tracking-[0.14em] uppercase opacity-70">
                        — {s.personName}
                      </span>
                    )}
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
