const steps = [
  {
    number: "01",
    title: "Site walk",
    body: "Capture constraints, sun, drainage, views, and the way the family wants to live outside.",
  },
  {
    number: "02",
    title: "Design direction",
    body: "Translate the vision into materials, zones, planting logic, and a phased investment plan.",
  },
  {
    number: "03",
    title: "Build rhythm",
    body: "Move from scope to production with one accountable lead and clear progress checkpoints.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-shell section-shell--dark">
      <div className="section-intro">
        <p className="kicker">Process</p>
        <h2>A calm path from first walk to finished outdoor room.</h2>
      </div>
      <div className="process-grid">
        {steps.map((step) => (
          <article key={step.number}>
            <strong>{step.number}</strong>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
