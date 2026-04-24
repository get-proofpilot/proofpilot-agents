export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img src="/placeholder-garage.svg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 lg:px-14 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="font-display font-bold text-concrete text-sm uppercase tracking-[0.18em] mb-3">Book In Under 60 Seconds</div>
          <h2 className="section-headline section-headline--light">
            Ready To Transform Your Concrete Floors?
          </h2>
          <p className="font-body text-white/85 text-[15px] md:text-base mt-4 max-w-lg">
            Fill out the form and a rugged installer will call within one business hour with a firm quote range and the next two available install dates.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="tel:" className="btn-rugged btn-rugged--ghost">(000) 000-0000</a>
            <a href="#contact" className="btn-rugged">Get a Fast Quote</a>
          </div>
        </div>

        <form className="bg-white rounded-[4px] p-6 md:p-8 border-t-4 border-concrete">
          <h3 className="font-display font-black text-ink text-xl md:text-2xl uppercase tracking-tight leading-tight">
            Get a Fast Quote
          </h3>
          <p className="font-body text-text-body text-sm mt-1">No obligation. No pressure.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
            <input type="text" placeholder="First Name" className="bg-steel rounded-[4px] px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-concrete" />
            <input type="text" placeholder="Last Name" className="bg-steel rounded-[4px] px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-concrete" />
            <input type="tel" placeholder="Phone" className="bg-steel rounded-[4px] px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-concrete" />
            <input type="email" placeholder="Email" className="bg-steel rounded-[4px] px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-concrete" />
            <textarea placeholder="Tell us about your floor…" rows={3} className="bg-steel rounded-[4px] px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-concrete md:col-span-2" />
            <button type="submit" className="btn-rugged md:col-span-2">Request My Free Quote</button>
          </div>
        </form>
      </div>
    </section>
  );
}
