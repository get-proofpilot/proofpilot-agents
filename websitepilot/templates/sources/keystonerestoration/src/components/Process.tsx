import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Process = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Emergency Contact and Assessment'
    },
    {
      number: '02',
      title: 'Insurance Coordination and Documentation'
    },
    {
      number: '03',
      title: 'Water Extraction and Drying Process'
    },
    {
      number: '04',
      title: 'Complete Restoration and Final Walkthrough'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the progressive animation
            steps.forEach((_, index) => {
              setTimeout(() => {
                setActiveStep(index);
              }, index * 400); // 400ms delay between each step
            });
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-6 py-20 max-md:px-4 max-md:py-12 bg-muted/50">
      <div className="flex gap-16 max-lg:flex-col max-w-[1320px] mx-auto">
        {/* Left Side - Content */}
        <div className="lg:w-[45%] flex flex-col justify-start max-lg:order-2">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-6">
            How We Work
          </p>
          <h2 className="text-[48px] font-black leading-tight mb-6 max-md:text-[36px]">
            Our Streamlined Restoration Process
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-8 max-w-[500px]">
            From emergency call to complete restoration, our water damage company makes recovery simple, efficient, and stress-free. All of our projects use top-quality equipment and proven techniques for lasting results.
          </p>
          <div className="flex items-stretch gap-4 max-md:flex-col">
            <button className="bg-primary text-white font-bold text-base px-6 py-3 max-md:py-3 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Get a Free Estimate
              <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-primary text-primary font-bold text-base px-6 py-3 max-md:py-3 rounded-lg transition-all duration-300 hover:bg-primary/5 hover:shadow-lg flex items-center justify-center gap-2">
              Learn More
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side - Timeline */}
        <div className="lg:w-[55%] relative flex flex-col gap-12 pt-4 max-lg:order-1">
          {/* Vertical Line */}
          <div className="absolute left-[17px] top-[28px] bottom-[28px] w-0.5 bg-border max-lg:hidden" />
          
          {steps.map((step, index) => {
            const isActive = index <= activeStep;
            const isLastStep = index === steps.length - 1;
            
            return (
              <div 
                key={index} 
                className={`flex items-start gap-6 relative transition-all duration-700 ${
                  isActive ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {/* Circle on Line */}
                <div className={`w-9 h-9 rounded-full border-4 flex-shrink-0 z-10 transition-all duration-700 ${
                  isActive
                    ? isLastStep 
                      ? 'bg-muted border-muted scale-100' 
                      : 'bg-primary border-primary scale-100'
                    : 'bg-muted border-muted scale-75'
                }`} />
                
                {/* Step Content */}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`font-black text-xl px-5 py-2 rounded-lg min-w-[70px] text-center transition-all duration-700 ${
                    isActive 
                      ? 'bg-primary text-white scale-100' 
                      : 'bg-muted text-muted-foreground scale-95'
                  }`}>
                    {step.number}
                  </div>
                  <h3 className={`text-xl font-bold leading-tight transition-all duration-700 ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
