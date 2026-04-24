import { ArrowUpRight } from "lucide-react";

/**
 * Services — archetype-mascot.
 *
 * Pattern:
 *   - Dark purple section with a GIANT uppercase H2 ("WE'RE GLAD YOU'RE HERE").
 *   - 4×2 grid of 8 service cards (or 3×3, client-dependent).
 *   - Each card = illustrated icon, H3 service-title (800, 24px), 3-line description, link.
 *   - Cards hover-lift slightly; arrow rotates.
 *
 * Swap targets: services array only.
 */
const services = [
  { title: "{{Service 1}}",  body: "{{Short benefit-led 2-line description of service 1.}}" },
  { title: "{{Service 2}}",  body: "{{Short benefit-led 2-line description of service 2.}}" },
  { title: "{{Service 3}}",  body: "{{Short benefit-led 2-line description of service 3.}}" },
  { title: "{{Service 4}}",  body: "{{Short benefit-led 2-line description of service 4.}}" },
  { title: "{{Service 5}}",  body: "{{Short benefit-led 2-line description of service 5.}}" },
  { title: "{{Service 6}}",  body: "{{Short benefit-led 2-line description of service 6.}}" },
  { title: "{{Service 7}}",  body: "{{Short benefit-led 2-line description of service 7.}}" },
  { title: "{{Service 8}}",  body: "{{Short benefit-led 2-line description of service 8.}}" },
];

export default function Services() {
  return (
    <section id="services" className="section-dark py-24 lg:py-32 relative overflow-hidden">
      {/* faint diagonal stripe motif background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 28px)",
        }}
      />
      <div className="container relative">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h2 className="display-hero text-brand-onDark">
            {"{{WE'RE GLAD YOU'RE HERE.}}"}
            <br />
            <span className="text-brand-primary">
              {"{{HOW CAN WE HELP?}}"}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <a
              key={i}
              href="#"
              className="group relative block rounded-card bg-brand-darker p-6 border border-white/5 hover:-translate-y-1 hover:bg-brand-dark transition"
            >
              {/* icon well */}
              <div className="h-20 w-20 grid place-items-center rounded-btn bg-brand-primary/15 mb-4">
                <div className="h-10 w-10 rounded-full bg-brand-primary" />
              </div>
              <h3 className="service-title text-brand-onDark">{s.title}</h3>
              <p className="mt-3 text-sm text-brand-onDarkMuted leading-relaxed line-clamp-4">
                {s.body}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 font-bold uppercase text-brand-primary text-sm">
                {s.title}
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
