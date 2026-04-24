import React from 'react';
import { Button, SectionHeading } from './UI';
import { CheckCircle2, Droplets, Wrench, Sparkles, Waves, ClipboardCheck } from 'lucide-react';

const coreServices = [
  {
    title: "Pool Cleaning & Vacuuming",
    icon: Waves,
    description: "Meticulous skimming, vacuuming, and brushing to keep your pool surface pristine and debris-free."
  },
  {
    title: "Chemical Balancing",
    icon: Droplets,
    description: "Precise testing of 5 parameters (pH, Chlorine, Alkalinity, Calcium, Stabilizer) to prevent corrosion and ensure safety."
  },
  {
    title: "Equipment Repair",
    icon: Wrench,
    description: "Expert diagnostics and repairs for pumps, motors, filters, heaters, and salt systems by certified technicians."
  },
  {
    title: "Filter Maintenance",
    icon: Wrench, 
    description: "Regular backwashing and deep cleaning of DE, Cartridge, and Sand filters to maintain optimal water clarity and flow."
  },
  {
    title: "Green-to-Clean",
    icon: Sparkles,
    description: "Specialized algae treatment to transform neglected, swampy pools back into sparkling, safe swimming environments."
  },
  {
    title: "Pool Inspections",
    icon: ClipboardCheck,
    description: "Comprehensive evaluations of pool health, safety compliance, and equipment condition for new homeowners."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* PART 1: CORE SERVICES (Keywords) */}
        <div className="mb-20 md:mb-40">
           <div className="text-center mb-12 md:mb-20">
              <span className="bg-[#06b6d4] text-white px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide shadow-sm">Our Expertise</span>
              <SectionHeading 
                title={<span>Pool Services in <span className="text-[#06b6d4]">Wendell, NC</span></span>} 
                subtitle=""
                center 
              />
              <p className="max-w-4xl mx-auto text-slate-800 text-lg md:text-2xl font-medium leading-relaxed px-2">
                We don't just skim the top. ProActive Pool Solutions offers a full suite of professional services designed to cover every aspect of your pool's health, from water chemistry to mechanical repairs.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {coreServices.map((service, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 group hover:border-[#06b6d4]">
                   <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-50 text-[#06b6d4] rounded-xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-[#06b6d4] group-hover:text-white transition-colors">
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

        {/* PART 2: MAINTENANCE PACKAGES */}
        <div className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-20 relative overflow-hidden text-white">
           {/* Background Pattern */}
           <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <svg width="600" height="600" viewBox="0 0 200 200">
                <path d="M40,0 C100,0 100,100 200,100 L200,0 Z" fill="currentColor" />
              </svg>
           </div>

           <div className="text-center mb-12 md:mb-20 relative z-10">
              <span className="bg-white/10 text-[#22d3ee] px-4 py-1.5 text-sm font-black rounded mb-6 inline-block tracking-wide border border-white/20">Recurring Care</span>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-heading font-black mb-6 md:mb-8 tracking-tight">
                Maintenance <span className="text-[#22d3ee]">Packages</span>
              </h2>
              <p className="max-w-3xl mx-auto text-slate-300 font-medium text-lg md:text-xl leading-relaxed">
                Consistent care is the key to longevity. Choose the plan that fits your lifestyle.
                <br/>
                <span className="text-sm md:text-base mt-4 block opacity-70 font-normal">*All recurring plans start with a comprehensive Initial Visit to ensure your pool is baseline ready.*</span>
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto relative z-10">
              
              {/* Weekly Plan */}
              <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border-[6px] border-[#06b6d4] transform hover:-translate-y-2 transition-transform duration-300 relative">
                  <div className="bg-[#06b6d4] text-white text-center py-3 text-xs md:text-sm font-black tracking-widest">Most Popular • Carefree Choice</div>
                  <div className="p-8 md:p-14">
                      <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Weekly Maintenance</h3>
                      <p className="text-slate-600 font-bold mb-8 md:mb-10 text-lg md:text-xl">The Ultimate Hands-Off Experience</p>
                      
                      <p className="text-slate-800 mb-8 md:mb-10 leading-relaxed text-base md:text-lg font-medium">
                        We visit every week to handle everything. You simply enjoy the water. Perfect for busy homeowners who want a pristine pool without lifting a finger.
                      </p>

                      <div className="space-y-4 md:space-y-5 mb-8 md:mb-12">
                        {[
                          "Brush waterline tile & walls",
                          "Vacuum floor & remove all debris",
                          "Empty skimmer & pump baskets",
                          "Test & Balance all 5 chemical levels",
                          "Backwash filter as needed",
                          "Equipment safety check"
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 md:gap-4">
                             <CheckCircle2 className="text-[#06b6d4] shrink-0 mt-1" size={20} strokeWidth={3} />
                             <span className="text-base md:text-lg font-bold text-slate-800">{item}</span>
                          </div>
                        ))}
                      </div>

                      <Button variant="primary" className="w-full py-5 md:py-6 text-lg md:text-xl shadow-none hover:shadow-lg font-black">Get Weekly Price</Button>
                  </div>
              </div>

              {/* Bi-Weekly Plan */}
              <div className="bg-slate-800 text-white rounded-3xl overflow-hidden shadow-xl border-2 border-slate-700 hover:border-[#06b6d4] transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-center py-3 text-xs md:text-sm font-black tracking-widest opacity-50">Budget Friendly</div>
                  <div className="p-8 md:p-14">
                      <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Bi-Weekly Maintenance</h3>
                      <p className="text-slate-400 font-bold mb-8 md:mb-10 text-lg md:text-xl">The Shared Responsibility Plan</p>
                      
                      <p className="text-slate-300 mb-8 md:mb-10 leading-relaxed text-base md:text-lg font-medium">
                        We visit every other week. A great cost-saving option if you're willing to empty baskets and skim debris on the off-weeks.
                      </p>

                      <div className="space-y-4 md:space-y-5 mb-8 md:mb-12">
                        {[
                          "All Weekly Cleaning Services included",
                          "Chemical Balancing included",
                          "Equipment Checks included",
                          "Visit Every Other Week",
                          "Requires homeowner interim care",
                          "Best for low-debris pools (screened)"
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 md:gap-4">
                             <CheckCircle2 className="text-slate-500 shrink-0 mt-1" size={20} strokeWidth={3} />
                             <span className="text-base md:text-lg font-bold text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full py-5 md:py-6 text-lg md:text-xl border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 font-black">Get Bi-Weekly Price</Button>
                  </div>
              </div>

           </div>
        </div>
      </div>
    </section>
  );
};