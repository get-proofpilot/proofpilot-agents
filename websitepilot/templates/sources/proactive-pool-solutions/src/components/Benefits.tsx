import React from 'react';
import { Button } from './UI';
import { ShieldCheck, Users, TrendingUp, Lightbulb } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: "1) We Are ProActive!",
    description: "Being ProActive is key to water quality and equipment longevity. We address issues before they escalate into costly repairs, ensuring a safe swimming environment and saving you money in the long run."
  },
  {
    icon: Users,
    title: "2) We Take Ownership",
    description: "When our team members take ownership, you have peace of mind. We position ourselves as a partner you can rely on, prioritizing customer satisfaction and going above and beyond expectations."
  },
  {
    icon: TrendingUp,
    title: "3) We are Constantly Developing",
    description: "By looking for new and better ways to serve, we ensure you receive the latest and most effective processes. This results in higher-quality service and a system designed to produce exceptional results."
  },
  {
    icon: Lightbulb,
    title: "4) Mindset of Abundance",
    description: "We break free from scarcity and limitations. Maintaining an optimistic outlook strengthens our client connections and triggers positive influence within our team, ensuring a superior experience for you."
  }
];

export const Benefits: React.FC = () => {
  return (
    <section id="why-us" className="py-16 md:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 grid lg:grid-cols-3 gap-12 lg:gap-20">
        
        {/* Left Sticky Column */}
        <div className="lg:col-span-1 pt-0 lg:pt-10">
          <div className="lg:sticky lg:top-32 text-center lg:text-left">
            <span className="bg-[#06b6d4] text-white px-4 py-1.5 text-sm font-heading font-bold rounded mb-6 md:mb-8 inline-block tracking-wide shadow-sm">Why Us?</span>
            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-heading font-black text-slate-900 mb-6 md:mb-10 leading-[0.9] tracking-tighter">
              The ProActive<br/><span className="text-[#06b6d4] text-outline-blue">Approach</span>
            </h2>
            <p className="text-slate-700 mb-8 md:mb-12 text-lg md:text-xl font-medium leading-relaxed">
              We keep our customers by keeping their stress levels low and giving them top quality for the best value. We're not just checking boxes; we're caring for your investment.
            </p>
            <Button size="lg" className="w-full md:w-auto shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none bg-[#06b6d4] hover:bg-[#0891b2] text-lg px-10">Get Your Price Now &rarr;</Button>
          </div>
        </div>

        {/* Right Grid Column */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="border-[3px] border-slate-900 p-8 md:p-10 rounded-xl bg-white hover:shadow-brutal transition-all duration-300 group">
              <div className="bg-cyan-50 w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-6 md:mb-8 text-[#06b6d4] group-hover:bg-[#06b6d4] group-hover:text-white transition-colors">
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