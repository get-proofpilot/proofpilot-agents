/**
 * ProjectCaseStudyGrid — portfolio-first grid for the premium-design-build
 * preset. 6 case-study tiles, italic-accent names, location/year meta,
 * overlay summaries. Replaces service-first grids entirely.
 */
export type CaseStudy = {
  name: string;
  location: string;
  year: string;
  summary: string;
  variant?: "architectural" | "aerial" | "twilight";
  imageUrl?: string; // optional — falls back to placeholder gradient
  href?: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  italicAccent?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  projects?: CaseStudy[];
  brand?: { goldHex?: string };
};

const defaultProjects: CaseStudy[] = [
  { name: "Canyon Terrace Residence", location: "{{CITY}}", year: "2024", summary: "Three-level cut-limestone terrace with integrated fire seating and infinity spa.", variant: "architectural" },
  { name: "Cedar Ridge Estate", location: "{{CITY}}", year: "2024", summary: "Aerial survey, 1.2-acre regrade, cantilevered steel pergola, pool surround.", variant: "aerial" },
  { name: "Oak Knoll Courtyard", location: "{{CITY}}", year: "2023", summary: "Courtyard remodel with hand-laid ipe decking and outdoor kitchen.", variant: "twilight" },
  { name: "The Mesa House", location: "{{CITY}}", year: "2023", summary: "Full landscape architecture rebuild for a 6,200 sq ft modern home.", variant: "architectural" },
  { name: "Heritage Vineyard", location: "{{CITY}}", year: "2023", summary: "Tasting-room entry garden with corten gates and low-voltage lighting.", variant: "twilight" },
  { name: "Tower Plaza Campus", location: "{{CITY}}", year: "2022", summary: "Corporate campus hardscape and stormwater-capture landscape.", variant: "aerial" },
];

export default function ProjectCaseStudyGrid({
  eyebrow = "Selected Work",
  heading = "Case studies",
  italicAccent = "from the last five seasons.",
  viewAllHref = "#portfolio",
  viewAllLabel = "View the full portfolio →",
  projects = defaultProjects,
  brand = { goldHex: "#B08A3E" },
}: Props) {
  const gold = brand.goldHex ?? "#B08A3E";

  return (
    <section id="portfolio" className="py-28 bg-[var(--brand-cream,#F7F2E8)]">
      <div className="max-w-[1240px] mx-auto px-7">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="text-[14px] font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: gold }}>
              {eyebrow}
            </p>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, color: "#111" }}>
              {heading}{" "}
              <span className="italic-accent" style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: gold, fontWeight: 400 }}>
                {italicAccent}
              </span>
            </h2>
          </div>
          <a href={viewAllHref} className="btn-text self-start md:self-auto" style={{ color: gold }}>
            {viewAllLabel}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <a href={p.href ?? "#"} key={p.name} className="group block cursor-pointer">
              <div
                className={`relative aspect-[4/5] rounded-[6px] overflow-hidden mb-6 shadow-card-lift ${p.imageUrl ? "" : `placeholder-${p.variant ?? "architectural"}`}`}
                style={p.imageUrl ? { backgroundImage: `url(${p.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                <div className="photo-overlay opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "#D4B26B" }}>
                    {p.location} · {p.year}
                  </p>
                  <p className="italic-accent text-[28px] leading-[30px]" style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: "#F7F2E8", fontWeight: 400 }}>
                    {p.name}
                  </p>
                </div>
              </div>
              <p className="text-[16px]" style={{ color: "#2A2A28", lineHeight: 1.6 }}>
                {p.summary}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
