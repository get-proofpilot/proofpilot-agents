/**
 * Team Craftsmanship — three owner/lead portraits on cream-warm, each with
 * italic-accent role label + short bio. Mirrors Cinco's team row (Carlos /
 * Luis / Izzy) but with the premium-design-build editorial treatment:
 * grayscale portraits, italic role, no icons.
 */
type Member = { name: string; role: string; bio: string };

const team: Member[] = [
  {
    name: "{{OWNER_NAME}}",
    role: "Principal &amp; Design Director",
    bio: "Trained in landscape architecture at {{SCHOOL}}. Leads every commission from first site walk through final walkthrough.",
  },
  {
    name: "{{PARTNER_NAME}}",
    role: "Build Director",
    bio: "Twenty years on the tools before the drafting board. Runs crew scheduling and site QA.",
  },
  {
    name: "{{SENIOR_DESIGNER}}",
    role: "Senior Designer",
    bio: "Draws every site plan, construction document, and planting palette in-house.",
  },
];

export default function TeamCraftsmanship() {
  return (
    <section className="section section-warm">
      <div className="container-wide">
        <div className="max-w-2xl mb-14">
          <p className="text-h4-label text-brand-gold mb-4">The Studio</p>
          <h2 className="text-h2-mobile md:text-h2-display text-brand-ink">
            A small bench of <span className="italic-accent">master craftspeople</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((m) => (
            <article key={m.name}>
              <div className="aspect-[3/4] rounded-card overflow-hidden mb-6 placeholder-twilight shadow-card-lift" />
              <p className="italic-accent text-[14px] text-brand-gold mb-2 tracking-wide"
                 dangerouslySetInnerHTML={{ __html: m.role }}
              />
              <h3 className="text-h3-card text-brand-ink mb-3">{m.name}</h3>
              <p className="text-body-base text-brand-ink-soft">{m.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
