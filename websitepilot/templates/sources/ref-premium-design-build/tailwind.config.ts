import type { Config } from "tailwindcss";

/**
 * Premium-Design-Build palette — DNA adapted from cincomosqueteros.co and
 * normalized to ProofPilot's premium-design-build preset:
 *   black + cream + muted gold (not Cinco's green-forward palette).
 *
 * When reskinning: swap `--brand-gold` first, then `--brand-ink` if needed.
 * Cream and ink stay across reskins. The italic serif accent phrase is the
 * signature move — do not drop it for sans-only treatments.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#B08A3E",
          "gold-hover": "#977530",
          "gold-soft": "#D4B26B",
          ink: "#111111",
          "ink-soft": "#2A2A28",
          "ink-muted": "#6F6E6A",
          cream: "#F7F2E8",
          "cream-warm": "#EFE7D4",
          "cream-line": "#D8CFBB",
          white: "#FFFFFF",
          black: "#0A0A0A",
        },
      },
      fontFamily: {
        // Modern sans — Inter or Manrope read as the premium-design-build voice.
        // Italic phrase accent uses Fraunces (editorial serif).
        sans: ['"Manrope"', '"Inter"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"Manrope"', '"Inter"', "system-ui", "sans-serif"],
        italic: ['"Fraunces"', "Georgia", "serif"],
      },
      fontSize: {
        // Desktop scale — mirrors Cinco's hero tagline 74px / H1 50px with 70lh
        "h1-display": ["74px", { lineHeight: "80px", fontWeight: "700", letterSpacing: "-0.02em" }],
        "h1-mobile": ["40px", { lineHeight: "44px", fontWeight: "700", letterSpacing: "-0.02em" }],
        "h1-eyebrow": ["50px", { lineHeight: "60px", fontWeight: "500", letterSpacing: "-0.01em" }],
        "h1-eyebrow-mobile": ["28px", { lineHeight: "34px", fontWeight: "500", letterSpacing: "-0.01em" }],
        "h2-display": ["48px", { lineHeight: "54px", fontWeight: "700", letterSpacing: "-0.01em" }],
        "h2-mobile": ["32px", { lineHeight: "38px", fontWeight: "700", letterSpacing: "-0.01em" }],
        "h3-card": ["22px", { lineHeight: "28px", fontWeight: "600" }],
        "h4-label": ["14px", { lineHeight: "18px", fontWeight: "600", letterSpacing: "0.18em" }],
        "body-base": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "30px", fontWeight: "400" }],
        "btn-base": ["14px", { lineHeight: "16px", fontWeight: "700", letterSpacing: "0.14em" }],
        "italic-accent-lg": ["48px", { lineHeight: "54px", fontWeight: "400", letterSpacing: "-0.01em" }],
        "italic-accent-sm": ["22px", { lineHeight: "28px", fontWeight: "400" }],
      },
      borderRadius: {
        btn: "4px",
        card: "6px",
        pill: "9999px",
        input: "4px",
      },
      maxWidth: {
        container: "1240px",
        narrow: "820px",
      },
      boxShadow: {
        "card-lift": "0 22px 44px -20px rgba(17, 17, 17, 0.22)",
        "hero-card": "0 30px 70px -20px rgba(0, 0, 0, 0.55)",
      },
    },
  },
  plugins: [],
} satisfies Config;
