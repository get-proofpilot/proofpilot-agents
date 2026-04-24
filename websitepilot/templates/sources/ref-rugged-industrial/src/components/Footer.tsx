const COL_SERVICES = ['Garage Floors', 'Commercial', 'Patio Coatings', 'Basement Floors', 'Epoxy Floors', 'Pool Decks', 'Resin Stone', 'Rubber Stone'];
const COL_COMPANY = ['About', 'Careers', 'Our Process', 'Color Options', 'Financing', 'Reviews', 'FAQ', 'Contact'];
const COL_AREA = ['[City One]', '[City Two]', '[City Three]', '[City Four]', '[City Five]', '[City Six]'];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <svg width="40" height="44" viewBox="0 0 40 44" aria-hidden="true">
              <path d="M20 2 L37 12 L37 32 L20 42 L3 32 L3 12 Z" fill="none" stroke="#0071BA" strokeWidth="2" />
              <path d="M20 10 L30 16 L30 28 L20 34 L10 28 L10 16 Z" fill="#0071BA" />
            </svg>
            <div className="leading-tight">
              <div className="font-display font-black text-white text-xl uppercase">[BRAND]</div>
              <div className="font-display font-semibold text-steel-ink text-[10px] uppercase tracking-[0.18em]">Concrete Coatings</div>
            </div>
          </div>
          <address className="not-italic font-body text-white/70 text-sm mt-5 leading-relaxed">
            [Street Address]<br />
            [City, ST ZIP]<br />
            <a href="mailto:" className="hover:text-concrete">info@[brand].com</a><br />
            <a href="tel:" className="hover:text-concrete">(000) 000-0000</a>
          </address>
          <div className="flex items-center gap-3 mt-5">
            {['G+', 'f', 'ig'].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-[4px] border border-white/20 grid place-items-center font-display font-bold text-sm text-white hover:bg-concrete hover:border-concrete">
                {s}
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Services" items={COL_SERVICES} />
        <FooterCol title="Company" items={COL_COMPANY} />
        <FooterCol title="Service Area" items={COL_AREA} />
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 font-body text-xs text-white/50">
          <div>© {new Date().getFullYear()} [BRAND] Concrete Coatings. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display font-black uppercase text-concrete text-sm tracking-[0.14em] mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="font-body text-white/75 text-sm hover:text-concrete">{it}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
