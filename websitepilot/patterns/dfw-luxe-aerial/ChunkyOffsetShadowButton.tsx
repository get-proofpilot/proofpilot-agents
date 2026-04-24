/**
 * ChunkyOffsetShadowButton
 *
 * The Be The Anomaly signature button: solid fill + navy border + 8px radius
 * + `box-shadow: 0 5px 0 0 <color>` offset shadow. On hover it "presses down"
 * by 2px. Title-case label in Work Sans 700.
 *
 * WHEN TO USE:
 * - Every CTA on a BtA-family site (pool, outdoor living, concrete, landscape, home service).
 * - Any brand whose tone is tradesman-confident rather than enterprise-polished.
 *
 * WHEN NOT TO USE:
 * - Ultra-minimal / Swiss / editorial brands — use a ghost or text-only CTA.
 * - Dark luxury hospitality — the offset shadow reads casual/commercial.
 *
 * Variants:
 *  - `primary` accent-fill, navy shadow (default light bg)
 *  - `ghost` white fill, accent text, navy shadow (pairs on light bg)
 *  - `dark-bg` primary accent-fill with WHITE shadow (use on navy/twilight backgrounds)
 *  - `inverse` navy fill, white text, accent shadow (rare contrast break)
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'dark-bg' | 'inverse';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  as?: 'button' | 'a';
  href?: string;
  children: ReactNode;
};

function stylesFor(v: Variant) {
  switch (v) {
    case 'ghost':
      return { bg: '#ffffff', color: 'var(--color-accent, #4CA8DE)', shadow: 'var(--color-navy, #121A1E)' };
    case 'dark-bg':
      return { bg: 'var(--color-accent, #4CA8DE)', color: '#ffffff', shadow: '#ffffff' };
    case 'inverse':
      return { bg: 'var(--color-navy, #121A1E)', color: '#ffffff', shadow: 'var(--color-accent, #4CA8DE)' };
    default:
      return { bg: 'var(--color-accent, #4CA8DE)', color: '#ffffff', shadow: 'var(--color-navy, #121A1E)' };
  }
}

export default function ChunkyOffsetShadowButton({
  variant = 'primary',
  as = 'button',
  href,
  children,
  style,
  ...rest
}: Props) {
  const s = stylesFor(variant);
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: "'Work Sans', system-ui, sans-serif",
    fontWeight: 700,
    fontSize: 16,
    background: s.bg,
    color: s.color,
    border: '1px solid var(--color-navy, #121A1E)',
    borderRadius: 8,
    padding: '12px 24px',
    boxShadow: `0 5px 0 0 ${s.shadow}`,
    transition: 'transform 120ms ease, box-shadow 120ms ease',
    textTransform: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    ...style,
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(5px)';
    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${s.shadow}`;
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)';
    (e.currentTarget as HTMLElement).style.boxShadow = `0 3px 0 0 ${s.shadow}`;
  };
  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)';
    (e.currentTarget as HTMLElement).style.boxShadow = `0 3px 0 0 ${s.shadow}`;
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
    (e.currentTarget as HTMLElement).style.boxShadow = `0 5px 0 0 ${s.shadow}`;
  };

  if (as === 'a') {
    return (
      <a
        href={href}
        style={base}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      style={base}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </button>
  );
}
