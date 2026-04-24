/**
 * LandscapeDroneReelGrid — landscaping / hardscaping / outdoor-living vertical.
 *
 * Source: https://podlaz.com (Pro Outdoor, Phoenix AZ)
 * Signature move: a gallery tile grid made ENTIRELY of short looping drone/aerial
 * reels (Vimeo-style). Each tile is a video, not a photo. Reels are 8-12 seconds,
 * aspect-preserved, no chrome. The viewer feels like they are scrolling a
 * director's reel, not a portfolio.
 *
 * WHEN TO USE:
 *  - Outdoor-living / landscape / hardscape / pool / turf brands with aerial footage
 *  - Projects that photograph poorly but shoot beautifully (patios, pools, big
 *    properties). Drone reels flatten a portfolio of work into a single visual tone.
 *  - Brands that want to feel "studio-ops" without paying for a videography overhaul
 *
 * WHEN NOT TO USE:
 *  - No aerial / motion footage available (fall back to static masonry)
 *  - HVAC / plumbing / indoor trades where drone footage isn't the product
 *  - Mobile-data-sensitive audiences — 6+ autoplay videos hammer bandwidth
 *
 * Props are brand-agnostic. Video sources are swap-in.
 */
type ReelTile = {
  src: string;          // mp4 / webm url, muted autoplay loopable
  poster?: string;      // fallback still
  caption?: string;     // optional overlay caption
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  reels?: ReelTile[];
  ctaLabel?: string;
  ctaHref?: string;
  brand?: { ink?: string; accent?: string; surface?: string };
};

export default function LandscapeDroneReelGrid({
  eyebrow = "See What We've Built",
  heading = "From 400 feet up.",
  subhead = "Every project we touch — shot from the sky, start to finish.",
  reels = [
    { src: "/reels/aerial-01.mp4", caption: "Paradise Valley · 2024" },
    { src: "/reels/aerial-02.mp4", caption: "Scottsdale · 2024" },
    { src: "/reels/aerial-03.mp4", caption: "Phoenix · 2024" },
    { src: "/reels/aerial-04.mp4", caption: "Chandler · 2024" },
    { src: "/reels/aerial-05.mp4", caption: "Mesa · 2024" },
    { src: "/reels/aerial-06.mp4", caption: "Gilbert · 2024" },
  ],
  ctaLabel = "See the Full Portfolio",
  ctaHref = "#portfolio",
  brand = { ink: "#0E1A14", accent: "#6E8E5F", surface: "#F5F1E8" },
}: Props) {
  const ink = brand.ink ?? "#0E1A14";
  const accent = brand.accent ?? "#6E8E5F";
  const surface = brand.surface ?? "#F5F1E8";

  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: surface, color: ink }}
    >
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p
            className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg opacity-80 max-w-xl">{subhead}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {reels.map((reel, i) => (
            <div
              key={reel.src + i}
              className="relative group overflow-hidden rounded-[4px]"
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
            >
              <video
                src={reel.src}
                poster={reel.poster}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              {reel.caption && (
                <p
                  className="absolute left-4 bottom-4 text-[12px] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "#FFFFFF" }}
                >
                  {reel.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-3 px-7 py-4 text-[14px] font-semibold tracking-[0.14em] uppercase rounded-[4px] transition-colors"
            style={{ background: ink, color: surface }}
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
