type HeroicStat = {
  value: string;
  label: string;
  note?: string;
};

type HeroicService = {
  name: string;
  detail: string;
  tag?: string;
};

type HeroicStep = {
  number: string;
  title: string;
  body: string;
};

export function HeroicHero(props: {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  stats: HeroicStat[];
}) {
  return (
    <section className="heroic-shell heroic-angle">
      <div className="heroic-frame" style={{ padding: "7rem 0 8rem" }}>
        <div className="heroic-split-grid">
          <div>
            <div className="heroic-badge">{props.eyebrow}</div>
            <h1 className="heroic-headline" style={{ marginTop: "1.1rem" }}>
              {props.headline}
            </h1>
            <p style={{ maxWidth: "36rem", marginTop: "1.2rem", fontSize: "1.05rem", lineHeight: 1.65 }}>
              {props.body}
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <a className="heroic-button heroic-button--primary" href="#quote">{props.primaryCta}</a>
              <a className="heroic-button heroic-button--ghost" href="#services">{props.secondaryCta}</a>
            </div>
          </div>
          <div className="heroic-proof-grid">
            {props.stats.map((stat) => (
              <article className="heroic-card heroic-card--signal" key={stat.label}>
                <div className="heroic-number">{stat.value}</div>
                <strong style={{ display: "block", marginTop: "0.4rem" }}>{stat.label}</strong>
                {stat.note ? <p style={{ marginTop: "0.45rem", lineHeight: 1.55 }}>{stat.note}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroicServices(props: { title: string; lead: string; services: HeroicService[] }) {
  return (
    <section id="services" className="heroic-shell" style={{ padding: "5rem 0" }}>
      <div className="heroic-frame">
        <p className="heroic-badge">Signature services</p>
        <h2 className="heroic-headline" style={{ fontSize: "4rem", maxWidth: "12ch", marginTop: "1rem" }}>
          {props.title}
        </h2>
        <p style={{ maxWidth: "42rem", marginTop: "1rem", lineHeight: 1.7 }}>{props.lead}</p>
        <div className="heroic-service-grid" style={{ marginTop: "2rem" }}>
          {props.services.map((service) => (
            <article className="heroic-card" key={service.name}>
              {service.tag ? <div className="heroic-badge">{service.tag}</div> : null}
              <h3 style={{ marginTop: "1rem", textTransform: "uppercase" }}>{service.name}</h3>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.65 }}>{service.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeroicProcess(props: { title: string; steps: HeroicStep[] }) {
  return (
    <section className="heroic-shell heroic-angle" style={{ padding: "5rem 0" }}>
      <div className="heroic-frame">
        <p className="heroic-badge">How it works</p>
        <h2 className="heroic-headline" style={{ fontSize: "3.6rem", maxWidth: "11ch", marginTop: "1rem" }}>
          {props.title}
        </h2>
        <div className="heroic-process-grid" style={{ marginTop: "2rem" }}>
          {props.steps.map((step) => (
            <article className="heroic-card heroic-card--signal" key={step.number}>
              <div className="heroic-number">{step.number}</div>
              <h3 style={{ marginTop: "0.85rem", textTransform: "uppercase" }}>{step.title}</h3>
              <p style={{ marginTop: "0.65rem", lineHeight: 1.65 }}>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeroicCloseBand(props: { title: string; body: string; cta: string }) {
  return (
    <section id="quote" className="heroic-shell" style={{ padding: "4rem 0 6rem" }}>
      <div className="heroic-frame heroic-card heroic-card--signal" style={{ display: "grid", gap: "1rem" }}>
        <p className="heroic-badge">Close path</p>
        <h2 style={{ margin: 0, fontSize: "3.1rem", textTransform: "uppercase", lineHeight: 0.95 }}>
          {props.title}
        </h2>
        <p style={{ maxWidth: "44rem", lineHeight: 1.7 }}>{props.body}</p>
        <div>
          <a className="heroic-button heroic-button--primary" href="#contact">{props.cta}</a>
        </div>
      </div>
    </section>
  );
}
