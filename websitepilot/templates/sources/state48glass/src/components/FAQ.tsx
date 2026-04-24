import React, { useState } from 'react';
import { Mail, Phone, Plus, Minus } from 'lucide-react';
import { SectionHeading } from './UI';

const faqs = [
  { 
    q: "Is cash back on windshield replacement legal in Arizona?", 
    a: "Yes! Arizona auto glass companies can legally offer free incentives like cash back to customers. You also have the legal right to choose which company you work with, regardless of what your insurance company recommends. Cash back amounts vary based on your vehicle's make, model, and your policy details." 
  },
  { 
    q: "Does insurance cover windshield replacement in Arizona?", 
    a: "Yes! Arizona state law requires insurance companies to offer zero-deductible glass coverage. If you have comprehensive coverage with this provision, your windshield replacement is typically fully covered with no out-of-pocket cost. We work with ALL insurance companies and handle the entire claims process for you." 
  },
  { 
    q: "Will my insurance rates go up if I file a glass claim?", 
    a: "Generally, no. Arizona insurers are required to provide no-fault, zero-deductible coverage because windshield damage is so common in our state. As long as you abide by the terms of your policy, your insurer typically won't raise your rates for a glass claim." 
  },
  { 
    q: "How long does a windshield replacement take?", 
    a: "Most windshield replacements take about 60-90 minutes from start to finish. Chip repairs are even faster, typically 20-30 minutes. We recommend waiting at least one hour after installation before driving to allow the adhesive to properly cure." 
  },
  { 
    q: "Can you repair my windshield or does it need to be replaced?", 
    a: "Chips smaller than a quarter and cracks shorter than 3 inches (about the size of a dollar bill) can often be repaired. However, if the damage is in the driver's line of sight, within 2 inches of the windshield edge, or has spread significantly, replacement is usually recommended for safety." 
  },
  { 
    q: "Do you offer same-day windshield replacement?", 
    a: "Yes! We offer same-day service for most vehicles when you call early in the day. Our mobile technicians can often meet you at your preferred location within hours. Contact us to check same-day availability for your vehicle." 
  },
  { 
    q: "What is ADAS calibration and do I need it?", 
    a: "ADAS (Advanced Driver Assistance Systems) includes features like lane departure warnings, automatic emergency braking, and adaptive cruise control. If your vehicle has cameras or sensors mounted to the windshield, calibration is required after replacement to ensure these safety systems work correctly. We offer professional ADAS calibration services." 
  },
  { 
    q: "Do you offer mobile windshield replacement?", 
    a: "Absolutely! We provide free mobile service throughout the Phoenix metro area and all of Maricopa County. Our fully-equipped technicians will come to your home, office, or any convenient location at no extra charge." 
  },
  { 
    q: "What kind of warranty do you offer?", 
    a: "We offer a lifetime warranty on all windshield replacements that covers defects in materials and workmanship, water leaks, and wind noise issues for as long as you own your vehicle. We also include free lifetime chip repairs on your new windshield." 
  },
  { 
    q: "How much does windshield replacement cost without insurance?", 
    a: "Out-of-pocket pricing varies by vehicle make, model, and year. We offer competitive cash pricing that beats or matches any other service in Arizona. Contact us with your vehicle info for a free, no-obligation quote. Most windshields range from $170-$650+ depending on the vehicle." 
  },
  { 
    q: "What type of glass do you use?", 
    a: "We exclusively use OEM (Original Equipment Manufacturer) or OEE (Original Equipment Equivalent) glass that meets or exceeds factory safety standards. We never use cheap aftermarket glass that can compromise visibility and safety." 
  },
  { 
    q: "Can you replace windshields on any vehicle?", 
    a: "Yes! We service all makes and models, including trucks, SUVs, luxury vehicles, RVs, commercial vehicles, and even hard-to-find windshields. If it has glass, we can replace it." 
  },
  { 
    q: "What areas do you service in Arizona?", 
    a: "We provide mobile windshield replacement throughout the Phoenix metro area including Phoenix, Scottsdale, Mesa, Tempe, Chandler, Gilbert, Glendale, Peoria, Surprise, Goodyear, Avondale, Queen Creek, and all surrounding communities in Maricopa County." 
  },
  { 
    q: "What makes State 48 Glass different from other companies?", 
    a: "We're locally owned and operated by automotive enthusiasts who take pride in our work. We use only OEM-quality materials, offer lifetime warranties, handle all insurance paperwork, provide free mobile service, and donate a portion of every windshield to Phoenix Children's Hospital. Clean. Humble. Perfection." 
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        <div className="lg:w-5/12 sticky top-0 lg:top-32 bg-white z-20 py-4 lg:py-0">
          <span className="bg-primary text-white px-4 py-1.5 text-sm font-heading font-bold rounded-md mb-6 md:mb-8 inline-block shadow-brutal-sm border border-slate-900">FAQ</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 mb-6 md:mb-10 leading-[0.9] tracking-tight">
            Have Any Questions?<br/>We May Already Have The Answer.
          </h2>
          <p className="text-slate-800 text-lg md:text-xl font-medium mb-8 md:mb-10 leading-relaxed">
            Questions about State 48 Glass? Check out our FAQs below. Contact us if you can't find the answer to your question.
          </p>
          
          <div className="space-y-4 md:space-y-6">
            <a href="mailto:info@state48glass.com" className="flex items-center gap-4 md:gap-5 text-slate-800 hover:text-primary transition-colors font-bold text-base md:text-lg group">
              <div className="bg-slate-900 text-white p-3 md:p-4 rounded-full group-hover:bg-primary transition-colors"><Mail size={18} className="md:w-6 md:h-6"/></div>
              <span className="truncate">info@state48glass.com</span>
            </a>
             <a href="tel:602-555-0148" className="flex items-center gap-4 md:gap-5 text-slate-800 hover:text-primary transition-colors font-bold text-base md:text-lg group">
              <div className="bg-slate-900 text-white p-3 md:p-4 rounded-full group-hover:bg-primary transition-colors"><Phone size={18} className="md:w-6 md:h-6"/></div>
              (602) 555-0148
            </a>
          </div>
        </div>

        <div className="lg:w-7/12 w-full flex flex-col gap-4 md:gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="relative group">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className={`w-full flex items-center justify-between p-4 md:p-6 md:px-8 text-left font-heading font-black text-base md:text-xl transition-all rounded-lg border-[3px] border-slate-900 relative z-10
                  ${openIndex === idx 
                    ? 'bg-primary text-white shadow-none translate-x-[2px] translate-y-[2px]' 
                    : 'bg-primary text-white shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-sm'
                  }`}
              >
                <span className="flex items-center gap-3 md:gap-5 pr-2">
                  <span className="opacity-80 text-base md:text-lg hidden sm:inline-block">0{idx + 1}.</span>
                  {faq.q}
                </span>
                <span className="shrink-0">
                    {openIndex === idx ? <Minus size={20} className="md:w-6 md:h-6" strokeWidth={3} /> : <Plus size={20} className="md:w-6 md:h-6" strokeWidth={3} />}
                </span>
              </button>
              
              {/* Answer Panel */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border-x-[3px] border-b-[3px] border-slate-900 rounded-b-lg mx-1
                  ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-none'}
                `}
              >
                <div className="p-6 md:p-8 text-slate-800 font-medium text-base md:text-lg leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};