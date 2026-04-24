import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

/**
 * Faq — archetype-mascot.
 *
 * Cream bg section, H2 44px 900 UPPER purple, then 6–8 purple accordion bars.
 * First item defaults open. Open-item body is cream-on-purple.
 */
const faqs = [
  {
    q: "{{FAQ question 1 — e.g. Why should I choose {{BRAND}}?}}",
    a: "{{2–3 sentence answer that reinforces differentiation, licensing, and guarantee.}}",
  },
  { q: "{{FAQ question 2}}", a: "{{Answer 2}}" },
  { q: "{{FAQ question 3}}", a: "{{Answer 3}}" },
  { q: "{{FAQ question 4}}", a: "{{Answer 4}}" },
  { q: "{{FAQ question 5}}", a: "{{Answer 5}}" },
  { q: "{{FAQ question 6}}", a: "{{Answer 6}}" },
];

export default function Faq() {
  return (
    <section className="section-cream py-24 lg:py-32">
      <div className="container">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="display-h1 text-brand-dark">
            {"{{COMMON QUESTIONS FOR {{SERVICE}} IN {{CITY}}}}"}
          </h2>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          defaultValue="item-0"
          className="max-w-3xl mx-auto space-y-3"
        >
          {faqs.map((f, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="rounded-btn bg-brand-dark text-brand-onDark overflow-hidden border border-white/5"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="service-title capitalize pr-4">{f.q}</span>
                  <ChevronDown className="h-5 w-5 transition group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-6 pb-6 text-sm text-brand-onDarkMuted leading-relaxed">
                  {f.a}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
