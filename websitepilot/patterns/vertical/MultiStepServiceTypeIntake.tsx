/**
 * MultiStepServiceTypeIntake — service-type-first multi-step lead form.
 *
 * Source: https://speedywaterheatersoc.com (Speedy Water Heaters, OC)
 * Signature move: instead of a long single-form, the lead capture is split
 * into 3 progressive steps:
 *  Step 1 — pick your SERVICE TYPE (Tankless / Tank / Repair / Replacement)
 *  Step 2 — drop in your LOCATION (zip)
 *  Step 3 — leave NAME / EMAIL / PHONE
 * The visitor commits to a service before sharing PII, which both qualifies
 * the lead and reduces drop-off. The first step is presented as a tile
 * grid (visual choice) — not a select dropdown.
 *
 * WHEN TO USE:
 *  - Single-vertical specialists with 3-5 distinct service types (water
 *    heaters, garage doors, roofing, junk removal, AC)
 *  - Brands targeting decision-stage buyers who already know roughly what
 *    they want
 *  - Pages where qualifying the service type before booking matters for
 *    routing or pricing tiers
 *
 * WHEN NOT TO USE:
 *  - Multi-trade brands with 8+ services — too many step-1 tiles
 *  - Top-of-funnel "I don't know what I need" traffic — symptom-checklist
 *    fits better
 *  - Premium / design-build presets — multi-step feels transactional
 */
import { useState } from "react";

type ServiceTile = {
  key: string;
  label: string;        // "Tankless Water Heaters"
  caption?: string;     // "On-demand hot water"
  icon?: string;
};

type Props = {
  eyebrow?: string;
  headline?: string;
  step1Label?: string;
  services?: ServiceTile[];
  step2Label?: string;
  step3Label?: string;
  submitLabel?: string;
  brand?: { ink?: string; primary?: string; primaryInk?: string; surface?: string; cardBg?: string };
  onSubmit?: (data: { service: string; zip: string; name: string; email: string; phone: string }) => void;
};

export default function MultiStepServiceTypeIntake({
  eyebrow = "Get Started",
  headline = "Tell us what you need — we'll handle the rest.",
  step1Label = "Select Your Service",
  services = [
    { key: "tankless", label: "Tankless Water Heaters", caption: "On-demand, energy-efficient", icon: "🔥" },
    { key: "tank", label: "Tank Water Heaters", caption: "Reliable & affordable", icon: "🛢️" },
    { key: "repair", label: "Water Heater Repair", caption: "Leaks, no hot water, error codes", icon: "🛠️" },
    { key: "replacement", label: "Water Heater Replacement", caption: "Old unit out, new unit in", icon: "🔄" },
  ],
  step2Label = "Where's the Job?",
  step3Label = "Last Step — How Should We Reach You?",
  submitLabel = "Get My Quote",
  brand = { ink: "#0A2540", primary: "#0A4DA8", primaryInk: "#FFFFFF", surface: "#F4F7FB", cardBg: "#FFFFFF" },
  onSubmit,
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#0A4DA8";
  const primaryInk = brand.primaryInk ?? "#FFFFFF";
  const surface = brand.surface ?? "#F4F7FB";
  const cardBg = brand.cardBg ?? "#FFFFFF";

  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const inputCls =
    "w-full px-4 py-3 text-[15px] rounded-[6px] border outline-none focus:border-current";

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {headline}
          </h2>
        </div>

        <div
          className="rounded-[12px] p-6 md:p-10"
          style={{ background: cardBg, boxShadow: "0 18px 56px rgba(10,37,64,0.10)" }}
        >
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full text-[13px] font-bold"
                  style={{
                    background: step >= n ? primary : "#E5E7EB",
                    color: step >= n ? primaryInk : "#6B7280",
                  }}
                >
                  {n}
                </span>
                {n < 3 && (
                  <span
                    className="block w-12 h-[2px]"
                    style={{ background: step > n ? primary : "#E5E7EB" }}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="text-[14px] font-semibold tracking-[0.16em] uppercase mb-5 text-center opacity-80">
                {step1Label}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                {services.map((s) => (
                  <li key={s.key}>
                    <button
                      type="button"
                      onClick={() => {
                        setService(s.key);
                        setStep(2);
                      }}
                      className="w-full text-left flex items-start gap-4 p-5 rounded-[8px] transition"
                      style={{
                        border: `2px solid ${service === s.key ? primary : "#E5E7EB"}`,
                        background: service === s.key ? `${primary}0D` : cardBg,
                      }}
                    >
                      <span
                        className="flex items-center justify-center w-12 h-12 rounded-full text-[22px] shrink-0"
                        style={{ background: `${primary}15`, color: primary }}
                        aria-hidden
                      >
                        {s.icon}
                      </span>
                      <div>
                        <p className="text-[15px] font-bold leading-tight">{s.label}</p>
                        {s.caption && <p className="text-[13px] opacity-70 mt-1">{s.caption}</p>}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-md mx-auto">
              <p className="text-[14px] font-semibold tracking-[0.16em] uppercase mb-5 text-center opacity-80">
                {step2Label}
              </p>
              <input
                type="text"
                inputMode="numeric"
                placeholder="ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className={inputCls}
                style={{ borderColor: "#E5E7EB", color: ink }}
              />
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[6px] border"
                  style={{ borderColor: ink, color: ink }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => zip && setStep(3)}
                  className="flex-1 px-6 py-3 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[6px]"
                  style={{ background: primary, color: primaryInk, opacity: zip ? 1 : 0.5 }}
                  disabled={!zip}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-md mx-auto">
              <p className="text-[14px] font-semibold tracking-[0.16em] uppercase mb-5 text-center opacity-80">
                {step3Label}
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "#E5E7EB", color: ink }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "#E5E7EB", color: ink }}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "#E5E7EB", color: ink }}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[6px] border"
                  style={{ borderColor: ink, color: ink }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => onSubmit?.({ service, zip, name, email, phone })}
                  className="flex-1 px-6 py-3 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[6px]"
                  style={{ background: primary, color: primaryInk }}
                >
                  {submitLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
