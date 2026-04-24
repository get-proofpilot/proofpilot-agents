/**
 * JunkServicePhotoTiles — photo-first service card grid.
 *
 * Source: https://junk-bros.com (Boise, ID)
 * Signature move: instead of icon-tile services, each service is a full-bleed
 * photograph with a simple title overlaid (Residential / Commercial /
 * Concrete Removal / Demolition / Estate Cleanout / Labor Only). The
 * assumption is that the service is intuitive, so what the buyer really
 * needs is to SEE a truck/crew in action for each use case.
 *
 * WHEN TO USE:
 *  - Junk removal / hauling / demolition / moving / land clearing
 *  - Brands with strong job-site photography library
 *  - Verticals where a buyer self-selects by scenario, not by service name
 *
 * WHEN NOT TO USE:
 *  - Brands without professional / consistent photography
 *  - Services that look identical in photos (plumbing repairs, electrical)
 *  - Premium categories (use the editorial grid instead)
 */
type PhotoTile = {
  image: string;
  title: string;
  body?: string;
  href: string;
  badge?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  tiles?: PhotoTile[];
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string };
};

export default function JunkServicePhotoTiles({
  eyebrow = "Which Service Are You In Need Of?",
  heading = "Pick what's on your property. We'll take it from there.",
  subhead = "Residential, commercial, concrete, estate — one crew, one truck, one call.",
  tiles = [
    { image: "/tiles/residential.jpg", title: "Residential Junk Removal", body: "Garage cleanouts, furniture, yard debris, household purge.", href: "/residential" },
    { image: "/tiles/commercial.jpg", title: "Commercial Cleanouts", body: "Office cubicles, store resets, property turnover.", href: "/commercial", badge: "Scheduled" },
    { image: "/tiles/concrete.jpg", title: "Concrete Removal", body: "Walkways, driveways, patios, trip-hazard slabs.", href: "/concrete" },
    { image: "/tiles/demolition.jpg", title: "Demolition Services", body: "Interior, exterior, selective. Skid-steer-ready.", href: "/demolition" },
    { image: "/tiles/estate.jpg", title: "Estate & Hoarder Cleanouts", body: "Discreet, respectful, and complete. Same-week slots.", href: "/estate" },
    { image: "/tiles/labor.jpg", title: "Labor-Only Service", body: "Need hands? We'll send a uniformed crew for the heavy lift.", href: "/labor" },
  ],
  brand = { ink: "#111827", primary: "#EA580C", primaryInk: "#FFFFFF", surface: "#FFFFFF" },
}: Props) {
  const ink = brand.ink ?? "#111827";
  const primary = brand.primary ?? "#EA580C";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#FFFFFF";

  return (
    <section className="py-20 md:py-24" style={{ background: surface, color: ink }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <p
            className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(30px, 4.5vw, 50px)", lineHeight: 1.08, letterSpacing: "-0.018em" }}
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg opacity-80">{subhead}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiles.map((t) => (
            <a
              key={t.title}
              href={t.href}
              className="group relative block rounded-[6px] overflow-hidden aspect-[4/3]"
              style={{ background: "#000" }}
            >
              <img
                src={t.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%)",
                }}
              />
              {t.badge && (
                <span
                  className="absolute top-4 left-4 px-3 py-1 text-[11px] font-bold tracking-[0.14em] uppercase rounded-sm"
                  style={{ background: primary, color: primaryInk }}
                >
                  {t.badge}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-[22px] font-bold leading-tight mb-1">{t.title}</h3>
                {t.body && <p className="text-[14px] opacity-85 max-w-md">{t.body}</p>}
                <span
                  className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: primary }}
                >
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
