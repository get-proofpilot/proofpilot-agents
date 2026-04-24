import { CheckCircle2 } from "lucide-react";

/**
 * TrustBar — archetype-mascot.
 *
 * The Volt Vikings version: cream-colored section with orange eyebrow,
 * big purple H1 ("WHEN IN NEED, CALL YOUR LOCAL...!"), paragraph, then
 * a 4-item bullet list with orange checkmarks, and a CTA.
 *
 * This component ships the bullet row as a standalone trust-bar. It sits
 * right after the hero and proves "we're real humans in your town."
 */
const bullets = [
  "{{BULLET 1 — e.g. Comprehensive Solutions}}",
  "{{BULLET 2 — e.g. Free Audit With Every Visit}}",
  "{{BULLET 3 — e.g. Heroic Customer Experience}}",
  "{{BULLET 4 — e.g. Loyalty / Savings Program}}",
];

export default function TrustBar() {
  return (
    <section id="about" className="section-cream py-20 lg:py-28">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-primary">
            {"{{BRAND}} {{SERVICE}} IN {{CITY}}, {{STATE}}"}
          </p>
          <h2 className="display-h1 mt-3 text-brand-dark">
            {"{{WHEN IN NEED, CALL YOUR LOCAL {{ARCHETYPE}} HEROES!}}"}
          </h2>
          <p className="mt-6 text-base lg:text-lg text-brand-ink leading-relaxed">
            {"{{INTRO PARAGRAPH — 3–5 sentences that establish history, licensing, service philosophy, and how you treat customers like family. Mention the primary service area by name.}}"}
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-brand-dark font-semibold">
                <CheckCircle2 className="h-6 w-6 shrink-0 mt-0.5 text-brand-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a href="#contact" className="btn-primary btn-xl">
              {"{{PRIMARY CTA}}"}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
