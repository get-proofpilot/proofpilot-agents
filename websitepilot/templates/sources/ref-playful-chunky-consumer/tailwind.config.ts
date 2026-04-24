import type { Config } from "tailwindcss";

/**
 * Santa-Banana-derived DNA — playful-chunky-consumer.
 *
 * Palette roles (swap per client brand, KEEP the roles):
 *   brand.primary    — the candy CTA color (yellow/gold for Santa Banana).
 *   brand.primaryInk — the ink on the primary CTA (deep navy).
 *   brand.accent     — the second-stop color used for phone buttons / secondary CTAs (candy red).
 *   brand.dark       — the deep hero / surface field (navy).
 *   brand.darker     — the card / darker block surface (deeper navy).
 *   brand.sky        — the mid-blue alt-band used on dark-on-dark seams.
 *   brand.cream      — neutral light section alt.
 *
 * Typography: ONE condensed-geometric sans at many weights (Fira Sans on ref).
 *   Use weights 400/500/700/800/900. 900 carries every display heading.
 *   Body sans (Open Sans) is secondary — keep at 16–18px.
 *
 * Buttons: chunky rectangular with 5px radius + 2px solid border, not pills.
 *   That's the CONSUMER-PLAYFUL tell: almost-soft rectangles, never sharp,
 *   never round. Candy colors do the "playful"; the chunky silhouette does
 *   the "confident."
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
          primary:    "#FDD40C", // candy-yellow primary CTA
          primaryInk: "#090F17", // near-black ink on yellow CTAs
          accent:     "#D11F2E", // candy-red phone / secondary CTA border
          accentInk:  "#FFFFFF",
          dark:       "#063250", // deep navy hero / CTA band
          darker:     "#0F1A28", // even deeper card field
          sky:        "#146094", // mid-blue alt-band
          cream:      "#F8F8F8", // neutral light section alt
          ink:        "#0F1A28", // default body text
          inkMuted:   "#3F444B",
          onDark:     "#FFFFFF",
          onDarkMuted:"#CCD9E4",
        },
      },
      fontFamily: {
        // Fira Sans is the Santa Banana signature — one family, all weights.
        sans: [
          "Fira Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        body: [
          "Open Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        // exact desktop-1440 extractions from gosantabanana.com
        "hero-giga":   ["100px", { lineHeight: "1",   letterSpacing: "-0.3px" }], // observed 89–100px
        "section-h1":  ["57px",  { lineHeight: "1.3", letterSpacing: "-0.5px" }], // observed 57px / 900 wt
        "section-h2":  ["41px",  { lineHeight: "1.2", letterSpacing: "-0.3px" }],
        "eyebrow":     ["31px",  { lineHeight: "1",   letterSpacing: "-0.8px" }],
        "card-title":  ["23px",  { lineHeight: "1.2", letterSpacing: "-0.2px" }], // observed h4: 23px / 800 wt
        "tile-title":  ["20px",  { lineHeight: "1.3", letterSpacing: "-0.1px" }], // observed h6: 20px / 700 wt
      },
      borderRadius: {
        btn:  "5px",
        card: "8px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(6,50,80,0.18)",
        lift: "0 16px 40px rgba(9,15,23,0.22)",
      },
      keyframes: {
        twinkle: {
          "0%,100%": { opacity: "0.9", transform: "scale(1)" },
          "50%":     { opacity: "0.4", transform: "scale(0.8)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%":     { transform: "translateY(-8px) rotate(2deg)" },
        },
      },
      animation: {
        twinkle: "twinkle 2.4s ease-in-out infinite",
        bob:     "bob 5s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at top, #0B4778 0%, #063250 55%, #031A2B 100%)",
        "candy-band":
          "linear-gradient(180deg, #FDD40C 0%, #F8B900 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
