import type { Config } from "tailwindcss";

/**
 * Contractor Heritage HVAC palette — derived from Bears Plumbing (Hook Agency)
 * + comfort-blue accent for heating/cooling duality.
 *
 * `brand-red` stays the conversion color (CTAs, slash motif, coupons).
 * `brand-blue` is reserved for cooling-side accents (AC service door,
 * coolant icons, "comfort" highlights). Together red + blue == hot/cold,
 * the universal HVAC visual language.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#EF3E33",
          "red-hover": "#D63329",
          blue: "#1976D2",
          "blue-hover": "#1565C0",
          "blue-tint": "#E3F2FD",
          ink: "#231F20",
          "ink-soft": "#3F444B",
          white: "#FFFFFF",
          pink: "#CC3366",
          "gray-border": "#69727D",
          "gray-soft": "#CCD6DF",
          "gray-tint": "#F4F6F8",
          "gray-text": "#69727D",
        },
      },
      fontFamily: {
        display: ['"Roboto Condensed"', "system-ui", "sans-serif"],
        body: ['"Roboto Condensed"', "system-ui", "sans-serif"],
        promo: ['"Roboto"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "h1-desktop": ["55px", { lineHeight: "66px", fontWeight: "800", letterSpacing: "0" }],
        "h2-desktop": ["40px", { lineHeight: "48px", fontWeight: "800" }],
        "h3-card": ["24px", { lineHeight: "28.8px", fontWeight: "800" }],
        "h3-trust": ["25px", { lineHeight: "30px", fontWeight: "800" }],
        "h3-blog": ["22px", { lineHeight: "26.4px", fontWeight: "800" }],
        "body-base": ["17px", { lineHeight: "27.2px", fontWeight: "400" }],
        "btn-base": ["16px", { lineHeight: "19.2px", fontWeight: "700" }],
        "promo-sm": ["15px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        btn: "7px",
        input: "3px",
        card: "12px",
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        "card-soft": "0 14px 40px rgba(0,0,0,0.12)",
        "quote-form": "0 20px 60px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
