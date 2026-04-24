/**
 * PestEmergencyBand — Pest-control variant of the Plumbing247AvailabilityBand pattern.
 *
 * Original source: https://smithservicesaz.com (24/7 plumbing emergency band).
 * Adapted for pest: oversized "SAME-DAY" kicker, "we pick up the phone for the
 * scorpion at 2am" tone, tap-to-call + tap-to-text. Sits between hero and
 * services so the emergency caller (scorpion sighting, wasp nest) sees
 * availability immediately.
 *
 * WHEN TO USE:
 *  - Pest brands offering same-day or 7-day-a-week dispatch (Phoenix, Vegas,
 *    Tucson, Tampa belt where scorpion/wasp/spider emergencies are common).
 *  - Brands willing to commit to a response-time promise in writing.
 *
 * WHEN NOT TO USE:
 *  - Pest brands that route everything through a 48-hour scheduler.
 *  - Markets where pests are mostly seasonal nuisance (no urgency angle).
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

export default function PestEmergencyBand({
  kicker = "SAME-DAY",
  headline = "Scorpions, wasps, and rodents don't wait. Neither do we.",
  subcopy = "Spotted a scorpion at 11pm? A wasp nest by the back door? A roach in the kitchen? Call before 11am and a tech is on the way today.",
  phoneLabel = "Call Now",
  phoneHref = "tel:+15555555555",
  textLabel = "Text Us",
  textHref = "sms:+15555555555",
  responsePromise = "Typical same-day response: under 4 hours.",
  brand = { ink: "#151C24", primary: "#0071BA", primaryInk: "#FFFFFF", dark: "#151C24", onDark: "#FFFFFF" },
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
