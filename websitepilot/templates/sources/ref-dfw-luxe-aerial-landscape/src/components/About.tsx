export default function About() {
  return (
    <section id="about" className="bg-navy text-white section-pad">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-xl">
            {/* Placeholder founder portrait */}
            <div className="w-full h-full bg-gradient-to-br from-twilight via-navy to-accent-ink grid place-items-center">
              <span className="font-display text-white/40 text-4xl">[FOUNDER PORTRAIT]</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-accent text-white rounded-xl px-5 py-4 shadow-chunk border border-navy">
            <div className="font-display text-3xl leading-none">12+</div>
            <div className="font-body text-[12px] uppercase tracking-widest mt-1">Years in DFW</div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
            Meet the founder
          </p>
          <h2 className="section-headline text-white">
            Built by a <span className="text-accent">tradesman</span>, for people who&rsquo;d rather
            it be done right.
          </h2>
          <p className="font-body text-white/80 text-[17px] leading-relaxed mt-6 max-w-2xl">
            [Founder first name] started [Brand Name] after a decade running crews for the biggest
            pool builders in DFW. The promise is simple: honest timelines, crews that show up, and
            a backyard you&rsquo;d book a weekend for.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 max-w-xl">
            <div>
              <div className="font-display text-accent text-5xl leading-none">400+</div>
              <div className="font-body text-white/70 text-[13px] uppercase tracking-widest mt-2">
                Projects delivered
              </div>
            </div>
            <div>
              <div className="font-display text-accent text-5xl leading-none">4.9&#x2605;</div>
              <div className="font-body text-white/70 text-[13px] uppercase tracking-widest mt-2">
                Google reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
