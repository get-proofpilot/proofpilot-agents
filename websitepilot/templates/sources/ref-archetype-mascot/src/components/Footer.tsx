/**
 * Footer — archetype-mascot.
 *
 * 4 columns (brand / services / service area / hours+tel),
 * dark purple field, wordmark at top, mascot-van illustration optional.
 * Utility bar at bottom with copyright + privacy.
 */
const cols = [
  {
    heading: "{{BRAND}}",
    items: [
      "{{Brand tagline — one short sentence.}}",
      "{{Street address}}",
      "{{City, State ZIP}}",
    ],
  },
  {
    heading: "Services",
    items: ["{{Service 1}}", "{{Service 2}}", "{{Service 3}}", "{{Service 4}}", "{{Service 5}}"],
  },
  {
    heading: "Service Area",
    items: ["{{City 1}}", "{{City 2}}", "{{City 3}}", "{{City 4}}", "And Surrounding Areas"],
  },
  {
    heading: "Contact",
    items: ["{{PHONE}}", "{{EMAIL}}", "Mon–Fri: 7a–7p", "Sat: 8a–4p"],
  },
];

export default function Footer() {
  return (
    <footer className="section-darker text-brand-onDark">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {cols.map((c, i) => (
            <div key={i}>
              <h4 className="font-black uppercase text-brand-primary tracking-wider mb-4">
                {c.heading}
              </h4>
              <ul className="space-y-2 text-sm text-brand-onDarkMuted">
                {c.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-onDarkMuted">
          <p>&copy; {new Date().getFullYear()} {"{{BRAND}}"}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-onDark">Privacy</a>
            <a href="#" className="hover:text-brand-onDark">Terms</a>
            <a href="#" className="hover:text-brand-onDark">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
