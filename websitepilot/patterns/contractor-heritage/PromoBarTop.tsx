/**
 * PromoBarTop — thin dark band above the main header.
 *
 * WHEN TO USE
 *  - Any contractor site with a time-limited offer, hours-of-operation flag,
 *    or a phone-number-forward brand.
 *  - When the client wants a pink/accent micro-band that reads as a newsletter clip.
 *
 * WHEN NOT TO USE
 *  - Clean editorial brands where the top strip feels dated.
 *  - Fully dark nav systems where the extra band creates visual noise.
 *
 * FITTING VERTICALS
 *  plumbing · HVAC · roofing · electrical · home service in general ·
 *  seasonal retailers · local service businesses with hours constraints
 */
import React from "react";

export interface PromoBarTopProps {
  bg?: string;
  accent?: string; // link color
  items?: { label: string; href: string }[];
  trailing?: React.ReactNode;
}

const DEFAULTS = {
  bg: "#231F20",
  accent: "#CC3366",
  items: [
    { label: "Monday - Friday: 8am-5pm", href: "tel:+12813502327" },
    { label: "Same Day Response", href: "tel:+12813502327" },
    { label: "Deals", href: "#specials" },
  ],
};

export default function PromoBarTop({
  bg = DEFAULTS.bg,
  accent = DEFAULTS.accent,
  items = DEFAULTS.items,
  trailing,
}: PromoBarTopProps) {
  return (
    <div style={{ background: bg, color: accent }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 24px" }}
        className="flex items-center justify-between"
      >
        <ul className="flex items-center gap-6" style={{ fontFamily: '"Roboto", system-ui, sans-serif', fontSize: 15, fontWeight: 500 }}>
          {items.map((it) => (
            <li key={it.label}>
              <a href={it.href} className="hover:opacity-80 transition-opacity">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        {trailing ? (
          <div className="text-xs tracking-wide" style={{ color: "#CCD6DF" }}>
            {trailing}
          </div>
        ) : null}
      </div>
    </div>
  );
}
