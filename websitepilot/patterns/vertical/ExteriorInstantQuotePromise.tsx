/**
 * ExteriorInstantQuotePromise — "instant quote in 60 seconds" conversion band.
 *
 * Source: https://jefflikescleanwindows.com (Davis, CA)
 * Signature move: a full-width band promising an ONLINE instant quote —
 * no sales call, no email-waiting. The claim is unambiguous: "Get an instant
 * quote right here in as little as 60 seconds." Paired with a quick 1-2-3
 * process ("Get Instant Quote / Pick Service Packages / Enjoy Your Clean
 * Home"). It is the anti-pattern to every "fill out a form and we'll call
 * you" service page. Pressure washing, window cleaning, lawn care, and
 * Christmas lighting companies convert exceptionally well with this.
 *
 * WHEN TO USE:
 *  - Exterior cleaning / window / gutter / lawn / holiday lighting / pool
 *    maintenance — any category where sqft-based instant pricing is possible
 *  - Brands that actually HAVE an instant-quote tool (ServiceMonster,
 *    Markate, Housecall Pro, custom)
 *  - Conversion-focused pages where the differentiator is speed to number
 *
 * WHEN NOT TO USE:
 *  - Categories where every job is genuinely custom (roofing, HVAC install)
 *  - Brands without a working instant-quote integration (don't fake it)
 *  - Premium / consultative brands where instant pricing cheapens the pitch
 */
type Step = {
  n: string;
  title: string;
  body: string;
};

type Props = {
  eyebrow?: string;
  heading?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondsPromise?: string;
  steps?: Step[];
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; accent?: string };
};

export default function ExteriorInstantQuotePromise({
  eyebrow = "No calls. No waiting.",
  heading = "Get an instant quote in 60 seconds.",
  subhead = "Unlike other service providers who make you sit through a sales call, you can get your full quote right here on our site — in as little as 60 seconds.",
  ctaLabel = "Get an Instant Quote",
  ctaHref = "/instant-quote",
  secondsPromise = "Average time to quote: 47 seconds.",
  steps = [
    { n: "1", title: "Get an Instant Quote", body: "Answer a few property questions. Your number is on-screen before you can grab coffee." },
    { n: "2", title: "Fast & Easy Scheduling", body: "Pick the service packages you want. Book a time that works for you." },
    { n: "3", title: "Enjoy Your Clean Home", body: "Sit back. A local crew handles the rest — you just come home to sparkle." },
  ],
  brand = { ink: "#0F2C4A", primary: "#36B3E6", primaryInk: "#FFFFFF", surface: "#F5FAFF", accent: "#FFB703" },
}: Props) {
  const ink = brand.ink ?? "#0F2C4A";
  const primary = brand.primary ?? "#36B3E6";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F5FAFF";
  const accent = brand.accent ?? "#FFB703";

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: surface, color: ink }}>
      {/* Big "60s" decorative mark */}
      <div
        aria-hidden
        className="absolute -right-10 -top-10 font-black leading-none pointer-events-none select-none hidden md:block"
        style={{ fontSize: 380, color: primary, opacity: 0.06, letterSpacing: "-0.05em" }}
      >
        60s
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-[12px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: primary }}>
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1.02, letterSpacing: "-0.025em" }}
          >
            {heading}
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-xl">{subhead}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-3 px-8 py-4 text-[15px] font-bold tracking-[0.1em] uppercase rounded-[4px]"
              style={{ background: primary, color: primaryInk, boxShadow: "0 14px 30px rgba(54,179,230,0.35)" }}
            >
              <span aria-hidden>⏱</span>
              {ctaLabel}
            </a>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.14em] uppercase"
              style={{ background: accent, color: ink }}
            >
              {secondsPromise}
            </span>
          </div>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative p-6 rounded-[6px] border"
              style={{
                background: "#FFFFFF",
                borderColor: "rgba(0,0,0,0.06)",
                boxShadow: "0 10px 26px rgba(0,0,0,0.05)",
              }}
            >
              <span
                className="absolute -top-5 left-6 flex items-center justify-center w-10 h-10 rounded-full font-black text-[18px]"
                style={{ background: primary, color: primaryInk }}
                aria-hidden
              >
                {s.n}
              </span>
              <h3 className="text-[19px] font-bold mt-3 mb-2">{s.title}</h3>
              <p className="text-[14px] opacity-80 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
