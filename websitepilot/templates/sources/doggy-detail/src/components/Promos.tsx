import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import brandHydrant from '@/assets/brand-hydrant.png';
import logoPrimary from '@/assets/logo-primary.svg';
export const Promos: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when section enters view, 1 when it leaves
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      
      // Subtle rotation: -8deg to +8deg as you scroll through
      setRotation((progress - 0.5) * 16);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="about" ref={sectionRef} className="py-24 bg-background relative scroll-mt-20 overflow-hidden">
      {/* Top right fire hydrant with scroll rotation */}
      <div 
        className="absolute top-8 right-0 translate-x-1/3 pointer-events-none hidden lg:block transition-transform duration-100 ease-out"
        style={{ transform: `translateX(33%) rotate(${rotation}deg)` }}
      >
        <img src={brandHydrant} alt="" className="w-[260px] h-auto" aria-hidden="true" />
      </div>
      
      {/* Bottom left fire hydrant with opposite scroll rotation */}
      <div 
        className="absolute bottom-8 left-0 -translate-x-1/3 pointer-events-none hidden lg:block transition-transform duration-100 ease-out"
        style={{ transform: `translateX(-33%) rotate(${-rotation}deg)` }}
      >
        <img src={brandHydrant} alt="" className="w-[200px] h-auto" aria-hidden="true" />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-20">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-racing-red font-oswald uppercase tracking-[0.3em] text-sm mb-3">Who We Are</p>
          <h2 className="text-foreground text-4xl md:text-5xl font-oswald font-bold uppercase mb-4">
            About Us
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-foreground"></div>
            <div className="w-2 h-2 bg-racing-red rotate-45"></div>
            <div className="h-px w-12 bg-foreground"></div>
          </div>
        </div>
        
        {/* Card: Family (Image Left) - Collage style */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 bg-foreground flex items-center justify-center aspect-[4/3] p-12">
              <img 
                src={logoPrimary} 
                alt="The Doggy Detail" 
                className="w-full max-w-[280px] h-auto brightness-0 invert"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-racing-red -z-10 hidden lg:block"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl md:text-4xl font-oswald font-bold uppercase mb-6 text-foreground leading-tight">
              Family Owned.<br/>Pet Obsessed.
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We are a family-owned business with a friendly team and professional groomers here to serve you.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-racing-red font-bold font-oswald uppercase text-sm tracking-wider hover:gap-3 transition-all group">
              Meet the Family 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
