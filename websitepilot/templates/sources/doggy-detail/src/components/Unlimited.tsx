import React from 'react';
import { Button } from './ui/button';
import { PawPrint } from './PawPrint';
import patternRed from '@/assets/pattern-red.jpg';

export const Unlimited: React.FC = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Red pattern background */}
      <div 
        className="absolute inset-0 bg-racing-red"
        style={{
          backgroundImage: `url(${patternRed})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <p className="text-white/80 font-oswald uppercase tracking-[0.3em] text-sm mb-3">Ready?</p>
        <h2 className="text-4xl md:text-6xl font-oswald font-bold uppercase mb-6 text-white leading-none tracking-wide">
          We're Here to Serve
        </h2>
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-px w-12 bg-white/30"></div>
          <div className="w-2 h-2 bg-white rotate-45"></div>
          <div className="h-px w-12 bg-white/30"></div>
        </div>
        <p className="max-w-xl mx-auto text-white/80 mb-10 leading-relaxed text-lg">
          Self wash, full grooming, or just a nail trim. Your dog. Your budget. Your call.
        </p>
        
        <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Button className="bg-white text-foreground hover:bg-foreground hover:text-white px-10 py-3 text-sm uppercase tracking-widest font-oswald font-bold group">
              <PawPrint size={14} color="currentColor" className="mr-1.5 opacity-70" />
              Book Now
            </Button>
            <Button variant="outline" className="px-10 py-3 text-sm border-2 border-white text-white hover:bg-white hover:text-foreground bg-transparent uppercase tracking-widest font-oswald font-bold">
              Contact Us
            </Button>
        </div>
      </div>
    </div>
  );
};
