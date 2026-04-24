/**
 * Footer — black ground, 4-column serif footer with crown-monogram brand block.
 *
 * No social icons in the footer body — those sit in a thin bottom strip as
 * wordmarks. Column headings are italic serif in accent green. Links are
 * serif regular, cream-soft, underline-on-hover.
 */
const COLS: Array<{ heading: string; links: string[] }> = [
  {
    heading: "Disciplines",
    links: [
      "Landscape & Outdoor Living Remodels",
      "New Home Construction Landscaping",
      "Landscape Design",
      "Artificial Turf Installation",
      "Hardscaping",
      "Custom Pools & Outdoor Structures",
    ],
  },
  {
    heading: "Firm",
    links: ["About", "Meet The Team", "In The Press", "Testimonials", "Careers"],
  },
  {
    heading: "Areas",
    links: ["Southlake", "Preston Hollow", "Frisco", "Park Cities", "Keller", "Highland Park"],
  },
  {
    heading: "Studio",
    links: [
      "{{ADDRESS_LINE_1}}",
      "{{ADDRESS_LINE_2}}",
      "{{PHONE_DISPLAY}}",
      "{{EMAIL}}",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black pt-20 pb-8 text-brand-cream">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <svg viewBox="0 0 64 42" className="w-16 h-10" aria-hidden="true">
              <path
                d="M4 24 L12 6 L20 22 L32 2 L44 22 L52 6 L60 24 L60 32 L4 32 Z"
                fill="#42AC54"
              />
            </svg>
            <div>
              <div className="font-display text-lg tracking-[0.18em] uppercase leading-tight">
                {"{{BRAND_NAME}}"}
              </div>
              <div className="font-display italic text-brand-cream/60 text-xs tracking-[0.22em] uppercase mt-1">
                {"{{BRAND_TAGLINE}}"}
              </div>
            </div>
            <p className="text-brand-cream/60 text-sm leading-relaxed">
              {"{{FOOTER_BLURB — Luxury landscape architecture and design-build across {{SERVICE_REGION}}.}}"}
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((c) => (
            <div key={c.heading}>
              <h4 className="font-display italic text-brand-accent text-xs tracking-[0.22em] uppercase mb-5">
                {c.heading}
              </h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-brand-cream/80 text-[15px] hover:text-brand-cream hover:underline underline-offset-4 transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-cream/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-brand-cream/50 text-xs font-display italic tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} {"{{BRAND_NAME}}"}. All rights reserved.
          </div>
          <div className="flex items-center gap-7 text-brand-cream/60 text-xs font-display italic tracking-[0.22em] uppercase">
            {["Instagram", "Houzz", "LinkedIn", "Pinterest"].map((s) => (
              <a key={s} href="#" className="hover:text-brand-cream transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
