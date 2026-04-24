import React from 'react';
import { Button, PlaceholderImage } from './UI';
import { Star, ArrowRight, Camera, Waves } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-white pt-20 md:pt-32 pb-0 overflow-hidden font-sans">
      
      {/* Handwritten Arrow (absolute) - Hidden on mobile */}
      <div className="hidden lg:block absolute left-[5%] top-56 z-10">
        <div className="text-[#06b6d4] font-handwriting text-lg font-bold text-center leading-tight transform -rotate-6">
          <span className="block mb-1">Experience the</span>
          <span className="block">Difference!</span>
          <svg className="w-12 h-12 mx-auto mt-0 transform rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M10,10 Q50,50 80,80" />
            <path d="M70,80 L80,80 L80,70" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center px-4 mb-12 md:mb-16 relative z-10">
        {/* Reviews Badge */}
        <div className="flex justify-center mb-8 md:mb-10">
            <div className="bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white rounded px-4 py-2.5 flex items-center gap-3 shadow-xl shadow-cyan-200/50 transform hover:-translate-y-1 transition-transform cursor-default border border-white/20">
                <div className="bg-white rounded-full p-1.5 shadow-sm flex items-center justify-center">
                    {/* Google G Logo */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>
                <div className="flex flex-col items-start pr-1 leading-none gap-1.5">
                    <div className="flex text-yellow-300 gap-[2px]">
                        {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <span className="text-[11px] font-bold tracking-wide opacity-95">Top Rated in Wendell</span>
                </div>
            </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 leading-[0.95] mb-6 tracking-tighter max-w-5xl mx-auto">
          Pool Cleaning Service in <span className="text-[#06b6d4] inline-block relative">Wendell, NC</span>
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-slate-700 mb-8 md:mb-10 max-w-5xl mx-auto leading-tight tracking-tight">
          Making Pool Ownership Carefree & Enjoyable As Possible.
        </h2>
        
        <p className="text-slate-800 font-medium text-lg md:text-2xl max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed px-2">
          We don't just keep it blue; we ensure longevity. Serving Raleigh, Wake Forest, Cary and surrounding areas, ProActive Pool Solutions goes deeper than looks to ensure your water is non-corrosive, safe, and your equipment lasts.
        </p>

        <Button size="lg" className="w-full md:w-auto mx-auto shadow-2xl shadow-[#06b6d4]/30 hover:shadow-[#06b6d4]/50 text-lg px-8 md:px-12 py-5 md:py-6 font-black tracking-wide">
            Get Your Price Now <ArrowRight size={22} strokeWidth={3} />
        </Button>
      </div>

      {/* Image Strip Container */}
      <div className="relative w-full mt-8 md:mt-12"> 
         
         {/* Top Wave Divider */}
         <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-none z-20">
             <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px] fill-[#06b6d4]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                 <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
             </svg>
         </div>

         {/* The Scrolling Strip Background */}
         <div className="w-full bg-[#06b6d4] pt-12 md:pt-16 pb-52 md:pb-72 relative shadow-inner overflow-hidden">
             
             {/* Background Pattern */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                </svg>
             </div>

             {/* Scrolling Images - Designed Placeholders */}
             <div className="w-full overflow-hidden flex relative z-20">
                <div className="flex animate-scroll gap-4 md:gap-6 px-4 md:px-8">
                    {[...Array(10)].map((_, idx) => (
                    <div key={idx} className="flex-shrink-0 w-56 md:w-96 h-40 md:h-60 rounded-2xl overflow-hidden border-[6px] border-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] relative">
                        <PlaceholderImage 
                           icon={idx % 2 === 0 ? Waves : Camera} 
                           subLabel={`Portfolio ${idx + 1}`} 
                        />
                    </div>
                    ))}
                </div>
             </div>
             
         </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 80s linear infinite;
        }
      `}</style>
    </section>
  );
};