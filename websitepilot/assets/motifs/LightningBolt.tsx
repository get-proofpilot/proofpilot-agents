import * as React from "react";

const PATH = "M0 24 L5 14 L8 18 L12 6 L16 16 L19 11 L24 24 Z";

export const LightningBolt: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" {...props}>
    <path d={PATH} />
  </svg>
);

export const LightningBoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = "", ...props }) => (
  <LightningBolt className={`motif-glyph ${className}`} style={{ width: 14, height: 14 }} {...props} />
);

export const LightningBoltWatermark: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({ className = "", size = 500, style, ...props }) => (
  <LightningBolt
    className={`pointer-events-none select-none ${className}`}
    style={{ width: size, height: size, opacity: 0.05, ...style }}
    {...props}
  />
);
