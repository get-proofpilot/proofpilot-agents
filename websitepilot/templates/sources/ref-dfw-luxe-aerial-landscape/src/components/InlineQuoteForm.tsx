export default function InlineQuoteForm() {
  return (
    <section id="quote" className="bg-twilight text-white section-pad">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-body uppercase tracking-[0.2em] text-accent text-[13px] font-bold mb-3">
              Book a consult
            </p>
            <h2 className="section-headline text-white">
              Tell us about the yard &mdash; we&rsquo;ll send a{' '}
              <span className="text-accent">real quote</span> back within 48 hours.
            </h2>
            <p className="font-body text-white/75 text-[16px] leading-relaxed mt-5 max-w-md">
              No pressure, no sales call bait-and-switch. Fill this out and a project manager takes
              it from here.
            </p>
          </div>

          <form className="bg-white rounded-xl p-6 md:p-8 border border-white/10 text-navy">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="px-4 py-3 rounded-lg border border-navy/15 font-body text-[15px] focus:outline-none focus:border-accent"
                placeholder="First name"
              />
              <input
                className="px-4 py-3 rounded-lg border border-navy/15 font-body text-[15px] focus:outline-none focus:border-accent"
                placeholder="Last name"
              />
              <input
                className="px-4 py-3 rounded-lg border border-navy/15 font-body text-[15px] focus:outline-none focus:border-accent md:col-span-2"
                placeholder="Email"
                type="email"
              />
              <input
                className="px-4 py-3 rounded-lg border border-navy/15 font-body text-[15px] focus:outline-none focus:border-accent md:col-span-2"
                placeholder="Phone"
                type="tel"
              />
              <select className="px-4 py-3 rounded-lg border border-navy/15 font-body text-[15px] focus:outline-none focus:border-accent md:col-span-2 bg-white">
                <option>What do you want built?</option>
                <option>New pool build</option>
                <option>Outdoor living / pavilion</option>
                <option>Renovation / resurface</option>
                <option>Not sure yet</option>
              </select>
              <textarea
                className="px-4 py-3 rounded-lg border border-navy/15 font-body text-[15px] focus:outline-none focus:border-accent md:col-span-2 min-h-[100px]"
                placeholder="Tell us about the project..."
              />
            </div>
            <button type="button" className="btn-chunk w-full mt-5">
              Send my project to the team
            </button>
            <p className="font-body text-navy/60 text-[12px] mt-3 text-center">
              We reply within one business day. Never share your info.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
