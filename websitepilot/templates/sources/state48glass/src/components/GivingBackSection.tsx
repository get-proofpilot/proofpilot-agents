import React from 'react';
import { Heart, Building2, Users, Sparkles } from 'lucide-react';
import { Button } from './UI';

export const GivingBackSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-state48-blue to-state48-navy relative overflow-hidden grunge-overlay-subtle">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Side */}
          <div className="text-white">
            <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">
              Giving Back
            </span>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
              Every Windshield <br/>
              <span className="text-state48-sky">Saves Lives</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 font-medium mb-6 leading-relaxed">
              At State 48 Glass, we believe in doing more than just fixing windshields. We believe in making a difference in our community.
            </p>
            
            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
              That's why we proudly donate a portion of every windshield replacement to <strong className="text-white">Phoenix Children's Hospital</strong>. When you choose State 48 Glass, you're not just getting a new windshield — you're helping sick children in Arizona receive the care they need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="white" 
                size="lg"
                onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-state48-blue hover:bg-blue-50 font-bold"
              >
                Get a Quote & Give Back
              </Button>
              <a 
                href="https://www.phoenixchildrens.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-bold hover:text-state48-sky transition-colors"
              >
                Learn About PCH
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                  <Heart className="text-red-500" size={32} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Phoenix Children's Hospital</h3>
                  <p className="text-slate-600 font-medium">Our Proud Partner</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-state48-blue-light rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Arizona's Leading Children's Hospital</h4>
                    <p className="text-slate-600 text-sm">Phoenix Children's provides world-class care to kids across the Southwest.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-state48-blue-light rounded-xl flex items-center justify-center shrink-0">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Supporting Families in Need</h4>
                    <p className="text-slate-600 text-sm">Your windshield replacement helps families who need it most.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-state48-blue-light rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Making a Difference Together</h4>
                    <p className="text-slate-600 text-sm">Every windshield contributes to life-saving care and research.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-center text-slate-700 font-medium">
                  <span className="text-primary font-black text-lg">Thank you</span> for choosing State 48 Glass and helping us give back to Arizona's children.
                </p>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -top-4 -right-4 bg-state48-gold text-state48-navy rounded-2xl p-4 shadow-lg rotate-3 hidden md:block">
              <Heart className="mx-auto mb-1" size={24} fill="currentColor" />
              <p className="font-black text-sm">We Care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
