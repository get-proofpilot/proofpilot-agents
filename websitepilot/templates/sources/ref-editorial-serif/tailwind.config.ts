import type { Config } from "tailwindcss";

/**
 * Editorial-Serif palette — derived from Kingswood Landscape.
 * Swap `brand-accent` + `brand-ink` when re-skinning for a luxury design-build,
 * dental, medical, legal, or high-end remodel client. Keep the cream ground —
 * that's the preset's signature. Keep `fraunces` / fallback serif — the italic
 * H1 is the SIGNATURE MOVE. No sans-serif display treatments allowed.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: "#42AC54",
          "accent-hover": "#399948",
          ink: "#1F1E1A",
          "ink-soft": "#464646",
          "ink-muted": "#8C8B87",
          cream: "#FFFCF4",
          "cream-warm": "#F6F0E2",
          "cream-line": "#CFCDC6",
          white: "#FFFFFF",
          black: "#0E0D0A",
        },
      },
      fontFamily: {
        // Fraunces is a free Google serif that reads like Serif 72 Beta.
        // Cormorant / Libre Caslon are acceptable swaps.
        display: ['"Fraunces"', '"Libre Caslon Text"', "Georgia", "serif"],
        body: ['"Fraunces"', '"Libre Caslon Text"', "Georgia", "serif"],
        accent: ['"Fraunces"', "Georgia", "serif"],
      },
      fontSize: {
        "h1-display": ["83px", { lineHeight: "91.3px", fontWeight: "400", letterSpacing: "-0.01em" }],
        "h1-mobile": ["54px", { lineHeight: "60px", fontWeight: "400", letterSpacing: "-0.01em" }],
        "h2-display": ["44px", { lineHeight: "48.4px", fontWeight: "400", letterSpacing: "0" }],
        "h2-over": ["28px", { lineHeight: "33.6px", fontWeight: "500", letterSpacing: "0.04em" }],
        "h3-metric": ["40px", { lineHeight: "40px", fontWeight: "400", letterSpacing: "-0.01em" }],
        "h3-card": ["28px", { lineHeight: "33.6px", fontWeight: "400", letterSpacing: "0" }],
        "body-base": ["16px", { lineHeight: "25.6px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "30.6px", fontWeight: "400" }],
        "btn-base": ["14px", { lineHeight: "16.8px", fontWeight: "600", letterSpacing: "0.18em" }],
        "eyebrow": ["12px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.24em" }],
      },
      borderRadius: {
        btn: "0px",
        card: "2px",
        input: "0px",
      },
      maxWidth: {
        container: "1280px",
        narrow: "880px",
      },
      boxShadow: {
        "card-lift": "0 18px 40px -18px rgba(31, 30, 26, 0.25)",
        "hero-card": "0 28px 60px -20px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;
