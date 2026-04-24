const BENEFITS = [
  { title: "Timely & Convenient Removal", body: "All lighting packages include timely, convenient removal at a time that suits you — at no extra cost." },
  { title: "Free Year-Round Storage", body: "We store your custom lights safely until next season. We also test and repair before each re-install." },
  { title: "Warrantied Product & Service", body: "A full warranty on both the install and the product. Complete peace of mind, every season." },
  { title: "Free Design Consultation", body: "We&rsquo;ll craft the perfect display in a complimentary consultation that fits your taste and budget." },
  { title: "Custom Cut to Your Home", body: "Every display is cut to the exact measurements of your property. Seamless look, no excess wire." },
  { title: "48-Hour Maintenance", body: "If a light goes out, we&rsquo;re on-site within 48 hours to fix it, free of charge, guaranteed." },
];

export default function BenefitsGrid() {
  return (
    <section className="section-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="display-h1 text-brand-dark max-w-2xl">
            {/* {{BENEFITS-H2}} */}
            Benefits You Can Enjoy Working With Us
          </h2>
          <a href="#quote" className="btn-primary btn-xl">Get a Fast Quote</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={
                "rounded-card p-7 border-2 " +
                (i % 2 === 0
                  ? "bg-brand-dark text-white border-brand-dark"
                  : "bg-white text-brand-ink border-brand-dark/10 shadow-card")
              }
            >
              <div className={"kicker " + (i % 2 === 0 ? "text-brand-primary" : "text-brand-accent")}>
                0{i + 1}
              </div>
              <h3 className={"tile-title mt-3 " + (i % 2 === 0 ? "text-white" : "text-brand-dark")}>
                {b.title}
              </h3>
              <p
                className={
                  "mt-3 text-[15px] leading-relaxed " +
                  (i % 2 === 0 ? "text-brand-onDarkMuted" : "text-brand-inkMuted")
                }
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
