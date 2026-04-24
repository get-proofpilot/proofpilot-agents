/**
 * GoogleStarPillWithAvatars
 *
 * Horizontal pill with Google G + 5 gold stars + rating + 3–5 overlapping
 * reviewer avatars + count chip. Be The Anomaly's in-hero trust move.
 *
 * WHEN TO USE:
 * - Inside a hero directly below copy, OR floating above a dark band.
 * - Brand has 15+ real Google reviews — otherwise it reads like bluff.
 * - You want a one-line, scannable trust signal that does not require a full reviews section.
 *
 * WHEN NOT TO USE:
 * - Brand is B2B / enterprise — Google Business trust signals read as residential-retail.
 * - Fewer than 10 reviews — leave the pill off until you earn it.
 *
 * Props: fully customizable rating, count, label, and avatar set.
 */

type Avatar = {
  /** Initial or 1-char label inside the circle. */
  label?: string;
  /** Background color for the avatar circle. */
  color: string;
  /** Optional image URL — if provided, rendered as <img> instead of initials. */
  src?: string;
};

type Props = {
  rating?: string;
  count?: string;
  label?: string;
  avatars?: Avatar[];
  /** Render light variant on dark backgrounds (default) or dark-on-light. */
  variant?: 'light' | 'dark';
};

const DEFAULT_AVATARS: Avatar[] = [
  { label: 'L', color: '#F59E0B' },
  { label: 'D', color: '#EF4444' },
  { label: 'M', color: '#8B5CF6' },
  { label: 'A', color: '#10B981' },
];

export default function GoogleStarPillWithAvatars({
  rating = '5.0',
  count = '40+',
  label = 'on Google',
  avatars = DEFAULT_AVATARS,
  variant = 'light',
}: Props) {
  const bg = variant === 'light' ? '#ffffff' : 'rgba(255,255,255,0.08)';
  const textColor = variant === 'light' ? '#121A1E' : '#ffffff';
  const subColor = variant === 'light' ? 'rgba(18,26,30,0.7)' : 'rgba(255,255,255,0.7)';

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full px-4 py-2"
      style={{
        background: bg,
        border: '1px solid rgba(18,26,30,0.08)',
        boxShadow: '0 4px 12px rgba(18,26,30,0.08)',
      }}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
        <path
          fill="#4285F4"
          d="M21.35 11.1H12v2.9h5.35c-.23 1.48-1.69 4.33-5.35 4.33-3.22 0-5.85-2.67-5.85-5.95 0-3.28 2.63-5.95 5.85-5.95 1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.73 3.94 14.58 3 12 3 6.98 3 3 6.98 3 12s3.98 9 9 9c5.2 0 8.64-3.66 8.64-8.8 0-.59-.06-1.05-.29-1.1z"
        />
      </svg>

      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-[#F6B100]">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
      </div>

      <span
        style={{
          fontFamily: "'Work Sans', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 14,
          lineHeight: 1,
          color: textColor,
        }}
      >
        {rating}
      </span>

      <div className="flex items-center">
        {avatars.slice(0, 4).map((a, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full grid place-items-center overflow-hidden"
            style={{
              background: a.color,
              boxShadow: '0 0 0 2px #fff',
              marginLeft: i === 0 ? 0 : -8,
            }}
          >
            {a.src ? (
              <img src={a.src} alt="" className="w-full h-full object-cover" />
            ) : (
              <span
                style={{
                  fontFamily: "'Work Sans', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  color: '#fff',
                }}
              >
                {a.label}
              </span>
            )}
          </div>
        ))}
        <div
          className="w-7 h-7 rounded-full grid place-items-center"
          style={{
            background: 'var(--color-accent, #4CA8DE)',
            boxShadow: '0 0 0 2px #fff',
            marginLeft: -8,
          }}
        >
          <span
            style={{
              fontFamily: "'Work Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 10,
              color: '#fff',
            }}
          >
            {count}
          </span>
        </div>
      </div>

      <span
        className="hidden md:inline"
        style={{
          fontFamily: "'Work Sans', system-ui, sans-serif",
          fontSize: 13,
          lineHeight: 1,
          color: subColor,
        }}
      >
        {label}
      </span>
    </div>
  );
}
