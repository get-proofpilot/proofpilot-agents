/**
 * Project Case Study Grid — the portfolio-first rhythm that defines the
 * premium-design-build preset. Each tile: commissioned photo placeholder,
 * italic-accent project name, location + year meta, short "what we built"
 * summary. No "book a service" button inside the card — case studies link
 * to detail pages.
 *
 * Replaces Cinco's 6-service icon grid entirely. In this preset, services
 * live inside case studies, not in a top-level grid.
 */
type Project = {
  name: string;
  location: string;
  year: string;
  summary: string;
  variant: "architectural" | "aerial" | "twilight";
};

const projects: Project[] = [
  {
    name: "Canyon Terrace Residence",
    location: "{{CITY}}, {{STATE}}",
    year: "2024",
    summary: "Three-level cut-limestone terrace with integrated fire seating and infinity spa.",
    variant: "architectural",
  },
  {
    name: "Cedar Ridge Estate",
    location: "{{CITY}}, {{STATE}}",
    year: "2024",
    summary: "Aerial survey, 1.2-acre regrade, cantilevered steel pergola, and pool surround.",
    variant: "aerial",
  },
  {
    name: "Oak Knoll Courtyard",
    location: "{{CITY}}, {{STATE}}",
    year: "2023",
    summary: "Courtyard remodel with hand-laid ipe decking, outdoor kitchen, and shade sail.",
    variant: "twilight",
  },
  {
    name: "The Mesa House",
    location: "{{CITY}}, {{STATE}}",
    year: "2023",
    summary: "Full landscape architecture rebuild for a 6,200 sq ft modern home.",
    variant: "architectural",
  },
  {
    name: "Heritage Vineyard",
    location: "{{CITY}}, {{STATE}}",
    year: "2023",
    summary: "Tasting-room entry garden with custom corten gates and low-voltage lighting design.",
    variant: "twilight",
  },
  {
    name: "Tower Plaza Campus",
    location: "{{CITY}}, {{STATE}}",
    year: "2022",
    summary: "Corporate campus hardscape and stormwater-capture landscape.",
    variant: "aerial",
  },
];

export default function ProjectCaseStudyGrid() {
  return (
    <section id="portfolio" className="section bg-brand-cream">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="text-h4-label text-brand-gold mb-4">Selected Work</p>
            <h2 className="text-h2-mobile md:text-h2-display text-brand-ink">
              Case studies from the last <span className="italic-accent">five seasons</span>.
            </h2>
          </div>
          <a href="#journal" className="btn-text self-start md:self-auto">
            View the full portfolio &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <article key={p.name} className="group cursor-pointer">
              <div className={`relative aspect-[4/5] rounded-card overflow-hidden placeholder-${p.variant} mb-6 shadow-card-lift`}>
                <div className="photo-overlay opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-5 left-5 right-5 text-brand-cream">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-brand-gold-soft mb-2">
                    {p.location} &middot; {p.year}
                  </p>
                  <p className="italic-accent text-[28px] leading-[30px] text-brand-cream">
                    {p.name}
                  </p>
                </div>
              </div>
              <p className="text-body-base text-brand-ink-soft">{p.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
