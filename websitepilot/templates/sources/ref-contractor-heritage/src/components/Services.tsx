/**
 * Services — "Our Most Popular Services" H2 + 3 card grid.
 * Each card: image top, H3 uppercase, 2-line body, red pill-link.
 */
const SERVICES = [
  {
    title: "Water Heater Repair",
    body: "Expert water heater repair and service ensures hot water restoration fast.",
    img: "/images/placeholder-service-1.jpg",
  },
  {
    title: "Toilet Repair & Installation",
    body: "Professional toilet repair, installation and replacement for reliable bathroom plumbing.",
    img: "/images/placeholder-service-2.jpg",
  },
  {
    title: "Main Water Line Repair",
    body: "Fast main water line repair protects your home from serious damage and flooding.",
    img: "/images/placeholder-service-3.jpg",
  },
];

export default function Services() {
  return (
    <section className="section">
      <div className="container-1200">
        <h2 className="text-h2-desktop uppercase text-center mb-10">
          {"{{SERVICES_HEADING — Our Most Popular Services}}"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article key={s.title} className="rounded-card overflow-hidden bg-brand-white shadow-card-soft">
              <div className="aspect-[4/3] bg-brand-gray-soft flex items-center justify-center text-brand-gray-text text-sm">
                {"{{SERVICE IMAGE}}"}
              </div>
              <div className="p-6">
                <h3 className="text-h3-card uppercase mb-2 text-brand-ink">{s.title}</h3>
                <p className="text-body-base text-brand-ink/80 mb-4">{s.body}</p>
                <a href="#" className="btn btn-primary">
                  {s.title}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
