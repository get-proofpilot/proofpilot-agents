/**
 * Team Craftsmanship — kitchen/bath specialization. Three load-bearing
 * roles: principal designer, lead carpenter, project manager — the same
 * three people who run every commission from first meeting to final reveal.
 *
 * Real faces, italic-accent role label, years-of-experience callout in the
 * bio so the team page does the work of a "why us" block without naming it.
 */
type Member = { name: string; role: string; bio: string; years: string };

const team: Member[] = [
  {
    name: "{{OWNER_NAME}}",
    role: "Principal &amp; Lead Designer",
    years: "20 years",
    bio: "Trained in kitchen &amp; bath design at {{SCHOOL}}. Draws every plan in-house and walks every site personally.",
  },
  {
    name: "{{LEAD_CARPENTER_NAME}}",
    role: "Lead Carpenter &amp; Build Director",
    years: "25 years",
    bio: "Twenty-five years on the tools &mdash; framing, finish, and cabinet install. Runs the shop and leads every job site.",
  },
  {
    name: "{{PM_NAME}}",
    role: "Project Manager",
    years: "12 years",
    bio: "Owns selections, scheduling, and the homeowner relationship. The single point of contact from contract to final walkthrough.",
  },
];

export default function TeamCraftsmanship() {
  return (
    <section className="section section-warm">
      <div className="container-wide">
        <div className="max-w-2xl mb-14">
          <p className="text-h4-label text-brand-gold mb-4">The Studio</p>
          <h2 className="text-h2-mobile md:text-h2-display text-brand-ink">
            Three people, <span className="italic-accent">on every project</span>, start to finish.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((m) => (
            <article key={m.name}>
              <div className="aspect-[3/4] rounded-card overflow-hidden mb-6 placeholder-twilight shadow-card-lift" />
              <p
                className="italic-accent text-[14px] text-brand-gold mb-2 tracking-wide"
                dangerouslySetInnerHTML={{ __html: m.role }}
              />
              <h3 className="text-h3-card text-brand-ink mb-3">{m.name}</h3>
              <p className="text-[12px] uppercase tracking-[0.2em] text-brand-ink-muted mb-3">
                {m.years} in kitchen &amp; bath
              </p>
              <p
                className="text-body-base text-brand-ink-soft"
                dangerouslySetInnerHTML={{ __html: m.bio }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
