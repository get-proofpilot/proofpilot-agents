import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

const defaults = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── SERVICE / USE-CASE ICONS ── */

// Home Cleanouts – house with arrow out
export const HomeCleanoutIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M14 15h6M17 12l3 3-3 3" strokeWidth={2.5} />
  </svg>
);

// Yard Waste – branch / leaf
export const YardWasteIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M12 22V8" strokeWidth={2.5} />
    <path d="M12 8c0-3 2-5 5-5 0 3-2 5-5 5z" />
    <path d="M12 12c0-3-2-5-5-5 0 3 2 5 5 5z" />
    <path d="M12 16c0-3 2-5 5-5 0 3-2 5-5 5z" />
    <path d="M3 22h18" />
  </svg>
);

// Dirt / Gravel – pile of material
export const DirtGravelIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 20h20" strokeWidth={2.5} />
    <path d="M3 20l5-8 4 5 3-3 6 6" />
    <circle cx="8" cy="14" r="0.8" fill="currentColor" />
    <circle cx="13" cy="16" r="0.8" fill="currentColor" />
    <circle cx="17" cy="17" r="0.8" fill="currentColor" />
  </svg>
);

// Construction Debris – broken board / debris
export const ConstructionDebrisIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M3 21h18" strokeWidth={2.5} />
    <path d="M5 21l3-10 6 2-2 8" />
    <path d="M14 21l5-7 3 3-3 4" />
    <path d="M9 14l3 3" />
  </svg>
);

// Roofing Tear-Off – roof with shingles
export const RoofingTearoffIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 14L12 4l10 10" strokeWidth={2.5} />
    <path d="M5 12h2M9 10h2M13 10h2M17 12h2" />
    <path d="M4 14v7h16v-7" />
    <path d="M9 21v-4h6v4" />
  </svg>
);

// Concrete & Masonry – brick layers
export const ConcreteMasonryIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3 10h18M3 14h18" />
    <path d="M9 5v5M14 10v4M9 14v5" />
  </svg>
);

// Move-out / Estate – moving box
export const MoveOutIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M3 7h18v4H3z" />
    <path d="M5 11v10h14V11" />
    <path d="M10 7v3h4V7" strokeWidth={2.5} />
    <path d="M9 16h6" />
  </svg>
);

// Event Cleanup – cup / cleanup
export const EventCleanupIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M5 5h14l-2 14H7L5 5z" />
    <path d="M3 5h18" strokeWidth={2.5} />
    <path d="M9 9v6M12 9v6M15 9v6" />
  </svg>
);

// Junk Removal – trash bag
export const JunkRemovalIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M5 8h14l-1 13H6L5 8z" />
    <path d="M8 8c0-2 1.5-3 4-3s4 1 4 3" strokeWidth={2.5} />
    <path d="M10 13v4M14 13v4" />
  </svg>
);

/* ── WHY-CHOOSE-US ICONS ── */

// No driveway damage – tire on driveway
export const NoDamageIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <circle cx="12" cy="13" r="6" />
    <circle cx="12" cy="13" r="2" />
    <path d="M12 7v2M12 17v2M6 13h2M16 13h2" />
    <path d="M3 21h18" strokeWidth={2.5} />
  </svg>
);

// All-inclusive – truck with checkmark
export const AllInclusiveIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 14V7h11v7" />
    <path d="M13 10h5l3 4v3H2v-3" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M5 4l3 3 5-5" strokeWidth={2.5} />
  </svg>
);

// Flexible loading – clock with arrow
export const FlexibleLoadingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" strokeWidth={2.5} />
  </svg>
);

// Local & owned – pin in heart / map
export const LocallyOwnedIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M12 22s-8-7-8-13a8 8 0 0116 0c0 6-8 13-8 13z" />
    <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
  </svg>
);

/* ── PROCESS ICONS ── */

// Step 1 – Phone / Book
export const BookIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

// Step 2 – Truck arriving / delivery
export const DeliverIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M1 14V6h13v8" />
    <path d="M14 9h5l3 4v3H1v-3" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M8 18h7" />
  </svg>
);

// Step 3 – Loading box into trailer
export const LoadIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <rect x="3" y="14" width="18" height="6" />
    <path d="M9 14l3-10 3 10" />
    <path d="M12 4v8" strokeWidth={2.5} />
    <path d="M9 8l3-4 3 4" strokeWidth={2.5} />
  </svg>
);

// Step 4 – Pickup / hauling away
export const PickupIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 14V7h11v7" />
    <path d="M13 10h5l3 4v3H2v-3" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M5 7l3-3M5 4l3 3" strokeWidth={2.5} />
  </svg>
);

// Step 5 – Disposal / recycle
export const DisposeIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M5 7h14l-1 13H6L5 7z" />
    <path d="M9 7V4h6v3" />
    <path d="M3 7h18" strokeWidth={2.5} />
    <path d="M10 11v6M14 11v6" />
  </svg>
);
