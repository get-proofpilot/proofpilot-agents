import React from 'react';
import { Button } from './UI';
import { ArrowRight, Quote } from 'lucide-react';
import happyCustomer from '@/assets/happy-customer.jpg';

export const AboutVideo: React.FC = () => {
  return (
    <section className="bg-[#1f2937] py-16 md:py-32 text-white relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        
        {/* Left Text */}
        <div className="text-left">
          <div className="inline-block bg-primary text-white text-sm font-bold px-4 py-1.5 mb-6 md:mb-10 rounded shadow-[0_0_15px_rgba(20,84,164,0.5)] tracking-wider">
            About Us
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 tracking-tight leading-tight">
            What We Bring to the <span className="text-primary">Auto Glass Industry</span>
          </h2>
          
          <p className="text-white/80 font-medium leading-relaxed mb-6 md:mb-8 text-lg md:text-xl">
            Honest service. Professional expertise. Pride in our work. We work with every insurance company to make the claims process painless and easy.
          </p>
          
          <p className="text-white/70 font-medium leading-relaxed mb-8 md:mb-12 text-base md:text-lg">
            If you're paying out of pocket, we offer prices that compete with any other service. We promise 100% satisfaction in our service and workmanship. Our warranty program beats any other auto glass company.
          </p>
          
          <Button size="lg" variant="primary">
            Contact Us Today <ArrowRight size={20} />
          </Button>
        </div>

        {/* Right Image & Quote Card */}
        <div className="relative group">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-white/10 mb-6">
            <img 
              src={happyCustomer} 
              alt="Happy customer with State 48 Glass technician" 
              className="w-full h-[300px] md:h-[350px] object-cover"
            />
          </div>
          
          {/* Quote Card */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 border border-white/10">
            
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-primary/20">
              <Quote size={50} fill="currentColor" />
            </div>
            
            <div className="relative z-10">
              <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed mb-4 italic">
                "We promise hundred-percent satisfaction in our service and workmanship. Our warranty program beats any other auto glass company."
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-black text-lg">
                  RL
                </div>
                <div>
                  <div className="font-black text-white text-base">Rick Lewis</div>
                  <div className="text-white/60 font-medium text-sm">Owner, State 48 Glass</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

      </div>
    </section>
  );
};
