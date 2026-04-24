/**
 * CouponsGridContractor — 3-card coupon grid on a dark band.
 *
 * Per Bears: entire card is a tel: link (tap-to-call). Large amount/% in Roboto Condensed 800.
 *
 * WHEN TO USE
 *  - Plumbing, HVAC, drain, rooter, pest, septic — any service with seasonal or
 *    time-limited discount offers.
 *  - When the CTA intent is "call now to redeem" (tap-to-call is the conversion).
 *
 * WHEN NOT TO USE
 *  - Subscription or SaaS products.
 *  - Services whose margin won't absorb a flat $-off promo.
 *  - Luxury brands where coupons weaken perceived value.
 *
 * FITTING VERTICALS
 *  plumbing · HVAC · pest control · lawn care · garage door · electrical · drain cleaning.
 */
import React from "react";

export type Coupon = { title: string; sub: string; code?: string };

export interface CouponsGridContractorProps {
  red?: string;
  ink?: string;
  heading?: string;
  coupons?: Coupon[];
  callHref?: string;
  callLabel?: string;
  moreHref?: string;
}

const DEFAULTS: Required<Omit<CouponsGridContractorProps, "red" | "ink" | "heading">> & {
  red: string; ink: string; heading: string;
} = {
  red: "#EF3E33",
  ink: "#231F20",
  heading: "Our Special Offers",
  coupons: [
    { title: "$25 Off", sub: "Any Service Over $200", code: "BEAR25" },
    { title: "Free Estimate", sub: "On Water Heater Install", code: "FREEWH" },
    { title: "10% Off", sub: "For First Responders & Military", code: "HERO10" },
  ],
  callHref: "tel:+12813502327",
  callLabel: "Call 281-350-2327",
  moreHref: "/specials",
};

export default function CouponsGridContractor(props: CouponsGridContractorProps) {
  const {
    red = DEFAULTS.red,
    ink = DEFAULTS.ink,
    heading = DEFAULTS.heading,
    coupons = DEFAULTS.coupons,
    callHref = DEFAULTS.callHref,
    callLabel = DEFAULTS.callLabel,
    moreHref = DEFAULTS.moreHref,
  } = props;

  return (
    <section id="specials" style={{ background: ink, color: "#fff", padding: "72px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <h2
          className="text-center uppercase mb-10"
          style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: "48px" }}
        >
          {heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <a
              key={c.title}
              href={callHref}
              className="group relative flex flex-col justify-between transition-transform hover:scale-[1.02]"
              style={{
                background: red,
                color: "#fff",
                borderRadius: 12,
                padding: 24,
                aspectRatio: "4 / 3",
                border: "2px dashed rgba(255,255,255,0.4)",
              }}
            >
              <div>
                <div className="text-xs uppercase tracking-wider opacity-80">Special Offer</div>
                <div
                  className="uppercase mt-2"
                  style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: 1 }}
                >
                  {c.title}
                </div>
                <div className="text-base mt-1 opacity-90">{c.sub}</div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-sm uppercase tracking-wider opacity-90">Tap to call</span>
                {c.code ? (
                  <div
                    className="uppercase"
                    style={{ background: "#fff", color: red, padding: "6px 12px", borderRadius: 7, fontWeight: 800, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 12 }}
                  >
                    {c.code}
                  </div>
                ) : null}
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a
            href={moreHref}
            className="uppercase font-bold"
            style={{ background: red, color: "#fff", padding: "16px 32px", borderRadius: 7, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 16 }}
          >
            More Specials
          </a>
          <a
            href={callHref}
            className="uppercase font-bold"
            style={{ background: "#fff", color: ink, padding: "16px 32px", borderRadius: 7, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 16 }}
          >
            {callLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
