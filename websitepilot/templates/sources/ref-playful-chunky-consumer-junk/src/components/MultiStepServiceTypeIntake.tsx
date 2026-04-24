import { useState } from "react";

/**
 * MultiStepServiceTypeIntake (junk-removal composition).
 *
 * Source pattern: patterns/vertical/MultiStepServiceTypeIntake.tsx
 *   (originally extracted from speedywaterheatersoc.com).
 *
 * Adapted for the JUNK-REMOVAL vertical:
 *   Step 1 — pick the JUNK TYPE (Household / Construction / Estate / Yard).
 *   Step 2 — pick the SCALE (Pickup load / Half truck / Full truck / Multi-truck).
 *   Step 3 — leave NAME / EMAIL / PHONE.
 *
 * The visitor commits to a service type before sharing PII — qualifies
 * the lead and reduces drop-off on the inbound text-a-photo path. Step 1
 * is presented as a chunky 5px-radius tile grid (not a select) — the
 * playful-chunky-consumer DNA carries through.
 *
 * Visual DNA: Fira Sans 900 UPPERCASE, 5px radius (NOT pills), candy-yellow
 * primary CTA, navy ink on cream surface. Palette inherits from
 * tailwind.config.ts brand tokens.
 */

type JunkType = {
  key: string;
  label: string;
  caption?: string;
  icon: string;
};

type ScaleOption = {
  key: string;
  label: string;
  caption?: string;
  icon: string;
};

const JUNK_TYPES: JunkType[] = [
  {
    key: "household",
    label: "Household Junk",
    caption: "Furniture, garage, attic, full house cleanout",
    icon: "🛋️",
  },
  {
    key: "construction",
    label: "Construction Debris",
    caption: "Drywall, lumber, demolition haul-off",
    icon: "🪵",
  },
  {
    key: "estate",
    label: "Estate Cleanout",
    caption: "Discreet, respectful, complete",
    icon: "🏠",
  },
  {
    key: "yard",
    label: "Yard Waste & Outdoor",
    caption: "Branches, hot tubs, sheds, playsets",
    icon: "🌿",
  },
];

const SCALES: ScaleOption[] = [
  { key: "pickup", label: "Pickup Load", caption: "Couch, mattress, ~5 items", icon: "🛻" },
  { key: "half", label: "Half Truck", caption: "Garage worth — single room", icon: "🚛" },
  { key: "full", label: "Full Truck", caption: "Whole-house worth — full load", icon: "🚚" },
  { key: "multi", label: "Multi-Truck", caption: "Big job — we'll bring the crew", icon: "🚜" },
];

export default function MultiStepServiceTypeIntake() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [junkType, setJunkType] = useState<string>("");
  const [scale, setScale] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const tileBase =
    "w-full text-left flex items-start gap-4 p-5 rounded-card border-2 transition-colors";
  const inputCls =
    "w-full rounded-btn border-2 border-brand-dark/20 bg-white px-4 py-3 text-brand-ink placeholder-brand-inkMuted/70 focus:outline-none focus:border-brand-primary";

  return (
    <section id="quote" className="section-cream relative">
      <div className="lights-divider absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto max-w-[1100px] px-6 py-20 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="kicker text-brand-accent mb-3">
            {/* {{INTAKE-KICKER}} */}Get Started
          </div>
          <h2 className="display-h1 text-brand-dark">
            {/* {{INTAKE-H2}} */}
            Tell Us What's On Your Property — We'll Take It From Here.
          </h2>
        </div>

        <div className="rounded-card bg-white border-2 border-brand-dark/10 shadow-card p-6 md:p-10">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2, 3].map((n) => {
              const active = step >= (n as 1 | 2 | 3);
              return (
                <div key={n} className="flex items-center gap-3">
                  <span
                    className={
                      "flex items-center justify-center w-9 h-9 rounded-full font-sans font-black text-[14px] " +
                      (active
                        ? "bg-brand-primary text-brand-primaryInk"
                        : "bg-brand-dark/15 text-brand-dark/60")
                    }
                  >
                    {n}
                  </span>
                  {n < 3 && (
                    <span
                      className={
                        "block w-12 h-[3px] " +
                        (step > n ? "bg-brand-primary" : "bg-brand-dark/15")
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>

          {step === 1 && (
            <div>
              <p className="kicker text-brand-dark/70 text-center mb-5">
                Step 1 — Select Your Junk Type
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                {JUNK_TYPES.map((t) => {
                  const selected = junkType === t.key;
                  return (
                    <li key={t.key}>
                      <button
                        type="button"
                        onClick={() => {
                          setJunkType(t.key);
                          setStep(2);
                        }}
                        className={
                          tileBase +
                          " " +
                          (selected
                            ? "border-brand-primary bg-brand-primary/10"
                            : "border-brand-dark/15 bg-white hover:border-brand-primary/60")
                        }
                      >
                        <span
                          aria-hidden
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary/15 text-2xl shrink-0"
                        >
                          {t.icon}
                        </span>
                        <div>
                          <p className="card-title text-brand-dark">{t.label}</p>
                          {t.caption && (
                            <p className="mt-1 text-[14px] text-brand-inkMuted leading-snug">
                              {t.caption}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="kicker text-brand-dark/70 text-center mb-5">
                Step 2 — How Big Is the Job?
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                {SCALES.map((s) => {
                  const selected = scale === s.key;
                  return (
                    <li key={s.key}>
                      <button
                        type="button"
                        onClick={() => {
                          setScale(s.key);
                          setStep(3);
                        }}
                        className={
                          tileBase +
                          " " +
                          (selected
                            ? "border-brand-primary bg-brand-primary/10"
                            : "border-brand-dark/15 bg-white hover:border-brand-primary/60")
                        }
                      >
                        <span
                          aria-hidden
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-go/30 text-2xl shrink-0"
                        >
                          {s.icon}
                        </span>
                        <div>
                          <p className="card-title text-brand-dark">{s.label}</p>
                          {s.caption && (
                            <p className="mt-1 text-[14px] text-brand-inkMuted leading-snug">
                              {s.caption}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex justify-start">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="kicker text-brand-dark/70 hover:text-brand-dark"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-md mx-auto">
              <p className="kicker text-brand-dark/70 text-center mb-5">
                Step 3 — How Should We Reach You?
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="tel"
                  placeholder="Phone (we'll text the quote)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-ghost-light !text-brand-dark !border-brand-dark/40 sm:flex-1"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn-primary btn-xl sm:flex-1"
                  onClick={() => {
                    /* {{INTAKE-SUBMIT}} hook up to lead capture */
                  }}
                >
                  Get My Quote
                </button>
              </div>
              <p className="mt-4 text-center text-[13px] text-brand-inkMuted">
                Most quotes back inside 10 minutes during business hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
