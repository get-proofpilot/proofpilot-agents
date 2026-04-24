/**
 * VeteranCredentialBadgeRow — veteran-owned + program-certified badge row.
 *
 * Source: https://veteranscontractingllc.com (Veterans Contracting LLC)
 * Signature move: a 4-up icon band positioned just below the hero with
 * earned credentials presented as oversized circular icons + ALL-CAPS
 * captions: VETERAN-OWNED / FORTIFIED ROOF CERTIFIED / LEADERS IN
 * TECHNOLOGY / COMMUNITY FAVORITE. Different from a generic certifications
 * row because the FIRST badge is the brand's identity (veteran-owned)
 * and the rest are accomplishments. Reads as a single statement of "who
 * we are AND what we've earned."
 *
 * WHEN TO USE:
 *  - Veteran-owned, family-owned, or minority-owned brands where ownership
 *    identity is part of the trust story
 *  - Roofing / construction / HVAC brands with 2-3 named program
 *    certifications (FORTIFIED, GAF Master Elite, Owens Corning Platinum,
 *    Trane Comfort Specialist)
 *  - Heritage / contractor-heritage / rugged-industrial presets where
 *    earned-credentials matter
 *
 * WHEN NOT TO USE:
 *  - Brands without verifiable credentials — generic icons here look fake
 *  - Premium / design-build presets — feels too transactional
 *  - When you already have a cert-logo carousel further down the page
 */
type Badge = {
  title: string;        // ALL-CAPS, branded if applicable
  caption?: string;     // optional 1-line below
  icon?: string;        // emoji, image url, or SVG path
  iconUrl?: string;     // explicit image url (overrides icon)
};

type Props = {
  badges?: Badge[];
  background?: "light" | "dark";
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; surfaceDark?: string };
};

export default function VeteranCredentialBadgeRow({
  badges = [
    { title: "Veteran-Owned", caption: "Founded & operated by U.S. veterans", icon: "🎖️" },
    { title: "FORTIFIED Roof™ Certified", caption: "Certified for severe-weather durability", icon: "🛡️" },
    { title: "Leaders in Technology", caption: "Drone inspections + thermal imaging", icon: "🚁" },
    { title: "Community Favorite", caption: "5-star rated across Google & Facebook", icon: "⭐" },
  ],
  background = "light",
  brand = { ink: "#0A2540", primary: "#B91C1C", primaryInk: "#FFFFFF", surface: "#F4F7FB", surfaceDark: "#0A2540" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#B91C1C";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F4F7FB";
  const surfaceDark = brand.surfaceDark ?? "#0A2540";

  const bg = background === "dark" ? surfaceDark : surface;
  const fg = background === "dark" ? primaryInk : ink;

  return (
    <section style={{ background: bg, color: fg }}>
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 list-none p-0">
          {badges.map((b, idx) => (
            <li
              key={b.title}
              className="flex flex-col items-center text-center"
              style={{
                borderLeft: idx > 0 ? `1px solid ${background === "dark" ? "rgba(255,255,255,0.12)" : "rgba(10,37,64,0.10)"}` : "none",
                paddingLeft: idx > 0 ? "1.5rem" : 0,
              }}
            >
              <span
                className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full mb-4"
                style={{
                  background: `${primary}${idx === 0 ? "" : "1A"}`,
                  color: idx === 0 ? primaryInk : primary,
                  border: idx === 0 ? "none" : `2px solid ${primary}`,
                  fontSize: "30px",
                }}
                aria-hidden
              >
                {b.iconUrl ? <img src={b.iconUrl} alt="" className="w-12 h-12 object-contain" /> : b.icon}
              </span>
              <p
                className="text-[12px] md:text-[13px] font-bold tracking-[0.14em] uppercase leading-tight"
              >
                {b.title}
              </p>
              {b.caption && (
                <p className="text-[13px] mt-2 opacity-80 max-w-[14rem]">{b.caption}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
