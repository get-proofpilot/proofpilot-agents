import React from 'react';
import { Button } from './UI';
import { ArrowRight } from 'lucide-react';

export const CashBackBanner: React.FC = () => {
  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-state48-blue-dark rounded-2xl border-4 border-slate-900 shadow-brutal p-6 md:p-8 relative overflow-hidden grunge-overlay-subtle">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Left: Badge + Text */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              {/* Cash Badge */}
              <div className="bg-white rounded-xl p-4 flex items-center justify-center shrink-0 shadow-lg">
                <div className="text-center">
                  <div className="text-state48-blue text-xs font-bold opacity-80">UP TO</div>
                  <div className="text-3xl md:text-4xl font-black text-state48-blue tracking-tight leading-none">$300</div>
                  <div className="text-state48-blue text-xs font-bold opacity-80">CASH BACK</div>
                </div>
              </div>
              
              {/* Text Content */}
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="bg-state48-gold text-slate-900 px-3 py-1 text-xs font-black rounded tracking-wide">
                    Limited Time Offer
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Get Cash Back On Your Windshield Replacement
                </h2>
                <p className="text-white/70 text-sm font-medium mt-1">
                  100% legal under Arizona law • Won't raise your rates • Paid same-day
                </p>
              </div>
            </div>
            
            {/* Right: CTA */}
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
              className="!bg-white !text-state48-blue hover:!bg-white/90 shadow-lg shrink-0 whitespace-nowrap font-black"
            >
              Claim Cash Back <ArrowRight size={18} />
            </Button>
            
          </div>
        </div>
      </div>
    </section>
  );
};
