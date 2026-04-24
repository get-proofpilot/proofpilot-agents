/**
 * ConstructionAsSeenOnPressBar — "AS SEEN ON" press / TV-station logo bar.
 *
 * Source: https://concretefixers.com (Concrete Fixers, Greenville SC) —
 * "AS SEEN ON: WYFF 4, ABC News, Fox News, CBS News" logo strip
 * Signature move: a slim band, usually right under the hero or service
 * grid, captioned simply "AS SEEN ON" and showing 3-6 grayscale TV/news
 * station logos. Different from a generic "trust badge" row because
 * these are EARNED-MEDIA logos (a station did a story on the brand) —
 * not paid certifications. The visual treatment is intentionally
 * minimal: small caps caption, evenly-spaced logos, lots of whitespace.
 *
 * WHEN TO USE:
 *  - Brands that have had real local-TV / news coverage (rescue stories,
 *    business-spotlight features, etc.) and have logos to back it up
 *  - Heritage / contractor-heritage / archetype-mascot presets where
 *    third-party credibility is the trust foundation
 *  - Local-market brands where regional TV recognition genuinely moves
 *    buyer trust
 *
 * WHEN NOT TO USE:
 *  - Brands without verifiable press coverage — fake logos here are a
 *    legal and credibility nightmare
 *  - National / SaaS brands — local TV doesn't translate
 *  - Pages that already have a packed certifications row
 */
type Outlet = {
  name: string;
  logoUrl: string;
  href?: string;
};

type Props = {
  caption?: string;
  outlets?: Outlet[];
  brand?: { ink?: string; surface?: string; muted?: string };
};

export default function ConstructionAsSeenOnPressBar({
  caption = "As Seen On",
  outlets = [
    { name: "WYFF 4", logoUrl: "/press/wyff-4.png", href: "#" },
    { name: "ABC News", logoUrl: "/press/abc-news.png", href: "#" },
    { name: "Fox News", logoUrl: "/press/fox-news.png", href: "#" },
    { name: "CBS News", logoUrl: "/press/cbs-news.png", href: "#" },
  ],
  brand = { ink: "#0A2540", surface: "#FFFFFF", muted: "#6B7280" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const surface = brand.surface ?? "#FFFFFF";
  const muted = brand.muted ?? "#6B7280";

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-10">
          <p
            className="text-[12px] font-bold tracking-[0.28em] uppercase shrink-0"
            style={{ color: muted }}
          >
            {caption}:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 list-none p-0 m-0">
            {outlets.map((o) => (
              <li key={o.name}>
                <a
                  href={o.href ?? "#"}
                  aria-label={o.name}
                  className="inline-block"
                  style={{
                    filter: "grayscale(1)",
                    opacity: 0.65,
                    transition: "opacity 200ms ease, filter 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.filter = "grayscale(0)";
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.filter = "grayscale(1)";
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.65";
                  }}
                >
                  <img
                    src={o.logoUrl}
                    alt={o.name}
                    className="h-7 md:h-9 w-auto object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
