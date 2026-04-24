/**
 * HeritageCharityFamilyBand — "family-owned since YEAR" + nonprofit logos band.
 *
 * Source: https://genzryan.com (Genz-Ryan, since 1950)
 * Signature move: a wide band where the LEFT half declares "Family Owned &
 * Operated Since {{YEAR}}" with an owner-quote about giving back, and the
 * RIGHT half is a row of LOCAL NONPROFIT LOGOS the brand sponsors. This is
 * different from a generic "about us" — it converts heritage into proof of
 * community investment by showing actual charity logos, which template-tier
 * sites never have because they don't have real partnerships to show.
 *
 * WHEN TO USE:
 *  - Multi-generation family-owned trade brands (HVAC, plumbing, electrical,
 *    roofing) where heritage + community giving is the trust foundation
 *  - Brands that genuinely sponsor 3-6 local charities or community programs
 *    and have the logos to prove it
 *  - Heritage + archetype-mascot presets — pairs naturally with founder
 *    quote and family photo
 *
 * WHEN NOT TO USE:
 *  - Brands without real charity partnerships — fake or generic logos here
 *    are a credibility-destroyer
 *  - Newer brands (<10 years) where "since YEAR" is unimpressive
 *  - Premium / design-build aesthetics — the dense logo row reads
 *    transactional
 */
type Props = {
  eyebrow?: string;
  headline?: string;          // "Family Owned & Operated Since 1950"
  body?: string;              // owner quote about giving back
  founderName?: string;
  founderTitle?: string;
  founderImage?: string;
  charities?: { name: string; logoUrl: string; href?: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  brand?: { ink?: string; primary?: string; surface?: string; cardBg?: string };
};

export default function HeritageCharityFamilyBand({
  eyebrow = "Heritage",
  headline = "Family Owned & Operated Since {{YEAR}}",
  body = "We believe strongly in supporting our communities through giving back to local nonprofits. Thank you for being a part of our family and helping support these charities.",
  founderName = "{{FOUNDER_NAME}}",
  founderTitle = "Owner",
  founderImage = "/brand/founder.jpg",
  charities = [
    { name: "Charity A", logoUrl: "/brand/charity-a.png", href: "#" },
    { name: "Charity B", logoUrl: "/brand/charity-b.png", href: "#" },
    { name: "Charity C", logoUrl: "/brand/charity-c.png", href: "#" },
    { name: "Charity D", logoUrl: "/brand/charity-d.png", href: "#" },
  ],
  ctaLabel = "Learn About Our Community Work",
  ctaHref = "/community",
  brand = { ink: "#0A2540", primary: "#0A4DA8", surface: "#F4F7FB", cardBg: "#FFFFFF" },
}: Props) {
  const ink = brand.ink ?? "#0A2540";
  const primary = brand.primary ?? "#0A4DA8";
  const surface = brand.surface ?? "#F4F7FB";
  const cardBg = brand.cardBg ?? "#FFFFFF";

  return (
    <section style={{ background: surface, color: ink }}>
      <div className="max-w-[1320px] mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: heritage statement */}
        <div className="lg:col-span-6">
          <p
            className="text-[12px] font-semibold tracking-[0.28em] uppercase mb-4"
            style={{ color: primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.022em" }}
          >
            {headline}
          </h2>
          <p className="text-lg opacity-85 mb-6 max-w-xl">{body}</p>
          <div className="flex items-center gap-4">
            <img
              src={founderImage}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
              style={{ border: `2px solid ${primary}` }}
            />
            <div>
              <p className="text-[15px] font-bold leading-tight">{founderName}</p>
              <p className="text-[13px] opacity-70">{founderTitle}</p>
            </div>
          </div>
          {ctaLabel && (
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-[14px] font-bold tracking-[0.12em] uppercase rounded-[4px]"
              style={{ background: primary, color: "#FFFFFF" }}
            >
              {ctaLabel}
            </a>
          )}
        </div>

        {/* Right: charity logos */}
        <div className="lg:col-span-6">
          <div
            className="rounded-[12px] p-6 md:p-8"
            style={{ background: cardBg, boxShadow: "0 12px 48px rgba(10,37,64,0.08)" }}
          >
            <p className="text-[12px] font-semibold tracking-[0.22em] uppercase mb-5 opacity-70">
              Proudly Supporting Local
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-2 gap-5 list-none p-0">
              {charities.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-center h-20 rounded-[8px] px-4"
                  style={{ background: surface }}
                >
                  <a href={c.href ?? "#"} className="block w-full h-full flex items-center justify-center">
                    <img
                      src={c.logoUrl}
                      alt={c.name}
                      className="max-w-full max-h-12 w-auto h-auto object-contain"
                      style={{ filter: "grayscale(0.2)" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
