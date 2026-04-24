/**
 * ServiceAreaMap — "Areas We Serve" 4-col grid of city blocks, each with 5 SEO deep links.
 * This is Bears' core programmatic SEO surface — hundreds of landing pages funnel through here.
 */
const CITIES = [
  "Conroe",
  "Cypress",
  "Houston",
  "Jersey Village",
  "Magnolia",
  "Montgomery",
  "Oak Ridge North",
  "Pinehurst",
  "Porter",
  "Shenandoah",
  "Spring",
  "The Woodlands",
  "Tomball",
  "Willis",
  "Woodbranch",
];

const SERVICE_LINKS = [
  "Main Water Line Repair",
  "Plumber",
  "Sewer Line Repair",
  "Toilet Repair and Installation",
  "Water Heater Repair",
];

export default function ServiceAreaMap() {
  return (
    <section className="section bg-brand-gray-tint">
      <div className="container-1200">
        <h2 className="text-h2-desktop uppercase text-center mb-10">Areas We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CITIES.map((city) => (
            <div
              key={city}
              className="bg-brand-white rounded-btn border border-brand-gray-soft/60 p-4 border-l-4 border-l-brand-red"
            >
              <h3 className="font-display font-extrabold uppercase text-brand-ink text-base mb-2">
                {city}
              </h3>
              <ul className="space-y-1 text-sm">
                {SERVICE_LINKS.map((s) => (
                  <li key={s}>
                    <a
                      href={`#/${city.toLowerCase().replace(/\s+/g, "-")}-tx-${s
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-brand-ink/85 hover:text-brand-red transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a href="#" className="btn btn-primary">Directions</a>
          <a href="#quote" className="btn btn-dark">Get In Touch</a>
        </div>
      </div>
    </section>
  );
}
