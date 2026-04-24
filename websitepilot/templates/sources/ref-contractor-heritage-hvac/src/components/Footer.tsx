/**
 * Footer — dark band, 5-column: brand, HVAC services, areas, about, contact.
 * Roboto Condensed 700 uppercase column headings (HVAC variant).
 */
const COLS: Array<{ heading: string; links: string[] }> = [
  {
    heading: "HVAC Services",
    links: [
      "Furnace Repair",
      "Furnace Installation",
      "AC Repair",
      "AC Installation",
      "Heat Pumps",
      "Indoor Air Quality",
      "Maintenance Plans",
    ],
  },
  {
    heading: "Areas We Serve",
    links: [
      "{{CITY_1}}",
      "{{CITY_2}}",
      "{{CITY_3}}",
      "{{CITY_4}}",
      "{{CITY_5}}",
      "{{CITY_6}}",
    ],
  },
  {
    heading: "About",
    links: ["About Us", "Blog", "Careers", "Contact Us", "Financing", "Specials"],
  },
  {
    heading: "Get In Touch",
    links: [
      "{{PHONE_NUMBER}}",
      "Mon-Fri 8am-7pm · 24/7 Emergency",
      "contact@{{BRAND_DOMAIN}}",
      "{{ADDRESS_LINE_1}}",
      "{{ADDRESS_LINE_2}}",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="section-dark pt-16 pb-8">
      <div className="container-1200">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand mascot column */}
          <div className="col-span-2 md:col-span-1">
            <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center text-brand-white font-display font-extrabold text-2xl mb-3">
              HC
            </div>
            <p className="text-brand-white/80 text-sm">{"{{FOOTER_TAGLINE}}"}</p>
            <div className="flex gap-3 mt-4">
              {["f", "in", "ig", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full bg-brand-white/10 flex items-center justify-center text-brand-white text-xs uppercase hover:bg-brand-red transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.heading}>
              <h4 className="font-display font-bold uppercase text-brand-white text-base mb-3">
                {c.heading}
              </h4>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-brand-white/75 text-sm hover:text-brand-red transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-white/15 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-brand-white/60 text-xs">
          <div>&copy; {new Date().getFullYear()} {"{{BRAND_NAME}}"}. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-white">Privacy Policy</a>
            <a href="#" className="hover:text-brand-white">Terms of Service</a>
            <a href="#" className="hover:text-brand-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
