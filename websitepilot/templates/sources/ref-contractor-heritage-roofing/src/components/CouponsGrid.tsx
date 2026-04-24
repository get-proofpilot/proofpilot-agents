/**
 * CouponsGrid — "Our Special Offers" on dark band.
 * 3 coupon cards, image-based, entire card is tel: link.
 */
const COUPONS = [
  { title: "$25 Off", sub: "Any Service Over $200", code: "BEAR25" },
  { title: "Free Estimate", sub: "On Water Heater Install", code: "FREEWH" },
  { title: "10% Off", sub: "For First Responders & Military", code: "HERO10" },
];

export default function CouponsGrid() {
  return (
    <section id="specials" className="section section-dark">
      <div className="container-1200">
        <h2 className="text-h2-desktop uppercase text-center mb-10">Our Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COUPONS.map((c) => (
            <a
              key={c.title}
              href="tel:2813502327"
              className="group relative bg-brand-red rounded-card p-6 text-brand-white aspect-[4/3] flex flex-col justify-between border-2 border-dashed border-white/40 hover:scale-[1.02] transition-transform"
            >
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80">Special Offer</div>
                <div className="text-4xl font-display font-extrabold uppercase mt-2">{c.title}</div>
                <div className="text-base mt-1 opacity-90">{c.sub}</div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-sm uppercase tracking-wider opacity-90">Tap to call</span>
                <div className="font-display font-extrabold uppercase bg-brand-white text-brand-red px-3 py-1 rounded-btn text-xs">
                  {c.code}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a href="#" className="btn btn-primary">More Specials</a>
          <a href="tel:2813502327" className="btn btn-white">Call 281-350-2327</a>
        </div>
      </div>
    </section>
  );
}
