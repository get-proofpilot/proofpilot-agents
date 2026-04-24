/**
 * CapabilitiesList — understated list of capability chips rather than a
 * 6-service icon grid. Premium-design-build lists services as an afterthought
 * of the portfolio, not the entry point.
 */
const capabilities = [
  "Landscape Architecture",
  "Hardscape Construction",
  "Swimming Pools &amp; Spas",
  "Outdoor Kitchens",
  "Steel Pergolas &amp; Shade",
  "Low-Voltage Lighting Design",
  "Water Features",
  "Irrigation &amp; Drainage",
  "Site Grading &amp; Retaining",
  "Stone &amp; Masonry",
  "Outdoor Fireplaces",
  "Garden Design",
];

export default function CapabilitiesList() {
  return (
    <section id="services" className="section bg-brand-cream">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-h4-label text-brand-gold mb-5">Capabilities</p>
            <h2 className="text-h2-mobile md:text-h2-display text-brand-ink mb-6">
              End-to-end, <span className="italic-accent">in-house</span>.
            </h2>
            <p className="text-body-base text-brand-ink-soft">
              We do not subcontract design, install, or warranty. Every scope below is executed by
              the same studio team.
            </p>
          </div>

          <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 border-t border-brand-cream-line">
            {capabilities.map((cap) => (
              <li
                key={cap}
                className="flex items-center justify-between py-5 border-b border-brand-cream-line text-body-lg text-brand-ink"
              >
                <span dangerouslySetInnerHTML={{ __html: cap }} />
                <span className="italic-accent text-brand-gold text-[14px]">&rarr;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
