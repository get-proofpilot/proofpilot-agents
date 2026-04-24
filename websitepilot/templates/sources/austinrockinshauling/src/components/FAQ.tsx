import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  { 
    q: "What areas do you serve?", 
    a: "We serve Pinal County, Maricopa County, and the entire Phoenix metro. Primary areas: Queen Creek, San Tan Valley, Gilbert, Mesa, Florence, Goodyear." 
  },
  { 
    q: "How much does house demolition cost?", 
    a: "Most residential demolitions range $5,000-$25,000+ depending on size and conditions. We provide free on-site estimates." 
  },
  { 
    q: "Do you handle permits?", 
    a: "Yes. We handle all permitting with local municipalities. Permit costs typically included in quotes." 
  },
  { 
    q: "How quickly can you start?", 
    a: "Most projects scheduled within 1-2 weeks. Emergency/urgent jobs may be accommodated sooner." 
  },
  { 
    q: "What's included in dirt work services?", 
    a: "Land grading, leveling, excavation, trenching, and site preparation. We prepare your property for construction, drainage, or landscaping." 
  },
  { 
    q: "Do you offer free estimates?", 
    a: "Yes. Every project starts with a free, no-obligation estimate. Call or fill out the quote form and we'll get back to you fast." 
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-muted section-padding">
      <div className="container-custom max-w-4xl">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-badge mb-4">Common Questions</span>
          <h2 className="section-heading mb-4">Your Questions,<br/><span className="text-primary">Our Expert Advice</span></h2>
          <p className="text-foreground/60 text-base font-medium">Everything you need to know about working with Rocking S.</p>
        </motion.div>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              className="bg-background border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <button 
                className="w-full flex justify-between items-center text-left p-5 md:p-6"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className={`font-black text-sm md:text-base pr-4 uppercase tracking-wide transition-colors ${openIndex === idx ? 'text-primary' : ''}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0 ${openIndex === idx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === idx ? '200px' : '0px', opacity: openIndex === idx ? 1 : 0 }}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-foreground/70 text-base leading-relaxed font-medium border-t border-border pt-4">
                  {faq.a}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
