const FEATURES = [
  "Custom Fitted Lights",
  "Picture Perfect Installs",
  "48-Hour Maintenance",
  "Fast & Safe Removal",
  "Free Storage Included",
  "100% Satisfaction",
];

export default function MarqueeBar() {
  // duplicate for seamless loop
  const loop = [...FEATURES, ...FEATURES];
  return (
    <section className="section-primary overflow-hidden">
      <div className="py-4">
        <div className="marquee">
          {loop.map((f, i) => (
            <span
              key={i}
              className="kicker whitespace-nowrap text-brand-primaryInk flex items-center gap-3"
            >
              <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-brand-accent" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
