import { useState } from "react";

const FAQS = [
  {
    q: "Is your holiday lighting weatherproof?",
    a: "Yes. Our lights are premium-grade and designed to withstand heat, rain, wind — every element, all season long.",
  },
  {
    q: "How long does the install take?",
    a: "It depends on property size and display scope. Most residential installs finish in a single visit. We schedule around your calendar so you don't need to pause your life.",
  },
  {
    q: "When do you come remove the lights?",
    a: "All packages include free removal. Pick a time that suits you and we'll be there — and we'll even store the lights for next year.",
  },
  {
    q: "How do I get a quote?",
    a: "Click the Get a Fast Quote button, send us the details, and we'll follow up within the day with a transparent, personalized price.",
  },
  {
    q: "Do you do commercial properties?",
    a: "Absolutely — HOAs, storefronts, and multi-unit commercial all year round. Ask about our commercial package.",
  },
];

export default function FaqPlayful() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-cream">
      <div className="mx-auto max-w-[1100px] px-6 py-20 lg:py-28">
        <div className="kicker text-brand-accent text-center">FAQ</div>
        <h2 className="display-h1 text-brand-dark mt-3 text-center">
          {/* {{FAQ-H2}} */}
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={
                  "rounded-card border-2 overflow-hidden transition-colors " +
                  (isOpen
                    ? "border-brand-primary bg-white shadow-card"
                    : "border-brand-dark/15 bg-white")
                }
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex items-center justify-between gap-4 px-6 py-5"
                >
                  <span className="card-title text-brand-dark">{f.q}</span>
                  <span
                    aria-hidden
                    className={
                      "h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-sans font-black text-xl transition-colors " +
                      (isOpen
                        ? "bg-brand-primary text-brand-primaryInk"
                        : "bg-brand-dark text-white")
                    }
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-brand-inkMuted text-[16px] leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
