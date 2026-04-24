import React from 'react';
import { Button } from './ui/button';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import grassDivider from '@/assets/grass-divider-natural.svg';

export const Locations: React.FC = () => {
  return (
    <div id="contact" className="bg-card scroll-mt-20 relative overflow-hidden">
      {/* Background Grass - full width section divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 h-20 overflow-hidden">
        <img
          src={grassDivider}
          alt=""
          className="w-full h-full opacity-55"
          aria-hidden="true"
        />
      </div>
      
      <div className="py-24 pb-32 relative z-10">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-racing-red font-oswald uppercase tracking-[0.3em] text-sm mb-3">Find Us</p>
            <h2 className="text-foreground text-4xl md:text-5xl font-oswald font-bold uppercase mb-4">
              Visit Our Location
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-foreground"></div>
              <div className="w-2 h-2 bg-racing-red rotate-45"></div>
              <div className="h-px w-12 bg-foreground"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-5xl mx-auto overflow-hidden border border-border">
              
              {/* Left: Map */}
              <div className="h-[350px] lg:h-auto bg-muted w-full relative min-h-[400px]">
                   <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.7857506957857!2d-117.68188130000001!3d33.6367968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce9ba9ab230d9%3A0x625ac074e98dc994!2sBubbly%20Paws!5e0!3m2!1sen!2sus!4v1769630780312!5m2!1sen!2sus"
                      width="100%" 
                      height="100%" 
                      style={{border:0}} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map to The Doggy Detail"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
              </div>

              {/* Right: Info */}
              <div className="flex flex-col justify-center space-y-8 p-10 lg:p-14 bg-background">
                  
                  {/* Phone */}
                  <div>
                      <a href="tel:949-298-6170" className="flex items-center gap-5 group">
                          <div className="w-12 h-12 bg-foreground flex items-center justify-center text-white flex-shrink-0 group-hover:bg-racing-red transition-colors">
                              <Phone size={20} />
                          </div>
                          <div>
                               <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-1">Call Us</p>
                               <span className="text-2xl md:text-3xl font-oswald font-bold text-foreground group-hover:text-racing-red transition-colors">949-298-6170</span>
                          </div>
                      </a>
                  </div>

                  {/* Address */}
                  <div className="flex gap-5 items-start">
                       <div className="w-12 h-12 bg-foreground flex items-center justify-center text-white flex-shrink-0">
                          <MapPin size={20} />
                      </div>
                      <div>
                          <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-1">Address</p>
                          <p className="text-xl md:text-2xl font-bold text-foreground font-oswald uppercase mb-1">22421 El Toro Road, Suite F</p>
                          <p className="text-xl md:text-2xl font-bold text-foreground font-oswald uppercase">Lake Forest, CA 92630</p>
                      </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-5 items-start">
                       <div className="w-12 h-12 bg-foreground flex items-center justify-center text-white flex-shrink-0">
                          <Clock size={20} />
                      </div>
                      <div>
                           <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mb-1">Hours</p>
                           <p className="text-xl md:text-2xl font-bold text-foreground font-oswald uppercase">Mon – Fri: 10am – 7pm</p>
                           <p className="text-xl md:text-2xl font-bold text-foreground font-oswald uppercase">Sat – Sun: 10am – 5pm</p>
                      </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                      <Button variant="secondary" className="px-6 py-3 flex items-center gap-2 text-xs uppercase tracking-widest">
                          Get Directions <Navigation size={14} />
                      </Button>
                  </div>

              </div>

          </div>
        </div>
      </div>
    </div>
  );
};
