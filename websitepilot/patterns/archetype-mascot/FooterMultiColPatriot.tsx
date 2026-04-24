import { BrandTokens, defaultBrand } from "./types";

/**
 * FooterMultiColPatriot
 * ---------------------
 * 4-column dark footer with brand column + services + service area + contact,
 * plus a utility strip at the bottom. "Patriot" because it's the local-hero
 * closing note: phone, hours, "licensed & insured" reminder.
 *
 * WHEN TO USE
 *   - Local home-service brands with multiple service-area cities + 5+ services.
 *
 * WHEN NOT TO USE
 *   - SaaS / B2B / national brand — use a condensed 3-col footer with
 *     product/company/resources columns instead.
 */
export type FooterColumn = {
  heading: string;
  items: string[];
};

export type FooterMultiColPatriotProps = {
  brand?: Partial<BrandTokens>;
  columns?: FooterColumn[];
  copyrightName?: string;
  utilityLinks?: { label: string; href: string }[];
};

const defaultColumns: FooterColumn[] = [
  {
    heading: "Volt Vikings",
    items: [
      "Empowering homeowners with legendary electrical service.",
      "1234 Main Street",
      "Tucson, AZ 85701",
    ],
  },
  { heading: "Services",     items: ["Electrical Panels","Remodeling","Repairs","Lighting","EV Chargers"] },
  { heading: "Service Area", items: ["Tucson","Phoenix","Mesa","Chandler","And Surrounding Areas"] },
  { heading: "Contact",      items: ["520-464-9730","hello@example.com","Mon–Fri: 7a–7p","Sat: 8a–4p"] },
];

const defaultUtilityLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Accessibility", href: "#" },
];

export default function FooterMultiColPatriot({
  brand,
  columns = defaultColumns,
  copyrightName,
  utilityLinks = defaultUtilityLinks,
}: FooterMultiColPatriotProps) {
  const b = { ...defaultBrand, ...brand };
  const name = copyrightName ?? b.name;

  return (
    <footer
      style={{
        background: b.darker,
        color: b.onDark,
        fontFamily: b.fontFamily,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {columns.map((c, i) => (
            <div key={i}>
              <h4
                className="font-black uppercase tracking-wider mb-4"
                style={{ color: b.primary }}
              >
                {c.heading}
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{ color: b.onDarkMuted ?? "#d0b8ee" }}
              >
                {c.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div
          className="mx-auto w-full max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: b.onDarkMuted ?? "#d0b8ee" }}
        >
          <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          <div className="flex gap-6">
            {utilityLinks.map((l, i) => (
              <a key={i} href={l.href} className="hover:opacity-100" style={{ opacity: 0.7 }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
