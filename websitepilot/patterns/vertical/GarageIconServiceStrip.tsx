/**
 * GarageIconServiceStrip — horizontal 6-up icon service nav row.
 *
 * Source: https://callhighlevel.com (HighLevel Garage Doors)
 * Signature move: directly beneath the hero, a single row of six tight icon
 * tiles — each with a line-art glyph and a two-word service label
 * (Installation, Repair, Maintenance, Openers, Springs, Emergency). No body
 * copy, no photos. Acts as a visual service menu that doubles as an anchor
 * nav for the longer-form cards below. Strong for vertically narrow service
 * categories (garage, locksmith, gutter, tint, wraps) where each service is
 * self-explanatory.
 *
 * WHEN TO USE:
 *  - Single-trade brands with 5-8 tightly-defined services
 *  - Categories where an icon communicates the service instantly
 *  - Pages that need a dense service nav without consuming vertical space
 *
 * WHEN NOT TO USE:
 *  - Multi-trade full-service brands (use the richer coupon-embedded grid instead)
 *  - Services that need photos or pricing to make sense
 *  - Brands without a consistent icon system — mismatched glyphs kill it
 */
type StripIcon = {
  icon: string;   // emoji or img URL
  label: string;
  href: string;
};

type Props = {
  items?: StripIcon[];
  brand?: { ink?: string; accent?: string; accentInk?: string; surface?: string };
};

export default function GarageIconServiceStrip({
  items = [
    { icon: "🛠️", label: "Installation", href: "/installation" },
    { icon: "🔧", label: "Repair", href: "/repair" },
    { icon: "⚙️", label: "Maintenance", href: "/maintenance" },
    { icon: "📱", label: "Openers", href: "/openers" },
    { icon: "🌀", label: "Springs", href: "/springs" },
    { icon: "🚨", label: "Emergency", href: "/emergency" },
  ],
  brand = { ink: "#102E4A", accent: "#F9B529", accentInk: "#102E4A", surface: "#FFFFFF" },
}: Props) {
  const ink = brand.ink ?? "#102E4A";
  const accent = brand.accent ?? "#F9B529";
  const surface = brand.surface ?? "#FFFFFF";

  return (
    <section
      className="relative py-10 md:py-14 border-y"
      style={{ background: surface, color: ink, borderColor: "rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <ul
          className="grid gap-2 md:gap-0"
          style={{ gridTemplateColumns: `repeat(${Math.max(items.length, 2)}, minmax(0, 1fr))` }}
        >
          {items.map((item, i) => (
            <li
              key={item.label}
              className="relative"
              style={{ borderRight: i < items.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
            >
              <a
                href={item.href}
                className="group flex flex-col items-center justify-center gap-3 py-6 px-3 text-center transition-transform hover:-translate-y-0.5"
              >
                <span
                  className="flex items-center justify-center w-16 h-16 rounded-full text-[28px]"
                  style={{ background: accent, color: ink }}
                  aria-hidden
                >
                  {item.icon}
                </span>
                <span
                  className="text-[13px] md:text-[14px] font-bold tracking-[0.1em] uppercase"
                  style={{ color: ink }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
