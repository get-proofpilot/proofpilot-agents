/**
 * HeroWithInlineQuoteForm — Hook Agency's signature contractor hero.
 *
 * WHEN TO USE
 *  - Home-service contractors (plumbing, HVAC, roofing, electrical, GC).
 *  - SEO-first, conversion-anchored funnels where the hero must double as the form.
 *  - Red/black or red/dark heritage palettes.
 *
 * WHEN NOT TO USE
 *  - Boutique/luxury services where the hero should be image-dominant.
 *  - B2B or enterprise — this form is consumer-calibrated (TCPA SMS consent).
 *  - Products where the primary CTA is "buy" or "sign up" rather than "request a quote".
 *
 * FITTING VERTICALS
 *  plumbing · HVAC · roofing · pest control · electrical · garage doors · gutter ·
 *  handyman · tree service · foundation · solar install · generator install · pool service
 */
import React, { useState } from "react";

export type BrandTokens = { red?: string; ink?: string; pink?: string };
export type Cta = { label: string; href: string };

export interface HeroWithInlineQuoteFormProps {
  brand?: BrandTokens;
  h1?: string;
  subCopy?: string;
  bullets?: string[];
  primaryCta?: Cta;
  secondaryCta?: Cta;
  googleRating?: { value: number; count: number };
  formLabels?: {
    eyebrow?: string;
    title?: string;
    submit?: string;
    tcpa?: string;
  };
  backgroundImageUrl?: string;
  onSubmit?: (values: Record<string, string>) => void;
}

const DEFAULTS = {
  brand: { red: "#EF3E33", ink: "#231F20", pink: "#CC3366" },
  h1: "Plumbing Services in Spring, TX",
  subCopy: "Our Best Advertisement Is Your Satisfaction.",
  bullets: [
    "Local Family Owned",
    "Workmanship Guaranteed",
    "Upfront Pricing",
    "On-Time Service",
  ],
  primaryCta: { label: "Book Now", href: "#quote" },
  secondaryCta: { label: "Call 281-350-2327", href: "tel:2813502327" },
  googleRating: { value: 5.0, count: 250 },
  formLabels: {
    eyebrow: "Get a quote",
    title: "Contact Us",
    submit: "Send",
    tcpa: "By submitting, you consent to receive SMS messages. Msg & data rates may apply. Reply STOP to unsubscribe.",
  },
};

export default function HeroWithInlineQuoteForm(props: HeroWithInlineQuoteFormProps) {
  const {
    brand = DEFAULTS.brand,
    h1 = DEFAULTS.h1,
    subCopy = DEFAULTS.subCopy,
    bullets = DEFAULTS.bullets,
    primaryCta = DEFAULTS.primaryCta,
    secondaryCta = DEFAULTS.secondaryCta,
    googleRating = DEFAULTS.googleRating,
    formLabels = DEFAULTS.formLabels,
    backgroundImageUrl,
    onSubmit,
  } = props;

  const red = brand.red ?? DEFAULTS.brand.red;
  const ink = brand.ink ?? DEFAULTS.brand.ink;

  const [values, setValues] = useState({ first: "", last: "", phone: "", email: "", message: "" });
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={
        backgroundImageUrl
          ? { backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(110deg, ${ink} 0%, ${ink} 38%, ${red} 38%, ${red} 72%, ${ink} 72%, ${ink} 100%)`,
          opacity: backgroundImageUrl ? 0.55 : 1,
        }}
      />
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div
        className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 py-16 lg:py-24 px-6"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div className="flex flex-col gap-6 text-white">
          <h1
            className="font-extrabold uppercase"
            style={{
              fontFamily: '"Roboto Condensed", system-ui, sans-serif',
              fontSize: "clamp(40px, 5.5vw, 55px)",
              lineHeight: 1.1,
            }}
          >
            {h1}
          </h1>
          <p className="text-white/90 max-w-lg" style={{ fontSize: 17, lineHeight: "27.2px" }}>
            {subCopy}
          </p>
          <ul className="space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-white/90">
                <span style={{ color: red, fontSize: 20, lineHeight: 1 }}>✓</span>
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={primaryCta.href}
              className="inline-flex items-center uppercase font-bold"
              style={{
                background: red,
                color: "#fff",
                padding: "16px 32px",
                borderRadius: 7,
                fontFamily: '"Roboto Condensed", system-ui, sans-serif',
                fontSize: 16,
              }}
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center uppercase font-bold"
              style={{
                background: ink,
                color: "#fff",
                padding: "16px 32px",
                borderRadius: 7,
                fontFamily: '"Roboto Condensed", system-ui, sans-serif',
                fontSize: 16,
              }}
            >
              {secondaryCta.label}
            </a>
          </div>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div
              className="flex items-center gap-2 bg-white rounded-md px-3 py-2 font-bold uppercase"
              style={{ color: ink, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 14 }}
            >
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center font-bold text-xs">G</span>
              <span style={{ color: red }}>{"★".repeat(Math.round(googleRating.value))}</span>
              <span>{googleRating.value.toFixed(1)}</span>
            </div>
            <span className="text-white/80 text-sm">{googleRating.count}+ 5-star reviews</span>
          </div>
        </div>

        <div
          className="rounded-xl p-6 md:p-8 bg-white"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
        >
          <div
            className="inline-block px-3 py-1 text-xs font-bold uppercase rounded-sm"
            style={{ background: red, color: "#fff", fontFamily: '"Roboto Condensed", system-ui, sans-serif' }}
          >
            {formLabels?.eyebrow}
          </div>
          <h3 className="text-2xl font-extrabold uppercase mt-3" style={{ color: ink, fontFamily: '"Roboto Condensed", system-ui, sans-serif' }}>
            {formLabels?.title}
          </h3>
          <form className="space-y-3 mt-4" onSubmit={handle}>
            <div className="grid grid-cols-2 gap-3">
              <input className="hero-input" placeholder="First Name" required onChange={(e) => setValues({ ...values, first: e.target.value })} value={values.first} />
              <input className="hero-input" placeholder="Last Name" required onChange={(e) => setValues({ ...values, last: e.target.value })} value={values.last} />
            </div>
            <input className="hero-input" type="tel" placeholder="Phone Number" required onChange={(e) => setValues({ ...values, phone: e.target.value })} value={values.phone} />
            <input className="hero-input" type="email" placeholder="Email Address" required onChange={(e) => setValues({ ...values, email: e.target.value })} value={values.email} />
            <textarea className="hero-input" placeholder="Message" rows={3} onChange={(e) => setValues({ ...values, message: e.target.value })} value={values.message} />
            <label className="flex items-start gap-2 text-xs leading-tight" style={{ color: "#69727D" }}>
              <input type="checkbox" className="mt-1" required />
              <span>{formLabels?.tcpa}</span>
            </label>
            <button
              type="submit"
              className="w-full uppercase font-bold"
              style={{ background: red, color: "#fff", padding: "16px 32px", borderRadius: 7, fontFamily: '"Roboto Condensed", system-ui, sans-serif', fontSize: 16 }}
            >
              {formLabels?.submit}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .hero-input {
          width: 100%;
          background: #fff;
          border: 1px solid #69727D;
          border-radius: 3px;
          padding: 12px 14px;
          font-size: 15px;
          font-family: "Roboto Condensed", system-ui, sans-serif;
          color: #231F20;
        }
        .hero-input:focus { outline: 2px solid ${red}; border-color: ${red}; }
      `}</style>
    </section>
  );
}
