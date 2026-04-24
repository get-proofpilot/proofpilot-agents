type OperatorProofItem = {
  title: string;
  body: string;
};

type OperatorMetric = {
  value: string;
  label: string;
};

export function OperatorLongformHero(props: {
  kicker: string;
  title: string;
  body: string;
  metrics: OperatorMetric[];
}) {
  return (
    <section className="operator-shell" style={{ padding: "6rem 0 4rem" }}>
      <div className="operator-frame">
        <div className="operator-kicker">{props.kicker}</div>
        <h1 className="operator-heading" style={{ marginTop: "1rem" }}>{props.title}</h1>
        <p style={{ maxWidth: "42rem", marginTop: "1rem", fontSize: "1.05rem", lineHeight: 1.7 }}>{props.body}</p>
        <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginTop: "1.3rem" }}>
          <a className="operator-action operator-action--primary" href="#quote">Get the quote</a>
          <a className="operator-action operator-action--secondary" href="#services">See services</a>
        </div>
        <div className="operator-proof-band" style={{ marginTop: "2rem" }}>
          {props.metrics.map((metric) => (
            <article className="operator-card" key={metric.label}>
              <strong style={{ display: "block", fontSize: "2rem", color: "var(--operator-signal)" }}>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OperatorServiceStack(props: { title: string; lead: string; items: OperatorProofItem[] }) {
  return (
    <section id="services" className="operator-shell" style={{ padding: "3rem 0" }}>
      <div className="operator-frame">
        <div className="operator-kicker">Service stack</div>
        <h2 className="operator-heading" style={{ fontSize: "3.4rem", marginTop: "1rem" }}>{props.title}</h2>
        <p style={{ maxWidth: "44rem", marginTop: "0.9rem", lineHeight: 1.7 }}>{props.lead}</p>
        <div className="operator-grid" style={{ marginTop: "1.8rem" }}>
          {props.items.map((item) => (
            <article className="operator-card" key={item.title}>
              <h3 style={{ margin: 0 }}>{item.title}</h3>
              <p style={{ marginTop: "0.75rem", lineHeight: 1.65 }}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OperatorProofRail(props: { title: string; items: OperatorProofItem[] }) {
  return (
    <section className="operator-shell" style={{ padding: "3rem 0" }}>
      <div className="operator-frame operator-card" style={{ background: "var(--operator-panel)" }}>
        <div className="operator-kicker">Why people say yes</div>
        <h2 style={{ margin: "1rem 0 0", fontSize: "2.9rem", lineHeight: 0.98 }}>{props.title}</h2>
        <div className="operator-grid" style={{ marginTop: "1.5rem" }}>
          {props.items.map((item) => (
            <article className="operator-card" key={item.title}>
              <h3 style={{ margin: 0 }}>{item.title}</h3>
              <p style={{ marginTop: "0.7rem", lineHeight: 1.65 }}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
