import React from 'react';
import { Button, SectionHeading } from './UI';
import { CheckCircle2, Car, CircleDot, Truck, Shield, Wrench, Clock } from 'lucide-react';

const coreServices = [
  {
    title: "Windshield Replacement",
    icon: Car,
    description: "Complete windshield replacement using OEM-quality glass. We handle all makes and models, including rare and hard-to-find windshields."
  },
  {
    title: "Chip & Crack Repair",
    icon: CircleDot,
    description: "Quick repairs for small chips and cracks to prevent further damage. Most repairs take less than 30 minutes."
  },
  {
    title: "Insurance Claims",
    icon: Shield,
    description: "We work with ALL Arizona insurance companies. In most cases, your windshield is fully covered. We handle the entire claims process for you."
  },
  {
    title: "Mobile Service",
    icon: Truck, 
    description: "Can't come to us? We'll come to you! Our mobile technicians provide the same quality service at your home or office."
  },
  {
    title: "Back & Side Glass",
    icon: Wrench,
    description: "Complete replacement services for rear windshields, side windows, quarter glass, and vent windows."
  },
  {
    title: "Same Day Service",
    icon: Clock,
    description: "Need it done fast? We offer same-day appointments for most vehicles. Quick turnaround without compromising quality."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* PART 1: CORE SERVICES */}
        <div className="mb-20 md:mb-40">
           <div className="text-center mb-12 md:mb-20">
              <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Our Services</span>
              <SectionHeading 
                title={<span>Auto Glass Services in <span className="text-primary">Arizona</span></span>} 
                subtitle=""
                center 
              />
              <p className="max-w-4xl mx-auto text-slate-800 text-lg md:text-2xl font-medium leading-relaxed px-2">
                As Arizona's leader in automotive glass, we use only the highest quality materials and innovative technology. From small chip repairs to complete windshield replacements, we've got you covered.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {coreServices.map((service, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 group hover:border-primary">
               <div className="w-14 h-14 md:w-16 md:h-16 bg-state48-blue-light text-primary rounded-xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon size={28} className="md:w-8 md:h-8" strokeWidth={2} />
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight">{service.title}</h3>
                   <p className="text-slate-700 font-medium leading-relaxed text-base md:text-lg">
                     {service.description}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* PART 2: WHY INSURANCE SECTION */}
        <div className="bg-surface-dark rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-20 relative overflow-hidden text-white grunge-overlay-dark">
           <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              
              <div>
                <span className="bg-primary text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Insurance Claims</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black mb-6 md:mb-8 tracking-tight">
                  We Work With <span className="text-primary">ALL</span> Insurance Companies
                </h2>
                <p className="text-slate-300 font-medium text-lg md:text-xl leading-relaxed mb-8">
                  In most cases, your windshield is fully covered by your insurance company. We work closely with all of Arizona's major insurance companies and will help assist you through the entire process.
                </p>
                <Button variant="primary" size="lg" className="shadow-xl">
                  File An Insurance Claim
                </Button>
              </div>

              <div className="space-y-6">
                {[
                  "State Farm",
                  "Geico",
                  "Progressive",
                  "Allstate",
                  "USAA",
                  "Farmers Insurance",
                  "Liberty Mutual",
                  "And Many More..."
                ].map((company, i) => (
                  <div key={i} className="flex items-center gap-4">
                     <CheckCircle2 className="text-primary shrink-0" size={24} strokeWidth={3} />
                     <span className="text-lg md:text-xl font-bold text-white">{company}</span>
                  </div>
                ))}
              </div>

           </div>
        </div>
      </div>
    </section>
  );
};