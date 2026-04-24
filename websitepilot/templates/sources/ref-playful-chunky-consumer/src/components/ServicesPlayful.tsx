const SERVICES = [
  {
    title: "Custom Made Lights",
    body: "A design consultation tailored to your home. Every strand is cut to fit your property precisely.",
    cta: "Get a Free Consultation",
  },
  {
    title: "Perfect Installation",
    body: "A pro crew, safety-first procedures, custom-cut strands — no messy wires, ever.",
    cta: "Get a Free Consultation",
  },
  {
    title: "Free Maintenance",
    body: "If a light ever goes out, we come fix it in 48 hours or less — on our dime.",
    cta: "Get a Free Consultation",
  },
  {
    title: "Free Removal + Storage",
    body: "We take them down, store them safely, and bring them back sparkling next year.",
    cta: "Get a Free Consultation",
  },
];

export default function ServicesPlayful() {
  return (
    <section id="services" className="section-sky">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28 text-center">
        <div className="kicker text-brand-primary">What&rsquo;s Included</div>
        <h2 className="display-h1 text-white mt-3 mx-auto max-w-3xl">
          {/* {{SERVICES-H2}} */}
          Our Service Is All Inclusive
        </h2>
        <p className="display-eyebrow mt-4 text-brand-onDarkMuted">And covers everything that you need.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 text-left">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-card bg-brand-dark border-2 border-white/10 p-7 hover:border-brand-primary/50 transition-colors"
            >
              <h3 className="card-title text-white">{s.title}</h3>
              <p className="mt-4 text-brand-onDarkMuted text-[15px] leading-relaxed">
                {s.body}
              </p>
              <a href="#quote" className="btn-primary mt-6 w-full">{s.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
