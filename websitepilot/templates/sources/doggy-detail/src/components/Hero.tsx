import React, { useState } from 'react';
import { Button } from './ui/button';
import { BookingDialog } from './BookingDialog';
import dryerIcon from '@/assets/dryer-icon.svg';
import scissorsIcon from '@/assets/scissors-icon.svg';
import shampooIcon from '@/assets/shampoo-icon.svg';
import patternRed from '@/assets/pattern-red.jpg';

const services = [
  {
    icon: dryerIcon,
    title: "Self Wash",
    description: "Private tubs. You wash. We clean up. Everything you need provided.",
    link: "#self-wash-process",
    cta: "Try Self Wash"
  },
  {
    icon: scissorsIcon,
    title: "Full Grooming",
    description: "Professional grooming by certified stylists. Bath, cut, and style.",
    link: "#pricing",
    cta: "Book Grooming"
  },
  {
    icon: shampooIcon,
    title: "The Club",
    description: "Unlimited washes. Member discounts.",
    link: "#club",
    cta: "Join The Club"
  }
];

export const Hero: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Section */}
      <div className="relative h-[480px] md:h-[520px] lg:h-[560px] w-full">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop" 
          alt="Happy Golden Retriever Grooming" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>

        {/* Content Container */}
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col items-center justify-center text-center">
          
          <h1 className="animate-fade-in-up text-4xl md:text-6xl lg:text-7xl font-oswald font-bold text-white uppercase leading-[0.95] mb-8 drop-shadow-2xl tracking-wide">
            Your Dog Deserves<br/>The Detail
          </h1>
          
          <div className="animate-fade-in-up delay-200 flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="px-10 py-3 text-sm min-w-[160px] uppercase tracking-widest font-oswald font-bold" onClick={() => setBookingOpen(true)}>
              Book Now
            </Button>
            <Button variant="outline" className="px-10 py-3 text-sm border-2 border-white text-white hover:bg-white hover:text-foreground min-w-[160px] bg-transparent uppercase tracking-widest font-oswald font-bold">
              Try Self Wash
            </Button>
          </div>
        </div>
      </div>

      {/* Red Pattern Bar with Service Cards */}
      <div className="relative py-14 md:py-20">
        {/* Pattern background */}
        <div 
          className="absolute inset-0 bg-racing-red"
          style={{
            backgroundImage: `url(${patternRed})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Service Cards - Overlapping the red bar */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-28 md:-mt-36">
            {services.map((service, index) => (
              <a 
                key={index}
                href={service.link}
                className="bg-card p-8 md:p-10 text-center transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Icon */}
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-5 flex items-center justify-center">
                  <img src={service.icon} alt={service.title} className="w-full h-full object-contain" />
                </div>
                
                {/* Title */}
                <h3 className="font-oswald font-bold text-xl md:text-2xl uppercase mb-3 text-foreground tracking-wide">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {service.description}
                </p>
                
                {/* CTA */}
                <span className="inline-flex items-center gap-2 font-oswald uppercase text-xs tracking-widest text-racing-red font-bold group-hover:gap-3 transition-all">
                  {service.cta} 
                  <span className="text-lg">→</span>
                </span>
                
                {/* Bottom accent line */}
                <div className="h-1 w-0 group-hover:w-full bg-racing-red mx-auto mt-5 transition-all duration-300"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};
