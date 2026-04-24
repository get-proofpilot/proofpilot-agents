import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { BrandTokens, defaultBrand } from "./types";

/**
 * ServicesGridArchetype
 * ---------------------
 * Dark-purple section with a GIANT uppercase split headline, then a 2×4
 * (or 2×3 / 1×4 depending on count) grid of service cards. Each card =
 * icon well, service title, short description, arrow-link.
 *
 * WHEN TO USE
 *   - 4–8 services.
 *   - You want to make the services feel "heroic" not utilitarian.
 *   - The surface flow needs a dark-chapter break.
 *
 * WHEN NOT TO USE
 *   - 1–3 services → use a featured-service split block.
 *   - 9+ services → move to a dedicated /services page and pull only the top 6 here.
 */
export type ServiceCard = {
  title: string;
  body: string;
  icon?: ReactNode;
  href?: string;
};

export type ServicesGridArchetypeProps = {
  brand?: Partial<BrandTokens>;
  headlineTop?: string;
  headlineBottom?: string;
  services?: ServiceCard[];
};

const defaultServices: ServiceCard[] = [
  { title: "Electrical Panels",    body: "Instant upgrades with modern, reliable electrical panels." },
  { title: "Electrical Remodeling", body: "Tailored remodeling for new construction and existing homes." },
  { title: "Electrical Repair",     body: "Prompt, safe repairs so you can relax while we fix it." },
  { title: "Lighting Installation", body: "Eye-catching fixtures installed with expert methods." },
  { title: "EV Chargers",           body: "Premium-quality EV charger installation you can trust." },
  { title: "Generator Installation",body: "Reliable backup power with outstanding craftsmanship." },
  { title: "Outdoor Lighting",      body: "Enhance your property with long-lasting illumination." },
  { title: "Surge Protection",      body: "Protect your home from fires and damage, affordably." },
];

export default function ServicesGridArchetype({
  brand,
  headlineTop = "WE'RE GLAD YOU'RE HERE.",
  headlineBottom = "HOW CAN WE HELP?",
  services = defaultServices,
}: ServicesGridArchetypeProps) {
  const b = { ...defaultBrand, ...brand };

  return (
    <section
      style={{
        background: b.dark,
        color: b.onDark,
        fontFamily: b.fontFamily,
      }}
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 28px)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <h2
          className="text-center font-black uppercase mx-auto max-w-5xl mb-16"
          style={{
            fontSize: "clamp(48px, 7.5vw, 92px)",
            lineHeight: 1,
            letterSpacing: "-0.5px",
          }}
        >
          <span className="block">{headlineTop}</span>
          <span className="block" style={{ color: b.primary }}>
            {headlineBottom}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <a
              key={i}
              href={s.href ?? "#"}
              className="group block p-6 border border-white/5 rounded-2xl transition hover:-translate-y-1"
              style={{ background: b.darker }}
            >
              <div
                className="h-20 w-20 grid place-items-center rounded-[10px] mb-4"
                style={{ background: `${b.primary}26` /* 15% alpha */ }}
              >
                {s.icon ?? (
                  <div
                    className="h-10 w-10 rounded-full"
                    style={{ background: b.primary }}
                  />
                )}
              </div>
              <h3
                className="font-extrabold"
                style={{ fontSize: 24, lineHeight: 1.2 }}
              >
                {s.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: b.onDarkMuted ?? "#d0b8ee" }}
              >
                {s.body}
              </p>
              <div
                className="mt-5 inline-flex items-center gap-2 font-bold uppercase text-sm"
                style={{ color: b.primary }}
              >
                {s.title}
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
