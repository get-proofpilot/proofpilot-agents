import React from 'react';

interface PawPrintProps {
  className?: string;
  color?: string;
  size?: number;
}

export const PawPrint: React.FC<PawPrintProps> = ({ 
  className = '', 
  color = '#D4A853',
  size = 16 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      width={size}
      height={size}
      fill={color}
    >
      {/* Main pad - heart shape */}
      <path d="M50 48 C30 48 25 60 25 70 C25 82 35 90 50 90 C65 90 75 82 75 70 C75 60 70 48 50 48Z" />
      {/* Outer left toe */}
      <ellipse cx="18" cy="35" rx="10" ry="14" transform="rotate(-20 18 35)" />
      {/* Inner left toe */}
      <ellipse cx="36" cy="22" rx="9" ry="13" transform="rotate(-8 36 22)" />
      {/* Inner right toe */}
      <ellipse cx="64" cy="22" rx="9" ry="13" transform="rotate(8 64 22)" />
      {/* Outer right toe */}
      <ellipse cx="82" cy="35" rx="10" ry="14" transform="rotate(20 82 35)" />
    </svg>
  );
};
