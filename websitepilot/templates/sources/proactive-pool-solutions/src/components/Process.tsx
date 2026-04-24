import React from 'react';
import { SectionHeading, PlaceholderImage } from './UI';
import { StepItem } from '../types';
import { Phone, ClipboardCheck, FileText, Smile } from 'lucide-react';

const steps: StepItem[] = [
  {
    number: "01",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-[#06b6d4] text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">Reach</span> <span className="text-slate-900">Out To Us</span></span>,
    description: "Click 'Get Your Price Now' and tell us a little about your pool. We'll get back to you instantly with options.",
    icon: Phone
  },
  {
    number: "02",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-[#06b6d4] text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">Initial</span> <span className="text-slate-900">Pool Visit</span></span>,
    description: "We perform a detailed evaluation of your surface, equipment, and water chemistry to ensure your pool is ready for routine care.",
    icon: ClipboardCheck
  },
  {
    number: "03",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-[#06b6d4] text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">ProActive</span> <span className="text-slate-900">Plan Selection</span></span>,
    description: "Choose between our comprehensive Weekly or cost-effective Bi-Weekly maintenance plans tailored to your needs.",
    icon: FileText
  },
  {
    number: "04",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-[#06b6d4] text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">Carefree</span> <span className="text-slate-900">Enjoyment</span></span>,
    description: "Relax. We handle the chemicals, cleaning, and equipment checks so you can focus on fun and relaxation.",
    icon: Smile
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20 md:mb-32">
            <span className="bg-[#06b6d4] text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 inline-block tracking-wide shadow-sm">How It Works</span>
            <SectionHeading 
                title={<span>Your Pristine Pool Is Just <span className="text-[#06b6d4]">4 Steps Away</span></span>} 
                center 
            />
             <p className="max-w-3xl mx-auto text-slate-800 font-medium text-lg md:text-xl leading-relaxed">
             At ProActive Pool Solutions, our process is designed to make pool cleaning and maintenance in Wendell, Raleigh & Cary simple and seamless:
           </p>
        </div>

        <div className="relative">
          {/* Center Dashed Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-4 border-dashed border-slate-200 transform -translate-x-1/2 h-full z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 mb-24 md:mb-40 last:mb-0 relative z-10 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Text Side */}
              <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-28 md:text-right' : 'md:pl-28 md:text-left'} text-center md:text-left group`}>
                <div className="mb-4 md:mb-8">
                   {step.title}
                </div>
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-medium">{step.description}</p>
              </div>

              {/* Center Node */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center justify-center">
                 <div className="w-20 h-20 rounded-full bg-white border-[3px] border-slate-900 flex items-center justify-center shadow-[0_0_0_12px_white] z-20">
                    <span className="font-heading font-black text-2xl text-slate-900">{step.number}</span>
                 </div>
              </div>
               
              {/* Mobile Number */}
               <div className="md:hidden w-16 h-16 rounded-full border-[3px] border-slate-900 bg-white flex items-center justify-center font-heading font-black text-2xl text-slate-900 shadow-md mb-6 mt-8">
                    {step.number}
                 </div>

              {/* Image Side */}
              <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pl-28' : 'md:pr-28'}`}>
                <div className="overflow-hidden rounded-2xl shadow-brutal border-[3px] border-slate-900 transform group-hover:rotate-1 transition-transform duration-500 bg-white h-64 md:h-96">
                   <PlaceholderImage icon={step.icon} subLabel={`Step ${step.number}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};