/**
 * PromoBarTop — dark strip above the main header (HVAC variant).
 * Highlights seasonal financing offer + 24/7 emergency line — the two
 * top motives that drive HVAC traffic to phone instead of a slow form.
 * Pink link color (#CC3366) carries through from the contractor-heritage DNA.
 */
export default function PromoBarTop() {
  const items = [
    { label: "0% APR Financing on New Systems", href: "#financing" },
    { label: "24/7 Emergency HVAC Service", href: "tel:5555555555" },
    { label: "Seasonal Tune-Up Specials", href: "#coupons" },
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
          {"{{PROMO_BANNER — e.g. Heating tune-up $89 thru March}}"}
        </div>
      </div>
    </div>
  );
}
