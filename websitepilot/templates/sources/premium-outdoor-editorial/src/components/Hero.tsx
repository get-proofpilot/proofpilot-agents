const stats = [
  { value: "42", label: "Outdoor rooms completed" },
  { value: "3", label: "Design phases before build" },
  { value: "1", label: "Dedicated project lead" },
];

export default function Hero() {
  return (
    <section id="top" className="hero section-shell">
      <div className="hero__copy">
        <p className="kicker">High-touch outdoor environments</p>
        <h1>Outdoor living with the calm of a finished estate.</h1>
        <p className="hero__lead">
          A premium scaffold for landscape, hardscape, pool, and outdoor living brands that need
          project gravity, editorial spacing, and a confident consultation path.
        </p>
        <div className="hero__actions">
          <a className="button button--dark" href="#work">
            View Signature Work
          </a>
          <a className="button button--light" href="#consult">
            Book Design Walkthrough
          </a>
        </div>
      </div>
      <div className="hero__media" aria-label="Editorial outdoor living image placeholder">
        <div className="media-card media-card--large">
          <span>Project visual anchor</span>
        </div>
        <div className="stat-strip" aria-label="Project qualifications">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
