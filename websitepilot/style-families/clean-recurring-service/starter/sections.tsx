type RecurringBadge = {
  title: string;
  note: string;
};

type RecurringService = {
  name: string;
  body: string;
  includes: string[];
};

export function RecurringServiceHero(props: {
  kicker: string;
  title: string;
  body: string;
  badges: RecurringBadge[];
}) {
  return (
    <section className="recurring-shell" style={{ padding: "5.5rem 0 3rem" }}>
      <div className="recurring-frame recurring-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr", alignItems: "center" }}>
        <div>
          <div className="recurring-chip">{props.kicker}</div>
          <h1 style={{ margin: "1rem 0 0", fontSize: "4rem", lineHeight: 0.95, maxWidth: "11ch" }}>
            {props.title}
          </h1>
          <p style={{ maxWidth: "38rem", marginTop: "1rem", lineHeight: 1.7 }}>{props.body}</p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "1.3rem" }}>
            <a className="recurring-cta recurring-cta--primary" href="#quote">Get free quote</a>
            <a className="recurring-cta recurring-cta--secondary" href="#services">View plans</a>
          </div>
        </div>
        <div className="recurring-media" />
      </div>
      <div className="recurring-frame recurring-badges" style={{ marginTop: "2rem" }}>
        {props.badges.map((badge) => (
          <article className="recurring-card" key={badge.title}>
            <strong>{badge.title}</strong>
            <p style={{ marginTop: "0.55rem", lineHeight: 1.65 }}>{badge.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RecurringPlans(props: { title: string; services: RecurringService[] }) {
  return (
    <section id="services" className="recurring-shell" style={{ padding: "3rem 0" }}>
      <div className="recurring-frame">
        <div className="recurring-chip">What's included</div>
        <h2 style={{ margin: "1rem 0 0", fontSize: "3rem", lineHeight: 0.98, maxWidth: "11ch" }}>
          {props.title}
        </h2>
        <div className="recurring-grid" style={{ marginTop: "1.8rem" }}>
          {props.services.map((service) => (
            <article className="recurring-card" key={service.name}>
              <h3 style={{ margin: 0 }}>{service.name}</h3>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.65 }}>{service.body}</p>
              <ul style={{ marginTop: "0.9rem", paddingLeft: "1.1rem" }}>
                {service.includes.map((item) => (
                  <li key={item} style={{ marginTop: "0.35rem" }}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecurringClose(props: { title: string; body: string }) {
  return (
    <section id="quote" className="recurring-shell" style={{ padding: "3rem 0 5rem" }}>
      <div className="recurring-frame recurring-card" style={{ background: "var(--recurring-panel)" }}>
        <div className="recurring-chip">Request a quote</div>
        <h2 style={{ margin: "1rem 0 0", fontSize: "2.8rem", lineHeight: 0.98, maxWidth: "11ch" }}>
          {props.title}
        </h2>
        <p style={{ marginTop: "1rem", maxWidth: "42rem", lineHeight: 1.7 }}>{props.body}</p>
      </div>
    </section>
  );
}
