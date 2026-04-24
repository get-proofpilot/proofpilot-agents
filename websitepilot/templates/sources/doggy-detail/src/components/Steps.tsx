import React from 'react';
import { DoorOpen, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import geometricPattern from '@/assets/geometric-pattern.svg';

const ShowerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4v16"/>
    <path d="M4 10h16"/>
    <path d="M16 14v2"/>
    <path d="M12 14v4"/>
    <path d="M8 14v2"/>
    <path d="M16 18v2"/>
    <path d="M12 20v2"/>
    <path d="M8 18v2"/>
  </svg>
);

const steps = [
  {
    number: "01",
    icon: DoorOpen,
    title: "Walk In",
    description: "No appointment needed. Bring your pup and we'll set you up in a private tub with everything you need."
  },
  {
    number: "02",
    icon: ShowerIcon,
    title: "Wash & Dry",
    description: "Use our professional tubs, shampoos, and dryers. Upgrade your shampoo for specific coat needs."
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Walk Out Clean",
    description: "We clean the tub, floor, and towels. You leave with a fresh pup and zero mess at home."
  }
];

export const Steps: React.FC = () => {
  return (
    <div id="self-wash-process" className="py-24 bg-foreground text-white scroll-mt-20 relative overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          filter: 'invert(1)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-racing-red font-oswald uppercase tracking-[0.3em] text-sm mb-3">The Process</p>
          <h2 className="text-white text-4xl md:text-5xl font-oswald font-bold uppercase mb-4">
            How Self Wash Works
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-white/30"></div>
            <div className="w-2 h-2 bg-racing-red rotate-45"></div>
            <div className="h-px w-12 bg-white/30"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-8 h-full backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
              <div className="flex justify-between items-start mb-8">
                <div className="text-racing-red font-oswald font-bold text-6xl leading-none">{step.number}</div>
                <div className="text-white/80">
                  {step.icon === ShowerIcon ? (
                    <ShowerIcon className="w-10 h-10" />
                  ) : (
                    <step.icon size={40} strokeWidth={1} />
                  )}
                </div>
              </div>
              <h4 className="text-white font-oswald font-bold text-xl uppercase mb-4 tracking-wide">{step.title}</h4>
              <p className="text-white/60 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="px-10 py-3 border-white text-white hover:bg-white hover:text-foreground uppercase tracking-widest text-xs bg-transparent">
            See Self Wash Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};
