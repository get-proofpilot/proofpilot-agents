const services = [
  "Landscape design",
  "Outdoor kitchens",
  "Pool and patio coordination",
  "Hardscape installation",
  "Lighting and planting",
  "Project management",
];

export default function Services() {
  return (
    <section id="services" className="section-shell section-shell--split">
      <div>
        <p className="kicker">Scope clarity</p>
        <h2>Show a premium buyer exactly what you can own.</h2>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <article key={service}>
            <span aria-hidden="true" />
            <h3>{service}</h3>
            <p>
              A concise, confidence-building description belongs here. Keep each item parallel so
              the grid feels curated instead of padded.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
