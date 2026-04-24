import React, { useState } from 'react';
import { Mail, Phone, Plus, Minus } from 'lucide-react';
import { SectionHeading } from './UI';

const faqs = [
  { 
    q: "What makes ProActive the best pool service in Wendell?", 
    a: "Unlike volume-based competitors, we focus on longevity. We use advanced LSI water testing to prevent equipment corrosion, provide detailed digital reports after every visit, and our technicians are locally trained specifically for North Carolina's pollen and weather challenges." 
  },
  { 
    q: "Do you service saltwater pools in Raleigh and Wake Forest?", 
    a: "Yes! We specialize in both saltwater and traditional chlorine systems. Salt cells require specific maintenance to prevent calcium buildup and extend their lifespan, and our technicians are certified to handle salt system diagnostics and cleaning." 
  },
  { 
    q: "What is included in your weekly pool maintenance plan?", 
    a: "Our comprehensive weekly service includes skimming, vacuuming debris, brushing walls/tile, emptying baskets, backwashing filters, safety inspections, and balancing all 5 chemical parameters (pH, Chlorine, Alkalinity, Calcium, Stabilizer) to keep your water crystal clear." 
  },
  { 
    q: "My pool is green. How fast can you fix it?", 
    a: "With our Green-to-Clean service, we can typically turn a swampy pool around in 3-5 days depending on severity. We use a heavy-duty shock and filtration process to kill algae at the root and restore clarity safely." 
  },
  { 
    q: "How much does pool cleaning cost in Wake County?", 
    a: "Pricing varies based on pool size, screening, and foliage. However, we offer transparent, flat-rate pricing for our Weekly and Bi-Weekly plans. Click 'Get Your Price Now' for an instant estimate tailored to your specific pool." 
  },
  { 
    q: "Do I need to sign a long-term contract?", 
    a: "No. We believe our service speaks for itself. We operate on a month-to-month basis because we want to earn your business with every visit, not lock you in with paperwork." 
  },
  { 
    q: "Are your pool technicians certified and insured?", 
    a: "Absolutely. Every ProActive technician undergoes rigorous training on water chemistry and equipment repair. We are fully insured, giving you peace of mind that your property is protected while we work." 
  },
  { 
    q: "How do you ensure my pool equipment lasts longer?", 
    a: "We don't just dump chlorine. We balance the LSI (Langelier Saturation Index) of your water. If water is aggressive, it eats your heater and pump seals. If it's scale-forming, it clogs your filter. We keep it perfectly balanced to extend the life of your expensive equipment." 
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-32 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        <div className="lg:w-5/12 sticky top-0 lg:top-32 bg-white z-20 py-4 lg:py-0">
          <span className="bg-[#06b6d4] text-white px-4 py-1.5 text-sm font-heading font-bold rounded-md mb-6 md:mb-8 inline-block shadow-brutal-sm border border-slate-900">FAQ</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 mb-6 md:mb-10 leading-[0.9] tracking-tight">
            Have Any Questions?<br/>We May Already Have The Answer.
          </h2>
          <p className="text-slate-800 text-lg md:text-xl font-medium mb-8 md:mb-10 leading-relaxed">
            Questions about ProActive Pool Solutions? Check out our FAQs below. Contact us if you can't find the answer to your question.
          </p>
          
          <div className="space-y-4 md:space-y-6">
            <a href="mailto:customerservice@proactivepoolsolutions.io" className="flex items-center gap-4 md:gap-5 text-slate-800 hover:text-[#06b6d4] transition-colors font-bold text-base md:text-lg group">
              <div className="bg-slate-900 text-white p-3 md:p-4 rounded-full group-hover:bg-[#06b6d4] transition-colors"><Mail size={18} className="md:w-6 md:h-6"/></div>
              <span className="truncate">customerservice@proactivepoolsolutions.io</span>
            </a>
             <a href="tel:919-555-0199" className="flex items-center gap-4 md:gap-5 text-slate-800 hover:text-[#06b6d4] transition-colors font-bold text-base md:text-lg group">
              <div className="bg-slate-900 text-white p-3 md:p-4 rounded-full group-hover:bg-[#06b6d4] transition-colors"><Phone size={18} className="md:w-6 md:h-6"/></div>
              (919) 555-0199
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
                    ? 'bg-[#06b6d4] text-white shadow-none translate-x-[2px] translate-y-[2px]' 
                    : 'bg-[#06b6d4] text-white shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-sm'
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