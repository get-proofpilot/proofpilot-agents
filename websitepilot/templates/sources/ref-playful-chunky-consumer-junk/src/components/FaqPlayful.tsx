import { useState } from "react";

const FAQS = [
  {
    q: "What kinds of junk do you take?",
    a: "Almost anything that fits in our truck and is legal to haul: furniture, appliances, mattresses, electronics, yard waste, construction debris, hot tubs, sheds, playsets, estate cleanouts, garage purges. If it's not in your kitchen or bathroom plumbing, we probably take it.",
  },
  {
    q: "What can't you take?",
    a: "Hazardous materials (paint, oil, gasoline, propane tanks, asbestos, medical waste, wet/leaking chemicals). If you're not sure — text us a photo. We'll tell you yes, no, or who to call instead.",
  },
  {
    q: "How does flat-rate pricing work?",
    a: "Our price is based on truck volume, not weight or item count. Once we size the load (from a photo or in person), the number doesn't change. Labor, hauling, and dump fees are all included.",
  },
  {
    q: "Can you come today?",
    a: "Most days, yes. Text or call by mid-morning and we'll lock in a same-day window. After-hours and weekend slots are available — sometimes for a small surcharge.",
  },
  {
    q: "Do I need to be home during the pickup?",
    a: "Not always. If everything is curbside, in the driveway, or in an unlocked garage, we can text you a before/after photo and an invoice link. Inside-the-house pickups need someone to point the way.",
  },
  {
    q: "What happens to my stuff after you take it?",
    a: "Donation first. We partner with local charities for usable furniture, clothing, and appliances. Recyclables (metal, electronics, cardboard) go to local recyclers. Only the leftover heads to the landfill.",
  },
  {
    q: "Do you do commercial cleanouts?",
    a: "Absolutely — office cube farms, store resets, property turnovers, restaurant gut-outs. Off-hours and weekend scheduling welcome. Ask about our recurring commercial rate.",
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
