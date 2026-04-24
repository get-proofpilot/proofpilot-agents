/**
 * Project Case Study Grid — kitchen/bath portfolio. 6 commissioned case
 * studies: kitchen, primary bath, butler's pantry, powder room, secondary
 * bath, full second-floor remodel. Each tile uses an architectural / aerial /
 * twilight gradient placeholder until photography arrives.
 *
 * In this preset, services live INSIDE the case studies, not in a separate
 * services grid — buyers pick the studio by the work, not the menu.
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
    name: "Hillcrest Kitchen",
    location: "{{CITY}}, {{STATE}}",
    year: "2024",
    summary: "Walls opened, beam moved, hand-laid quartzite island and rift-cut white-oak cabinetry.",
    variant: "architectural",
  },
  {
    name: "Park Avenue Primary Bath",
    location: "{{CITY}}, {{STATE}}",
    year: "2024",
    summary: "Wet room, double vanity in book-matched marble, radiant floor and a cast-iron soaker.",
    variant: "twilight",
  },
  {
    name: "Cedar Hollow Butler's Pantry",
    location: "{{CITY}}, {{STATE}}",
    year: "2024",
    summary: "Adjoining pantry with custom shaker millwork, integrated wine column, and stone backsplash.",
    variant: "architectural",
  },
  {
    name: "The Mesa Kitchen + Hearth",
    location: "{{CITY}}, {{STATE}}",
    year: "2023",
    summary: "Full kitchen rebuild plus a flush-set hearth wall, paneled appliances, and limewash plaster.",
    variant: "aerial",
  },
  {
    name: "Heritage Powder Room",
    location: "{{CITY}}, {{STATE}}",
    year: "2023",
    summary: "Jewel-box powder with hand-painted wallcovering, brass plumbing, and a stone trough sink.",
    variant: "twilight",
  },
  {
    name: "Tower Place Second Floor",
    location: "{{CITY}}, {{STATE}}",
    year: "2023",
    summary: "Three-bath second-story remodel. Layouts redrawn, new mechanicals, family-of-four palette.",
    variant: "architectural",
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
              Kitchens &amp; baths from the last <span className="italic-accent">five years</span>.
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
