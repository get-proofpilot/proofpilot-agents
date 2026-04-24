import React from 'react';
import { MapPin, ArrowRight, ArrowUpRight, Star, CheckCircle2 } from 'lucide-react';
import { Button } from './UI';

const cities = [
  "Phoenix", "Scottsdale", "Mesa", "Tempe",
  "Chandler", "Gilbert", "Glendale", "Peoria",
  "Surprise", "Goodyear", "Avondale", "Cave Creek",
  "Queen Creek", "Apache Junction", "Sun City", "Fountain Hills",
  "Paradise Valley", "Buckeye", "Litchfield Park", "El Mirage"
];

const highlights = [
  "Free mobile service to your location",
  "Same-day appointments available",
  "We cover all of Maricopa County",
  "No extra charge for mobile visits"
];

export const ServiceAreas: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Service Areas</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[0.95]">
            Serving Phoenix & <span className="text-primary">All of Arizona</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-3xl mx-auto leading-relaxed">
            State 48 Glass provides mobile windshield replacement throughout the Phoenix metro area. We come to your home, office, or any location that's convenient for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Cities Grid + Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">
              Cities We Serve
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 md:gap-y-5 gap-x-2 md:gap-x-4 mb-10">
              {cities.map((city, idx) => (
                <div key={idx} className="flex items-center gap-2 md:gap-3 text-slate-800 font-bold text-sm md:text-base hover:text-primary transition-colors cursor-default">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-primary">
                    <MapPin size={14} className="md:w-4 md:h-4 opacity-20" fill="currentColor" strokeWidth={2.5} />
                    <MapPin size={14} className="md:w-4 md:h-4 absolute" strokeWidth={2.5} />
                  </div>
                  {city}
                </div>
              ))}
              <div className="flex items-center gap-2 md:gap-3 text-primary font-bold text-sm md:text-base italic col-span-2 sm:col-span-1">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <MapPin size={14} className="md:w-4 md:h-4" strokeWidth={2.5} />
                </div>
                + All of Arizona
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm mb-8">
              <h4 className="font-black text-slate-900 mb-4 text-lg">Mobile Service Benefits</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-primary shrink-0" size={18} />
                    <span className="text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-primary hover:bg-state48-blue-dark text-white shadow-lg px-8 py-4 text-base font-bold"
              >
                Get a Free Quote <ArrowUpRight size={20} className="ml-2" strokeWidth={3} />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-slate-900 text-slate-900 hover:bg-slate-50 px-8 py-4 text-base font-bold"
              >
                Learn More <ArrowRight size={20} className="ml-2" strokeWidth={3} />
              </Button>
            </div>
          </div>

          {/* Right: Map */}
          <div className="relative">
            <div className="h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-slate-200 relative bg-slate-100 group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425345.7435385753!2d-112.40401880605469!3d33.60565099414948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed50a179cb%3A0x8c69c7f8354a1bac!2sPhoenix%2C%20AZ!5e0!3m2!1sen!2sus!4v1701600000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
              ></iframe>

              {/* Floating Location Card */}
              <div className="absolute top-6 left-6 bg-white p-5 rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] max-w-[240px] z-10 border border-slate-100 hidden sm:block">
                <h4 className="font-black text-slate-900 text-lg mb-2 leading-tight">State 48 Glass</h4>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="font-black text-sm text-slate-700">5.0</span>
                  <div className="flex text-[#fbbf24] text-xs gap-[1px]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 ml-1 font-bold">(Google)</span>
                </div>
                <span className="text-primary text-sm font-black">Serving All of Arizona</span>
              </div>
            </div>

            {/* Bottom note */}
            <p className="text-center text-slate-500 text-sm mt-4 font-medium">
              Don't see your city? We still come to you! Contact us for service anywhere in Arizona.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
