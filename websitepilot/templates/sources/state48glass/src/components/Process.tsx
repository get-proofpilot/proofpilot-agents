import React from 'react';
import { SectionHeading } from './UI';
import { StepItem } from '../types';
import { Phone, FileText, Calendar, CheckCircle } from 'lucide-react';
import processStep1 from '@/assets/process-step-1-contact.jpg';
import processStep2 from '@/assets/process-step-2-insurance.jpg';
import processStep3 from '@/assets/process-step-3-schedule.jpg';
import processStep4 from '@/assets/process-step-4-installation.jpg';

interface ExtendedStepItem extends StepItem {
  image: string;
}

const steps: ExtendedStepItem[] = [
  {
    number: "01",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-primary text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">Contact</span> <span className="text-slate-900">Us</span></span>,
    description: "Give us a call or fill out our quick quote form. Tell us about your vehicle and the damage. We'll provide a fast, free estimate.",
    icon: Phone,
    image: processStep1
  },
  {
    number: "02",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-primary text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">Insurance</span> <span className="text-slate-900">Handled</span></span>,
    description: "If you have insurance, we handle the entire claim process for you. No hassle, no paperwork stress. We work with ALL insurance companies.",
    icon: FileText,
    image: processStep2
  },
  {
    number: "03",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-primary text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">Schedule</span> <span className="text-slate-900">Service</span></span>,
    description: "Pick a time that works for you. We offer same-day service for most vehicles. Come to our shop or we'll come to you with mobile service.",
    icon: Calendar,
    image: processStep3
  },
  {
    number: "04",
    title: <span className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl"><span className="bg-primary text-white px-3 py-1 inline-block transform -skew-x-12 mr-2 md:mr-3 shadow-sm">Perfect</span> <span className="text-slate-900">Installation</span></span>,
    description: "Our skilled technicians install your new windshield with precision and care. Quality materials, expert craftsmanship, backed by our warranty.",
    icon: CheckCircle,
    image: processStep4
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20 md:mb-32">
            <span className="bg-primary text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 inline-block tracking-wide shadow-sm">How It Works</span>
            <SectionHeading 
                title={<span>Your New Windshield in <span className="text-primary">4 Easy Steps</span></span>} 
                center 
            />
             <p className="max-w-3xl mx-auto text-slate-800 font-medium text-lg md:text-xl leading-relaxed">
             At State 48 Glass, we've made the windshield replacement process simple and stress-free:
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
                   <img 
                     src={step.image} 
                     alt={`Step ${step.number}`}
                     className="w-full h-full object-cover"
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
