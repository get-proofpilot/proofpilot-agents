/**
 * FinancingCallout — roofing/HVAC-specific financing band.
 *
 * Big ticket contractor services (roof replacement, HVAC install, solar install,
 * whole-home repipe) convert 30-40% better with financing callouts. Bears Plumbing
 * doesn't run one in its hero flow but Hook's roofing builds do.
 *
 * WHEN TO USE
 *  - Services with avg ticket > $3k (roofing, HVAC install, solar, repipe, re-sewer).
 *  - When the client has an approved financing partner (GoodLeap, FTL Finance, Synchrony, etc.).
 *
 * WHEN NOT TO USE
 *  - Low-ticket services (drain clean, $150 service call) — feels forced.
 *  - Brands without actual financing — regulatory risk.
 *
 * FITTING VERTICALS
 *  roofing · HVAC install · solar · foundation · repipe · kitchen/bath remodel · window replacement.
 */
import React from "react";

export interface FinancingCalloutProps {
  red?: string;
  ink?: string;
  heading?: string;
  subheading?: string;
  offer?: string;
  terms?: string;
  partnerLogoUrl?: string;
  partnerLogoAlt?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const DEFAULTS = {
  red: "#EF3E33",
  ink: "#231F20",
  heading: "Financing Available",
  subheading: "Get the repairs you need today — pay over time.",
  offer: "0% APR for 12 Months",
  terms: "On approved credit. Subject to credit approval. Other terms available.",
  partnerLogoAlt: "{{FINANCING PARTNER LOGO}}",
  primaryCta: { label: "Apply Now", href: "#financing" },
  secondaryCta: { label: "Learn More", href: "#" },
};

export default function FinancingCallout(props: FinancingCalloutProps) {
  const {
    red = DEFAULTS.red,
    ink = DEFAULTS.ink,
    heading = DEFAULTS.heading,
    subheading = DEFAULTS.subheading,
    offer = DEFAULTS.offer,
    terms = DEFAULTS.terms,
    partnerLogoUrl,
    partnerLogoAlt = DEFAULTS.partnerLogoAlt,
    primaryCta = DEFAULTS.primaryCta,
    secondaryCta = DEFAULTS.secondaryCta,
  } = props;

  return (
    <section style={{ padding: "60px 0", background: "#F4F6F8" }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
        className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center"
      >
        <div
          className="relative overflow-hidden"
          style={{
            background: ink,
            color: "#fff",
            borderRadius: 12,
            padding: 32,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              right: -40,
              width: 200,
              height: "100%",
              background: `linear-gradient(110deg, transparent 0%, transparent 45%, ${red} 45%, ${red} 75%, transparent 75%)`,
              opacity: 0.9,
            }}
          />
          <div className="relative z-10">
            <div
              className="uppercase opacity-80"
              style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 14, letterSpacing: 2 }}
            >
              {heading}
            </div>
            <h2
              className="uppercase mt-2"
              style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontWeight: 800, fontSize: 48, lineHeight: 1 }}
            >
              {offer}
            </h2>
            <p className="mt-3" style={{ fontSize: 17, maxWidth: 520, opacity: 0.9, fontFamily: '"Roboto Condensed", system-ui, sans-serif' }}>
              {subheading}
            </p>
            <p className="mt-4 text-xs opacity-70">{terms}</p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <a
                href={primaryCta.href}
                className="uppercase font-bold"
                style={{ background: red, color: "#fff", padding: "16px 32px", borderRadius: 7, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 16 }}
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="uppercase font-bold"
                style={{ background: "#fff", color: ink, padding: "16px 32px", borderRadius: 7, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 16 }}
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-center"
          style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #CCD6DF" }}
        >
          {partnerLogoUrl ? (
            <img src={partnerLogoUrl} alt={partnerLogoAlt} style={{ maxWidth: 260, maxHeight: 120 }} />
          ) : (
            <div
              className="uppercase text-center"
              style={{ fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontWeight: 700, color: "#69727D", fontSize: 14, letterSpacing: 2 }}
            >
              {partnerLogoAlt}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
