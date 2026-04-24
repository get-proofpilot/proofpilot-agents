import * as React from "react";

const PATH = "M12 2 L4 5 V11 C4 16.5 7.5 20.5 12 22 C16.5 20.5 20 16.5 20 11 V5 L12 2 Z";

export const Shield: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" {...props}>
    <path d={PATH} />
  </svg>
);

export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = "", ...props }) => (
  <Shield className={`motif-glyph ${className}`} style={{ width: 14, height: 14 }} {...props} />
);

export const ShieldWatermark: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({ className = "", size = 500, style, ...props }) => (
  <Shield
    className={`pointer-events-none select-none ${className}`}
    style={{ width: size, height: size, opacity: 0.05, ...style }}
    {...props}
  />
);
