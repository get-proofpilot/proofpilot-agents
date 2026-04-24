/**
 * FooterDenseDark
 *
 * 4-column dark-ink footer with brand mark, NAP block, social tiles, and
 * three configurable link columns (services / company / service-area).
 *
 * WHEN TO USE:
 * - Any rugged-industrial site. The dense 4-column footer is load-bearing
 *   for local-SEO trade businesses because each city + service needs a
 *   crawlable internal link.
 *
 * WHEN NOT TO USE:
 * - Short landing pages / single-service funnels where a minimal footer with
 *   just NAP + policy links is cleaner.
 * - Editorial / hospitality brands that want more whitespace.
 *
 * Props are fully configurable. The brand mark slot accepts any ReactNode so
 * downstream brands can drop their real SVG logo.
 *
 * Tokens: --color-ink, --color-concrete.
 */
import type { ReactNode } from 'react';

export type FooterLink = { label: string; href?: string };

type Props = {
  brandMark?: ReactNode;
  brandName: string;
  brandTagline?: string;
  address: { street: string; cityLine: string; email: string; phone: string };
  socials?: { label: string; href: string }[];
  columns: { title: string; items: FooterLink[] }[];
  legalLinks?: FooterLink[];
  year?: number;
};

function DefaultMark() {
  return (
    <svg width="40" height="44" viewBox="0 0 40 44" aria-hidden="true">
      <path d="M20 2 L37 12 L37 32 L20 42 L3 32 L3 12 Z" fill="none" stroke="var(--color-concrete, #0071BA)" strokeWidth="2" />
      <path d="M20 10 L30 16 L30 28 L20 34 L10 28 L10 16 Z" fill="var(--color-concrete, #0071BA)" />
    </svg>
  );
}

export default function FooterDenseDark({
  brandMark,
  brandName,
  brandTagline,
  address,
  socials = [],
  columns,
  legalLinks = [],
  year = new Date().getFullYear(),
}: Props) {
  return (
    <footer className="text-white" style={{ background: 'var(--color-ink, #151C24)' }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            {brandMark ?? <DefaultMark />}
            <div className="leading-tight">
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: 20,
                  color: '#fff',
                }}
              >
                {brandName}
              </div>
              {brandTagline && (
                <div
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {brandTagline}
                </div>
              )}
            </div>
          </div>
          <address
            className="not-italic mt-5 leading-relaxed"
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {address.street}
            <br />
            {address.cityLine}
            <br />
            <a href={`mailto:${address.email}`} className="hover:opacity-80">
              {address.email}
            </a>
            <br />
            <a href={`tel:${address.phone}`} className="hover:opacity-80">
              {address.phone}
            </a>
          </address>
          {socials.length > 0 && (
            <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-[4px] border border-white/20 grid place-items-center hover:bg-white/5"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 13 }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: 13,
                letterSpacing: '0.14em',
                color: 'var(--color-concrete, #0071BA)',
              }}
            >
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href ?? '#'}
                    className="hover:opacity-80"
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                    }}
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div
          className="max-w-[1280px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}
        >
          <div>
            © {year} {brandName}. All rights reserved.
          </div>
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {legalLinks.map((l) => (
                <a key={l.label} href={l.href ?? '#'} className="hover:text-white">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
