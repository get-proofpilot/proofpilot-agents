import React from 'react';
import { Wind, Scissors, Bone, Heart, Droplets, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { PawPrint } from './PawPrint';

export const DeserveMore: React.FC = () => {
  return (
    <div id="about" className="py-24 bg-card overflow-hidden scroll-mt-20 relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
          {/* Left Column: Image with Geometric Accent */}
          <div className="w-full lg:w-1/2 relative">
             {/* Decorative geometric element */}
             <div className="absolute -left-4 -top-4 w-24 h-24 border-2 border-racing-red hidden lg:block"></div>
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-racing-red hidden lg:block"></div>
             
             <div className="relative aspect-square overflow-hidden z-10">
                 <img 
                    src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop" 
                    alt="Dog Grooming" 
                    className="w-full h-full object-cover"
                 />
             </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-racing-red font-oswald uppercase tracking-[0.3em] text-sm mb-3">Full Service</p>
            <h2 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-oswald font-bold uppercase leading-[0.95] mb-6">
              More Than Just a Bath
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-10">
              Every Full Service Bath includes house shampoo and conditioner, blow dry, brush out, ear cleaning, teeth brushing, nail trim, and our signature Doggy Cologne finish. Grooming appointments add a precision haircut for your breed.
            </p>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mb-10">
                {[
                    { icon: Droplets, label: "Bath" },
                    { icon: Wind, label: "Blow Dry" },
                    { icon: Sparkles, label: "Brush Out" },
                    { icon: Heart, label: "Ear Clean" },
                    { icon: Bone, label: "Teeth Brush" },
                    { icon: Scissors, label: "Nail Trim" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 border border-foreground flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-white transition-colors duration-300">
                            <item.icon size={18} strokeWidth={1.5} />
                        </div>
                        <span className="font-oswald uppercase text-sm font-medium tracking-wide">{item.label}</span>
                    </div>
                ))}
            </div>
            <Button variant="secondary" className="px-10 py-3 text-sm uppercase tracking-widest group">
              <PawPrint size={14} color="white" className="mr-1.5 opacity-70" />
              View Full Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
