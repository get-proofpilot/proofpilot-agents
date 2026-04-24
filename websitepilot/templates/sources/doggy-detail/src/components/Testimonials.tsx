import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, image }: { quote: string, author: string, image: string }) => (
  <div className="bg-card p-8 border border-border h-full flex flex-col relative">
    {/* Red accent */}
    <div className="absolute top-0 left-0 w-1 h-16 bg-racing-red"></div>
    
    <div className="flex justify-between items-start mb-6">
      <div className="text-racing-red">
        <Quote size={32} />
      </div>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="w-2 h-2 bg-racing-red rotate-45"></div>
        ))}
      </div>
    </div>
    <p className="text-muted-foreground italic text-base mb-8 leading-relaxed flex-grow">
      "{quote}"
    </p>
    <div className="flex items-center gap-4 mt-auto">
      <div className="w-14 h-14 overflow-hidden">
        <img src={image} alt={author} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="font-oswald font-bold uppercase text-foreground text-sm tracking-wide">{author}</p>
        <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest">Verified Customer</p>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <div className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-racing-red font-oswald uppercase tracking-[0.3em] text-sm mb-3">Testimonials</p>
          <h2 className="text-foreground text-4xl md:text-5xl font-oswald font-bold uppercase mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-foreground"></div>
            <div className="w-2 h-2 bg-racing-red rotate-45"></div>
            <div className="h-px w-12 bg-foreground"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          <TestimonialCard 
            quote="The best grooming experience we've ever had. Our goldendoodle looks amazing every time."
            author="Sarah M."
            image="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop"
          />
          <TestimonialCard 
            quote="Love the self-wash option! Clean facility, friendly staff, and my dog actually enjoys it."
            author="Mike R."
            image="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop"
          />
          <TestimonialCard 
            quote="The Club membership pays for itself. We come every week and the savings add up."
            author="Jennifer L."
            image="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1000&auto=format&fit=crop"
          />
        </div>
      </div>
    </div>
  );
};
