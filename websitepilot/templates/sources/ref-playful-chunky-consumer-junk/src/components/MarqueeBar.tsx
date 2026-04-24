const FEATURES = [
  "Same-Day Pickups",
  "Flat-Rate Pricing",
  "Text-A-Photo Quotes",
  "We Sweep After",
  "Donation-First Hauling",
  "Uniformed Crews",
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
