const PAIRS = new Array(6).fill(0).map((_, i) => ({ id: i }));

export default function BeforeAfterGallery() {
  return (
    <section id="gallery" className="section-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28 text-center">
        <div className="kicker text-brand-accent">Before &amp; After</div>
        <h2 className="display-h1 text-brand-dark mt-3 max-w-3xl mx-auto">
          {/* {{GALLERY-H2}} */}
          Come Home to a Beautifully Lit House
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {PAIRS.map((p) => (
            <div key={p.id} className="rounded-card overflow-hidden shadow-card border-2 border-brand-dark/10 bg-white">
              <div className="grid grid-cols-2">
                <Placeholder label="Before" tint="dark" />
                <Placeholder label="After" tint="bright" />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="kicker text-brand-dark">Before</span>
                <span className="kicker text-brand-accent">After</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Placeholder({ label, tint }: { label: string; tint: "dark" | "bright" }) {
  return (
    <div
      className={
        "aspect-[4/3] flex items-center justify-center font-sans font-black uppercase tracking-wider text-sm " +
        (tint === "dark" ? "bg-brand-darker text-white/60" : "bg-brand-primary text-brand-primaryInk")
      }
    >
      {label}
    </div>
  );
}
