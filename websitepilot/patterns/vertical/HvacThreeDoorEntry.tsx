/**
 * HvacThreeDoorEntry — three tall CTA tiles that segment traffic by intent.
 *
 * Source: https://smockhvac.com (Smock HVAC, DC metro)
 * Signature move: instead of a generic "Contact Us" the page offers three
 * distinct "doors" to enter the business — Instant Quote, Book Service,
 * Membership. Each is a self-contained tile with its own icon, headline,
 * sub-label, and CTA. The row sits directly under the hero and converts
 * undifferentiated traffic into one of three intent buckets.
 *
 * WHEN TO USE:
 *  - HVAC / plumbing / electrical brands offering multiple paths to revenue
 *    (quote, repair, membership/maintenance plan)
 *  - Sites where a single CTA fails because the audience is mixed
 *    (info-seekers + emergencies + shoppers)
 *  - High-traffic service businesses where intent-segmenting lifts conversion
 *
 * WHEN NOT TO USE:
 *  - Single-service brands (water-heater-only, tree-service-only)
 *  - Brands without a membership / maintenance product
 *  - Premium design-build — three parallel CTAs feel transactional
 */
type DoorTile = {
  eyebrow?: string;     // "Same day service!"
  title: string;        // "Book Your Service"
  sub?: string;         // "Get estimated system pricing in minutes!"
  icon?: string;        // emoji or img src
  href: string;
  tone?: "primary" | "outline" | "dark";
};

type Props = {
  doors?: DoorTile[];
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; accent?: string };
};

export default function HvacThreeDoorEntry({
  doors = [
    {
      eyebrow: "No commitment",
      title: "Instant HVAC Quote",
      sub: "Get estimated system pricing in minutes — right here online.",
      icon: "💵",
      href: "/instant-quote",
      tone: "primary",
    },
    {
      eyebrow: "Same day service!",
      title: "Book Your Service",
      sub: "Need help today? Reserve a time window that works for you.",
      icon: "📅",
      href: "/book",
      tone: "dark",
    },
    {
      eyebrow: "Save year-round",
      title: "Explore Memberships",
      sub: "Priority scheduling, annual tune-ups, member pricing.",
      icon: "🛡️",
      href: "/membership",
      tone: "outline",
    },
  ],
  brand = { ink: "#0F2338", primary: "#E63946", primaryInk: "#FFFFFF", surface: "#F5F7FA", accent: "#FFB703" },
}: Props) {
  const ink = brand.ink ?? "#0F2338";
  const primary = brand.primary ?? "#E63946";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F5F7FA";

  const toneStyles = (tone?: string) => {
    switch (tone) {
      case "primary":
        return { background: primary, color: primaryInk, border: "transparent" };
      case "dark":
        return { background: ink, color: "#FFFFFF", border: "transparent" };
      case "outline":
      default:
        return { background: "#FFFFFF", color: ink, border: "rgba(0,0,0,0.08)" };
    }
  };

  return (
    <section className="relative py-14 md:py-20" style={{ background: surface, color: ink }}>
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {doors.map((door) => {
            const tone = toneStyles(door.tone);
            return (
              <a
                key={door.title}
                href={door.href}
                className="group relative block p-8 rounded-[6px] transition-transform hover:-translate-y-1 border"
                style={{
                  background: tone.background,
                  color: tone.color,
                  borderColor: tone.border,
                  boxShadow: "0 12px 34px rgba(15,35,56,0.08)",
                  minHeight: 220,
                }}
              >
                {door.eyebrow && (
                  <p
                    className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 opacity-80"
                  >
                    {door.eyebrow}
                  </p>
                )}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="font-display font-bold"
                    style={{ fontSize: "clamp(22px, 2.2vw, 30px)", lineHeight: 1.1 }}
                  >
                    {door.title}
                  </h3>
                  <span className="text-[36px] leading-none shrink-0" aria-hidden>
                    {door.icon}
                  </span>
                </div>
                {door.sub && <p className="text-[15px] opacity-85 leading-snug mb-6">{door.sub}</p>}
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.14em] uppercase">
                  Start →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
