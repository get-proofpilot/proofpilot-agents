import React from 'react';
import { Button, PlaceholderImage } from './UI';
import { Play, ArrowRight } from 'lucide-react';

export const AboutVideo: React.FC = () => {
  return (
    <section className="bg-[#111827] py-16 md:py-32 text-white relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        
        {/* Left Text */}
        <div className="text-left">
          <div className="inline-block bg-[#06b6d4] text-white text-sm font-bold px-4 py-1.5 mb-6 md:mb-10 rounded shadow-[0_0_15px_rgba(6,182,212,0.5)] tracking-wider">
            Our Mission
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 tracking-tight leading-tight">
            Why We Started ProActive Pool Solutions
          </h2>
          
          <p className="text-white/80 font-medium leading-relaxed mb-6 md:mb-8 text-lg md:text-xl">
            We understand that maintaining a swimming pool can often be a daunting task, which is why we dedicate ourselves to providing exceptional cleaning, maintenance, and repair services.
          </p>
          
          <p className="text-white/70 font-medium leading-relaxed mb-8 md:mb-12 text-base md:text-lg">
            Our mission is simple: to make pool ownership enjoyable and worry-free for families in Wendell, Raleigh, and Wake Forest. We don't just clean pools—we take ownership of your pool's health so you can focus on making memories.
          </p>
          
          <Button size="lg" variant="primary">
            Learn More About Us <ArrowRight size={20} />
          </Button>
        </div>

        {/* Right Video */}
        <div className="relative group">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-white/10">
            <div className="w-full h-[300px] md:h-[500px]">
              <PlaceholderImage icon={Play} label="Our Mission" subLabel="Watch Video" />
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#06b6d4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                <Play className="text-white ml-1" size={36} fill="white" />
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#06b6d4]/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#06b6d4]/10 rounded-full blur-3xl"></div>
        </div>

      </div>
    </section>
  );
};