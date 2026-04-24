const STEPS = [
  {
    n: "One",
    title: "Get a Free Design & Quote",
    body: "Tell us what you&rsquo;d like — we&rsquo;ll create a theme that fits your style and deliver a personalized quote fast.",
  },
  {
    n: "Two",
    title: "Schedule Your Installation",
    body: "We offer flexible scheduling and arrive on time, ready to bring holiday joy to your home.",
  },
  {
    n: "Three",
    title: "Enjoy a Brighter Holiday",
    body: "Sit back and relax. Our crew handles everything — all you do is look forward to a brighter season.",
  },
];

export default function ProcessCards() {
  return (
    <section className="section-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28 text-center">
        <div className="kicker text-brand-accent">Three Easy Steps</div>
        <h2 className="display-h1 text-brand-dark mt-3 max-w-3xl mx-auto">
          {/* {{PROCESS-H2}} */}
          Get the Most Magical Holiday Lighting in Three Easy Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 text-left">
          {STEPS.map((s, i) => (
            <div key={s.n} className="rounded-card bg-brand-dark text-white p-8 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-3 -right-3 h-24 w-24 rounded-full bg-brand-primary/20 blur-md"
              />
              <div className="kicker text-brand-primary">Step {i + 1}</div>
              <div className="display-h2 text-white mt-2">{s.n}</div>
              <h3 className="card-title mt-3 text-white">{s.title}</h3>
              <p
                className="mt-3 text-brand-onDarkMuted text-[15px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.body }}
              />
            </div>
          ))}
        </div>

        <a href="#quote" className="btn-primary btn-xl mt-10">Get a Fast Quote</a>
      </div>
    </section>
  );
}
