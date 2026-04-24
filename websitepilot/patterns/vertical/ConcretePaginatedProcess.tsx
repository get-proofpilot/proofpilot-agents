/**
 * ConcretePaginatedProcess — stacked "01/04, 02/04..." process cards with
 * in-progress imagery.
 *
 * Source: https://www.prestigeconcretedfw.com
 * Signature move: each step is a large card that reads like a paginated
 * sequence ("01 / 04", "02 / 04"). Each card has: the pagination label,
 * a step image (pour in progress, rebar laid, finishing), a one-phrase
 * step name, a paragraph of what happens, and a quick "Contact Us" CTA.
 * It reads like a production-diary rather than a marketing section.
 *
 * WHEN TO USE:
 *  - Concrete / construction / pool / excavation / demo / solar categories
 *    where the "how we work" is genuinely photogenic
 *  - Brands that want to demystify a process the buyer finds intimidating
 *  - Mid-page proof block — anchors trust by showing the actual work
 *
 * WHEN NOT TO USE:
 *  - Trades with invisible processes (electrical inside walls, HVAC in attic)
 *  - Brands without strong on-site photography
 *  - Short-cycle services where a 4-step sequence feels overwrought
 */
type PaginatedStep = {
  image: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  steps?: PaginatedStep[];
  brand?: { ink?: string; accent?: string; accentInk?: string; surface?: string; muted?: string };
};

export default function ConcretePaginatedProcess({
  eyebrow = "How It Works",
  heading = "Our 4-step concrete process, no mystery.",
  subhead = "Forming. Reinforcing. Pouring. Finishing. Most projects wrapped in 2-3 days, with minimal disruption to your routine.",
  steps = [
    {
      image: "/process/01-forming.jpg",
      title: "Site Preparation & Forming",
      body: "We prep the site and set precise forms that define the shape and size of the project — whether it's a driveway, slab, or walkway.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact",
    },
    {
      image: "/process/02-reinforcing.jpg",
      title: "Reinforcement",
      body: "Rebar or mesh is added to strengthen the pour and ensure long-lasting durability — especially in high-traffic zones.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact",
    },
    {
      image: "/process/03-pouring.jpg",
      title: "Pouring & Finishing",
      body: "Once forms and reinforcement are set, we pour high-grade concrete and smooth it to a flawless, even finish — cured for maximum strength.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact",
    },
    {
      image: "/process/04-curing.jpg",
      title: "Curing & Final Inspection",
      body: "We monitor the cure, walk the site with you, and hand over a slab that's ready to perform for decades.",
      ctaLabel: "Contact Us",
      ctaHref: "/contact",
    },
  ],
  brand = { ink: "#1A1A1A", accent: "#E8B629", accentInk: "#1A1A1A", surface: "#F3F1EC", muted: "#8B8B8B" },
}: Props) {
  const ink = brand.ink ?? "#1A1A1A";
  const accent = brand.accent ?? "#E8B629";
  const surface = brand.surface ?? "#F3F1EC";
  const muted = brand.muted ?? "#8B8B8B";
  const total = steps.length;

  return (
    <section className="py-20 md:py-28" style={{ background: surface, color: ink }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p
            className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(30px, 4.5vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg opacity-80">{subhead}</p>
        </div>

        <div className="space-y-8">
          {steps.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
              >
                <div
                  className={`md:col-span-6 ${reverse ? "md:order-2" : ""}`}
                >
                  <div
                    className="relative rounded-[6px] overflow-hidden aspect-[16/10]"
                    style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
                  >
                    <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
                <div className={`md:col-span-6 ${reverse ? "md:order-1" : ""}`}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="font-display font-black"
                      style={{ fontSize: 60, lineHeight: 1, color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-[15px] font-semibold tracking-[0.18em] uppercase"
                      style={{ color: muted }}
                    >
                      / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold mb-3"
                    style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.15 }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[17px] opacity-85 leading-relaxed mb-5 max-w-lg">{s.body}</p>
                  {s.ctaLabel && s.ctaHref && (
                    <a
                      href={s.ctaHref}
                      className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase"
                      style={{ color: ink, borderBottom: `2px solid ${accent}`, paddingBottom: 2 }}
                    >
                      {s.ctaLabel} →
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
