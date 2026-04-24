import type { Config } from "tailwindcss";

/**
 * Volt-Vikings-derived DNA — archetype-mascot.
 *
 * Palette roles (swap these per client brand, keep the roles):
 *   brand.primary   — the loud CTA color (orange-ish).
 *   brand.dark      — the deep brand field for hero / nav / reviews.
 *   brand.cream     — the light-warm alt-section.
 *   brand.accent    — the UPPER-headline burnt accent.
 *
 * Typography: ONE family at many weights. Saira is the reference.
 * When swapping, replace with another wide-range sans (Barlow / Oswald /
 * Anton / Archivo Black / etc).
 */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        brand: {
          primary: "#FF9143",      // main CTA orange
          primaryInk: "#000000",   // text on primary CTA
          accent:  "#FF620D",      // burnt-orange H1 accent
          dark:    "#3C0E70",      // deep brand purple
          darker:  "#250845",      // navy-purple hero base
          cream:   "#FFF6EF",      // section alt bg
          ink:     "#333333",      // default body text
          onDark:  "#FFFFFF",
          onDarkMuted: "#D9C8EF",
        },
      },
      fontFamily: {
        // Saira is the Volt Vikings signature — one family, all weights.
        sans: [
          "Saira",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // exact desktop-1440 extractions
        "hero-giga": ["123px", { lineHeight: "0.9", letterSpacing: "-0.5px" }],
        "section-h1": ["92px", { lineHeight: "1", letterSpacing: "-0.5px" }],
        "section-h1-alt": ["111px", { lineHeight: "1", letterSpacing: "0" }],
        "h1": ["44px", { lineHeight: "1.2" }],
        "h2-med": ["37px", { lineHeight: "1.3" }],
        "step-title": ["33px", { lineHeight: "1.2", letterSpacing: "-0.5px" }],
        "card-title": ["25px", { lineHeight: "1.2" }],
        "service-title": ["24px", { lineHeight: "1.2" }],
      },
      borderRadius: {
        btn: "10px",
        card: "16px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(60,14,112,0.15)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(ellipse at top, #4a1c8a 0%, #250845 55%, #120322 100%)",
        "cta-band": "linear-gradient(180deg, #FF9143 0%, #FF7A25 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
