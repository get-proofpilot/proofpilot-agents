import React from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { PawPrint } from './PawPrint';
import patternRed from '@/assets/pattern-red.jpg';

export const ClubMembership: React.FC = () => {
  return (
    <div id="club" className="relative py-24 scroll-mt-20 overflow-hidden">
      {/* Red pattern background */}
      <div 
        className="absolute inset-0 bg-racing-red"
        style={{
          backgroundImage: `url(${patternRed})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-white/80 font-oswald uppercase tracking-[0.3em] text-sm mb-3">Membership</p>
          <h2 className="text-4xl md:text-6xl font-oswald font-bold uppercase text-white mb-4">
            Join The Club
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-white/30"></div>
            <div className="w-2 h-2 bg-white rotate-45"></div>
            <div className="h-px w-12 bg-white/30"></div>
          </div>
          <p className="text-white/80 font-sans mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            A premium membership for the distinguished dog. Unlimited self washes and member discounts on everything else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          {/* Pricing Card 1 */}
          <div className="bg-card text-foreground p-10 flex flex-col items-center text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-foreground"></div>
            <h4 className="font-oswald font-bold text-xl uppercase mb-1 tracking-wide">Small Dogs</h4>
            <p className="text-xs text-muted-foreground mb-6 font-medium tracking-wider uppercase">Up to 50 lbs</p>
            <div className="text-6xl font-oswald font-bold text-racing-red mb-1">$34</div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">per month</span>
          </div>

          {/* Pricing Card 2 */}
          <div className="bg-card text-foreground p-10 flex flex-col items-center text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-foreground"></div>
            <h4 className="font-oswald font-bold text-xl uppercase mb-1 tracking-wide">Big Dogs</h4>
            <p className="text-xs text-muted-foreground mb-6 font-medium tracking-wider uppercase">Over 50 lbs</p>
            <div className="text-6xl font-oswald font-bold text-racing-red mb-1">$38</div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">per month</span>
          </div>
        </div>

        {/* Benefits List */}
        <div className="max-w-3xl mx-auto mb-12 bg-white/95 backdrop-blur-sm p-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "Unlimited self washes",
              "10% off grooming services",
              "20% off retail items",
              "30% off shampoo upgrades"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-foreground text-base">
                <div className="w-6 h-6 bg-racing-red flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Button variant="secondary" className="bg-foreground text-white hover:bg-white hover:text-foreground px-14 py-4 text-base uppercase tracking-widest group">
            <PawPrint size={16} color="currentColor" className="mr-2 opacity-70" />
            Become a Member
          </Button>
        </div>
      </div>
    </div>
  );
};
