import { Zap, Home, Award, Eye } from "lucide-react";

/**
 * WhyUs — archetype-mascot.
 *
 * Two patterns used by the source, combined here:
 *   (A) A four-pillar row on cream bg: Velocity / Ownership / Legendary Service / Transparency.
 *   (B) A six-card "Why Choose Us" grid on cream bg under a giant 111px H3 headline.
 *
 * Clients only need ONE of these typically. The component renders both
 * so visual rhythm matches the source; remove (B) for lighter briefs.
 */
const pillars = [
  { icon: Zap,   title: "{{Pillar 1}}", body: "{{One-line pillar-1 promise}}" },
  { icon: Home,  title: "{{Pillar 2}}", body: "{{One-line pillar-2 promise}}" },
  { icon: Award, title: "{{Pillar 3}}", body: "{{One-line pillar-3 promise}}" },
  { icon: Eye,   title: "{{Pillar 4}}", body: "{{One-line pillar-4 promise}}" },
];

const reasons = [
  { title: "{{Reason 1}}", body: "{{Reason 1 body — one short paragraph}}" },
  { title: "{{Reason 2}}", body: "{{Reason 2 body — one short paragraph}}" },
  { title: "{{Reason 3}}", body: "{{Reason 3 body — one short paragraph}}" },
  { title: "{{Reason 4}}", body: "{{Reason 4 body — one short paragraph}}" },
  { title: "{{Reason 5}}", body: "{{Reason 5 body — one short paragraph}}" },
  { title: "{{Reason 6}}", body: "{{Reason 6 body — one short paragraph}}" },
];

export default function WhyUs() {
  return (
    <section className="section-cream py-24 lg:py-32">
      <div className="container">
        {/* Pillars row */}
        <div className="max-w-3xl mb-20">
          <h2 className="display-h2 text-brand-dark">
            {"{{WE DON'T JUST FIX. WE EMPOWER.}}"}
          </h2>
          <p className="mt-5 text-base lg:text-lg text-brand-ink leading-relaxed">
            {"{{TWO-SENTENCE BRAND-PILLAR PREAMBLE — what your brand stands for that nobody else does.}}"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
          {pillars.map((p, i) => (
            <div key={i} className="text-left">
              <div className="h-14 w-14 rounded-btn bg-brand-primary/15 grid place-items-center mb-4">
                <p.icon className="h-7 w-7 text-brand-primary" />
              </div>
              <h3 className="card-title text-brand-dark">{p.title}</h3>
              <p className="mt-2 text-sm text-brand-ink leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Why choose us — huge headline */}
        <div className="text-center max-w-6xl mx-auto mb-14">
          <h3 className="display-xl text-brand-dark">
            {"{{WHY CHOOSE {{BRAND}}?}}"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reasons.map((r, i) => (
            <div key={i} className="text-left">
              <div className="h-16 w-16 rounded-full bg-brand-dark grid place-items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-brand-primary" />
              </div>
              <h4 className="card-title text-brand-dark">{r.title}</h4>
              <p className="mt-2 text-sm text-brand-ink leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="#contact" className="btn-primary btn-xl">
            {"{{PRIMARY CTA}}"}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
