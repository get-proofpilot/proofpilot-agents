/**
 * TrustBarIcons4Up — the 4-icon trust band Hook ships below the hero on every contractor build.
 *
 * WHEN TO USE
 *  - Right below the hero on a contractor home, service, or landing page.
 *  - To codify 4 differentiators with max THREE WORDS per label (Hook discipline).
 *
 * WHEN NOT TO USE
 *  - If the client only has 2 or 3 real differentiators, use a different pattern (2-col trust).
 *  - For interior/mid-page use — this pattern hard-stops visual rhythm and wants to live directly
 *    below the hero with no breathing room above.
 *
 * FITTING VERTICALS
 *  every contractor + most local service businesses.
 */
import React from "react";

export type TrustIconItem = { icon: React.ReactNode; title: string; body: string };

export interface TrustBarIcons4UpProps {
  bg?: string;
  iconBg?: string;
  items?: TrustIconItem[];
}

const DEFAULTS: Required<Pick<TrustBarIcons4UpProps, "bg" | "iconBg" | "items">> = {
  bg: "#F4F6F8",
  iconBg: "#EF3E33",
  items: [
    { icon: <span>🏠</span>, title: "Local", body: "Family Owned" },
    { icon: <span>🔧</span>, title: "Workmanship", body: "Guaranteed" },
    { icon: <span>💲</span>, title: "Upfront", body: "Pricing" },
    { icon: <span>⏱️</span>, title: "On-Time", body: "Service" },
  ],
};

export default function TrustBarIcons4Up({
  bg = DEFAULTS.bg,
  iconBg = DEFAULTS.iconBg,
  items = DEFAULTS.items,
}: TrustBarIcons4UpProps) {
  return (
    <section style={{ background: bg, borderTop: "1px solid #CCD6DF80", borderBottom: "1px solid #CCD6DF80" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} className="grid grid-cols-2 md:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="flex items-center gap-4 px-6 py-6"
            style={{ borderLeft: i > 0 ? "1px solid #CCD6DF80" : "none" }}
          >
            <div
              className="w-14 h-14 flex items-center justify-center text-2xl"
              style={{ background: iconBg, borderRadius: 7 }}
            >
              {it.icon}
            </div>
            <div>
              <h3
                className="font-extrabold uppercase"
                style={{
                  fontFamily: '"Roboto Condensed", system-ui, sans-serif',
                  fontSize: 25,
                  lineHeight: "30px",
                  color: "#000",
                }}
              >
                {it.title}
              </h3>
              <p style={{ fontSize: 14, color: "#231F20CC", fontFamily: '"Roboto Condensed", system-ui, sans-serif' }}>
                {it.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
