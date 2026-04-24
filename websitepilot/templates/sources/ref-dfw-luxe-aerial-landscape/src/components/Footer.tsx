const COLS = [
  {
    title: 'Build',
    items: ['Custom Pools', 'Outdoor Living', 'Decking', 'Renovation', 'Lighting'],
  },
  { title: 'Company', items: ['About', 'Portfolio', 'Process', 'Reviews', 'Careers'] },
  { title: 'Resources', items: ['FAQ', 'Financing', 'Warranty', 'Service Area', 'Blog'] },
];

export default function Footer() {
  return (
    <footer className="bg-twilight text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 py-14 md:py-20 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded bg-accent grid place-items-center text-white font-display text-xl">
              [L]
            </div>
            <span className="font-display text-white text-2xl tracking-wide">[BRAND NAME]</span>
          </div>
          <p className="font-body text-white/70 text-[14px] max-w-sm leading-relaxed">
            Custom pools, outdoor living, and concrete-luxe design across Dallas / Fort Worth.
          </p>
          <div className="mt-5 font-body text-white/85 text-[14px] space-y-1">
            <p>(000) 000-0000</p>
            <p>hello@brand.com</p>
            <p>Dallas / Fort Worth, TX</p>
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-accent text-xl mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.items.map((i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="font-body text-[14px] text-white/70 hover:text-white transition"
                  >
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 py-5 flex flex-wrap items-center justify-between gap-3 font-body text-white/50 text-[12px]">
          <p>&copy; {new Date().getFullYear()} [BRAND NAME], LLC. All rights reserved.</p>
          <p>Licensed &amp; insured in Texas.</p>
        </div>
      </div>
    </footer>
  );
}
