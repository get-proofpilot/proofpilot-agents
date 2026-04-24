import React from 'react';
import { Waves } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  size = 'md',
  ...props 
}) => {
  const baseStyle = "font-heading font-bold transition-all duration-300 rounded flex items-center justify-center gap-2 transform active:scale-95 leading-none tracking-wide";
  
  const sizes = {
    sm: "px-4 py-3 text-xs",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };
  
  const variants = {
    primary: "bg-[#06b6d4] hover:bg-[#0891b2] text-white shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] border border-transparent",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-lg",
    outline: "bg-transparent border-2 border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4] hover:text-white",
    white: "bg-white text-slate-900 hover:bg-gray-50 shadow-md border border-transparent font-bold",
    dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
  };

  return (
    <button 
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const SectionHeading: React.FC<{ 
  title: React.ReactNode; 
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}> = ({ title, subtitle, center = false, light = false, className = '' }) => {
  const textColor = light ? 'text-white' : 'text-slate-900';
  const subtitleColor = light ? 'text-white/80' : 'text-slate-600';
  
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black ${textColor} mb-4 md:mb-6 tracking-tight leading-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-2xl font-bold ${subtitleColor} max-w-3xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const PlaceholderImage: React.FC<{
  icon?: React.ElementType;
  label?: string;
  subLabel?: string;
  className?: string;
}> = ({ icon: Icon = Waves, label = "ProActive", subLabel = "Pool Solutions", className = "" }) => {
  return (
    <div className={`w-full h-full bg-slate-100 relative group cursor-default overflow-hidden ${className}`}>
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 group-hover:bg-cyan-50/30 transition-colors relative">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-cyan-200 group-hover:text-[#06b6d4] group-hover:scale-110 transition-all duration-500 z-10">
                 <Icon size={32} strokeWidth={2} />
            </div>
            <div className="text-center z-10 px-4">
                 <span className="block font-black text-slate-300 text-xl uppercase tracking-widest group-hover:text-cyan-800/30 transition-colors">{label}</span>
                 <span className="block font-bold text-slate-300/60 text-xs tracking-[0.2em] mt-1 group-hover:text-cyan-800/20 transition-colors">{subLabel}</span>
            </div>
        </div>
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`w-full p-4 md:p-5 bg-white border border-slate-200 rounded-lg text-slate-700 text-base font-semibold outline-none focus:border-[#06b6d4] focus:ring-1 focus:ring-[#06b6d4] ${className}`}
    {...props}
  />
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
    {children}
  </div>
);