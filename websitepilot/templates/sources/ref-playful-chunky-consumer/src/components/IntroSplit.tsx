export default function IntroSplit() {
  return (
    <section id="about" className="section-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="kicker text-brand-accent">{/* {{KICKER}} */}Queen Creek, AZ</div>
            <h2 className="display-h1 text-brand-dark mt-3">
              {/* {{INTRO-H2}} */}
              Make Your Home Glow With the Magic of the Holidays
            </h2>
            <p className="mt-6 text-brand-inkMuted text-[17px] leading-relaxed">
              {/* {{INTRO-P}} */}
              Give your home a festive makeover with stunning lighting that is designed, installed, maintained, and removed for you. No ladders. No tangles. No hassle. Just a beautifully lit home from Thanksgiving through the New Year.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-brand-ink font-semibold text-[15px]">
              <li className="flex items-center gap-2"><Dot /> Fast quotes</li>
              <li className="flex items-center gap-2"><Dot /> Flexible scheduling</li>
              <li className="flex items-center gap-2"><Dot /> Premium quality lights</li>
              <li className="flex items-center gap-2"><Dot /> Maintenance included</li>
            </ul>
            <a href="#quote" className="btn-primary btn-xl mt-8">Get a Fast Quote</a>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-card overflow-hidden bg-brand-darker ring-2 ring-brand-primary/40 shadow-card flex items-center justify-center">
              {/* {{INTRO-IMG}} — holiday-lit home photography 4:3 */}
              <div className="text-brand-onDarkMuted font-sans font-semibold uppercase tracking-widest text-sm">
                Photo of lit-up home
              </div>
            </div>
            {/* Character peek — overlapping the photo */}
            <div className="absolute -bottom-6 -right-4 h-28 w-28 rounded-full bg-brand-primary ring-4 ring-white flex items-center justify-center animate-bob">
              <span className="font-sans font-black uppercase text-brand-primaryInk text-xs text-center leading-tight px-2">
                {/* {{MASCOT}} */}Mascot
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-brand-accent" />
  );
}
