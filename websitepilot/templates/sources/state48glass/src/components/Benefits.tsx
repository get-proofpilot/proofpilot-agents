import React from 'react';
import { Button } from './UI';
import { Shield, MapPin, Heart, Award } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: "Quality Materials",
    description: "As Arizona's leader in automotive glass, we use only the highest quality materials and innovative technology. We believe strongly in first class customer service to assure all of our customers a seamless and pleasant experience."
  },
  {
    icon: Shield,
    title: "We Work With ALL Insurance",
    description: "In most cases your windshield is fully covered by your insurance company. We work closely with all of Arizona's major insurance companies and will help assist you through the entire process."
  },
  {
    icon: MapPin,
    title: "Locally Owned & Operated",
    description: "Being a locally owned and operated company, we take great pride in our home state of Arizona. We are not just another glass company — we are automotive enthusiasts that take great pride in our craft and in serving you."
  },
  {
    icon: Heart,
    title: "We Save Lives",
    description: "Not only do you get a new windshield, using our service also does some good. Every windshield we replace, we donate a portion to Phoenix Children's Hospital. Your repair helps Arizona's kids!"
  }
];

export const Benefits: React.FC = () => {
  return (
    <section id="why-us" className="py-16 md:py-32 bg-white relative overflow-hidden grain-overlay-light">
      <div className="max-w-[1600px] mx-auto px-4 grid lg:grid-cols-3 gap-12 lg:gap-20">
        
        {/* Left Sticky Column */}
        <div className="lg:col-span-1 pt-0 lg:pt-10">
          <div className="lg:sticky lg:top-32 text-center lg:text-left">
            <span className="bg-primary text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 md:mb-8 inline-block tracking-wide shadow-sm">Why Choose Us?</span>
            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-heading font-black text-slate-900 mb-6 md:mb-10 leading-[0.9] tracking-tighter">
              The State 48<br/><span className="text-primary">Difference</span>
            </h2>
            <p className="text-slate-700 mb-8 md:mb-12 text-lg md:text-xl font-medium leading-relaxed">
              We're not just another glass company. We're automotive enthusiasts who take great pride in our craft and in serving Arizona's drivers.
            </p>
            <Button size="lg" className="w-full md:w-auto shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none text-lg px-10">Get A Quote &rarr;</Button>
          </div>
        </div>

        {/* Right Grid Column */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="border-[3px] border-slate-900 p-8 md:p-10 rounded-xl bg-white hover:shadow-brutal transition-all duration-300 group">
              <div className="bg-state48-blue-light w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-6 md:mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <b.icon size={28} className="md:w-8 md:h-8" strokeWidth={2} />
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl mb-3 md:mb-5 text-slate-900 tracking-tight">{b.title}</h3>
              <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};