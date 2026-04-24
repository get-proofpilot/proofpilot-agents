import { type CSSProperties, type ReactNode } from "react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * ChunkyRoundedButton
 * -------------------
 * The playful-chunky-consumer primary UI element: a confident rectangular button
 * with a 5px radius and a 2px solid border. NOT a pill (999px radius) — the
 * candy palette carries the playfulness; the squared silhouette carries the
 * confidence. Pills would shift the brand read into "generic SaaS / mobile app."
 *
 * WHEN TO USE
 *   - Every CTA inside a playful-chunky-consumer template (hero, services,
 *     final CTA, forms, phone links).
 *   - Anywhere the brand palette's candy stop-lights need to carry the signal.
 *
 * WHEN NOT TO USE
 *   - Luxury / premium / editorial lanes (use thin-border outline buttons instead).
 *   - Rugged industrial (use stamped steel treatments instead).
 *   - When the brief explicitly requires pill buttons — fork this pattern.
 *
 * VARIANTS
 *   primary       — filled candy-primary, ink on primary.
 *   accent        — outlined accent color (used for phone CTAs).
 *   accent-solid  — filled accent color, ink on accent.
 *   ghost-light   — outlined white, for use on dark surfaces.
 *   ghost-dark    — outlined ink, for use on light surfaces.
 */
export type ChunkyRoundedButtonProps = {
  brand?: Partial<BrandTokens>;
  variant?: "primary" | "accent" | "accent-solid" | "ghost-light" | "ghost-dark";
  size?: "md" | "xl";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
  trailing?: ReactNode;
  fullWidth?: boolean;
  /** Set false to suppress uppercase (rarely). */
  uppercase?: boolean;
};

export default function ChunkyRoundedButton({
  brand,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  children,
  trailing,
  fullWidth = false,
  uppercase = true,
}: ChunkyRoundedButtonProps) {
  const b = { ...defaultBrand, ...brand };
  const style = styleFor(b, variant, size, uppercase, fullWidth);
  const content = (
    <>
      {children}
      {trailing}
    </>
  );
  if (href) {
    return (
      <a href={href} style={style} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} style={style} onClick={onClick}>
      {content}
    </button>
  );
}

function styleFor(
  b: BrandTokens,
  variant: NonNullable<ChunkyRoundedButtonProps["variant"]>,
  size: "md" | "xl",
  uppercase: boolean,
  fullWidth: boolean,
): CSSProperties {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: b.fontFamily,
    fontWeight: 700,
    textTransform: uppercase ? "uppercase" : "none",
    letterSpacing: "0.02em",
    borderRadius: 5, // SIGNATURE — 5px, not 999px.
    textDecoration: "none",
    cursor: "pointer",
    transition: "transform .15s ease, filter .15s ease, box-shadow .15s ease",
    width: fullWidth ? "100%" : undefined,
  };
  if (size === "xl") {
    base.fontSize = 22;
    base.padding = "16px 34px";
  } else {
    base.fontSize = 18;
    base.padding = "13px 28px";
  }
  switch (variant) {
    case "primary":
      return { ...base, background: b.primary, color: b.primaryInk, border: `2px solid ${b.primary}` };
    case "accent":
      return { ...base, background: "transparent", color: b.accent, border: `2px solid ${b.accent}` };
    case "accent-solid":
      return { ...base, background: b.accent, color: b.accentInk, border: `2px solid ${b.accent}` };
    case "ghost-light":
      return { ...base, background: "transparent", color: b.onDark, border: `2px solid ${b.onDark}` };
    case "ghost-dark":
      return { ...base, background: "transparent", color: b.ink ?? b.darker, border: `2px solid ${b.ink ?? b.darker}` };
  }
}
