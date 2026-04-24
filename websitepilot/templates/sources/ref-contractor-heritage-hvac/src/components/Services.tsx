/**
 * Services — detailed service grid under the three-door entry.
 *
 * Sits directly below <HvacThreeDoorEntry />. Each "door" (Heating / Cooling /
 * IAQ) gets a column header + 3-4 specific service tiles so a buyer who picked
 * a door can immediately see what they actually need (furnace install vs heat
 * pump tune-up vs ductless mini-split).
 *
 * Visual rhythm: 3 columns on desktop, accordion-stack on mobile. Heating
 * column accents red, Cooling column accents comfort-blue, IAQ column accents
 * ink — the heat/cool/clean trio at a glance.
 */
type Service = { title: string; body: string };
type Column = {
  door: string;
  eyebrow: string;
  accent: "red" | "blue" | "ink";
  icon: string;
  services: Service[];
};

const COLUMNS: Column[] = [
  {
    door: "Heating",
    eyebrow: "When the cold hits",
    accent: "red",
    icon: "🔥",
    services: [
      { title: "Furnace Repair", body: "No-heat calls answered same day. Most common failures fixed on the first visit." },
      { title: "Furnace Installation", body: "High-efficiency gas, electric, and heat pump installs with full load calc." },
      { title: "Heat Pump Service", body: "Repair, replacement, and dual-fuel conversions for {{CITY}} winters." },
      { title: "Annual Tune-Ups", body: "20-point heating tune-up — cheaper than the repair it prevents." },
    ],
  },
  {
    door: "Cooling",
    eyebrow: "When summer arrives",
    accent: "blue",
    icon: "❄️",
    services: [
      { title: "AC Repair", body: "Short-cycling, frozen coils, weak airflow — diagnosed and quoted upfront." },
      { title: "AC Installation", body: "SEER2-rated systems sized correctly for your square footage and shade." },
      { title: "Ductless Mini-Splits", body: "Room-by-room comfort for additions, finished basements, and bonus rooms." },
      { title: "Cooling Maintenance", body: "Spring tune-ups that catch the failure before the first 95° day." },
    ],
  },
  {
    door: "Indoor Air Quality",
    eyebrow: "What you're breathing",
    accent: "ink",
    icon: "🌬️",
    services: [
      { title: "Whole-Home Air Purifiers", body: "UV and HEPA solutions that work with your existing duct system." },
      { title: "Humidifiers & Dehumidifiers", body: "Year-round comfort — dry winters, sticky summers, both fixed." },
      { title: "Duct Cleaning & Sealing", body: "Sealed ducts cut energy bills and stop pulling attic air into your home." },
      { title: "Smart Thermostats", body: "Wi-Fi thermostats programmed to your schedule, not a default." },
    ],
  },
];

const accentClasses: Record<Column["accent"], { dot: string; pill: string }> = {
  red: { dot: "bg-brand-red", pill: "text-brand-red" },
  blue: { dot: "bg-brand-blue", pill: "text-brand-blue" },
  ink: { dot: "bg-brand-ink", pill: "text-brand-ink" },
};

export default function Services() {
  return (
    <section className="section bg-brand-gray-tint">
      <div className="container-1200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-h2-desktop uppercase mb-3">
            {"{{SERVICES_HEADING — One Team. Heating, Cooling & Air Quality.}}"}
          </h2>
          <p className="text-body-base text-brand-ink/80">
            {"{{SERVICES_SUBCOPY — Pick the door that brought you here. Every service below is delivered by our own technicians — never subcontracted.}}"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {COLUMNS.map((col) => {
            const a = accentClasses[col.accent];
            return (
              <div
                key={col.door}
                className="bg-brand-white rounded-card shadow-card-soft overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-brand-gray-soft/60">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`w-12 h-12 rounded-btn ${a.dot} text-brand-white flex items-center justify-center text-2xl`}
                      aria-hidden
                    >
                      {col.icon}
                    </span>
                    <div>
                      <p className={`text-xs font-display font-bold uppercase tracking-[0.16em] ${a.pill}`}>
                        {col.eyebrow}
                      </p>
                      <h3 className="text-h3-card uppercase text-brand-ink leading-tight">
                        {col.door}
                      </h3>
                    </div>
                  </div>
                </div>
                <ul className="flex-1 divide-y divide-brand-gray-soft/60">
                  {col.services.map((s) => (
                    <li key={s.title} className="px-6 py-4">
                      <p className="font-display font-extrabold uppercase text-brand-ink text-base mb-1">
                        {s.title}
                      </p>
                      <p className="text-sm text-brand-ink/75">{s.body}</p>
                    </li>
                  ))}
                </ul>
                <div className="p-6 bg-brand-gray-tint">
                  <a href="#" className="btn btn-primary w-full">
                    See All {col.door} Services
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
