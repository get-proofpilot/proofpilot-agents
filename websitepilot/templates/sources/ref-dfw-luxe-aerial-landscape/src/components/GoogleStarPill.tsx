type Props = {
  rating?: string;
  count?: string;
  label?: string;
  avatarColors?: string[];
};

export default function GoogleStarPill({
  rating = '5.0',
  count = '40+',
  label = 'on NextDoor, Yelp & Google',
  avatarColors = ['#F59E0B', '#EF4444', '#8B5CF6', '#10B981', '#3B82F6'],
}: Props) {
  return (
    <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-pill border border-navy/5">
      {/* Google G icon (SVG primitive, no brand asset) */}
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
        <path
          fill="#4285F4"
          d="M21.35 11.1H12v2.9h5.35c-.23 1.48-1.69 4.33-5.35 4.33-3.22 0-5.85-2.67-5.85-5.95 0-3.28 2.63-5.95 5.85-5.95 1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.73 3.94 14.58 3 12 3 6.98 3 3 6.98 3 12s3.98 9 9 9c5.2 0 8.64-3.66 8.64-8.8 0-.59-.06-1.05-.29-1.1z"
        />
      </svg>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-[#F6B100]">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
      </div>

      <span className="font-body font-bold text-navy text-[14px] leading-none">{rating}</span>

      {/* Avatars */}
      <div className="flex items-center">
        {avatarColors.slice(0, 4).map((c, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full ring-2 ring-white grid place-items-center text-[11px] font-bold text-white"
            style={{ background: c, marginLeft: i === 0 ? 0 : -8 }}
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
        <div
          className="w-7 h-7 rounded-full ring-2 ring-white bg-accent grid place-items-center text-[10px] font-bold text-white"
          style={{ marginLeft: -8 }}
        >
          {count}
        </div>
      </div>

      <span className="hidden md:inline font-body text-navy/70 text-[13px] leading-none">
        {label}
      </span>
    </div>
  );
}
