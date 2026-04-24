/**
 * ServiceArea — archetype-mascot.
 *
 * Dark purple section, large H3 (37px 900 UPPER white), a long copy paragraph,
 * then a grid of city pills (rounded-btn, purple-on-white or outline), CTA.
 */
const cities = [
  "{{City 1}}", "{{City 2}}", "{{City 3}}", "{{City 4}}",
  "{{City 5}}", "{{City 6}}", "{{City 7}}", "{{City 8}}",
  "And Surrounding Areas",
];

export default function ServiceArea() {
  return (
    <section id="area" className="section-dark py-24 lg:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="display-h2 text-brand-onDark">
            {"{{LEGENDARY SERVICE THROUGHOUT THE {{METRO}} AREA}}"}
          </h2>
          <p className="mt-6 text-base lg:text-lg text-brand-onDarkMuted leading-relaxed">
            {"{{3–4 sentence description of the coverage footprint, what's unique about serving this metro, and why a brand rooted here matters.}}"}
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {cities.map((c, i) => (
            <li key={i}>
              <a
                href="#"
                className="inline-block px-5 py-3 rounded-btn bg-white text-brand-dark font-bold uppercase text-sm hover:bg-brand-primary hover:text-brand-primaryInk transition"
              >
                {c}
              </a>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary btn-xl">
            {"{{PRIMARY CTA}}"}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
