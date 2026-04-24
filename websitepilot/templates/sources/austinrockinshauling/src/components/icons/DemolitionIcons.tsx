import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

const defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ═══════════════════════════════════════════
   SERVICE ICONS — bold, clean glyphs
   ═══════════════════════════════════════════ */

// House with wrecking ball / broken wall
export const ResidentialDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M3 11L12 4l9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
    <path d="M9 13l3-3 3 3" strokeWidth={2.5} />
  </svg>
);

// Building with grid windows
export const CommercialDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <rect x="6" y="6" width="4" height="4" />
    <rect x="14" y="6" width="4" height="4" />
    <rect x="6" y="14" width="4" height="4" />
    <rect x="14" y="14" width="4" height="4" />
  </svg>
);

// Wall with doorway cutout
export const InteriorDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M3 4v16h18V4" />
    <path d="M9 20V12h6v8" />
    <path d="M11 16h2" />
    <path d="M7 8h3" />
    <path d="M14 8h3" />
  </svg>
);

// Garage door with panel lines
export const GarageDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M3 11L12 5l9 6" />
    <path d="M5 11v10h14V11" />
    <path d="M7 14h10" />
    <path d="M7 17h10" />
  </svg>
);

// Pool with water waves
export const PoolDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M6 12c1.5-1.5 3 1.5 4.5 0s3 1.5 4.5 0s3 1.5 4.5 0" />
    <path d="M6 16c1.5-1.5 3 1.5 4.5 0s3 1.5 4.5 0s3 1.5 4.5 0" />
    <path d="M8 7V5" />
    <path d="M16 7V5" />
  </svg>
);

// Concrete slab with crack
export const ConcreteDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <rect x="2" y="10" width="20" height="10" rx="1" />
    <path d="M12 10l-2 5 3 0-2 5" strokeWidth={2.5} />
    <path d="M6 10V7h12v3" />
  </svg>
);

// Shed with door
export const ShedDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M4 12l8-6 8 6" />
    <path d="M6 12v8h12v-8" />
    <rect x="10" y="14" width="4" height="6" />
    <path d="M13 17.5h.5" />
  </svg>
);

// Mobile home on wheels
export const MobileHomeDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M2 13h18l2 3H2z" />
    <path d="M4 13V9h12l2 4" />
    <rect x="6" y="10" width="3" height="3" />
    <rect x="11" y="10" width="3" height="3" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M9 16h6" />
  </svg>
);

// Foundation/footing block
export const FoundationIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M3 14h18" strokeWidth={2.5} />
    <path d="M5 14v6h14v-6" />
    <path d="M5 20H19" strokeWidth={2.5} />
    <path d="M9 14V10h6v4" />
    <path d="M12 10V7" />
  </svg>
);

// Hammer with small wall piece
export const LightDemoIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M15 3l-6 6" strokeWidth={2.5} />
    <path d="M13 1l4 4-2 2-4-4z" />
    <path d="M9 9l-6 6 4 4 6-6" />
    <path d="M3 21l4-4" />
  </svg>
);

// Cleared lot with grade mark
export const SitePrepIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M2 20h20" strokeWidth={2.5} />
    <path d="M5 20l3-6h8l3 6" />
    <path d="M12 14V8" />
    <path d="M9 11l3-3 3 3" />
    <path d="M8 8h8" />
  </svg>
);

/* ═══════════════════════════════════════════
   WHY CHOOSE US ICONS — bold statement glyphs
   ═══════════════════════════════════════════ */

// Excavator / wrecking arm (Demo & Haul-Off)
export const HardHatIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M4 17h16" strokeWidth={2.5} />
    <path d="M6 17c0-4 2-8 6-8s6 4 6 8" />
    <path d="M3 17v2h18v-2" />
    <path d="M12 9V6" />
  </svg>
);

// Shield with checkmark (Licensed & Insured)
export const LicensedInsuredIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M12 3l8 4v5c0 5.5-3.5 9-8 11-4.5-2-8-5.5-8-11V7l8-4z" />
    <path d="M9 12l2 2 4-4" strokeWidth={2.5} />
  </svg>
);

// Dollar/receipt (Transparent Pricing)
export const TransparentPricingIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M12 7v10" />
    <path d="M9 10c0-1.5 1.3-2 3-2s3 .5 3 2-1.5 1.5-3 2-3 .5-3 2 1.3 2 3 2 3-.5 3-2" />
  </svg>
);

// Clock with speed (Same-Day Estimates)
export const SameDayEstimateIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" strokeWidth={2.5} />
  </svg>
);

/* ═══════════════════════════════════════════
   PROCESS ICONS — clean, centered glyphs
   ═══════════════════════════════════════════ */

// Phone/consultation
export const EstimateIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

// Clipboard with checklist
export const PermitIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M9 2v2h6V2" />
    <path d="M9 10l2 2 4-4" strokeWidth={2.5} />
    <path d="M9 16h6" />
  </svg>
);

// Brick wall with caution/warning symbol
export const DemoItIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    {/* Warning triangle with exclamation */}
    <path d="M12 2L4 12h16L12 2z" />
    <path d="M12 6v4" strokeWidth={2.5} />
    <circle cx="12" cy="12.5" r="0.8" fill="currentColor" />
    {/* Brick wall */}
    <rect x="3" y="14" width="18" height="8" rx="1" />
    <path d="M3 17h18" />
    <path d="M8 14v8" />
    <path d="M16 14v8" />
  </svg>
);

// Dump truck with diagonal stripes
export const HaulItIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M1 14h15V5H1z" />
    <path d="M16 14h4l3 4v2h-7z" />
    <path d="M3 8l4 4M3 12l4-4M6 8l4 4M6 12l4-4" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
    <path d="M8 19h9" />
  </svg>
);

// Sparkle / clean broom
export const CleanItIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M12 2v8" strokeWidth={2.5} />
    <path d="M8 10h8l1 11H7l1-11z" />
    <path d="M9 14h6" />
    <path d="M10 18h4" />
    <path d="M20 4l-1 2 2 1" />
    <path d="M18 2l1 1" />
  </svg>
);

// Thumbs up (Problem Solved style)
export const ThumbsUpIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    <path d="M7 22V11l3-8a1 1 0 011-1h1a2 2 0 012 2v4h5.5a2 2 0 012 1.94l-.5 7A2 2 0 0119 20H7z" />
  </svg>
);

// Crosshair / target (All-in-One Expertise)
export const ExpertiseIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
  </svg>
);

// Star (Five-Star Reputation)
export const StarIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

// Chat bubbles (Communication)
export const ChatIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <path d="M8 10h8" />
    <path d="M8 13h5" />
  </svg>
);

// People / family (Family Owned)
export const FamilyIcon = ({ className, size = 24 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} {...defaultProps}>
    <circle cx="9" cy="7" r="3" />
    <circle cx="17" cy="7" r="2" />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    <path d="M17 11a3 3 0 013 3v1" />
  </svg>
);