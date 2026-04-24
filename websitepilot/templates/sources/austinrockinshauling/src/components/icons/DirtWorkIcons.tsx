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

// Land Grading – sloped ground line with grade marker
export const LandGradingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 18L22 8" strokeWidth={2.5} />
    <path d="M2 22h20" />
    <path d="M6 18v4M12 14v8M18 10v12" />
  </svg>
);

// Excavation – pit with side walls
export const ExcavationIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 8h6l2 6h4l2-6h6" strokeWidth={2.5} />
    <path d="M2 8v10h20V8" />
    <path d="M10 14v4M14 14v4" />
  </svg>
);

// Land Clearing – tree being removed (X over tree)
export const LandClearingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M12 2l-5 8h3v4h4v-4h3z" />
    <path d="M10 14v4h4v-4" />
    <path d="M3 21h18" strokeWidth={2.5} />
    <path d="M17 4l4 4M21 4l-4 4" strokeWidth={2.5} />
  </svg>
);

// Trenching – narrow trench between ground
export const TrenchingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 10h8l2 8 2-8h8" strokeWidth={2.5} />
    <path d="M10 10v10M14 10v10" />
    <path d="M2 20h8M14 20h8" />
  </svg>
);

// Backfill & Compaction – arrows pointing down into ground
export const BackfillIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M6 3v8M6 11l-3-3M6 11l3-3" strokeWidth={2.5} />
    <path d="M18 3v8M18 11l-3-3M18 11l3-3" strokeWidth={2.5} />
    <path d="M2 14h20v6H2z" />
    <path d="M5 17h2M9 17h2M13 17h2M17 17h2" />
  </svg>
);

// Site Preparation – flat pad with corner markers
export const SitePrepIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <rect x="4" y="8" width="16" height="10" />
    <path d="M2 18h20" strokeWidth={2.5} />
    <path d="M4 8V5M20 8V5M4 18v3M20 18v3" />
    <path d="M9 13h6" />
  </svg>
);

// Soil Import/Export – dump truck silhouette
export const SoilHaulIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M2 14V7h11v7" />
    <path d="M13 10h5l3 4v3H2v-3" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M3 7l3-3h5l2 3" />
  </svg>
);

// Lot Leveling / Yard Grading – level tool
export const YardGradingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <rect x="2" y="9" width="20" height="6" />
    <circle cx="12" cy="12" r="1.5" />
    <path d="M6 9V7M18 9V7M6 17v-2M18 17v-2" />
    <path d="M2 21h20" strokeWidth={2.5} />
  </svg>
);

// Road & Access Grading – road perspective
export const RoadGradingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaults}>
    <path d="M4 21l5-18M20 21l-5-18" />
    <path d="M11 7h2M10 12h4M9 17h6" strokeWidth={2.5} />
  </svg>
);
