/**
 * FAQLongFormSEO — 12-15 question accordion, SEO-dense, schema.org/FAQPage ready.
 *
 * Bears Plumbing home doesn't run a FAQ (they lean on blog), but Hook's roofing and HVAC
 * builds ship 12-15 questions long-form for FAQ schema wins in SERPs. Every Q deserves
 * a 2-4 sentence answer with one long-tail keyword naturally woven in.
 *
 * WHEN TO USE
 *  - Any contractor service page targeting "how much does X cost", "do I need Y", etc.
 *  - Mid-to-late page placement — just before the final CTA band.
 *  - Always paired with JSON-LD FAQPage schema (emit in the page head, not here).
 *
 * WHEN NOT TO USE
 *  - Ad-only landing pages with single CTA goal (adds scroll length and distracts).
 *  - When the client can only produce 3-4 real questions — use an accordion-lite pattern.
 *
 * FITTING VERTICALS
 *  every contractor — especially roofing, HVAC, whole-home services where buyers
 *  research heavily before booking.
 */
import React, { useState } from "react";

export type FaqItem = { q: string; a: string };

export interface FAQLongFormSEOProps {
  red?: string;
  ink?: string;
  heading?: string;
  subheading?: string;
  items?: FaqItem[];
  initiallyOpen?: number | null;
}

const DEFAULTS: { red: string; ink: string; heading: string; subheading: string; items: FaqItem[] } = {
  red: "#EF3E33",
  ink: "#231F20",
  heading: "Frequently Asked Questions",
  subheading: "Straight answers about our plumbing services in Spring, TX.",
  items: [
    { q: "How much does drain cleaning cost in Spring, TX?", a: "Most standard drain cleaning calls run $125–$225. Hydro-jetting on severe root-invaded lines can run $350–$650 depending on length and access. We quote upfront before any work starts." },
    { q: "How quickly can you dispatch a plumber for an emergency?", a: "We target same-day dispatch for calls booked before 1 PM and provide true 24-hour emergency support for burst pipes, sewer backups, and water-heater failures. Call for the fastest response." },
    { q: "Do you offer free estimates on water heater replacement?", a: "Yes — all water heater replacement quotes are free and include the unit, install labor, permits, and haul-away of the old tank. Tankless installs also get a free load-assessment visit." },
    { q: "Are your plumbers licensed and insured?", a: "Every technician on our truck is a licensed Texas plumber or a registered apprentice under direct license supervision. We carry $2M liability + workers' comp and are bonded statewide." },
    { q: "Do you work on both residential and light commercial properties?", a: "We primarily service single-family and multi-family residential, but we also handle light commercial (offices, restaurants, small retail). For large commercial, we'll refer you to a trusted partner." },
    { q: "What brands of water heaters do you install?", a: "We install Bradford White, Rheem, Navien tankless, and Rinnai tankless. We'll walk you through the trade-offs between tank vs tankless, gas vs electric, and warranty lengths during your estimate." },
    { q: "How long does a typical repipe take?", a: "A 3-bed / 2-bath home repipe usually takes 2–3 working days with PEX, or 3–4 days with copper. We cover walls, coordinate drywall repair, and leave your home cleaner than we found it." },
    { q: "Do you offer financing on larger jobs?", a: "Yes — we partner with a leading home-improvement lender offering 0% APR for 12 months on approved credit, plus longer-term fixed-rate plans. Apply online or during your estimate." },
    { q: "What areas do you serve?", a: "We cover Spring, The Woodlands, Conroe, Houston, Tomball, Cypress, Magnolia, Montgomery, Jersey Village, Porter, Willis, and surrounding areas in Harris and Montgomery counties." },
    { q: "Do you offer maintenance memberships?", a: "Yes — our Bear Club membership covers an annual plumbing inspection, priority dispatch, and 15% off all repairs. Most members save 2–3× their membership price in the first year." },
    { q: "What happens if the problem comes back after a repair?", a: "Every repair is backed by our workmanship guarantee. If the same issue recurs in the guarantee period, we return and fix it at no labor cost." },
    { q: "Can I book online instead of calling?", a: "Absolutely. Fill out the quote form in the header of this page and a dispatcher will text you back within 30 minutes during business hours (8 AM – 5 PM, Mon–Fri)." },
    { q: "Do you charge a dispatch or trip fee?", a: "There's a flat $79 dispatch fee that is fully credited toward any repair you authorize. Estimates for replacement work (water heater, repipe, sewer) are always free." },
    { q: "How do you handle hidden pipe leaks?", a: "We use acoustic and thermal leak-detection equipment to pinpoint slab leaks and in-wall leaks without unnecessary demolition. You'll see the reading before we open anything up." },
    { q: "Do you clean up after the job?", a: "Yes. Every tech carries shoe covers, drop cloths, and a small vacuum. We leave your home as clean as we found it — or cleaner. That's a house rule." },
  ],
};

export default function FAQLongFormSEO(props: FAQLongFormSEOProps) {
  const {
    red = DEFAULTS.red,
    ink = DEFAULTS.ink,
    heading = DEFAULTS.heading,
    subheading = DEFAULTS.subheading,
    items = DEFAULTS.items,
    initiallyOpen = 0,
  } = props;

  const [open, setOpen] = useState<number | null>(initiallyOpen);

  return (
    <section style={{ padding: "72px 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        <h2
          className="text-center uppercase"
          style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: "48px", color: ink }}
        >
          {heading}
        </h2>
        <p className="text-center mt-3 mb-10" style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 17, color: ink + "CC" }}>
          {subheading}
        </p>
        <ul className="space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} style={{ border: "1px solid #CCD6DF", borderRadius: 7, background: "#fff" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-5 py-4 uppercase"
                  style={{
                    fontFamily: '"Roboto Condensed", system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    color: ink,
                  }}
                >
                  <span>{it.q}</span>
                  <span
                    aria-hidden
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 150ms ease",
                      color: red,
                      fontSize: 24,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <div
                    className="px-5 pb-5"
                    style={{
                      fontFamily: '"Roboto Condensed", system-ui, sans-serif',
                      fontSize: 17,
                      lineHeight: "27.2px",
                      color: ink + "D9",
                    }}
                  >
                    {it.a}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
