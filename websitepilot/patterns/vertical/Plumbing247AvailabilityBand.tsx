/**
 * Plumbing247AvailabilityBand — "available 24/7/365" oversized emergency band.
 *
 * Source: https://smithservicesaz.com (Smith Plumbing AZ, 50+ years)
 * Signature move: a single full-width band that hammers the 24/7 availability
 * message at oversized scale — big numeric "24/7/365" kicker, single sentence
 * promise, and tap-to-call phone row. Sits between hero and services so the
 * emergency visitor immediately knows this is the team that picks up at 2am.
 * Includes the "typically respond within an hour" promise as subtext.
 *
 * WHEN TO USE:
 *  - Plumbing / HVAC / electrical brands with genuine 24/7 operations
 *  - Emergency-heavy service categories (burst pipes, no-heat, panel trips)
 *  - Pages where the primary audience is "it's broken right now"
 *
 * WHEN NOT TO USE:
 *  - Brands without a real 24/7 dispatch (don't fake it)
 *  - Premium / consultative sales categories (design-build, turf, wraps)
 *  - Brands where response-time is already hero-headline content
 */
type Props = {
  kicker?: string;           // "24/7/365"
  headline?: string;         // "We pick up the phone at 2am."
  subcopy?: string;
  phoneLabel?: string;
  phoneHref?: string;
  textLabel?: string;
  textHref?: string;
  responsePromise?: string;  // "Typical response: under 60 minutes."
  brand?: { ink?: string; primary?: string; primaryInk?: string; dark?: string; onDark?: string };
};

export default function Plumbing247AvailabilityBand({
  kicker = "24/7/365",
  headline = "Emergencies don't wait for business hours — and neither do we.",
  subcopy = "When a pipe bursts at 2am, a flooded basement at 11pm, or a no-heat call on a holiday — we answer.",
  phoneLabel = "Call (480) 827-9111",
  phoneHref = "tel:+14808279111",
  textLabel = "Text Now",
  textHref = "sms:+14808279111",
  responsePromise = "Typical response: under 60 minutes.",
  brand = { ink: "#0D1B2A", primary: "#D62828", primaryInk: "#FFFFFF", dark: "#0D1B2A", onDark: "#FFFFFF" },
}: Props) {
  const dark = brand.dark ?? "#0D1B2A";
  const onDark = brand.onDark ?? "#FFFFFF";
  const primary = brand.primary ?? "#D62828";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";

  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: dark, color: onDark }}>
      {/* diagonal accent stripe */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-30deg, transparent 0 18px, currentColor 18px 19px)",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <p
            className="font-display font-black leading-none"
            style={{
              fontSize: "clamp(88px, 14vw, 196px)",
              letterSpacing: "-0.05em",
              color: primary,
              textShadow: "4px 4px 0 rgba(0,0,0,0.3)",
            }}
          >
            {kicker}
          </p>
        </div>
        <div className="lg:col-span-7">
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
          >
            {headline}
          </h2>
          <p className="text-lg opacity-85 mb-8 max-w-xl">{subcopy}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-3 px-7 py-4 font-bold rounded-[4px]"
              style={{ background: primary, color: primaryInk, fontSize: 18 }}
            >
              <span aria-hidden>📞</span>
              {phoneLabel}
            </a>
            <a
              href={textHref}
              className="inline-flex items-center gap-3 px-7 py-4 font-semibold rounded-[4px] border"
              style={{ borderColor: onDark, color: onDark, fontSize: 16 }}
            >
              <span aria-hidden>💬</span>
              {textLabel}
            </a>
          </div>

          <p className="text-[14px] tracking-[0.14em] uppercase font-semibold opacity-85" style={{ color: primary }}>
            {responsePromise}
          </p>
        </div>
      </div>
    </section>
  );
}
