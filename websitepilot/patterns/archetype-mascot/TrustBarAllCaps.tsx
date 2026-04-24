import { CheckCircle2 } from "lucide-react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * TrustBarAllCaps
 * ---------------
 * Cream-colored intro section: orange eyebrow, big purple UPPERCASE headline,
 * 3–5 checkmark bullets, primary CTA. Sits right after the hero.
 *
 * WHEN TO USE
 *   - The first block after a mascot hero.
 *   - The brief calls out concrete differentiators (licensed, bonded, free audit).
 *   - Copy volume is high enough that the bullets feel earned (3–5 items).
 *
 * WHEN NOT TO USE
 *   - You only have 1–2 differentiators (go straight to Services).
 *   - You have >5 → use a pillar-card grid instead.
 */
export type TrustBarAllCapsProps = {
  brand?: Partial<BrandTokens>;
  eyebrow?: string;
  headline?: string;
  body?: string;
  bullets?: string[];
  primaryCta?: { label: string; href: string };
};

export default function TrustBarAllCaps({
  brand,
  eyebrow = "VOLT VIKINGS ELECTRICIANS IN TUCSON, AZ",
  headline = "WHEN IN NEED, CALL YOUR LOCAL VIKING ELECTRICIANS!",
  body = "From electrical upgrades and repairs to lighting installations and EV chargers, we are your one-stop shop for all electrical needs. Fully licensed, bonded, and insured — your home treated like our own.",
  bullets = [
    "Comprehensive Electrical Solutions",
    "Free Audit With Every Visit",
    "Heroic Customer Experience",
    "Loyalty & Savings Program",
  ],
  primaryCta = { label: "GET A FAST QUOTE", href: "#contact" },
}: TrustBarAllCapsProps) {
  const b = { ...defaultBrand, ...brand };

  return (
    <section
      style={{
        background: b.cream ?? "#FFF6EF",
        color: "#333",
        fontFamily: b.fontFamily,
      }}
      className="py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="max-w-3xl">
          <p
            className="uppercase font-bold tracking-widest mb-3"
            style={{ color: b.primary, fontSize: 18 }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-bold uppercase"
            style={{
              color: b.dark,
              fontSize: "clamp(32px, 3.5vw, 44px)",
              lineHeight: 1.2,
            }}
          >
            {headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed">{body}</p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bullets.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-semibold"
                style={{ color: b.dark }}
              >
                <CheckCircle2
                  className="h-6 w-6 shrink-0 mt-0.5"
                  style={{ color: b.primary }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={primaryCta.href}
            className="mt-10 inline-flex items-center gap-3 font-bold uppercase"
            style={{
              background: b.primary,
              color: b.primaryInk,
              padding: "18px 32px",
              borderRadius: 10,
              fontSize: 24,
            }}
          >
            {primaryCta.label}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
