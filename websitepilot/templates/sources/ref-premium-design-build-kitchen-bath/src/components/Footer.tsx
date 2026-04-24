/**
 * Footer — black band, 4 columns: brand + contact | navigate | rooms |
 * legal. Italic-gold section headings, muted cream body. Kitchen/bath
 * specialization swaps the Portfolio column for "Rooms We Design" so the
 * editorial sub-nav reads as a curated room directory, not a service menu.
 */
export default function Footer() {
  const nav = ["Kitchens", "Baths", "Portfolio", "Process", "About", "Journal", "Contact"];
  const portfolio = ["Kitchens", "Primary Baths", "Powder Rooms", "Butler&rsquo;s Pantries", "Multi-Bath Floors"];
  const legal = ["Privacy Policy", "Terms of Service", "Warranty"];

  return (
    <footer className="bg-brand-black text-brand-cream/80 pt-20 pb-10">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-14 border-b border-brand-cream/10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-9 w-9 rounded-sm border border-brand-gold-soft/70 flex items-center justify-center italic-accent text-[20px] text-brand-gold-soft">
                B
              </span>
              <span className="font-display font-semibold text-[20px] text-brand-cream">
                &#123;&#123;BRAND_NAME&#125;&#125;
              </span>
            </div>
            <p className="italic-accent text-italic-accent-sm text-brand-gold-soft mb-5">
              commissioned kitchen &amp; bath remodels.
            </p>
            <address className="not-italic text-body-base text-brand-cream/70">
              &#123;&#123;STUDIO_ADDRESS&#125;&#125;
              <br />
              &#123;&#123;CITY&#125;&#125;, &#123;&#123;STATE&#125;&#125; &#123;&#123;ZIP&#125;&#125;
              <br />
              <a href="tel:{{PHONE}}" className="hover:text-brand-gold-soft">
                &#123;&#123;PHONE&#125;&#125;
              </a>
              <br />
              <a href="mailto:{{EMAIL}}" className="hover:text-brand-gold-soft">
                &#123;&#123;EMAIL&#125;&#125;
              </a>
            </address>
          </div>

          <div>
            <p className="italic-accent text-[16px] text-brand-gold-soft mb-4">Navigate</p>
            <ul className="space-y-2 text-body-base">
              {nav.map((n) => (
                <li key={n}>
                  <a href={`#${n.toLowerCase()}`} className="hover:text-brand-gold-soft">
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="italic-accent text-[16px] text-brand-gold-soft mb-4">Rooms we design</p>
            <ul className="space-y-2 text-body-base">
              {portfolio.map((p) => (
                <li key={p}>
                  <a href="#portfolio" className="hover:text-brand-gold-soft" dangerouslySetInnerHTML={{ __html: p }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 gap-4 text-[12px] uppercase tracking-[0.18em] text-brand-cream/50">
          <p>&copy; &#123;&#123;YEAR&#125;&#125; &#123;&#123;BRAND_NAME&#125;&#125;. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            {legal.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-brand-gold-soft" dangerouslySetInnerHTML={{ __html: l }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
