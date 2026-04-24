/**
 * ExteriorCommercialClientMarquee — dense two-row logo marquee of real
 * commercial clients.
 *
 * Source: https://www.onpointpressurewash.com (DFW)
 * Signature move: a commercial-client logo wall shown as a continuous
 * horizontal marquee, 2-3 rows tall, running 20+ national / regional logos
 * (Walmart, Chevron, Chipotle, Starbucks, Top Golf, KFC, etc). Establishes
 * instant commercial credibility in a category that is 90% residential
 * competitors. Also works for landscaping companies that serve HOAs, roofing
 * companies that serve chains, paving/asphalt, commercial cleaners.
 *
 * WHEN TO USE:
 *  - Residential-home-service brand breaking into commercial
 *  - Brands with a strong commercial client book but low awareness of it
 *  - Pressure wash / cleaning / roofing / landscape / pest where commercial
 *    spend signals credibility to residential buyers too
 *
 * WHEN NOT TO USE:
 *  - Pure residential brands with no commercial clients
 *  - Brands that haven't secured logo-usage rights
 *  - Premium residential (commercial logos cheapen the feel)
 */
type Props = {
  eyebrow?: string;
  heading?: string;
  logos?: string[];      // image URLs, usually SVG
  rowSpeedSec?: number;  // seconds for one row loop
  brand?: { ink?: string; surface?: string; accent?: string };
};

export default function ExteriorCommercialClientMarquee({
  eyebrow = "Commercial Clients",
  heading = "Trusted by the brands people recognize on the highway.",
  logos = [
    "/logos/walmart.svg",
    "/logos/chevron.svg",
    "/logos/chipotle.svg",
    "/logos/starbucks.svg",
    "/logos/kfc.svg",
    "/logos/topgolf.svg",
    "/logos/mcdonalds.svg",
    "/logos/shell.svg",
    "/logos/chick-fil-a.svg",
    "/logos/buffalo-wild-wings.svg",
    "/logos/exxon.svg",
    "/logos/jib.svg",
  ],
  rowSpeedSec = 38,
  brand = { ink: "#1F2937", surface: "#F8FAFC", accent: "#059669" },
}: Props) {
  const ink = brand.ink ?? "#1F2937";
  const surface = brand.surface ?? "#F8FAFC";
  const accent = brand.accent ?? "#059669";

  // Duplicate logos to create seamless loop
  const doubled = [...logos, ...logos];

  return (
    <section className="py-16 md:py-20 overflow-hidden" style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 mb-10 text-center">
        <p className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: accent }}>
          {eyebrow}
        </p>
        <h2
          className="font-display font-bold"
          style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.015em" }}
        >
          {heading}
        </h2>
      </div>

      <div className="relative">
        {/* edge fade */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${surface}, transparent)` }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(270deg, ${surface}, transparent)` }}
        />

        <div className="flex items-center gap-12 whitespace-nowrap marquee-row-1">
          {doubled.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-10 md:h-14 w-auto opacity-70 grayscale"
              style={{ filter: "grayscale(100%)", maxWidth: 180 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-12 whitespace-nowrap mt-10 marquee-row-2">
          {doubled.reverse().map((src, i) => (
            <img
              key={`r2-${i}`}
              src={src}
              alt=""
              className="h-10 md:h-14 w-auto opacity-70 grayscale"
              style={{ filter: "grayscale(100%)", maxWidth: 180 }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeA { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeB { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-row-1 { animation: marqueeA ${rowSpeedSec}s linear infinite; }
        .marquee-row-2 { animation: marqueeB ${Math.round(rowSpeedSec * 1.2)}s linear infinite; }
      `}</style>
    </section>
  );
}
