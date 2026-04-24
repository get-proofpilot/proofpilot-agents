/**
 * TeamCraftsmanship — three owner/lead portraits on cream-warm. Italic role
 * label, bio prose. No icons, no badges.
 */
export type TeamMember = { name: string; role: string; bio: string; imageUrl?: string };

type Props = {
  eyebrow?: string;
  heading?: string;
  italicHeadingAccent?: string;
  members?: TeamMember[];
  brand?: { goldHex?: string };
};

const defaultMembers: TeamMember[] = [
  { name: "{{OWNER_NAME}}", role: "Principal &amp; Design Director", bio: "Trained in landscape architecture at {{SCHOOL}}. Leads every commission from first site walk through final walkthrough." },
  { name: "{{PARTNER_NAME}}", role: "Build Director", bio: "Twenty years on the tools before the drafting board. Runs crew scheduling and site QA." },
  { name: "{{SENIOR_DESIGNER}}", role: "Senior Designer", bio: "Draws every site plan, construction document, and planting palette in-house." },
];

export default function TeamCraftsmanship({
  eyebrow = "The Studio",
  heading = "A small bench of",
  italicHeadingAccent = "master craftspeople.",
  members = defaultMembers,
  brand = { goldHex: "#B08A3E" },
}: Props) {
  const gold = brand.goldHex ?? "#B08A3E";
  return (
    <section className="py-28 bg-[var(--brand-cream-warm,#EFE7D4)]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div className="max-w-2xl mb-14">
          <p className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: gold }}>
            {eyebrow}
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, color: "#111" }}>
            {heading}{" "}
            <span className="italic-accent" style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: gold, fontWeight: 400 }}>
              {italicHeadingAccent}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {members.map((m) => (
            <article key={m.name}>
              <div
                className={`aspect-[3/4] rounded-[6px] overflow-hidden mb-6 shadow-card-lift ${m.imageUrl ? "" : "placeholder-twilight"}`}
                style={m.imageUrl ? { backgroundImage: `url(${m.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              />
              <p
                className="italic-accent text-[14px] mb-2 tracking-wide"
                style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: gold, fontWeight: 400 }}
                dangerouslySetInnerHTML={{ __html: m.role }}
              />
              <h3 className="text-[22px] font-semibold mb-3" style={{ color: "#111" }}>
                {m.name}
              </h3>
              <p className="text-[16px]" style={{ color: "#2A2A28", lineHeight: 1.6 }}>
                {m.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
