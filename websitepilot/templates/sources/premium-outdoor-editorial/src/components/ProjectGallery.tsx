const projects = [
  {
    title: "Poolside Living Terrace",
    market: "Estate renovation",
    summary: "Large-format stone, fire feature, covered dining, and soft night lighting.",
  },
  {
    title: "Desert Courtyard Reset",
    market: "Design refresh",
    summary: "Native planting, sculptural walls, steel edging, and a lower-water palette.",
  },
  {
    title: "Outdoor Kitchen Spine",
    market: "Family entertaining",
    summary: "Built-in cooking, storage, shade, and circulation designed around weekend use.",
  },
];

export default function ProjectGallery() {
  return (
    <section id="work" className="section-shell section-shell--light">
      <div className="section-intro">
        <p className="kicker">Selected work</p>
        <h2>Let the project proof carry the first impression.</h2>
        <p>
          This scaffold expects real client photography. Replace each media pane with authentic
          projects, then keep the copy quiet enough for the work to lead.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className={`project-card__image project-card__image--${index + 1}`} />
            <div>
              <span>{project.market}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
