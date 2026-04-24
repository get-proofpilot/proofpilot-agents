/**
 * DiagonalSlashTransition
 *
 * A slim brand-agnostic transition band that carries the rugged-industrial
 * diagonal-slash + hex motif between sections. Use it to break up a long
 * white stack or to announce a shift in content tempo.
 *
 * WHEN TO USE:
 * - Between any two stacked white or light-gray sections that feel visually
 *   flat on a long-scroll page.
 * - As a thin decorative slot above a mid-CTA band.
 *
 * WHEN NOT TO USE:
 * - On a page that already stacks a concrete-ribbon CTA — the motif will
 *   repeat visually and cheapen both.
 * - Inside cards or constrained widths: the SVG pattern needs at least 120px
 *   horizontal to breathe.
 *
 * Tokens: --color-ink, --color-concrete.
 */
type Props = {
  /** Which tone the band sits on. `ink` = dark, `concrete` = blue, `steel` = gray. */
  tone?: 'ink' | 'concrete' | 'steel';
  /** Optional inline label rendered in ALL-CAPS Montserrat. */
  label?: string;
  /** Height of the band in px. Defaults to 56. */
  height?: number;
};

const TONE_BG: Record<NonNullable<Props['tone']>, string> = {
  ink: 'var(--color-ink, #151C24)',
  concrete: 'var(--color-concrete, #0071BA)',
  steel: '#F3F3F3',
};

const TONE_STROKE: Record<NonNullable<Props['tone']>, string> = {
  ink: '%23ffffff',
  concrete: '%23ffffff',
  steel: '%23151C24',
};

const TONE_STROKE_OP: Record<NonNullable<Props['tone']>, string> = {
  ink: '0.08',
  concrete: '0.22',
  steel: '0.1',
};

export default function DiagonalSlashTransition({ tone = 'concrete', label, height = 56 }: Props) {
  const bgStroke = TONE_STROKE[tone];
  const op = TONE_STROKE_OP[tone];
  const bg =
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>` +
    `<g stroke='${bgStroke}' stroke-width='1' stroke-opacity='${op}'>` +
    `<line x1='-10' y1='60' x2='60' y2='-10'/>` +
    `<line x1='30' y1='130' x2='130' y2='30'/>` +
    `</g></svg>")`;

  return (
    <div
      style={{
        backgroundColor: TONE_BG[tone],
        backgroundImage: bg,
        backgroundRepeat: 'repeat',
        backgroundSize: '120px 120px',
        minHeight: height,
      }}
      className="w-full flex items-center justify-center"
    >
      {label && (
        <span
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontSize: 12,
            color: tone === 'steel' ? 'var(--color-ink, #151C24)' : '#fff',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
