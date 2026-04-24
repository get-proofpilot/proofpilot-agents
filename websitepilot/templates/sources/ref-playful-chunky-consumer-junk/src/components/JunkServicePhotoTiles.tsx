/**
 * JunkServicePhotoTiles — photo-tile service grid for junk-removal verticals.
 *
 * Source pattern: patterns/vertical/JunkServicePhotoTiles.tsx
 *   (originally extracted from junk-bros.com).
 *
 * Each tile = a full-bleed photograph + uppercase title + short body, with
 * a 5px-radius (chunky, NOT pill) treatment. Grid is 6-9 tiles total — the
 * sweet spot for junk-removal where buyers self-select by scenario, not
 * service name. The "PICK UP TODAY" lime badge marks same-day-available
 * tiles to dial up the go-energy.
 *
 * Replace the placeholder gradient + emoji with real job-site photography
 * before ship. Aspect ratio: 4:3 (matches the reference).
 */

type PhotoTile = {
  title: string;
  body: string;
  emoji: string;        // placeholder hero glyph in lieu of a real photo
  tone: "navy" | "red" | "yellow" | "lime" | "blue";
  badge?: string;       // "PICK UP TODAY", "SAME-DAY", "FLAT RATE"
};

const TILES: PhotoTile[] = [
  {
    title: "Household Junk",
    body: "Couches, mattresses, treadmills, that thing in the spare bedroom — gone in one trip.",
    emoji: "🛋️",
    tone: "navy",
    badge: "PICK UP TODAY",
  },
  {
    title: "Garage & Attic Cleanouts",
    body: "Decades of \"I'll deal with it later.\" We deal with it now — sorted, hauled, swept.",
    emoji: "📦",
    tone: "yellow",
  },
  {
    title: "Construction Debris",
    body: "Drywall, lumber, tile, concrete chunks. Driveway-friendly — your contractor stays clean.",
    emoji: "🪵",
    tone: "red",
    badge: "FLAT RATE",
  },
  {
    title: "Estate & Hoarder Cleanouts",
    body: "Discreet, respectful, complete. Same-week slots when timing matters.",
    emoji: "🏠",
    tone: "blue",
  },
  {
    title: "Yard Waste & Branches",
    body: "Tree limbs, brush, sheds, playsets. We come ready with chainsaws and gloves.",
    emoji: "🌿",
    tone: "lime",
    badge: "SAME-DAY",
  },
  {
    title: "Hot Tubs & Spas",
    body: "Heavy. Awkward. Wedged. We've moved hundreds — yours is just the next one.",
    emoji: "🛁",
    tone: "navy",
  },
  {
    title: "Appliances & E-Waste",
    body: "Fridges, washers, TVs, treadmills. Recycled where we can, hauled where we can't.",
    emoji: "🧊",
    tone: "yellow",
  },
  {
    title: "Office & Commercial Cleanouts",
    body: "Cubicles, server rooms, store resets, property turnovers. Off-hours scheduling welcome.",
    emoji: "🏢",
    tone: "red",
    badge: "SCHEDULED",
  },
  {
    title: "Labor-Only Service",
    body: "Need hands? We'll send a uniformed crew for the heavy lift — you direct, we lift.",
    emoji: "💪",
    tone: "blue",
  },
];

const toneSurface: Record<PhotoTile["tone"], string> = {
  navy:   "from-brand-dark via-brand-darker to-black",
  red:    "from-brand-accent via-[#9c1620] to-brand-darker",
  yellow: "from-brand-primary via-[#E5BB00] to-[#7a6300]",
  lime:   "from-brand-go via-[#6f9d09] to-brand-darker",
  blue:   "from-brand-sky via-brand-dark to-brand-darker",
};

const toneEmojiInk: Record<PhotoTile["tone"], string> = {
  navy:   "text-brand-primary/80",
  red:    "text-brand-primary/90",
  yellow: "text-brand-primaryInk/70",
  lime:   "text-brand-darker/70",
  blue:   "text-brand-primary/90",
};

export default function JunkServicePhotoTiles() {
  return (
    <section id="services" className="section-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="kicker text-brand-accent">What's On Your Property?</div>
            <h2 className="display-h1 text-brand-dark mt-3">
              {/* {{TILES-H2}} */}
              Pick Your Pile. We'll Do the Heavy Lifting.
            </h2>
            <p className="mt-5 text-brand-inkMuted text-[17px] leading-relaxed">
              Residential, construction, estate, yard — one crew, one truck, one call.
            </p>
          </div>
          <a href="#quote" className="btn-primary btn-xl">Get My Fast Quote</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TILES.map((t) => (
            <a
              key={t.title}
              href="#quote"
              className="group relative block rounded-card overflow-hidden aspect-[4/3] border-2 border-brand-dark/10 hover:border-brand-primary/60 transition-colors shadow-card"
            >
              {/* Placeholder photo bed — swap with a real <img> before ship */}
              <div
                className={
                  "absolute inset-0 bg-gradient-to-br " + toneSurface[t.tone]
                }
              />
              <div
                aria-hidden
                className={
                  "absolute inset-0 flex items-center justify-center text-[160px] leading-none select-none " +
                  toneEmojiInk[t.tone]
                }
              >
                {t.emoji}
              </div>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.78) 100%)",
                }}
              />
              {t.badge && (
                <span className="pill-go absolute top-4 left-4">{t.badge}</span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="card-title text-white">{t.title}</h3>
                <p className="mt-2 text-white/85 text-[14px] leading-relaxed">
                  {t.body}
                </p>
                <span className="kicker mt-3 inline-flex items-center gap-2 text-brand-primary">
                  Get a quote →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
