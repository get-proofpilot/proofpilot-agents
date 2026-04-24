import * as React from "react";

const PATH = "M0 80 L8 52 L14 60 L22 30 L30 48 L38 20 L46 42 L54 8 L64 38 L72 22 L82 44 L92 18 L102 38 L110 28 L120 80 Z";

export const Spire: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" {...props}>
    <path d={PATH} />
  </svg>
);

export const SpireIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = "", ...props }) => (
  <Spire className={`motif-glyph ${className}`} style={{ width: 14, height: 14 }} {...props} />
);

export const SpireWatermark: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({ className = "", size = 500, style, ...props }) => (
  <Spire
    className={`pointer-events-none select-none ${className}`}
    style={{ width: size, height: Math.round(size * 80/120), opacity: 0.05, ...style }}
    {...props}
  />
);
