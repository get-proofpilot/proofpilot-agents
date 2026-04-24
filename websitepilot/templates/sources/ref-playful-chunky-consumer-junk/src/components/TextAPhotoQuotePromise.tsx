/**
 * TextAPhotoQuotePromise — "text a photo, get a quote in 10 min" band.
 *
 * Source pattern: patterns/vertical/ExteriorInstantQuotePromise.tsx
 *   (originally extracted from jefflikescleanwindows.com).
 *
 * Adapted for the JUNK-REMOVAL vertical:
 *   - The original "instant online quote" claim becomes "text a photo,
 *     quote back in 10 min" — junk's universal differentiator vs. national
 *     dispatch chains that make you sit through a sales call.
 *   - 5px chunky rectangles. Lime "go-energy" pill on the seconds-promise.
 *   - Massive decorative "10:00" mark behind the headline echoes the "60s"
 *     mark in the source pattern.
 */

type Step = {
  n: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    n: "1",
    title: "Text a Photo",
    body: "Snap the pile, the room, the truck-bed-full. Send it to the number — that's it.",
  },
  {
    n: "2",
    title: "Quote Back in 10 Min",
    body: "We size the load, factor labor + dump, and text you a flat number. No sales call, no waiting.",
  },
  {
    n: "3",
    title: "We Show. We Haul.",
    body: "Pick a slot. A two-person crew rolls up, loads it, sweeps after. You smile.",
  },
];

export default function TextAPhotoQuotePromise() {
  return (
    <section className="section-cream relative overflow-hidden py-20 md:py-28">
      {/* Big "10:00" decorative mark — echoes the "60s" mark in the source */}
      <div
        aria-hidden
        className="absolute -right-12 -top-12 font-sans font-black leading-none pointer-events-none select-none hidden md:block text-brand-primary/15"
        style={{ fontSize: 360, letterSpacing: "-0.05em" }}
      >
        10:00
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="max-w-2xl mb-14">
          <div className="kicker text-brand-accent mb-3">No Calls. No Waiting.</div>
          <h2 className="display-h1 text-brand-dark">
            {/* {{INSTANT-H2}} */}
            Text a Photo. Quote Back in 10 Minutes.
          </h2>
          <p className="mt-5 text-brand-inkMuted text-[17px] leading-relaxed max-w-xl">
            {/* {{INSTANT-P}} */}
            Other haulers make you sit through a sales call before they'll talk numbers. Send us a snap and we'll text the price right back — flat-rate, all-in, no surprises.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="sms:{{PHONE-RAW}}"
              className="btn-primary btn-xl"
            >
              📱 Text Us a Photo
            </a>
            <span className="pill-go">Avg reply: 6 minutes.</span>
          </div>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none p-0">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="relative rounded-card bg-white border-2 border-brand-dark/10 shadow-card p-6 pt-9"
            >
              <span
                aria-hidden
                className="absolute -top-5 left-6 flex items-center justify-center w-11 h-11 rounded-full bg-brand-primary text-brand-primaryInk font-sans font-black text-lg"
              >
                {s.n}
              </span>
              <h3 className="card-title text-brand-dark">{s.title}</h3>
              <p className="mt-3 text-brand-inkMuted text-[15px] leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
