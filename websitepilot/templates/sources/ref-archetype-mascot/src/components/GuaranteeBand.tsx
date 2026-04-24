import { ShieldCheck } from "lucide-react";

/**
 * GuaranteeBand — archetype-mascot.
 *
 * Mid-page orange rectangle that screams trust. Structure:
 *   - Eyebrow "TRY THE BEST..."
 *   - Giant "100% SATISFACTION GUARANTEE" headline
 *   - Shield icon + mini sub
 *   - Orange-on-dark inverted CTA
 */
export default function GuaranteeBand() {
  return (
    <section className="relative">
      <div className="section-primary py-16 lg:py-20">
        <div className="container text-center">
          <p className="eyebrow text-brand-dark">
            {"{{TRY THE BEST {{SERVICE}} IN THE {{METRO}} AREA}}"}
          </p>
          <h2 className="display-h1 text-brand-primaryInk mt-3">
            {"100% Satisfaction Guarantee"}
            <br />
            {"For All Services"}
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-brand-dark font-bold uppercase">
            <ShieldCheck className="h-6 w-6" />
            <span>{"{{Licensed · Bonded · Insured}}"}</span>
          </div>
          <div className="mt-8">
            <a
              href="#contact"
              className="btn-secondary"
              style={{ fontSize: "24px", padding: "16px 28px" }}
            >
              {"{{PRIMARY CTA}}"}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="zigzag-separator" />
    </section>
  );
}
