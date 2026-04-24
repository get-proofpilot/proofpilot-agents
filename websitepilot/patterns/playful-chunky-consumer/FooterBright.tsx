import { type CSSProperties, type ReactNode } from "react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * FooterBright
 * ------------
 * A 4-column footer on the darker variant of the brand-dark color: brand lockup,
 * quicklinks, services, service-area map. Every label is in Fira Sans 700
 * uppercase with 0.12em letter-spacing. Bottom utility strip is a single row
 * with copyright + policy links.
 *
 * WHEN TO USE
 *   - Consumer / home-service / local-business brands.
 *   - Multiple link groups (nav, services, policies) + contact info.
 *
 * WHEN NOT TO USE
 *   - Single-service / single-CTA micro-sites (a 1-line contact bar is enough).
 *   - SaaS / B2B (use a tighter 2-col footer with product / company groups).
 */
export type FooterBrightProps = {
  brand?: Partial<BrandTokens>;
  logoSlot?: ReactNode;
  brandLine1?: string;
  brandLine2?: string;
  address?: string;
  phoneDisplay?: string;
  phoneRaw?: string;
  quicklinks?: Array<{ label: string; href: string }>;
  services?: Array<{ label: string; href: string }>;
  mapSlot?: ReactNode;
  copyright?: string;
  utility?: Array<{ label: string; href: string }>;
};

export default function FooterBright({
  brand,
  logoSlot,
  brandLine1 = "Placeholder",
  brandLine2 = "Lighting Co.",
  address = "San Tan Valley, AZ 85140",
  phoneDisplay = "555-000-0000",
  phoneRaw = "5550000000",
  quicklinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],
  services = [
    { label: "Residential Lighting", href: "#services" },
    { label: "Commercial Lighting", href: "#services" },
    { label: "Year-Round Storage", href: "#services" },
    { label: "Free Maintenance", href: "#services" },
  ],
  mapSlot,
  copyright = "Placeholder Lighting Co. All rights reserved.",
  utility = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms & Conditions", href: "#terms" },
  ],
}: FooterBrightProps) {
  const b = { ...defaultBrand, ...brand };
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: b.darker, color: b.onDark, fontFamily: b.bodyFontFamily }}>
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "56px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {logoSlot ?? (
              <div
                aria-hidden
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 999,
                  background: b.primary,
                  color: b.primaryInk,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: b.fontFamily,
                  fontWeight: 900,
                  fontSize: 14,
                }}
              >
                {b.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <div
              style={{
                fontFamily: b.fontFamily,
                fontWeight: 900,
                textTransform: "uppercase",
                color: b.onDark,
                lineHeight: 1.1,
              }}
            >
              <div style={{ fontSize: 18, letterSpacing: "-0.2px" }}>{brandLine1}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.12em", color: b.onDarkMuted }}>{brandLine2}</div>
            </div>
          </div>
          <p style={{ color: b.onDarkMuted, marginTop: 20, fontSize: 14, lineHeight: 1.55 }}>{address}</p>
          <p style={{ marginTop: 8, fontSize: 14 }}>
            <a href={`tel:${phoneRaw}`} style={{ color: b.onDarkMuted, textDecoration: "none" }}>
              {phoneDisplay}
            </a>
          </p>
        </div>

        <Column brand={b} label="Quicklinks" links={quicklinks} />
        <Column brand={b} label="Services" links={services} />

        <div>
          <div style={kickerStyle(b, b.primary)}>Service Area</div>
          <div
            style={{
              marginTop: 16,
              aspectRatio: "5 / 3",
              width: "100%",
              borderRadius: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mapSlot ?? (
              <span
                style={{
                  color: b.onDarkMuted,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Map
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            color: b.onDarkMuted,
            fontSize: 13,
          }}
        >
          <div>© {year} {copyright}</div>
          <div style={{ display: "flex", gap: 16 }}>
            {utility.map((u) => (
              <a key={u.label} href={u.href} style={{ color: b.onDarkMuted, textDecoration: "none" }}>
                {u.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({
  brand,
  label,
  links,
}: {
  brand: BrandTokens;
  label: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <div style={kickerStyle(brand, brand.primary)}>{label}</div>
      <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "grid", gap: 8 }}>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} style={{ color: brand.onDarkMuted, textDecoration: "none", fontSize: 15 }}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function kickerStyle(b: BrandTokens, color: string): CSSProperties {
  return {
    fontFamily: b.fontFamily,
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color,
  };
}
