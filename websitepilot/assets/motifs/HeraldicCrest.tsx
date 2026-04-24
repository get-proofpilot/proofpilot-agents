import * as React from "react";

const PATH = "M12 2 L4 5 V11 C4 16.5 7.5 20.5 12 22 C16.5 20.5 20 16.5 20 11 V5 L12 2 Z M6.2 7.5 H17.8 V8.8 H6.2 Z M6.5 11.0 H17.5 V12.2 H6.5 Z";

export const HeraldicCrest: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" {...props}>
    <path d={PATH} />
  </svg>
);

export const HeraldicCrestIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className = "", ...props }) => (
  <HeraldicCrest className={`motif-glyph ${className}`} style={{ width: 14, height: 14 }} {...props} />
);

export const HeraldicCrestWatermark: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({ className = "", size = 500, style, ...props }) => (
  <HeraldicCrest
    className={`pointer-events-none select-none ${className}`}
    style={{ width: size, height: size, opacity: 0.05, ...style }}
    {...props}
  />
);
