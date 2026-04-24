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

/* ── Service icons ── */

// Grading & Leveling – bucket smoothing dirt
export const GradingLevelingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 16h20" strokeWidth={2.5} />
    <path d="M2 20h20" />
    <path d="M4 16l4-6h10l2 6" />
    <path d="M8 10V6h6v4" />
  </svg>
);

// Land Clearing & Brush Removal – brush with cut line
export const ClearingBrushIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M5 18c0-3 2-6 4-6s2 2 3 0 2-4 4-4 3 3 3 6" />
    <path d="M3 21h18" strokeWidth={2.5} />
    <path d="M16 4l5 5M21 4l-5 5" strokeWidth={2.5} />
  </svg>
);

// Excavation & Digging – pit with arrow down
export const ExcavationDigIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 8h6l2 6h4l2-6h6" strokeWidth={2.5} />
    <path d="M2 8v10h20V8" />
    <path d="M12 3v6M9 6l3 3 3-3" strokeWidth={2.5} />
  </svg>
);

// Trenching – narrow channel
export const TrenchingChannelIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 9h8l2 10 2-10h8" strokeWidth={2.5} />
    <path d="M10 9v12M14 9v12" />
    <path d="M2 21h8M14 21h8" />
  </svg>
);

// Demolition – broken slab with hammer
export const DemoSlabIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M3 17h18" strokeWidth={2.5} />
    <path d="M5 17l3-7M11 17l-1-7M14 17l1-6M19 17l-2-5" />
    <path d="M14 3l5 5-2 2-5-5z" />
  </svg>
);

// Material Hauling – dump trailer with arrow load
export const MaterialHaulIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 14V8h11v6" />
    <path d="M13 11h5l3 3v3H2v-3" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M7 8V4h4v4" />
  </svg>
);

// Backfill & Compaction – plate compactor with ground
export const BackfillCompactionIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M6 4v8M6 12l-3-3M6 12l3-3" strokeWidth={2.5} />
    <path d="M18 4v8M18 12l-3-3M18 12l3-3" strokeWidth={2.5} />
    <rect x="2" y="14" width="20" height="6" />
    <path d="M5 17h2M9 17h2M13 17h2M17 17h2" />
  </svg>
);

// Driveway & Road Work – road perspective
export const DrivewayRoadIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M4 21l5-18M20 21l-5-18" />
    <path d="M11 7h2M10 12h4M9 17h6" strokeWidth={2.5} />
  </svg>
);

// Auger / Post Holes – drill bit
export const AugerIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M12 2v6" strokeWidth={2.5} />
    <path d="M8 8h8l-2 3 2 3-2 3 2 3H8l2-3-2-3 2-3z" />
    <path d="M3 21h18" strokeWidth={2.5} />
  </svg>
);

/* ── 5-Step Process icons ── */

// Step 1 – Phone
export const StepPhoneIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth={2.5} />
  </svg>
);

// Step 2 – Site visit / map pin
export const StepVisitIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" strokeWidth={2.5} />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Step 3 – Estimate / clipboard
export const StepEstimateIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <rect x="5" y="4" width="14" height="18" />
    <path d="M9 4V2h6v2" />
    <path d="M8 10h8M8 14h8M8 18h5" />
  </svg>
);

// Step 4 – Skid steer at work
export const StepSkidSteerIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M6 14V8h8v6" />
    <path d="M14 11l4-2v5" />
    <path d="M2 17l4-3h12l4 3" strokeWidth={2.5} />
    <circle cx="7" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
  </svg>
);

// Step 5 – Broom / cleanup
export const StepCleanupIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M14 3l7 7" strokeWidth={2.5} />
    <path d="M5 21l7-9 5 5-9 7z" />
    <path d="M3 21l4-1M5 17l3 3" />
  </svg>
);
