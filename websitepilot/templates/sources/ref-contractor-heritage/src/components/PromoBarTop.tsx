/**
 * PromoBarTop — dark strip above the main header.
 * Bears uses pink (#CC3366) link color on the dark band for a subtle seasonal-flag feel.
 * 3 left items, small Roboto 500 uppercase-optional labels.
 */
export default function PromoBarTop() {
  const items = [
    { label: "Monday - Friday: 8am-5pm", href: "tel:281-350-2327" },
    { label: "Same Day Response", href: "tel:281-350-2327" },
    { label: "Deals", href: "#specials" },
  ];

  return (
    <div className="bg-brand-ink text-brand-pink">
      <div className="container-1200 flex items-center justify-between py-2.5 text-promo-sm font-promo">
        <ul className="flex items-center gap-6">
          {items.map((it) => (
            <li key={it.label}>
              <a href={it.href} className="hover:text-brand-white transition-colors">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="text-brand-gray-soft text-xs tracking-wide">
          {/* placeholder for locale / language / toolbar widgets */}
          {"{{PROMO_BANNER}}"}
        </div>
      </div>
    </div>
  );
}
