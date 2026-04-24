import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can you respond to a water damage emergency?",
      answer: "We provide 24/7 emergency response throughout Salt Lake City, Sandy, and surrounding areas. Our team typically arrives within 60 minutes of your call to begin water extraction and damage mitigation immediately."
    },
    {
      question: "Do you work with insurance companies?",
      answer: "Yes, we work directly with all major insurance companies to streamline your claims process. We handle documentation, communication, and coordination to make recovery as simple as possible during a stressful time."
    },
    {
      question: "What areas do you serve in Utah?",
      answer: "We proudly serve Salt Lake City, Sandy, and all surrounding communities throughout the greater Salt Lake area. Our emergency response team is available 24/7 to reach you quickly when disaster strikes."
    },
    {
      question: "What types of water damage do you handle?",
      answer: "We handle all types of water damage including burst pipes, flooded basements, storm damage, sewage backups, appliance leaks, and more. Our certified technicians use professional equipment for water extraction, structural drying, and complete restoration."
    },
    {
      question: "How long does the restoration process take?",
      answer: "The timeline depends on the extent of damage. Most water extraction and drying takes 3-5 days, while complete restoration varies by project scope. We'll provide a detailed timeline after our initial assessment."
    },
    {
      question: "Do you provide mold remediation services?",
      answer: "Yes, we offer comprehensive mold remediation services. Our team identifies, contains, and removes mold growth while addressing the moisture source to prevent future issues. We follow industry standards for safe and effective mold removal."
    },
    {
      question: "Will you help with my insurance claim?",
      answer: "Absolutely. We work directly with your insurance company, providing detailed documentation, photos, and estimates. Our experience with insurance claims helps ensure you receive proper coverage for your restoration needs."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="flex w-full flex-col px-10 py-20 max-md:px-6 bg-primary/5">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Eyebrow Text */}
        <p className="text-primary text-sm font-bold leading-none tracking-widest uppercase mb-8">
          FAQ
        </p>

        {/* Heading */}
        <h2 className="text-foreground text-[48px] font-black leading-tight text-center mb-6 max-md:text-[36px]">
          Frequently Asked Questions
        </h2>

        {/* Description */}
        <p className="text-foreground/70 text-lg leading-relaxed text-center mb-12 max-w-[700px]">
          Have questions about our process, services, or how we work? Here are the answers to the most common things clients ask us.
        </p>

        {/* FAQ Items */}
        <div className="w-full flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-primary/5 border-2 border-primary/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/40"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center gap-6 justify-between w-full text-left px-8 py-6 max-md:px-5 max-md:gap-4"
              >
                {/* Number Badge */}
                <div className="flex items-center gap-6 flex-1 max-md:gap-4">
                  <span className="text-foreground text-2xl font-black min-w-[40px] max-md:text-xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-foreground text-xl font-bold leading-tight max-md:text-base">
                    {faq.question}
                  </h3>
                </div>

                {/* Plus/Minus Icon */}
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <Minus className="w-6 h-6 text-primary" strokeWidth={3} />
                  ) : (
                    <Plus className="w-6 h-6 text-primary" strokeWidth={3} />
                  )}
                </div>
              </button>

              {/* Answer */}
              {openFAQ === index && (
                <div className="px-8 pb-6 max-md:px-5 animate-fade-in">
                  <div className="pl-[64px] max-md:pl-0">
                    <p className="text-foreground/80 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
