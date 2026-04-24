/**
 * TrustBarIcons — 4-up band immediately below the hero.
 * Mandatory Hook contractor move. Three-word max per label.
 * Each tile: square red icon + H3 25/800 uppercase + one-liner.
 */
const ITEMS = [
  { icon: "🏠", title: "Local", body: "Family Owned" },
  { icon: "🔧", title: "Workmanship", body: "Guaranteed" },
  { icon: "💲", title: "Upfront", body: "Pricing" },
  { icon: "⏱️", title: "On-Time", body: "Service" },
];

export default function TrustBarIcons() {
  return (
    <section className="bg-brand-gray-tint border-y border-brand-gray-soft/60">
      <div className="container-1200 grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-gray-soft/60">
        {ITEMS.map((it) => (
          <div key={it.title} className="flex items-center gap-4 px-6 py-6">
            <div className="w-14 h-14 rounded-btn bg-brand-red flex items-center justify-center text-2xl">
              <span role="img" aria-label={it.title}>{it.icon}</span>
            </div>
            <div>
              <h3 className="text-h3-trust font-display font-extrabold uppercase text-brand-ink leading-tight">
                {it.title}
              </h3>
              <p className="text-sm text-brand-ink/80">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
