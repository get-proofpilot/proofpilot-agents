type EditorialProject = {
  title: string;
  market: string;
  summary: string;
};

type EditorialStat = {
  value: string;
  label: string;
};

export function PremiumEditorialHero(props: {
  kicker: string;
  headline: string;
  body: string;
  stats: EditorialStat[];
}) {
  return (
    <section className="editorial-shell" style={{ padding: "6.5rem 0 4rem" }}>
      <div className="editorial-frame editorial-two-up">
        <div style={{ display: "grid", alignContent: "end", gap: "1rem" }}>
          <div className="editorial-kicker">{props.kicker}</div>
          <h1 className="editorial-display">{props.headline}</h1>
          <p style={{ maxWidth: "38rem", lineHeight: 1.75 }}>{props.body}</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a className="editorial-link" href="#projects">View signature work</a>
            <a className="editorial-link" href="#contact">Schedule discovery</a>
          </div>
        </div>
        <div className="editorial-pane editorial-pane--image" />
      </div>
      <div className="editorial-frame" style={{ marginTop: "2rem" }}>
        <div className="editorial-stat-row">
          {props.stats.map((stat) => (
            <article className="editorial-stat" key={stat.label}>
              <strong style={{ display: "block", fontSize: "2rem" }}>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PremiumProjectGrid(props: { title: string; lead: string; projects: EditorialProject[] }) {
  return (
    <section id="projects" className="editorial-shell" style={{ padding: "4rem 0" }}>
      <div className="editorial-frame">
        <div className="editorial-kicker">Selected work</div>
        <h2 style={{ margin: "0.8rem 0 0", fontSize: "3.5rem", lineHeight: 0.95, maxWidth: "11ch" }}>
          {props.title}
        </h2>
        <p style={{ maxWidth: "40rem", marginTop: "1rem", lineHeight: 1.7 }}>{props.lead}</p>
        <div className="editorial-project-grid" style={{ marginTop: "2rem" }}>
          {props.projects.map((project) => (
            <article className="editorial-pane" key={project.title}>
              <div className="editorial-pane editorial-pane--image" style={{ minHeight: "15rem" }} />
              <div style={{ marginTop: "1rem" }} className="editorial-kicker">{project.market}</div>
              <h3 style={{ marginTop: "0.5rem" }}>{project.title}</h3>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.65 }}>{project.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PremiumJourney(props: { title: string; steps: { name: string; detail: string }[] }) {
  return (
    <section className="editorial-shell" style={{ padding: "4rem 0 6rem" }}>
      <div className="editorial-frame editorial-two-up">
        <div>
          <div className="editorial-kicker">Client journey</div>
          <h2 style={{ margin: "0.9rem 0 0", fontSize: "3.1rem", lineHeight: 0.98, maxWidth: "12ch" }}>
            {props.title}
          </h2>
        </div>
        <div style={{ display: "grid", gap: "1rem" }}>
          {props.steps.map((step, index) => (
            <article className="editorial-pane" key={step.name}>
              <div className="editorial-kicker">{String(index + 1).padStart(2, "0")}</div>
              <h3 style={{ marginTop: "0.5rem" }}>{step.name}</h3>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.65 }}>{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
