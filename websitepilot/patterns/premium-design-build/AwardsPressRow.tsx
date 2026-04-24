/**
 * AwardsPressRow — thin cream-warm band, muted press/award logos. Used just
 * under the hero to set premium credibility before the portfolio loads.
 */
type Props = {
  label?: string;
  items?: string[];
  brand?: { inkHex?: string };
};

const defaultItems = ["NKBA Featured", "ASLA Award 2024", "Luxe Interiors", "Dwell Magazine", "Architectural Digest", "APLD Gold"];

export default function AwardsPressRow({
  label = "Featured &amp; recognized by",
  items = defaultItems,
  brand = { inkHex: "#111" },
}: Props) {
  const ink = brand.inkHex ?? "#111";
  return (
    <section className="py-16 bg-[var(--brand-cream-warm,#EFE7D4)] border-b border-[var(--brand-cream-line,#D8CFBB)]">
      <div className="max-w-[1240px] mx-auto px-7">
        <p
          className="text-center text-[14px] font-semibold tracking-[0.18em] uppercase mb-8"
          style={{ color: "#6F6E6A" }}
          dangerouslySetInnerHTML={{ __html: label }}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center">
          {items.map((name) => (
            <div key={name} className="opacity-60 hover:opacity-100 transition-opacity text-center" title={name}>
              <span className="italic-accent text-[18px]" style={{ fontFamily: '"Fraunces", Georgia, serif', fontStyle: "italic", color: ink, fontWeight: 400 }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
