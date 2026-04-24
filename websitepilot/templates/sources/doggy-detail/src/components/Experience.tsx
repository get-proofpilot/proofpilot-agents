import React from 'react';
import { ArrowRight } from 'lucide-react';

const Card = ({ title, description, image, link }: { title: string, description: string, image: string, link: string }) => (
  <a href={link} className="group flex flex-col bg-card overflow-hidden h-full border border-border hover:border-foreground transition-all duration-300">
    {/* Image Section */}
    <div className="h-56 overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {/* Red accent bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-racing-red"></div>
    </div>
    
    {/* Content Section */}
    <div className="p-8 flex flex-col flex-grow bg-card">
         <h3 className="text-xl font-oswald font-bold uppercase mb-3 text-foreground tracking-wide">
            {title}
         </h3>
         <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6 flex-grow">
            {description}
         </p>
         <div className="mt-auto flex items-center text-racing-red font-bold font-oswald uppercase text-xs tracking-widest gap-2 group-hover:gap-3 transition-all">
            Learn More <ArrowRight size={14} />
         </div>
    </div>
  </a>
);

export const Experience: React.FC = () => {
  return (
    <div id="services" className="py-24 bg-background relative z-10 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-racing-red font-oswald uppercase tracking-[0.3em] text-sm mb-3">Our Services</p>
          <h2 className="text-foreground text-4xl md:text-5xl font-oswald font-bold uppercase mb-4">
            Three Ways to a Clean Pup
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-foreground"></div>
            <div className="w-2 h-2 bg-racing-red rotate-45"></div>
            <div className="h-px w-12 bg-foreground"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          <Card 
            title="Self Wash" 
            description="Private tubs. You wash. We clean up. Everything you need provided."
            image="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000&auto=format&fit=crop"
            link="#self-wash-process"
          />
          <Card 
            title="Full Grooming" 
            description="Expert cuts for every breed by certified professional groomers."
            image="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1000&auto=format&fit=crop"
            link="#pricing" 
          />
          <Card 
            title="The Club" 
            description="Join our exclusive community. Members save on every visit, retail, and more."
            image="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop"
            link="#club" 
          />
        </div>
      </div>
    </div>
  );
};
